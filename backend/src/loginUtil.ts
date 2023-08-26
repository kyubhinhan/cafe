import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function checkDuplicateEmail(email: string) {
  const duplicatedEmail = await prisma.user.findUnique({ where: { email } });
  return duplicatedEmail ? true : false;
}

function checkMasterEmail(email: string) {
  return email == "master@gmail.com";
}

export { checkDuplicateEmail, checkMasterEmail };
