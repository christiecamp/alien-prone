const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

//api endpoints

//all posts
router.get ('/', async (req, res) => {
    try {
        //join with user data
        const postData = await Post.findAll({
            attributes: ['id', 'title', 'content', 'date'],
            include:[{
                model: Comment,
                attributes: ['id', 'description', 'post_id', 'user_id', 'date'],
                include: {
                    model: User,
                    attributes: ['username']
            }},
            {
                model: User,
                attributes: ['username']
            }]
        });
        //serialize data
        const posts = postData.map((post) => post.get({ plain: true }));
        //render all posts
        // res.status(200).json(posts);
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
        });
        console.log(`
        ============================
        ***** viewing all posts ****
        ============================
                     o   o
                      )-(
                     (O O)
                     '.=/'
                    ..-"-..
                   //.\ /.\\.
                 _//. / \ .\\.
                =./. {,-.}. \.=
                     || ||
                     || ||    
                   __|| ||__ 
                  '---" "---'
        `)
    } catch(err) {
        res.status(500).json(err);
        console.log(err);
    };
});


//post by id
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            attributes: ['id', 'title', 'content', 'date'],
            include: [{
                model: Comment,
                attributes: ['id', 'description', 'post_id', 'user_id', 'date'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }]
        });
        //serialize data
        const post = postData.get({ plain: true });
        res.status(200).render('single-post', {
            post,
            logged_in: req.session.logged_in
        });
        console.log(`
        ================================
        ****** viewing post by id ******
        ================================
         __.,,------.._
      ,'"   _      _   "'.
     /.__, ._  -=- _"'    Y
    (.____.-.'      ""'   j
     VvvvvvV'.Y,.    _.,-'       ,     ,     ,
        Y    ||,   '"l         ,/    ,/    ./
        |   ,'  ,     ;-..,'_,'/___,'/   ,'/   ,
   ..  ,;,,',-'"l,'  ,  .     '     ' ""' '--,/    .. ..
 ,'. '.'---'     ', /  , Y -=-    ,'   ,   ,. .'-..||_|| ..
ffll''. '._        /f ,'j j , ,' ,   , f ,  l=l Y  || ||'||_..
l' l' '.'."'-..,-' j  /./ /, , / , / /l l   l=ll   || '' || ||...
 ''  '   '-._ '-.,-/ ,' /."/-/-/-/-"'''"'.'.  ''.l--''--..''_'' || ,
            "'-_,',  ,'  f    ,   /      '._    ''._     ,  '-.''//         ,
          ,-"'' _.,-'    l_,-'_,,'          ".-._ . ";. /|     '.'; ,       |
        ,',.,-'"          l=) ,;-.         ,    ;-'._;.V |       ; // .. . /j
        |f;l               '._ )-."'.     /|         ;.| |        '.'-||-;;/
        l. l;                 "'._   "'--' j          j' j          '-'---'
         ; ;                     "',-  ,'/       ,-'"  /
                                 ,'",__,-'       /,, ,-'
        `);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});


//login
router.get('/login', (req, res) => {
  //redirect the request to another dashboard if user is already logged in
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
  //will need to move this to dashboard - keeping as placeholder
  console.log(`
  =========================================================
  **************** WELCOME BACK ABDUCTEE! *****************
  =========================================================
                                                             / /
                                                        | | |  /
                                                         ;;_|_/
                                                       ,--/.__/--'
                       _.-/   _   l-._                    .'|
                     .'::(_,-' '-._)::'.                  |:|
                    (:::::::::::::::::::)                .':|
                     l_:::;;;::::;;;:::/    /            |::|
             l        ,---'..'::/..'-.'    /             |::|
              l       l_;:....|'...:_ )   /             .'=||
               l.       )---. )_.--< (   /'             ||=||
                ll     //|:: /--l:::lll //             _||= |
                 ll   ||::;:|----|:/:||/--.______,--==' ; - /
          -._     l'.  ll:|:|-- -|:l:/-.,,ll  .----'//'_.'-'
      l.     '-.   l l _|:|:|-- -|::||::l,,||-'////---' |/'
       ll       '._)l / |l/:|-/|--l:/|. :l_,'---'       /
        ll_      /,,l/:.'ll/-.''-.-//  l |
        /.l-    //,,,' |-.l-'l--/|-/ ./| |             /
         /||-   ||, /| |l. |.-==-.| . /| |            | /
 __  |    /||-  ||,,l- | .  l;;;;/ .  .':/         _,-=/-'
/  ;//    /||-  ' ',-|::l . l,..,/   /: /         /.-'
,--||      /||-/.-.'  l  '._ '--' _.' .'|        //
.--||'.    /||//l '   |-'.___'___' _,'|//       /;
  /.; l     ///l /     ll_'-.'--'-'_==|'       /;'
 / |.; l.   //l /       l_l__)l'==-_'_|       / /
  .'  ;.='./|l /          l.-- l--._/_/------( /
       ;.=| '_/|-          |l.-| -/| '--------'
        ;l' ./|-/-         |l.-| |-|     ________
         '--' |=|'        _|l.-| |-|----'.-._ ...'-.
             -|-|-     .-':'-;-| |./.-.-( | ||..|=-..
             ''= /'   / ,--.:|-| ||_|_|_|_|-'__ .'-._)
              /|-|- .' /l l l|-'' ll ____,---'  '-. ..|
               /l=l/..'l l_>-''-l l'              . .|
               ',-':/l'.>' |l/ l/l l              '- |
               //::/l l/_/|-' l/| l '.            / ||
              / (:|l l/) l l|.'-'  '-ll          |;:|._
             || |:'-/:.'-|-' l|       ll          '';_.-'-._
             ll=/:_/::/l| l|          |ll            '-._ ='-._
              l_)' |:|                | //               '--.__'-.
                   |:|                                         ).|
                   /;/                                         / (._
                  / /                                         |..;;_'-.
                _/ /                                          ' '---;.-;
               /::||       
              /:::/
             //;;'
            '-'
  `);
});


