const express = require("express");
const path = require("path");
const hbs = require('hbs');
const forecast = require("./utils/forecast")
const geocode = require("./utils/geocode")

const app = express()
const port = process.env.PORT || 3000;

//Define Paths for express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')



//Setup handlerbars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDir))


app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather',
        name : 'Yo'
    })
})

app.get("/about",(req,res) => {
    res.render("about", {
        title:'About Me',
        name : 'Moiza'
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title: "Helped Me",
        name : 'Moiza'
    })
})

// app.get("", (req, res) => {
//     res.send('<h1>Hello express!</h1>');
// })

// app.get("/help", (req, res) => {
//     res.send([{
//         name : 'yogesh',
//         age: 24
//     },{
//         name : 'mizu',
//         age : 24
//     }]);
// })

// app.get('/about', (req,res)=>{
//     res.send("<h1>About Page</h1>")
// })

app.get('/weather', (req,res)=>{

    console.log(req.query.address);

    if(!req.query.address){
        return res.send({
            error : 'Address query requierd',
        })
    }

    geocode(req.query.address, (error, {latitude,logitude,location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }else{
            console.log(latitude);
            console.log(logitude);
            console.log(location);
            forecast(latitude,logitude,(error, forecasrData) => {
                if(error){
                    return res.send({
                        error
                    })
                }else{
                    console.log(forecasrData.temperature);
                    console.log(forecasrData.feelslike);
                    console.log(forecasrData.wheatherDescription);
                    res.send({
                        Forecast : forecasrData.temperature,
                        FeelsLike :  forecasrData.feelslike,
                        WheatherDescription : forecasrData.wheatherDescription,
                        address : req.query.address
                    })
                }
            });
        }
    });
   
    // else{
    //     res.send({
    //         forecast : ['sunny'],
    //         location : 'Navi Mumbai'
    //     })
    // }
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errormessgae : 'Help Page not found'
    })
})

app.get('/products',(req,res)=>{
    console.log("req",req.query.search);
    if(!req.query.search){
        res.send({
            error : 'Must provide search term'
        })
    }else{
        res.send({
            product: []
        })
    }   
})

app.get('*',(req,res)=>{
    res.render('404',{
        errormessgae : 'Page not found'
    })
})

app.listen(port, ()=>{
    console.log('server started port'+port);
})