import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, { setToken } from "../Interceptor/AXIOS";
import jwt_decode from "jwt-decode";



const initialState = {
    isLoading: false,
    isAuth: false,
    token: '',
    role: ''
};

export const LoginHandler = createAsyncThunk(
    'login',
    async (values) => {

        try {
            const res = await axiosInstance.post("/User/login", values)
            const { token } = await res.data;
            setToken(token)

        }
        catch (e) {
            console.log(e);
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(LoginHandler.pending, (state, action) => {
            state.isLoading = true;
            state.isAuth = false
        });
        builder.addCase(LoginHandler.fulfilled, (state, action) => {
            state.token = localStorage.getItem('token');
            state.isLoading = false;
            state.isAuth = true;
            state.role = jwt_decode(state.token)

        });
        builder.addCase(LoginHandler.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuth = false;
        });
    }
})


export const { } = authSlice.actions
export default authSlice.reducer