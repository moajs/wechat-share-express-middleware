# wechat-share-express-middleware


```
var config = {
  app_id: "", 
  app_secret: "",
  jsApiList : [],
  redis: null
}



var wsem = require('wechat-share-express-middleware')(config);


app.get('/', wsem.config , wsem.error , function (req, res) {
  res.send('GET request to the homepage');
});


app.get('/', wsem.config_and_json);


```


## config

- 如果有redis，走redis（多机器）
- 如果没有redis本地创建文件（单机）

## sss


router.get('/', function(req, res, next) {
  res.render('index',{title: 'nodeonly'});
})

/* GET home page. */
router.get('/jssdk', function(req, res, next) {
  var param = {
   debug: true,
   jsApiList: jsApiList,
   url: req.query.url
  };
  
  // var result = {
  //     debug: param.debug,
  //     appId: that.appid,
  //     timestamp: timestamp,
  //     nonceStr: nonceStr,
  //     signature: signature,
  //     jsApiList: param.jsApiList
  //   };
  api.getJsConfig(param, function(err, result){
    if(err) {
      res.json({
        status:{
          code: -1,
          msg : err
        }
      })
    }
    return res.json(result);
  });
});


/* GET home page. */
router.get('/share', function(req, res, next) {
  var param = {
   debug: true,
   jsApiList: jsApiList,
   url: req.query.url
  };
  
  // var result = {
  //     debug: param.debug,
  //     appId: that.appid,
  //     timestamp: timestamp,
  //     nonceStr: nonceStr,
  //     signature: signature,
  //     jsApiList: param.jsApiList
  //   };
  api.getJsConfig(param, function(err, result){
    if(err) {
      res.json({
        status:{
          code: -1,
          msg : err
        }
      })
    }
    
    require('extend')(result, param);
    
    return res.render('share', {
      wechat_config: JSON.stringify(result)
    });
  });
});


