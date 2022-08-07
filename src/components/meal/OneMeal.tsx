/** @jsxImportSource @emotion/react */
import { css , keyframes }  from '@emotion/react'
import { useState } from 'react';
import {useAppSelector,useAppDispatch} from '../../app/hooks'
import { 
  MealImageCreateAsync, MenuCreateAsync, MenuDeleteAsync,MealImageDeleteAsync,
  oneDayMealState,
  theDateState,
  spanTypeState
 } from './mealSlice';
import { OneDayMealType,OneMealType,MenuType, MealImageType } from './types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Formik } from "formik";
import * as Yup from "yup";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const apiUrl = process.env.REACT_APP_DEV_API_URL;

export const OneMeal:React.FC<{props:{meal_type:string,meal:OneMealType}}> = ({props}) => {
  const dispatch = useAppDispatch()
  const one_day_meal = useAppSelector(oneDayMealState)
  const date = useAppSelector(theDateState)
  const span_type = useAppSelector(spanTypeState)
  const [ModalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const [ImageOpen, setImageOpen] = useState(false);
  const [ImageUrl, setImageUrl] = useState("");
  const handleImageOpen = (url:string) => {
    setImageUrl(url)
    setImageOpen(true);
    window.history.pushState(null,'',null)
  }
  const handleImageClose = () => setImageOpen(false);
  
  window.addEventListener('popstate',()=>{//history backしたとき発火。そのために上でhistory pushしてる
    handleImageClose()
  })
  
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

  const file_select_open = () => {
    const fileInput = document.getElementById("imageInput")!;
    fileInput.click();
  };

  const meal_image_create = async(file:File) => {
    const uploadData = new FormData();
    uploadData.append("file", file, file.name);
    uploadData.append("meal_type", props.meal_type);
    uploadData.append("date", date.full_date);
    await dispatch(MealImageCreateAsync({"meal_type":props.meal_type,upload_data:uploadData}))
  }

  const menu_create = async(menu:string) => {
    const uploadData = new FormData();
    uploadData.append("menu", menu);
    uploadData.append("meal_type", props.meal_type);
    uploadData.append("date", date.full_date);
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
    <div css={[meal_container,meal_border]}>
      <div css={meal_part_top}>
      <p css={meal_type_name}><strong>{props.meal_type}</strong></p>
      {span_type == "day" &&
        <>
          <IconButton onClick={handleModalOpen}
          >
            <EditIcon
            sx={{width:"25px",height:"25px",border: "1px solid #c4c4c4",padding:"3px",borderRadius:"50%"}}
            />
          </IconButton>

          <Modal
            open={ModalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modal_body}>
              <div css={modal_top}>
                <p><strong>{props.meal_type}</strong></p>
                <CloseIcon onClick={handleModalClose} sx={modal_close_icon}/>
              </div>
              
              
              <div style={{padding:"0 50px 20px 50px"}}>
              
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
                  values,
                  errors,
                  touched,
                  isValid,
                }) => (
                <form onSubmit={handleSubmit}>
                  {touched.menu && errors.menu ? (
                    <div >{errors.menu}</div>
                  ) : null}
                  <div css={input_field}>
                    <ImageIcon onClick={()=>file_select_open()} sx={{width:"30px",height:"30px",marginRight:"10px",cursor:"pointer"}} />
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
                        sx={{flex:1}}
                    />
                    <Button disabled={!isValid} variant="contained" type="submit" sx={{display:"block",marginLeft:"10px"}}>add</Button>
                  </div>
                </form>
                )}
              </Formik>
              

              <input
                id="imageInput"
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => meal_image_create(e.target.files![0])}//!でnullスルー
              />
              
              <div>
                {props.meal.meal_images.length > 0 &&
                  <div>
                    <hr />

                    <div css={meal_image_field}>
                      {props.meal.meal_images?.map((meal_image:MealImageType)=>(
                        <div css={meal_image_part} key={meal_image.ID}>
                          <img css={meal_image_image} src={`${apiUrl}${meal_image.file}`} alt="image not found" />
                          <div css={meal_image_delete_field} onClick={()=>meal_image_delete(meal_image.ID)}>
                            <DeleteIcon sx={{color:"#ff6666",cursor:"pointer"}} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                }
              </div>

              <div>
                {props.meal.menus.length > 0 &&
                  <div>
                    <hr />

                    <div css={menu_field}>
                      {props.meal.menus?.map((menu:MenuType)=>(
                        <div key={menu.ID} css={menu_part}>
                          <p><strong>・</strong></p>
                          <p>{menu.name} </p>
                          <div style={{"paddingLeft": "20px"}} onClick={()=>menu_delete(menu.ID)}>
                            <DeleteIcon sx={{color:"#ff6666",cursor:"pointer"}} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                }
              </div>

              </div>
            </Box>
            
          </Modal>
          </>
           }
      </div>
      
      {props.meal.meal_images.length > 0 &&
        <div css={meal_image_field}>
          {props.meal.meal_images?.map((meal_image:MealImageType)=>(
            <div key={meal_image.ID} css={meal_image_part} >
              <img onClick={()=>{handleImageOpen(`${apiUrl}${meal_image.file}`)}} css={meal_image_image} src={`${apiUrl}${meal_image.file}`} alt="image not found" />
            </div>
          ))}

          {ImageOpen &&
            <div css={image_open_field}>
              <img css={image_open_image} src={ImageUrl} />
            </div>
          }
        </div>
      }
      
      {props.meal.menus.length > 0 &&
        <div css={menu_field}>
          {props.meal.menus?.map((menu:MenuType)=>(
            <div key={menu.ID} css={menu_part}>
              <p><strong>・</strong></p>
              <p>{menu.name} </p>
            </div>
          ))}
        </div>

      }
      
    </div>
  )

}

export default OneMeal

const meal_container = {
  padding : "0 10px 10px 10px",
  maxWidth : "800px",
  margin : "0 auto"
}
const meal_border = {
  borderBottom : "1px solid gray",
  '&:last-child': {
    borderBottom: "none",
  },
}

const meal_part_top = {
  display : 'flex',
  justifyContent : 'space-between',
  alignItems : 'center'
}
const meal_type_name = {
  width : "100px",
  padding : "10px"
}
const modal_body = {
  position: 'absolute',
  width: '90%',
  height: '90%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  overflowY: "scroll",
  bgcolor: 'background.paper',
  border: '1px solid #000',
};

const modal_top = {
  display : "flex",
  justifyContent: "space-between",
  alignItems : "center",
  padding: '20px 20px 20px 50px'
}

const modal_close_icon = {
  width : '40px',
  height : '40px',
  cursor : 'pointer'
}

const input_field = {
  display : 'flex',
  alignItems : 'center',
  marginBottom : '30px'
}

const meal_image_field = {
  display : 'flex',
  justifyContent : 'center',
  flexWrap: 'wrap' as 'wrap',//こうしないとエラー
  paddingTop : '10px'
}

const meal_image_part ={
  padding : '10px'
}

const meal_image_image = {
  height : '200px',
  width : '200px',
  cursor : 'pointer'
}

const meal_image_delete_field ={
  display : 'flex',
  justifyContent : 'end'
}

const menu_field = {
  margin : '10px',
  padding : '5px 0',
  backgroundColor : '#e6f6ff'
}

const menu_part = {
  display : 'flex',
  alignItems : 'center',
}

const image_open_field = {
  position : 'fixed' as 'fixed',
  top : '0',
  left : '0',
  height : "100vh",
  width : "100%",
  zIndex : "10",
  backgroundColor : "black"
}

const image_open_image = {
  // width: "100%",
  maxWidth : "100%",
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)"
}