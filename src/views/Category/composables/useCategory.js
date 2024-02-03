// 封装分类数据业务代码

import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { getCategoryAPI } from "@/apis/category";
import { onMounted, ref } from "vue";

export function useCategory() {
  const categoryData = ref({});

  const route = useRoute(); // 在组件内部获取路由参数
  const getCategory = async (id = route.params.id) => {
    // 默认参数
    const res = await getCategoryAPI(id);
    categoryData.value = res.result;
  };
  onMounted(() => getCategory());

  // 路由参数变化后，将分类数据重新请求
  onBeforeRouteUpdate((to) => {
    // 使用最新的路由参数请求最新的分类数据
    getCategory(to.params.id);
  });

  return {
    categoryData,
  };
}
