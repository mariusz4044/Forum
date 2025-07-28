import { prisma } from "../../../database/connection";
import { AppError } from "../../../utils/AppError";
import { UserData } from "../../../types/types";

export async function checkUserExist(
  login: string,
  name: string,
): Promise<UserData | boolean> {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ login }, { name }],
    },
  });

  if (!user) {
    return false;
  }

  return user;
}
