import { db } from "@/prisma/db";
import TodoList from "./ui/todo-list";
import Card from "./ui/activity-card";

interface CardData {
  img: string;
  cardTitle: string;
  cardContent: string;
}

export default async function Home() {
  const cards: CardData[] = [
    {
      img: "https://images.pexels.com/photos/93820/pexels-photo-93820.jpeg",
      cardTitle: "Nattfotografering",
      cardContent: "Lär dig ta bilder i mörker.",
    },
    {
      img: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg",
      cardTitle: "Skogsnattvandring",
      cardContent: "Vi vandrar i skogen om natten",
    },
    {
      img: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
      cardTitle: "Nattdopp",
      cardContent: "Följ med på nattdopp i tjärnen",
    },
    {
      img: "https://images.pexels.com/photos/2078008/pexels-photo-2078008.jpeg",
      cardTitle: "Nattrejv i skogen",
      cardContent: "Vi dukar upp till ett galet rejv",
    },
  ];

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
          {cards.map((card, index) => (
            <Card
              key={index}
              img={card.img}
              cardTitle={card.cardTitle}
              cardContent={card.cardContent}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
