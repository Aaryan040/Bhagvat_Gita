import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/verses", (req, res) => {
  res.render("verse.ejs");
});

app.get("/submit", async (req, res) => {
  try {
    //use req.query.name in place of req.body["name"] in case of get request
    const chapter = req.query.chapter;
    const response = await axios.get(
      `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapter}/`,
      {
        headers: {
          "X-RapidAPI-Key": process.env.X_RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.X_RAPID_API_HOST,
        },
      }
    );
    const result = response.data;

    res.render("index.ejs", {
      illustration: result,
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(422);
  }
});

app.get("/verse", async (req, res) => {
  try {
    //use req.query.name in place of req.body["name"] in case of get request
    const chapter = req.query.chapter;
    const verse = req.query.verse;
    const response = await axios.get(
      `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapter}/verses/${verse}/`,
      {
        headers: {
          "X-RapidAPI-Key": process.env.X_RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.X_RAPID_API_HOST,
        },
      }
    );
    const result = response.data;

    res.render("verse.ejs", {
      illustration: result,
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(422);
  }
});

app.listen(port, () => {
  console.log(`app is listening on http://localhost:${port}`);
});
