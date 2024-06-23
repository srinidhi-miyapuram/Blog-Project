import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const title = post_title.slice(0, 4);
  const description = post_desc.slice(0, 4);
  const image = post_img.slice(0, 4);
  res.render("index.ejs", {
    post_title: title,
    post_desc: description,
    post_img: image,
  });
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/post", (req, res) => {
  res.render("post.ejs", {
    post_title: post_title,
    post_desc: post_desc,
    post_img: post_img,
  });
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.post("/contact", (req, res) => {
  post_title.unshift(req.body["name"]);
  console.log(post_desc);

  res.render("contact.ejs");
});

app.get("/post/new", (req, res) => {
  res.redirect("/new");
});

app.get("/new", (req, res) => {
  res.render("new_post.ejs");
});

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});

var post_title = [
  "God of Universe",
  "Sun & Planets",
  "Games",
  "Movies",
  "Health is Wealth",
];

var post_desc = ["content", "content", "content", "content", "content"];

var post_img = [
  "/Images/galaxy.avif",
  "/Images/planets.jpg",
  "/Images/game.avif",
  "/Images/movie.avif",
  "/Images/health.avif",
];
