import User from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const authUser = (req, res) => {
    User.findOne({username: req.body.username}, (err, user) => {
        if (!user) {
            return res.sjson({
                status: 401,
                failed: 'Unrecognised Username'
            })
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(err) {
                return res.sjson({
                    status: 401,
                    failed: 'Unauthorized Access'
                })
            }
            if(result) {
                const JWTToken = jwt.sign({
                        username: user.username,
                        _id: user._id
                    },
                    'secret',
                    {
                        expiresIn: '24h'
                    })

                    return res.sjson({
                        status: 200,
                        token: JWTToken,
                        username: user.username,
                        role: user.role,
                        _id: user._id,
                    })
            }
            return res.sjson({
                status: 401,
                failed: 'Unauthorized Access'
            })
        })
    })
    .catch(err => {
        res.sjson({
            status: 500,
            err,
        })
    })
}

export const registerUser = (req, res) => {
    const { username, password } = req.body

    req.checkBody('username', 'Username is required').notEmpty()
    req.checkBody('password', 'Password is required').notEmpty()
    req.checkBody('passwordConfirm', 'Passwords do not match').equals(password)

    return req.asyncValidationErrors()
    .then(() => {
        User.findOne({username}, (err, user) => {
            if(err) throw err
            if (user) {
                if (username === user.username) {
                    return res.sjson({status: 400, error: 'Username already in use'})
                }
                return res.sjson({status: 400, error: 'Email already in use'})
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err) {
                        return res.sjson({
                            status: 500,
                            err,
                        })
                    }
                    else {
                        new User({
                            username: req.body.username,
                            password: hash,
                            role: 'DEFAULT',
                        }).save().then((result) => {
                            res.sjson({
                                status: 200,
                                data: result
                            })
                        }).catch(err => {
                            res.sjson({ status: 500, err })
                        })
                    }
                })
            }
        })
    })
    .catch((errors) => {
        if (errors) {
            return res.sjson({status: 400, response: errors})
        }
    })
}

export const getAllUsers = (req, res) => {
    User.find({})
    .then((users) => {
        if (!users)
            res.send(404)
        else
        res.sjson({
            status: 200,
            data: users
        })
    })
    .catch((err) => {
        return res.sjson({
            status: 400,
            errors: [err]
        })
    })
}

export const deleteUser = (req, res) => {
    User.deleteOne({_id: req.params.id}, (err, deleted) => {
        return res.sjson({
            status: 200,
            data: {
                id: req.params.id,
                deleted
            },
        })
    })
}

export const updateRole = (req, res) => {
    User.findOne({_id: req.params.id})
    .then(user => {
        if (!user)
            return res.send(404)

        user.role = req.body.role

        user.save((err, updatedUser) => {
            res.sjson({
                status: 200,
                data: updatedUser
            })
        })
    })
}

export default {
    authUser,
    registerUser,
    getAllUsers,
    deleteUser,
    updateRole,
}
