var mysql = require("mysql");

var config = {
    port:"3306",
    user:"root",
    password:"1214.*",
    database:"lemon",
    host:"localhost"
} 

var connection = mysql.createPool(config);

/**
 * 
 * @param {* string } sql  sql语句
 * @param {* array } data  value值
 */

function query (sql,data){
    return new Promise((resolve,reject)=>{
        connection.getConnection((err,connect)=>{
            connect.query(sql,data,(sqlerr,rows)=>{
                if(sqlerr){
                    reject(sqlerr);
                    return;
                }
                resolve(rows);
                // 释放连接
                connect.release()
            })
        })    
    })    
}


// 抛出模块
module.exports = {
    query
}




// 测试代码
//var sql = require("./sql.js")
// query(sql.SELECT,[5])
// .then((data)=>{
//     console.log(data)
// })