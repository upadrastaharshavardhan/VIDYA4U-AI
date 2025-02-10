// pages/api/generate.ts
import type { NextApiRequest, NextApiResponse } from "next";

const xyzApiKey = process.env.XYZ_API_KEY; // Update with XYZTogether API key

if (!xyzApiKey) {
  throw new Error("Missing XYZTogether API key");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt in request body" });
  }

  try {
    const xyzResponse = await fetch("https://api.xyztogether.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${xyzApiKey}`,
      },
      body: JSON.stringify({
        model: "xyz-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
      }),
    });

    if (!xyzResponse.ok) {
      const errorData = await xyzResponse.json();
      return res.status(xyzResponse.status).json(errorData);
    }

    const responseData = await xyzResponse.json();
    res.status(200).json({ text: responseData.choices?.[0]?.message?.content || "No response from XYZTogether." });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch response from XYZTogether" });
  }
}







// // pages/api/generate.ts
// import type { NextApiRequest, NextApiResponse } from "next";

// const openaiApiKey = process.env.OPENAI_API_KEY;

// if (!openaiApiKey) {
//   throw new Error("Missing OpenAI API key");
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   const { prompt } = req.body;
//   if (!prompt) {
//     return res.status(400).json({ error: "Missing prompt in request body" });
//   }

//   try {
//     const openAiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${openaiApiKey}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-4",
//         messages: [{ role: "system", content: "You are a helpful AI assistant." }, { role: "user", content: prompt }],
//         max_tokens: 500,
//       }),
//     });

//     if (!openAiResponse.ok) {
//       const errorData = await openAiResponse.json();
//       return res.status(openAiResponse.status).json(errorData);
//     }

//     const responseData = await openAiResponse.json();
//     res.status(200).json(responseData);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch response from OpenAI" });
//   }
// }






// const openaiApiKey = process.env.OPENAI_API_KEY;

// if (!openaiApiKey) {
//   throw new Error("Missing OpenAI API key");
// }

// // Inside your request handler
// const res = await fetch(`https://${process.env.OPENAI_BASE_URL ?? ""}/v1/chat/completions`, {
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${openaiApiKey}`,
//   },
//   method: "POST",
//   body: JSON.stringify(payload),
// });
