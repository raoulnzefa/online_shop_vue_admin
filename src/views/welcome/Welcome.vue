<template>
  <div class="animate__animated animate__fadeIn">
    <el-card style="margin: 10px -10px; width: 100%">
      <el-row style="margin-bottom: 10px">
        <el-collapse>
          <el-collapse-item title="vue学习" name="2">
            <div>该项目主要使用Vue2.x进行开发</div>
          </el-collapse-item>
          <el-collapse-item title="开源项目学习" name="3">
            <div>该项目参考学习开源项目楠橘星，一个简洁版后台管理项目</div>
          </el-collapse-item>
        </el-collapse>
      </el-row>
      <el-descriptions
        class="margin-top"
        title="当前用户信息"
        :column="3"
        size="medium"
        border
      >
        <el-descriptions-item>
          <template slot="label"><i class="el-icon-user"></i>头像</template>
          <el-image style="width: 48px; height: 48px; border-radius: 50%" :src="require('@/assets/aoligei.png')">
          </el-image>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i class="el-icon-user"></i>用户ID</template>
          {{ user.userId }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> <i class="el-icon-user"></i>用户名 </template>
          {{ user.username }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>手机号
          </template>
          {{ user.phonenum }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>登陆ip
          </template>
          {{ user.loginIp }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"
            ><i class="el-icon-tickets"></i>登陆地址</template
          >
          <el-tag size="small">{{ user.loginAddress }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">登陆方式</template>
          <el-tag size="info">{{ user.loginType }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">操作系统</template>
          <el-tag size="small" type="success">{{ user.os }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">登陆系统</template>
          <el-tag size="small" type="warning">{{ user.browser }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">个人简介</template>
          树苗如果因为怕痛而拒绝修剪，那就永远不会成材。
        </el-descriptions-item>
      </el-descriptions>
      <el-row style="margin-top: 10px" :gutter="20">
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>后端技术</span>
            </div>
            <div>· SpringBoot 多模块</div>
            <div>· SpringSecurity</div>
            <div>· MybatisPlus</div>
            <div>· JWT</div>
            <div>· FastJson</div>
            <div>· SpringBoot 多模块</div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>前端技术</span>
            </div>
            <div>· HTML、CSS、JS三件套</div>
            <div>· vue 2.*</div>
            <div>· Element UI</div>
            <div>· Axios</div>
            <div>· Vuex</div>
            <!-- <div>· lottie 动画</div> -->
            <div>· 腾讯云验证码</div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>开发环境</span>
            </div>
            <div>· JDK 8</div>
            <div>· MySql 8.*</div>
            <div>· Maven 3.6.3</div>
            <div>· Node 16.13.0</div>
            <div>· Java开发 IDEA</div>
            <div>· Vue开发 VS code</div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: { ...mapState(["user"]) },
};
</script>

<style>
</style>