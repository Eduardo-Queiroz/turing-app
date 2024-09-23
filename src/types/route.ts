import { Room } from "./room";
import { MessageType } from '@flyerhq/react-native-chat-ui'

import { RouteProp } from '@react-navigation/native';

export type Route = {
    Home: undefined;
    Message: { room: Room }
    Camera: { onSave: any }
};

export type MessageRouteParams = RouteProp<{
    params: {
        room: Room;
    }
}, 'params'>;

export type CameraRouteParams = RouteProp<{
    params: {
        onSave: (picture: MessageType.PartialImage) => void;
    }
}, 'params'>;