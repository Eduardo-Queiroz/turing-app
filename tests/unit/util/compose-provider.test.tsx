import React, { useContext } from "react";
import { render } from "@testing-library/react-native";
import { composeProviders } from "@turing-app/utils";
import { Text } from "react-native";

const ContextA = React.createContext<string | undefined>(undefined);
const ContextB = React.createContext<number | undefined>(undefined);

const TestComponent = () => {
  const valueA = useContext(ContextA);
  const valueB = useContext(ContextB);

  return (
    <>
      <Text testID="valueA">{valueA}</Text>
      <Text testID="valueB">{valueB}</Text>
    </>
  );
};

describe("composeProviders", () => {
  it("should provide values from all composed providers", () => {
    const ProviderA = ({ children }: { children: React.ReactNode }) => (
      <ContextA.Provider value="TestA">{children}</ContextA.Provider>
    );

    const ProviderB = ({ children }: { children: React.ReactNode }) => (
      <ContextB.Provider value={42}>{children}</ContextB.Provider>
    );

    const CombinedProvider = composeProviders(ProviderA, ProviderB);

    const { getByTestId } = render(
      <CombinedProvider>
        <TestComponent />
      </CombinedProvider>
    );

    expect(getByTestId("valueA").props.children).toBe("TestA");
    expect(getByTestId("valueB").props.children).toBe(42);
  });

  it("should render children without providers when no providers are given", () => {
    const CombinedProvider = composeProviders();

    const { getByText } = render(
      <CombinedProvider>
        <Text>Child Component</Text>
      </CombinedProvider>
    );

    expect(getByText("Child Component")).toBeTruthy();
  });
});
