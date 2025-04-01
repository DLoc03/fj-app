import express from 'express'
import { authorizeAdmin, verifyToken } from '../../middleware/authToken.js'
import { PackageController } from '../../controller/package.controller.js'
const Router = express.Router()

Router.route('/')
    .get(verifyToken, authorizeAdmin('admin', 'user'), PackageController.getPackages)
    .post(verifyToken, authorizeAdmin('admin'), PackageController.createPackage)

Router.route('/:id')
    .put(verifyToken, authorizeAdmin('admin'), PackageController.updatePackage)
    .delete(verifyToken, authorizeAdmin('admin'), PackageController.deletePackage)
    .patch(verifyToken, authorizeAdmin('admin'), PackageController.recoveryPackage)
export const packageRoute = Router