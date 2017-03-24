const express = require('express')
const router = express.Router()
const nodeCmd = require('node-cmd')
const fs = require('fs')

/* POST create instance. */
router.post('/create', (req, res, next) => {
  if (!fs.existsSync('./data')) { // ensure '/data' exists
    fs.mkdirSync('./data')
  }
  if (!fs.existsSync('./data/deployments')) { // ensure '/deployments' exists
    fs.mkdirSync('./data/deployments')
  }

  const id = Math.round(Math.random() * 1000000000000000000)
  const dir = `./data/deployments/${id}`
  fs.mkdirSync(dir) // namespece deployment files
  fs.writeFile(`${dir}/instance.tf`, req.body.terraformConfig, (err) => { // create tf file
    if (err) res.status(500).json(err)
    nodeCmd.get(`cd ${dir} && terraform plan`, (data, err) => { // run terraform plan
      if (err) res.status(500).json(err)
      nodeCmd.get(`cd ${dir} && terraform apply`, (data, err) => { // run terraform apply
        if (err) res.status(500).json(err)
        res.json(data)
      })
    })
  })
})

module.exports = router
