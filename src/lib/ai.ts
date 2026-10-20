// Free, keyless public inference service (Pollinations.ai). No secrets involved.
const ENDPOINT = "https://text.pollinations.ai/";

export async function runAI(system: string, user: string): Promise<string> {
  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "openai",
        private: true,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });
  } catch {
    throw new Error("Couldn't reach the free AI service. Check your connection and try again.");
  }
  if (res.status === 429) throw new Error("The free AI service is busy (rate limited). Please wait a moment and try again.");
  if (!res.ok) throw new Error(`The free AI service is unavailable right now (status ${res.status}). No response was generated.`);
  const text = (await res.text()).trim();
  if (!text) throw new Error("The AI service returned an empty response. Please try again.");
  return text;
}
