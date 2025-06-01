import { hashPassword, comparePassword } from '../passwordUtils.js';

const newPassword = "P@ssw0rd123";
const hashedPassword = await hashPassword(newPassword);
console.log("Hashed Password:", hashedPassword);

const isMatch = await comparePassword(newPassword, hashedPassword);
console.log("Password Match:", isMatch ? "✅" : "❌");

const wrongPassword = "WrongPassword123";
const isWrongMatch = await comparePassword(wrongPassword, hashedPassword);
console.log("Wrong Password Match:", isWrongMatch ? "✅" : "❌");

console.log("Test completed successfully.");
