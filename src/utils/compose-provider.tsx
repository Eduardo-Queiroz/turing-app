import React, { ReactElement } from "react";

export const composeProviders = (...providers: any[]) => {
  return providers.reduce(
    (AccumulatedProviders, CurrentProvider) => {
      return ({ children }: { children: ReactElement }) => (
        <AccumulatedProviders>
          <CurrentProvider>{children}</CurrentProvider>
        </AccumulatedProviders>
      );
    },
    ({ children }: { children: ReactElement }) => <>{children}</>
  );
};
