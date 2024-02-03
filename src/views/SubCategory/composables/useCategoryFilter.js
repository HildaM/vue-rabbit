import { getCategoryFilterAPI } from "@/apis/category";
import { ref, onMounted } from "vue";


export function useCategoryFilter(route) {
  // 获取面包屑导航数据
  const categoryData = ref([]);
  const getCategoryFilter = async () => {
    const res = await getCategoryFilterAPI(route.params.id);
    categoryData.value = res.result;
  };
  onMounted(() => getCategoryFilter());

  return{
    categoryData
  }
}
