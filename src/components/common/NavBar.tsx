import {useEffect,useRef} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import {useAppSelector,useAppDispatch} from '../../app/hooks'
import { useNavigate } from 'react-router-dom';

import {isLogin,logout} from '../accounts/accountsSlice'
import {OneDayMealIndexAsync,theDateState,dateChangeToOneDayBefore,dateChangeToOneDayAfter} from '../meal/mealSlice'

const NavBar:React.FC = () => {
  const ref = useRef(true);
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const date = useAppSelector(theDateState)
  const is_login = useAppSelector(isLogin)
  const Logout = async () => {
    await dispatch(logout())
    localStorage.removeItem('jwt_access_token')
    localStorage.removeItem('jwt_refresh_token')
    navigate("/login")
  }
  
  useEffect(() => {
    if (ref.current) {//初回時は処理させなくする
      ref.current = false;
      return;
    }
    const new_date = date.full_date
    const get_new_date_meal = async () => {
      await dispatch(OneDayMealIndexAsync(new_date))
    }
    get_new_date_meal()
    
 }, [date.full_date])//sliceのstateのdateが変化したときに処理

  const DateChangeToOneDayBefore = async () => {
    await dispatch(dateChangeToOneDayBefore())
    //続きはuseEffect(stateが変更されたときに呼び出される。変更したdateの食事を取得)
    // dispatchの変更したstateが取得できなかったのでuseeffectで処理することにした。
  }
  const DateChangeToOneDayAfter = async () => {
    await dispatch(dateChangeToOneDayAfter())
    //続きはuseEffect(stateが変更されたときに呼び出される。変更したdateの食事を取得)
  }
  

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{backgroundColor:"#39094a"}}>
          <Toolbar sx={{alignItems:"center", justifyContent:"space-between"}}>
            <Typography variant="h6" component="div">
              Meal Record
            </Typography>
            <div>
              <p onClick={()=>{DateChangeToOneDayBefore()}}>previous</p>
              <p>{date.month_and_day_date}</p>
              <p onClick={()=>{DateChangeToOneDayAfter()}}>next</p>
            </div>
            
            <Button color="inherit">
            {is_login ? <p onClick={Logout}>Logout</p>:<></>}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default NavBar