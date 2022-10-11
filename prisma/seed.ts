import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { getSeedCategories, getSeedItems } from "~/utils/google/sheet";

const prisma = new PrismaClient();

async function seed() {
  const email = "admin@bpsc.bjm.id";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("adminbpsc", 10);

  await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await getSeedCategories().then((categories) => {
    return Promise.all(
      categories.map(async (category) => {
        await prisma.category.upsert({
          where: {
            id: category.id,
          },
          update: {
            name: category.name,
          },
          create: {
            id: category.id,
            name: category.name,
          },
        });
      })
    );
  });

  await getSeedItems().then((items) => {
    return Promise.all(
      items.map(async (item) => {
        await prisma.item.create({
          data: {
            id: item.id,
            name: item.name,
            purchase: Number(item.purchase),
            price: Number(item.price),
            stock: Number(item.stock),
            category: {
              connect: {
                id: item.category,
              },
            },
          },
        });
      })
    );
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
