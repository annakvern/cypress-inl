import { db } from "@/prisma/db";
import GiftCardForm from "@/app/ui/gift-card-form";
import GoBackButton from "@/app/ui/go-back-button";

export default async function NewGiftCardPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;
  const [activityId, rawTitle] = slug;

  if (!activityId) {
    const activities = await db.activity.findMany({
      select: { id: true, title: true },
      orderBy: { title: "asc" },
    });
    return (
      <main
        style={{
          padding: "2rem 1rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <GoBackButton />
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
            style={{
              marginTop: 0,
              marginBottom: 20,
              fontFamily: "sans-serif",
              fontSize: 24,
              fontStyle: "bold",
            }}
          >
            Köp presentkort
          </h1>
          <GiftCardForm
            initialActivityId=""
            initialActivityTitle="Valfri aktivitet"
            activities={activities}
          />
        </div>
      </main>
    );
  }

  const activity = await db.activity.findUnique({ where: { id: activityId } });
  const activityTitle = rawTitle
    ? decodeURIComponent(rawTitle)
    : activity?.title ?? "Valfri aktivitet";

  return (
    <main
      style={{
        padding: "2rem 1rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <GoBackButton />
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
          style={{
            marginTop: 0,
            marginBottom: 20,
            fontFamily: "sans-serif",
            fontSize: 24,
            fontStyle: "bold",
          }}
        >
          Köp presentkort
        </h1>
        <GiftCardForm
          initialActivityId={activity?.id ?? ""}
          initialActivityTitle={activityTitle}
          activities={[]}
        />
      </div>
    </main>
  );
}
