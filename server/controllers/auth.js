import User from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fetch from 'node-fetch'

async function getJsonResponse (response) {
    const json = await response.json()
    if (response.ok){
      return json
    } else {
      throw json
    }
}

export const authUser = (req, res) => {
    User.findOne({username: req.body.username}, (err, user) => {
        if (!user) {
            return res.sjson({
                status: 401,
                errors: [{id: 'api.auth.login.username.unrecognised', msg: 'Unrecognised Username'}]
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
                        _id: user._id,
                        role: user.role,
                    },
                    process.env.SECRET,
                    {
                        expiresIn: '24h'
                    })

                    return fetch(`${process.env.GAME_API_BASE_URL}/gamer/${user._id}?api_key=${process.env.GAME_API_KEY}`, {
                        mode: 'cors',
                        headers: {
                            'content-type': 'application/json'
                        }
                    })
                    .then(getJsonResponse)
                    .then(gamerInfo => {
                        return res.sjson({
                            status: 200,
                            token: JWTToken,
                            username: user.username,
                            role: user.role,
                            gamer: gamerInfo.data,
                            _id: user._id,
                        })
                    })
                    .catch(err => {
                        return res.sjson({
                            status: 401,
                            errors: [{id: 'api.game', msg: err.errors[0]}]
                        })
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

    req.checkBody('username', {id: 'api.auth.register.username.required', msg:'Username is required'}).notEmpty()
    req.checkBody('password', {id: 'api.auth.register.password.required', msg:'Password is required'}).notEmpty()
    req.checkBody('passwordConfirm', {id: 'api.auth.register.password.required', msg:'Passwords do not match'}).equals(password)

    return req.asyncValidationErrors()
    .then(() => {
        User.findOne({username}, (err, user) => {
            if(err) throw err
            if (user) {
                if (username === user.username) {
                    return res.sjson({
                        status: 400,
                        errors: [{
                            id: 'api.auth.register.username.existing',
                            msg: 'Username already in use'
                        }]
                    })
                }
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

                            fetch(`${process.env.GAME_API_BASE_URL}/gamer?api_key=${process.env.GAME_API_KEY}`, {
                                mode: 'cors',
                                method: 'POST',
                                headers: {
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify({
                                    gamerId: result._id
                                })
                            })
                            .then(getJsonResponse)
                            .then(gamerInfo => {
                                const JWTToken = jwt.sign({
                                    username: result.username,
                                    _id: result._id,
                                    role: result.role,
                                },
                                process.env.SECRET,
                                {
                                    expiresIn: '24h'
                                })

                                fetch(`${process.env.GAME_API_BASE_URL}/gamer/${result._id}/achievements/REGISTER?api_key=${process.env.GAME_API_KEY}`, {
                                    mode: 'cors',
                                    method: 'PATCH',
                                    headers: {
                                        'content-type': 'application/json'
                                    }
                                })
                                .then(getJsonResponse)
                                .then(achievement => {
                                    res.sjson({
                                        status: 200,
                                        data: {
                                            username: result.username,
                                            role: result.role,
                                            gamer: achievement.errors ? gamerInfo.data : achievement.data,
                                            token: JWTToken,
                                        },
                                    })
                                })
                                .catch(err => {
                                    return res.sjson({
                                        status: 401,
                                        errors: [{id: 'api.game', msg: err.errors[0]}]
                                    })
                                })

                            })
                            .catch(err => {
                                return res.sjson({
                                    status: 401,
                                    errors: [{id: 'api.game', msg: err.errors[0]}]
                                })
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
    if (req.decoded.role !== 'ADMIN') {
        return res.sjson({
            status: 301,
            err: ['not auth']
        })
    } else {
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
}

export const deleteUser = (req, res) => {
    if (req.decoded.role === 'ADMIN' || req.params.id.toString() == req.decoded._id.toString()) {
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
}

export const updateRole = (req, res) => {

    if(req.decoded.role !== 'ADMIN') {
        return res.sjson({
            status: 400,
            err: ['not auth']
        })
    }

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
