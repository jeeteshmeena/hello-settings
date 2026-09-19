import { createOpenAI } from "@ai-sdk/openai";

const gatewayUrl = "https://ai.gateway.lovable.dev/v1";

export function createLovableResponsesProvider(apiKey: string) {
  return createOpenAI({
    baseURL: gatewayUrl,
    apiKey,
    headers: {
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
  });
}