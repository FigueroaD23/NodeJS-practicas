import express from 'express';
import userSchema from './models/user';

const router = express.Router();

router.get('/users', (req, res) => {
    userSchema.find().then((users) => {
        res.json(users);
    }).catch((err) => {
        console.log(err);
    }
    );
});

router.get('/user/:id', (req, res) => {
    const { id } = req.params;
    userSchema.findById(id).then((users) => {
        res.json(users);
    }).catch((err) => {
        console.log(err);
    }
    );
});

router.post('/user', (req, res) => {
    const user = new userSchema(req.body);
    user.save().then((user) => {
        res.json(user);
    }).catch((err) => {
        console.log(err);
    }
    );
});

export default router;