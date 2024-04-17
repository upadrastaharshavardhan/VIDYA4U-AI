const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey) {
  throw new Error("Missing OpenAI API key");
}

// Inside your request handler
const res = await fetch(`https://${process.env.OPENAI_BASE_URL ?? ""}/v1/chat/completions`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${openaiApiKey}`,
  },
  method: "POST",
  body: JSON.stringify(payload),
});
