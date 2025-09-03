"use client";
import { useMemo, useState } from "react";
import { createGiftCardAndRedirect } from "@/app/(shared)/actions";

export interface ActivityOpt {
  id: string;
  title: string;
}

export default function GiftCardForm({
  initialActivityId,
  initialActivityTitle,
  activities = [],
}: {
  initialActivityId: string;
  initialActivityTitle: string;
  activities?: ActivityOpt[];
}) {
  const [activityId, setActivityId] = useState(initialActivityId);
  const [activityTitle, setActivityTitle] = useState(initialActivityTitle);

  const [fromName, setFromName] = useState("");
  const [toName, setToName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [touched, setTouched] = useState<{
    from?: boolean;
    to?: boolean;
    email?: boolean;
  }>({});

  const namePattern = /^[A-Za-zÅÄÖåäö'’\- ]{2,}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const fromValid = namePattern.test(fromName.trim());
  const toValid = namePattern.test(toName.trim());
  const emailValid = emailPattern.test(email.trim());
  const messageOK = message.length <= 300;

  const canSubmit = useMemo(
    () => fromValid && toValid && emailValid && messageOK,
    [fromValid, toValid, emailValid, messageOK]
  );

  return (
    <form
      action={createGiftCardAndRedirect}
      style={{ display: "grid", gap: 12 }}
    >
      <div>
        <label>Från</label>
        <input
          id="fromName"
          name="fromName"
          required
          minLength={2}
          maxLength={60}
          pattern={namePattern.source}
          value={fromName}
          onChange={(e) => setFromName(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, from: true }))}
          aria-invalid={touched.from && !fromValid}
          autoComplete="name"
          style={{
            border: "solid 1px gray",
            padding: 8,
            width: "100%",
            borderRadius: 5,
          }}
        />
        {touched.from && !fromValid && (
          <small style={{ color: "crimson" }}>
            Skriv minst 2 tecken (bokstäver, mellanslag, bindestreck).
          </small>
        )}
      </div>
      <div>
        <label>Till</label>
        <input
          id="toName"
          name="toName"
          required
          minLength={2}
          maxLength={60}
          pattern={namePattern.source}
          value={toName}
          onChange={(e) => setToName(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, to: true }))}
          aria-invalid={touched.to && !toValid}
          autoComplete="name"
          style={{
            border: "solid 1px gray",
            padding: 8,
            width: "100%",
            borderRadius: 5,
          }}
        />
        {touched.to && !toValid && (
          <small style={{ color: "crimson" }}>
            Skriv minst 2 tecken (bokstäver, mellanslag, bindestreck).
          </small>
        )}
      </div>
      <div>
        <label>Din e-post (kvitto)</label>
        <input
          id="email"
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
      <div>
        <label>Hälsning</label>
        <textarea
          id="message"
          name="message"
          rows={3}
          maxLength={300}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            border: "solid 1px gray",
            padding: 8,
            width: "100%",
            borderRadius: 5,
          }}
        />
        <div style={{ fontSize: 12, opacity: 0.7 }}>
          {message.length}/300 tecken
        </div>
      </div>

      {activities.length > 0 ? (
        <div>
          <label>Aktivitet</label>
          <select
            value={activityId}
            onChange={(e) => {
              const id = e.target.value;
              setActivityId(id);
              const t =
                activities.find((a) => a.id === id)?.title ??
                "Valfri aktivitet";
              setActivityTitle(t);
            }}
          >
            <option value="">Valfri aktivitet</option>
            {activities.map((a) => (
              <option key={a.id} value={a.id}>
                {a.title}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p>
          <strong>Aktivitet:</strong> {activityTitle}
        </p>
      )}

      <input type="hidden" name="activityId" value={activityId} />
      <input type="hidden" name="activityTitle" value={activityTitle} />

      <button
        type="submit"
        disabled={!canSubmit}
        style={{
          backgroundColor: "teal",
          color: "white",
          border: "none",
          padding: "10px 16px",
          borderRadius: 4,
          opacity: canSubmit ? 1 : 0.6,
          cursor: canSubmit ? "pointer" : "not-allowed",
          marginTop: 20,
        }}
      >
        Köp
      </button>
    </form>
  );
}
