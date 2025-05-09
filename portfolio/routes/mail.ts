import { Router } from 'express';
import { queMail } from '../mail';

const router = Router();


router.post('/sendmailportfolio', (req, res) => {
    try {
        const ip: string = typeof req.ip == 'string' ? req.ip : '';
        const mail: string = typeof req.body.mail == 'string' ? req.body.mail : '';
        const text: string = typeof req.body.message == 'string' ? req.body.message : '';
        if (!ip || !mail || !text) {
            return sendInternalError();
        }
        const go: boolean = queMail(ip, { mailsender: mail, text: text });
        if (!go) {
            return sendInternalError();
        }
        res.redirect('/');
    } catch (error) {
        return sendInternalError();
    }

    function sendInternalError() {
        res.render('index', {
            e: 'internal server error, try later or just send an email, directly',
        });
    }
});

export default router;