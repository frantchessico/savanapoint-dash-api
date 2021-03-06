const  firebase = require('../config/firebase');


module.exports = (req, res, next) => {
  
    
      let idToken;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
      ) {
        idToken = req.headers.authorization.split('Bearer ')[1];
      } else {
        console.error('No token found');
        return res.status(403).json({ error: 'Unauthorized' });
      }
    
     firebase
       .oAuth
        .verifyIdToken(idToken)
        .then((decodedToken) => {
          req.user = decodedToken;
          return firebase.DATABASE
            .collection('users')
            .where('uid', '==', req.user.uid)
            .limit(1)
            .get();
        })
        .then((data) => {
          req.user.userName = data.docs[0].data().handle;
          req.user.photoUrl = data.docs[0].data().imageUrl;
          return next();
        })
        .catch((err) => {
          console.error('Error while verifying token ', err);
          return res.status(403).json(err);
        });
  
};