import { Router } from 'express'

import { CreateClientController } from './modules/clients/useCases/createClient/createClientController'
import { FindAllDeliveriesController } from './modules/clients/useCases/deliveries/FindAllDeliveriesController'

import { AuthenticateClientController } from './modules/account/authenticateUser/AuthenticateClientController'
import { AuthenticateDeliveryManController } from './modules/account/authenticateDeliveryMan/AuthenticateDeliveryManController'

import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient'
import { ensureAuthenticateDeliveryMan } from './middlewares/ensureAuthenticateDeliveryMan'

import { CreateDeliveryManController } from './modules/deliveryman/useCases/createDeliveryMan/CreateDeliveryManController'

import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController'
import { FindAllWithoutEndDateController } from './modules/deliveries/useCases/findAllWithoutEndDate/FindAllWithoutEndDateController'
import { UpdateDeliveryManController } from './modules/deliveries/useCases/updateDeliveryMan/useCases/UpdateDeliveryManController'
import { FindAllDeliveriesDeliveryManController } from './modules/deliveries/useCases/findAllDeliveries/FindAllDeliveriesDeliveryManController'
import { UpdateEndDateController } from './modules/deliveries/useCases/updateEndDate/UpdateEndDateController'

const routes = Router()

const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const createDeliveryManController = new CreateDeliveryManController()
const authenticateDeliveryManController =
  new AuthenticateDeliveryManController()
const createDeliveryController = new CreateDeliveryController()
const findAllWithoutEndDateController = new FindAllWithoutEndDateController()
const updateDeliveryManController = new UpdateDeliveryManController()
const findAllDeliveriesController = new FindAllDeliveriesController()
const findAllDeliveriesDeliveryManController =
  new FindAllDeliveriesDeliveryManController()
const updateEndDateController = new UpdateEndDateController()

routes.post('/client', createClientController.handle)

routes.post('/client/authenticate', authenticateClientController.handle)
routes.post(
  '/deliveryman/authenticate',
  authenticateDeliveryManController.handle,
)

routes.post('/deliveryman', createDeliveryManController.handle)

routes.post(
  '/delivery',
  ensureAuthenticateClient,
  createDeliveryController.handle,
)

routes.get(
  '/delivery/available',
  ensureAuthenticateDeliveryMan,
  findAllWithoutEndDateController.handle,
)

routes.put(
  '/delivery/updateDeliveryMan/:id',
  ensureAuthenticateDeliveryMan,
  updateDeliveryManController.handle,
)

routes.get(
  '/client/deliveries',
  ensureAuthenticateClient,
  findAllDeliveriesController.handle,
)

routes.get(
  '/deliveryman/deliveries',
  ensureAuthenticateDeliveryMan,
  findAllDeliveriesDeliveryManController.handle,
)

routes.put(
  '/delivery/updateEndDate/:id',
  ensureAuthenticateDeliveryMan,
  updateEndDateController.handle,
)

export { routes }
