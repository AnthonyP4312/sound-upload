var express = require('express')
var router = express.Router()
const path = require('path')
// const fs = require('fs')
const promisify = require('util').promisify
// const mm = promisify(require('musicmetadata'))
const pg = require('pg')
// const moment = require('moment')
const _ = require('lodash')

var db = new pg.Client()
db.connect()

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('index', {
    title: 'Express',
    sounds: await querySongs()
  })
})

router.post('/upload', (req, res, next) => {
  if (!req.files) return res.status(400).send('No files were uploaded.')
  let file = req.files.sound
  if (file.name.endsWith('.ogg')) {
    if (file.name.length > 20) {
      res.status(400).send('name too long moron')
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

async function querySongs () {
  try {
    let res = await db.query(`SELECT name FROM sound ORDER BY name`)
    return res.rows.map(row => row.name)
  } catch (e) {
    return 'something broke' + e
  }
}

module.exports = router
