import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface Payload {
  sub: string
}

export async function ensureAuthenticateDeliveryMan(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({
      message: 'Token missing',
    })
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub } = verify(token, '805772e6f15c214c554c41312837c9e5') as Payload

    request.id_deliveryman = sub

    return next()
  } catch (err) {
    return response.status(401).json({
      message: 'Invalid token',
    })
  }
}
