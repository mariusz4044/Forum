import { Prisma, Ban } from "@prisma/client";

export default (bans: Ban[]): Ban => {
  const activeBans: Ban[] = bans.filter((b) => {
    const endTimeDate = new Date(b.endTime);
    const now = new Date();
    return endTimeDate > now;
  });

  //get only first active ban.
  return activeBans[0];
};
