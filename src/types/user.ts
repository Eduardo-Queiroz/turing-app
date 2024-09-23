
export interface User {
    createdAt?: number | null
    name: string
    id: string
    imageUrl: string
    metadata?: Record<string, any> | null
    role?: 'system' | 'user' | null
    updatedAt?: number | null
}