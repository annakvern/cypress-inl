// app/actions.ts
"use server";

import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCustomerAndRedirect(formData: FormData) {
  const name = String(formData.get("name") || "");
  const email = String(formData.get("email") || "");
  const dateStr = String(formData.get("date") || "");
  const title = String(formData.get("title") || "aktiviteten");

  const when = dateStr ? new Date(dateStr) : new Date();

  const updated = await db.customer.updateMany({
    where: { email },
    data: { name, date: when },
  });
  if (updated.count === 0) {
    await db.customer.create({ data: { name, email, date: when } });
  }

  revalidatePath("/"); // update homepage list
  redirect(
    `/confirmation?title=${encodeURIComponent(title)}&date=${encodeURIComponent(
      dateStr
    )}`
  );
}
