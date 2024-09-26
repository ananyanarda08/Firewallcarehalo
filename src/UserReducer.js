import { createSlice } from "@reduxjs/toolkit";
import { userList } from "./DataUser";

const userSlice = createSlice({
    name:"users",
    initialState: userList,
    reducers: {
        addUser: (state, action)=>{
           state.push(action.payload)
        },
        updateUser: (state, action)=>{
            const {id , name , email}= action.payload;
            const existing = state.find(userList=> userList.id == id)

            console.log(existing)
            if(existing){
                existing.name=name;
                existing.email=email;
            }
        },
        deletedUser: (state, action)=>{
            const {id, name, email}= action.payload;
            const existing = state.find(userList=> userList.id == id)

            if(existing){
                return state.filter(f => f.id !== id)
            }
        }
    }
})

export  const {addUser, updateUser, deletedUser} = userSlice.actions
export default userSlice.reducer;