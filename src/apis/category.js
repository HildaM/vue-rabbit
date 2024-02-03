import request from "@/utils/http";

const prefix = "/category";

export const getCategoryAPI = (id) => {
  return request({
    url: prefix,
    params: {
      id,
    },
  });
};

// 应用于二级菜单
export const getCategoryFilterAPI = (id) => {
  return request({
    url: prefix + "/sub/filter",
    params: {
      id,
    },
  });
};

/**
 * @description: 获取导航数据
 * @data { 
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   } 
 * @return {*}
 */
export const getSubCategoryAPI = (data) => {
  return request({
    url: prefix + "/goods/temporary",
    method: "POST",
    data,
  });
};
