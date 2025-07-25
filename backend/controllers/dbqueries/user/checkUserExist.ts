import { prisma } from "../../../database/connection";
import { AppError } from "../../../utils/AppError";
import { UserData } from "../../../types/types";

export async function checkUserExist(
  req: Request,
  res: Response,
): Promise<UserData | AppError> {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ login }, { name }],
    },
  });

  if (!user) {
    throw new AppError("Can't find user data!");
  }

  return await res.send(200).json({
    id: user.id,
    name: user.name,
    role: user.role,
    points: user.points,
  });
}
