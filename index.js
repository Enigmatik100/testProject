const express = require("express");
const bodyParser = require("body-parser");
const app = express();



app.set('view engine', 'ejs');
app.set("views", __dirname + "/views"); 

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.get('/', (req, res)=>{
    return res.render('sigin');
});

app.get('/checkHours', (req, res)=>{
    return res.render('index', {message:''});
});

app.post('/siginUser', (req,res)=>{
    let pseudo = req.body['pseudo'];
    let password = req.body['password'];
    console.log(pseudo,password);
    return res.redirect('/checkHours');
})

app.post('/checkHours', (req,res)=>{
    let hour = req.body['hours'];
    let minute = req.body['minute']; 
    let message = '';
   
    if(hour.length === 1 )
        hour = '0'+hour;
    
    if(minute.length === 1 )
        minute = '0'+minute;
    
    let reverseHour = hour[1]+hour[0];

    if(hour === minute){
       message = "Heure jumelle";
    }

    if(reverseHour === minute){
        message = "Heure miroir"
    }

    if(hour===minute && reverseHour === minute){
        message = "Heure jumelle  miroir"
    }

    if(reverseHour===minute && minute >=0 && minute<24)
        message = "Heure miroir homologue"
    

        res.render('index', {message: message});
})
 
app.listen(3000, ()=>{
    console.log("app listen on port 3000")
});

