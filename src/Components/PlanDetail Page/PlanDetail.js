import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import '../Styles/planDetail.css'
import '../Styles/contact.css'
import AuthProvider, { useAuth } from '../Context/AuthProvider';
import { useHistory } from 'react-router-dom';
function PlanDetail() {
    const [plan, setplan] = useState({})
    const { id } = useParams();
    const [arr, setarr] = useState();
    const [review, setreview] = useState("");
    const [rate, setrate] = useState("5");
    const { user } = useAuth();
    const history=useHistory();
    console.log("id here--->",id);
    useEffect(async () => {
        console.log("inside useeffect");
        console.log(user);
      
        if(user!=null){
        // const data = await axios.get("/plans/plan/"+id)
        console.log("running")
        const data = await axios.get("/plan/single/"+id)
        console.log(data,565785765);
        delete data.data.data["_id"]
        delete data.data.data["__v"]
        setplan(data.data.data)
        const reviews = await axios.get("/review/"+id);
        console.log("this sir",reviews) ;
        // console.log(reviews.data.reviews);
        setarr(reviews.data.reviews)
        }else{
        history.push("/login")
        }
        // console.log(arr);
    }, [])

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
   
    console.log(rate);
    console.log("user ----->",user);  
    // const handleBuy= async()=>{
    //     console.log("buy plan")
    //     let res=await axios.post('/booking/createSession');
    //     // res.resolve();
    //     // console.log(res.config.url)
    //     // window.location.replace(res.config.url)
    //     // res.data.session.url=res.data.session.url.replace("localhost", "
    //     // console.log(res.data.session.url);
    //     console.log(res);
    // }  
    const handleClick = async () => {
        // console.log("user ----->",user);    
        console.log(123645);
        console.log("id->",id);
        
        try{
        const data = await axios.post("/review/crud/"+id, {
            "review": review,
            "rating": rate,
            "user": user.user._id,
            "plan": id
        })
        console.log("data->",data);
        const reviews = await axios.get("/review/"+id);
    
        // console.log(reviews);
        setarr([...reviews.data.reviews]);
    }catch(err)
    {
        console.log(err);
    }
    }
    const handleDelete = async(reviewId) =>{
        try{
            
            console.log("12345",reviewId);
            // let data = await axios.delete("/review/crud/"+id, { data: { "id": reviewId } });
            let data = await axios.delete("/review/crud/"+reviewId);
            console.log("kya hua delete->",data);
            // console.log(data.config.data);
            const reviews = await axios.get("/review/" + id);
            console.log(reviews);
            setarr([...reviews.data.reviews]);
            alert("review deleted");
        }
        catch(err){
            alert(err);
        }
    }

    return (
        <div className="pDetailBox">
            <div className='h1Box'>
                <h1 className='h1'>PLAN DETAILS</h1>
                <div className="line"></div>
            </div>
            <div className="planDetailBox">
                <div className='planDetail'>
                    <div className="loginBox">
                        {
                            Object.keys(plan).map((ele, key) => (
                                <div className='entryBox' key={key}>
                                    <div className="entryText">{capitalizeFirstLetter(ele)}</div>
                                    <div className=" input">{capitalizeFirstLetter(plan[ele].toString())}</div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            
            </div>


            <div className='reviewBox'>
                <div className="reviewEnrty">
                    <input type="text" value={review} onChange={(e) => setreview(e.target.value)} />
                    <select name="" id="" className="select" onChange={(e) => { setrate(e.target.value) }}>
                        <option value="5">Select Rating</option>
                        <option value="5">5 Excellent</option>
                        <option value="4">4 Very Good</option>
                        <option value="3">3 Good</option>
                        <option value="2">2 Poor</option>
                        <option value="1">1 Very Poor</option>
                    </select>
                    <button className="btn" onClick={handleClick}>
                        Submit
                    </button>
                    <form action="/booking/createSession" method="POST"> 
                    {/* <input  name="additionalData" value={id}/> */}
                    <button className="btnB" >
                        BuyPlan
                    </button>
                    </form>
                </div>
                {
                    arr && arr?.map((ele, key) => (
                            // `${console.log(ele)}`,
                 <div className="reviewsCard" key={key}>
                            <div className="pdreviews">
                                <div className="pdrdetail">
                                    <h3>{ele.user.name}</h3>
                                    <div className="input"> {ele.review}</div>
                                </div>
                                <div className='rate'>
                                    {
                                        <label htmlFor="star5" title="text">{ele.rating}</label>

                                    }
                                </div>
                            </div>

                            <div className='rcBtn'>
                                <button className="showMoreBtn btn" onClick={()=>{handleDelete(ele._id)}}>Delete</button>
                            </div>
                        </div>
                    ))
                                }

            </div>
        </div>
    )
}

export default PlanDetail
