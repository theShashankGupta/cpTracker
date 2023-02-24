const express=require('express');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const moment = require('moment');
app.use(bodyParser.json());
var path = require('path');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express); 

let flag = 0;

let port = process.env.PORT || 3000;

app.get('/', (req,res) => {
    let user, f;
    if(flag==1) flag+=1;
    else if(flag==2) flag=0;
    res.render('main',{user:user, f:flag});
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contest-calender', (req,res) => {
    res.render('calender');
});

app.post('/users', async (req,res,next) => {
    let user;
    let url = 'https://codeforces.com/api/user.info?handles=' + req.body.handle;
    let dt = await fetch(url);
    user = await dt.json();
    console.log(user);
    if(user.status == "OK"){
        res.render('users', {data: user.result[0]});
    }
    else{
        flag=1;
        res.redirect('/');
    }
});

app.post('/filter', async (req, res, next) => {
    console.log(req.body);
    let url1 = 'https://codeforces.com/api/user.status?handle=' + req.body.handle ;
    let dt1 = await fetch(url1);
    let submissions = await dt1.json();
    // console.log(submissions.result);
    submissions = submissions.result;
    let mode = {
        "total" : {
            "rating" : {},
            "index": {}
        },
        "practice" : {
            "rating" : {},
            "index": {}
        },
        "virtual" : {
            "rating" : {},
            "index": {}
        },
        "official" : {
            "rating" : {},
            "index": {}
        }
    }
    let allSub = {
        "verdict" : {},
        "language" : {} 
    }
    const a = new Set();
    const b = new Set();
    const c = new Set();
    const d = new Set();
    const e = new Set();
    let sd = moment(req.body.sd).format('x');
    sd/=1000;
    let ed = moment(req.body.ed).format('x');
    ed/=1000;
    submissions.forEach(i => {
        if(i.creationTimeSeconds <= ed && i.creationTimeSeconds >= sd) {
            if(allSub["verdict"][i.verdict])
            allSub["verdict"][i.verdict] += 1;
            else
            allSub["verdict"][i.verdict] = 1;
            if(allSub["language"][i.programmingLanguage])
            allSub["language"][i.programmingLanguage] += 1;
            else
            allSub["language"][i.programmingLanguage] = 1;  
            if(i.verdict !== "OK"){
                return;
            }
            let str = i.problem.contestId + i.problem.index.charAt(0);
            if(!a.has(str)){
                a.add(str);
                if(mode["total"]["rating"][i.problem.rating])
                mode["total"]["rating"][i.problem.rating] += 1;
                else
                mode["total"]["rating"][i.problem.rating] = 1;
                if(mode["total"]["index"][i.problem.index.charAt(0)])
                mode["total"]["index"][i.problem.index.charAt(0)] += 1;
                else
                mode["total"]["index"][i.problem.index.charAt(0)] = 1;
            }
            if(!b.has(str) && (i.author.participantType === "CONTESTANT" || i.author.participantType === "OUT_OF_COMPETITION")){
                b.add(str);
                e.add(i.problem.contestId);
                if(mode["official"]["rating"][i.problem.rating])
                mode["official"]["rating"][i.problem.rating] += 1;
                else
                mode["official"]["rating"][i.problem.rating] = 1;
                if(mode["official"]["index"][i.problem.index.charAt(0)])
                mode["official"]["index"][i.problem.index.charAt(0)] += 1;
                else
                mode["official"]["index"][i.problem.index.charAt(0)] = 1;
            }
            if(!c.has(str) && i.author.participantType === "VIRTUAL"){
                c.add(str);
                if(mode["virtual"]["rating"][i.problem.rating])
                mode["virtual"]["rating"][i.problem.rating] += 1;
                else
                mode["virtual"]["rating"][i.problem.rating] = 1;
                if(mode["virtual"]["index"][i.problem.index.charAt(0)])
                mode["virtual"]["index"][i.problem.index.charAt(0)] += 1;
                else
                mode["virtual"]["index"][i.problem.index.charAt(0)] = 1;
            }
            if(!d.has(str) && i.author.participantType == "PRACTICE"){
                d.add(str);
                if(mode["practice"]["rating"][i.problem.rating])
                mode["practice"]["rating"][i.problem.rating] += 1;
                else
                mode["practice"]["rating"][i.problem.rating] = 1;
                if(mode["practice"]["index"][i.problem.index.charAt(0)])
                mode["practice"]["index"][i.problem.index.charAt(0)] += 1;
                else
                mode["practice"]["index"][i.problem.index.charAt(0)] = 1;
            }
        }
    });
    // console.log(allSub);
    // console.log(mode);
    let subData = {
        "total" : {
            "rating" : {},
            "index": {}
        },
        "practice" : {
            "rating" : {},
            "index": {}
        },
        "virtual" : {
            "rating" : {},
            "index": {}
        },
        "official" : {
            "rating" : {},
            "index": {}
        }
    }
    for(var i=0;i<26;i++){
        var chr = String.fromCharCode(65 + i);
        if(mode['practice']['index'][chr])
        subData['practice']['index'][chr] = mode['practice']['index'][chr];
        if(mode['official']['index'][chr])
        subData['official']['index'][chr] = mode['official']['index'][chr];
        if(mode['virtual']['index'][chr])
        subData['virtual']['index'][chr] = mode['virtual']['index'][chr];
        if(mode['total']['index'][chr])
        subData['total']['index'][chr] = mode['total']['index'][chr];
    }
    for(var chr=800;chr<=3500;chr += 100){
        if(mode['practice']['rating'][chr])
        subData['practice']['rating'][chr] = mode['practice']['rating'][chr];
        if(mode['official']['rating'][chr])
        subData['official']['rating'][chr] = mode['official']['rating'][chr];
        if(mode['virtual']['rating'][chr])
        subData['virtual']['rating'][chr] = mode['virtual']['rating'][chr];
        if(mode['total']['rating'][chr])
        subData['total']['rating'][chr] = mode['total']['rating'][chr];
    }
    // console.log(allSub);
    // console.log(subData);
    res.send({all: allSub, mode: subData, ts: a.size, tc: e.size});
});

app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
});