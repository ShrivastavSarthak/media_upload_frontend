import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserSliceInterface {
  userId: string;
  token: string;
}

const initialState: UserSliceInterface = {
  userId: "",
  token: "",
};

interface AuthPayload {
  userId: string;
  token: string;
}

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthPayload>) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
  },
});

export const { setAuth } = userSlice.actions;
export default userSlice.reducer;
