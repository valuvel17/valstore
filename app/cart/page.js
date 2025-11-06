"use client";
import { useRouter } from "next/navigation";
import { useProducts } from "@/context/ProductContext";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const router = useRouter();
  const { cart, handleIncrementProduct } = useProducts();
  const totalPrice = Object.keys(cart).reduce((acc, curr) => {
    const itemPrice = cart[curr].prices[0].unit_amount * cart[curr].quantity;
    return acc + itemPrice;
  }, 0);

  async function createCheckout() {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const lineItems = Object.keys(cart).map((item, itemIndex) => {
        return {
          price: item,
          quantity: cart[item].quantity,
        };
      });
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lineItems }),
      });

      const data = await response.json();
      if (response.ok && data.url) {
        console.log("Checkout created successfully:", data);
        router.push(data.url);
      } else {
        console.error("No URL returned from checkout session");
      }
    } catch (error) {
      console.log("Error creating checkout:", error.message);
    }
  }
  return (
    <section>
      <h2>Your Cart</h2>
      {Object.keys(cart).length === 0 && (
        <p>Your cart is empty. Start shopping!</p>
      )}

      <div className="cart-container">
        {Object.keys(cart).map((item, itemIndex) => {
          const itemData = cart[item];
          const itemQuantity = itemData?.quantity;
          const imgName =
            itemData.name == "Medieval Dragon Month Planner"
              ? "planner"
              : itemData.name
                  .replaceAll(" Sticker.png", "")
                  .replaceAll(" ", "_");
          const imgUrl = "low_res/" + imgName + ".jpeg";

          return (
            <div key={itemIndex} className="cart-item">
              <div
                style={{
                  position: "relative",
                  width: "250px",
                  height: "250px",
                }}
              >
                <Image
                  src={`/${imgUrl}`}
                  alt={`${imgName}-img`}
                  fill
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                />
              </div>

              <div className="cart-item-info">
                <h3>{itemData.name}</h3>
                <p>
                  {itemData.description?.slice(0, 100)}
                  {itemData.description?.length > 100 ? "..." : ""}
                </p>
                <h4>
                  ${(itemData.prices[0].unit_amount * itemQuantity) / 100}
                </h4>
                <div className="quantity-container">
                  <p>
                    <strong>Quantity</strong>
                  </p>
                  <input
                    type="number"
                    min="1"
                    placeholder="2"
                    value={itemQuantity}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      handleIncrementProduct(
                        itemData.default_price,
                        newValue,
                        itemData,
                        true
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="total-price">
        <h3>Total Price: ${totalPrice / 100}</h3>
      </div>
      <div className="checkout-container">
        <Link href="/">
          <button>&larr; Continue shopping</button>
        </Link>
        <button onClick={createCheckout}>Checkout &rarr;</button>
      </div>
    </section>
  );
}
