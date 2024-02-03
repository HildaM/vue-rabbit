<script setup>
import { getCategoryAPI } from '@/apis/category'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

// 获取数据
const categoryData = ref({})
const route = useRoute()   // 在组件内部获取路由参数
const getCategory = async () => {
    const res = await getCategoryAPI(route.params.id)
    categoryData.value = res.result
}
onMounted(() => getCategory())

</script>

<template>
    <div class="top-category">
        <!-- 面包屑 -->
        <div class="bread-container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>