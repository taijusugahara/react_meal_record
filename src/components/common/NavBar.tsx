/** @jsxImportSource @emotion/react */
import { css , keyframes }  from '@emotion/react'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import {useAppSelector,useAppDispatch} from '../../app/hooks'
import { useNavigate } from 'react-router-dom';

import {isLogin,logout} from '../accounts/accountsSlice'
import {OneDayMealIndexAsync,
        theDateState,
        spanTypeState,
        dateChangeToOneDayBefore,
        dateChangeToOneDayAfter,
        dateChangeToToday,
        OneWeekMealIndexAsync,
        OneMonthMealIndexAsync} from '../meal/mealSlice'

const NavBar:React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const date = useAppSelector(theDateState)
  const span_type = useAppSelector(spanTypeState)
  const is_login = useAppSelector(isLogin)
  const Logout = async () => {
    await dispatch(logout())
    localStorage.removeItem('jwt_access_token')
    localStorage.removeItem('jwt_refresh_token')
    navigate("/login")
  }

  const DateChangeToOneDayBefore = async () => {
    await dispatch(dateChangeToOneDayBefore())
    await dispatch(OneDayMealIndexAsync())
  }
  const DateChangeToOneDayAfter = async () => {
    await dispatch(dateChangeToOneDayAfter())
    await dispatch(OneDayMealIndexAsync())
  }
  const DateChangeToToday = async () => {
    await dispatch(dateChangeToToday())
    await dispatch(OneDayMealIndexAsync())
    navigate("/one_day_meal")
  }
  const DateChangeToWeekDay = async () => {
    await dispatch(OneWeekMealIndexAsync())
    navigate("/one_week_meal")
  }
  const DateChangeToMonthDay = async () => {
    await dispatch(OneMonthMealIndexAsync())
    navigate("/one_month_meal")
  }
  

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{backgroundColor:"#39094a",padding:"10px 20px"}}>
          <div css={nav_top}>
            <RestaurantIcon />
            <p onClick={()=>{DateChangeToOneDayBefore()}}>
              <ArrowBackIcon sx={{cursor:"pointer"}} />
            </p>

            {span_type == "day" &&
              <p>{date.month_and_day_date}</p>
            }
            

            <p onClick={()=>{DateChangeToOneDayAfter()}}>
              <ArrowForwardIcon sx={{cursor:"pointer"}} />
            </p>
            {is_login ? <p onClick={Logout}>
              <LogoutIcon sx={{cursor: "pointer"}} />
            </p>:<></>}
          </div>
          
          <div css={nav_top}>
            <p onClick={()=>{DateChangeToToday()}} css={cursor_pointer}>today</p>
            <p onClick={()=>{DateChangeToWeekDay()}} css={cursor_pointer}>week</p>
            <p onClick={()=>{DateChangeToMonthDay()}} css={cursor_pointer}>month</p>
          </div>
        </AppBar>
      </Box>
    </>
  )
}

export default NavBar

const nav_top = {
  display : "flex",
  alignItems : "center",
  justifyContent : "space-between"
}

const cursor_pointer = {
  cursor : "pointer"
}