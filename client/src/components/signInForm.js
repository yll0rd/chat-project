import React, {useState} from 'react';
import '../assets/css/login.css'
import {Link} from "react-router-dom";
import {useAuth} from "../hooks/userContext";
const SignInForm = () => {
    const formInitialState = {
        username: '',
        password: '',
    }
    const [form, setForm] = useState(formInitialState)
    const [errors, setErrors] = useState('')
    const auth = useAuth()
    const { user, loginAction } = auth

    const handleChange = event => {
        const {name, value} = event.target
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = event => {
        event.preventDefault()
        loginAction(form).then((res) => {
            console.log(user);
            if (res !== true)
                setErrors(res);
            setForm(formInitialState)
        })
    };


    return (
        <>
            <div className="container">
                <div className="center">
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="txt_field">
                            <input type="text" name="username" value={form.username} required onChange={handleChange}/>
                                <span></span>
                                <label>Username</label>
                        </div>
                        <div className="txt_field">
                            <input type="password" name="password" value={form.password} required onChange={handleChange} />
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
