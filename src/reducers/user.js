const userReducer = (state=null, action) => {
    switch(action.type){
      case "STORE_ID" : return {...state, user_id : action.payload};
      case "STORE_TOKEN" : return {...state, user_token : action.payload};
      default : return state;
    }
  }

export default userReducer;