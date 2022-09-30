/** @jsxImportSource @emotion/react */
import { css , keyframes }  from '@emotion/react'
import React from 'react'
import {useAppSelector,useAppDispatch} from '../../app/hooks'
import { useNavigate } from 'react-router-dom';
import {
          loginAsync,
          userCreateAsync,
          userInfoAsync,
         } from './accountsSlice'
import {UserCreateInput} from './types'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import commonsStyle from '../common/css'

const UserCreate:React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const validation = () =>
  Yup.object().shape({
    name: Yup.string()
    .required("必須項目です"),
    email: Yup.string()
    .required("必須項目です")
    .email("メール形式でお願いします。"),
    password: Yup.string()
    .required("必須項目です")
  });

  const Submit = async (values:UserCreateInput) => {
    try{
      await dispatch(userCreateAsync(values)).unwrap()
      const auth = {
        'email' : values.email,
        'password' : values.password
      }
      //ログイン処理をすることでis_login Trueにするだけでなくtokenも格納できる
      await dispatch(loginAsync(auth))
      await dispatch(userInfoAsync())
      navigate('/one_day_meal')
    }catch(e){}
  }

  return (
    <Container>
      <Formik
        initialValues={{name:"",email:"",password:""}}
        initialErrors={{ name:"required", email: "required", password: "required" }}
        onSubmit={(values)=>{Submit(values)}}
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
      <form onSubmit={handleSubmit}style={{ width:"80%", margin:"100px auto 0 auto"}}>
      {touched.name && errors.name ? (
                    <div css={commonsStyle.errorMessage}>{errors.name}</div>
                  ) : null}
      <TextField
            label="name"
            size="small"
            fullWidth
            type="input"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            sx={{display:"block",mb:"30px"}}
        />

      {touched.email && errors.email ? (
                          <div css={commonsStyle.errorMessage}>{errors.email}</div>
                        ) : null}
      <TextField
            label="Email"
            size="small"
            fullWidth
            type="input"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            sx={{display:"block",mb:"30px"}}
        />

    {touched.password && errors.password ? (
                        <div css={commonsStyle.errorMessage}>{errors.password}</div>
                      ) : null}
        <TextField
            label="Password"
            size="small"
            fullWidth
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            sx={{display:"block",mb:"30px"}}
        />
      <Button disabled={!isValid} type="submit" variant="contained" sx={{display:"block",width:"100%",textAlign:"center"}}>送信</Button>
      </form>
      )}
      </Formik>
      <p style={{textAlign: 'center',paddingTop: '20px'}}>
        <Link to="/login" style={{ textDecoration: 'none',color:"#008cff"}}>Loginはこちら</Link>
      </p>
    </Container>
  )
}

export default UserCreate