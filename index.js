import express from "express";
import bodyParser from "body-parser";
import posts from "./response_file.json" with { type: "json"};
import * as fs from 'fs';

const app = express();
const port = 3000;
var i = 5;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var posts_list = posts;

app.get("/", (req, res) => {
  res.render("index.ejs", {
    posts_list: posts_list.posts,
  });
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/post", (req, res) => {
  let post_list = fs.readFileSync('response_file.json', 'utf-8');
  let post_list_cont = JSON.parse(post_list);
  res.render("post.ejs", {
    posts_list: post_list_cont.posts,
  });
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.post("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/post/new", (req, res) => {
  res.redirect("/new");
});


app.get("/edit", (req, res) => {
  res.render("new_post.ejs", {
    num: index,
    title: title,
    image: img,
    description: desc,
  });
})
app.post("/edit", (req, res) => {
  index = req.body.id;
  title = req.body.title;
  img = req.body.image;
  desc = req.body.description;
  res.redirect("/edit");
})

app.get('/delete', (req, res) => {
  res.redirect('/post');
})

app.post("/delete", (req, res) => {
  let post_content = fs.readFileSync("response_file.json", 'utf-8');
  let post_content_json = JSON.parse(post_content);
  // delete post_content_json.posts[req.body.id];
  post_content_json.posts.splice(req.body.id, 1);
  let post_new_content = JSON.stringify(post_content_json);
  fs.writeFileSync("response_file.json", post_new_content, 'utf-8');
  res.redirect('/post');
})


app.get("/new", (req, res) => {
  res.render("new_post.ejs", {
    num: index,
    title: title,
    image: img,
    description: desc
  })
});

app.post("/save", (req, res) => {
  console.log(req);
  let post_content = fs.readFileSync("response_file.json", 'utf-8');
  let post_content_json = JSON.parse(post_content);
  var status = false;
  for (let ind = 0; ind < post_content_json.posts.length; ind++) {
    const element = post_content_json.posts[ind].id;
    
    if (element == req.body.id){
      post_content_json.posts[ind].title = req.body.title;
      post_content_json.posts[ind].description = req.body.description;
      post_content_json.posts[ind].image = req.body.image;

      
      status = true;
      break;
    }
    
  }
  if (status == false){
    post_content_json.posts.push(req.body);
  }
  let post_json_write = JSON.stringify(post_content_json);
  fs.writeFileSync("response_file.json", post_json_write, 'utf-8');

  // Reassigning local title and description variables

  index = req.body.id;
  title = req.body.title;
  desc = req.body.description;
  img = req.body.image;
  res.redirect('/new');
  
});

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});

function load_page() {
  window.location.reload();
}

var title = "Title";

var json_content = JSON.parse(fs.readFileSync('response_file.json', 'utf-8'));
var index = json_content.posts.length;


var img = "/Images/planets.jpg";

var desc = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum officia
        dolores maxime harum quas unde vero eius, pariatur nam architecto qui
        autem sunt magnam dolorem ipsa, reiciendis illo quaerat excepturi!
        Corrupti aliquid voluptate officiis quisquam. Eveniet sed nesciunt illum
        impedit autem odio omnis et saepe! Nulla, quae? Tempora dolorum tenetur
        saepe quidem porro repellat? Cum sapiente tempore ab ex recusandae.
        Voluptates cumque, beatae voluptatem, rem perspiciatis deserunt vitae
        dolorem voluptas itaque, quisquam aspernatur adipisci eligendi atque
        accusantium. Necessitatibus veritatis, aliquid at dolores distinctio
        neque eaque nam voluptas voluptatum saepe! Accusamus! Eius, perspiciatis
        qui? Velit ad facere ipsum hic dolore sint molestiae doloribus debitis
        nihil. Expedita harum tenetur omnis tempora et, quidem odit veniam autem
        similique cum in debitis corrupti animi? Eos totam veniam repellat
        fugiat praesentium inventore rerum voluptas nam pariatur, magni
        accusantium repellendus quisquam. Odit provident sapiente, et aperiam
        libero consequatur voluptates dolor officiis! Dolorem porro veniam
        ratione tenetur! Libero laborum doloribus, animi quidem inventore
        adipisci quae omnis! Nam, nobis dolores consectetur obcaecati eveniet
        ullam ab nihil aperiam ex reprehenderit iure omnis tempore voluptas rem
        architecto sit, perferendis aliquid. Expedita fugiat ad architecto
        eveniet temporibus, id illum harum vero repellendus repudiandae
        blanditiis error rerum quisquam dignissimos ut quas consequatur optio
        similique maxime repellat iste. Quis saepe magni excepturi et. Ex,
        eligendi fuga harum laborum tempore praesentium cum itaque quod
        sapiente, asperiores aliquid cupiditate amet voluptatibus tenetur, culpa
        quos non at beatae quo est! A repellendus magnam pariatur ex possimus.
        Mollitia, non. Voluptates molestias quod repellendus. Reprehenderit
        expedita quam magni vero, odit ut sapiente beatae animi. Error, fuga
        quas ea iure reiciendis a libero vitae doloremque, iusto atque
        praesentium incidunt! Iusto, nisi repellendus. Culpa at quae placeat qui
        pariatur quis et consequatur reprehenderit rem, deserunt incidunt, ea
        porro nesciunt voluptates? Minus blanditiis iste, maxime pariatur
        accusamus sed? Molestiae, harum culpa?`