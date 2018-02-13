let path = require('path')
let file = require('./file')
let fs = require('fs')
let esprima = require('esprima')
let estraverse = require('estraverse')
let escodegen = require('escodegen')
let commander = require('commander')

commander
  .option('--docs <doc dirs>', '文档目录位置')
  .option('--async', '文档加载方式')
  .parse(process.argv)

const processDir = process.cwd()

const confFile = path.join(__dirname, '../src/doc.config.js')
const moduleType = commander.async ? '__import__' : '__require__'
let docDirs = commander.docs.split(',')
docDirs = Array.isArray(docDirs) ? docDirs : []
let mds = {}
docDirs.forEach(dir => {
  let docDir = path.join(processDir, dir)
  mds = Object.assign({}, mds, getDocFiles(docDir))
})

const code = parseASTToCode(mds, parseCodeToAST(confFile))

updateConfig(code, confFile)

function getDocFiles (docDir) {
  const confDir = path.join(__dirname, '../src')

  let mds = file.getFiles(docDir).filter(f => {
    return file.getExtname(f) === 'md'
  })

  return mds.reduce((res, f) => {
    let dir = path.dirname(f)
    let relativePath = path.relative(confDir, f)
    let key = dir.substr(dir.lastIndexOf('/') + 1)
    res[key] = relativePath
    return res
  }, {})
}

function parseCodeToAST (confFile) {
  let config = fs.readFileSync(confFile, 'utf-8').replace(/import/g, moduleType)
  return esprima.parseScript(config)
}

function parseASTToCode (docs, ast) {
  let keys = Object.keys(docs)
  ast = estraverse.replace(ast, {
    enter (node, parent) {
      if (node.name === 'include') {
        estraverse.replace(parent.value, {
          enter (node, parent) {
            if (node.type === 'Identifier' && parent.type === 'Property' && keys.indexOf(node.name) !== -1) {
              let path = docs[node.name]
              parent.value = esprima.parseScript(`${moduleType}('${path}')`).body[0]
              delete docs[node.name]
            }
          }
        })
      }
    }
  })

  ast = estraverse.replace(ast, {
    enter (node, parent) {
      if (node.name === 'docs') {
        let properties = parent.value.properties.filter(prop => prop.key.name === 'include')
        let newProperties = Object.keys(docs).map(key => `${key}: ${moduleType}('${docs[key]}')`)
        if (newProperties.length) {
          newProperties = 'props = {' + newProperties.join() + '}'
          newProperties = esprima.parseScript(newProperties).body[0].expression.right.properties
          properties[0].value.properties.push(...newProperties)
        }
      }
    }
  })
  let reg = new RegExp(moduleType, 'g')
  let code = escodegen.generate(ast).replace(reg, moduleType === '__import__' ? 'import' : 'require').replace(/;/g, '')
  return code
}

function updateConfig (code, confFile) {
  file.mkfile(confFile, code)
}
