import { combineReducers } from '@reduxjs/toolkit'
import usersReducer from '@store/users/users.slice'

// Include all the reducer to combine and provide to configure store.
const rootReducer = combineReducers({
  usersReducer,
})

export default rootReducer
