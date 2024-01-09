import React, {useState} from 'react';
import '../assets/css/login.css'
import {Link, useNavigate} from "react-router-dom";
import {postSignUp} from "../fetcher";

const SignUpForm = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        firstname: '',
        secondname: '',
        username: '',
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState('')

    const postData = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',  // to send cookies associated with the domain in the request.
            body: JSON.stringify({
                name: `${capitalize(form['firstname'])} ${capitalize(form['secondname'])}`,
                username: form.username,
                email: form.email,
                password: form.password,
            })
        }
        return await postSignUp(options)
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
        postData().then(res => {
            console.log(res);
            if (res.OK)
                navigate('/signin')
            else
                setErrors(res.message)
        })
    }
    return (
        <>
            <div className="container">
                <div className="center">
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="txt_field">
                            <input type="text" name="firstname" required onChange={handleChange}/>
                                <span></span>
                                <label>First Name *</label>
                        </div>
                        <div className="txt_field">
                            <input type="text" name="secondname" required onChange={handleChange}/>
                                <span></span>
                                <label>Second Name *</label>
                        </div>
                        <div className="txt_field">
                            <input type="text" name="username" required onChange={handleChange}/>
                                <span></span>
                                <label>Username *</label>
                        </div>
                        <div className="txt_field">
                            <input type="email" name="email" required onChange={handleChange}/>
                                <span></span>
                                <label>Email *</label>
                        </div>
                        <div className="txt_field">
                            <input type="password" name="password" required onChange={handleChange}/>
                                <span></span>
                                <label>Password *</label>
                        </div>
                        {/*{% if error %} <p style="color: red; margin-left: 5px">{{ error }}</p> {% endif %}*/}
                        <p style={{color: 'red', marginLeft: 5}} >{errors}</p>
                        <input name="submit" type="Submit" defaultValue="Sign up" />
                            <div className="signup_link">
                                Already a Member ? <Link to='/signin'>SignIn</Link>
                            </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUpForm;

const capitalize = (string) => (string.charAt(0).toUpperCase() + string.slice(1))
