import { db } from "@/prisma/db";
import Link from "next/link";
import ActivityCard from "./activity/[id]/[title]/activity-card";
import { createCustomerAndRedirect } from "@/app/(shared)/actions";

export default async function Home() {
  const activities = await db.activity.findMany();
  console.log("activities.length =", activities.length);

  const currentCustomers = await db.customer.findMany();
  const formatDateSE = (d: Date | string) =>
    new Intl.DateTimeFormat("sv-SE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d instanceof Date ? d : new Date(d));

  return (
    <main>
      <div>
        <ul>
          {currentCustomers.map((c) => (
            <li key={c.id}>
              <p>{c.name}</p>
              <p>{c.email}</p>
              <p>Bokning: {formatDateSE(c.date)}</p>
            </li>
          ))}
        </ul>
        <h1
          style={{
            fontFamily: "sans-serif",
            margin: "auto",
            textAlign: "center",
            marginTop: 20,
            fontSize: 30,
          }}
        >
          Boka aktivitet
        </h1>
        <div
          style={{
            width: 1200,
            margin: "auto",
            marginTop: 50,
            display: "flex",
            gap: 50,
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
                  action={createCustomerAndRedirect}
                />
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
