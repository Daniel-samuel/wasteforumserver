const User = require("../../models/User");
const JWT = require("../../helpers/jwt");
const bcrypt = require("bcryptjs");
const { ApolloError } = require("apollo-server-express");

module.exports = {
    Mutation: {
        async createHospitalAdminLogin (_, { input }) {
            const { email, password } = input;
            // Check if email already exists
            const adminlogin = await User.HospitalAdmin.findOne({email})
                if(!adminlogin) {
                    throw new ApolloError("Email already exists!", "EMAIL_EXISTS");
                }
                const isMatch = await bcrypt.compare(password, adminlogin.password);
                if (!isMatch) {
                    throw new ApolloError("Invalid password!", "INVALID_PASSWORD");
                }
                const token = await JWT.issueJwt(adminlogin._id.toString(), "5m");
                // Save token to User.Auth
                const newAuth = new User.Auth({
                    token: token,
                    User: adminlogin._id,
                })
                await newAuth.save();
                return {
                    id: adminlogin._id,
                    ...adminlogin._doc,
                    token
                }

            }
        }
    }


