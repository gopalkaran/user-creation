export const storeid = (id) =>{
    return {
      type : 'STORE_ID',
      payload : id
    }
}

export const storetoken = (token) => {
  return {
    type : 'STORE_TOKEN',
    payload : token
  }
}