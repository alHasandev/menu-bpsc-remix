import type { Item, Category } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Item } from "@prisma/client";

export type ItemWithCategory = Item & { category: Category };

export function getItem({ id }: Pick<Item, "id">) {
  return prisma.item.findFirst({
    include: {
      category: true,
    },
    where: { id },
  });
}

export function getItems() {
  return prisma.item.findMany({
    include: {
      category: true,
    },
  });
}

export function createItem({
  name,
  purchase,
  price,
  stock,
  categoryId,
}: Pick<Item, "name" | "purchase" | "price" | "stock"> & {
  categoryId: Category["id"];
}) {
  return prisma.item.create({
    data: {
      name,
      purchase,
      price,
      stock,
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
  });
}

export function updateItem({
  id,
  name,
  purchase,
  price,
  stock,
  categoryId,
}: Partial<
  Pick<Item, "name" | "purchase" | "price" | "stock"> & {
    categoryId: Category["id"];
  }
> &
  Pick<Item, "id">) {
  return prisma.item.update({
    where: {
      id,
    },
    data: {
      name,
      purchase,
      price,
      stock,
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
  });
}

export function deleteItem({ id }: Pick<Item, "id">) {
  return prisma.item.deleteMany({
    where: { id },
  });
}
