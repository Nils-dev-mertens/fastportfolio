import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.render('index', { e: '' });
});

export default router;