"use client";
import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();

  const handleClick = () => {
    const hasSameOriginReferrer =
      typeof document !== "undefined" &&
      document.referrer &&
      new URL(document.referrer).origin === window.location.origin;

    if (hasSameOriginReferrer) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Tillbaka"
      title="Tillbaka"
      style={{
        position: "absolute",
        top: "-15px",
        left: "15px",
        zIndex: 100,
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 0,
      }}
    >
      <span style={{ color: "#000", fontFamily: "var(--font-roboto)" }}>
        Tillbaka
      </span>
    </button>
  );
}
