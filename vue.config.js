module.exports={
    publicPath: './',
    //配置跨域请求
    devServer:{
        proxy:{
            '/test':{
                target:'http://192.168.137.127:9090/',
                changeOrigin:true
            },
            '/homeworkmanager/api':{
                target:'http://192.168.137.127:9090/',
            },
        }
    },

};