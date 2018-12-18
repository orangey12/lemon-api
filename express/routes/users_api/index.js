var uuid = require("node-uuid"),
    {query} = require("../../mysql"),
    sql = require("../../mysql/sql.js");

module.exports = {

    addUser(req,res,next){
        var uid = uuid.v1(),
            {nick_name} = req.body;
        query(sql["SELECT-NAME"],[nick_name])
        .then((data)=>{
            if(data.length < 1){
          
                query(sql["INSERT-USER"],[uid,nick_name])
                .then((data)=>{
                    console.log(data)
                    if(data.affectedRows==1){
                        res.send({code:1,msg:"添加成功",uid:uid})
                    }
                    
                })
                .catch((err)=>{
                    res.send({code:0,msg:"添加失败",uid:uid})
                })
            }else{
                res.send({code:0,msg:"添加失败,用户已存在",uid:data[0].uid})
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}