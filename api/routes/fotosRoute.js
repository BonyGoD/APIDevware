import { Router } from 'express'
import { FotosController } from '../controllers/FotosController.js'

export const createFotosRouter = ({ fotoModel }) => {
  const fotosRouter = Router()

  const fotoController = new FotosController({ fotoModel })

  fotosRouter.get('/', fotoController.getAll)

  fotosRouter.get('/:categoria', fotoController.getbyCategory)

  fotosRouter.get('/:id', fotoController.getByID)

  fotosRouter.post('/', fotoController.create)

  fotosRouter.patch('/:id', fotoController.update)

  fotosRouter.delete('/:id', fotoController.delete)

  return fotosRouter
}
