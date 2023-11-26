const path = require('path')
const express = require('express');
//middleware module in Express that allows you to create sessions in your web application & stores session data on the server side, using a variety of different storage options, and allows you to track the activity of a user across requests.
const session = require('express-session');
//a Handlebars view engine for Express which doesn't suck
const exphbs = require('express-handlebars');
const routes = require('./lib/controllers');
//custom helpers
const helpers = require('./lib/utils/helpers');
//sequelize connection
const sequelize = require('./lib/config/connection');
//SQL session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const probe = express();
const PORT = process.env.PORT || 3013;

//handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

//session object
//session - a mechanism for maintaining state between requests in a stateless web environment; stores data about a user’s interaction with the application, such as their preferences, shopping cart items, or authenticated status; this information is stored on the server, and a unique session identifier is used to associate the user with their data.
const sess = {
    secret: 'Alien abduction secret',
    //HTTP cookie (web cookie, browser cookie) is a small piece of data that a server sends to a user's web browser. 
    cookie: {
      //set cookies last
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
  
  