export interface Board{
    id?: string
    title: string
    description: string
    author?: string
    date: Date
    tasks: Task[]
}

export type TaskStatus = 'todo' | 'in progress' | 'done'

export interface Task{
    id?: string
    name: string
    status: string
    date: Date
    board: Board
}

export interface User {
    email: string
    password: string
    returnSecureToken: boolean
}

export interface FbAuthResponse{
    idToken: string
    expiresIn: string
}
export interface FbCreateRsponse{
    name: string
}
export interface FbCreateRsponseBoard{
    title: string
}