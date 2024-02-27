import React, { useState , useEffect,useContext} from 'react';
import '../Styles/profile.css';
import { useAuth } from '../Context/AuthProvider';
import axios from 'axios';
import { useHistory } from 'react-router';
function Profile() {
    const history = useHistory();
    // const { user } = useAuth();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")).user);
    // const [user,setUser] = useState({});
    useEffect(async ()=>{
        // let users=localStorage.getItem("user")
        // console.log("users here--?>",users);
        // if(users=="undefined"){
        //     console.log('aage jaa')
        //     history.push("/login");
            
        // }
        // setUser(JSON.parse(users).user);
       
        // setUser();
        console.log("tt",user);
       
        nameSet(user.name)
        passwordSet(user.password)
        emailSet(user.email)
        passwordCnfSet(user.password)
        console.log("abcd",user)
    },[]);
    // console.log("typeof user is ",(user));
    const [password, passwordSet] = useState()
    const [passwordCnf, passwordCnfSet] = useState("")
    const [email, emailSet] = useState("");
    const [name, nameSet] = useState("");
    const nameEdit = async () => {
        await axios.patch('/user/login');
    }
    const handleClick = async () => {
        try {
            console.log(user._id);
            const data = await axios.patch("/user/" + user._id, {
                name,
               email,
                password,
                confirmPassword: passwordCnf,
                role: user.role,
                _id:user._id
            });
            // console.log(data.data.data);
            console.log("data- is---->",data)
            let format={
                msg:"user logged in",
                user:data.data.updatedData
            }   
            console.log("format is",JSON.stringify(format));
            localStorage.setItem("user", JSON.stringify(format));
        } catch (error) {
            console.log(error);
        }
    }
    console.log(user);
    return (
        <div className="container-grey">
            <div className="form-container">
                <div className='h1Box'>
                    <h1 className='h1'>Profile</h1>
                    <div className="line"></div>
                    <div className="profileImage">
                        {/* {<img src={user.user.profileImage} /> } */}
                    </div>
                </div>
                <div className="loginBox">
                    <div className="entryBox">
                        <input type="file" />
                    </div>
                    <div className="entryBox">
                        <div className="entryText">Email</div>
                        <input className="email input" type="email" value={email} onChange={(e) => emailSet(e.target.value)} />
                    </div>
                    <div className="entryBox">
                        <div className="entryText">Password</div>
                        <input className="password input" type="password" value={password} onChange={(e) => passwordSet(e.target.value)} />
                    </div>
                    <div className="entryBox">
                        <div className="entryText">Confirm Password</div>
                        <input className="password input" type="password" value={passwordCnf} onChange={(e) => passwordCnfSet(e.target.value)} />
                    </div>
                    <div className="entryBox">
                        <div className="entryText">Name</div>
                        <input className="password input" type="text" value={name} onChange={(e) => nameSet(e.target.value)} />
                    </div>
                    <button className="loginBtn  form-button" type="submit" onClick={handleClick}>
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Profile