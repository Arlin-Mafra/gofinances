import { renderHook, act } from "@testing-library/react-hooks";
import { AuthProvider, useAuth } from "./auth";

jest.mock("expo-google-app-auth", () => {
  return {
    logInAsync: () => {
      return {
        type: "success",
        user: {
          id: "any_email",
          email: "arlinsantana@gmail.com",
          name: "Arlin",
          photo: "any_photo",
        },
      };
    },
  };
});

describe("Auth Hook", () => {
  it("should be able to sign in with Google account existing", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe("arlinsantana@gmail.com");
  });
});
