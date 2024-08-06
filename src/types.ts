export interface User {
    id: string;
    email: string;
    name: string;
}

export interface RootState {
    user: User | null;
}
