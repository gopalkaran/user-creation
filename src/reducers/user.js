const userReducer = (state=null, action) => {
    switch(action.type){
      case "STORE_ID" : return {...state, user_id : action.payload};
      case "STORE_LOGIN_TOKEN" : return {...state, userlogin_token : action.payload};
      case "STORE_VERIFICATION_TOKEN" : return {...state, userverification_token : action.payload};
      default : return state;
    }
  }

export default userReducer;