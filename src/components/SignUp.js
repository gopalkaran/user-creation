import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import styles from "../css/SignUp.module.css";
import axios from "axios";
import {useSelector} from 'react-redux';



const SignUp = () => {
  const [data, setData] = useState({
    firstName: "",
    email: "",
    phone: "",
    referredCodeKey: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const history = useHistory();
  const location = useLocation();
//   const {state : {email}} = location;

  const {userId , userToken} = useSelector(state => state.user);


  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(data);

    // axios.get('https://hiring.getbasis.co/candidate/users/referral/MAYANK' , { headers: {"Authorization" : `Bearer ${userId},${userToken}`} })
    // .then(res => {
    //     console.log(res.data);
    // })
    // .catch((error) => {
    //     console.log(error)
    // });

    axios.post('https://hiring.getbasis.co/candidate/users', data)
    .then(res =>{
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })
    

    // try {
    //   setError("");
    //   setLoading(true);

    //   history.push("/dashboard");
    // } catch {
    //   setError("Failed to create an account");
    //   setTimeout(() => {
    //     setError("");
    //   }, 3000);
    // }
    // setLoading(false);
  };


  useEffect(() => {
      setData({...data, email : location.state.email});
  }, [location.state.email])

  useEffect(() => {
      console.log(userToken);
  }, [])



  return (
    <>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={onSubmitHandler} className={styles.container}>
        <h1>Sign up</h1>
        <div className={styles.formGroup}>
          <label htmlFor="firstName" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="firstName"
            value={data.firstName}
            className="form-input"
            onChange={onChangeHandler}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={data.email}
            className="form-input"
            onChange={onChangeHandler}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={data.phone}
            className="form-input"
            onChange={onChangeHandler}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="referredCodeKey" className="form-label">
          ReferredCodeKey
          </label>
          <input
            type="text"
            name="referredCodeKey"
            value={data.referredCodeKey}
            className="form-input"
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <input type="submit" value="Sign Up" disabled={loading} />
        </div>
      </form>
      <div className={styles.login}>
        <p>Have an account?</p>
        <Link to="/">Log in</Link>
      </div>
    </>
  );
};

export default SignUp;