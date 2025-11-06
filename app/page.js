import ImageBanner from "@/components/ImageBanner";
import Products from "@/components/Products";

export async function getProducts() {
  try {
    const isDev = process.env.NODE_ENV === "development";
    const baseUrl = isDev
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;

    console.log("🌍 NODE_ENV:", process.env.NODE_ENV);
    console.log("🌍 BASE_URL:", process.env.BASE_URL);
    console.log("🌍 NEXT_PUBLIC_BASE_URL:", process.env.NEXT_PUBLIC_BASE_URL);
    console.log("🧩 Fetch URL:", `${baseUrl}/api/products`);

    const response = await fetch(`${baseUrl}/api/products`, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);

    const data = await response.json();
    console.log("✅ Products fetched:", data.length);
    return data;
  } catch (error) {
    console.error("🚨 getProducts failed:", error.message);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  let planner = null;
  let stickers = [];

  for (const p of products) {
    if (p.name === "Medieval Dragon Month Planner") planner = p;
    else stickers.push(p);
  }

  return (
    <>
      <ImageBanner />
      <section>
        <Products planner={planner} stickers={stickers} />
      </section>

      {/* Debug Info visible en AWS */}
      <div style={{ background: "#111", color: "#0f0", padding: "1rem", fontSize: "0.9rem" }}>
        <p><strong>🧪 DEBUG INFO</strong></p>
        <p>NODE_ENV: {process.env.NODE_ENV}</p>
        <p>BASE_URL: {process.env.BASE_URL || "❌ undefined"}</p>
        <p>NEXT_PUBLIC_BASE_URL: {process.env.NEXT_PUBLIC_BASE_URL || "❌ undefined"}</p>
        <p>Products fetched: {products.length}</p>
        <p>Planner found: {planner ? "✅" : "❌"}</p>
        <p>Stickers count: {stickers.length}</p>
      </div>
    </>
  );
}
