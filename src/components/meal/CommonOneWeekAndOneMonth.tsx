/** @jsxImportSource @emotion/react */
import { css , keyframes }  from '@emotion/react'
import {useEffect,useMemo} from 'react'
import { useNavigate } from 'react-router-dom';
import {useAppSelector,useAppDispatch} from '../../app/hooks'
import {
  OneMonthMealIndexAsync,
  OneWeekMealIndexAsync,
  oneMonthMealState,
  oneWeekMealState,
  dateChangeToSetTheDate,
  spanTypeChange
 } from './mealSlice';
import ManyDaysMeal from './ManyDaysMeal';
import UseLoginCheckAndLoginDo from './customhook/useLoginCheckAndLoginDo';

import {get_date_month_and_day_str} from "../../utils/Date"
import commonsStyle from '../common/css';

export const CommonOneWeekAndOneMonth:React.FC<{is_week_or_month:string}> = (props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  //ifの中でhooksは使えない。よってhooksはifを使わずその前の引数にifを当てる感じに
  let many_day_meals_state = oneMonthMealState//month
  if(props.is_week_or_month=="week"){
    many_day_meals_state = oneWeekMealState//week
  }
  const many_day_meals = useAppSelector(many_day_meals_state)

  UseLoginCheckAndLoginDo()//こっちが下より先に呼び出される
  useEffect(() => {
    const get_one_month_meal_data = async() => {
      await dispatch(spanTypeChange(props.is_week_or_month))
      if(props.is_week_or_month=="week"){
        await dispatch(OneWeekMealIndexAsync())
      }else if(props.is_week_or_month=="month"){
        await dispatch(OneMonthMealIndexAsync())
      }
      document.getElementById("many_meals")!.style.display="block"
    }
    get_one_month_meal_data()
    
  },[])

  const toDatePage = async(key:string)=>{
    await dispatch(dateChangeToSetTheDate(key))
    navigate("/one_day_meal")
  }

  return (

    <ul id="many_meals" style={{"display":"none"}}>{/* 初期値はkeyがtestでdate表示の際におかしくなるので最初はnone. useEffect終わったらblockにする感じにしてる */}
      {Object.keys(many_day_meals).map(key=>(

        <li key={key}> {/* object展開するのにkeyがstringだとエラー出たため以下の形に */}
          <div style={{"display":"flex", "alignItems":"center", "padding":"20px 0"}}>
            <hr style={{"flex" : 1,"color":"#c3c3c3"}} />
            <p css={commonsStyle.dateLink} onClick={()=>toDatePage(key)}>
              <strong>{get_date_month_and_day_str(new Date(key))}</strong>
            </p>
            <hr style={{"flex":1,"color":"#c3c3c3"}} />
          </div>
          
          <ManyDaysMeal key={key} props={many_day_meals[key as keyof typeof many_day_meals]}/>
        </li>
      ))}
    </ul>
  )

}

export default CommonOneWeekAndOneMonth