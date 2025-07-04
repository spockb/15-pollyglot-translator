import express from "express";
import "dotenv/config";
import OpenAI from "openai";

const app = express();
const PORT = 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.static("public"));
app.use(express.json());

app.post("/api/translate", async (req, res) => {
  const { text, targetLanguage } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Translate into ${targetLanguage}.`,
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    const translatedText = completion.choices[0].message.content;
    res.json({ result: translatedText });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
