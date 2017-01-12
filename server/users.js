'use strict';

const db = require('APP/db');
const User = db.model('users');

const {mustBeLoggedIn, forbidden, selfOnly} = require('./auth.filters')

module.exports = require('express').Router()
	// Get all users Admin only
	.get('/', forbidden('only admins can list users'), (req, res, next) =>
		User.findAll()
		.then(users => res.json(users))
		.catch(next))
	// Creates a new user
	.post('/', (req, res, next) =>
		User.create(req.body)
		.then(user => res.status(201).json(user))
		.catch(next))
	// Get your user data if you are logged in user
	.get('/:id', mustBeLoggedIn, selfOnly('get user data'), (req, res, next) =>
		User.findById(req.params.id)
		.then(user => res.json(user))
		.catch(next))
	// Updates a user account logged in user only
	.put('/:id', mustBeLoggedIn, selfOnly('update'), (req, res, next) => {
		User.update(req.body, {
			where: { id: req.params.id },
			returning: true
		})
		.spread((num, updatedUser) => {
			res.status(201).send(updatedUser[0].dataValues);
		})
		.catch(next);
	})
	.delete('/:id', forbidden('only admins can delete users'), (req, res, next) => {
		console.log('IN THE ROUTE', req.params.id);
		User.findById(req.params.id)
		.then(user => user.destroy())
		.then(() => res.sendStatus(200))
		.catch(next)
	})
