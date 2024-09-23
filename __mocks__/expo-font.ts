export const useFonts = jest.fn((fontMap: Record<string, any>) => {
    const fontsLoaded = true;
    const error = false

    return [fontsLoaded, error];
});