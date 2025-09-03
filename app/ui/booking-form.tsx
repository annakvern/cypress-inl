"use client";
import React, { useState } from "react";
import GiftCardLink from "./gift-card-link";

type FormProps = {
  activityId: string;
  activityTitle: string;
  action: (formData: FormData) => Promise<void>;
};

export default function Form({ activityId, activityTitle, action }: FormProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <form
      action={action}
      aria-label="Bokningsformulär"
      style={{ padding: 4, margin: "auto" }}
    >
      <input type="hidden" name="activityId" value={activityId} />
      <input type="hidden" name="title" value={activityTitle} />

      <div
        style={{
          padding: 8,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <label htmlFor="date-input" style={{ fontFamily: "sans-serif" }}>
          Välj datum:
          <input
            id="date-input"
            type="date"
            name="date"
            required
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              border: "solid 1px gray",
              padding: 8,
              width: "100%",
              borderRadius: 5,
            }}
          />
        </label>

        {selectedDate && (
          <div>
            Valt datum:
            {new Intl.DateTimeFormat("sv-SE", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }).format(new Date(selectedDate))}
          </div>
        )}

        <label htmlFor="name-input" style={{ fontFamily: "sans-serif" }}>
          Namn:
        </label>
        <input
          id="name-input"
          name="name"
          type="text"
          required
          pattern="^[A-ZÅÄÖ][a-zA-ZÅÄÖåäö'’\- ]*$"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            border: "solid 1px gray",
            padding: 8,
            width: "100%",
            borderRadius: 5,
          }}
        />

        <label htmlFor="email-input" style={{ fontFamily: "sans-serif" }}>
          Email:
        </label>
        <input
          id="email-input"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            border: "solid 1px gray",
            padding: 8,
            width: "100%",
            borderRadius: 5,
          }}
        />
      </div>

      <button
        type="submit"
        style={{
          backgroundColor: "teal",
          border: "none",
          borderRadius: 5,
          padding: 8,
          color: "white",
          marginLeft: 8,
          marginTop: 8,
        }}
      >
        Fullför bokning
      </button>
      <GiftCardLink activityId={activityId} activityTitle={activityTitle} />
    </form>
  );
}
