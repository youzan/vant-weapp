const path = require('path')
const fs = require('fs')
const file = require('./file')
const demoPath = path.join(__dirname, '../example/pages')
function getDemoFiles (demoDir) {
  if (!file.hasFile(demoDir)) return {}
  let files = file.getFiles(demoDir)
  let conf = {}
  files.forEach(_file => {
    let ext = file.getExtname(_file)
    conf[ext] = fs.readFileSync(_file, 'utf-8')
  })
  return conf
}

function getDemoDir (docFile) {
  return path.join(demoPath, docFile.split('/').pop())
}

module.exports = function (template) {
  // let demoDir = getDemoDir(this.context)
  // let demoConf = getDemoFiles(demoDir)
  // template = Object.keys(demoConf).reduce((res, key) => {
  //   res += `\n~~~ ${key}\n${demoConf[key]}~~~`
  //   return res
  // }, template + `<wxapp-demo demo-types="${Object.keys(demoConf)}">\n`)
  // return template + '\n</wxapp-demo>'
  return template + `<wxapp-demo></wxapp-demo>`;
}
