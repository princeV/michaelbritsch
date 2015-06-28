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
 * Create a Contact
 */
exports.create = function (req, res) {
    var contact = new Contact(req.body);
    contact.user = req.user;
    contact.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(contact);
        }
    });
};

/**
 * Contact middleware
 */
exports.contactById = function (req, res, next, id) {
    Contact.findById(id).populate('user', 'displayName').exec(function (err, contact) {
        if (err) return next(err);
        if (!contact) return next(new Error('Failed to load Contact ' + id));
        req.contact = contact;
        next();
    });
};

/*
 * Show the current Contact
 */
exports.read = function (req, res) {
    res.jsonp(req.contact);
};

/**
 * Delete a Contact
 */
exports.delete = function (req, res) {
    var contact = req.contact;

    contact.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(contact);
        }
    });
};

/**
 * Update a Contact
 */
exports.update = function (req, res) {
    var contact = req.contact;
    contact = _.extend(contact, req.body);
    contact.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(contact);
        }
    });
};

/**
 * List all Contacts
 */
exports.list = function (req, res) {
    Contact.find().sort('-created').populate('user', 'displayName').exec(function (err, contacts) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(contacts);
        }
    });
};


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
