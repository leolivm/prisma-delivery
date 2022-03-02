import { Request, Response } from 'express'

import { AuthenticateDeliveryManUseCase } from './AuthenticateDeliveryManUseCase'

export class AuthenticateDeliveryManController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body

    const authenticateDeliveryManUseCase = new AuthenticateDeliveryManUseCase()

    const result = await authenticateDeliveryManUseCase.execute({
      username,
      password,
    })

    return response.json(result)
  }
}
