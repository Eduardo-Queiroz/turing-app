
import { ThemeContext, ThemeContextProps } from '@turing-app/context';
import { useContext } from 'react';

export const useColorSchema = (): ThemeContextProps => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used inside a ThemeProvider');
    }
    return context;
};
