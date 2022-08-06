import {useEffect} from 'react'
import { isLogin } from '../accounts/accountsSlice';
import { useNavigate } from 'react-router-dom';
import {useAppSelector,useAppDispatch} from '../../app/hooks'
import { userInfoAsync } from '../accounts/accountsSlice'
import { 
  OneWeekMealIndexAsync,
  oneWeekMealState,
  dateChangeToSetTheDate,
  spanTypeChange
 } from './mealSlice';
import ManyDaysMeal from './ManyDaysMeal';
import {get_date_month_and_day_str, get_date_str} from "../../utils/Date"

export const OneDayMeal:React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const is_login = useAppSelector(isLogin)
  const one_week_meal = useAppSelector(oneWeekMealState)
  useEffect(() => {
    if(is_login){
    }else{
      const get_user_info = async() => {
        await dispatch(userInfoAsync())
      }
      get_user_info()
    }
    const get_one_day_meal_data = async() => {
      await dispatch(spanTypeChange("week"))
      await dispatch(OneWeekMealIndexAsync())
    }
    get_one_day_meal_data()
    console.log(is_login)
  },[])

  const toDatePage = async(key:string)=>{
    await dispatch(dateChangeToSetTheDate(key))
    navigate("/one_day_meal")
  }

  return (
    <ul>
      {Object.keys(one_week_meal).map(key=>(
        <li key={key}> {/* object展開するのにkeyがstringだとエラー出たため以下の形に */}
          <div style={{"display":"flex", "alignItems":"center", "padding":"20px 0"}}>
            <hr style={{"flex" : 1}} />
            <p onClick={()=>toDatePage(key)}>
              {get_date_month_and_day_str(new Date(key))}
            </p>
            <hr style={{"flex" : 1}} />
          </div>
          
          <ManyDaysMeal key={key} props={one_week_meal[key as keyof typeof one_week_meal]}/>
        </li>
      ))}
    </ul>
  )

}

export default OneDayMeal