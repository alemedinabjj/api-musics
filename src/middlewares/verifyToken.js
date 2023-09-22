import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const verifyToken = async (request, reply, done) => {
  const { authorization } = request.headers
  console.log('Authorization header:', authorization)

  if (!authorization) {
    console.log('No Authorization header found')
    reply.code(401).send({ message: 'Unauthorized' })
    return
  }

  const token = authorization.split(' ')[1]
  console.log('Token:', token)

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    console.log('Decoded token:', decoded)
    request.user = decoded
    done()
  } catch (error) {
    console.error('JWT verification error:', error)
    reply.code(401).send({ message: 'Unauthorized' })
  }
}
