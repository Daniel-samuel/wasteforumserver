// const Mailjet = require('node-mailjet').connect(
//     process.env.MAILJET_KEY,
//     process.env.MAILJET_SECRET,
// );
const mailjet = require('node-mailjet');
const Mailjet = mailjet.connect(process.env.MAILJET_KEY, process.env.MAILJET_SECRET);

const generatePassword = (length = 12) => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=";
    let password = "";

    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return password;
}


const sendEmail = async ({ to, subject, text }) => {
    try {
        const response = await Mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: 'folarinded@gmail.com',
                        Name: 'Turbomed'
                    },
                    To: [
                        {
                            Email: to
                        }
                    ],
                    Subject: subject,
                    TextPart: text
                }
            ]
        });
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};


const exportVariables = {
    generatePassword,
    sendEmail
};

module.exports = exportVariables;