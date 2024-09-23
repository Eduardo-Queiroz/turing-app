import { User } from "./user"

export interface Room {
    createdAt?: number
    id: string
    unread?: boolean
    lastMessage?: string
    metadata?: Record<string, any>
    updatedAt?: number
    otherUser: User
}