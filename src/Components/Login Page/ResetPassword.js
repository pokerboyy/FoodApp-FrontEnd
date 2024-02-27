import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../Styles/login.css'
// import axios from 'axios';
// import { connect } from 'react-redux';
// import { useHistory } from 'react-router-dom';

function ResetPassword() {
    const history = useHistory();
    const [password, passwordSet] = useState("");
    const [confirm, setConfirm] = useState("");
    console.log("reseting the password")
    const handleResetPassword=async()=>{
        const currentURL = window.location.href;

// Split the URL by slashes ('/')
const urlParts = currentURL.split('/');

// Get the last part of the URL, which is the reset token
const resetToken = urlParts[urlParts.length - 1];
console.log(resetToken)
        try{
            const data=await axios.post(`/user/resetpassword/${resetToken}`,{
                password:password,
                confirmPassword:confirm
            });
            console.log("data reset--->",data);
            console.log(data);
            if(data.data.msg=="password changed successfully")
            {
                history.push("/login")
               
            }
            else
            {
            alert("please enter password correctly and length should be greater than 7") 
            }
           
        }
        catch(err){
            alert(err)
            console.log(err);
        }
    }

    return (
        <div className="container-grey">
            <div className="form-container">
                <div className='h1Box'>
                    <h1 className='h1'>RESET PASSWORD</h1>
                    <div className="line"></div>
                </div>
                <div className="loginBox">
                <div className="entryBox">
                        <div className="entryText">Password</div>
                        <input className="password input" type="password" name="Password" placeholder="**********" onChange={(e) => passwordSet(e.target.value)} />
                    </div>
                    <div className="entryBox">
                        <div className="entryText">Confirm  Password</div>
                        <input className="confirmPassword input" type="password" name="ConfirmPassword" placeholder="**********" onChange={(e) => setConfirm(e.target.value)} />
                    </div>
                    <button className="loginBtn  form-button" type="submit" onClick={handleResetPassword}>
                        Reset Password
                    </button>

                </div>
            </div>
        </div>
    )
}

export default ResetPassword
