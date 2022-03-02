import { hash } from 'bcrypt'

import { prisma } from '../../../../database/prismaClient'

interface ICreateDeliveryManUseCase {
  username: string
  password: string
}

export class CreateDeliveryManUseCase {
  async execute({ username, password }: ICreateDeliveryManUseCase) {
    const deliveryManExists = await prisma.deliveryMan.findFirst({
      where: {
        username: {
          mode: 'insensitive',
        },
      },
    })

    if (deliveryManExists) {
      throw new Error('DeliveryMan already exists')
    }

    const hashPassword = await hash(password, 10)

    const deliveryMan = await prisma.deliveryMan.create({
      data: {
        username,
        password: hashPassword,
      },
    })

    return deliveryMan
  }
}
