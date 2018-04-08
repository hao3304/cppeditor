const cuid = require('cuid');
const exec  = require('child_process').exec;
const fs =require('fs')
const path = require('path')

exports.compileCpp =async function (code) {
  _path = path.resolve(think.ROOT_PATH,'./temp/');
  var filename = cuid.slug();
  const rep = await writeFile(code, filename, _path)

  // let commmand = 'gcc ' + _path +'/'+ filename +'.cpp -o '+ _path +'/'+ filename +'.out -lstdc++' ;
  let commmand = 'docker exec -i cpp gcc '  +'/temp/'+ filename +'.cpp -o /temp/'+ filename +'.out -lstdc++' ;
  return new Promise((resolve, reject) => {
    exec(commmand, function ( error , stdout , stderr) {
      if(error) {
        reject(error)
      }else{
        resolve(filename)
      }
    })
  })
}

function writeFile(code,filename,path) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path +'/'+ filename + '.cpp', code, function (err ) {
        if(err) {
          reject(err)
        }else{
          resolve(filename)
        }
    })
  })
}
