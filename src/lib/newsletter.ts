const FORM_ID = process.env.NEXT_PUBLIC_KIT_FORM_ID || "";
const API_KEY = process.env.NEXT_PUBLIC_KIT_API_KEY || "";

export async function subscribeToNewsletter(email: string) {
  const res = await fetch(
    `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: API_KEY, email }),
    }
  );
  if (!res.ok) throw new Error("Subscribe failed");
  return res.json();
}
