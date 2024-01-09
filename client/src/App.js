import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import SignUpForm from "./components/signUpForm";
import SignInForm from "./components/signInForm";
import ChatLayout from "./components/chatLayout";
import {useEffect, useState} from "react";
import {checkLogin} from "./fetcher";


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await checkLogin({
                    method: 'GET',
                    credentials: 'include',
                });
                console.log(response)
                setIsLoggedIn(response.data['isLoggedIn']);
            } catch (error) {
                console.error(error);
            }
        };

        checkLoginStatus()

    }, []);

    console.log(isLoggedIn)
 return (
      <>
        <BrowserRouter>
          <Routes>
            <Route
                path='/'
                element={isLoggedIn ? <ChatLayout /> : <Navigate to={'/signin'} replace={true}/> }/>
            <Route path='/signin' element={<SignInForm />}/>
            <Route path='/signup' element={<SignUpForm />}/>
          </Routes>
        </BrowserRouter>
      </>
  )
}

export default App;
