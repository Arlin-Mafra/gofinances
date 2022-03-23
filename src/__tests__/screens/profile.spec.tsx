import React from "react";
import { render } from "@testing-library/react-native";
import { Profile } from "../../screens/Profile";

describe("Profile Screen", () => {
  it("Check if show correctly user input name placeholder", () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText("Nome");

    expect(inputName.props.placeholder).toBeTruthy();
  });
  it("Check if user data has been loaded", () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId("test-name");
    const inputSurName = getByTestId("test-surname");

    expect(inputName.props.value).toEqual("Arlin");
    expect(inputSurName.props.value).toEqual("Mafra");
  });
});
