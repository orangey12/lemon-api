var express = require('express');
var router = express.Router();
var classify = require("./classify_api")
router.get('/', function(req,res,next){
    res.send('classify')
});

// 获取icon图标
router.get('/api/selectIcon', classify.selectIcon);

// 查找分类
router.get("/api/getClassify",classify.getClassify)

// 添加分类
router.post("/api/addClassify",classify.addClassify)

module.exports = router