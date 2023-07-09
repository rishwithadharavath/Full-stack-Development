const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const ejs = require("ejs");
const _ = require("lodash");
var posts = [];

const homecontent = "A home, or domicile, is a space used as a permanent or semi-permanent residence for one or many humans, and sometimes various companion animals. It is a fully or semi sheltered space and can have both interior and exterior aspects to it. Homes provide sheltered spaces, for instance rooms, where domestic activity can be performed such as sleeping, preparing food, eating and hygiene as well as providing spaces for work and leisure such as remote working, studying and playing.";
const aboutcontent = "I am passionate about my work,ambitious and driven, highly organised, people person";
const contactcontent = "Contact me over my mail.";
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.render("home",{homecontext: homecontent,posts: posts});
});

app.get("/about",function(req,res){
    res.render("about",{aboutcontext: aboutcontent});
});

app.get("/contact",function(req,res){
    res.render("contact",{contactcontext: contactcontent});
});

app.get("/compose",function(req,res){
    res.render("compose");
});
app.post("/",function(req,res){
    const post = {
        Title:req.body.new,
        Message:req.body.message
    }
posts.push(post);
res.redirect("/");
});

app.get("/posts/:title",function(req,res){
    const requestedtitle = _.lowerCase(req.params.title);

    posts.forEach(function(post){
        const finaltitle = _.lowerCase(post.Title);
        if(finaltitle === requestedtitle){
            res.render("posts",{posts:posts});
        }
    });
});
app.set('view engine','ejs');

app.listen(3000,function(){
    console.log("Server Started at 3000");
})