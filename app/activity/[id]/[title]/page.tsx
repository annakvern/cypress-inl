import { db } from "@/prisma/db";
import Image from "next/image";

interface Props {
  params: { id: string; title: string };
}

export default async function ActivityPage({ params }: Props) {
  const { id, title } = params;
  if (!id) {
    return <h1>Produkten hittades inte</h1>;
  }
  const decodedTitle = decodeURIComponent(title);

  const activity = await db.activity.findUnique({
    where: { id: id },
  });

  if (!activity) {
    return <h1>Aktiviteten hittades inte</h1>;
  }

  return (
    <div
      style={{
        flex: "1",
        display: "flex",
        justifyContent: "center",
        alignItems: "flexStart",
        position: "relative",
        overflow: "visible",
        marginTop: 20,
      }}
    >
      <div
        style={{
          padding: 80,
          backgroundColor: "#dddddd",
          border: "2px solid #c7c7c7",
          borderRadius: "0.5rem",
          margin: "2rem 0",
          width: "70%",
          justifyContent: "center",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 20,
        }}
      >
        <div
          style={{
            width: "70%",
            maxWidth: 400,
          }}
        >
          <Image
            src={activity.img.replace("public/", "/")}
            alt={activity.title}
            width={300}
            height={400}
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <div
          style={{
            flex: 1,
            maxWidth: "500px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "left",
          }}
        >
          <h1 style={{ fontSize: 40 }}>{activity.title}</h1>

          <p style={{ marginTop: 20 }}>{activity.description}</p>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              marginTop: 20,
            }}
          >
            {/* <AddToCartButton product={product} data-cy="product-buy-button" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
