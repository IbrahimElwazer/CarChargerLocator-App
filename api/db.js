'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Palestine123',
    database : 'electricity_db'
});

connection.connect(function(err) {
    if (err) throw err;
});

const api = {
  query: (query, ...parameters) =>
  {
    let promise = new Promise(function(resolve, reject) {
      pool.query(query, ...parameters, (error, results, fields) => {
        if(error) {
          reject(error)
        };
    
        resolve(results);
      })
    });

    return promise;
  }
};

module.exports = connection; 