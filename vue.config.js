module.exports={
    publicPath: './',
    //配置跨域请求
    devServer:{
        proxy:{
            '/api/homeworkmanager':{
                //target:'http://192.168.31.91:9090/',
                //target: 'http://192.168.1.131:9090/',
                target:'http://47.96.232.239:9090/',
                changeOrigin:true
            },
        }
    },
};