// 正式环境
// const homeUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8016693d70c04bd3&redirect_uri=http%3A%2F%2Fgd.pension.taikang.com%2Fjxgj%2Fcheckbounds.action?constant=0&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
// 测试环境
//const homeUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx10a218a48af62cdd&redirect_uri=http%3A%2F%2Fgd.pension.taikang.com%2FjxgjTest%2Fcheckbounds.action?constant=0&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
const homeUrl = process.env.VUE_APP_BACK_HOME
export default  homeUrl