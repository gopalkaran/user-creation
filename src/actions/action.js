export const storeid = (id) =>{
    return {
      type : 'STORE_ID',
      payload : id
    }
}

export const storeLoginToken = (token) => {
  return {
    type : 'STORE_LOGIN_TOKEN',
    payload : token
  }
}

export const storeEmailVerificationToken = (token) => {
  return {
    type : 'STORE_VERIFICATION_TOKEN',
    payload : token
  }
}

export const clearstore = () => {
  return {
     type:"CLEAR_STORE"
 };
}