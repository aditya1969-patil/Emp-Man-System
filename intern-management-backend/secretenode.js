const crypto = require('crypto');

const jwtSecret = crypto.randomBytes(32).toString('hex');  // Generates a random 256-bit key (32 bytes)

console.log(jwtSecret);  // Output will be a random string like "8f4e0b09f9843a6b4e530fd15a981d55ef9f74ab9dcbf058... "
