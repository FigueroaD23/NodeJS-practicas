import express from 'express';
import { createUser, getAllUsers, getUserById, updateUserById } from './models/user';

const router = express.Router();

router.get('/users', async (req, res) => {
    console.log(req.body)
    try {
        const users = await getAllUsers()
        res.json(users);
    } catch (error) {
        console.log(error);
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        const user = await getUserById(req.params.id)
        res.json(user);
    } catch (error) {
        console.log(error);
    }
});

router.post('/user', async (req, res) => {
    console.log(req.body)
    const resCreateUser = await createUser(req.body)
    res.json({ message: 'User created', status: 200, data: resCreateUser });
});

router.put('/update/user/:id', async (req, res) => {
    const resUpdateUser = await updateUserById(req.params.id, req.body)
    res.json({ message: 'User updated', status: 200, data: resUpdateUser });
});

/* router.get('/user/:id', (req, res) => {
    const { id } = req.params;
    userSchema.findById(id).then((users) => {
        res.json(users);
    }).catch((err) => {
        console.log(err);
    }
    );
});

 */

export default router;