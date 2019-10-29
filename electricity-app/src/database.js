const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

const connection = mysql.createPool({
  host     : '127.0.0.1',
  user     : 'root',
  port     : '3306',
  password : 'root',
  database : 'electricity_db'
});



connection.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

app.use(bodyParser.json());

app.get('/chargers',(req, res) => {
  let sql = "SELECT * FROM chargers";
  connection.query(sql, (err, results) => {
    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
      
    } else {
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
     
    }
  });
});


var port = parseInt(process.env.PORT, 10) || 4000;
app.set('port', port);
server.listen(port);
app.listen(4000, () => {
 console.log('Go to http://localhost:4000/chargers so you can see the data.');
});

