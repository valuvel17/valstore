import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function GET() {
  try {
    const products = await stripe.products.list({ active: true });
    const prices = await stripe.prices.list({ active: true });

    const combined = products.data.map(p => ({
      ...p,
      prices: prices.data.filter(price => price.product === p.id),
    }));

    console.log(`Products fetched: ${combined.length}`);
    return Response.json(combined);
  } catch (err) {
    console.error("Stripe fetch failed:", err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
