import express from "express";
import bodyParser from "body-parser";
import posts from "./response_file.json" with { type: "json"};
import * as fs from 'fs'

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const posts_list = posts;

app.get("/", (req, res) => {
  res.render("index.ejs", {
    posts_list: posts_list.posts,
  });
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/post", (req, res) => {
  res.render("post.ejs", {
    posts_list: posts_list.posts,
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

app.get("/new", (req, res) => {
  res.render("new_post.ejs");
});

app.post("/save", (req, res) => {
  console.log(req.body)
  let post_content = fs.readFileSync("response_file.json", 'utf-8');
  let post_content_json = JSON.parse(post_content);
  post_content_json.posts.push(req.body);
  let post_json_write = JSON.stringify(post_content_json);
  fs.writeFileSync("response_file.json", post_json_write, 'utf-8');
  // post_content_json.posts.push(req.body);
  res.redirect('/new');
});

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});

