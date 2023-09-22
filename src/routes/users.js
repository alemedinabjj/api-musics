import * as userController from '../controller/users.js'
import { verifyToken } from '../middlewares/verifyToken.js'

export const routes = [
  {
    method: 'GET',
    url: '/user/:id',
    handler: userController.getUserById,
  },
  {
    method: 'POST',
    url: '/user/register',
    handler: userController.createUser,
  },
  {
    method: 'PUT',
    url: '/user/:id',
    handler: userController.updateUser,
  },
  {
    method: 'DELETE',
    url: '/user/:id',
    handler: userController.deleteUser,
  },
  {
    method: 'POST',
    url: '/user/login',
    handler: userController.login,
  },
  {
    method: 'GET',
    url: '/user/profile',
    handler: userController.getUserProfile,
    preHandler: verifyToken,
  },
]
