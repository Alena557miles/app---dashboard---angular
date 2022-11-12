export interface Board{
    id?: string
    name: string
    description: string
    author?: string
    date: Date
}

export type TaskStatus = 'todo' | 'in progress' | 'done'


export interface Task{
    id?: string
    name: string
    status: TaskStatus
    date: Date
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