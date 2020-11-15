import { configureStore } from '@reduxjs/toolkit'
import appointmentsReducer from './appointments'

const store = configureStore({
    reducer: {
        appointments: appointmentsReducer
    }
})

export default store