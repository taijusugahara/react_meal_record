//日付をstrに変換
const get_date_str = (date:Date)=>{
  const date_str = date.getFullYear()
  + '-' + ('0' + (date.getMonth() + 1)).slice(-2)
  + '-' + ('0' + date.getDate()).slice(-2)
  + 'T' + ('0' + date.getHours()).slice(-2)
  + ':' + ('0' + date.getMinutes()).slice(-2)
  + ':' + ('0' + date.getSeconds()).slice(-2)
  + 'Z';
  return date_str
}
// const now = new Date("2022/08/01 00:00:00")
const now = new Date()
export const today_str = get_date_str(now)
// -1することで昨日に。08/01であったとしても07/31になる便利。
const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
export const yesterday_str = get_date_str(yesterday)

const before_month = new Date(now.getFullYear(), now.getMonth() -1, now.getDate());
export const before_month_str = get_date_str(before_month)

console.log(today_str)
console.log(yesterday_str)
console.log(before_month_str)

