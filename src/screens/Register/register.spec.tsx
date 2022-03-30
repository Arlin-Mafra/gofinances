import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { Register } from ".";
import theme from "../../global/styles/theme";

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: jest.fn(),
  };
});

describe("Register screen", () => {
  it("should be open category modal when user click on button", () => {
    const { getByTestId } = render(<Register />, {
      wrapper: Providers,
    });

    const modalCategory = getByTestId("category-modal");
    const buttonCategory = getByTestId("category-button");
    fireEvent.press(buttonCategory);
    expect(modalCategory.props.visible).toBeTruthy();
  });
});
