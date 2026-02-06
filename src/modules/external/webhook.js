const express = require("express");
const redis = require("../../config/redis");

const router = express.Router();

router.post("/webhook", async (req, res) => {
  const idempotencyKey = req.headers["idempotency-key"];

  if (!idempotencyKey) {
    return res.status(400).json({ error: "Missing idempotency key" });
  }

  const alreadyProcessed = await redis.get(idempotencyKey);
  if (alreadyProcessed) {
    return res.status(200).json({ status: "Already processed" });
  }

  // Process webhook logic here
  await redis.set(idempotencyKey, "processed", "EX", 3600);

  res.json({ status: "Webhook processed" });
});

module.exports = router;
