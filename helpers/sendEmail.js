import nodemailer from 'nodemailer';
import "dotenv/config";

const {UKR_NET_EMAIL_FROM, UKR_NET_MAILER_PASSWORD} = process.env;

const nodemailerConfig = {
    host: 'smtp.ukr.net',
    post: 465,
    secure: true,
    auth: {
        user: UKR_NET_EMAIL_FROM,
        pass: UKR_NET_MAILER_PASSWORD
    }
};


const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
    from: UKR_NET_EMAIL_FROM,
    to: 'pepono2274@klanze.com',
    subject: 'Test email',
    html: "<table width='600'><tr><td>Дякую що підписалися</td></tr><td>Віталій Громик</td><tr></tr></table>"
}

// transport.sendMail(email).then(()=> console.log('Email send success')).catch((error)=> console.log(error.message))

const sendEmail = (data) => {
    const email = {...data, from: UKR_NET_EMAIL_FROM};

    return transport.sendMail(email)
}

export default sendEmail;