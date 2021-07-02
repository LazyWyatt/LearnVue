# Vue Router
路由:透過互聯的網路把訊息傳送到目的地
外部IP -> 映射表(內往IP:電腦MAC地址) 


什麼是前端渲染?什麼是後端渲染?
1. 後端渲染
jsp: java server page
會把整個html/css/java代碼一起丟出去。java代碼作用是從數據庫中讀取數據，並且將它動態的放在頁面中。給出來的事已經渲染好的網頁。
2. 後端路由
後端處理URL和頁面之間的映射關係。根據不同的網址，服務器給出處理完加上資料渲染過後的HTML網頁。
* 後端路由的缺點:
    * 整個頁面都需要由後端人員來編寫與維護
    * 或是前端開發須通過PHP或JAVA來編寫頁面
    * HTML和數據的程式會混在一起，編寫和維護都很不容易
3. 前後端分離
>後端只負責提供數據，不負責任和階段的內容。
>瀏覽器中的大部分內容都是由前端寫的js代碼再瀏覽器執行，最終渲染出來的網頁。

靜態資源服務器+提供API接口的服務。
Url -> 靜態服務器(html + css + js) -> 瀏覽器 -> HTML、CSS渲染出來，js由瀏覽器執行，使用ajax到API接口請求資料，傳回數據，再經過程式碼可能形成DOM再渲染到瀏覽器上。
* 優點
    * 可以跨平台，只要使用同一套API就可以
4. 前端路由(SPA頁面)
SPA: Single Page Applicaition
整個網頁只有一個html頁面
原本是靜態資源服務器，一個網址對應各一套的html+css+js，現在是index.html+css+js只有一個。訪問該網站第一次時將全部資源下載下來，根據使用者輸入的路由，透過js判斷將預載的打包的網頁組件渲染出來，而不用再次請求。

## Hash
```javascript=
location.hash = "foo"
// localhost:8000/#/foo
```
#### HTML5的history模式: pushState
```javascript=
history.pushState({}, '', 'home')
// localhost:8000/home
//使用堆疊(stack)的結構(棧結構)，只有一個出、入口，先進後出，後進先出。
history.pushState({}, '', 'about')
history.pushState({}, '', 'post')
history.pushState({}, '', 'demo')
history.back()
//localhost:8000/post#/
history.back()
//localhost:8000/about#/
```

#### HTML5的history模式: replaceState
```javascript=
history.replaceState({}, '', 'home')
// localhost:8000/home
history.replaceState({}, '', 'about')
// localhost:8000/about
//不可以點上一頁
```

#### HTML5的history模式: go
```javascript=
history.pushState({}, '', 'home')
// localhost:8000/home
history.pushState({}, '', 'about')
// localhost:8000/about
history.pushState({}, '', 'post')
// localhost:8000/post
history.pushState({}, '', 'demo')
// localhost:8000/demo
history.go(-1) 
// localhost:8000/post
history.go(-2)
// localhost:8000/home
```

#### HTML5的history模式: back/forward
```javascript=
histroy.go(-1) 結果跟history.back()一樣
histroy.go(1) 結果跟history.forward()一樣

```

## 使用Vue Router
```
npm install vue-router --save
```
01. 創建router資料夾，底下新增index.js
```javascript=
//index.js
import VueRouter from "vue-router";
import Vue from "vue";
import Home from "../components/Home";
import About from "../components/About";

//1.通過Vue.use(插件),安裝插件
Vue.use(VueRouter);

//2.創建VueRouter對象
const routes = [
  {
    path: "/home",
    component: Home
  },
  {
    path: "/about",
    component: About
  }
];
const router = new VueRouter({
  //配置路由和組件之間的應用關係
  routes
});

// 3.將router對象傳入Vue實例
export default router;
```

2. 再到main.js傳入Vue實例
```javascript=
import Vue from "vue";
import App from "./App";
import router from "./router";

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});

```

3.在components增加相對應的Vue component之後，在App.vue添加router-link和router-view組件，router-link點擊之後必須有router-view才能顯示
```javascript=
<template>
  <div id="app">
    <router-link to="/home">首頁</router-link>
    <router-link to="/about">關於</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {...}
</style>
```

## 路由的默認值(重新導向)
```javascript=
//router index.js
const routes = [
  {
    path: "/",
    // component: Home,
    redirect: "/home"
  }
];
```

## 取消hash模式，使用HTML5的History模式
```javascript=
//router index.js
const router = new VueRouter({
  //配置路由和組件之間的應用關係
  routes,
  mode: 'history'
});
```

