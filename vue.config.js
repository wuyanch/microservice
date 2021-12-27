
let path = require('path')
function resolve (dir) {
　　return path.join(__dirname, dir)
}
module.exports = {
    // 项目部署的基础路径
    // 我们默认假设你的应用将会部署在域名的根部,
    // 例如 https://www.my-app.com/
    // 如果你的应用部署在一个子路径下，那么你需要在这里
    // 指定子路径。比如将你的应用部署在
    // https://www.foobar.com/my-app/
    // 那么将这个值改为 '/my-app/'
    publicPath: process.env.NODE_ENV === 'production'
    ? '/jxgjplus/'
    : '/',// 构建好的文件输出到哪里
   
    outputDir: "dist", //生成的生产环境构建文件的目录 where to put static assets (js/css/img/font/...) // 是否在保存时使用‘eslint-loader’进行检查 // 有效值: true | false | 'error' // 当设置为‘error’时，检查出的错误会触发编译失败
    assetsDir:"static",//放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    lintOnSave: false, // 使用带有浏览器内编译器的完整构建版本 // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    runtimeCompiler: false, // babel-loader默认会跳过`node_modules`依赖. // 通过这个选项可以显示转译一个依赖
    transpileDependencies: [//默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
      // 'image-conversion'
      /[/\\]node_modules[/\\]image-conversion[/\\]/
      /* string or regex */
    ], // 是否为生产环境构建生成sourceMap?
    
    productionSourceMap: false, // 调整内部的webpack配置. // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: config => {
      config.resolve.alias
      .set('@', resolve('src'))
      .set('@a', resolve('src/assets'))
      .set('@c', resolve('src/components'))
      .set('static',resolve('public/static'))
      config.resolve.symlinks(true);//修复 HMR(热更新)失效
    },

    configureWebpack:{//调整 webpack 配置最简单的方式就是在 vue.config.js 中的 configureWebpack 选项提供一个对象
      // module: {
      // }
      

    }, 
    css: {
      loaderOptions: {
          postcss: {
              plugins: [
                  require('postcss-pxtorem')({//postcss-plugin-px2rem
                      rootValue: 37.5, //换算基数， 默认100
                      propList  : ['*'],
                      // unitPrecision: 5, //允许REM单位增长到的十进制数字。
                      //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
                      // propBlackList: [], //黑名单
                      exclude: false,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
                      // selectorBlackList: [], //要忽略并保留为px的选择器
                      // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
                      // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
                      mediaQuery: true,  //（布尔值）允许在媒体查询中转换px。
                      minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
                  })
              ]
          }
      }
  },
    // CSS 相关选项
    // css: {
    //   // 将组件内部的css提取到一个单独的css文件（只用在生产环境）
    //   // 也可以是传递给 extract-text-webpack-plugin 的选项对象
    //   extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
    //   sourceMap: false, // pass custom options to pre-processor loaders. e.g. to pass options to // sass-loader, use { sass: { ... } }
    //   loaderOptions: {
    //     postcss: {
    //       // 这里的选项会传递给 postcss-loader
    //     }
    //   }, // Enable CSS modules for all css / pre-processor files. // This option does not affect *.vue files.
    // //   modules: false//vue-cli3.0
    //   requireModuleExtension : false//vue-cli4.0
    // }, // use thread-loader for babel & TS in production build // enabled by default if the machine has more than 1 cores
   
    // parallel: require("os").cpus().length > 1,//这样配置是多余的，并且不保险的 // PWA 插件相关配置 // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
   
    pwa: {}, // configure webpack-dev-server behavior
    devServer: {
      open: process.platform === "darwin",
      disableHostCheck: false,
      host: "0.0.0.0",
      port: 8081,
      https: false,
      hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
      proxy:{
        '/': {    //将www.exaple.com印射为/apis
            target: 'http://106.53.125.63:9080/hz',  //http://gdbbc.pension.taikang.com/hz http://gdbbc.pension.taikang.com/mybp/work http://tktk.cn1.utools.club http://tkwx.cn.utools.club http://tktk.cn1.utools.club http://gdbbc.pension.taikang.com/mybp/work      https://apptest.utools.club 
            secure: false,  // 如果是https接口，需要配置这个参数
            changeOrigin: true,  //是否跨域
            pathRewrite: {
                '^/apis': ''   //需要rewrite的,
            }              
        }
      } // string | Object|null
        // before: app => {}
    },
    // 第三方插件配置
    pluginOptions: {
     
    }
  };