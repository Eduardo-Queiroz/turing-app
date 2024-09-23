import React, { ReactElement } from "react";
import { MotiView } from "moti";
import { useTheme } from "@turing-app/hooks";

type SkeletonElementProps = { children: ReactElement };

export const SkeletonContainerCore = ({ children }: SkeletonElementProps) => {
  const { colors } = useTheme();
  return (
    <MotiView
      transition={{
        type: "timing",
      }}
      animate={{ backgroundColor: colors.surface }}
    >
      {children}
    </MotiView>
  );
};
