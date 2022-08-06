import {useEffect} from 'react'
import isLoginCheck from '../../utils/isLogin'
import { isLogin } from '../accounts/accountsSlice';
import { useNavigate } from 'react-router-dom';
import {useAppSelector,useAppDispatch} from '../../app/hooks'
import { loginAsync,userInfoAsync } from '../accounts/accountsSlice'
import { 
  OneDayMealIndexAsync,
  oneDayMealState,
  spanTypeChange
 } from './mealSlice';

import OneMeal from './OneMeal';  
export const OneDayMeal:React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const is_login = useAppSelector(isLogin)
  const one_day_meal = useAppSelector(oneDayMealState)
  useEffect(() => {
    if(is_login){
    }else{
      const get_user_info = async() => {
        await dispatch(userInfoAsync())
      }
      get_user_info()
    }
    const get_one_day_meal_data = async() => {
      await dispatch(spanTypeChange("day"))
      await dispatch(OneDayMealIndexAsync())
    }
    get_one_day_meal_data()
  },[])
  const test = async() => {
    await dispatch(userInfoAsync()).unwrap();
  }
  return (
    <>
      <ul>
        {/* このようにobject mapで展開したかったが、これだとdinnerが先に来てしまう。abc順。理由としてはgo側でmapを送るとき勝手にabc順になってしまうため。 */}
        {/* object展開するのにkeyがstringだとエラー出たため以下の形に */}
        {/* {Object.keys(one_day_meal).map(key=>(
          <li key={key}>
           <p>{key}</p>
           <OneMeal key={key} props={{meal_type: key, meal: one_day_meal[key as keyof typeof one_day_meal]}}></OneMeal>
          </li>
        ))} */}
      
        <OneMeal props={{meal_type: "morning", meal: one_day_meal["morning"]}}></OneMeal>
        <OneMeal props={{meal_type: "lunch", meal: one_day_meal["lunch"]}}></OneMeal>
        <OneMeal props={{meal_type: "dinner", meal: one_day_meal["dinner"]}}></OneMeal>
        <OneMeal props={{meal_type: "other", meal: one_day_meal["other"]}}></OneMeal>
      </ul>
      <p>this is meal page</p>
      <p onClick={()=>{test()}}> user info</p>
    </>
  )

}

export default OneDayMeal