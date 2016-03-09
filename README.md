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


app.get('/', wsem.config_with_jade);

```


## config

- 如果有redis，走redis（多机器）
- 如果没有redis本地创建文件（单机）

