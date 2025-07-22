import { prisma } from "../../../database/connection";

export async function checkUserExist(login: string, name: string) {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ login }, { name }],
    },
  });

  return user;
}
