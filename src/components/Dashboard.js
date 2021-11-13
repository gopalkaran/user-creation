import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {useSelector} from 'react-redux';
import axios from "axios";


// import styles from "../styles/Dashboard.module.css";


const Dashboard = () => {
  const location = useLocation();  
  const [error, setError] = useState("");

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: ""
  });



  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const {user_id, userlogin_token} = useSelector(state => state.user);

  const signoutUser = async () => {

    try{
        const res = await axios.delete(`https://hiring.getbasis.co/candidate/users/logout/${user_id}`,{ headers: {Authorization : `Bearer ${user_id},${userlogin_token}`} });
        console.log(res);
        history.push("/");
    }
    catch(error){
        console.log(error);
        console.log(error.response);
    }

    // setError("");
    // try {
    //   await logout();
    //   history.push("/");
    // } catch {
    //   setError("Failed to log out");
    //   setTimeout(() => {
    //     setError("");
    //   }, 3000);
    // }
  };

  useEffect(() => {
    console.log(user_id, userlogin_token);
    
  }, []);

  return (
    <>
      <h1>Profile</h1>
      <div>{location.state.firstName}</div>
      <div>{location.state.email}</div>
      <div>{location.state.phoneNumber}</div>
       
   
      <div >
        <button onClick={signoutUser}>Sign out</button>
      </div>
    </>
  );
};

export default Dashboard;