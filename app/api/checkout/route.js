import Stripe from "stripe";
import "../../../envConfig.js";

const API_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(API_KEY);

export async function POST(request) {
  try {
    const { lineItems } = await request.json();
    console.log(lineItems);

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });

    console.log("Stripe session created:", session);

    return Response.json({ url: session.url });

  } catch (error) {
    console.error("Error in checkout route:", error.message);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
