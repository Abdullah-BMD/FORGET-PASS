import { createSlice } from "@reduxjs/toolkit";


export const resetPasswordSlice = createSlice({
    name: "Reset Password data",
    initialState: {
        resetPass: {
            email: "",
            OTP: ""
        }
    },
    reducers: {
        setPassword: (state, action) => {
            return {
                ...state,
                resetPass: { ...action.payload }
            }
        },
        resetPassword: (state) => {
            return {
                ...state,
                resetPass: {
                    email: "",
                    OTP: ""
                }
            }
        }
    }
});

export const { setPassword, resetPassword } = resetPasswordSlice.actions;
export const resetPasswordRedcuer = resetPasswordSlice.reducer;
