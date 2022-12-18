const User = require("../../models/User");
const Utils = require("../../helpers/utils");
const bcrypt = require("bcryptjs");

module.exports = {
    Mutation: {
        async reviewHospitalRegistrationRequest(_, { input }) {
            // Find the hospital registration request
            const record = await User.HospitalRegistrationRequest.findById(input.hospitalRegistrationRequestId);

            if (record) {
                if (record.status === "APPROVED") {
                    throw new Error("Hospital registration request has already been approved");
                }

                // Update the status of the hospital registration request
                record.status = input.status;
                await record.save();

                // If the status is "APPROVED", create the hospital and hospital admin records
                if (record.status === "APPROVED") {
                    // Create the hospital record
                    const hospital = new User.Hospital({
                        name: record.hospitalSchema.name,
                        address: record.hospitalSchema.address,
                        state: record.hospitalSchema.state,
                        country: record.hospitalSchema.country,
                        contactPhone: record.hospitalSchema.contactPhone,
                        contactName: record.hospitalSchema.contactName,
                        hospitalLicence: record.hospitalSchema.hospitalLicence
                    });
                    await hospital.save();


                    // Generate a password for the hospital admin
                    const password = Utils.generatePassword();

                    // Hash the password using bcrypt
                    const saltRounds = 10;
                    const hash = await bcrypt.hash(password, saltRounds);

                    // Create the hospital admin record
                    const hospitalAdmin = new User.HospitalAdmin({
                        email: record.hospitalAdminSchema.email,
                        password: hash,
                        hospital: hospital._id
                    });
                    await hospitalAdmin.save();

                    


                    // Send an email with the password to the hospital admin
                   Utils.sendEmail({
                        to: hospitalAdmin.email,
                        subject: "Your hospital admin account has been created",
                        text: `Your password is: ${password}`
                    });
                }

                return record;
            }

            throw new Error("Hospital registration request not found");
        }


    }

}