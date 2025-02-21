import { Router } from 'express';
import { MailController } from '../controllers/MailController.js';


export const createMailRouter = ({ mailModel }) => {
    const mailRouter = Router()

    const mailController = new MailController({ mailModel });

    mailRouter.post('/enviarMail', mailController.sendMail);

    return mailRouter;
}