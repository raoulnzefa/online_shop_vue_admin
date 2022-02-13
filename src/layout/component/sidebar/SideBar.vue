<template>
  <div class="main-container">
    <div class="logo-container">
      <logo :collapse="isCollapse"></logo>
    </div>
    <div class="menu-container">
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          :collapse="isCollapse"
          :unique-opened="true"
          :default-active="this.$route.path"
          :collapse-transition="false"
          background-color="#304156"
          text-color="#fff"
          active-text-color="#5a9cf8"
          router
        >
          <el-submenu
            v-for="(menu, index) in this.menuList"
            :key="index"
            :index="menu.children[0].path"
          >
            <template slot="title">
              <i :class="menu.icon"></i>
              <span>{{ menu.menuName }}</span>
            </template>
            <el-menu-item
              v-for="(item, index) in menu.children"
              :key="index"
              :index="item.path"
            >
              <span>{{ item.menuName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import Logo from "@/layout/component/sidebar/Logo";
import { mapState } from "vuex";

export default {
  name: "SideBar",
  data() {
    return {
      menuList: [
        {
          menuName: "销售管理模块",
          icon: "",
          children: [
            {
              menuName: "日销售量",
              path: "/home/dailySales",
            },
          ],
        },
        {
          menuName: "用户管理模块",
          icon: "",
          children: [
            {
              menuName: "用户信息",
              path: "/home/roleInfo",
            },
          ],
        },
        {
          menuName: "货物管理模块",
          icon: "",
          children: [
            {
              menuName: "物品信息",
              path: "/home/productInfo",
            },
            {
              menuName: "订单信息",
              path: "/home/orderInfo",
            },
          ],
        },
        {
          menuName: "日志管理模块",
          icon: "",
          children: [
            {
              menuName: "日志",
              path: "/home/log",
            },
          ],
        },
      ],
    };
  },
  components: {
    Logo,
  },
  computed: {
    ...mapState(["isCollapse"]),
  },
};
</script>

<style scoped>
.main-container {
  width: 101%;
  height: 100%;
}

.main-container .logo-container {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
</style>