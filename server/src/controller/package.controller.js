import { PackageService } from "../service/package.service.js";
import { MasterResponse } from "../response/master.response.js";
import { ERROR_CODE } from "../utils/enum.js";
export const PackageController = {
    createPackage: async (req, res) => {
        try {
            const response = await PackageService.createPackage(req?.body)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(MasterResponse({ errCode: ERROR_CODE.FAILED, message: error.message }));
        }
    },
    updatePackage: async (req, res) => {
        try {
            const response = await PackageService.updatePackage(req?.params.id, req.body)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(MasterResponse({ errCode: ERROR_CODE.FAILED, message: error.message }));
        }
    },
    getPackages: async (req, res) => {
        try {
            const isDestroy = req.query.isDestroy ? req.query.isDestroy === "true" : null;
            const response = await PackageService.getPackages(isDestroy)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(MasterResponse({ errCode: ERROR_CODE.FAILED, message: error.message }));
        }
    },
    deletePackage: async (req, res) => {
        try {
            const response = await PackageService.deletePackage(req.params?.id)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(MasterResponse({ errCode: ERROR_CODE.FAILED, message: error.message }));
        }
    },
    recoveryPackage: async (req, res) => {
        try {
            const response = await PackageService.recoveryPackage(req.params?.id)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(MasterResponse({ errCode: ERROR_CODE.FAILED, message: error.message }));
        }
    }
}