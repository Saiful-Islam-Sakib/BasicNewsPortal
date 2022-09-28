const dboperations = require('./dbOperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request,response,next)=>{
   console.log('middleware');
   next();
})

router.route('/getUsers').get((request,response)=>{
    dboperations.getUsers().then(result => {
       response.json(result != undefined ? result[0] : null);
    })
})

router.route('/getUserbyLoginID/:loginid').get((request,response)=>{
   dboperations.getUserbyLoginID(request.params.loginid).then(result => {
      response.json(result != undefined ? result[0] : null);
   })
})

router.route('/getPosts/:id').get((request,response)=>{
    dboperations.getPosts(request.params.id).then(result => {
       response.json(result != undefined ? result[0] : null);
    })
})

router.route('/getPostsWithAuthorName').get((request,response)=>{
   dboperations.getPostsWithAuthorName().then(result => {
      response.json(result != undefined ? result[0] : null);
   })
})

router.route('/getPost/:id').get((request,response)=>{
   dboperations.getPost(request.params.id).then(result => {
      response.json(result != undefined ? result[0] : null);
   })
})

router.route('/savePost').post((request,response)=>{
    let post = {...request.body}

    dboperations.savePost(post).then(result => {
       response.status(200).json(result);
    })
})

router.route('/saveUser').post((request, response)=>{
   let user = {...request.body}

   dboperations.getUserbyLoginID(user.loginid).then(result => {
      if(result == undefined){
         dboperations.saveUser(user).then(result => {
            response.status(200).json(result);
         })
      }else {
         response.status(201).json('same login id exists');
      }
   })
})

router.route('/updatePost').post((request,response)=>{
   let post = {...request.body}

   dboperations.updatePost(post).then(result => {
      response.status(200).json(result);
   })
})

router.route('/deletePost/:id').delete((request, response)=>{
   dboperations.deletePost(request.params.id).then(result => {
      response.status(200).json(true);
   })
})

var port = process.env.PORT || 5000;
app.listen(port);
console.log(`News Portal API is running at ${port}`);
