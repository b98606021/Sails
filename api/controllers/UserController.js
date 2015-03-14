/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

/**
 * Why we only need  set "new" to get the url "user/new"?
 * because this controller(API) is for "user"
 */
module.exports = {
	'new': function (req, res ) {
		res.locals.flash = _.clone(req.session.flash);
		res.view();
		req.session.flash = {};
	},

	create: function (req, res, next) {
		// create a User with the params sent from
		// the sign-up form --> new.js
		User.create( req.params.all(), function userCreated(err, user){
			//If there's an err
			if (err) {
				console.log(err);
				req.session = {
					err: err
				}
				// if error
				return res.render('user/new');
			}
			// After successfully creating the user
			// redirect to the show action
			res.json(user);
			req.session.flash = {};
		});
	}
};

