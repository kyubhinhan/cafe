import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function checkEmailExist(email: string) {
  const existEmail = await prisma.user.findUnique({ where: { email } });
  return existEmail ? true : false;
}

function checkMasterEmail(email: string) {
  return email == "master@gmail.com";
}

export { checkEmailExist, checkMasterEmail };
