import z from 'zod'

const fotoSchema = z.object({
  nombre: z.string(),
  extension: z.string(),
  base64: z.string(),
  categoria: z.string(),
})

// Este metodo es para validar los campos que se quieren agregar
export function validarFoto (input) {
  return fotoSchema.safeParse(input)
}

// Este metodo es para validar los campos que se quieren modificar
export function validatePartialFoto (input) {
  return fotoSchema.partial().safeParse(input)
}
