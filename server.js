// server js fajl (model/controller)
require('dotenv').config({ silent: true });

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
var data = require('./src/data/db.json');  // Transformeri
const fs = require('fs');  // za update json dokumenta/baze

if (process.env.NODE_ENV === 'development') {  // za dev
  require('./webpack-dev-middleware').init(app);
}
if (process.env.NODE_ENV === 'production') {  // za production
  app.use('/dist', express.static(path.join(__dirname, 'dist')));
}

app.use('/public', express.static(path.join(__dirname, 'public')));

var parser = bodyParser.urlencoded({extended: false}); 
var jsonParser = bodyParser.json();


// main stranica
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// API za Transformere
app.get('/api', function(req, res) {
  res.json(data);  
});

// API za update status
app.post('/api', jsonParser, function(req, res) { // poslano u JSON formatu, parsa u typeof js object
  var item = req.body.data.id; // id kliknutog transformera
  
  // promijeni status kliknutog transformera u učitanoj bazi u poslanu vrijednost sadržanu u 'value'..
  // 'data' je još uvijek typeof js object, da može usporediti poslani id sa id u bazi
  data.transformers[item].status = req.body.value; 
  
  let updated = JSON.stringify(data, null, 2); // pretvori u JSON.. null i 2 služi da zadrži čitljivu JSON strukturu (ne minimizira u jedan red, 2 je intendation)
  fs.writeFileSync(__dirname + '/src/data/db.json', updated); // i updataj bazu db.json 
    
  // updatanje baze je sinhrono (writeFileSync), tek kada završi pošalje novu bazu na front-end
  res.send(data); 
});


// Add new Transformer
app.post('/new', jsonParser, function(req, res) {
  let poslano = req.body;

  // dodaj pri svakom novom unosu novi id transformer array id-a (da se array id brojevi ne 'tuku' ako je brisao prethodne unose)
  data.transId++;  
  let newTransId = data.transId;  // kopiraj novi id u novi transformer object (počinjemo transId od 2 jer su tri unosa defaultno već u bazi)
  poslano.id = newTransId;
  poslano.status = 'OK';
 
  data.transformers[newTransId] = poslano;
  let updated2 = JSON.stringify(data, null, 2);
  fs.writeFileSync(__dirname + '/src/data/db.json', updated2);

  res.send(data);
}); 


// Edit Transformer
app.post('/edit', jsonParser, function(req, res) {
  let poslano = req.body;
  let id = req.body.id;

  data.transformers[id] = poslano;
  let updated3 = JSON.stringify(data, null, 2);
  fs.writeFileSync(__dirname + '/src/data/db.json', updated3);

  res.send('OK');
});


// server 
app.listen(process.env.PORT, function () {
  console.log(`App listening on port ${process.env.PORT}`);
  if (process.env.NODE_ENV === 'development') {
    require('open')(`http://localhost:${process.env.PORT}`);
  }
});
