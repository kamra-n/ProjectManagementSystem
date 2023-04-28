import { configureStore } from '@reduxjs/toolkit'
import Auth from './Auth'
import Role from './Role'
export const store = configureStore({
  reducer: {
    Auth,
    Role
  }
})