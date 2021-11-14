import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {useSelector} from 'react-redux';
import axios from "axios";


import styles from "../css/Dashboard.module.css";


const Dashboard = () => {
  const location = useLocation();  


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

  };

  useEffect(() => {
    console.log(user_id, userlogin_token);
    
  }, []);

  return (
    <div className={styles.container}>
      <h1>Profile</h1>
      <div className={styles.item}>Name: <span>{location.state.firstName}</span></div>
      <div className={styles.item}>Email: <span>{location.state.email}</span></div>
      <div className={styles.item}>Phone: <span>{location.state.phoneNumber}</span></div>
       
   
      <div>
        <button onClick={signoutUser} className={styles.btn}>Sign out</button>
      </div>
    </div>
  );
};

export default Dashboard;