## router-link其他屬性
1. 想要router-link渲染出來的不是<a></a>，在裡面加上tag屬性
```javascript=
<template>
  <div id="app">
    <router-link to="/home" tag="button">首頁</router-link>
    <router-link to="/about" tag="button">關於</router-link>
    <router-view></router-view>
  </div>
</template>
```
2. 讓用戶不能通過瀏覽器點擊上一頁(history.replaceState)
```javascript=
<template>
  <div id="app">
    <router-link to="/home" tag="button" replace>首頁</router-link>
    <router-link to="/about" tag="button">關於</router-link>
    <router-view></router-view>
  </div>
</template>
```
3. router-link被點擊後會自動產生router-link-active的class，如果想要用自訂的class，使用active-class屬性
```javascript=
<template>
  <div id="app">
    <router-link to="/home" tag="button" replace active-class="active">首頁</router-link>
    <router-link to="/about" tag="button">關於</router-link>
    <router-view></router-view>
  </div>
</template>
```
3.1.還有另外一種方式是到router裡的index.js修改
```javascript=
//router/index.js
const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})
```

## 通過程式跳轉路由，而非使用router-link

```javascript=
<template>
  <div id="app">
    <button @click="homeClick">首頁</button>
    <button @click="aboutClick">關於</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    homeClick() {
      //通過程式的方式修改路由 vue-router
      this.$router.push("/home").catch(err => err);
      // this.$router.replace("/home");
    },
    aboutClick() {
      this.$router.push("/about");
      // this.$router.replace("/about");
    }
  }
};
</script>
```

## 動態路由
在router的index.js裡以冒號表示動態路由
```javascript=
const routes = [
  {
    path: "",
    // component: Home,
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/about",
    component: About
  },
  {
    path: "/user/:id",
    component: User
  }
];
```
在router-link地方用v-bind:to="XXX"拼接綁定動態路由
```javascript=
<template>
  <div id="app">

    <router-link to="/home">首頁</router-link>
    <router-link to="/about">關於</router-link>
    <router-link :to="'/user/' + userId">使用者</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      userId: 12
    };
  },
};
</script>
```
在User.vue得文件中就可以使用this.$route.params來取得網址的參數
```javascript=
<template>
  <div>
    <h1>我是用戶介面</h1>
    <p>用戶訊息</p>
    <h2>{{ userId }}</h2>
  </div>
</template>

<script>
export default {
  name: "User",
  computed: {
    userId() {
      return this.$route.params.id;
    }
  }
};
</script>

<style></style>

```

## 路由的懶加載
如果全部打包成一個文件，第一次下載的檔案會非常的大，可能會造成請求時間過久，所以會根據需求將某些頁面分出去打包，等到用戶訪問再請求資源下載。
打包過後的文件有以下三個
1. app.js 應用程序開發的所有代碼
2. main.js 為了打包的代碼底層支撐的程式(像是導入倒出)
3. vendor提供商第三方vue/vue-router/axios
app.js有時候自己寫的代碼可能會上萬行，就可以將它分開打包。把不同路由對應的組件分隔成不同的代碼，當路由被訪問時才加載相對應路由。

### 懶加載的使用
```javascript=
//在router的index.js裡面
import Home from "../components/Home";
import About from "../components/About";
import User from "../components/User";

//改寫成以下的代碼
const Home = () => import('../components/Home');
const About = () => import('../components/About');
const User = () => import('../components/User');

//上面的也可以直接寫進component
const routes = [
  {
    path: "",
    // component: Home,
    redirect: "/home"
  },
  {
    path: "/home",
    component: () => import('../components/Home')
  },
  {
    path: "/about",
    component: About
  },
  {
    path: "/user/:id",
    component: User
  }
];
```
## 嵌套路由的使用
1. 在componenets裡面創建相對應的組件
* HomeMessage.vue
* HomeNews.vue
2. 到router裡面index配置路由
```javascript=
const Home = () => import("../components/Home");
const HomeNews = () => import("../components/HomeNews");
const HomeMessage = () => import("../components/HomeMessage");
const routes = [
  {
    path: "",
    // component: Home,
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home,
    children: [
      {
        path: "news",
        component: HomeNews
      },
      {
        path: "message",
        component: HomeMessage
      }
    ]
  },
];
```
3. 到使用嵌套路由的頁面(Home.vue)裡面加上<router-link>和<router-view>
```javascript=
<template>
  <div>
    <h2>我是首頁</h2>
    <p>我是首頁的內容</p>
    <router-link to="/home/news">新聞</router-link>
    <router-link to="/home/message">消息</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped></style>

```
## router傳遞參數的方式
1. params類型
* 路由格式: /router/:id
* 傳遞的方式: 在path後面跟上對應的值
* 傳遞形成的路徑: /router/123
2. query類型
* 路由的格式: /router
* 傳遞的方式，對象中使用query的key作為傳遞方式
* 傳遞後形成的路徑: /router?id=123, /router?id=abc