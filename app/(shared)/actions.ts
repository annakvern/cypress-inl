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
