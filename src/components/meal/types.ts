export interface MealType {
  one_day_meal : OneDayMealType,
  one_week_meal : {[key in string]: OneDayMealType} ,
  one_month_meal :{[key in string]: OneDayMealType} ,
  date_info : {
    full_date : string,
    month_and_day_date : string,
    first_week : string,
    end_week : string,
    year_and_month : string
  },
  span_type : string
}

export interface OneDayMealType {
  morning : OneMealType,
  lunch : OneMealType,
  dinner : OneMealType,
  other : OneMealType,
}

export interface OneWeekMealType {
  data: {[key in string]: OneDayMealType},
  first_week_date : string,
  end_week_date : string
}

export interface OneMonthMealType {
  data: {[key in string]: OneDayMealType},
  first_month_date : string
}

export interface OneMealType {
  ID : number,
  meal_type : string,
  user : {
    ID : number,
    name : string
  },
  user_id : number
  menus : MenuType[],
  meal_images : MealImageType[],
  date : string,
}

export interface MenuType{
  ID: number,
  name : string,
  meal_id : number
}

export interface MealImageType{
  ID: number,
  file : string,//url
  meal_id : number
}

export interface MenuCreateType{
  name: string,
  meal_type : string,
  date : string
}

