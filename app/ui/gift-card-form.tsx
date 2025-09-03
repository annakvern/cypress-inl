"use client";
import { useState } from "react";
import { createGiftCardAndRedirect } from "@/app/(shared)/actions";

type ActivityOpt = { id: string; title: string };

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

  return (
    <form
      action={createGiftCardAndRedirect}
      style={{ display: "grid", gap: 12 }}
    >
      <div>
        <label>Från</label>
        <input
          name="fromName"
          required
          value={fromName}
          onChange={(e) => setFromName(e.target.value)}
          style={{
            border: "solid 1px gray",
            padding: 8,
            width: "100%",
            borderRadius: 5,
          }}
        />
      </div>
      <div>
        <label>Till</label>
        <input
          name="toName"
          required
          value={toName}
          onChange={(e) => setToName(e.target.value)}
          style={{
            border: "solid 1px gray",
            padding: 8,
            width: "100%",
            borderRadius: 5,
          }}
        />
      </div>
      <div>
        <label>Din e-post (kvitto)</label>
        <input
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
      <div>
        <label>Hälsning</label>
        <textarea
          name="message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            border: "solid 1px gray",
            padding: 8,
            width: "100%",
            borderRadius: 5,
          }}
        />
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

      {/* Hidden fields submitted to the server action */}
      <input type="hidden" name="activityId" value={activityId} />
      <input type="hidden" name="activityTitle" value={activityTitle} />

      <button
        type="submit"
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
        Köp
      </button>
    </form>
  );
}
