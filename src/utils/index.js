const bcrypt = require("bcryptjs");

exports.hash = async (string) => {
    console.log("Hashing " + string);
    return await bcrypt.hash(string, 8);
}