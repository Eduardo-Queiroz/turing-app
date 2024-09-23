import firestore, { Timestamp } from '@react-native-firebase/firestore'
import { useEffect, useState } from 'react'

import { Room, User } from '../types'
import { useAuth } from './auth'
import { getRandomItem, ROOMS_COLLECTION_NAME } from '@turing-app/utils'
import { useUsers } from './user'
import Toast from 'react-native-toast-message'

export const useRooms = () => {
    const [rooms, setRooms] = useState<Room[]>([])
    const [loading, setLoading] = useState(false)
    const [createRoomLoading, setCreateRoomLoading] = useState(false)
    const [error, setError] = useState(false)
    const { users } = useUsers()
    const { user } = useAuth()

    useEffect(() => {
        return getRooms()
    }, [user])


    const getRooms = () => {
        if (!user) {
            setRooms([])
            return
        }

        try {
            setError(false)
            setLoading(true)
            const collection = firestore()
                .collection(ROOMS_COLLECTION_NAME)
                .where('userIds', 'array-contains', user.id)

            return collection.onSnapshot(async (query) => {
                try {
                    const newRooms: Room[] = await query.docs.map(a => {
                        const rawData = a.data()

                        return {
                            id: a.id,
                            createdAt: rawData.createdAt?.toMillis(),
                            updatedAt: rawData.updatedAt?.toMillis(),
                            metadata: rawData.metadata,
                            unread: rawData.unreadUserId == user.id,
                            lastMessage: rawData.lastMessage,
                            otherUser: rawData.users.find((a: User) => a.id != user.id)
                        }
                    })
                    setRooms(newRooms)
                    setLoading(false)

                } catch (e) {
                    setLoading(false)
                    setError(true)
                }
            })
        } catch (e) {
            setLoading(false)
            setError(true)
        }
    }


    const createRoom = async (
        metadata: Record<string, any> = {}
    ) => {
        if (!user) {
            Toast.show({
                type: 'error',
                text1: 'Invalid user',
                text2: 'You need to be sign in to use this feature'
            });
            return
        }
        try {
            const usersWithoutRoom = users.filter((user) => !rooms.find(room => user.id == room.otherUser.id))

            if (!usersWithoutRoom.length) {
                Toast.show({
                    type: 'warning',
                    text1: 'Wait for new users',
                    text2: 'We dont have more users for you'
                });
                return
            }

            const otherUser = getRandomItem(usersWithoutRoom)

            setCreateRoomLoading(true)

            const rawRoom = await firestore()
                .collection(ROOMS_COLLECTION_NAME)
                .add({
                    createdAt: firestore.FieldValue.serverTimestamp(),
                    updatedAt: firestore.FieldValue.serverTimestamp(),
                    metadata,
                    userIds: [user.id, otherUser.id],
                    users: [user, otherUser],
                })

            const room: Room = {
                id: rawRoom.id,
                metadata,
                createdAt: Timestamp.now().toMillis(),
                updatedAt: Timestamp.now().toMillis(),
                otherUser,
            }

            setRooms([...rooms, room])
            setCreateRoomLoading(false)

            return room
        } catch (e) {
            setCreateRoomLoading(false)
            Toast.show({
                type: 'error',
                text1: 'Oops...',
                text2: 'Happen a error while you create a room'
            });
        }
    }

    return { createRoom, rooms, error, retry: getRooms, loading, createRoomLoading }
}