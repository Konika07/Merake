import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    loggedUser: ''
  },
  reducers: {
    login: (state = false, action) => {
      state.isLoggedIn = action.payload;
    },
    loggedUser: (state, action) => {
      state.loggedUser = action.payload
    }
  },
});

const { actions, reducer } = userSlice
// Action creators are generated for each case reducer function
export const { login, loggedUser } = actions;

export default reducer