// import {useState} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import {useAppSelector,useAppDispatch} from '../../app/hooks'
import { useNavigate } from 'react-router-dom';

import {isLogin,logout} from '../accounts/accountsSlice'

const NavBar:React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const is_login = useAppSelector(isLogin)
  const Logout = async () => {
    await dispatch(logout())
    localStorage.removeItem('jwt_access_token')
    localStorage.removeItem('jwt_refresh_token')
    navigate("/login")
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{backgroundColor:"#39094a"}}>
          <Toolbar sx={{alignItems:"center"}}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Meal Record
            </Typography>
            <Button color="inherit">
            {is_login ? <p onClick={Logout}>Logout</p>:<></>}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default NavBar