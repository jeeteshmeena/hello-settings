import { createServerFn } from "@tanstack/react-start";
import { Output, streamText } from "ai";
import { z } from "zod";

import { createLovableResponsesProvider } from "./ai-gateway.server";

const inputSchema = z.object({
  description: z.string().trim().min(3).max(1000),
});

const recommendationSchema = z.object({
  currency: z.enum(["INR", "USD"]),
  language: z.enum(["English", "Hindi"]),
  appearance: z.enum(["Mono", "Midnight", "Warm"]),
  preferences: z.object({
    showPrice: z.boolean(),
    reduceMotion: z.boolean(),
    ongoingStoryUpdates: z.boolean(),
  }),
  sounds: z.object({
    paymentSuccess: z.boolean(),
    episodeDelivery: z.boolean(),
    soundEffects: z.boolean(),
    demoRequest: z.boolean(),
  }),
  summary: z.string(),
});

export type SettingsRecommendation = z.infer<typeof recommendationSchema>;

function safeGatewayMessage(error: unknown) {
  if (error instanceof Error && error.message.trim()) return error.message;
  return "AI recommendations are unavailable right now.";
}

export const recommendSettings = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured for this app.");

    try {
      const lovable = createLovableResponsesProvider(apiKey);
      const result = streamText({
        model: lovable.responses("openai/gpt-6-astra"),
        output: Output.object({ schema: recommendationSchema }),
        system:
          "Convert the user's stated preferences into app settings. Infer conservatively. Use only the allowed enum values. The summary must be one short, friendly sentence explaining the choices. Return all fields.",
        prompt: `User preference description:\n${data.description}`,
        providerOptions: {
          openai: {
            forceReasoning: true,
            reasoningEffort: "low",
            reasoningSummary: "auto",
            store: false,
            include: ["reasoning.encrypted_content"],
          },
        },
      });

      return await result.output;
    } catch (error) {
      throw new Error(safeGatewayMessage(error));
    }
  });