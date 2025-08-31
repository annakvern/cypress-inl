import { db } from "../db";
import { seedCustomers } from "./customer";

async function main() {
  await seedCustomers();
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
