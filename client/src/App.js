import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUpForm from "./components/signUpForm";
import SignInForm from "./components/signInForm";
import ChatLayout from "./components/chatLayout";
import UserContextProvider from "./hooks/userContext";
import PrivateRoute from "./router/route";


function App() {

 return (
      <>
        <BrowserRouter>
            <UserContextProvider>
                <Routes>
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<ChatLayout />} />
                    </Route>
                    <Route path='/login' element={<SignInForm />}/>
                    <Route path='/signup' element={<SignUpForm />}/>
                </Routes>
            </UserContextProvider>
        </BrowserRouter>
      </>
  )
}

export default App;
