import { OneDayMealType } from "./types"
import OneMeal from './OneMeal';
export const ManyDaysMeal:React.FC<{props:OneDayMealType}> = ({props}) => {

const one_day_meal = props
  return (
    <ul>
      {one_day_meal["morning"].meal_images.length || one_day_meal["morning"].menus.length ?
        <OneMeal props={{meal_type: "morning", meal: one_day_meal["morning"]}}></OneMeal>
        : null
      }
      {one_day_meal["lunch"].meal_images.length || one_day_meal["lunch"].menus.length ?
        <OneMeal props={{meal_type: "lunch", meal: one_day_meal["lunch"]}}></OneMeal>
        : null
      }
      {one_day_meal["dinner"].meal_images.length || one_day_meal["dinner"].menus.length ?
        <OneMeal props={{meal_type: "dinner", meal: one_day_meal["dinner"]}}></OneMeal>
        : null
      }
      {one_day_meal["other"].meal_images.length || one_day_meal["other"].menus.length ?
        <OneMeal props={{meal_type: "other", meal: one_day_meal["other"]}}></OneMeal>
        : null
      }
    </ul>
  )

}

export default ManyDaysMeal