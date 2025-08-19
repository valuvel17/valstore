"use client";
import Link from "next/link";
import { useRef, useState } from "react";

export default function ImageBanner() {
  const [IsLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef();

  return (
    <div className="banner-images">
      <img
        className="low-res-img"
        src="low_res/banner.jpeg"
        alt="banner-low-res"
      />
      <img
        ref={imgRef}
        className="high-res-img"
        src="med_res/banner.png"
        alt="banner-high-res"
        style={{ opacity: IsLoaded ? 1 : 0 }}
        onLoad={() => setIsLoaded(true)}
      />

      <div className="cta-btns-container">
        <div>
          <div>
            <h3>Welcome to</h3>
            <h1>The Valstore</h1>
          </div>
          <div>
            <Link href="#stickers-section">
              <button>Shop stickers</button>
            </Link>
            <Link href="#planner-section">
              <button>Shop planner</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
