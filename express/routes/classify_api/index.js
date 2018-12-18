var {query} = require("../../mysql"),
    sql = require("../../mysql/sql.js"),
    uuid = require("node-uuid")

module.exports = {
    selectIcon(req,res,next){
        query(sql.SELECT)
        .then((data)=>{
            if(data){
            res.send({code:1,data:data})
            }else{
            res.send({code:0,msg:"获取失败"})
            }
        })
        .catch((err)=>{
            if(err){
                console.log(err)
            }
        })
    },

    // 查询分类
    getClassify(req,res,next){
        var {uid} = req.query;
        if(!uid){
            res.send({code:3,msg:"缺少参数"})
        }else{
            query(sql["SELECT-CLASSIFY"],[uid])
            .then((data)=>{
                if(data){
                    res.send({code:1,data:data})
                }else{
                    res.send({code:0,msg:"数据不存在"})
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    },

    // 添加分类
    addClassify(req,res,next){
        var {uid,c_name,c_icon,c_type} = req.body,
            cid = uuid.v1();
            
        // var sql = `select * from classify_list where (uid='${uid}' or uid='*') and c_name='${c_name}' and c_type='${c_type}' `  

        query(sql["HAS-CLASSIFY"],[uid,c_name,c_type])
        .then((data)=>{
            if(data.length>0){
                res.send({code:3,msg:"该分类已存在"})
            }else{
                query(sql["ADD-CLASSIFY"],[cid,c_name,c_icon,c_type,uid])
                .then((data)=>{
                    if(data.affectedRows==1){
                        res.send({code:1,msg:"添加成功",cid:cid})
                    }
                })
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}