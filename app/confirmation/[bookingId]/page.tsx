// app/confirmation/[bookingId]/page.tsx
import { db } from "@/prisma/db";
import Link from "next/link";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default async function ConfirmationPage({
  params,
  searchParams,
}: {
  params: { bookingId: string };
  searchParams: { title?: string };
}) {
  const booking = await db.booking.findUnique({
    where: { id: params.bookingId },
    include: { activity: true, customer: true },
  });
  if (!booking)
    return <h1 style={{ textAlign: "center" }}>Bokningen hittades inte.</h1>;

  const title = (await searchParams.title) ?? booking.activity.title;
  const dateText = formatDate(booking.date);

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
          maxWidth: 700,
          width: "100%",
          border: "2px solid #9C8173",
          borderRadius: 8,
          padding: 24,
          background: "#fff",
        }}
      >
        <h1
          data-cy="confirmation-title"
          style={{ textAlign: "center", marginTop: 0 }}
        >
          Yay! Du är bokad på {title} den {dateText} – välkommen!
        </h1>
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
