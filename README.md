<p align="center">
<img src="./abductions/branding/header.png"/>
</p>

[![License: mit](https://img.shields.io/badge/license-mit-blue?)](https://opensource.org/licenses/MIT) 
[![Node.js Badge](https://img.shields.io/badge/node-darkblue?logo=nodedotjs&logoColor=fff&style=flat)](https://nodejs.org/en)
[![MySql Badge](https://img.shields.io/badge/mysql-neon.svg?&logo=Mysql&logoColor=white)](https://www.mysql.com)
[![Express.js Badge](https://img.shields.io/badge/express-skyblue.svg?&logo=Express&logoColor=white)](https://expressjs.com/)
[![Sequelize Badge](https://img.shields.io/badge/sequelize-cyan.svg?&logo=Sequelize&logoColor=white)](https://canva.com)

[![Dotenv Badge](https://img.shields.io/badge/dotenv-orchid.svg?&logo=Dotenv&logoColor=white)](https://canva.com)
[![Nodemon Badge](https://img.shields.io/badge/nodemon-plum.svg?&logo=Nodemon&logoColor=white)](https://www.npmjs.com/package/nodemon)
[![Insomnia Badge](https://img.shields.io/badge/insomnia-orange.svg?&logo=Insomnia&logoColor=white)](https://canva.com/) 
[![Insomnia Badge](https://img.shields.io/badge/heroku-crimson.svg?&logo=Insomnia&logoColor=white)](https://canva.com/) 
[![Canva Badge](https://img.shields.io/badge/canva-hotpink.svg?&logo=Canva&logoColor=white)](https://canva.com/)

[![View Badge](https://img.shields.io/badge/view-darkmode-purple.svg?&logo=Github&logoColor=white)](https://canva.com/) 


### ![table-of-contents](./abductions/branding/toc.png)

  - [OVERVIEW](#overview)
    - [*user story*](#user-story)
    - [*acceptance criteria*](#acceptance-criteria)
    - [*probe-list*](#borea-list)
  - [INSTALLATION](#installation)
  - [USAGE](#usage)
    - [*screenshot*](#screenshot)
    - [*demo*](#demo)
  - [TESTING](#testing)
  - [SOURCES](#sources)
  - [LICENSE](#license)
  - [LINKS](#links)
  - [CONNECT](#connect)

### ![overview](./abductions/branding/1.png)

`ALIEN PRONE` is a CMS style blog site for abductee's to publish UFO sightings, recent abductions, thoughts & opinions. The app follows the MVC paradigm in its architectural structure, using [Handlebars.js]() as the templating language,[Sequelize](https://www.npmjs.com/package/sequelize) as the ORM, and the [express-session](https://www.npmjs.com/package/express-session) npm package for authentication.

* [express-handlebars](https://www.npmjs.com/package/express-handlebars) package to implement [Handlebars.js]() for *views*.

* [MySQL2](https://www.npmjs.com/package/mysql2) and [Sequelize](https://www.npmjs.com/package/sequelize) packages to connect  to `ALIEN PRONE's` **database** for *models*

* [Express.js]() API for *controllers*.

* [dotenv](https://www.npmjs.com/package/dotenv) package to use environment variables to **store sensitive data**, [bcrypt package](https://www.npmjs.com/package/bcrypt) to **hash passwords**, & [express-session](https://www.npmjs.com/package/express-session) and  [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize) packages to add **authentication**.

#
>The [express-session](https://www.npmjs.com/package/express-session) package stores the session data on the client in a cookie - when an abductee is idle on `ALIEN PRONE` for more than a set time, the cookie will expire and the abductee will be required to log in again to start a new session.
#



### ![user-story](./abductions/branding/9.png)
<!-- <p align="center">
  <img src="./abductions/branding/user-story.png"/>
</p> -->

### ![acceptance-criteria](./abductions/branding/10.png)
<!-- <p align="center">
  <img src="./abductions/branding/ac.png"/>
</p> -->

### ![probe-list](./abductions/branding/11.png)
<!-- <p align="center">
  <img src="./abductions/branding/probe-list.png"/>
</p> -->

#