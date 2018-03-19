let path = require('path')
let fs = require('fs')
let Readable = require('stream').Readable
let process = require('child_process')
function mkfile(filename, string = '') {
  let dir = path.dirname(filename)
  if (dir === '.' || dir === '..' || existFile(mkfile)) {
    return
  }
  mkdir(dir)
  fs.writeFileSync(filename, string, {mode: 0777, encoding: 'utf8'})
}
function mkfileStream (from, to) {
  try {
    mkfile(to)
    let reader = fs.createReadStream(from)
    reader.pipe(fs.createWriteStream(to))
    reader.on('end', () => `File modify: ${to}`)
  } catch (e) {
    console.log(e);
  }
}
function rmdir(dir) {
  let files = getFiles(dir)
  let dirs = getDirs(dir)
  files.forEach((file) => {
    rmFile(file)
  })
  dirs.forEach((dir) => {
    fs.rmdirSync(dir)
  })
  fs.rmdirSync(dir)
}
function getExtname (fileName) {
  let ext = path.extname(fileName)
  return ext ? ext.substr(1) : ''
}
function isJS (file) {
  let ext = getExtname(file)
  return ext === 'js' ? true : false
}
function getDirs (dir) {
  let files = fs.readdirSync(dir)
  let fileList = []
  files.forEach((file) => {
    file = path.join(dir, file)
    if (isDir(file)) {
      fileList.push(...getDirs(file), file)
    }
  })
  return fileList
}
function getFiles (dir) {
  let files = fs.readdirSync(dir)
  let fileList = []
  files.forEach((file) => {
    file = path.join(dir, file)
    isDir(file) ? fileList.push(...getFiles(file)) : fileList.push(file)
  })
  return fileList
}
function hasFile (dir) {
  try {
    return fs.readdirSync(dir).length
  } catch (e) {
    return 0
  }
}
function mkdir (dir) {
  let parPath = path.dirname(dir)
  if (isDir(dir)) {
    return
  } else if (!isDir(parPath)) {
    mkdir(parPath)
  }
  fs.mkdirSync(dir, 0777)
}
function rmFile (file) {
  return fs.existsSync(file) && fs.unlinkSync(file)
}
function isDir(dir) {
  return fs.existsSync(dir) && fs.statSync(dir).isDirectory()
}
function existFile (file) {
  return fs.existsSync(file)
}
function readLines (file) {
  if (isDir(file)) throw new Error('参数必须是一个文件')
  let index = 0
  let lines = fs.readFileSync(file, 'utf-8').split(/[\n|\n\r]/)

  lines.next = function () {
    return lines[index + 1]
  }

  lines.find = function (word) {
    let i = -1
    while(i === -1 || lines[i].indexOf(word) === -1) {
      i++
    }
    return i
  }
  return lines
}
exports.getExtname = getExtname
exports.mkfile = mkfile
exports.getFiles = getFiles
exports.isJS = isJS
exports.mkfileStream = mkfileStream
exports.rmdir = rmdir
exports.hasFile = hasFile
exports.rmFile = rmFile
exports.mkdir = mkdir
exports.existFile = existFile
exports.readLines = readLines
