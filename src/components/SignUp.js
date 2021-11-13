import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import styles from "../css/SignUp.module.css";
import axios from "axios";
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {storeid, storeLoginToken} from "../actions/action"





const SignUp = () => {
  const [data, setData] = useState({
    firstName: "",
    email: "",
    phone: "",
    referredCodeKey: "",
    agreeToPrivacyPolicy : false,
    token : "",
  });
//   const [agreeToPrivacyPolicy, setAgreeToPrivacyPolicy] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 
  const dispatch = useDispatch();


  const history = useHistory();
  const location = useLocation();
//   const {state : {email}} = location;

  const {userverification_token} = useSelector(state => state.user);


  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onMarkHandler = (e) => {
    //   setAgreeToPrivacyPolicy(e.target.checked);
      setData({ ...data, [e.target.name]: e.target.checked });
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(data);

    axios.get(`https://hiring.getbasis.co/candidate/users/referral/${data.referredCodeKey}`)
    .then(res => {
        console.log(res.data);
    })
    .catch((error) => {
        console.log(error)
    });

    axios.post('https://hiring.getbasis.co/candidate/users', {...data, token : userverification_token})
    .then(res =>{
        console.log(res);
        const {data : {results : {user : {_id,token, email , firstName, phoneNumber}}}} = res;
        dispatch(storeid(_id));
        dispatch(storeLoginToken(token));
        history.push("/dashboard", {email, firstName, phoneNumber});

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

//   useEffect(() => {
//     setData({...data, token : user_token});
//   }, [])



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
        <div className={styles.formGroup}>          
          <input
            type="checkbox"
            name="agreeToPrivacyPolicy"
            className="form-input"
            checked={data.agreeToPrivacyPolicy}
            onChange={onMarkHandler}
          />
          <label htmlFor="agreeToPrivacyPolicy" className="form-label">
            I agree to Privacy Policy
          </label>
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