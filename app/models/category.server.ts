import type { Category } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Category } from "@prisma/client";

export function getCategory({ id }: Pick<Category, "id">) {
  return prisma.category.findFirst({
    where: { id },
  });
}

export function getCategories() {
  return prisma.category.findMany();
}

export function createCategory({ name }: Pick<Category, "name">) {
  return prisma.category.create({
    data: {
      name,
    },
  });
}

export function updateCategory({
  id,
  name,
}: Partial<Pick<Category, "name">> & Pick<Category, "id">) {
  return prisma.category.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
}

export function deleteCategory({ id }: Pick<Category, "id">) {
  return prisma.category.deleteMany({
    where: { id },
  });
}
