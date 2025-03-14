import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {db} from '../../firebase';
import {doc, getDoc} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";


import exp from "constants";
import {GameData} from "../../components/HostGameScreen/PlayersWaitingScreen/PlayersWaitingScreen";

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
    currentQuiz: QuizType | null,
    currentGameData: GameData | null
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

export const fetchGameData = createAsyncThunk<GameData, string>(
    "quiz/fetchGameData",
    async (gameId: string, {rejectWithValue}) => {
        try {
            const docRef = doc(db, "games", gameId);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                throw new Error("Game not found");
            }

            return docSnap.data() as GameData;
        } catch (error) {

            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Error while fetching gameData");
        }
    }
);
export const fetchQuiz = createAsyncThunk<QuizType, string>(
    "quiz/fetchQuiz",
    async (quizId: string, {rejectWithValue}) => {
        try {
            console.log(quizId)
            const docRef = doc(db, "quiz", quizId);

            const docSnap = await getDoc(docRef);
            console.log(docSnap.data())

            if (!docSnap.exists()) {
                throw new Error("Quiz not found");
            }
            return docSnap.data() as QuizType;
        } catch (error) {

            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Error while fetching quiz");
        }
    }
);

const initialState: QuizzesState = {
    quizzes: [],
    loading: false,
    error: null,
    currentQuiz: null,
    currentGameData: null
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
        },
        setCurrentGameData: (state, action: PayloadAction<GameData>) => {
            state.currentGameData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizzes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuizzes.fulfilled, (state, action: PayloadAction<QuizType[]>) => {
                state.quizzes = action.payload;
                state.loading = false;
            })
            .addCase(fetchQuizzes.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload ?? 'Failed to fetch quizzes';
            })
            .addCase(fetchGameData.fulfilled, (state, action: PayloadAction<GameData>) => {
                state.currentGameData = action.payload
            })
            .addCase(fetchQuiz.fulfilled, (state, action: PayloadAction<QuizType>) => {
                state.currentQuiz = action.payload
            })
    },
});

export const {setQuizzes, setCurrentQuiz, setCurrentGameData} = QuizzesSlice.actions;
export default QuizzesSlice.reducer;
