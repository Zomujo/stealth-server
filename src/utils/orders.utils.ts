import { randomBytes } from 'crypto';

export function generateOrderNumber(): string {
  const randomNumber = randomBytes(6).toString('hex').toUpperCase(); // Generate 3 random bytes and convert to hex (6 digits)
  return `ORD-${randomNumber}`;
}
