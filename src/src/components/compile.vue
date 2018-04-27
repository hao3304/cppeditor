<template>
  <div class="app">
    <h5 class="title">在线C/C++编译器</h5>
    <Row :getter="20">
      <Col :span="16">
     <div style="position: relative">
       <Spin fix v-show="loading"></Spin>
       <codemirror  v-model="code" :options="cmOptions"></codemirror>
     </div>

      <div class="stdout" v-if="stdout">
        <Tabs>
          <TabPane label="输出">
            <Alert :type="type == 0?'success':'error'" show-icon v-html="stdout"></Alert>
          </TabPane>
        </Tabs>
      </div>

      <div class="stdin">
        <Button :disabled="loading" class="btn-run" icon="play" @click="onBuild" style="width: 100px" type="success">编译</Button>
        <Tabs type="card">
          <TabPane label="输入">
            <div id="terminal"></div>
          </TabPane>
        </Tabs>
      </div>
      </Col>
      <Col :span="8">
      </Col>
    </Row>


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
    name: 'compile',
    data () {
      return {
        code: `#include<stdio.h>
int main()
{
	printf("hello world!\\n");
  	return 0;
}
`,
        cmOptions: {
          tabSize: 4,
          mode: 'text/x-c++src',
          theme: 'material',
          lineNumbers: true,
          matchBrackets: true,
          line: true,
          height: 400
        },
        loading:false,
        socketOpen:false,
        hasListen:false,
        stdout: '',
        type: 0 // 0 正常 1出错
      }
    },
    methods:{
      renderTerminal() {
        let self = this;
        this.Terminal = $('#terminal').terminal(function(command) {
          if (command !== '') {
            if(self.socketOpen) {
              self.socket.emit('send', command)
            }
          } else {
            this.echo('');
          }
        }, {
          greetings: '欢迎使用在线C/C++编译器',
          name: 'js_demo',
          height: '200px',
          prompt: '> '
        });
      },
      onBuild() {
        if(this.code) {
          this.loading = true;
          this.socket.close();
          axios.post('/compile',{code:this.code}).then(({data})=>{
            this.loading = false;
            if(data.errno == 0) {
              this.onSocket(data.data);
            }else{
              this.stdout = data.errmsg;
              this.type = 1;
            }
          }).catch(()=>{
            this.loading = false;
            this.$Message.error("编译错误！")
          })
        }
      },
      onSocket(file) {
        this.socketOpen = true;
        this.socket.connect();
        if(!this.isBind) {
          this.socket.on('data', function(data){
//            this.Terminal.echo(data);
//            this.Terminal.enable();
            this.stdout = data.replace(/\n/g, "<br/>");
            this.type = 0;
          }.bind(this))
          this.socket.on('close',data=>{
            this.socket.close();
            this.socketOpen = false;
            this.isBind = false;
            this.socket.removeAllListeners();
          })
        }

        this.isBind = true;

        this.socket.emit('build', file)

      }
    },
    mounted() {
      this.renderTerminal();
      this.socket = io('//'+window.location.host);
      this.socket.close();
    }
  }
</script>
<style  lang="less">
  .app{
    overflow: hidden;
    flex-direction: column;
    position: absolute;
    padding: 0 20px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    .title {
      font-size: 22px;
      margin: 10px 0;
      color: green;
    }
    .vue-codemirror{
      height: 250px;
      .CodeMirror{
        height: 100%;
        font-size: 12px;
      }
    }

    .stdout {
      margin-top: 10px;
      .contents{
        max-height: 200px;
        overflow-y: auto;
        padding: 5px;
        li {
          padding: 5px;
          font-size: 14px;
        }
      }
    }

    .btn-run{
      position: absolute;
      right: 5px;
      top:6px;
      z-index: 10;
    }

    .stdin {
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
