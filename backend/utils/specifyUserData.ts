import { UserData } from "../types/types";
import { User } from "@prisma/client";

export default (userData: User): UserData => {
  return {
    id: userData.id,
    avatar: userData.avatar,
    name: userData.name,
    role: userData.role,
    points: userData.points,
  };
};
