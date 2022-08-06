import {useEffect} from 'react'
import { isLogin } from '../accounts/accountsSlice';
import { useNavigate } from 'react-router-dom';
import {useAppSelector,useAppDispatch} from '../../app/hooks'
import { userInfoAsync } from '../accounts/accountsSlice'
import { 
  OneMonthMealIndexAsync,
  oneMonthMealState,
  dateChangeToSetTheDate,
  spanTypeChange
 } from './mealSlice';
import ManyDaysMeal from './ManyDaysMeal';
import {get_date_month_and_day_str, get_date_str} from "../../utils/Date"

export const OneDayMeal:React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const is_login = useAppSelector(isLogin)
  const one_month_meal = useAppSelector(oneMonthMealState)
  useEffect(() => {
    if(is_login){
    }else{
      const get_user_info = async() => {
        await dispatch(userInfoAsync())
      }
      get_user_info()
    }
    const get_one_day_meal_data = async() => {
      await dispatch(spanTypeChange("month"))
      await dispatch(OneMonthMealIndexAsync())
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
      {Object.keys(one_month_meal).map(key=>(
        <li key={key}> {/* object展開するのにkeyがstringだとエラー出たため以下の形に */}
          <div style={{"display":"flex", "alignItems":"center", "padding":"20px 0"}}>
            <hr style={{"flex" : 1}} />
            <p onClick={()=>toDatePage(key)}>
              <strong>{get_date_month_and_day_str(new Date(key))}</strong>
            </p>
            <hr style={{"flex" : 1}} />
          </div>
          
          <ManyDaysMeal key={key} props={one_month_meal[key as keyof typeof one_month_meal]}/>
        </li>
      ))}
    </ul>
  )

}

export default OneDayMeal