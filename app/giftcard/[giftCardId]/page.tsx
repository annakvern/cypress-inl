// app/gift-card/[giftCardId]/page.tsx
import { db } from "@/prisma/db";
import Link from "next/link";

export default async function GiftCardConfirmation({
  params,
  searchParams,
}: {
  params: Promise<{ giftCardId: string }>;
  searchParams: Promise<{ code?: string; title?: string }>;
}) {
  const { giftCardId } = await params;
  const { code, title } = await searchParams;

  const gift = await db.giftCard.findUnique({
    where: { id: giftCardId },
    include: { activity: true },
  });
  if (!gift)
    return <h1 style={{ textAlign: "center" }}>Presentkort hittades inte.</h1>;

  const shownTitle = title ?? gift.activity?.title ?? "Valfri aktivitet";

  return (
    <main
      style={{
        padding: "2rem 1rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: 720,
          width: "100%",
          border: "2px solid #9C8173",
          borderRadius: 8,
          padding: 24,
          background: "#fff",
        }}
      >
        <h1 style={{ marginTop: 0, textAlign: "center" }}>
          Tack! Ditt presentkort är klart 🎁
        </h1>

        <div style={{ marginTop: 16, textAlign: "center" }}>
          <div style={{ fontSize: 18, marginBottom: 8 }}>
            Gäller för: <strong>{shownTitle}</strong>
          </div>
          <div style={{ fontSize: 16, opacity: 0.9 }}>
            Från: {gift.fromName} &nbsp;•&nbsp; Till: {gift.toName}
          </div>

          <div style={{ marginTop: 16 }}>
            <div
              style={{
                display: "inline-block",
                padding: "10px 14px",
                border: "2px dashed #1f7a7a",
                borderRadius: 8,
                fontFamily: "monospace",
                fontSize: 22,
              }}
            >
              {code ?? gift.code}
            </div>
            <div style={{ marginTop: 8, fontSize: 13, opacity: 0.7 }}>
              Använd koden när du bokar.
            </div>
          </div>
        </div>

        <p style={{ textAlign: "center", marginTop: 24 }}>
          <Link
            href="/"
            style={{
              textDecoration: "none",
              background: "#1f7a7a",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: 6,
              fontWeight: 600,
              display: "inline-block",
            }}
          >
            Till startsidan
          </Link>
        </p>
      </div>
    </main>
  );
}
