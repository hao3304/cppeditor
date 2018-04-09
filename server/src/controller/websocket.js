const Base = require('./base.js');
const spawn = require('child_process').exec;
const path = require('path')

module.exports = class extends Base {
  openAction() {
    this.emit('opend', 'This client opened successfully!')
  }

  buildAction() {
    // console.log('获取客户端 addUser 事件发送的数据', this.wsData);
    // console.log('获取当前 WebSocket 对象', this.websocket);
    // console.log('判断当前请求是否是 WebSocket 请求', this.isWebsocket);
    var ch = spawn('fakechroot ' + path.resolve(think.ROOT_PATH, `./temp/${this.wsData}.out`))
    // let commond = 'docker exec -i cpp ' + `/temp/${this.wsData}.out`;
    // let commond = 'docker run  -i -v ' + path.resolve(think.ROOT_PATH,'./temp') + ':/tmp codenvy/cpp_gcc ' + `/tmp/${this.wsData}.out`;
    // var ch = spawn(commond)

    ch.stdin.on("end", ()=> {
        this.emit('close','close');
    })

    ch.stdout.on('data',d=> {
      this.emit('data', d.toString())
      console.log(d.toString())
    })

    this.websocket.on('send',function (d) {
      ch.stdin.write(d +'\n');
    })
  }

  sendAction() {

  }

  closeAction() {
    console.log('close');
  }
};
