module.exports={
    publicPath: './',
    //配置跨域请求
    devServer:{
        proxy:{
            '/test':{
                target:'http://192.168.31.90:9090/',
                changeOrigin:true
            },
            '/api/homeworkmanager':{
                target:'http://192.168.31.90:9090/',
                changeOrigin:true
            },
        }
    },
};