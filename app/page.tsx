import { db } from "@/prisma/db";
import Link from "next/link";
import ActivityCard from "./activity/[id]/[title]/activity-card";
import { createBookingAndRedirect } from "@/app/(shared)/actions";
import GiftCardLink from "./ui/gift-card-link";

export default async function Home() {
  const activities = await db.activity.findMany();

  return (
    <main>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          data-cy="page-title"
          style={{
            fontFamily: "sans-serif",
            margin: "auto",
            textAlign: "center",
            marginTop: 50,
            marginBottom: 50,
            fontSize: 30,
          }}
        >
          Boka aktivitet
        </h1>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: 50,
            marginBottom: 50,
          }}
        >
          {activities.length === 0 ? (
            <p>Inga aktiviteter ännu.</p>
          ) : (
            activities.map((activity) => (
              <Link
                key={activity.id}
                href={`/activity/${activity.id}/${encodeURIComponent(
                  activity.title
                )}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ActivityCard
                  activity={activity}
                  action={createBookingAndRedirect}
                />
              </Link>
            ))
          )}
        </div>
        <GiftCardLink />
      </div>
    </main>
  );
}
