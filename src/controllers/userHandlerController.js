const User  = require('../models/Users');
const  firebase = require('../config/firebase');
const fackePhotoUrl = require('../util/util')
const handlerErrors = require('../util/errrorsHandler');

const authProvider = require('../config/firebase');


const isEmpty = (string) => {
if(string.trim() === '') {
    return true;
} else {
    return false
}
}

module.exports = {
    async createUser(req, res) {

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


            firebase.DATABASE.doc(`users/${userName}`).get()
           .then(user => {
            
               if(user.exists) {
                   return res.json({userNameError: 'UserName was take'})
               } else {
                    firebase.AUTHENTICATION.createUserWithEmailAndPassword(email, password)
                   .then(async userInffo => {
                    const newUser = new User({
                        userName, 
                        firstName,  
                        lastName,  
                        email, 
                        phone,
                        photoUrl: fackePhotoUrl,  
                        password,
                        uid: userInffo.user.uid
                        });
                          
                         await newUser.save().then(async () => {
                            await  firebase.DATABASE.doc(`users/${userName}`)
                            .set({
                                userName, 
                                firstName,  
                                lastName,  
                                email, 
                                phone,
                                photoUrl: fackePhotoUrl,  
                                password,
                                createdAt: Date.now(),
                                 uid: userInffo.user.uid
                            }, { merge: true});

                              
                             await userInffo.user.sendEmailVerification();
                             await userInffo.user.updateProfile({
                                 displayName: firstName + ' ' + lastName,
                                 photoURL: fackePhotoUrl,
                                 phoneNumber: phone,
                             });

                            return res.json({successMessage: 'Please verify your email.'})
                        })
                          
                          
                        
                   }).catch(error => {
                    if(error.code === 'auth/email-already-in-use') {
                        return res.json({error: 'The email was taken'})
                    }
                   })
               }
           }).catch((error) => {
               
              return res.json(error)
           })        
    },


    async login(req, res) {

      

        const { 
            
            email, 
            password } = req.body;

            let errors = {};

            if(isEmpty(email)) {
                errors.email = 'Email must not be empty';
            } else if(!handlerErrors.isEmail(email)){ 
                errors.email = 'Email must  be valid';
            }
            if(isEmpty(password)) {
                errors.password = 'Password must not be empty';
            }
            

            if(Object.keys(errors).length >0 ) {
                return res.status(400).json(errors)
            }


        await  firebase.AUTHENTICATION
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          user.user.getIdToken()
         .then(token => {
            const tokenId = token;
      firebase.oAuth.verifyIdToken(tokenId).then(data => {
         console.log(data)
      })
      
           if(tokenId) {
            res.json(tokenId)
           } else {
              return res.json(errors)
           }
         })
           
        }).catch(error => {
            return res.json(error)
        })
    },

    async getCurrentUser(req, res) {
        const user = await  firebase.AUTHENTICATION.currentUser

        return res.json(user)
    },

    
     async googleAuth(req, res) {
                           
         firebase.oAuth.createUser({
             uid: 'tchessicoone',
            email: 'modifiedUser@example.com',
          
            emailVerified: true,
            password: 'newPassword',
            displayName: 'Jane Doe',
            photoURL: 'http://www.example.com/12345678/photo.png',
            disabled: true
         }).then(user => {
             return res.json(user)
         }).catch(err => {
             return res.json(err)
         })                   
                        
    },
                            


    signOutUser(req, res) {
         firebase.AUTHENTICATION.signOut()
        .then(data => {
            return res.json({successMessage:'User signout successfully'})
        }).catch(err => {
            return res.json(err)
        })
    }
}