import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from '../css/SignIn.module.css';
import {storeid, storeLoginToken, storeEmailVerificationToken} from "../actions/action"
import {useDispatch} from 'react-redux';

const SignIn = () => {

  const [email, setEmail] = useState('');

  const history = useHistory();
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  
  const onChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(email);

    axios.post('https://hiring.getbasis.co/candidate/users/email', {email : email})
    .then(res =>{
        console.log(res.data)
        const {data : {results : {isLogin, token}}} = res;
        console.log(isLogin , token);
        dispatch(storeEmailVerificationToken(token));
        axios
        .put('https://hiring.getbasis.co/candidate/users/email/verify', {email : email,token : token, verificationCode :'112233'})
        .then((response) => {
           console.log(response.data)
           const {data : {results :  {isLogin }}} = response;
           if(isLogin) {
              const {data : {results : {user : {_id, token, email , firstName, phoneNumber}}}} = response;
              dispatch(storeid(_id));
              dispatch(storeLoginToken(token));
              history.push("/dashboard", {email, firstName, phoneNumber});
           }
           else{
              history.push("/signup", {email});
           }
        });

        
    })
    .catch(err => console.log(err))

    // try {
    //   setError("");
    //   setLoading(true);
    //   history.push("/dashboard");
    // } catch {
    //   setError("Failed to sign in");
    //   setTimeout(() => {
    //     setError("");
    //   }, 3000);
    // }
    // setLoading(false);
  };
  return (
    <>
    <div className={styles.container}>
    
      <form onSubmit={onSubmitHandler} className={styles.form}>
        <h1>Log in</h1>
        <div className={styles.formGroup}>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={email}
            className="form-input"
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <input type="submit" value="Login" disabled={loading} className={styles.btn} />
        </div>
      </form>

      </div>

      {error && <div className={styles.error}>{error}</div>}
    </>
  );
};

export default SignIn;