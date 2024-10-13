import {configureStore} from '@reduxjs/toolkit'
import userslice from './slices/userslice'

export const store=configureStore({
    reducer:{
        userSlice:userslice
    }
})