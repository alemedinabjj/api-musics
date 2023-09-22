import { prisma } from '../lib/prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const login = async (req, res) => {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    throw new Error('User not found')
  }

  const isPasswordValid = bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })

  return { token }
}

const getUserById = async (req, res) => {
  const { id } = req.params
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      musics: true,
    },
  })

  return user
}

const getUserProfile = async (req, res) => {
  // O token já foi verificado, então podemos confiar nas informações do usuário no req.user
  const userId = req.user.id

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      // musics: true,
    },
  })

  if (!user) {
    throw new Error('User not found')
  }

  return user
}

const createUser = async (req, res) => {
  const { name, email, password } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)

  const userExits = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (userExits) {
    throw new Error('User already exists')
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  return user
}

const updateUser = async (req, res) => {
  const { id } = req.params
  const { name, email, password } = req.body

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      password,
    },
  })

  return user
}

const deleteUser = async (req, res) => {
  const { id } = req.params

  const user = await prisma.user.delete({
    where: {
      id,
    },
  })

  return user
}

export {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  getUserProfile,
}
