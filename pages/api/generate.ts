import type { NextRequest } from "next/server";
import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (req: NextRequest): Promise<Response> => {
  try {
    const { prompt } = (await req.json()) as {
      prompt?: string;
    };

    if (!prompt) {
      return new Response("No prompt in the request", { status: 400 });
    }

    const payload: OpenAIStreamPayload = {
      model: "gpt-3.5-turbo-1106",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 768,
      stream: true,
      n: 1,
    };

    const stream = await OpenAIStream(payload);
    
    // Set appropriate response headers
    const headers = new Headers();
    headers.set("Content-Type", "text/event-stream");

    return new Response(stream, { headers });
  } catch (error) {
    console.error("An error occurred:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export default handler;
