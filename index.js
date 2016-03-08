var fs = require('fs');
var WechatAPI = require('wechat-api');

var wsem = funtion(config){
  this.api = new WechatAPI(config.app_id, config.app_secret, function (callback) {
    if (config.redis) {
      config.redis.get('foo', access_token (err, result) {
        if (err) {return callback(err);}
        callback(null, JSON.parse(result));
      });
    }else{
      // 传入一个获取全局token的方法
      fs.readFile('access_token.txt', 'utf8', function (err, txt) {
        if (err) {return callback(err);}
        callback(null, JSON.parse(txt));
      });
    }
    
  }, function (token, callback) {
    // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
    // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
    if (config.redis) {
      config.redis.set('access_token', JSON.stringify(token));
      callback(null, JSON.stringify(token));
    }else{
      fs.writeFile('access_token.txt', JSON.stringify(token), callback);
    }
  });
  
  this.cfg = require('./config_default');
  
  require('extend')(this.cfg, config);
  
  return this;
};

wsem.prototype.config = function(){
  return function(req, res, next) {
    var param = {
     debug: true,
     jsApiList: jsApiList,
     url: req.query.url
    };
  
    param = this.cfg;
  
    // var result = {
    //     debug: param.debug,
    //     appId: that.appid,
    //     timestamp: timestamp,
    //     nonceStr: nonceStr,
    //     signature: signature,
    //     jsApiList: param.jsApiList
    //   };
    api.getJsConfig(param, function(err, result){
      req.wechat_config_result = result;
      req.wechat_config_err = err;
      next();
    });
  }
}

wsem.prototype.error = function(){
  return function(req, res, next) {
    if(req.wechat_config_err) {
      res.json({
        status:{
          code: -1,
          msg : err
        }
      })
    }
  
    next();
  }
}

wsem.prototype.json = function(){
  return function(req, res, next) {
    return res.json(req.wechat_config_result);
  }
}

wsem.prototype.jade = function(opt) {
  require('extend')(this.cfg, req.wechat_config_result);
  
  var jade = opt.jade ? opt.jade : 'share';
  
  return function(req, res, next){
    return res.render(jade, {
      wechat_config: JSON.stringify(this.cfg)
    });
  }
}

wsem.prototype.config_with_json = function(req, res, next) {
  api.getJsConfig(param, function(err, result){
    req.wechat_config_result = result;
    req.wechat_config_err = err;
    
    if(req.wechat_config_err) {
      res.json({
        status:{
          code: -1,
          msg : err
        }
      })
    }
    
    return this.json();
  });
}

wsem.prototype.config_with_jade = function(opt){
  return function(req, res, next) {
    api.getJsConfig(param, function(err, result){
      req.wechat_config_result = result;
      req.wechat_config_err = err;
    
      if(req.wechat_config_err) {
        res.json({
          status:{
            code: -1,
            msg : err
          }
        })
      }
    
      return this.jade(opt);
    });
  }
}

module.exports = wsem;
