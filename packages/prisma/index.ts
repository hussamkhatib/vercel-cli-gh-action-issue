import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.USE_LOCAL_DATABASE === "1") {
  console.log("Using local database setup");
  prisma = globalThis.prisma || new PrismaClient();
  globalThis.prisma = prisma;
} else {
  console.log("Using Neon database setup");
  neonConfig.webSocketConstructor = ws;
  const connectionString = process.env.DATABASE_URL;
  console.log({
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_DATABASE_URL: process.env?.NEXT_PUBLIC_DATABASE_URL,
  });

  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);
  prisma = new PrismaClient({ adapter });
}

export default prisma;
