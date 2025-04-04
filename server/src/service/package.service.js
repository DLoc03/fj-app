import Package from "../model/package.js";
import { MasterResponse } from "../response/master.response.js";
import { PackageResponse } from "../response/package.response.js";
import { ERROR_CODE, STATUS } from "../utils/enum.js";

export const PackageService = {
    createPackage: async (data) => {
        const { name, price, description } = data
        const existedName = await Package.findOne({ name: name }).lean()
        if (existedName) {
            return MasterResponse({ status: STATUS.FAILED, errCode: ERROR_CODE.BAD_REQUEST, message: 'Name was existed' })
        }
        await Package.insertOne({ name: name, price: price, description: description })
        return MasterResponse({ data: data })
    },
    updatePackage: async (id, data) => {
        const { name, price, description } = data
        const pkg = await Package.findById(id).lean()
        if (!pkg) return MasterResponse({ status: STATUS.NOT_FOUND, errCode: ERROR_CODE.BAD_REQUEST, message: 'Package not found' })
        const updatedPkg = await Package.findOneAndUpdate({ _id: id }, { name: name, price: price, description: description }, { new: true })
        return MasterResponse({ data: PackageResponse.Client(updatedPkg) })
    },
    getPackages: async (isDestroy) => {
        const filter = isDestroy === null ? { isDestroy: false } : { isDestroy }
        const packages = await Package.find(filter).lean()
        const data = packages.map(p => PackageResponse.Client(p))
        return MasterResponse({ data: data })
    },
    deletePackage: async (id) => {
        const pkg = await Package.findById(id).lean()
        if (!pkg) return MasterResponse({ status: STATUS.NOT_FOUND, errCode: ERROR_CODE.BAD_REQUEST, message: 'Package not found' })
        await Package.findByIdAndUpdate(id, { isDestroy: true })
        return MasterResponse({ message: 'Package was deleted successfully' })
    },
    recoveryPackage: async (id) => {
        const pkg = await Package.findOne({ _id: id, isDestroy: true }).lean()
        if (!pkg) return MasterResponse({ status: STATUS.NOT_FOUND, errCode: ERROR_CODE.BAD_REQUEST, message: 'Package not found' })
        const recover = await Package.findByIdAndUpdate(id, { isDestroy: false })
        return MasterResponse({ data: PackageResponse.Client(recover) })
    }
}