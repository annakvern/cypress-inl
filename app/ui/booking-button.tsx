"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Form from "@/app/ui/booking-form";

type BookingButtonProps = {
  activityTitle: string;
  label?: string;
  onBooked?: () => void;
};

export default function BookingButton({
  activityTitle,
  label = "Boka",
  onBooked,
}: BookingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          open();
        }}
        style={{
          backgroundColor: "teal",
          color: "white",
          border: "none",
          padding: "10px 16px",
          borderRadius: 4,
          cursor: "pointer",
          marginTop: 20,
        }}
      >
        {label}
      </button>

      {isOpen &&
        createPortal(
          <div
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) close();
            }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-title"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "white",
                padding: 20,
                borderRadius: 8,
                width: 400,
                position: "relative",
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  close();
                }}
                aria-label="Stäng"
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

              <h3
                id="booking-title"
                style={{ fontFamily: "sans-serif", marginLeft: 8 }}
              >
                Boka {activityTitle}
              </h3>

              <Form
                onSuccess={() => {
                  onBooked?.();
                  close();
                }}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
