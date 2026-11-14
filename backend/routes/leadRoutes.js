import express from 'express';
import {
  createLead,
  getLeads,
  updateLeadStatus,
  deleteLead,
} from '../controllers/leadController.js';

const router = express.Router();

router.route('/')
  .post(createLead)
  .get(getLeads);

router.route('/:id')
  .patch(updateLeadStatus)
  .delete(deleteLead);

export default router;
