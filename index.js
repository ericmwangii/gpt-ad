import express from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors("*"));

app.get("/ad", async (req, res) => {
  let product = req.query.product;

  const response = await openai.createCompletion("text-davinci-001", {
    prompt: `${product}`,
    temperature: 0.5,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  var data = response.data.choices.map((item) => item.text);

  // console.log(data);

  res.json(data);
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
