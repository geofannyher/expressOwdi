require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/all", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch(
      `https://b2b-api.avatara.id/metered/conversations/2pmPlrB9pby2XOA3Z5f7HEdBCsk/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.AVATARA_TOKEN}`,
          apiKey: process.env.AVATARA_KEY,
        },
        body: JSON.stringify({ message }),
      }
    );

    const dataResponse = await response.json();

    res.status(200).json(dataResponse);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
