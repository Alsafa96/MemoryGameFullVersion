const express=require('express');
const bodyParser=require('body-parser');


const app=express();
app.use(express.static('./public'));

app.use(bodyParser.urlencoded({'limit':'50mb',extended:true}));
app.use(bodyParser.json('limit','50mb'));

app.get('/',(req,res)=>{
    res.status(200).sendFile(__dirname+'/public/index.html');
})


app.listen(5000,()=>{
    console.log('The Game is running on port 5000');
})