<script setup>
import { getCategoryAPI } from '@/apis/category'
import { getBannerAPI } from '@/apis/home'
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

// 获取Banner
const bannerList = ref([])
const getBanner = async () => {
    const res = await getBannerAPI({
        distributionSite: '2'
    })
    bannerList.value = res.result
}
onMounted(() => getBanner())


</script>

<template>
    <div class="top-category">
        <div class="container m-top-20">
            <!-- 面包屑 -->
            <div class="bread-container">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <!-- 轮播图 -->
            <div class="home-banner">
                <el-carousel height="500px">
                    <el-carousel-item v-for="item in bannerList" :key="item.id">
                        <img :src="item.imgUrl" alt="">
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
// 部分代码省略
.home-banner {
    width: 1240px;
    height: 500px;
    margin: 0 auto;

    img {
        width: 100%;
        height: 500px;
    }
}
</style>