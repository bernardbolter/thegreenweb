import { createSlice } from '@reduxjs/toolkit'

let nextAppointmentId = 0;

const appointmentSlice = createSlice({
    name: 'appointments',
    initialState: [],
    reducers: {
        create: {
            reducer(state, {payload }) {
                const { id, name: appointmentName } = payload
                state.push({ id, name: appointmentName })
            },
            prepare(appointmentName) {
                return {
                    payload: {
                        name: appointmentName,
                        id: nextAppointmentId++
                    }
                }
            }
        }
    }
})

const { actions, reducer } = appointmentSlice

export const { create } = actions

export default reducer