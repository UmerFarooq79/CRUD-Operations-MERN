const User = require('../models/user.model');
const errorHandler = require('../dbErrorHandler/dbErrorHandler')
const extend = require('lodash')

const list = async (req, res) => {
    try {
      let users = await User.find().select('name email updated created')
      res.json(users)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  }
  const create = async (req, res) => {
    const user = new User(req.body)
    try {
      await user.save()
      return res.status(200).json({
        message: "User Added Successfully!"
      })
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  }

  const userByID = async (req, res, next, id) => {
    try {
      let user = await User.findById(id)
      if (!user)
        return res.status('400').json({
          error: "User not found"
        })
      req.profile = user
      next()
    } catch (err) {
      return res.status('400').json({
        error: "Could not retrieve user"
      })
    }
  }

  const read = (req, res) => {
     return res.json(req.profile)
  }

  const update = (req, res) => {
    User.findById(req.params.id, function (err, user) {
        if (!user)
        return next(new Error('Unable To Find User With This Id'));
        else {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.phone = req.body.phone;
        
        user.save().then(emp => {
        res.json('User Updated Successfully');
        })
        .catch(err => {
        res.status(400).send("Unable To Update User");
        });
        }
        });
        };
  



  const remove = async (req, res) => {
    try {
      let user = req.profile
      let deletedUser = await user.remove()
      res.json(deletedUser)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  }


 

 module.exports={list, create, userByID, read, update ,remove}