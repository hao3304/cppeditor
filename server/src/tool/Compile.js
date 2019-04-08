const cuid = require('cuid');
const exec  = require('child_process').exec;
const fs =require('fs')
const path = require('path')

exports.compileCpp =async function (code) {
  _path = think.config('gccPath');
  var filename = cuid.slug();
  const rep = await writeFile(code, filename, _path)
  // let commmand = '/usr/sbin/chroot /tmp/xenial/ gcc /tmp/'+ filename +'.cpp -o /tmp/'+ filename +'.out -lstdc++' ;
  let commmand = `/usr/sbin/chroot ${_path} gcc ${filename}.cpp -o ${filename}.out -lstdc++`;
  // let commmand = 'gcc ' + _path +'/'+ filename +'.cpp -o '+ _path +'/'+ filename +'.out -lstdc++' ;
  return new Promise((resolve, reject) => {
    exec(commmand, function ( error , stdout , stderr) {
      if(error) {

        if(typeof stderr == 'string' && stderr.length > 500) {
          stderr = 'error messages exceed limit'
        }

        reject(stderr)
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
