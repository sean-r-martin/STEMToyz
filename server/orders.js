'use strict'

const db = require('APP/db');
const Order = db.model('orders');

const { forbidden, mustBeLoggedIn } = require('./auth.filters');

module.exports = require('express').Router()
    .get('/', forbidden('only admin can view all cart by all users'), (req, res, next) =>
        Order.findAll()
        .then(orders => res.json(orders))
        .catch(next))
    .get('/:userId', mustBeLoggedIn, (req, res, next) => //review: authenticated user vs. unauthenticated user
         Order.findAll({
          where: {
            user_id: req.params.userId
          }
         })
         .then(userOrders => res.json(userOrders))
         .catch(next))
    .post('/:userId', (req, res, next) =>
          Order.create(req.body)
          .then(createdOrder => res.status(201).json(createdOrder))
          .catch(next))
    .delete('/:userId', mustBeLoggedIn, (req, res, next) =>  // review: authenticated user vs. unauthenticated user
        Order.findAll({
          where: {
            user_id: req.params.userId
          }
         })
         .then(userOrders => res.json(userOrders))
         .catch(next))
    .get('/current?status', forbidden('only admin can view orders status'), (req, res, next) =>
        Order.findAll({
          where:{
            status: req.query.status
          }
        })
        .then(orders => res.json(orders))
        .catch(next))
    .put('/:id', forbidden('only admin can change status of an order'), (req, res, next) =>
         Order.findById(req.params.id)
          .then(foundOrder => res.json(foundOrder))
          .catch(next));
