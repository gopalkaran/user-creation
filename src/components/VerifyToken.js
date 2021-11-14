import axios from "axios";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styles from '../css/SignIn.module.css';
import {storeid, storeLoginToken} from "../actions/action"
import {useDispatch} from 'react-redux';

const VerifyToken = () => {

  const [verificationCode, setVerificationCode] = useState('');

  const history = useHistory();
  const location = useLocation();  



  const dispatch = useDispatch();
  
  const onChangeHandler = (e) => {
    setVerificationCode(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(verificationCode);

    axios
    .put('https://hiring.getbasis.co/candidate/users/email/verify', {email : location.state.email ,token : location.state.token, verificationCode : verificationCode})
    .then((response) => {
           console.log(response.data)
           const {success} = response.data;
           console.log(success);
           if(success){
           const {results :  {isLogin }} = response.data;
           console.log(isLogin)
           if(isLogin) {
              const {data : {results : {user : {_id, token, email , firstName, phoneNumber}}}} = response;
              dispatch(storeid(_id));
              dispatch(storeLoginToken(token));
              history.push("/dashboard", {email, firstName, phoneNumber});
           }
           else{
              history.push("/signup", {email: location.state.email});
           }
           }
           else{
            const {messageObj :  {wrongEmailTokenCount }} = response.data;
            console.log(wrongEmailTokenCount)
            if(wrongEmailTokenCount>=3){
                history.push("/");
            }

           }
    })
    .catch((err) => {
        console.log(err);
    })

    

  };
  return (
    <>
    <div className={styles.container}>
    
      <form onSubmit={onSubmitHandler} className={styles.form}>
        <h1>Verify Your Code</h1>
        <div className={styles.formGroup}>
          <label htmlFor="verificationCode" className="form-label">
            Verification Code
          </label>
          <input
            type="text"
            name="verificationCode"
            value={verificationCode}
            className="form-input"
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <input type="submit" value="Login"  className={styles.btn} />
        </div>
      </form>

      </div>

    </>
  );
};

export default VerifyToken;