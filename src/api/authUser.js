const userApi={
  getMe:()=>{
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve({
          id:'1998',
          name:'boy2balls',
          email:'boy2balls@gmail.com',
        },4000) 
      })
    })
  }
}

export default userApi