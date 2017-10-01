var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.post('/upload', (req, res, next) => {
  if (!req.files) return res.status(400).send('No files were uploaded.');
  let file = req.files.sound
  if (file.name.endsWith('.ogg')) {

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(path.join(`/home/pi/node/brave-bot/soundFiles`, `${filename}`), function(err) {
      if (err)
      return res.status(500).send(err);

      res.send('File uploaded!');
    })
  } else {
    res.status(400).send('wrong file type moron')
  }


  console.log(sampleFile)
  res.render('index')
})


module.exports = router;
