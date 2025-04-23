import express from 'express'
import { authorizeAdmin, verifyToken, checkBlackList } from '../../middleware/authToken.js'
import { PackageController } from '../../controller/package.controller.js'
const Router = express.Router()

Router.route('/')
    .get(checkBlackList, verifyToken, authorizeAdmin('admin', 'user'), PackageController.getPackages)
    .post(checkBlackList, verifyToken, authorizeAdmin('admin'), PackageController.createPackage)

Router.route('/:id')
    .put(checkBlackList, verifyToken, authorizeAdmin('admin'), PackageController.updatePackage)
    .delete(checkBlackList, verifyToken, authorizeAdmin('admin'), PackageController.deletePackage)
    .patch(checkBlackList, verifyToken, authorizeAdmin('admin'), PackageController.recoveryPackage)
export const packageRoute = Router