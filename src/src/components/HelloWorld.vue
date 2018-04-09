<template>
  <div class="app">
    <Spin fix v-show="loading"></Spin>
    <codemirror  v-model="code" :options="cmOptions"></codemirror>
    <div class="content">
      <Button v-show="!loading" class="btn-run" @click="onBuild" style="width: 100px" type="primary">编译</Button>
      <Tabs type="card">
        <TabPane label="执行">
          <div id="terminal"></div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
  import 'codemirror/mode/clike/clike.js'
  // theme css
  import 'codemirror/theme/material.css'
  import 'jquery.terminal'
  import 'jquery.terminal/css/jquery.terminal.min.css'
  import axios from 'axios'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        code: `#include <iostream>
#include <string>
int main()
{
  std::string name;
  std::cout << "What is your name? ";
  getline (std::cin, name);
  std::cout << "Hello, " << name << "!\\n";
}
`,
        cmOptions: {
          tabSize: 4,
          mode: 'text/x-c++src',
          theme: 'material',
          lineNumbers: true,
          matchBrackets: true,
          line: true,
        },
        loading:false,
        socketOpen:false,
        hasListen:false
      }
    },
    methods:{
      renderTerminal() {
        let self = this;
        this.Terminal = $('#terminal').terminal(function(command) {
          if (command !== '') {
            // this.echo(new String(command));
            if(self.socketOpen) {
              self.socket.emit('send', command)
            }
          } else {
            this.echo('');
          }
        }, {
          greetings: '欢迎使用c++在线编译器',
          name: 'js_demo',
          height: '258px',
          prompt: '> '
        });
      },
      onBuild() {
        if(this.code) {
          this.loading = true;
          if(this.socket) {
            this.socket.close();
          }
          axios.post('/compile',{code:this.code}).then(({data})=>{
            this.loading = false;
            this.onSocket(data.data);
          }).catch(()=>{
            this.loading = false;
            this.$Message.error("编译错误！")
          })
        }
      },
      onSocket(file) {
        this.socketOpen = true;
        this.socket.connect();

        this.socket.on('data', function(data){
            this.Terminal.echo(data);
            this.Terminal.enable();
          }.bind(this))
          this.socket.on('close',data=>{
            this.socket.close();
            this.socketOpen = false;
            this.socket.removeAllListeners();
          })
          this.socket.emit('build', file)

      }
    },
    mounted() {
      this.renderTerminal();
      this.socket = io('http://'+window.location.host);
    }
  }
</script>
<style  lang="less">
  .app{
    display: flex;
    overflow: hidden;
    flex-direction: column;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    .vue-codemirror{
      flex: 1;
      .CodeMirror{
        height: 100%;
        font-size: 14px;
      }
    }

    .btn-run{
      position: absolute;
      right: 10px;
      top:5px;
      z-index: 10;
    }

    .content {
      height: 300px;
      position: relative;
      padding-top: 10px;

      .ivu-tabs-bar{
        margin-bottom: 0;
      }

      #terminal{
        height: 100%;
      }
    }

  }
</style>
