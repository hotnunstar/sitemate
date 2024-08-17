import express from 'express'
import { getIssues, addIssue, updateIssue, deleteIssue } from '../controllers/issue.js'

const router = express.Router()

router.get('/', getIssues)
router.post('/', addIssue)
router.put('/:id', updateIssue)
router.delete('/:id', deleteIssue)

export default router