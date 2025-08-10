import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: [
    { level: "query", emit: "event" },
    { level: "info", emit: "stdout" },
    { level: "warn", emit: "stdout" },
    { level: "error", emit: "stdout" },
  ],
});

// prisma.$on("query", (e) => {
//   console.log(`→ QUERY: ${e.query} |  ${e.duration}ms`);
//   console.log(`→ PARAMS: ${e.params}`);
// });
