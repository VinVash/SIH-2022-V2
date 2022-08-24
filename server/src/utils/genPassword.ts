const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const specialChars = "!@#$%^&*()";
const passwordLength = 8;

export function genPassword() {
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    // Add a special character to the password
    const randomSpecialChar = Math.floor(Math.random() * specialChars.length);
    password += specialChars.substring(randomSpecialChar, randomSpecialChar + 1);
    return password;
}