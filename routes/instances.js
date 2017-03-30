const express = require('express')
const router = express.Router()
const nodeCmd = require('node-cmd')
const fs = require('fs')

/* POST create instance. */
router.post('/create', (req, res, next) => {
  let makeInstance = () => {
    const id = Math.round(Math.random() * 1000000000000000000)
    const dir = `./data/deployments/${id}`
    fs.mkdir(dir, (err) => {
      if (err) throw error
      fs.writeFile(`${dir}/instance.tf`, req.body.terraformConfig, (err) => { // create tf file
        if (err) res.status(500).json(err)
        nodeCmd.get(`cd ${dir} && terraform plan`, (data, err) => { // run terraform plan
          if (err) res.status(500).json(err)
          console.log(data)
          nodeCmd.get(`cd ${dir} && terraform apply`, (data, err) => { // run terraform apply
            if (err) res.status(500).json(err)
            res.json(data)
          })
        })
      })
    })
  }
  fs.stat('./data', (err, stats) => {
    if (err) { // ./data does not exist; create ./data
      fs.mkdir('./data', (err) => {
        fs.mkdir('./data/deployments', (err) => {
          if (err) throw err
          makeInstance()
        })
      })
    } else {
      makeInstance()
    }
  })
})

module.exports = router
