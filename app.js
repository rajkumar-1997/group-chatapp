const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const path=require('path');
const sequelize=require('./util/database');


const app=express();
app.use(cors());
require('dotenv').config();
const PORT=process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

const userRoutes=require('./routes/user');



app.use('/user',userRoutes);


app.use('/',(req,res)=>{
    let  url=req.url;
    res.header('Content-Security-Policy', "img-src  'self'");
    res.sendFile(path.join(__dirname,`views/${url}.html`))
})


sequelize.sync().then((result)=>{
    console.log(result);
    app.listen(PORT)
}).catch((error)=>{
    console.log(error);
})
