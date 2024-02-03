import http from "@/utils/http";

export function getBannerAPI(params = {}) {
  // 参数默认为1，商品为2
  const { distributionSite = "1" } = params; // 解构赋值：从对象中提取出属性，并赋予默认值
  return http({
    url: "/home/banner",
    params: {
      distributionSite,
    },
  });
}

export function findNewAPI() {
  return http({
    url: "/home/new",
  });
}

export function getHotAPI() {
  return http({
    url: "/home/hot",
  });
}

export function getGoodsAPI() {
  return http({
    url: "/home/goods",
  });
}
