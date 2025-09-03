"use server";

import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBookingAndRedirect(formData: FormData) {
  const name = String(formData.get("name") || "");
  const email = String(formData.get("email") || "");
  const dateStr = String(formData.get("date") || "");
  const activityId = String(formData.get("activityId") || "");
  const title = String(formData.get("title") || "aktiviteten");

  if (!name || !email || !dateStr || !activityId) {
    redirect("/?error=missing_fields");
  }

  const when = new Date(dateStr);

  // 1) Ensure customer exists (email is unique in your schema)
  const customer = await db.customer.upsert({
    where: { email },
    update: { name, date: when },
    create: { name, email, date: when },
  });

  // 2) Create booking that links customer + activity + date
  const booking = await db.booking.create({
    data: {
      date: when,
      activityId, // ObjectId string
      customerId: customer.id,
    },
    select: { id: true },
  });

  // 3) Revalidate pages that list customers/bookings
  revalidatePath("/");

  // 4) Redirect to a booking-specific confirmation page
  redirect(`/confirmation/${booking.id}?title=${encodeURIComponent(title)}`);
}

export async function createGiftCardAndRedirect(formData: FormData) {
  const fromName = String(formData.get("fromName") || "");
  const toName = String(formData.get("toName") || "");
  const message = String(formData.get("message") || "");
  const email = String(formData.get("email") || "");
  const activityId = String(formData.get("activityId") || ""); // optional
  const activityTitle = String(
    formData.get("activityTitle") || "Valfri aktivitet"
  );

  if (!fromName || !toName || !email) redirect("/?error=missing_fields");

  const gift = await db.giftCard.create({
    data: {
      fromName,
      toName,
      purchaserEmail: email,
      message: message || null,
      activityId: activityId || null,
    },
    select: { id: true, code: true },
  });

  revalidatePath("/");
  redirect(
    `/giftcard/${gift.id}?code=${encodeURIComponent(
      gift.code
    )}&title=${encodeURIComponent(activityTitle)}`
  );
}
