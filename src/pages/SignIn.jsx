import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import visiblityIcon from "../assets/svg/visibilityIcon.svg"
import { toast } from "react-toastify"
import OAuth from '../components/OAuth'
const SignIn = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const { email, password } = formData
    const navigate = useNavigate()


    const handleChange = (e) => {
        setFormData((preState) => ({
            ...preState,
            [e.target.id]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()


        try {
            const auth = getAuth()
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            if (userCredential) {
                toast.success("Logged in Successfully:)")
                navigate("/")
            }
        } catch (error) {
            toast.error("Bad User Credentials.")
        }
    }
    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Welcome Back!</p>
                </header>

                <main>
                    <form onSubmit={handleSubmit}>
                        <input
                            id='email'
                            type="email"
                            placeholder='Email'
                            className="emailInput"
                            value={email}
                            onChange={handleChange}
                        />
                        <div className="passwordInputDiv">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                value={password}
                                onChange={handleChange}
                                className='passwordInput'
                                placeholder='Password'
                            />
                            <img
                                onClick={() => setShowPassword((pre) => !pre)}
                                src={visiblityIcon} className='showPassword'
                                alt="showPassword"

                            />
                        </div>
                        <Link className='forgotPasswordLink' to={"/forgot-password"}>
                            Forgot password?
                        </Link>
                        <div className="signInBar">
                            <p className="signInText">
                                Sing In
                            </p>
                            <button className='signInButton'>
                                <ArrowRightIcon fill='white' width={"34px"} height={"34px"} />
                            </button>
                        </div>
                    </form>

                    <OAuth />

                    <Link to={"/sign-up"} className='registerLink'>
                        Sign Up Instead
                    </Link>
                </main>
            </div>
        </>
    )
}

export default SignIn