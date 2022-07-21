# 国际化

## 如何使用

- Step1：添加语言资料：进入 `src/locale` 下同时添加中英文，推荐使用 `${scope}.key` 的方式添加；
- Step2：获取语言资料：
  - 在函数组件中推荐使用 `useLocale` 获取语言资料，详情见 `components/ConfigProvider/hook` 下的类型定义；
