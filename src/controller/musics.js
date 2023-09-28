import { prisma } from '../lib/prisma.js'

const getAllArtists = async (req, res) => {
  const musics = await prisma.music.findMany({
    select: {
      artist: true,
    },

    orderBy: {
      artist: 'asc',
    },
  })

  const filteredArtist = [...new Set(musics.map((music) => music.artist))]

  return filteredArtist
}

const filterByArtist = async (req, res) => {
  const { artist } = req.query

  const musics = await prisma.music.findMany({
    where: {
      artist,
    },
  })

  return musics
}

const getAllMusics = async (req, res) => {
  try {
    const { page = 1, limit = 30 } = req.query

    if (isNaN(page) || isNaN(limit)) {
      return { message: 'Invalid query params' }
    }

    const musics = await prisma.music.findMany({
      // traz tudo menos userId
      select: {
        id: true,
        title: true,
        artist: true,
        year: true,
        code: true,
      },
      skip: (page - 1) * limit,
      take: parseInt(limit),
    })

    // retornar quantidade total de páginas

    const totalMusic = await prisma.music.count()

    const totalPages = Math.ceil(totalMusic / limit)

    return { musics, totalPages, totalMusic }
  } catch (error) {
    console.error('Error to get musics', error)
    return { message: 'Error to get musics' }
  }
}

const searchMusics = async (req, res) => {
  const { title, artist } = req.query

  try {
    let musics

    if (title && artist) {
      musics = await prisma.music.findMany({
        where: {
          title: {
            contains: title,
            mode: 'insensitive',
          },
          artist: {
            equals: artist,
          },
        },
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

    if (title) {
      musics = await prisma.music.findMany({
        where: {
          title: {
            contains: title,
            mode: 'insensitive',
          },
        },
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

    if (artist) {
      musics = await prisma.music.findMany({
        where: {
          artist: {
            equals: artist,
          },
        },
      })

      return musics
    }

    return { message: 'Invalid query params' }
  } catch (error) {
    console.error('Erro na busca de músicas:', error)
    return { message: 'Error to get musics' }
  }
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

  prisma.music
    .findFirst({
      where: {
        code,
      },
    })
    .then((music) => {
      if (!music) {
        prisma.music
          .create({
            data: {
              title,
              artist,
              year,
              code,
              userId,
            },
          })
          .then((music) => {
            return { message: 'Music created successfully' }
          })
      }
    })

  return { message: 'Music created successfully' }
}

const updateMusic = async (req, res) => {
  const { id } = req.params
  const { title, artist, year, code } = req.body

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

export {
  getAllMusics,
  getMusicById,
  createMusic,
  updateMusic,
  deleteMusic,
  searchMusics,
  getAllArtists,
  filterByArtist,
}
