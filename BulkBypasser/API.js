//not the real API for ethical reasons my API will be kept private this is somewhat of a ethical framework

const express = require("express");
const crypto = require("crypto");

const app = express();
app.use(express.json());

function hash(input) {
  return crypto.createHash("sha1").update(input).digest("hex").slice(0, 10);
}

app.post("/resolve", (req, res) => {
  const { url } = req.body;

  if (typeof url !== "string") {
    return res.status(400).json({ error: "invalid input" });
  }

  const id = hash(url);

  res.json({
    input: url,
    resolved: true,
    finalUrl: `https://example.test/final/${id}`,
    redirectChain: [
      { url, status: 302 },
      { url: `https://example.test/intermediate/${id}`, status: 302 },
      { url: `https://example.test/final/${id}`, status: 200 }
    ],
    metadata: {
      source: "mock",
      timestamp: Date.now()
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API listening on ${PORT}`);
});
