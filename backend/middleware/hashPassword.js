// @ts-ignore
// eslint-disable-next-line

import bcrypt from 'bcrypt';

// Middleware function for hashing the password
export function hashPassword(next) {
  if (!this.isModified('password')) {
    return next(); // Skip hashing if the password is not modified
  }

  bcrypt
    .hash(this.password, 12)
    .then((hashedPassword) => {
      this.password = hashedPassword; // Update the password to the hashed version
      next();
    })
    .catch((error) => {
      next(error); // Pass error to the next middleware in case of an error
    });
}
