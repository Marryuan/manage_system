import { createPinia } from 'pinia'

import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia


// 按需导出
// import { useUserStore } from './modules/user'
// export { useUserStore }

// import { useCounterStore } from './modules/counter'
// export { useCounterStore }

// 获取模块内容全部导出
export * from './modules/user'