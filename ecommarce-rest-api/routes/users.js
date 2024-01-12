const express = require('express');
const {saveuser,readuser,deleteuser,fileupload, updateuser}=require('../controller/usercontroller');
const routes = express.Router();
// save 
routes.post('/save', saveuser);
//read
routes.get('/read', readuser);
 // update 
 routes.put('/updateuser/:id', updateuser);
//delete
routes.delete('/delete:id', deleteuser);
//upload file
 routes.get('/fileupload', fileupload);
module.exports = routes;