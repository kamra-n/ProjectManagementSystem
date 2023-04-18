import { configureStore } from '@reduxjs/toolkit'
import Auth from './Auth'
export const store = configureStore({
  reducer: {Auth}
})