// axios 基本封装
import axios from "axios";
import "element-plus/theme-chalk/el-message.css";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";
import router from '@/router'

const http = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000,
});

// axios 请求拦截器
http.interceptors.request.use((config) => {
    // 请求统一携带token
    const userStore = useUserStore();
    const token = userStore.userInfo.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config;
  },
  (e) => Promise.reject(e)
);

// axios 响应拦截器
http.interceptors.response.use(
  (res) => res.data,
  (e) => {
    const userStore = useUserStore()

    // 统一错误提示
    ElMessage({
      type: "warning",
      message: e.response.data.message,
    });

    // 401 token 失效处理。1. 清除本地用户数据；2. 跳转到登录页
    if (e.response.status === 401) {
      userStore.clearUserInfo()
      router.push('/login')
    }
    return Promise.reject(e);
  }
);

export default http;
