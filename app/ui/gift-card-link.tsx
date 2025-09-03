"use client";
import Link from "next/link";

export default function GiftCardLink({
  activityId,
  activityTitle,
}: {
  activityId?: string;
  activityTitle?: string;
}) {
  const href =
    activityId && activityTitle
      ? `/giftcard/new/${activityId}/${encodeURIComponent(activityTitle)}`
      : `/giftcard/new`; // fallback when you don’t have an activity yet

  return (
    <Link
      href={href}
      style={{
        textDecoration: "underline",
        display: "inline-block",
        marginTop: 8,
      }}
    >
      Inte bestämt datum? <strong>Köp presentkort istället!</strong>
    </Link>
  );
}
