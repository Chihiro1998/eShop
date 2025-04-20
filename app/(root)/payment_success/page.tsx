"use client";

import Head from "next/head";
import { useEffect } from "react";
import useCart from "@/lib/hooks/useCart";

export default function PaymentSuccess() {
  const storeUrl = process.env.NEXT_PUBLIC_STORE_URL || "/";
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <>
      <Head>
        <title>Payment Successful</title>
      </Head>
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
          backgroundColor: "#f5f5f5",
          padding: "50px",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            background: "#fff",
            margin: "auto",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            maxWidth: "600px",
          }}
        >
          <h1 style={{ color: "#4CAF50" }}>Payment Successful!</h1>
          <p>
            Your payment has been processed successfully. Thank you for your
            purchase.
          </p>
          <a
            href={storeUrl}
            style={{ textDecoration: "none", color: "#007BFF" }}
          >
            Return to Store
          </a>
        </div>
      </div>
    </>
  );
}
