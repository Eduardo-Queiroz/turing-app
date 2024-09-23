
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Route } from '@turing-app/types';

export type Navigation = NavigationProp<Route>;

export const useTypedNavigation = () => useNavigation<Navigation>();