const db = require('../db/index');

function fetchSnacks() {
  return db.query('SELECT * FROM snacks').then(({ rows: snacks }) => {
    return snacks;
  });
}

function insertSnack(newSnack) {
  const { snack_name, snack_description } = newSnack;

  return db
    .query(
      `INSERT INTO snacks (snack_name, snack_description)
  VALUES ($1, $2) RETURNING *;`,
      [snack_name, snack_description]
    )
    .then(({ rows: snack }) => {
      return snack[0]
    });
}

module.exports = { fetchSnacks, insertSnack };
