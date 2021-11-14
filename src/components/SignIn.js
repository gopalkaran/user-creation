import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from '../css/SignIn.module.css';
import { storeEmailVerificationToken} from "../actions/action"
import {useDispatch} from 'react-redux';

const SignIn = () => {

  const [email, setEmail] = useState('');

  const history = useHistory();


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
        history.push('/verifytoken', {email, token})
    })
    .catch(err => console.log(err))


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
          <input type="submit" value="Login"  className={styles.btn} />
        </div>
      </form>

      </div>

    </>
  );
};

export default SignIn;