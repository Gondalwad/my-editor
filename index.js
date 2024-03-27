    const express = require('express');
    const app = express();
    const parser = require('body-parser');
    const fs = require('fs');
    const cmd = require('node-cmd');;
    
    app.use(parser.urlencoded({extended : true}));
    
    const path = require('path');
    const { error } = require('console');
    
    app.use(express.static(path.join(__dirname,'views')));

    let reader = '';
    let code = '';
    
    app.get('/',(req,res)=>{

      res.render('index.ejs',{reader,code});
    });
    
    app.post('/creator',(req,res)=>{
      // reader = ' '
      code = req.body.code;
      // console.log(x);

      fs.writeFile('main.java', code, (err) => {
        if (err) {
          console.log("Error while writing Java file!");
        } 
        else {

          console.log('Java Written Success');
          cmd.run('java main.java',(eror,data,stderr)=>{
            reader = eror || data;

            res.redirect('/');
          });

        }
      });
      

      // cmd.runSync('javac main.java');
      // cmd.run('java main.java > output.txt',(err)=>{
      //   if (err) cmd.run('java main.java 2> output.txt');
      //   console.log('java file ran success !');
      // });
        
      


    
      // reader = fs.readFileSync('output.txt','utf8');
      
     

    });

    app.listen(3000,'0.0.0.0',()=>{
      console.log("Runnin on port 3000 !");
    });
