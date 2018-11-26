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
                        token: JWTToken
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

    req.asyncValidationErrors()
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
                            password: hash
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

export default {
    authUser,
    registerUser,
}
