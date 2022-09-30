import {useEffect} from 'react'
import NavBar from './components/common/NavBar'
import Login from './components/accounts/Login';
import UserCreate from './components/accounts/UserCreate';
import OneDayMeal from './components/meal/OneDayMeal';
import OneWeekMeal from './components/meal/OneWeekMeal';
import OneMonthMeal from './components/meal/OneMonthMeal';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import ScrollToTop from './utils/ScrollToTop';

const App:React.FC = ()=> {

  return (
    <>
    <BrowserRouter>
      <NavBar />
      <ScrollToTop />{/* ページ遷移した際に画面topに持っていく。デフォルトではそういうふうにはなってないみたい。 */}
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/user_create" element={<UserCreate />}/>
        <Route path="/one_day_meal" element={<OneDayMeal />}/>
        <Route path="/one_week_meal" element={<OneWeekMeal />}/>
        <Route path="/one_month_meal" element={<OneMonthMeal />}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
