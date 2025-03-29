import express from 'express'
import { AuditController } from '../controllers/audit.controller.js'

const Route = express.Router()

Route.route('/')
    .get(AuditController.getAllAuditLog)

Route.route('/count')
    .get(AuditController.countAuditLogs)
export const auditRoute = Route