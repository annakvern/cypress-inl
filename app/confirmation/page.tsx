// app/confirmation/page.tsx  (Server Component)
import Link from "next/link";

function formatSE(dateStr?: string) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, (m ?? 1) - 1, d ?? 1);
  return new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function ConfirmationPage({
  searchParams,
}: {
  searchParams: { title?: string; date?: string };
}) {
  const title = searchParams.title ?? "aktiviteten";
  const formattedDate = formatSE(searchParams.date);

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
        <h1 style={{ textAlign: "center", marginTop: 0 }}>
          Yay! Du är bokad på {title}
          {formattedDate ? ` den ${formattedDate}` : ""} – välkommen!
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
