import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  password: string;
  isAuthenticated: boolean;
  error: string | null;
}

interface User {
  email: string;
  password: string;
}

const initialState: UserState = {
  email: "",
  password: "",
  isAuthenticated: false,
  error: null,
};

// Завантаження даних користувача з localStorage, якщо вони існують
const storedUser = localStorage.getItem("currentUser");
if (storedUser) {
  const parsedUser = JSON.parse(storedUser);
  initialState.email = parsedUser.email;
  initialState.password = parsedUser.password;
  initialState.isAuthenticated = true;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      const { email, password } = action.payload;
      state.email = email;
      state.password = password;
      state.isAuthenticated = true;
      state.error = null;

      // Збереження нового користувача у списку користувачів
      const storedUsers = localStorage.getItem("users");
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
      users.push({ email, password });
      localStorage.setItem("users", JSON.stringify(users));

      // Збереження поточного користувача у localStorage
      localStorage.setItem("currentUser", JSON.stringify({ email, password }));
    },
    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      const { email, password } = action.payload;
      const storedUsers = localStorage.getItem("users");
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        state.email = email;
        state.password = password;
        state.isAuthenticated = true;
        state.error = null;
        // Збереження поточного користувача у localStorage
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ email, password })
        );
      } else {
        state.error = "Invalid email or password";
      }
    },
    logout: (state) => {
      state.email = "";
      state.password = "";
      state.isAuthenticated = false;
      state.error = null;
      // Видалення даних поточного користувача з localStorage
      localStorage.removeItem("currentUser");
    },
  },
});

export const { register, login, logout } = userSlice.actions;
export default userSlice.reducer;
