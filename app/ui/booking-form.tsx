"use client";
import React, { useState } from "react";

export interface FormValues {
  date: string;
  name: string;
  email: string;
}

export interface FormProps {
  onSuccess?: (values: FormValues) => void;
}

export default function Form({ onSuccess }: FormProps) {
  const [selectedDate, setSelectedDate] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const formatDate = (dateString: string) => {
    console.log("I formatDate");
    if (!dateString) return "";
    const [y, m, d] = dateString.split("-").map(Number);
    const date = new Date(y, (m ?? 1) - 1, d ?? 1);
    return new Intl.DateTimeFormat("sv-SE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const nameRegex = /^[A-ZÅÄÖ][a-zA-ZÅÄÖåäö'’\- ]*$/;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

  const validate = () => {
    const inputErrors: { name?: string; email?: string } = {};
    if (!nameRegex.test(name)) {
      inputErrors.name = "Namnet måste börja med en versal.";
    }
    if (!emailRegex.test(email)) {
      inputErrors.email = "Ogiltig e-postadress.";
    }
    setErrors(inputErrors);
    return Object.keys(inputErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSuccess?.({ name, email, date: selectedDate });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding: 4, margin: "auto" }}
      aria-label="Bokningsformulär"
    >
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
            value={selectedDate}
            onChange={(e) => {
              console.log("onChange:", e.target.value);
              setSelectedDate(e.target.value);
            }}
            style={{
              border: "solid 1px gray",
              padding: 8,
              width: "100%",
              borderRadius: 5,
            }}
          />
        </label>
        {selectedDate && <div>Valt datum: {formatDate(selectedDate)}</div>}
        <label htmlFor="name-input" style={{ fontFamily: "sans-serif" }}>
          Namn:
        </label>
        <input
          id="name-input"
          type="text"
          style={{
            border: "solid 1px gray",
            padding: 8,
            width: "100%",
            borderRadius: 5,
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {errors.name && (
          <div
            id="name-error"
            role="alert"
            style={{ color: "red", marginTop: 4 }}
          >
            {errors.name}
          </div>
        )}
      </div>

      <div style={{ padding: 8 }}>
        <label htmlFor="email-input" style={{ fontFamily: "sans-serif" }}>
          Email:
        </label>
        <input
          id="email-input"
          style={{
            border: "solid 1px gray",
            padding: 8,
            width: "100%",
            borderRadius: 5,
          }}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && (
          <div
            id="email-error"
            role="alert"
            style={{ color: "red", marginTop: 4 }}
          >
            {errors.email}
          </div>
        )}
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
    </form>
  );
}
