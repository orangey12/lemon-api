module.exports = {

    // 查找所有icon
    "SELECT":"select * from icon",

    // 判断该用户是否存在
    "SELECT-NAME":"select * from users where nick_name=?",

    // 在用户表中添加用户
    "INSERT-USER":"insert into users (uid,nick_name) values(?,?) ",

    // 查询自定义分类 *号表示默认分类
    "SELECT-CLASSIFY":"select * from classify_list where (uid=? or uid='*') ",

    // 添加分类
    "ADD-CLASSIFY":"insert into classify_list (cid,c_name,c_icon,c_type,uid) values(?,?,?,?,?)",

    // 判断是否存在当前分类 （当前用户的分类列表中的数据包括默认分类）
    "HAS-CLASSIFY":"select * from classify_list where (uid=? or uid='*') and c_name=? and c_type=?",

    // 添加账单
    "ADD-BILL":"insert into bill (lid,uid,cid,create_time,money) values(?,?,?,?,?)",

    // 判断id和cid是否存在
    "SELECT-CID":"select * from classify_list c,users u,bill b where ?=c.uid and c.uid=u.uid and ?=c.cid",

    // 查找当前年所有账单 查找bill列表的所有列以及classify列表中的icon,name,type 查找范围用户表,分类表以及账单表 查找条件为前端传递的uid要存在于用户表以及账单列表中,分类中的cid等于账单表的cid
    // date-format()  格式化数据
    "SELECT-YEAR-BILL":"select b.*,c.c_icon,c.c_name,c.c_type from bill b,classify_list c,users u where u.uid=? and b.uid=u.uid and c.cid=b.cid and date_format(b.create_time,'%Y')=?",

    // 查找当前年+某种类型的账单
    "SELECT-CYEAR-BILL":"select b.*,c.c_icon,c.c_name,c.c_type from bill b,classify_list c,users u where u.uid=? and b.uid=u.uid and c.cid=b.cid and date_format(b.create_time,'%Y')=? and c.c_name in (?)",

    // 查找当前月份所有账单
    "SELECT-MONTH-BILL":"select b.*,c.c_icon,c.c_name,c.c_type from bill b,classify_list c,users u where u.uid=? and b.uid=u.uid and c.cid=b.cid and date_format(b.create_time,'%Y-%m')=?",

    // 查找当前月份+某种类型的账单
    "SELECT-CMONTH-BILL":"select b.*,c.c_icon,c.c_name,c.c_type from bill b,classify_list c,users u where u.uid=? and b.uid=u.uid and c.cid=b.cid and date_format(b.create_time,'%Y-%m')=? and c.c_name in (?)",

    // 删除账单
    "DELETE-BILL":"delete from bill where lid=?"
}