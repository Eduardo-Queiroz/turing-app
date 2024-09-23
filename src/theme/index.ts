import { createTheme } from "@shopify/restyle";

export type buttonTypes = "primary";

export type iconTypes = "medium";

export type ThemeType = "light" | "dark";

export const defaultTheme = createTheme({
    colorScheme: "light",
    spacing: {
        xs: 4,
        s: 8,
        m: 10,
        l: 18,
        xl: 20,
        xxl: 34,
    },
    colors: {
        primary: "#a154e5",
        onPrimary: "#f8f5fe",

        secondary: "#b076b9",

        surface: "#f8f5fe",
        surfaceVariant: "#ffffff",

        surfaceContainer: "#b177e4",
        onSurfaceContainer: "#f7f1fc",

        surfaceContainerVariant: "#ffffff",
        onSurfaceContainerVariant: "#ab6bb3",

        neutral0: "#ffffff",
        neutral50: "#e6cde9",
        neutral100: "#a799a0",
        neutral150: "#8f7f90",
        neutral200: "#483f41",

        //custom colors
        danger: "#FF5F5F",

        transparent: "transparent",
        semiTransparent: "#00000050",
    },
    borderRadii: {
        none: 0,
        pill: 22,
        circular: 100,
    },
    shadowVariants: {
        easy: {
            elevation: 5,
            shadowOffset: {
                height: 0,
                width: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 12,
        }
    },
    textVariants: {
        defaults: {
            color: "neutral100",
        },
        title: {
            letterSpacing: 1.5,
            fontSize: 16,
            color: "secondary",
            fontFamily: "Poppins_600SemiBold",
            lineHeight: 30,
        },
        body: {
            fontSize: 12,
            fontFamily: "Poppins_500Medium",
            lineHeight: 16,
        },
        bodyBold: {
            fontSize: 12,
            fontFamily: "Poppins_700Bold",
            lineHeight: 16,
        },
        subtitle: {
            fontSize: 14,
            fontFamily: "Poppins_600SemiBold",
            lineHeight: 16,
        },
    },
    buttonVariants: {
        primary: {
            backgroundColor: "primary",
            width: "90%",
            height: 56,
            borderRadius: "circular",
            alignItems: "center",
            justifyContent: "center",
        },
    },
    buttonTextVariants: {
        primary: {
            fontSize: 12,
            color: "onSurfaceContainer",
            fontFamily: "Poppins_600SemiBold",
            lineHeight: 12,
        },
    },
    iconVariants: {
        small: {
            size: 14,
        },
        medium: {
            size: 20,
        },
        large: {
            size: 30,
        },
    },
    avatarVariants: {
        small: {
            height: 10,
            width: 10,
        },
        medium: {
            height: 55,
            width: 55,
        },
    },
    circleVariants: {
        small: {
            height: 8,
            width: 8,
        },
        medium: {
            height: 50,
            width: 50,
        },
    },
    animatedIconVariats: {
        small: {
            height: 90,
            width: 90,
        },
        medium: {
            height: 300,
            width: 300,
        },
    },
});

export const darkTheme: Theme = {
    ...defaultTheme,
    colorScheme: "dark",
    colors: {
        ...defaultTheme.colors,
        primary: "#a154e5",
        onPrimary: "#f8f5fe",

        secondary: "#f8f5fe",

        surface: "#28242a",
        surfaceVariant: "#3e3a42",

        surfaceContainer: "#3d3942",
        onSurfaceContainer: "#f8f5fe",

        surfaceContainerVariant: "#b177e4",
        onSurfaceContainerVariant: "#f8f5fe",

        neutral50: "#58525e",
        neutral100: "#7b6e7d",
        neutral200: "#8c7b8e",

        danger: "#FF5F5F",

        transparent: "transparent",
        semiTransparent: "#00000050",
    },
};

export type Theme = Omit<typeof defaultTheme, "colorScheme"> & {
    colorScheme: ThemeType;
};
