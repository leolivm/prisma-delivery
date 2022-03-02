import { Request, Response } from 'express'

import { CreateDeliveryManUseCase } from './CreateDeliveryManUseCase'

export class CreateDeliveryManController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body

    const createDeliveryManUseCase = new CreateDeliveryManUseCase()

    const result = await createDeliveryManUseCase.execute({
      username,
      password,
    })

    return response.json(result)
  }
}
