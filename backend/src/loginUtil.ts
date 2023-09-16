import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function checkEmailExist(email: string) {
  const existEmail = await prisma.user.findUnique({ where: { email } });
  return existEmail ? true : false;
}

async function checkPasswordToEmail(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return false;
  return user.password === password;
}

function checkMasterEmail(email: string) {
  return email == "master@gmail.com";
}

export { checkPasswordToEmail, checkEmailExist, checkMasterEmail };
