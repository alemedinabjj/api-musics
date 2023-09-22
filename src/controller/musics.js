import { prisma } from '../lib/prisma.js'

const getAllMusics = async (req, res) => {
  const musics = await prisma.music.findMany({
    select: {
      id: true,
      title: true,
      artist: true,
      year: true,
      code: true,
    },
  })
  return musics
}

const getMusicById = async (req, res) => {
  const { id } = req.params
  const music = await prisma.music.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      artist: true,
      year: true,
      code: true,
    },
  })

  return music
}

const createMusic = async (req, res) => {
  const { title, artist, year, code, userId } = req.body

  const musicExits = await prisma.music.findFirst({
    where: {
      code,
    },
  })

  if (musicExits) {
    throw new Error('Music already exists')
  }

  const music = await prisma.music.create({
    data: {
      title,
      artist,
      year,
      code,
      userId,
    },
  })

  return music
}

const updateMusic = async (req, res) => {
  const { id } = req.params
  const { title, artist, year, code, userId } = req.body

  if (!id) {
    throw new Error('Music ID is required')
  }

  const music = await prisma.music.update({
    where: {
      id,
    },
    data: {
      title,
      artist,
      year,
      code,
    },
  })

  return music
}

const deleteMusic = async (req, res) => {
  const { id } = req.params
  const music = await prisma.music.delete({
    where: {
      id,
    },
  })

  return music
}

export { getAllMusics, getMusicById, createMusic, updateMusic, deleteMusic }
