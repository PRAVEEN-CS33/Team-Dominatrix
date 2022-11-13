// required pakage
const express  = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

// create the express server
const app = express();

// seer port number 
const PORT = process.env.PORT || 5000;

// set template engine
app.set("view engine","ejs");
app.use(express.static("Public"));

// needed to parse html data for post request
app.use(express.urlencoded({
    extended:true
}))

app.use(express.json());

app.get("/",(req,res) => {
    res.render("index")
})

app.post("/convert",async (req,res) => {
    const videourl = req.body.videourl;
    if(videourl === undefined || videourl === "" || videourl === null){
        return res.render("index",{success : false, message : "Please enter the url"})
    }else{
        const fetchAPI = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videourl}`,{
            'method' : 'get',
            'headers': {
                'X-RapidAPI-Key': '5e2d3c0fbbmshd72d65f6197e7ebp18eaacjsn5bdcb3145687',
                'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
              }
        })
        const fetchResponce = await fetchAPI.json();
        if(fetchResponce.status === "ok"){
            return res.render("index",{success:true, song_title: fetchResponce.title, song_link : fetchResponce.link});
        } else{
            return res.render("index",{success:false, message:fetchResponce.msg});
        }
    }
})

// start the server
app.listen(PORT,()=> {
    console.log(`Server stated on the port ${PORT}`);

})