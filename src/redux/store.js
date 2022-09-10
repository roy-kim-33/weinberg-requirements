import { configureStore } from '@reduxjs/toolkit'
import scopeReducer from './features/scopeSlice'

export default configureStore({
  reducer: {
    scope: scopeReducer,
  },
})