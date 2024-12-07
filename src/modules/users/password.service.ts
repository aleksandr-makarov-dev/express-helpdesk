import bcrypt from "bcrypt";

const SALT_ROUNDS: number = 10;

async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export const passwordService = {
  hashPassword,
  verifyPassword,
};
