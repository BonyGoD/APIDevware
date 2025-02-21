import { validarMail } from '../schemas/mailSchema.js';

export class MailController {
    constructor({ mailModel }) {
        this.mailModel = mailModel
    }

    sendMail = async (request, response) => {
        try {
            const result = validarMail(request.body);
            if(!result.success){
                return response.status(400)
                .json({ message: JSON.parse(result.error.message) });
            }
            const sendResult = await this.mailModel.sendMail({ input: result.data });
            if(sendResult.error){
                return response.status(sendResult.error.code)
                .json({ message: JSON.parse(sendResult.error.message) });
            }
            response.send(JSON.stringify(sendResult.data));
        } catch (error) {
            response.status(error.code)
            .json({ message: JSON.parse(error.message) });
        }
    }
}