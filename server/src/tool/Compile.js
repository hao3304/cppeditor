const cuid = require('cuid');
const exec  = require('child_process').exec;
const fs =require('fs')
const path = require('path')

exports.compileCpp =async function (code) {
  _path = '/tmp/chroot';
  // _path = path.resolve(think.ROOT_PATH,'./temp/');
  var filename = cuid.slug();
  const rep = await writeFile(code, filename, _path)

  let commmand = 'fakechroot /usr/sbin/chroot /tmp/chroot gcc ' + _path +'/'+ filename +'.cpp -o '+ _path +'/'+ filename +'.out -lstdc++' ;
  // let commmand = 'docker exec -i cpp gcc '  +'/tmp/'+ filename +'.cpp -o /tmp/'+ filename +'.out -lstdc++' ;
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