//signup
router.get('/signup', async (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/dashboard');
		return;
	}
	res.render('signup');
    console.log(`
    =========================================================
    *************** WELCOME TO ALIEN PRONE! *****************
    =========================================================
                                .do-"""""'-o..                         
                             .o""            ""..                       
                           ,,''                 ''b.                   
                          d'                      '.b                   
                         d.d:                       .b.                 
                        ,,dP                         'Y.               
                       d'88                           '8.               
 ooooooooooooooooood888'88'                            '88888888888bo, 
d"""    '""""""""""""Y:d8P                              8,          'b 
8                    P,88b                             ,'8           8 
8                   ::d888,                           ,8:8.          8 
:                   dY88888                           '' ::          8 
:                   8:8888                               'b          8 
:                   Pd88P',...                     ,d888o.8          8 
:                   :88'dd888888o.                d8888.88:          8 
:                  ,:Y:d8888888888b             ,d88888:88:          8 
:                  :::b88d888888888b.          ,d888888bY8b          8 
                    b:P8;888888888888.        ,88888888888P          8 
                    8:b88888888888888:        888888888888'          8 
                    8:8.8888888888888:        Y8888888888P           8 
,                   YP88d8888888888P'          ""888888"Y            8 
:                   :bY8888P"""""''                     :            8 
:                    8'8888'                            d            8 
:                    :bY888,                           ,P            8 
:                     Y,8888           d.  ,-         ,8'            8 
:                     .8)888:           '            ,P'             8 
:                      .88888.          ,...        ,P               8 
:                       .Y8888,       ,888888o     ,P                8 
:                         Y888b      ,88888888    ,P'                8 
:                          .888b    ,888888888   ,,'                 8 
:                           .Y88b  dPY888888OP   :'                  8 
:                             :88.,'.   .' .8P-.b.                   8 
:.                             )8P,   ,b '  -   ..b                  8 
::                            :':   d,'d'b, .  - ,db                 8 
::                            .b. dP' d8':      d88'                 8 
::                             '8P" d8P' 8 -  d88P'                  8 
::                            d,' ,d8'  ''  dd88'                    8 
::                           d'   8P'  d' dd88'8                     8 
 :                          ,:   ';   d:ddO8P' .b.                   8 
 :                  ,dooood88: ,    ,d8888""    ...b.                8 
 :               .o8"'""""""Y8.b    8 '"''    .o'  '"""ob.           8 
 :              dP'         .8:     K       dP''        "'Yo.        8 
 :             dP            88     8b.   ,d'              ''b       8 
 :             8.            8P     8""'  '"                 :.      8 
 :            :8:           :8'    ,:                        ::      8 
 :            :8:           d:    d'                         ::      8 
 :            :8:          dP   ,,'                          ::      8 
 :            '8:     :b  dP   ,,                            ::      8 
 :            ,8b     :8 dP   ,,                             d       8 
 :            :8P     :8dP    d'                       d     8       8 
 :            :8:     d8P    d'                      d88    :P       8 
 :            d8'    ,88'   ,P                     ,d888    d'       8 
 :            88     dP'   ,P                      d8888b   8        8 
 '           ,8:   ,dP'    8.                     d8''88'  :8        8 
             :8   d8P'    d88b                   d"'  88   :8        8 
             d: ,d8P'    ,8P""".                      88   :P        8 
             8 ,88P'     d'                           88   ::        8 
            ,8 d8P       8                            88   ::        8 
            d: 8P       ,:  -hrr-                    :88   ::        8 
            8',8:,d     d'                           :8:   ::        8 
           ,8,8P'8'    ,8                            :8'   ::        8 
           :8'' d'     d'                            :8    ::        8 
           '8  ,P     :8                             :8:   ::        8 
            8, '      d8.                            :8:   8:        8 
            :8       d88:                            d8:   8         8 
 ,          '8,     d8888                            88b   8         8 
 :           88   ,d::888                            888   Y:        8 
 :           YK,oo8P :888                            888.  'b        8 
 :           '8888P  :888:                          ,888:   Y.       8 
 :            ''''   '888b                          :888:   'b       8 
 :                    8888                           888:    ::      8 
 :                    8888:                          888b     Y.     8, 
 :                    8888b                          :888     'b     8: 
 :                    88888.                         '888,     Y     8: 
 ..................--"""""'----------------------'""""""""'"""''"""""
    `);
});

module.exports = router;