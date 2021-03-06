var express = require('express')
var router = express.Router()
const path = require('path')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'im gay'
  })
})

router.get('/upload', function (req, res, next) {
  res.render('upload', {
    title: 'im gay'
  })
})

router.post('/upload', (req, res, next) => {
  if (!req.files) return res.status(400).send('No files were uploaded.')
  let file = req.files.sound
  if (file.name.endsWith('.ogg')) {
    if (file.name.length > 20) {
      return res.status(400).send('name too long moron')
    }
    // Use the mv() method to place the file somewhere on your server
    file.mv(path.join(`/home/pi/node/brave-bot/soundFiles`, `${file.name.toLowerCase()}`), function (err) {
      if (err) { return res.status(500).send(err) }

      res.send('File uploaded!')
    })
  } else {
    res.status(400).send('wrong file type moron')
  }
})

module.exports = router
