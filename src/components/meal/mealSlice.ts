import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {MealType,OneDayMealType,OneMealType} from './types'
import { RootState, AppThunk } from '../../app/store';
import axios from "axios";
import AxiosAuth from '../../utils/AxiosAuth';
import {get_date_month_and_day_str, get_date_str} from "../../utils/Date"
const apiUrl = process.env.REACT_APP_DEV_API_URL;
const auth_axios = AxiosAuth()
const one_meal:OneMealType = {
  ID : 0,
  meal_type : "",
  user : {
    ID : 0,
    name : ""
  },
  user_id : 0,
  menus : [],
  meal_images : [],
  date : "",
}
const one_day_meal:OneDayMealType =  {
  morning: one_meal,
  lunch : one_meal,
  dinner : one_meal,
  other : one_meal,
}

const initialState:MealType ={
  one_day_meal : one_day_meal,
  one_week_meal : [],
  one_month_meal : [],
  date_info : {
    full_date : get_date_str(new Date()),
    month_and_day_date : get_date_month_and_day_str(new Date())
  }
}

//typescript問題
//axios responseとして型を設定してもその型通りのプロパティじゃなくてもresponseされてしまう。defaultではany。
//解決策分からず。
// export const OneDayMealIndexAsync = createAsyncThunk(
//   'meal/one_day_meal_index',
//   async (date: string)=>{
//     const res = await auth_axios.get(`${apiUrl}v2/meal/index/day/${date}/`, {
//       headers: {
//         Authorization: `JWT ${localStorage.jwt_access_token}`,
//       },
//     });
//     return res.data.data;
//   }
// )

export const OneDayMealIndexAsync = createAsyncThunk(
  'meal/one_day_meal_index',
  async (date: string)=>{
    const res = await auth_axios.get(`${apiUrl}v2/meal/index/day/${date}/`, {
      headers: {
        Authorization: `JWT ${localStorage.jwt_access_token}`,
      },
    });
    return res.data.data;
  }
)

export const MealImageCreateAsync = createAsyncThunk(
  'meal/meal_image_create',
  async (param:{meal_type:string,upload_data:FormData})=>{
    const res = await auth_axios.post(`${apiUrl}v2/meal/image_create`,param.upload_data, {
      headers: {
        //別にmultipart/form-dataじゃなくていいみたい "Content-Type": "multipart/form-data; boundary=xxxyyyzzzBoun",
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.jwt_access_token}`,
      },
    });
    return {"meal_type":param.meal_type,"data":res.data.image};
  }
)

export const MenuCreateAsync = createAsyncThunk(
  'meal/menu_create',
  async (param:{meal_type:string,upload_data:FormData})=>{
    const res = await auth_axios.post(`${apiUrl}v2/meal/menu_create/`,param.upload_data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.jwt_access_token}`,
      },
    });
    return {"meal_type":param.meal_type,"data":res.data.menu};
  }
)

export const MenuDeleteAsync = createAsyncThunk(
  'meal/menu_delete',
  async (param:{meal_type:string,menu_id:number})=>{
    const res = await auth_axios.delete(`${apiUrl}v2/meal/delete/menu/${param.menu_id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.jwt_access_token}`,
      },
    });
    return {"meal_type":param.meal_type,"data":res.data.menu};
  }
)

export const MealImageDeleteAsync = createAsyncThunk(
  'meal/meal_image_delete',
  async (param:{meal_type:string,meal_image_id:number})=>{
    const res = await auth_axios.delete(`${apiUrl}v2/meal/delete/meal_image/${param.meal_image_id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.jwt_access_token}`,
      },
    });
    return {"meal_type":param.meal_type,"data":res.data.meal_image};
  }
)

