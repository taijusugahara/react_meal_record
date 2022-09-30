import {useEffect} from 'react'
import { isLogin } from '../../accounts/accountsSlice';
import {useAppSelector,useAppDispatch} from '../../../app/hooks'
import { userInfoAsync } from '../../accounts/accountsSlice'

const UseLoginCheckAndLoginDo = () => {
  const dispatch = useAppDispatch()
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

  return null
}

export default UseLoginCheckAndLoginDo