const User  = require('../models/Users');
const firebase = require('../config/firebase');
const fackePhotoUrl = require('../util/util')

const cloudinary = require('cloudinary').v2;
const fs = require('fs-extra');
const { options } = require('marked');


cloudinary.config({
    cloud_name:'savanapoint',
    api_key: '797117295819433',
    api_secret: 'sQPHJE8twYd2LaScSFAiAPjZirA'
});




module.exports = {
   async uploadImage(req, res) {


    await cloudinary.uploader.upload(req.file.path,  {width: 500, height: 500, gravity: "face", crop: "fill", quality: 100})
    .then(async (data) =>{
      await cloudinary.uploader.upload(req.file.path)
        console.log(data)

        return res.json({photoURL: data.secure_url})
        }).then(async () => {
             await fs.unlink(req.file.path);
        }).catch(err => {
            return res.json(err)
        })
   },



  //  async uploadImageCover(req, res) {

  //   await cloudinary.uploader.upload(req.file.path)
  //   .then(async (dataUrl) =>{
  //     return res.json({coverPhotoUrl: dataUrl.url})
  //     }).then(async () => {
  //       await fs.unlink(req.file.path);
  //     }).catch(err => {
  //       return res.json(err)
  //     })}
}
