import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
import Cookies from 'js-cookie'
import test1 from './lang/langpack/test'
import generateTitle from './lang/langpack/generateTitle'
// 修改element 内部的语言
import locale from 'element-ui/lib/locale';
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

const messages = {
  zh: {
    ...zhLocale,   
    message: { // 测试-后续可删
      hello: '好好学习，天天向上！'
    },
    test1: test1.zh, // 测试-后续可删
    generateTitle: generateTitle.zh
  },
  en: {
    ...enLocale,
    message: { // 测试-后续可删
      hello: 'good good study, day day up!'
    },
    test1: test1.en, // 测试-后续可删
    generateTitle: generateTitle.en
  }
}


let lang = Cookies.get('language') || 'zh';// 语言标识 英文
locale.i18n((key, value) => i18n.t(key, value)) //为了实现element插件的多语言切换

const i18n = new VueI18n({
  locale: lang, // 语言标识
  messages: messages
})

export default i18n;