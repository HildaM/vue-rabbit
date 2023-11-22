import { useIntersectionObserver } from '@vueuse/core'

// 定义懒加载插件
export const lazyPlugin = {
    install(app) {
        // 图片懒加载配置
        app.directive('img-lazy', {
            mounted(el, binding) {
                // el: 指令绑定的元素 img
                // binding：binding.value 指令等于号后面绑定的表达式的值 图片url
                const  { stop } = useIntersectionObserver(
                    el,
                    ([{isIntersecting}]) => {
                        if (isIntersecting) {
                            // 进入区域
                            el.src = binding.value
                            // 获取图片后，停止监听，避免浪费资源
                            stop()
                        }
                    }
                )
            }
        })
    }
}