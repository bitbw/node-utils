
const execSync = require("child_process").execSync; //同步子进程
// 复制文件到远程服务器下
execSync('scp -r -v /c/Users/WX03/Desktop/上传test   root@172.31.2.182:/var/www/html/iconfig/test/iConfig_ADMIN/')
