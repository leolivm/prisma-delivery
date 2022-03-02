import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { prisma } from '../../../database/prismaClient'

interface IAuthenticateClientUseCase {
  username: string
  password: string
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClientUseCase) {
    const client = await prisma.clients.findFirst({
      where: {
        username,
      },
    })

    if (!client) {
      throw new Error('Username or password invalid')
    }

    const passwordMatch = await compare(password, client.password)

    if (!passwordMatch) {
      throw new Error('Username or password invalid')
    }

    const token = sign({ username }, '805772e6f15c214c584c41312837c9e5', {
      subject: client.id,
      expiresIn: '1d',
    })

    return token
  }
}
