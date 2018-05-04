<template>
  <div class="app">
    <Layout style="height: 100%;background-color: #fff;">
      <Sider hide-trigger>
        <Menu theme="dark" style="width: 100%" @on-select="onSelect" :active-name="active">
          <MenuGroup title="课程列表">
            <MenuItem :name="index" :key="index" v-for="(n,index) in lessons">
              <Icon type="document-text"></Icon>
              {{n.name}}
            </MenuItem>
          </MenuGroup>

        </Menu>
      </Sider>
      <Layout>
        <Header style="background-color: #fff;">
          <h5 class="title">C/C++基础课程</h5>
        </Header>
        <Content style="padding: 0 10px;background-color: #fff">
          <Row :getter="20">
            <Col :span="12" style="padding: 0 10px;">
            <div id="markdown"  class="markdown-body"></div>
            </Col>
            <Col :span="12" id="terminal-block" >
                <div style="position: relative" >
                  <Spin fix v-show="loading"></Spin>
                  <codemirror  v-model="code" :options="cmOptions"></codemirror>
                </div>
                <div class="stdout" v-if="stdout.length > 0">
                  <Tabs>
                    <TabPane label="输出">
                      <Alert :type="type == 0?'success':'error'" show-icon v-html="getStdout"></Alert>
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

          </Row>
        </Content>

      </Layout>
    </Layout>



  </div>
</template>
<script>
  import 'codemirror/mode/clike/clike.js'
  // theme css
  import 'codemirror/theme/material.css'
  import 'jquery.terminal'
  import 'jquery.terminal/css/jquery.terminal.min.css'
  import axios from 'axios'
  import marked  from 'marked';
  import lessons from '@/data/lesson'

  export default {
    name: 'compile',
    data () {
      return {
        code: "",
        lessons:lessons,
        active: 0,
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
        stdout: [],
        type: 0 // 0 正常 1出错
      }
    },
    computed:{
      getStdout() {
        return this.stdout.join(`</br>`);
      }
    },
    methods:{
      renderTerminal() {
        let self = this;
        if(this.Terminal) {
          this.Terminal.clear().greetings('欢迎使用在线C/C++编译器');
        }else{
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
        }

      },
      onBuild() {
        if(this.code) {
          this.loading = true;
          this.socket.close();
          this.stdout = [];
          axios.post('/compile',{code:this.code}).then(({data})=>{
            this.loading = false;
            if(data.errno == 0) {
              this.onSocket(data.data);
            }else{
              this.stdout = [data.errmsg];
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
              this.stdout.push(data.replace(/\n/g, '<br\>'))
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

      },
      renderLesson() {
        this.code = this.lessons[this.active].demo.replace(/(^\s*)|(\s*$)/g, "");
        this.stdout = [];
        $("#markdown").html(
          marked(this.lessons[this.active].content)
        )
        this.renderTerminal();
      },
      onSelect(name) {
        this.active = name;
        this.renderLesson();

      }
    },
    mounted() {
      this.renderLesson();
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
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    .title {
      font-size: 22px;
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

    #markdown{
      height: 100%;
      padding-bottom: 60px;
    }

  }


  #terminal-block{
    position: fixed;
    right: 30px;
    width: 600px;
    top: 100px;
  }

  @media screen and (max-width: 1400px) {
    #terminal-block{
      width: 500px;
    }
  }
</style>
