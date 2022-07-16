import {useEffect} from 'react'
import NavBar from './components/common/NavBar'
import Login from './components/accounts/Login';
import UserCreate from './components/accounts/UserCreate';
import OneDayMeal from './components/meal/OneDayMeal';

import { BrowserRouter,Routes,Route } from "react-router-dom";

const App:React.FC = ()=> {
  console.log(localStorage.jwt_access_token)
  return (
    <>
    <BrowserRouter>
      <NavBar />
      <Routes>
      	<Route path="/login" element={<Login />}/>
        <Route path="/user_create" element={<UserCreate />}/>
        <Route path="/one_day_meal" element={<OneDayMeal />}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
