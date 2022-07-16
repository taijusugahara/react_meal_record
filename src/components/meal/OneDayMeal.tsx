import {useEffect} from 'react'
import isLoginCheck from '../../utils/isLogin'
import { isLogin } from '../accounts/accountsSlice';
import { useNavigate } from 'react-router-dom';
import {useAppSelector,useAppDispatch} from '../../app/hooks'
import { loginAsync,userInfoAsync } from '../accounts/accountsSlice'

const OneDayMeal:React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const is_login = useAppSelector(isLogin)
  useEffect(() => {
    if(is_login){
    }else{
      const get_user_info = async() => {
        await dispatch(userInfoAsync())
      }
      get_user_info()
    }
  },[])
  const test = async() => {
    await dispatch(userInfoAsync()).unwrap(); 
  }
  return (
    <>
      <p>this is meal page</p>
      <p onClick={()=>{test()}}> user info</p>
    </>
  )

}

export default OneDayMeal