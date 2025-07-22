import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "../database/connection";

export default () => {
  return session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 72,
    },
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
    name: "sessionId",
  });
};
