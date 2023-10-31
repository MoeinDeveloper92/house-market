import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import { toast } from "react-toastify"
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const auth = getAuth()
            await sendPasswordResetEmail(auth, email)
            toast.success("Email was sent!")
        } catch (error) {
            toast.error("Could not send reset Email.")
        }
    }


    return (
        <div className="pageContainer">
            <header>
                <p className="pageHeader">Forgot Password</p>
            </header>
            
            <main>
                <form onSubmit={handleSubmit} >
                    <input
                        type="email"
                        placeholder='Email'
                        id='email' value={email}
                        onChange={handleChange}
                        className='emailInput'
                    />
                    <Link to={"/sign-in"} className='forgotPasswordLink'>Sign In</Link>
                    <div className="signInBar">
                        <div className="signInText">
                            Send Reset Link
                        </div>
                        <button className='signInButton'>
                            <ArrowRightIcon fill="#ffffff" width={"34px"} height={"34px"} />
                        </button>
                    </div>

                </form>
            </main>
        </div>
    )
}

export default ForgotPassword