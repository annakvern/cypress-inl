import { db } from "@/prisma/db";
import Link from "next/link";
import ActivityCard from "./activity/[id]/[title]/activity-card";
import { createBookingAndRedirect } from "@/app/(shared)/actions";

export default async function Home() {
  const activities = await db.activity.findMany();
  console.log("activities.length =", activities.length);

  //const currentCustomers = await db.customer.findMany();
  const formattedDate = (date: Date | string) =>
    new Intl.DateTimeFormat("sv-SE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date instanceof Date ? date : new Date(date));

  return (
    <main>
      <div>
        {/* <ul>
          {currentCustomers.map((customer) => (
            <li key={customer.id}>
              <p>{customer.name}</p>
              <p>{customer.email}</p>
              <p>Bokning: {formattedDate(customer.date)}</p>
            </li>
          ))}
        </ul> */}
        <h1
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
      </div>
    </main>
  );
}
