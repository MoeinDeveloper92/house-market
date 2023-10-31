import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from "react-toastify"
import googleIcon from "../assets/svg/googleIcon.svg"


const OAuth = () => {

    const navigate = useNavigate()
    const location = useLocation()


    const onGoogleClick = async () => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            //chekc to see if the user already exist in the fireStore.
            //get a ref to doc
            const docRef = doc(db, "users", user.uid)
            const docSnap = await getDoc(docRef)

            //if user does not exist
            if (!docSnap.exists()) {
                await setDoc(doc(db, "users", user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                })
            }

            navigate("/")
        } catch (error) {
            toast.error("Could no Authorized with Google.")
        }
    }
    return (
        <div className='socialLogin'>
            <p>Sign {location.pathname === "/sign-in" ? "un" : "up"} with</p>
            <button className='socialIconDiv'>
                <img
                    className='socialIconImg'
                    src={googleIcon}
                    alt="Google"
                    onClick={onGoogleClick}
                />
            </button>
        </div>
    )
}

export default OAuth