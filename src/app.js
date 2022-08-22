const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
// console.log(__dirname);
// console.log(__filename);

const PORT = process.env.PORT || 3000;
const public = path.join(__dirname, "../public");
const app = express();

const viewsPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");
//Setup handlebars engine
app.set("view engine", "hbs");
//telling handlebar to search for files in this path instead of views
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

//To use static directory to serve static files
app.use(express.static(public));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Fatema",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Fatema",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Fatema",
    msg: "This is the help page.",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    name: "Fatema",
    msg: "Help Article not Found.",
  });
});

// app.get("/", (req, res) => {
//     res.send("<h1>Hello Express!!</h1>");
// });

// app.get("/help", (req, res) => {
//     res.send([
//         {name: "Sarrah"},
//         {name: "Fatema"}
//     ]);
// });

// app.get("/about", (req, res) => {
//     res.send("<h1>About Page</h1>");
// });

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    res.send({ error: "No address term found" });
    return;
  }
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({error});
    }
    forecast(latitude, longitude, (error, forecast) => {
      if (error) {
        return res.send({error});
      }
      res.send({
        address, 
        location,
        forecast
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "You must provide a search term",
    });
  } else {
    res.send({
      products: [],
    });
  }
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    name: "Fatema",
    msg: "Page not found.",
  });
});

app.listen(PORT, () => {
  console.log("Server is up on port "+PORT);
});
