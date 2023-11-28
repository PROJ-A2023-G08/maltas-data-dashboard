const express = require('express');
const { db } = require('utils/db');
const fs = require('fs');

const router = express.Router();

router.get('/test', async (req, res) => {
  console.log("this is test");
});

router.post('/saveData',  async (req, res) => {
  try { 
    console.log('here');
    const rawData = fs.readFileSync('csvjson.json');
    const jsonData = JSON.parse(rawData);
    return await db.data.createMany({
      data: jsonData,
    });
    res.json({ message: 'Data saved', insertedCount: result.count });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

/*function processAndFilterData(data) {
  return data.filter(item => item.value > 30);
}*/

//const csv = require('csv-parser');
//const fs = require('fs');
//const results = [];
//console.log('works!');
/*const readCSV = () => {
    fs.createReadStream('data.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            console.log(results.length);
        });
}*/
/*async function getDataFromCSV(req, res, next) {
    const readCSV = () => {
      fs.createReadStream('data.csv')
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', () => {
              console.log(results.length);
          });
  }*/
    /*const responce = await fetch('data.csv');
    const data = responce.text();
    console.log(data);*/
//}
 /* module.exports = {
    getDataFromCSV
  };*/