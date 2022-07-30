export interface MealType {
  one_day_meal : OneDayMealType,
  one_week_meal : OneDayMealType[],
  one_month_meal : OneDayMealType[],
  date_info : {
    full_date : string,
    month_and_day_date : string
  }
}

export interface OneDayMealType {
  morning : OneMealType,
  lunch : OneMealType,
  dinner : OneMealType,
  other : OneMealType,
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

