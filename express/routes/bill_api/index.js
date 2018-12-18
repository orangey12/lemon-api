var express = require("express"),
    router = express.Router();
    
// 引入数据库    
var {query} = require("../../mysql/")
var sql = require("../../mysql/sql.js") 

// 生成随机ID
var UUID = require('uuid');

module.exports = {

    // 添加账单
    addBill(req,res,next){

        // cid分类id，uid用户ID 均为前台传递的数据

        // 账单id  后台创建
        var lid = UUID.v1()

        var {uid,cid,money,type,create_time} = req.body;
        // 创建的时间（数据库为datatime类型）

       query(sql["ADD-BILL"],[lid,uid,cid,create_time,money])
                .then((data)=>{
                    if(data){
                        if(data.affectedRows === 1){
                            res.send({code:1,msg:"添加成功",lid:lid})
                        }else{
                            res.send({code:1,msg:"添加失败",lid:lid})
                        }
                    }
                })
    },

    // 查询账单
    searchBill(req,res,next){
        var {uid,timeType,time,condition} = req.query;
        if(!uid || !timeType || !time){
            res.send({code:3,msg:"丢失参数"});
            return;
        }
        var sqll;

        // 账单类名可以不传 若不传则查询所有
        if(condition){

            // 将该数据格式化为对象（因为后台后台接收的数据是乱码）
            condition = JSON.parse(condition) 
            
            sqll = timeType==1? "SELECT-CYEAR-BILL" :"SELECT-CMONTH-BILL"
            
          
        }else{
            sqll = timeType == 1 ? "SELECT-YEAR-BILL" : "SELECT-MONTH-BILL";
        }

        
        query(sql[sqll],[uid,time,condition])
        .then((data)=>{
            if(data.length>0){
                res.send({code:1,data:data,timeType:timeType})
            }else{
                res.send({code:0,msg:'没有数据'})                
            }
        })             
    },

    // 删除账单
    deleteBill(req,res,next){
        var {lid} = req.query;
        query(sql["DELETE-BILL"],[lid])
        .then((data)=>{
            if(data.affectedRows==1){
                res.send({code:1,msg:"数据已删除"})
            }else{
                res.send({code:0,msg:"数据不存在"})
            }
        })
    }
}