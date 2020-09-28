const User  = require('../models/Users');
const firebase = require('../config/firebase');
const auth = require('../config/firebase');
const fackePhotoUrl = require('../util/util')
const handlerErrors = require('../util/errrorsHandler');
const BusBoy = require('busboy');

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const os = require('os');



const isEmpty = (string) => {
    if(string.trim() === '') {
        return true;
    } else {
        return false
    }
    }
module.exports = {
   async updateUser(req, res) {

        const {
            userName,
            firstName,
            lastName,
            email,
            phone,
            password } = req.body;

            let errors = {};

            if(isEmpty(email)) {
                errors.email = 'Email must not be empty';
            }
            else if(!handlerErrors.isEmail(email)){
                errors.email = 'Email must  be valid';
            }

            if(isEmpty(password)) {
                errors.password = 'Password must not be empty';
            }
            if(isEmpty(userName)) {
                errors.userName = 'UserName must not be empty';
            }
            if(isEmpty(firstName)) {
                errors.firstName = 'First name must not be empty';
            }
            if(isEmpty(lastName)) {
                errors.lastName = 'Last name must not be empty';
            }
            if(isEmpty(phone)) {
                errors.phone = 'Phone number must not be empty';
            }

            if(Object.keys(errors).length >0 ) {
                return res.status(400).json(errors)
            }
         const uid = auth.AUTHENTICATION.currentUser.uid;


        firebase.DATABASE.collection('users').where('uid', '==', uid).get().then(async user => {
            user.forEach(doc => {
                const user = doc.data()

            firebase.DATABASE.doc(`users/${user.userName}`)
            .update({

                firstName,
                lastName,
                email,
                phone,


            }).then(() => {

                auth.AUTHENTICATION.currentUser.updateProfile({
                    displayName: firstName + ' ' + lastName,
                    photoURL: fackePhotoUrl
                }).then(() => {
                    auth.AUTHENTICATION.currentUser.sendEmailVerification()
                    .then(() => {

                        return res.json({successMessage: 'Your account has been uodate succeffuly'})
                    })
                })
            }).catch(err => {
                return res.json(err)
            })
            })
        })

        },

       async emailUpadet(req, res) {
        const { email } = req.body;

        let errors = {};

        if(isEmpty(email)) {
            errors.email = 'Email must not be empty';
        }
        else if(!handlerErrors.isEmail(email)){
            errors.email = 'Email must  be valid';
        }


        if(Object.keys(errors).length >0 ) {
            return res.status(400).json(errors)
        }

        auth.AUTHENTICATION.currentUser.updateEmail(email)
        .then(() => {

            auth.AUTHENTICATION.currentUser.sendEmailVerification()
            .then(() => {

                return res.json({emailVerifyMessage: 'Please verify your email'})
            }).catch(err => {
                return res.json(err)
            })

        }).catch(err => {
            return res.json(err)
        })
       },

       async resetPassword(req, res) {
        const { email } = req.body;

        let errors = {};

        if(isEmpty(email)) {
            errors.email = 'Email must not be empty';
        }
        else if(!handlerErrors.isEmail(email)){
            errors.email = 'Email must  be valid';
        }


            if(Object.keys(errors).length >0 ) {
                return res.status(400).json(errors)
            }

            auth.AUTHENTICATION.sendPasswordResetEmail(email)
            .then(() => {
                 return res.json({resetPasswordMessage: `Hello, follow this email ${email}, to reset your password`})
            }).catch(err => {
                return res.json(err)
            })

       },


      async isOnUser(req, res) {
          auth.AUTHENTICATION.onAuthStateChanged((user) => {
           if(user) {
               return res.json(user)
           } else {
               return res.json({userOn: 'No user on'})
           }
          })

      },

      async deleteAccount(req, res) {
        const userTodelete = auth.AUTHENTICATION.currentUser;
        const uid = auth.AUTHENTICATION.currentUser.uid;


            firebase.DATABASE.collection('users').where('uid', '==', uid).get()
            .then(userData => {
                userData.forEach(userInffo => {
                 const user = userInffo.data().userName;
                 firebase.DATABASE.doc(`users/${user}`).delete()
                 .then(() => {
                  userTodelete.delete()
                  .then(() => {
                      return res.json({deleteAccountMessage: 'Your account has been deleted succefully'})
                  }).catch(err => {
                      return res.json(err)
                  })
                 })
                })
            })


    },
}



