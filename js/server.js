const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/send", async (req, res) => {
  const { firstName, lastName, email, userPhone, service, message } = req.body;

  try {
    const phone = "201009557074";
    const apiKey = "6054391";

    const fullMessage = encodeURIComponent(
`📩 New Contact Request

👤 Name: ${firstName} ${lastName}
📱 Phone: ${userPhone}
📧 Email: ${email}
🛠 Service: ${service}
💬 Message:
${message}

— Sent from your website`
    );

    const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${fullMessage}&apikey=${apiKey}`;

    await axios.get(url);

    res.json({ success: true });

  } catch (error) {
    console.log("ERROR:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});