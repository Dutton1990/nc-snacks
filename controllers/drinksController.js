const fetchDrinkById = require("../models/drinksModel")

function getDrinkById(req, res, next){
    const { drink_id } = req.params
    fetchDrinkById(drink_id).then((drink) => {
       res.status(200).send({drink})
    }).catch((err) => {
        next(err)
    })
}



module.exports = getDrinkById