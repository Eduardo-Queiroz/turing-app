import { useTheme } from "@turing-app/hooks";
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfigParams,
} from "react-native-toast-message";

export const ToastComponent = () => {
  const { colors, textVariants } = useTheme();
  const toastConfig = {
    warning: (props: ToastConfigParams<any>) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: colors.secondary }}
        text1Style={textVariants.subtitle}
        text2Style={textVariants.body}
      />
    ),
    error: (props: ToastConfigParams<any>) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: colors.danger }}
        text1Style={textVariants.subtitle}
        text2Style={textVariants.bodyBold}
      />
    ),
  };

  return <Toast config={toastConfig} />;
};
