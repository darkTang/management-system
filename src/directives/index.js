
// 两种导出都行
// export function install(Vue) {}
// import defaultImage from '@/assets/common/defaultImage.png'
const defaultImage = 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
export default {
  install(Vue) {
    Vue.directive('imgError', {
      inserted(element, binding) {
        element.src = binding.value;
        element.onerror = function () {
          this.src = defaultImage;
        };
      }
    });
  }
};
