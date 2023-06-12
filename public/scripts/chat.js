const chat=document.getElementById('chat');
const group=document.getElementById('group');
const users=document.getElementById('users');

const msgForm=document.getElementById('msg-form');
const groupForm=document.getElementById('group-form');
const userForm=document.getElementById('user-form');

const userSection=document.getElementById('user-section');
const groupSection=document.getElementById('group-section');
const backbtn=document.getElementById('back-btn');
const logoutBtn=document.getElementById('logout');



groupForm.addEventListener('submit',async(e)=>{
   
    try {
    e.preventDefault();
    const token=localStorage.getItem('sessionToken');
    // console.log(token);
  
        const group=e.target.group.value;
     const response= await axios.post('http://localhost:3000/group/create',{
        group:group,
      },
      {
        headers:{
            authorization:token,
        }
      }
      
      )
     
    if(response.status==200){
        showGroup(e.target.group.value,response.data.groupId)
        console.log(response.data);
        notify(response.data);
    }

        

    } catch (error) {
        console.log(error);
        notify(error.response.data);
    }
});

function showGroup (groupName,groupId){
    const textNode = `<div class="group-name" id="${groupId}" >${groupName}</div>`;
    group.innerHTML += textNode;
}