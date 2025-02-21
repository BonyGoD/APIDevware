import { Resend } from 'resend'
import { getTokenEnviarMail } from '../constantes.js'

export class MailModel {

  static async sendMail({ input }) {
    const { nombre, email, telefono = '', descripcion, mailEmpresa, nombreEmpresa = ""} = {...input}
    const resend = new Resend(getTokenEnviarMail[mailEmpresa])

    try {
        const { data, error } = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: mailEmpresa,
          subject: `${nombreEmpresa} - ${nombre} te ha enviado un mensaje`, // <== Modificar el asunto del mail???? TODO
          html: `<p>${descripcion}</p>
                <strong>Email: ${email}</strong><br>
                <strong>Teléfono: ${telefono === '' ? 'No informado': telefono}</strong>`, // <== Modificar salida del mail???? TODO
        })
        return { data, error }
    } catch (e) {
        res.status(500)
        .json({ message: JSON.parse(error.message) });
    }
    return data
  }
}
