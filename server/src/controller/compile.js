const Base = require('./base.js');
const Compile = require('../tool/Compile')

module.exports = class extends Base {
  async indexAction() {

      if(this.isPost) {

        let {code} = this.post();
        const rep = await Compile.compileCpp(code)
        this.success(rep);

      }else{
         this.body = '不支持该方法!'
      }

  }

};
