import { renderHook, act } from "@testing-library/react-hooks";
import { logInAsync } from "expo-google-app-auth";
// import { startAsync } from "expo-auth-session";
// import fetchMock from "jest-fetch-mock/types";
import { mocked } from "jest-mock";
import { AuthProvider, useAuth } from "./auth";

// fetchMock.enableMocks();

jest.mock("expo-google-app-auth");

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe("Auth Hook", () => {
  it("should be able to sign in with Google account existing", async () => {
    const googleMocked = mocked(logInAsync);
    googleMocked.mockReturnValueOnce({
      type: "success",
      user: {
        id: "any_id",
        email: "arlinsantana@gmail.com",
        name: "Arlin",
        photo: "any_photo",
      },
    } as any);

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe("arlinsantana@gmail.com");
  });

  it("user should not connect if cancel authentication with Google", async () => {
    const googleMocked = mocked(logInAsync);
    googleMocked.mockReturnValueOnce({
      type: "cancel",
    } as any);

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty("id");
  });
});
