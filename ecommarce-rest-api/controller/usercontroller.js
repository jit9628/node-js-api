 const connectioninstance=require('../connection db/connectiondb')  // db instance 
 const multerinstance=require('multer'); // instance for file 
 const formidable=require('formidable'); // for file upload 
 const http=require('http');
 const fs = require('fs');
 const multer = require("multer");
const upload = multer({ dest: "uploads/" });
 const pathinstance=require('path'); // instance for directories

 //save user 
 async function saveuser (request,response)  {
        const body=request.body;
        console.log(request.body);
        connectioninstance.query("insert into users(username,email,password) values(?,?,?)",[body.username,body.email,body.password],(error,result,field)=>{
          if(error){
            response.send(error);
          }
          response.send(result);
        })
      }
      //read user
      async function readuser (request, response){
        connectioninstance.query("select * from users", (error, result, field) => {
          if (error) {
            response.send(error);
          }
          response.send(result);
        })
      }
// update user
   async function updateuser (req,res){
    const id=req.params.id;
    const body=req.body;
    connectioninstance
    .query("update users set username=?,email=?,password=? where userid=?",[body.username,body.email,body.password,id],(error,result,field)=>{
  if(error){
    res.send(error);
  }
  console.log(result);
  res.send(result);
    })
   }
   // delete user
   async function deleteuser (req,res){
    connectioninstance
    .query("update users set username=?,email=?,password=? where userid=?",[body.username,body.email,body.password,id],(error,result,field)=>{
  if(error){
    res.send(error);
  }
  res.send(result);
    })
   }
   //file upload end points 
   async function fileupload(req,res){
    const p=path.join(__dirname);
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, '/upload')
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
      }
    })
    res.send(storage);
   }




//    routers.post("/upload_files", upload.array("files"), uploadFiles);

//    async function uploadfiles(){
//     upload.single("file")
//    }
      module.exports={
        saveuser,
        readuser,
        updateuser,
        deleteuser,
        fileupload
      }