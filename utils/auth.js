const withAuth = (req, res, next) => {
    //if user is not logged in - redirect request to login route
    if (!req.session.logged_in) { //user_id?
      res.redirect('/login');
    } else {
        //next if user is authenticated
      next();
    }
  };
  
  module.exports = withAuth;