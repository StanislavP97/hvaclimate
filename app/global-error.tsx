"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "24px",
            textAlign: "center",
            backgroundColor: "#0E1122",
            color: "#ffffff",
            fontFamily: "sans-serif",
          }}
        >
          <h1 style={{ fontSize: "2.5rem", fontWeight: 700 }}>
            Something went wrong
          </h1>
          <p style={{ marginTop: "1rem", color: "#94a3b8" }}>
            We apologize for any inconvenience. Please try again.
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: "2rem",
              padding: "12px 32px",
              borderRadius: "9999px",
              backgroundColor: "#0061CF",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
