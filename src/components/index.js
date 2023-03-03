import PageTools from '@/components/PageTools';
import UploadExcel from '@/components/UploadExcel';
import ImageUpload from '@/components/ImageUpload'
export default {
  install(Vue) {
    Vue.component(PageTools.name, PageTools);
    Vue.component(UploadExcel.name, UploadExcel);
    Vue.component(ImageUpload.name, ImageUpload);
  }
};


// export function install(Vue) {}   // 两种写法都行，都会调用install方法