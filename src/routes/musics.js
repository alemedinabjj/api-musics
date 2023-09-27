import {
  getAllMusics,
  getMusicById,
  createMusic,
  updateMusic,
  deleteMusic,
  searchMusics,
  getAllArtists,
  filterByArtist,
} from '../controller/musics.js'
import { verifyToken } from '../middlewares/verifyToken.js'

export const routes = [
  {
    method: 'GET',
    url: '/musics',
    handler: getAllMusics,
  },
  {
    method: 'GET',
    url: '/musics/:id',
    handler: getMusicById,
  },
  {
    method: 'POST',
    url: '/musics',
    preHandler: verifyToken,
    handler: createMusic,
  },
  {
    method: 'PUT',
    url: '/musics/:id',
    handler: updateMusic,
  },
  {
    method: 'DELETE',
    url: '/musics/:id',
    handler: deleteMusic,
  },

  {
    method: 'GET',
    url: '/search', // /search?title=xxx
    handler: searchMusics,
  },
  {
    method: 'GET',
    url: '/artists',
    handler: getAllArtists,
  },
]
