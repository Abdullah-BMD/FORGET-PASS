import { createSlice } from "@reduxjs/toolkit";


export const adminSlice = createSlice({
    name: "Admin data slice",
    initialState: {
        admin: {
            id: "",
            user_name : "" , 
            email : "" , 
            password : "" , 
            updated: false , 
            curr_vals : {username : "" , password : ""}
        }
    },
    reducers: {
        setAdmin: (state, action) => {
            return {
                ...state,
                admin: { ...action.payload }
            }
        },
        resetAdmin: (state) => {
            return {
                ...state,
                admin: {
                    id: "",
                    user_name : "" , 
                    email : "" , 
                    password : "",
                    updated: false , 
                    curr_vals : {username : "" , password : ""}
                }
            }
        }
    }
});

export const { setAdmin, resetAdmin } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;


