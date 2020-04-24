<template>
  <el-container class="home-container">
    <!--头部局域-->
    <el-header>
      <div>
        <img src="../assets/bookmenu.jpg" alt=""/>
        <span>图书管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!--页面主体局域-->
    <el-container>
      <!--侧边栏-->
      <el-aside :width="isCollapsed ? '50px' : '200px'">
        <!--侧边栏菜单局域-->
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409EFF" unique-opened :collapse="isCollapsed" :collapse-transition="false"
          router default-active="userlist">

          <el-submenu v-for="(item,index,key) in menu" :key="key" :index=item.name>
            <template slot="title">
              <i class="iconfont icon-user"></i>
              <span>{{item.value}}</span>
            </template>
            <el-menu-item-group >
              <el-menu-item :index="item2.path" v-for="(item2,index2,key2) in item.children" :key="key2">
                <i class="el-icon-menu"></i>
                {{item2.value}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!--<el-submenu index="1">
            <template slot="title">
              <i class="iconfont icon-user"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="userlist" @click="savaNavState(userlist)">
                <i class="el-icon-menu"></i>
                用户列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont icon-elara-icon-authoritymanagement"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="rolelist" @click="savaNavState(rolelist)">
                <i class="el-icon-menu"></i>
                角色列表
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="authoritylist" @click="savaNavState(authoritylist)">
                <i class="el-icon-menu"></i>
                权限列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="iconfont icon-Goodgoods"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="goodsPara" @click="savaNavState(goodsPara)">
                <i class="el-icon-menu"></i>
                商品参数
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="classMana" @click="savaNavState(classMana)">
                <i class="el-icon-menu"></i>
                分类管理
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="goodsClass" @click="savaNavState(goodsClass)">
                <i class="el-icon-menu"></i>
                商品分类
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="iconfont icon-order"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="order" @click="savaNavState(order)">
                <i class="el-icon-menu"></i>
                选项1
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="iconfont icon-data"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="data" @click="savaNavState(data)">
                <i class="el-icon-menu"></i>
                选项1
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>-->
        </el-menu>
      </el-aside>
      <!--右侧主体内容-->
      <el-main>
        <!--路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data(){
      return {
        //左侧菜单数据
        isCollapsed : false,
        menu:[
          {
            name:"user_manager",
            value:"用户管理",
            children:[{name:"yonghulieb",value:"用户列表",path:"userlist"}]
          },
          {
            name:"quanxian1",
            value:"权限管理",
            children:[{name:"quanxian1",value:"权限1",path:"userlist2"},{name:"quanxian2",value:"权限2",path:"userlist3"}]
          },
          {
            name:"shop",
            value:"商品管理",
            children: [{name:"shangping1",value:"商品1",path:"userlist4"},{name:"shangping2",value:"商品2",path:"userlist5"}]
          },
          {
            name:"dindan",
            value:"订单管理",
            children:[{name:"shangping1",value:"商品1",path:"userlist6"},{name:"shangping2",value:"商品2",path:"userlist7"}]
          },{
          name:"shuju",
            value:"数据统计",
            children: [{name:"shangping1",value:"商品1",path:"userlist8"},{name:"shangping2",value:"商品2",path:"userlist9"}]
          }
        ]
      }
    },
    methods: {
      logout() {
        window.sessionStorage.clear();
        this.$router.push("/login");
      },
      toggleCollapse(){
        this.isCollapsed=!this.isCollapsed
      },
      savaNavState(activepath){
        window.sessionStorage.setItem('activePath',activepath)
        // window.sessionStorage.getItem()
      }
    }
  };
</script>

<style lang="less" scoped>
  .home-container {
    height: 100%;
  }
  img{
    margin-top: 5%;
    width: 15%;
  }
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
  > div {
    display: flex;
    align-items: center;
  span {
    margin-left: 15px;
  }
  }
  }
  .el-aside {
    background-color: #333744;
    .el-menu{
      border-right: none;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
  .iconfont{
    margin-right: 10px;
  }
  .toggle-button{
    background-color: #4a5046;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>
