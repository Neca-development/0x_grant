import { createAsyncThunk } from '@reduxjs/toolkit'
import UsersService from '@services/users.service'

// create async thunk automatic create three states of data fetching
// 1. pending
// 2. fullfield
// 3. reject (if some error exist)
export const fetchUsers = createAsyncThunk('users/fetchAll', async (_, thunkAPI) => {
  try {
    // use services from api/services folder
    const response = await UsersService.getUsers('users')
    return response.data
  } catch (e) {
    return thunkAPI.rejectWithValue('Error')
  }
})
