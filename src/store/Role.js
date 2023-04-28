import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Interceptor/AXIOS";
import { toast } from "react-hot-toast";




const initialState = {
    isLoading: false,
    isRole: []
};


export const roleHandler = createAsyncThunk(
    'addRole', async (values) => {
        try {
            const { data } = await axiosInstance.post("/Roles/Add", values);
            console.log(data)
        }

        catch (e) {
            console.log(e)
        }
    }
)

export const getRoleHandler = createAsyncThunk(
    'getRole', async () => {
        try {
            const { data } = await axiosInstance.get("/Roles/GetAll");
            return data
        }

        catch (e) {
            console.log(e)
        }
    }
)

export const updateRoleHandler = createAsyncThunk(
    'updateRole', async (values) => {
        try {
            const { data } = await axiosInstance.put('/Roles/Update', values)
            return data;
        }

        catch (e) {
            console.log(e)
        }
    }
)

export const deleteHandler = createAsyncThunk(
    'deleteRole', async (id) => {
        try {
            const res = await axiosInstance.delete(`/Roles/Remove?id=${id}`);
            console.log(res);
        }
        catch (e) {
            console.log(e)
        }
    }
)

export const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(roleHandler.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(roleHandler.fulfilled, (state, action) => {
            state.isLoading = false;
            toast.success('Role Added Successfully !')

        });
        builder.addCase(roleHandler.rejected, (state, action) => {
            state.isLoading = false;
        });



        builder.addCase(getRoleHandler.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getRoleHandler.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isRole = action.payload
            // toast.success('Role Added Successfully !')

        });
        builder.addCase(getRoleHandler.rejected, (state, action) => {
            state.isLoading = false;
        });



        builder.addCase(updateRoleHandler.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(updateRoleHandler.fulfilled, (state, action) => {
            state.isLoading = false;
            toast.success('Role Updated Successfully !')

        });
        builder.addCase(updateRoleHandler.rejected, (state, action) => {
            state.isLoading = false;
        });



        builder.addCase(deleteHandler.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(deleteHandler.fulfilled, (state, action) => {
            state.isLoading = false;
            toast.success('Role Deleted Successfully !')

        });
        builder.addCase(deleteHandler.rejected, (state, action) => {
            state.isLoading = false;
        });
    }
})


// export const { } = roleSlice.actions
export default roleSlice.reducer