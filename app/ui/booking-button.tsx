"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom"; // a ChatGPT tip to use...
import Form from "@/app/ui/booking-form";

interface BookingButtonProps {
  activityId: string;
  activityTitle: string;
  action: (formData: FormData) => Promise<void>;
  label?: string;
}

export default function BookingButton({
  activityId,
  activityTitle,
  action,
  label = "Boka",
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
        data-cy="open-booking"
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
            data-cy="booking-modal"
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
                data-cy="booking-title"
                style={{
                  fontFamily: "sans-serif",
                  marginLeft: 8,
                  fontSize: 20,
                }}
              >
                Boka {activityTitle}
              </h3>

              <Form
                activityId={activityId}
                activityTitle={activityTitle}
                action={action}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
