import PageTools from '@/components/PageTools';
import UploadExcel from '@/components/UploadExcel';

export default {
  install(Vue) {
    Vue.component(PageTools.name, PageTools);
    Vue.component(UploadExcel.name, UploadExcel);
  }
};


// export function install(Vue) {}   // 两种写法都行，都会调用install方法