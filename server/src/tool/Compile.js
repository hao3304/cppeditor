const cuid = require('cuid');
const exec  = require('child_process').exec;
const fs =require('fs')

exports.compileCpp =async function (code) {
  path = './temp/';
  var filename = cuid.slug();
  const rep = await writeFile(code, filename, path)

  let commmand = 'g++ ' + path + filename +'.cpp -o '+path + filename +'.exe' ;
  return new Promise((resolve, reject) => {
    exec(commmand, function ( error , stdout , stderr) {
      if(error) {
        reject(reject)
      }else{
        resolve(filename)
      }
    })
  })
}

function writeFile(code,filename,path) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path + filename + '.cpp', code, function (err ) {
        if(err) {
          reject(err)
        }else{
          resolve(filename)
        }
    })
  })
}
