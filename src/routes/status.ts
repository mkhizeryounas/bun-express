import express from 'express';
import type { Request, Response } from 'express';
import respond from '../utils/respond';

const router = express.Router();

router.get('/', async function (_: Request, res: Response): Promise<void> {
  return respond(res, {
    data: {
      status: 'OK',
    },
  });
});

export default router;
