"use client";
import type { Activity } from "@/generated/prisma";
import Form from "@/app/ui/booking-form";
import { useState } from "react";

type ActivityCardProps = {
  activity: Activity;
};

export default function ActivityCard({ activity }: ActivityCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

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
        <button
          style={{
            backgroundColor: "teal",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: 4,
            cursor: "pointer",
            marginTop: 20,
          }}
          onClick={handleOnClick}
        >
          Boka
        </button>
      </div>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: 20,
              borderRadius: 8,
              width: 400,
              position: "relative",
            }}
          >
            <button
              onClick={handleClose}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "transparent",
                border: "none",
                fontSize: 18,
                cursor: "pointer",
              }}
            >
              ✖
            </button>
            <h3 style={{ fontFamily: "sans-serif", marginLeft: 8 }}>
              Boka {activity.title}
            </h3>
            <Form onSuccess={() => handleClose()} />
          </div>
        </div>
      )}
    </div>
  );
}
