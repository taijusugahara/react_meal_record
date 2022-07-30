
//日付をstrに変換
export const get_date_str = (date:Date)=>{
  const date_str = date.getFullYear()
  + '-' + ('0' + (date.getMonth() + 1)).slice(-2)
  + '-' + ('0' + date.getDate()).slice(-2)
  + 'T00:00:00Z'
  return date_str
}
export const get_date_month_and_day_str = (date:Date)=>{
  const month_and_day_str = 
  ('0' + (date.getMonth() + 1)).slice(-2)
  + '/' + ('0' + date.getDate()).slice(-2)
  return month_and_day_str
}


// -1することで昨日に。08/01であったとしても07/31になる便利。
// const yesterday = new Date(the_date.getFullYear(), the_date.getMonth(), the_date.getDate() - 1);
// export const yesterday_str = get_date_str(yesterday)

// const before_month = new Date(the_date.getFullYear(), the_date.getMonth() -1, the_date.getDate());
// export const before_month_str = get_date_str(before_month)



