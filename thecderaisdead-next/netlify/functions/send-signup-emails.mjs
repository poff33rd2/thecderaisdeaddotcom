import nodemailer from 'nodemailer';

export const handler = async (event) => {
    try {
        if (event.httpMethod !== 'POST') {
            return {
                statusCode: 405,
                body: 'Method Not Allowed',
            };
        }

        const payload = JSON.parse(event.body || '{}');


        console.log('Payload received:', payload);

        const userEmail = payload?.record?.email || payload?.email || payload?.user?.email;

        const fullName = payload?.record?.full_name || payload?.full_name || payload?.user_metadata?.full_name ||  'New User';

        if (!userEmail) {
            return {
                statusCode: 400,
                body: 'Bad Request: Missing email',
            };
        }
        
        // Create a transporter object using SMTP transport
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 465),
            secure: true,
            auth: {
                user: process.env.SMTP_HOST,
                pass: process.env.SMTP_PASS,

            },
        });

        const from = process.env.FROM_EMAIL;
        const admin = process.env.ADMIN_EMAIL;

        //Email admin
    await transporter.sendMail({
        from, 
        to: admin,
        subject: `New Signup: ${fullName}`,
        text: `A new user has signed up with the email: ${userEmail}`,  
    });

    //Email user
    await transporter.sendMail({
        from,
        to: userEmail,
        subject: `Welcome to TheCDEraisDead, ${fullName}!`,
        text: `Hi ${fullName},\n\nThank you for signing up at TheCDEraisDead! We're excited to have you on board.\n\nBest regards,\nTheCDEraisDead Team`,  
    });


    return { statusCode: 200, body: 'Emails sent successfully' };
    } catch(e) {
        console.error('Error sending emails:', e);
        return { statusCode: 500, body: 'Internal Server Error' };
    }
}