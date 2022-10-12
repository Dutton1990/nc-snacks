const db = require("../db/index.js")

function fetchDrinkById(id){
   console.log('in the model')
   return db.query(`SELECT * FROM drinks WHERE drink_id=$1;`, [id])
   .then(({rows}) => {
      if (rows.length === 0) {
         return Promise.reject({status: 404, msg: '404 not found'})
      }
    return rows[0]
   })
}

module.exports = fetchDrinkById