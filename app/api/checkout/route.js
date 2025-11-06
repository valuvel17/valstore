import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function POST(request) {
  try {
    const { lineItems } = await request.json();
    console.log("lineItems:", lineItems);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) console.error("Missing NEXT_PUBLIC_BASE_URL!");

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/`,
    });

    console.log("Stripe session created:", session.id);
    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Error in checkout route:", error.message);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
