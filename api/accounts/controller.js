require('dotenv').config();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const queries = require("./queries");
const nodemailer  = require('nodemailer');

const mailHost = {
    host: 'smtp.gmail.com',
    port: '587',
    auth: {
      user: process.env.CONTACT_EMAIL,
      pass: process.env.CONTACT_PASSWORD
    }
  } 

const registerNewUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const saltRounds = 10;
    const mailOptions = {
        from: process.env.CONTACT_EMAIL,
        subject: 'Welcome to Flibyrd', 
        text: 'Thanks for making an account with us!',
        to: email
    }
    const transporter = nodemailer.createTransport(mailHost);
    if (!email || !password || !firstName || !lastName) return res.status(400).json({type: 'error', message: 'All fields are essential for authentication.'});
    try {
        bcrypt.genSalt(saltRounds, (error, salt) => {
            if (error) return res.status(400).json({ error: 'generate salt error' });
            bcrypt.hash(password, salt, (error, hash) => {
                if (error) return res.status(400).json({ error: 'bcrypt hashing error' });
                pool.query(queries.registerUser, [email, firstName, lastName, hash], (error, result) => {
                    if (error) return res.status(400).json({ error: 'db insertion error' });
                    else if (result.rows.length === 0) {
                        return res.status(400).json({ error: 'email already exists'})
                    }
                    else {
                        const token = jwt.sign({
                            email: email,
                        }, 
                        process.env.TOKEN_SECRET
                        );
                        transporter.sendMail(mailOptions, function(error, info) {
                            if (error) {
                                console.log(error)
                            } else {
                                console.log('email was sent')
                            }
                        })
                        return res.status(200).json({
                            message: 'Made new user!',
                            token: token,
                            email: email,
                            firstName: firstName,
                            lastName: lastName,
                        })
                    }
                })
            })
        })
    } catch (err) {
            res.status(500).json({
                error: "Database error occurred while signing in!", //Database connection error
                });
        }
}

const loginUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) return res.status(400).json({type: 'error', message: 'password and email fields are essential for authentication.'})
    try {
        pool.query(queries.findUser, [email], (error, results) => {
            const user = results.rows[0];
            if (error) return res.status(400).json({
                error: "User is not registered, Sign Up first",
            }); 
            else if( !results.rows[0] || !user) {
                return res.status(200).json({
                    message: 'user is not registered. Please sign up'
                    })
                }
            else {
                
                if (user !== null || results.rows[0].length > 0) {
                    bcrypt.compare(password, user.password, (err, result) => {
                        if (err) {
                           return res.status(500).json({
                                error: 'passwords do not match'
                            });
                        } else if (result === true) {
                            const token = jwt.sign({
                                email: email,
                            },
                            process.env.TOKEN_SECRET
                            );
                           return res.status(200).json({
                                message: "User signed in!",
                                token: token,
                                email: user.email,
                                firstName: user.first_name,
                                lastName: user.last_name,
                            });
                        } else {
                            return res.status(400).json({
                                error: 'enter correct password!'
                            })
                        }
                    })
                } 
            } 
        });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                error: "Database error occurred while signing in!", //Database connection error
                });
            };
    };

const meRoute = async (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(400).json({type: 'error', message: 'x-access-token header not found.'})
    jwt.verify(token, process.env.TOKEN_SECRET, (error, result) => {
        if (error) return res.status(403).json({type: 'error', message: 'Provided token is invalid.', error});
        return res.json({
            type: 'success',
            message: 'Provided token is valid.',
            result
        })
        })
}

const deleteUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) return res.status(400).json({type: 'error', message: 'password and email fields are essential for authentication.'})
    try {
        pool.query(queries.findUser, [email], (error, results) => {
            if (error) return res.status(400).json({
                error: "User is not registered, Sign Up first",
            }); else {
                const user = results.rows[0];
                if (user.length !== 0) {
                    bcrypt.compare(password, user.password, (err, result) => {
                        if (err) {
                            return res.status(500).json({
                                error: 'passwords do not match'
                            })
                        } else if (result === true) {
                            pool.query(queries.deleteUser, [email], (error, result) => {
                                if (error) return res.status(400).json({
                                    error: 'email could not be deleted'
                                });
                                return res.status(200).json({
                                    message: "Account Deleted. Sorry to See You Go!",
                                    email: user.email,
                                    firstName: user.first_name,
                                    lastName: user.last_name,
                                })
                            })
                        }
                    })
            }
        }
    })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error occurred while signing in!", //Database connection error
            });
        };
}

module.exports = {
    registerNewUser,
    loginUser,
    meRoute,
    deleteUser
}