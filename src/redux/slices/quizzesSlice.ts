import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {collection, getDocs} from "firebase/firestore";
import {db} from '../../firebase';
import {doc, getDoc} from "firebase/firestore";

import exp from "constants";

export type Question = {
    options: Array<any>,
    question: string
}

export interface QuizType {
    id: string;
    questions: Question[]
    title: string,
    user: string
}

interface QuizzesState {
    quizzes: QuizType[];
    loading: boolean;
    error: string | null;
    currentQuiz: QuizType | null
}

export const fetchQuizzes = createAsyncThunk<QuizType[], void, { rejectValue: string }>(
    'quizzes/fetchQuizzes',
    async (_, thunkAPI) => {
        try {
            const quizzesCollection = collection(db, 'quiz');
            const quizzesSnapshot = await getDocs(quizzesCollection);
            const quizzesList = quizzesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as QuizType[];
            return quizzesList;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            } else {
                return thunkAPI.rejectWithValue('An unknown error occurred');
            }
        }
    }
);

export const fetchQuizById = async (docId: string) => {
    try {
        const docRef = doc(db, "quiz", docId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            console.log(docSnap.data())
            return docSnap.data(); // The document data
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching document:", error);
    }
};

const initialState: QuizzesState = {
    quizzes: [],
    loading: false,
    error: null,
    currentQuiz: null
};

export const QuizzesSlice = createSlice({
    name: 'quizzes',
    initialState,
    reducers: {
        setQuizzes: (state, action: PayloadAction<QuizType[]>) => {
            state.quizzes = action.payload;
        },
        setCurrentQuiz: (state, action: PayloadAction<QuizType>) => {
            state.currentQuiz = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizzes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuizzes.fulfilled, (state, action: PayloadAction<QuizType[]>) => {
                console.log(action.payload)
                state.quizzes = action.payload;
                state.loading = false;
            })
            .addCase(fetchQuizzes.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload ?? 'Failed to fetch quizzes';
            });
    },
});

export const {setQuizzes, setCurrentQuiz} = QuizzesSlice.actions;
export default QuizzesSlice.reducer;
