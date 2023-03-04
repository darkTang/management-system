import PageTools from '@/components/PageTools';
import UploadExcel from '@/components/UploadExcel';
import ImageUpload from '@/components/ImageUpload'
import Print from 'vue-print-nb';
export default {
  install(Vue) {
    Vue.component(PageTools.name, PageTools);
    Vue.component(UploadExcel.name, UploadExcel);
    Vue.component(ImageUpload.name, ImageUpload);
    Vue.use(Print)
  }
};


// export function install(Vue) {}   // 两种写法都行，都会调用install方法