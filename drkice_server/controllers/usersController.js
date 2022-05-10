const User = require('../models/user');
const jsonWebToken = require('jsonwebtoken');
const passport = require('passport');

const getUserParams = (body) => {
  return {
    name: {
      first: body.first,
      last: body.last,
      nick: body.nickName
    },
    email: body.email
  }
}

module.exports = {
  index: ( req, res, next ) => {
    User.find({})
        .then( users => {
          res.locals.users = users;
          next();
        })
        .catch( err => {
          next(err);
        })
  },
  api: ( req, res ) => {

    res.json({
      data: res.locals,
      status: 200
    });

  },
  apiError: ( err, req, res, next ) => {

    let errorObject;

    if(err) {
      errorObject = {
        status: 500,
        message: err.message
      };
    } else {
      errorObject = {
        status: 500,
        message: 'Unknown Error.'
      };
    }

    res.json(errorObject);

  },
  register: ( req, res, next ) => {

    console.log(req.body)
    let newUser = new User(getUserParams(req.body));

    User.register( newUser, req.body.password, ( err, user ) => {
      if( user ) {
        res.json({
          content: user._id,
          status: 200
        });
        next();
      } else {
        res.json({
          status: 500,
          message: err.message
        });
        next();
      }
    })
  },
  apiAuth: ( req, res, next ) => {

    passport.authenticate('local', ( err, user ) => {

      if(user) {

        let signedToken = jsonWebToken.sign(
          {
            data: user._id,
            exp: new Date().setDate(new Date().getDate() + 1)
          },
          process.env.JWT_SECRET
        );
        
        req.session.user = user

        res.json({
          status: 200,
          data: { 
            token: signedToken,
            user: user
          }
        });

      } else {
        res.json({
          status: 401,
          message: 'Could not authanticate user.'
        });
      }
    })(req, res, next);

  },
  verifyJWT: ( req, res, next ) => {

    let token = req.headers['x-access-token'];

    console.log('JWT token: ' + token);

    if(token) {
      jsonWebToken.verify(
        token,
        process.env.JWT_SECRET,
        (errs, paylode) => {
          if(paylode) {
            User.findById(paylode.data).then(user => {
              if(user) {
                next();
              } else {
                res.status(403).json({
                  status: 403,
                  message: 'No User account found.'
                });
              }
            });
          } else {
            res.status(401).json({
              status: 403,
              message: 'Cannot verify API token.'
            });
            next();
          }
        }
      );
    } else {
      res.status(401).json({
        status: 403,
        message: 'Provide Token'
      });
    }
  },
  show: ( req, res, next ) => {

    let userId = req.params.userId

    User.findById(userId)
        .then( user => {
          res.json({
            status: 200,
            data: user
          })
          next();
        })
        .catch( err => {
          res.json({
            status: 403,
            message: 'No user found.'
          })
          next()
        })
  },
  showMe: ( req, res, next ) => {

    if ( req.session.user ) {

      let user = req.session.user

      console.log(user._id)

      User.findById( user._id )
          .then( user => {
            res.json({
              status: 200,
              data: user
            });
            next()
          })
          .catch( err => {
            res.json({
              status: 403,
              message: "No user found."
            })
            next(err)
          })
    } else {
      res.json({
        status: 403,
        message: 'Provide token'
      })
      next();
    }
  
  },
  logout: ( req, res, next ) => {

    req.session.destroy(err => {
      if (err) {
        res.status(400).json({
          status: 400,
          message: 'Could not logout user.'
        })
      } else {
        res.json({
          status: 200,
          message: 'User successfully logout!'
        })
      }
    });

  }

}