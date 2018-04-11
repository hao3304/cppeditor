const Base = require('./base.js');
const Compile = require('../tool/Compile')

module.exports = class extends Base {
  async indexAction() {

    if(this.isPost) {
      let {code} = this.post();
      let err_message = '';
      let rep = await Compile.compileCpp(code).catch(err=>{
        err_message = err;
      })
      if(rep) {
        this.success(rep);
      }else{
       return this.fail(500, err_message);
      }

    }else{
      this.body = '不支持该方法!'
    }

  }

};
