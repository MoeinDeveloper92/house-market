import { useEffect, useState } from 'react'
import { getAuth, updateProfile, updateEmail } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { doc, updateDoc } from "firebase/firestore"
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

const Profile = () => {
    const auth = getAuth()
    const [changeDetails, setChangeDetails] = useState(false)

    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })
    const { name, email } = formData

    const navigate = useNavigate()

    const onLogOut = () => {
        auth.signOut()
        navigate("/")
    }

    const handleChange = (e) => {
        setFormData((preState) => ({
            ...preState,
            [e.target.id]: e.target.value
        }))
    }
    const onSubmit = async () => {

        try {
            //check to see if the current user is equal to actual name
            if (auth.currentUser.displayName !== name) {
                //Update display name in firebase
                await updateProfile(auth.currentUser, {
                    displayName: name
                })



                //Update in firestore
                //we need to create a refrence
                //the id in the firestore is equal with id in the authnetication
                const userRef = doc(db, 'users', auth.currentUser.uid)
                await updateDoc(userRef, {
                    name,
                    email
                })
            }

        } catch (error) {
            toast.error("Could not update profile Details.")
        }
    }


    return <>
        <div className="profile">
            <header className="profileHeader">
                <p className="pageHeader">My Profile</p>
                <button onClick={onLogOut} className='logOut' type='button'>Logout</button>
            </header>

            <main>
                <div className="profileDetailsHeader">
                    <p className="profileDetailsText">Personal details</p>
                    <p className="changePersonalDetails" onClick={() => {
                        changeDetails && onSubmit()
                        setChangeDetails((pre) => !pre)
                    }}>
                        {changeDetails ? 'Done' : "Change"}
                    </p>
                </div>

                <div className="profileCard">
                    <form>
                        <input
                            type="text"
                            id='name'
                            className={!changeDetails ? 'profileName' : 'profileNameActive'}
                            disabled={!changeDetails}
                            value={name}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            id='email'
                            className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
                            disabled={!changeDetails}
                            value={email}
                            onChange={handleChange}
                        />
                    </form>
                </div>
            </main >
        </div >
    </>
}
export default Profile