const form =document.querySelector('form');

form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    try {
        
        const response=await axios.post('http://localhost:3000/user/login',{
            email:e.target.email.value,
            password:e.target.password.value,
        })
        if(response.status==200){
            // localStorage.setItem("sessionToken",response.data.sessionToken);
            window.alert('login successfull')
         
        }
        else{
            throw {response:response}
        }


    } catch (error) {
        notify(error.response.data);
        console.log(error);
    }
})