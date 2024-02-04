import ImageView from './ImageView/index.vue'
import XtxSku from './XtxSku/index.vue'

// 将components中组件全局注册
export const componentPlugin = {
    intall(app) {
        // app.component('组件名字', 组件配置对象)
        app.component('ImageView', ImageView)
        app.component('XtxSku', XtxSku)
    }
} 