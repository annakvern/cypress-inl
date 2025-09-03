"use client";
import type { Activity } from "@/generated/prisma";
import BookingButton from "@/app/ui/booking-button";
import GiftCardLink from "@/app/ui/gift-card-link";

type ActivityCardProps = {
  activity: Activity;
  action: (formData: FormData) => Promise<void>;
};

export default function ActivityCard({ activity, action }: ActivityCardProps) {
  return (
    <div
      style={{
        border: "2px solid #9C8173",
        borderRadius: 8,
        overflow: "hidden",
        width: 320,
        padding: 10,
      }}
    >
      <img
        src={activity.img}
        alt={activity.title}
        style={{
          width: "100%",
          height: 180,
          objectFit: "cover",
          display: "block",
        }}
      />
      <div style={{ padding: 12 }}>
        <h2 style={{ margin: 0, fontWeight: 600, fontFamily: "sans-serif" }}>
          {activity.title}
        </h2>
        <p style={{ marginTop: 8 }}>{activity.description}</p>
        <BookingButton
          activityId={activity.id}
          activityTitle={activity.title}
          action={action}
        />
      </div>
    </div>
  );
}
