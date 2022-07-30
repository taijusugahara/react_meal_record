import {useAppSelector,useAppDispatch} from '../../app/hooks'
import { 
  MealImageCreateAsync, MenuCreateAsync, MenuDeleteAsync,MealImageDeleteAsync,
  oneDayMealState
 } from './mealSlice';
import { today_str,yesterday_str,before_month_str } from '../../utils/Date';
import { OneDayMealType,OneMealType,MenuType, MealImageType } from './types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Formik } from "formik";
import * as Yup from "yup";

const apiUrl = process.env.REACT_APP_DEV_API_URL;

export const OneMeal:React.FC<{props:{meal_type:string,meal:OneMealType}}> = ({props}) => {
  const dispatch = useAppDispatch()
  const one_day_meal = useAppSelector(oneDayMealState)
  
  const validation = () =>
  Yup.object().shape({
    menu: Yup.string()
    .required("必須項目です")
    .max(50, '50文字以内でお願いします。')
    .test('test-name', '検証failure message', 
      function(value) { 
        if (value == "aaa"){
          return false
        }
        return true
      })
  });

  const meal_image_create = async(file:File) => {
    const uploadData = new FormData();
    uploadData.append("file", file, file.name);
    uploadData.append("meal_type", props.meal_type);
    uploadData.append("date", today_str);
    await dispatch(MealImageCreateAsync({"meal_type":props.meal_type,upload_data:uploadData}))
  }

  const menu_create = async(menu:string) => {
    const uploadData = new FormData();
    uploadData.append("menu", menu);
    uploadData.append("meal_type", props.meal_type);
    uploadData.append("date", today_str);
    console.log(uploadData)
    await dispatch(MenuCreateAsync({"meal_type":props.meal_type,upload_data:uploadData}))
  }

  const menu_delete = async(menu_id:number) => {
    const meal_type = props.meal_type
    await dispatch(MenuDeleteAsync({"meal_type":props.meal_type,"menu_id":menu_id}))
  }

  const meal_image_delete = async(meal_image_id:number) => {
    const meal_type = props.meal_type
    await dispatch(MealImageDeleteAsync({"meal_type":props.meal_type,"meal_image_id":meal_image_id}))
  }

  return (
    <>
      <Formik
        initialValues={{menu:""}}
        initialErrors={{ menu: "required" }}
        onSubmit={(values,{resetForm})=>{
          const meal_type = props.meal_type as keyof OneDayMealType
          const menus = one_day_meal[meal_type].menus
          let is_allready_menu_exist:boolean = false
          menus.forEach(function(menu){ //forEachはbreakできないらしい
            if(menu.name==values.menu){
              alert("そのメニューは既に存在します。")
              is_allready_menu_exist = true
            }
          });
          if(!is_allready_menu_exist){
            menu_create(values.menu)
          }
          resetForm()
        }}
        validationSchema={validation()}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          isValid,
        }) => (
        <form onSubmit={handleSubmit}>
          {touched.menu && errors.menu ? (
            <div >{errors.menu}</div>
          ) : null}
          <TextField
              label="menu"
              size="small"
              type="input"
              name="menu"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
              value={values.menu}
              sx={{display:"block",mb:"30px"}}
          />
          <Button disabled={!isValid} variant="contained" type="submit" sx={{display:"block"}}>add</Button>
          </form>
        )}
      </Formik>

      <input
        type="file"
        onChange={(e) => meal_image_create(e.target.files![0])}//!でnullスルー
      />
        {props.meal.meal_images?.map((meal_image:MealImageType)=>(
          <div key={meal_image.ID}>
            <img style={{height:"200px",width:"200px"}} src={`${apiUrl}${meal_image.file}`} alt="image not found" />
            <span style={{"paddingLeft": "20px"}} onClick={()=>meal_image_delete(meal_image.ID)}>delete</span>
          </div>
        ))}
        {props.meal.menus?.map((menu:MenuType)=>(
          <p key={menu.ID}>
            <span>{menu.name} </span>
            <span style={{"paddingLeft": "20px"}} onClick={()=>menu_delete(menu.ID)}>delete</span>
          </p>
        ))}
    </>
  )

}

export default OneMeal