const path = require('path')
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./lib/controllers');
const helpers = require('./lib/utils/helpers');
//sequelize connection
const sequelize = require('./lib/config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const probe = express();
const PORT = process.env.PORT || 3013;


/////// add detailed comments for all of the below ////////////

//handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

//session object
const sess = {
    secret: 'Alien abduction secret',
    //HTTP cookie (web cookie, browser cookie) is a small piece of data that a server sends to a user's web browser. 
    cookie: {
      maxAge: 300000, //max age of the session
      httpOnly: true, 
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };
  
probe.use(session(sess)); //pass session

//inform Express.js on which template engine to use
probe.engine('handlebars', hbs.engine);
probe.set('view engine', 'handlebars');

//////////////////////////////////////////////////////////////////

probe.use(express.json());
probe.use(express.urlencoded({ extended: true }));
//serving static files
probe.use(express.static(path.join(__dirname, 'public')));
probe.use(routes);

//sequelize models synced to database
sequelize.sync({ force: false }).then(() =>{
  //start server
  probe.listen(PORT, () => console.log(`
  
============================================================
******************* ALIEN PRONE's BACK END *****************
============================================================
.     .       .  .   . .   .   . .    +  .
  .     .  :     .    .. :. .___---------___.
       .  .   .    .  :.:. _".^ .^ ^.  '.. :"-_. .
    .  :       .  .  .:../:            . .^  :.:\.
        .   . :: +. :.:/: .   .    .        . . .:\
 .  :    .     . _ :::/:               .  ^ .  . .:\
  .. . .   . - : :.:./.                        .  .:\
  .      .     . :..|:                    .  .  ^. .:|
    .       . : : ..||        .                . . !:|
  .     . . . ::. ::\(                           . :)/
 .   .     : . : .:.|. ######              .#######::|
  :.. .  :-  : .:  ::|.#######           ..########:|
 .  .  .  ..  .  .. :\ ########          :######## :/
  .        .+ :: : -.:\ ########       . ########.:/
    .  .+   . . . . :.:\. #######       ####cc##..:/
      :: . . . . ::.:..:.\           .   .   ..:/
   .   .   .  .. :  -::::.\.       | |     . .:/
      .  :  .  .  .-:.":.::.\             ..:/
 .      -.   . . . .: .:::.:.\.           .:/
.   .   .  :      : ....::_:..:\   ___.  :/
   .   .  .   .:. .. .  .: :.:.:\       :/
     +   .   .   : . ::. :.:. .:.|\  .:/|
     .         +   .  .  ...:: ..|  --.:|
.      . . .   .  .  . ... :..:.."(  ..)"
 .   .       .      :  .   .: ::/  .  .::\


  NOW OPEN
  http://localhost:${PORT}`));
});
  
  