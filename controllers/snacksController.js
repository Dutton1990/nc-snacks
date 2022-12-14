
const {fetchSnacks, insertSnack} = require('../models/snacksModel');


function getSnacks(request, response) {
  fetchSnacks().then((snacks) => {
    response.status(200).send({ snacks });
  });
}

function postSnack(request, response){
  const newSnack = request.body
  insertSnack(newSnack).then((snack) => {
    response.status(201).send({snack})
  })
}

module.exports = {getSnacks, postSnack};
