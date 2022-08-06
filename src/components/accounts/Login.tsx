/** @jsxImportSource @emotion/react */
// import { css , keyframes }  from '@emotion/react'
// import React,{useEffect} from 'react'
import {useAppSelector,useAppDispatch} from '../../app/hooks'
import { loginAsync,userInfoAsync } from './accountsSlice'
import {LoginInput} from './types'
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import commonsStyle from '../common/css'

const Login:React.FC = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const validation = () =>
  Yup.object().shape({
    email: Yup.string()
    .required("必須項目です")
    .email("メール形式でお願いします。"),
    password: Yup.string()
    .required("必須項目です")
  });

  const Submit = (values:LoginInput) => {
    console.log('submit')
    console.log(values)
    const login = async () => {
    try {
      //unwrap
      await dispatch(loginAsync(values)).unwrap(); 
      await dispatch(userInfoAsync()).unwrap(); 
      navigate('/one_day_meal')
    }
    catch(error){}
    
    }
    login()
  }

  return (
    <Container>
      <Formik
        initialValues={{email:"",password:""}}
        initialErrors={{ email: "required", password: "required" }}
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
      <form onSubmit={handleSubmit} style={{ width:"80%", margin:"150px auto 0 auto"}}>
        {touched.email && errors.email ? (
                    <div data-testid="emailError" css={commonsStyle.errorMessage}>{errors.email}</div>
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
                    <div data-testid="passwordError" css={commonsStyle.errorMessage}>{errors.password}</div>
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
        <Button disabled={!isValid} type="submit" name="submit" variant="contained" sx={{display:"block",width:"100%",textAlign:"center"}}>送信</Button>
      </form>
      )}
      </Formik>
      <p style={{textAlign: 'center',paddingTop: '20px'}}>
        <Link to="/user_create" style={{ textDecoration: 'none',color:"#008cff"}}>新規登録はこちら</Link>
      </p>
      
    </Container>
  )
}

export default Login
