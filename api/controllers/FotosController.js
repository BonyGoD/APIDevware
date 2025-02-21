import { validarFoto, validatePartialFoto } from '../schemas/fotosSchema.js'

export class FotosController {
  constructor ({ fotoModel }) {
    this.fotoModel = fotoModel
  }

  getAll = async (request, response) => {
    const fotos = await this.fotoModel.getAll()

    response.json(fotos)
  }

  getbyCategory = async (request, response) => {
    const { categoria } = request.params
    const fotos = await this.fotoModel.getByCategory({ categoria })

    if (fotos != '') return response.json(fotos)

    response.status(404).send({ message: 'Not found' })
  }

  getByID = async (request, response) => {
    const { id } = request.params
    const foto = await this.fotoModel.getByID({ id })

    if (foto) return response.json(foto)

    response.status(404).send({ message: 'Not found' })
  }

  create = async (request, response) => {
    const result = validarFoto(request.body)

    if (result.error) {
      return response
        .status(400)
        .json({ message: JSON.parse(result.error.message) })
    }

    const nuevaFoto = await this.fotoModel.create({ input: result.data })

    response.status(201).json(nuevaFoto)
  }

  update = async (request, response) => {
    const result = validatePartialFoto(request.body)

    if (!result.success) {
      return response
        .status(400)
        .json({ message: JSON.parse(result.error.message) })
    }

    const { id } = request.params

    const updatedFoto = await this.fotoModel.update({ id, input: result.data })

    return response.json(updatedFoto)
  }

  delete = async (request, response) => {
    const { id } = request.params

    const result = await this.fotoModel.delete({ id })

    if (result === false) {
      return response.status(404).json({ message: 'Not found' })
    }

    return response.json({ message: 'Foto eliminada' })
  }
}
