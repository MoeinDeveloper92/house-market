import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg"
import visiblityIcon from "../assets/svg/visibilityIcon.svg"
import { setDoc, serverTimestamp, doc } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const { name, email, password } = formData
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
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            updateProfile(auth.currentUser, {
                displayName: name
            })
            //since we dont want to change the actuall state
            const formDataCopy = { ...formData }
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp()

            //setdoc returjsn  apromise
            //setdoc will update the databse
            await setDoc(doc(db, 'users', user.uid), formDataCopy)
            toast.success("Registered Successfully:)")
            navigate("/")
        } catch (error) {
            toast.error("Something Went Wrong With Registration!")
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
                            id='name'
                            type="text"
                            placeholder='Name'
                            className="nameInput"
                            value={name}
                            onChange={handleChange}
                        />
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
                                Sing Up
                            </p>
                            <button className='signInButton'>
                                <ArrowRightIcon fill='white' width={"34px"} height={"34px"} />
                            </button>
                        </div>
                    </form>

                    {/* Google OAuth */}

                    <Link to={"/sign-in"} className='registerLink'>
                        Sign In Instead
                    </Link>
                </main>
            </div>
        </>
    )
}

export default SignUp