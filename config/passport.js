import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserModel from '../models/user.js';
import { isValidPassword, encryptPassword } from '../utils/passwordUtils.js'

function initPassport() {
    passport.use('sign-in', new LocalStrategy({
        usernameField: 'email',
    }, (email, password, done) => {
        UserModel.findOne({ email })
            .then((user) => {
                if (!user) {
                    console.log(`User not found with username ${email}`)
                    return done(null, false)
                }
                if (!isValidPassword(user, password)) {
                    console.log('Invalid Password')
                    return done(null, false)
                }
                return done(null, user)
            })
            .catch(error => {
                console.log('Failed to sign in', error.message)
                done(error)
            })
    }))

    passport.use('sign-up', new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true,
    }, (req, email, password, done) => {
        UserModel.findOne({ email })
            .then(user => {
                if (user) {
                    console.log(`User ${email} already exists.`)
                    return done(null, false)
                }
                const newUser = {
                    ...req.body,
                    password: encryptPassword(password)
                }
                UserModel.create(newUser)
                    .then(newUser => {
                        console.log(`User ${newUser.email} registration succesful.`)
                        done(null, newUser)
                    })
            })
            .catch(error => {
                console.log('Error in saving user: ', error.message)
                done(error)
            })
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((_id, done) => {
        UserModel.findOne({ _id })
            .then(user => done(null, user))
            .catch(done)
    })
}

export { initPassport };