import { Request, Response } from "express";
import { createBanQuery } from "../../controllers/dbqueries/admin/createBanQuery";
import { updateUniqueUser } from "../../controllers/dbqueries/user/updateUniqueUser";

export async function banUser(req: Request, res: Response) {
  const { userId, reason, banLength } = req.body;

  const dateNow = new Date();
  const endTime = new Date(dateNow.getTime() + parseInt(banLength) * 60 * 1000);

  await createBanQuery({
    data: {
      reason,
      endTime,
      bannedUserId: +userId,
      bannedById: req.user!.id,
    },
  });

  await updateUniqueUser({
    where: { id: +userId },
    data: {
      sessions: {
        deleteMany: {},
      },
    },
  });

  res.status(200).send({
    message: `User id=${userId} has been banned!`,
  });
}
