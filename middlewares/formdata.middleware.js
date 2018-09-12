// Module to get form-data
let multer = require('multer');
let shortid = require('shortid');
var path = require('path');

exports.upload_account_csv = multer({
    storage: multer.diskStorage({
        destination: 'uploads/account/',
        filename: function(req, file, cb) {
            // user shortid.generate() alone if no extension is needed
            cb(null, shortid.generate());
        }
    }),
    fileFilter: function(req, file, cb) {
        var ext = path.extname(file.originalname);
        if (ext !== '.csv') {
            return cb(false);
        }
        cb(null, true);
    }
});

exports.upload_project_csv = multer({
    storage: multer.diskStorage({
        destination: 'uploads/project/',
        filename: function(req, file, cb) {
            // user shortid.generate() alone if no extension is needed
            cb(null, shortid.generate());
        }
    }),
    fileFilter: function(req, file, cb) {
        var ext = path.extname(file.originalname);
        if (ext !== '.csv') {
            return cb(false);
        }
        cb(null, true);
    }
});

exports.upload_class_csv = multer({
    storage: multer.diskStorage({
        destination: 'uploads/class/',
        filename: function(req, file, cb) {
            // user shortid.generate() alone if no extension is needed
            cb(null, shortid.generate());
        }
    }),
    fileFilter: function(req, file, cb) {
        var ext = path.extname(file.originalname);
        if (ext !== '.csv') {
            return cb(false);
        }
        cb(null, true);
    }
});

exports.upload_course_csv = multer({
    storage: multer.diskStorage({
        destination: 'uploads/course/',
        filename: function(req, file, cb) {
            // user shortid.generate() alone if no extension is needed
            cb(null, shortid.generate());
        }
    }),
    fileFilter: function(req, file, cb) {
        var ext = path.extname(file.originalname);
        if (ext !== '.csv') {
            return cb(false);
        }
        cb(null, true);
    }
});

exports.upload_student_csv = multer({
    storage: multer.diskStorage({
        destination: 'uploads/student/',
        filename: function(req, file, cb) {
            // user shortid.generate() alone if no extension is needed
            cb(null, shortid.generate());
        }
    }),
    fileFilter: function(req, file, cb) {
        var ext = path.extname(file.originalname);
        if (ext !== '.csv') {
            return cb(false);
        }
        cb(null, true);
    }
});

exports.upload_course_format_csv = multer({
    storage: multer.diskStorage({
        destination: 'uploads/course_format/',
        filename: function(req, file, cb) {
            // user shortid.generate() alone if no extension is needed
            cb(null, shortid.generate());
        }
    }),
    fileFilter: function(req, file, cb) {
        var ext = path.extname(file.originalname);
        if (ext !== '.csv') {
            return cb(false);
        }
        cb(null, true);
    }
});

exports.upload_image = multer({
    storage: multer.diskStorage({
        destination: 'uploads/images/',
        filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
    }),
    limits:　{ fileSize: 2 * 1024 * 1024 },
    fileFilter: function(req, file, cb) {
        var ext = path.extname(file.originalname);
        if (ext.toLowerCase() !== '.jpg' && ext.toLowerCase() !== '.jpeg' && ext.toLowerCase() !== '.png') {
            var err = 'Your image type should be .jpg, .jpeg and .png!';
            return cb(err);
        }
        cb(null, true);
    }
});