import { Activity } from "@/generated/prisma";
import { db } from "../db";

export async function seedActivities() {
  const mockedActivities: Activity[] = [
    {
      id: "68adb30b0c2c50f13d0a64e7",
      title: "Nattfotografering",
      description: "Lär dig ta bilder i mörker.",
      img: "https://images.pexels.com/photos/93820/pexels-photo-93820.jpeg",
    },
    {
      id: "68adb30b0c2c50f13d0a64e6",
      title: "Skogsnattvandring",
      description: "Vi vandrar i skogen om natten",
      img: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg",
    },
    {
      id: "68adb30b0c2c50f13d0a64e5",
      title: "Nattdopp",
      description: "Följ med på nattdopp i tjärnen",
      img: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
    },
    {
      id: "68adb30b0c2c50f13d0a64e4",
      title: "Nattrejv i skogen",
      description: "Vi dukar upp till ett galet rejv.",
      img: "https://images.pexels.com/photos/2078008/pexels-photo-2078008.jpeg",
    },
  ];

  for (const { id, ...activity } of mockedActivities) {
    await db.activity.upsert({
      where: { id },
      update: activity,
      create: { id, ...activity },
    });
  }
}
