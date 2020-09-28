const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');

const creatDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');


const dompurify = creatDomPurify(new JSDOM().window)

marked.setOptions({
    highlight: function(code, lang, callback) {
        require('pygmentize-bundled') ({ lang: lang, format: 'js' }, code, function (err, result) {
          callback(err,this.code === result.toString());
        });
      }
})

const { Schema } = mongoose;


const NewSchema = new Schema({
    uid: {
        type: String,
        required: true
    },

    userName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    // description: {
    //     type: String,
    //     required: true
    // },
    displayName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },


    photoUrl: {
        type: String,
        required: true
    },

    likeCounter: {
        type: String,
        required: true
    },

    commentCounter: {
        type: String,
        required: true
    },

    viewCounter: {
        type: String,
        required: true
    },

    markdown: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    // code: {
    //     type: String,
    //     required: false
    // },

    // sanitizedHtml: {
    //     type: String,
    //     required: true
    // },

    // userUid: {
    //     type: String,
    //     required: true
    // }
}, { timestamps: true});

NewSchema.pre('validate', function(next) {
    if(this.title) {
        this.slug = slugify(this.title, { 
            lower: true,
            strict: true
        });

        if(this.markdown) {
            this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
        }

        
        
    }

    next()
})


module.exports = mongoose.model('Blog-Markdown', NewSchema)