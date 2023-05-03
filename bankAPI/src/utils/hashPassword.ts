import bcrypt from "bcrypt";

export async function encryptPassword(data: string) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data, salt);
    return hash;
  } catch (error) {
    return error;
  }
}

export async function decryptPassword(
  plainPassword: string,
  encryptedPassword: string
) {
  try {
    const match = await bcrypt.compare(plainPassword, encryptedPassword);
    return match;
  } catch (error) {
    return error;
  }
}
