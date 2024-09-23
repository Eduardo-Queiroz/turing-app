import firestore from '@react-native-firebase/firestore'
import * as React from 'react'

import { useAuth } from './auth'
import { USERS_COLLECTION_NAME } from '@turing-app/utils'
import { User } from '@turing-app/types'
import Toast from 'react-native-toast-message'

export const useUsers = () => {
    const [users, setUsers] = React.useState<User[]>([])
    const { user } = useAuth()

    React.useEffect(() => {
        if (!user) {
            setUsers([])
            return
        }
        try {
            return firestore()
                .collection(USERS_COLLECTION_NAME)
                .onSnapshot((query) => {
                    const newUsers: User[] = []

                    query?.forEach((doc) => {
                        if (user.id === doc.id) return

                        const data = doc.data()!

                        const newUser: User = {
                            createdAt: data.createdAt?.toMillis() ?? null,
                            name: data.name ?? null,
                            id: doc.id,
                            imageUrl: data.imageUrl ?? null,
                            metadata: data.metadata ?? null,
                            updatedAt: data.updatedAt?.toMillis() ?? null,
                        }

                        newUsers.push(newUser)
                    })

                    setUsers(newUsers)
                })
        } catch (e) {
            Toast.show({
                type: 'error',
                text1: 'Oops...',
                text2: 'Happen a error while trying to get users. Try again later!'
            });
        }
    }, [user])

    return { users }
}