const dateChange = (state:MealType,date_change_type:string) => {
  const the_date= state.date_info.full_date
  const the_date_datetime = new Date(the_date)
  let new_date = new Date()
  if(date_change_type == "one_day_before"){
    new_date = new Date(the_date_datetime.getFullYear(), the_date_datetime.getMonth(), the_date_datetime.getDate() - 1);
  }
  if(date_change_type == "one_day_after"){
    new_date = new Date(the_date_datetime.getFullYear(), the_date_datetime.getMonth(), the_date_datetime.getDate() + 1);
  }
  const new_full_date = get_date_str(new_date)
  const new_month_and_day_date = get_date_month_and_day_str(new_date)
  state.date_info.full_date = new_full_date
  state.date_info.month_and_day_date = new_month_and_day_date
}

export const MealSlice = createSlice({
  name: 'meal',
  initialState,
  reducers: {
    dateChangeToOneDayBefore: (state) => {
      dateChange(state,"one_day_before")
    },
    dateChangeToOneDayAfter: (state) => {
      dateChange(state,"one_day_after")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(OneDayMealIndexAsync.fulfilled, (state,action) => {
        state.one_day_meal.morning =action.payload.morning
        state.one_day_meal.lunch =action.payload.lunch
        state.one_day_meal.dinner =action.payload.dinner
        state.one_day_meal.other =action.payload.other
      })
      .addCase(OneDayMealIndexAsync.rejected, (state,action) => {
        alert('1日の食事情報の取得に失敗しました。')
      })
      .addCase(MealImageCreateAsync.fulfilled, (state,action) => {
        //meal_type stringのままではkey指定できないためas使う
        const meal_type = action.payload.meal_type as keyof OneDayMealType
        const data = action.payload.data
        state.one_day_meal[meal_type].meal_images = [...state.one_day_meal[meal_type].meal_images,data]
      })
      .addCase(MealImageCreateAsync.rejected, (state,action) => {
        alert('画像の保存に失敗しました。')
      })
      .addCase(MenuCreateAsync.fulfilled, (state,action) => {
        const meal_type = action.payload.meal_type as keyof OneDayMealType
        const data = action.payload.data
        state.one_day_meal[meal_type].menus = [...state.one_day_meal[meal_type].menus,data]
      })
      .addCase(MenuCreateAsync.rejected, (state,action) => {
        alert('メニューの追加に失敗しました。')
      })
      .addCase(MenuDeleteAsync.fulfilled, (state,action) => {
        const meal_type = action.payload.meal_type as keyof OneDayMealType
        const menu_id = action.payload.data.ID
        state.one_day_meal[meal_type].menus = state.one_day_meal[meal_type].menus.filter((m)=>m.ID !== menu_id)
      })
      .addCase(MenuDeleteAsync.rejected, (state,action) => {
        alert('メニューの削除に失敗しました。')
      })
      .addCase(MealImageDeleteAsync.fulfilled, (state,action) => {
        const meal_type = action.payload.meal_type as keyof OneDayMealType
        const meal_image_id = action.payload.data.ID
        state.one_day_meal[meal_type].meal_images = state.one_day_meal[meal_type].meal_images.filter((i)=>i.ID !== meal_image_id)
      })
      .addCase(MealImageDeleteAsync.rejected, (state,action) => {
        alert('画像の削除に失敗しました。')
      })

      // .addCase(userCreateAsync.fulfilled, (state,action) => {
      //   console.log('ユーザー作成に成功しました。')
      //   state.is_login = true
      // })
      // .addCase(userCreateAsync.rejected, (state,action) => {
      //   alert('ユーザー作成に失敗しました')
      // })
      // .addCase(userInfoAsync.fulfilled, (state,action) => {
      //   console.log("user info")
      //   state.is_login = true
      //   state.user_info = {
      //     id : action.payload.ID,
      //     name : action.payload.name,
      //     email : action.payload.email
      //   }
      // })
      // .addCase(userInfoAsync.rejected, (state,action) => {
      //   console.log("user info 取得に失敗しました。")
      // })
  },
})

export const {
  dateChangeToOneDayBefore,
  dateChangeToOneDayAfter,
 } = MealSlice.actions;

export const oneDayMealState = (state: RootState) => state.meal.one_day_meal
export const theDateState = (state: RootState) => state.meal.date_info

export default MealSlice.reducer;