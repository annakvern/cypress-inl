"use client";
import type { Activity } from "@/generated/prisma";
import BookingButton from "@/app/ui/booking-button";

type ActivityCardProps = {
  activity: Activity;
};

export default function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <div
      style={{
        border: "1px solid gray",
        borderRadius: 8,
        overflow: "hidden",
        width: 320,
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
        <BookingButton activityTitle={activity.title} />
      </div>
    </div>
  );
}
