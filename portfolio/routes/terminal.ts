import { Router } from 'express';
import { dispatch } from '../commands';

const router = Router();

router.get('/terminal', (req, res) => {
    res.render('terminal');
});

router.post('/command', (req, res) => {
    const raw = req.body.command;
    const parts = raw.trim().split(/\s+/);
    const name = parts[0];
    const args = parts.slice(1);

    const output = dispatch([name, args], req);
    res.render('partials/line', { input: raw, output });
});

export default router;