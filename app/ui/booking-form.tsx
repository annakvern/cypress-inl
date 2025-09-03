"use client";
import React, { useMemo, useState } from "react";
import GiftCardLink from "./gift-card-link";

type FormProps = {
  activityId: string;
  activityTitle: string;
  action: (formData: FormData) => Promise<void>;
};

const todayYMD = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export default function Form({ activityId, activityTitle, action }: FormProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [touched, setTouched] = useState<{
    date?: boolean;
    name?: boolean;
    email?: boolean;
  }>({});

  const namePattern = /^[A-Za-zÅÄÖåäö'’\- ]{2,}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const today = todayYMD();

  const dateValid = selectedDate !== "" && selectedDate >= today;
  const nameValid = namePattern.test(name.trim());
  const emailValid = emailPattern.test(email.trim());

  const canSubmit = useMemo(
    () => dateValid && nameValid && emailValid,
    [dateValid, nameValid, emailValid]
  );

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
            min={today}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, date: true }))}
            aria-invalid={touched.date && !dateValid}
            style={{
              border: "solid 1px gray",
              padding: 8,
              width: "100%",
              borderRadius: 5,
            }}
          />
        </label>
        {touched.date && !dateValid && (
          <small style={{ color: "crimson" }}>
            Välj ett datum i dag eller senare.
          </small>
        )}

        {selectedDate && (
          <div>
            Valt datum:{" "}
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
          minLength={2}
          maxLength={60}
          pattern={namePattern.source}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          aria-invalid={touched.name && !nameValid}
          autoComplete="name"
          style={{
            border: "solid 1px gray",
            padding: 8,
            width: "100%",
            borderRadius: 5,
          }}
        />
        {touched.name && !nameValid && (
          <small style={{ color: "crimson" }}>
            Skriv minst 2 tecken (bokstäver, mellanslag, bindestreck).
          </small>
        )}

        <label htmlFor="email-input" style={{ fontFamily: "sans-serif" }}>
          Email:
        </label>
        <input
          id="email-input"
          name="email"
          type="email"
          required
          maxLength={120}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          aria-invalid={touched.email && !emailValid}
          autoComplete="email"
          style={{
            border: "solid 1px gray",
            padding: 8,
            width: "100%",
            borderRadius: 5,
          }}
        />
        {touched.email && !emailValid && (
          <small style={{ color: "crimson" }}>
            Ange en giltig e-postadress.
          </small>
        )}
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        style={{
          backgroundColor: "teal",
          border: "none",
          borderRadius: 5,
          padding: 8,
          color: "white",
          marginLeft: 8,
          marginTop: 8,
          opacity: canSubmit ? 1 : 0.6,
          cursor: canSubmit ? "pointer" : "not-allowed",
        }}
      >
        Fullför bokning
      </button>

      <div style={{ marginTop: 8 }}>
        <GiftCardLink activityId={activityId} activityTitle={activityTitle} />
      </div>
    </form>
  );
}
