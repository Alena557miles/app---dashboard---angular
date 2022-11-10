export interface Board{
    id?: string
    name: string
    description: string
    author?: string
    date: Date
}

export interface Task{
    id?: string
    name: string
    author?: string
}