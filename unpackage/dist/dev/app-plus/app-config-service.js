
  ;(function(){
  let u=void 0,isReady=false,onReadyCallbacks=[],isServiceReady=false,onServiceReadyCallbacks=[];
  const __uniConfig = {"pages":[],"globalStyle":{"backgroundColor":"#F8F8F8","navigationBar":{"backgroundColor":"#F8F8F8","titleText":"uni-app","type":"default","titleColor":"#000000"},"isNVue":false},"nvue":{"compiler":"uni-app","styleCompiler":"uni-app","flex-direction":"column"},"renderer":"auto","appname":"CampusMarket","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":true},"compilerVersion":"4.45","entryPagePath":"pages/login/login","entryPageQuery":"","realEntryPagePath":"","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000},"tabBar":{"position":"bottom","color":"#999","selectedColor":"#FEE802","borderStyle":"black","blurEffect":"none","fontSize":"10px","iconWidth":"24px","spacing":"3px","height":"50px","list":[{"pagePath":"pages/tabbar/home/home","iconPath":"/static/tabbar/主页.png","text":"首页"},{"pagePath":"pages/tabbar/share/share","iconPath":"/static/tabbar/动态.png","text":"动态"},{"pagePath":"pages/tabbar/message/message","iconPath":"/static/tabbar/消息.png","text":"消息"},{"pagePath":"pages/tabbar/my/my","iconPath":"/static/tabbar/我的.png","text":"我的"}],"selectedIndex":0,"shown":true},"locales":{},"darkmode":false,"themeConfig":{}};
  const __uniRoutes = [{"path":"pages/login/login","meta":{"isQuit":true,"isEntry":true,"animationType":"slide-in-right","animationDuration":300,"bounce":"none","scrollIndicator":"none","titleNView":false,"navigationBar":{"titleText":"登录","type":"default","style":"custom"},"isNVue":false}},{"path":"pages/tabbar/home/home","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":0,"bounce":"none","scrollIndicator":"none","titleNView":false,"navigationBar":{"titleText":"主页","type":"default","style":"custom"},"isNVue":false}},{"path":"pages/tabbar/share/share","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":1,"bounce":"none","scrollIndicator":"none","titleNView":false,"navigationBar":{"titleText":"动态","type":"default","style":"custom"},"isNVue":false}},{"path":"pages/tabbar/message/message","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":2,"bounce":"none","scrollIndicator":"none","navigationBar":{"titleText":"消息","type":"default","backgroundColor":"#ffffff"},"isNVue":false}},{"path":"pages/tabbar/my/my","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":3,"bounce":"none","scrollIndicator":"none","titleNView":false,"navigationBar":{"titleText":"我的","type":"default","style":"custom"},"isNVue":false}},{"path":"pages/home/schoolShare/schoolShare","meta":{"animationType":"slide-in-right","animationDuration":300,"bounce":"none","scrollIndicator":"none","navigationBar":{"titleText":"动态分享","type":"default","backgroundColor":"#ffffff"},"isNVue":false}},{"path":"pages/home/goodsMarket/goodsMarket","meta":{"animationType":"slide-in-right","animationDuration":300,"bounce":"none","scrollIndicator":"none","navigationBar":{"titleText":"二手集市","type":"default","backgroundColor":"#ffffff"},"isNVue":false}},{"path":"pages/home/express/express","meta":{"animationType":"slide-in-right","animationDuration":300,"bounce":"none","scrollIndicator":"none","navigationBar":{"titleText":"快递代取","type":"default","backgroundColor":"#ffffff"},"isNVue":false}},{"path":"pages/home/search/search","meta":{"animationType":"slide-in-bottom","animationDuration":300,"bounce":"none","scrollIndicator":"none","titleNView":false,"navigationBar":{"titleText":"搜索页面","type":"default","style":"custom"},"isNVue":false}},{"path":"pages/my/myIndex/myIndex","meta":{"animationType":"slide-in-right","animationDuration":300,"bounce":"none","scrollIndicator":"none","navigationBar":{"titleText":"我的主页","type":"transparent","backgroundColor":"#ffffff","buttons":[{"type":"menu","fontSize":"22px","text":""}],"coverage":"132px"},"isNVue":false}},{"path":"pages/my/info/info","meta":{"animationType":"slide-in-right","animationDuration":300,"bounce":"none","scrollIndicator":"none","navigationBar":{"titleText":"编辑资料","type":"default","backgroundColor":"#ffffff"},"isNVue":false}},{"path":"pages/info/username/username","meta":{"animationType":"slide-in-right","animationDuration":300,"bounce":"none","scrollIndicator":"none","navigationBar":{"titleText":"用户名","type":"default","backgroundColor":"#ffffff"},"isNVue":false}},{"path":"pages/info/birthday/birthday","meta":{"animationType":"slide-in-right","animationDuration":300,"bounce":"none","scrollIndicator":"none","navigationBar":{"titleText":"出生日期","type":"default","backgroundColor":"#ffffff"},"isNVue":false}},{"path":"pages/info/profile/profile","meta":{"animationType":"slide-in-right","animationDuration":300,"bounce":"none","scrollIndicator":"none","navigationBar":{"titleText":"简介","type":"default","backgroundColor":"#ffffff"},"isNVue":false}},{"path":"pages/info/location/location","meta":{"animationType":"slide-in-right","animationDuration":300,"bounce":"none","scrollIndicator":"none","navigationBar":{"titleText":"所在地","type":"default","backgroundColor":"#ffffff"},"isNVue":false}},{"path":"pages/info/homeTown/homeTown","meta":{"animationType":"slide-in-right","animationDuration":300,"bounce":"none","scrollIndicator":"none","navigationBar":{"titleText":"家乡","type":"default","backgroundColor":"#ffffff"},"isNVue":false}},{"path":"pages/info/profession/profession","meta":{"animationType":"slide-in-right","animationDuration":300,"bounce":"none","scrollIndicator":"none","navigationBar":{"titleText":"职业","type":"default","backgroundColor":"#ffffff"},"isNVue":false}},{"path":"pages/info/tag/tag","meta":{"animationType":"slide-in-right","animationDuration":300,"bounce":"none","scrollIndicator":"none","navigationBar":{"titleText":"标签","type":"default","backgroundColor":"#ffffff"},"isNVue":false}},{"path":"pages/info/gender/gender","meta":{"animationType":"slide-in-right","animationDuration":300,"bounce":"none","scrollIndicator":"none","navigationBar":{"titleText":"性别","type":"default","backgroundColor":"#ffffff"},"isNVue":false}},{"path":"pages/my/friend/friend","meta":{"animationType":"slide-in-right","animationDuration":300,"bounce":"none","scrollIndicator":"none","navigationBar":{"titleText":"好友","type":"default","backgroundColor":"#ffffff"},"isNVue":false}},{"path":"pages/message/chat/chat","meta":{"animationType":"slide-in-right","animationDuration":300,"softinputMode":"adjustPan","bounce":"none","scrollIndicator":"none","navigationBar":{"titleText":"聊天页面","type":"default","backgroundColor":"#ffffff"},"isNVue":false}},{"path":"pages/my/setting/setting","meta":{"animationType":"slide-in-right","animationDuration":300,"bounce":"none","scrollIndicator":"none","navigationBar":{"titleText":"更多设置","type":"default","backgroundColor":"#ffffff"},"isNVue":false}},{"path":"pages/image/image","meta":{"animationType":"fade-in","animationDuration":300,"bounce":"none","scrollIndicator":"none","titleNView":false,"navigationBar":{"titleText":"图片查看","type":"default","style":"custom"},"isNVue":false}},{"path":"pages/article/article","meta":{"animationType":"slide-in-right","animationDuration":300,"bounce":"none","scrollIndicator":"none","navigationBar":{"titleText":"动态详情","type":"default","backgroundColor":"#ffffff"},"isNVue":false}}].map(uniRoute=>(uniRoute.meta.route=uniRoute.path,__uniConfig.pages.push(uniRoute.path),uniRoute.path='/'+uniRoute.path,uniRoute));
  __uniConfig.styles=[];//styles
  __uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  __uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:16})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:u,window:u,document:u,frames:u,self:u,location:u,navigator:u,localStorage:u,history:u,Caches:u,screen:u,alert:u,confirm:u,prompt:u,fetch:u,XMLHttpRequest:u,WebSocket:u,webkit:u,print:u}}}}); 
  })();
  