import React, {useContext, useState} from 'react';
import '../assets/css/login.css'
import {Link, useNavigate} from "react-router-dom";
import {postSignIn} from "../fetcher";
import {UserContext} from "../contexts/userContext";

const SignInForm = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        username: '',
        password: '',
    })
    const [errors, setErrors] = useState('')
    const { setUser } = useContext(UserContext)

    const postData = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',  // to send cookies associated with the domain in the request.
            body: JSON.stringify(form)
        }
        return await postSignIn(options)
    }

    const handleChange = event => {
        const {name, value} = event.target
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = event => {
        event.preventDefault()
        // console.log(form)
        postData().then(res => {
            console.log(res)
            if (res.OK) {
                setUser(prevState => (res.data.user.name))
                localStorage.setItem('nameOfUser', res.data.user.name)
                navigate('/')
            }
            else
                setErrors(res.message)
        })

    }

    return (
        <>
            <div className="container">
                <div className="center">
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="txt_field">
                            <input type="text" name="username" required onChange={handleChange}/>
                                <span></span>
                                <label>Username</label>
                        </div>
                        <div className="txt_field">
                            <input type="password" name="password" required onChange={handleChange} />
                                <span></span>
                                <label>Password</label>
                        </div>
                        <div className="pass">Forget Password?</div>
                        {/*{% if error %} <p style="color: red; margin-left: 5px">{{ error }}</p> {% endif %}*/}
                        <p style={{color: 'red', marginLeft: 5}} >{errors}</p>
                        <input name="submit" type="Submit" defaultValue="Login" onSubmit={handleSubmit}/>
                            <div className="signup_link">
                                Not a Member ? <Link to='/signup'>SignUp</Link>
                            </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignInForm;
