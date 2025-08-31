import { Customer } from "@/generated/prisma";
import { db } from "../db";

export async function seedCustomers() {
  const mockedCustomers: Customer[] = [
    {
      id: "68adb30b0c2c50f13d0a64e9",
      date: new Date(),
      name: "Lisa Carpenter",
      email: "lisa@carpenter.se",
    },
    {
      id: "68adb30b0c2c50f13d0a64ea",
      date: new Date(),
      name: "Kalle Kuling",
      email: "kalle@kuling.se",
    },
  ];

  for (const { id, ...customer } of mockedCustomers) {
    await db.customer.upsert({
      where: { id },
      update: customer,
      create: { id, ...customer },
    });
  }
}
