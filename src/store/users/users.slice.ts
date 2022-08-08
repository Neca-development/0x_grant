import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { IUser } from '@store/users/user.model'
import { fetchUsers } from '@store/users/users.actions'

interface IUsersState {
  users: IUser[]
  isLoading: boolean
  error: string
}

const initialState: IUsersState = {
  users: [],
  isLoading: false,
  error: '',
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // not async actions, which edit global state
  },
  extraReducers: {
    // async action creators
    [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
      state.isLoading = false
      state.error = ''
      state.users = action.payload
    },
    [fetchUsers.pending.type]: (state) => {
      state.isLoading = true
    },
    [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export default usersSlice.reducer
