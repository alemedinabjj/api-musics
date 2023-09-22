import * as musicController from '../controller/musics.js'
import { verifyToken } from '../middlewares/verifyToken.js'

export const routes = [
  {
    method: 'GET',
    url: '/musics',
    handler: musicController.getAllMusics,
  },
  {
    method: 'GET',
    url: '/musics/:id',
    handler: musicController.getMusicById,
  },
  {
    method: 'POST',
    url: '/musics',
    handler: musicController.createMusic,
    preHandler: verifyToken,
  },
  {
    method: 'PUT',
    url: '/musics/:id',
    handler: musicController.updateMusic,
  },
  {
    method: 'DELETE',
    url: '/musics/:id',
    handler: musicController.deleteMusic,
  },
]
