const Base = require('./base.js');
const Compile = require('../tool/Compile')

module.exports = class extends Base {
  async indexAction() {

    if(this.isPost) {

      let {code} = this.post();
      let rep = '';
      try {
        rep = await Compile.compileCpp(code).catch(err=>{
          this.fail(err);
        })
      }catch (e) {
        this.fail(e);
      }finally {
        this.success(rep);
      }

    }else{
      this.body = '不支持该方法!'
    }

  }

};
