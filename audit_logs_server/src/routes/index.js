import express from "express";
import { auditRoute } from "./audit.route.js";
import { searchRoute } from "./search.route.js";

const Route = express.Router()
Route.use('/audit', auditRoute)
Route.use('/search', searchRoute)
export const AUDIT_ROUTE_API = Route