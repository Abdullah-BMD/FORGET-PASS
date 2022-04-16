import { createSlice } from "@reduxjs/toolkit";


export const loginDataSlice = createSlice({
    name: "login data",
    initialState: {
        loginData: {
            password: "",
            user_name: ""
        }
    },
    reducers: {
        setLoginData: (state, action) => {
            return {
                ...state,
                loginData: { ...action.payload }
            }
        },
        resetLoginData: (state) => {
            return {
                ...state,
                loginData: {
                    password: "",
                    user_name: ""
                }
            }
        }
    }
});

export const { setLoginData, resetLoginData } = loginDataSlice.actions;
export const loginDataRedcuer = loginDataSlice.reducer;
