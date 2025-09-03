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
      : `/giftcard/new`;

  return (
    <Link
      href={href}
      style={{
        textDecoration: "underline",
        display: "inline-block",
        marginTop: 12,
        fontSize: 12,
        color: "#363433",
        paddingLeft: 5,
      }}
    >
      Inte bestämt datum? <strong>Köp presentkort istället!</strong>
    </Link>
  );
}
