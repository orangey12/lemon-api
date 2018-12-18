var express = require('express');
var router = express.Router();

// 引入账单
var bill = require("./bill_api")

// 添加账单
router.post('/api/addBill', bill.addBill);

// 查询账单
router.get("/api/searchBill" ,bill.searchBill)

// 删除账单
router.get("/api/deleteBill",bill.deleteBill)

// 抛出路由
module.exports = router;
