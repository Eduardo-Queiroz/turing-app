
import { useEffect, useState } from 'react'
import { MessageType } from '@flyerhq/react-native-chat-ui'
import { useAuth } from './auth';
import firestore from '@react-native-firebase/firestore'
import * as Crypto from "expo-crypto";
import { Room } from '@turing-app/types';
import Toast from 'react-native-toast-message'
import { MESSAGES_COLLECTION_NAME, ROOMS_COLLECTION_NAME } from '@turing-app/utils';

export const useMessage = (room: Room) => {
  const { user } = useAuth()
  const [messages, setMessages] = useState<MessageType.Any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const flyerhqUser = { id: user?.id || "" }
  const otherUserName = room.otherUser.name

  useEffect(() => {
    return getMessages()
  }, [room.id, room.otherUser])

  const getMessages = () => {
    try {
      setError(false)
      setLoading(true)
      return firestore()
        .collection(`${ROOMS_COLLECTION_NAME}/${room.id}/${MESSAGES_COLLECTION_NAME}`)
        .orderBy('createdAt', 'desc')
        .onSnapshot((query) => {
          const newMessages: MessageType.Any[] = []
          try {
            query.forEach((doc) => {
              const { authorId, createdAt, updatedAt, ...rest } = doc.data()

              newMessages.push({
                id: doc.id,
                author: { id: authorId },
                createdAt: createdAt?.toMillis() ?? null,
                updatedAt: updatedAt?.toMillis() ?? null,
                ...rest,
              } as MessageType.Any)
            })

            setLoading(false)
            readMessage()
            setMessages(newMessages)
          } catch (e) {
            setError(true)
            setLoading(false)
          }
        })
    } catch (e) {
      setLoading(false)
      setError(true)
    }
  }

  const readMessage = async () => {
    if (room.unread) {
      firestore()
        .collection(`rooms`)
        .doc(room.id)
        .update({
          unreadUserId: null
        })
    }
  }


  const sendMessage = async (message: MessageType.Image | MessageType.Text) => {
    if (!user) return
    try {
      await firestore()
        .collection(`${ROOMS_COLLECTION_NAME}/${room.id}/${MESSAGES_COLLECTION_NAME}`)
        .doc(message.id)
        .set({
          ...message,
          authorId: user.id,
          createdAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: firestore.FieldValue.serverTimestamp(),
          metadata: {
            room_id: room.id,
            other_user: room.otherUser.id,
            ...room.otherUser.metadata,
          }
        })

      setMessages([message, ...messages]);

      firestore()
        .collection(ROOMS_COLLECTION_NAME)
        .doc(room.id)
        .update({
          lastMessage: (message as any)?.text || "Sended you a message",
          unreadUserId: room.otherUser.id
        })
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Oops...',
        text2: 'Happen a error while you send a message'
      });
    }
  }

  const handleLikeMessage = async (message: MessageType.Any) => {
    if (!user) return
    try {
      const metadata = {
        ...message.metadata,
        liked: true
      }

      console.log(message.id)

      await firestore()
        .collection(`${ROOMS_COLLECTION_NAME}/${room.id}/${MESSAGES_COLLECTION_NAME}`)
        .doc(message.id)
        .update({
          metadata
        })

      const newMessages = messages.map(item => item.id == message.id ? { ...message, metadata } : item)

      setMessages(newMessages);

      firestore()
        .collection(ROOMS_COLLECTION_NAME)
        .doc(room.id)
        .update({
          lastMessage: (message as any)?.text || "Liked your message",
          unreadUserId: room.otherUser.id
        })
    } catch (e) {
      console.log(e)
      Toast.show({
        type: 'error',
        text1: 'Oops...',
        text2: 'Happen a error while you liked a message'
      });
    }

  }

  const handleSendText = (message: MessageType.PartialText) => {
    if (!user) return
    const textMessage: MessageType.Text = {
      author: { id: user.id },
      id: Crypto.randomUUID(),
      text: message.text,
      type: "text",
    };
    sendMessage(textMessage)
  };

  const handleSendImage = (image: MessageType.PartialImage) => {
    if (!user) return
    const imageMessage: MessageType.Image = {
      author: { id: user.id },
      id: Crypto.randomUUID(),
      ...image
    }
    sendMessage(imageMessage)
  };

  return {
    loading,
    error,
    retry: getMessages,
    flyerhqUser,
    otherUserName,
    messages,
    handleSendText,
    handleSendImage,
    handleLikeMessage
  }
}