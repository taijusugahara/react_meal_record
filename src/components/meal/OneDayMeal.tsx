import {useEffect} from 'react'
import isLoginCheck from '../../utils/isLogin'
import { isLogin } from '../accounts/accountsSlice';
import { useNavigate } from 'react-router-dom';
import {useAppSelector,useAppDispatch} from '../../app/hooks'
import { loginAsync,userInfoAsync } from '../accounts/accountsSlice'
import { 
  OneDayMealIndexAsync,
  oneDayMealState,
  theDateState
 } from './mealSlice';

import OneMeal from './OneMeal';
export const OneDayMeal:React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const is_login = useAppSelector(isLogin)
  const one_day_meal = useAppSelector(oneDayMealState)
  const date = useAppSelector(theDateState)
  useEffect(() => {
    if(is_login){
    }else{
      const get_user_info = async() => {
        await dispatch(userInfoAsync())
      }
      get_user_info()
    }
    const get_one_day_meal_data = async() => {
      // await dispatch(OneDayMealIndexAsync(date.full_date))
      await dispatch(OneDayMealIndexAsync(date.full_date))
    }
    get_one_day_meal_data()
    console.log(is_login)

  },[])
  const test = async() => {
    await dispatch(userInfoAsync()).unwrap();
  }
  const hello = "hello"
  return (
    <>
      <ul>
        {Object.keys(one_day_meal).map(key=>(
          <li key={key}> {/* object展開するのにkeyがstringだとエラー出たため以下の形に */}
           <p>{key}</p>
           <OneMeal key={key} props={{meal_type: key, meal: one_day_meal[key as keyof typeof one_day_meal]}}></OneMeal>
          </li>
        ))}
      </ul>
      <p>this is meal page</p>
      <p onClick={()=>{test()}}> user info</p>
    </>
  )

}

export default OneDayMeal