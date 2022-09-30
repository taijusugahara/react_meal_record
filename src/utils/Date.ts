
//日付をstrに変換
export const get_date_str = (date:Date)=>{
  const date_str = date.getFullYear()
  + '-' + ('0' + (date.getMonth() + 1)).slice(-2)
  + '-' + ('0' + date.getDate()).slice(-2)
  + 'T00:00:00Z'
  return date_str
}
export const get_date_month_and_day_str = (date:Date)=>{
  const day_of_week = date.getDay() ;
  const dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][day_of_week] ;	
  const month_and_day_str =
  ('0' + (date.getMonth() + 1)).slice(-2)
  + '/' + ('0' + date.getDate()).slice(-2)
  + '(' + dayOfWeekStr + ')'
  return month_and_day_str
}


