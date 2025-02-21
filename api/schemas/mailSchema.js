import zod from 'zod';

const mailSchema = zod.object({
    nombre: zod.string(),
    email: zod.string().email(),
    telefono: zod.string().optional(),
    descripcion: zod.string(),
    mailEmpresa: zod.string().email(),
    nombreEmpresa: zod.string()
});

export function validarMail(mail) {
    return mailSchema.safeParse(mail);
}