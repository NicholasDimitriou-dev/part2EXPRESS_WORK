import express from 'express';
const solarSystem = (await import('npm-solarsystem')).default;
import fetch from 'node-fetch';

const app = express();

app.set("view engine", "ejs");
//store img and css static files in file public
app.use(express.static("public"));

//routes
//root route
app.get('/', async (req, res) => {
    let url = "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=solar%20system"
    let respone = await fetch(url);
    let data = await respone.json();
    let i = Math.floor(Math.random()*50);
    let img =data.hits[i].webFormatURL;
    console.log(data)
    res.render('home.ejs', {img});
});

//planet route
app.get('/planent',(req, res) => {
    let planent_Name = req.query.planentName;
    let planentInfo = solarSystem[`get${planent_Name}`]();
    console.log(planentInfo);
    res.render('planentInfo.ejs', {planentInfo, planent_Name});
});
//starts the web server
app.listen(3000, () => {
   console.log('server started');
});
//ctrl c to stop server