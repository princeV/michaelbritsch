'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    path = require('path'),
    config = require(path.resolve('./config/config')),
    mongoose = require('mongoose'),
    Contact = mongoose.model('Contact'),
    User = mongoose.model('User'),
    nodemailer = require('nodemailer'),
    async = require('async'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * send contact form
 */
exports.sendEmailHtml = function (req, res, next) {
    var smtpTransport = nodemailer.createTransport({
        host: config.mailer.options.host,
        port: config.mailer.options.port,
        auth: {
            user: config.mailer.options.auth.user,
            pass: config.mailer.options.auth.pass
        },
        tls: {rejectUnauthorized: false},
        debug: true
    });
    //config.mailer.options);
    var mailOptions = {
        to: config.mailer.to,
        from: config.mailer.from,
        subject: req.body.subject,
        html: req.body.mailBody
    };
    //print vars:
    console.log(config.mailer.options.host);
    console.log(config.mailer.options.port);
    console.log(config.mailer.options.auth.user);
    console.log(config.mailer.options.auth.pass);
    console.log(config.mailer.to);
    console.log(config.mailer.from);

    smtpTransport.sendMail(mailOptions, function (err) {
        if (!err) {
            res.send({
                message: 'Die Nachricht wurde per email gesendet.',
                error: false
            });
        }
        else {
            console.log(err);
            res.send({
                message: 'Die Nachricht konnte leider nicht gesendet werden.',
                error: true
            });
        }
    });
};

exports.getContact = function (emailHTML, user, done) {
    console.log('test');
};
