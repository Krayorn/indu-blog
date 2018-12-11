import 'colors'
import morgan from 'morgan'
import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import expressValidator from 'express-validator'
import cors from 'cors'
import path from 'path'

import authRouter from './routes/auth'
import articleRouter from './routes/articles'
import commentRouter from './routes/comments'

dotenv.config()

const app = express()

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

app.use(cors())

app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
        const namespace = param.split('.')
        let formParam    = namespace.shift()

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']'
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        }
    },
}))

function authChecker(req, res, next) {

    if(!req.url.startsWith('/api')) {
        return next()
    }

    const token = req.body.token || req.headers['x-access-token']
    if (req.url === '/api/auth' || (req.url === '/api/user' && req.method === 'POST' )) {
        return next()
    }

    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res.status(301).json({ success: false, message: 'Failed to authenticate token.' })
            }
            req.decoded = decoded
            next()
        })
    } else if (req.url.startsWith('/api/article') && req.method === 'GET') {
        return next()
    } else {
        res.redirect('/api/auth')
    }
}

app.use(authChecker)

app.use((req, res, next) => {
    res.sjson = (data) => {
        res.status(data.status)
        res.json(data)
    }

    return next()
})

app.use('/api', authRouter)
app.use('/api', articleRouter)
app.use('/api', commentRouter)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../build')))
    app.use(function (req, res, next) {
        res.sendFile(path.resolve(__dirname, '../build/index.html'))
    })
}

export default app
