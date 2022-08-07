import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from "axios";
import AxiosAuth from '../../utils/AxiosAuth';
import {AccountInputState,LoginInput,UserCreateInput} from './types'
const apiUrl = process.env.REACT_APP_DEV_API_URL;
const login_url = `${apiUrl}v1/account/login`
const user_create_url = `${apiUrl}v1/account/register`
const user_info_url = `${apiUrl}v2/user_info`

const auth_axios = AxiosAuth()

const initialState:AccountInputState ={
  is_login : false,
  user_info : {
    id : "",
    name: "",
    email: ""
  },
}

export const loginAsync = createAsyncThunk(
  'account/login',
  async (login_input: LoginInput) => {
    const res = await axios.post(login_url, login_input, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const userCreateAsync = createAsyncThunk(
  'account/register',
  async (params: UserCreateInput) => {
    const res = await axios.post(user_create_url, params, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const userInfoAsync = createAsyncThunk(
  'account/user_info',
  async () => {
    const res = await auth_axios.get(user_info_url, {
      headers: {
        Authorization: `JWT ${localStorage.jwt_access_token}`,
      },
    })
    return res.data.user
  }
);

export const AccountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    login: (state) => {
      state.is_login = true
    },
    logout: (state) => {
      state.is_login = false
      state.user_info = {
        id : "",
        email: "",
        name: "",
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state,action) => {
        localStorage.setItem("jwt_access_token", action.payload.access_token);
        localStorage.setItem("jwt_refresh_token", action.payload.refresh_token);
        state.is_login = true
      })
      .addCase(loginAsync.rejected, (state,action) => {
        alert('loginに失敗しました')
      })
      .addCase(userCreateAsync.fulfilled, (state,action) => {
        state.is_login = true
      })
      .addCase(userCreateAsync.rejected, (state,action) => {
        alert('ユーザー作成に失敗しました')
      })
      .addCase(userInfoAsync.fulfilled, (state,action) => {
        state.is_login = true
        state.user_info = {
          id : action.payload.ID,
          name : action.payload.name,
          email : action.payload.email
        }
      })
      .addCase(userInfoAsync.rejected, (state,action) => {
        console.log("user info 取得に失敗しました。")
      })
  },
});

export const {
   login,
   logout,
  } = AccountSlice.actions;

export const isLogin = (state: RootState) => state.account.is_login
export const selectUserInfo = (state: RootState) => state.account.user_info

export default AccountSlice.reducer;
