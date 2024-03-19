import * as bcrypt from 'bcryptjs';

export function encodePassword(rawPassword: string) {
  return bcrypt.hashSync(rawPassword);
}
