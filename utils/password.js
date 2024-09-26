const bcrypt = require("bcrypt");

const hashPassword =  async (password) => {
    const hashPassword = await bcrypt.hash(password,10);
    return hashPassword
}

const comparePassword = async (password, hashedPassword) => {
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  return isPasswordValid;
};

module.exports = {
    hashPassword,
    comparePassword
}