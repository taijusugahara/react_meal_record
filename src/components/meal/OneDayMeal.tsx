import {useEffect} from 'react'
import {useAppSelector,useAppDispatch} from '../../app/hooks'
import { 
  OneDayMealIndexAsync,
  oneDayMealState,
  spanTypeChange
 } from './mealSlice';

import OneMeal from './OneMeal';
import UseLoginCheckAndLoginDo from './customhook/useLoginCheckAndLoginDo';

const OneDayMeal:React.FC = () => {
  const dispatch = useAppDispatch()
  const one_day_meal = useAppSelector(oneDayMealState)
  UseLoginCheckAndLoginDo()//こっちが下より先に呼び出される
  useEffect(() => {
    const get_one_day_meal_data = async() => {
      await dispatch(spanTypeChange("day"))
      await dispatch(OneDayMealIndexAsync())
    }
    get_one_day_meal_data()
  },[])

  return (
    <ul style={{"padding": "30px 0"}}>
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
  )

}

export default OneDayMeal