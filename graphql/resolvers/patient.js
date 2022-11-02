const User = require("../../models/User");
const JWT = require("../../helpers/jwt");
const bcrypt = require("bcryptjs");
const { ApolloError } = require("apollo-server-express");

module.exports = {
    Mutation: {
        async createPatient(_, { input }) {
            // Check if email already exists
            const emailExists = await User.Patient.findOne({
                email: input.email,
            });
            if (emailExists) {
                throw new ApolloError("Email already exists!", "EMAIL_EXISTS");
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(input.password, salt);


            const newRecord = new User.Patient({
                ...input, password: hashedPassword,
            });
            const response = await newRecord.save();
            console.log(response);

            const token = await JWT.issueJwt("response._id", "5m");

            // Save token to User.Auth 
            const newAuth = new User.Auth({
                token: token,
                user: response._id,
                accountType: "PATIENT"
            });
            await newAuth.save();

            return {
                id: response._id,
                ...response._doc,
                token
            };
        },

        async loginPatient(_, { input }) {
            const { email, password } = input;

            const patient = await User.Patient.findOne({ email });
            if (!patient) {
                throw new ApolloError("Email does not exist!", "EMAIL_NOT_FOUND");
            }

            const isMatch = await bcrypt.compare(password, patient.password);
            if (!isMatch) {
                throw new ApolloError("Invalid password!", "INVALID_PASSWORD");
            }
            
            const token = await JWT.issueJwt(patient._id.toString(), "5m");

            // Save token to User.Auth 
            const newAuth = new User.Auth({
                token: token,
                user: patient._id,
                accountType: "PATIENT"
            });
            await newAuth.save();

            return {
                id: patient._id,
                ...patient._doc,
                token
            };
        }
    },
    Query: {
        async viewPatient(_, { id }) {
            record = await User.Patient.findById(id);
            return record;
        },
        async listPatient(_, { }, context) {
            records = await User.Patient.find();
            return records;
        },
    },
};