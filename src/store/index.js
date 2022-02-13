import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tabList: [],
        isCollapse: false,
        user: {
            userId: 1,
            username: "admin",
            phonenum: "13548897445",
            loginIp: "198.1.2.35",
            loginAddress: "中国",
            loginType: "正常登录",
            os: "windows",
            browser: "Chorme",
            consumerLevel: "管理员",
        },
    },
    mutations: {
        // 保存标签
        saveTab(state, tab) {
            if (state.tabList.findIndex(item => item.path === tab.path) == -1) {
                state.tabList.push({ name: tab.name, path: tab.path });
            }
        },
        // 移除标签
        removeTab(state, tab) {
            if (tab.name !== "首页") {
                var index = state.tabList.findIndex(item => item.name === tab.name);
                state.tabList.splice(index, 1);
            }
        },
        // 重置标签
        resetTab(state) {
            state.tabList = [{ name: "首页", path: "/home/welcome" }];
        },
        // 侧边栏折叠
        setCollapse(state) {
            state.isCollapse = !state.isCollapse;
        },
        // 用户退出
        logout() {
            //  删除 token
            window.sessionStorage.removeItem('token');
            // 删除用户信息
            window.sessionStorage.removeItem('user');
            // 删除缓存信息
            window.sessionStorage.removeItem('vuex');
        },
        // 设置用户信息
        setUser(state, data) {
            state.user = data;
        }
    },
    actions: {
        setUser(context, data) {
            context.commit('setUser', data);
        },
        saveTab(context, data) {
            context.commit('saveTab', data);
        },
    },
    modules: {},
    //持久化存储
    plugins: [persistedState({ storage: window.sessionStorage })],
});
