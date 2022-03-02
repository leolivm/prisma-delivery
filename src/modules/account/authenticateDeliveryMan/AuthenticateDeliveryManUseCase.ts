import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { prisma } from '../../../database/prismaClient'

interface IAuthenticateDeliveryManUseCase {
  username: string
  password: string
}

export class AuthenticateDeliveryManUseCase {
  async execute({ username, password }: IAuthenticateDeliveryManUseCase) {
    const deliveryMan = await prisma.deliveryMan.findFirst({
      where: {
        username,
      },
    })

    if (!deliveryMan) {
      throw new Error('Username or password invalid')
    }

    const passwordMatch = await compare(password, deliveryMan.password)

    if (!passwordMatch) {
      throw new Error('Username or password invalid')
    }

    const token = sign({ username }, '805772e6f15c214c554c41312837c9e5', {
      subject: deliveryMan.id,
      expiresIn: '1d',
    })

    return token
  }
}
