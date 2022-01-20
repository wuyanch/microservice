import Vue from 'vue'
import router from 'vue-router'

Vue.use(router)

export default new router({
    routes:[
        {
            path: '/',
            name: 'index',
            component: () => import('@/view/index.vue'),
            meta:{
              // 页面标题title
              title: '微服务'
            }
        },
        {
            path: '/view/questionnaire',
            name: 'NaireDown',
            component: () => import('@/view/questionnaire/NaireDown.vue'),
            meta:{
              // 页面标题title
              title: '个核问卷'
            }
        },
        {
            path: '/view/appointment',
            name: 'Appointment',
            component: () => import('@/view/appointment/Appointment.vue'),
            meta:{
              // 页面标题title
              title: '体检预约'
            }
        },
        {
          path: '/view/underwritingWiki',
          name: 'underwritingWiki',
          component: () => import('@/view/underwritingWiki/underwritingWiki.vue'),
          meta:{
            // 页面标题title
            title: '核保百科'
          }
        },
        {
          path: '/view/diseaseSearch',
          name: 'diseaseSearch',
          component: () => import('@/view/underwritingWiki/diseaseSearch.vue'),
          meta:{
            // 页面标题title
            title: '核保百科'
          }
        },
        {
          path: '/view/diseaseDetail/:detail_id',
          name: 'diseaseDetail',
          component: () => import('@/view/underwritingWiki/diseaseDetail.vue'),
          meta:{
            // 页面标题title
            title: '核保百科'
          }
        },
        {
          path: '/view/insurancePolicy',
          name: 'insurancepolicy',
          component: () => import('@/view/insurancePolicy/insurancepolicy.vue'),
          meta:{
            // 页面标题title
            title: '领取保单'
          }
        },
        {
          path: '/view/matterpiece',
          name: 'matterpiece',
          component: () => import('@/view/matterpiece/matterpiece.vue'),
          meta:{
            // 页面标题title
            title: '问题件处理'
          }
        },
        {
          path: '/view/mattersearch',
          name: 'mattersearch',
          component: () => import('@/view/matterpiece/mattersearch.vue'),
          meta:{
            // 页面标题title
            title: '问题件处理'
          }
        },
        {
          path: '/view/matterdetail',
          name: 'matterdetail',
          component: () => import('@/view/matterpiece/matterdetail.vue'),
          meta:{
            // 页面标题title
            title: '问题件处理'
          }
        },
        {
          path: '/view/mattersubphoto',
          name: 'mattersubphoto',
          component: () => import('@/view/matterpiece/mattersubphoto.vue'),
          meta:{
            // 页面标题title
            title: '测试页面'
          }
        },
        {
          path: '/view/receiptIndex',
          name: 'receiptindex',
          component: () => import('@/view/receiptProject/receiptIndex.vue'),
          meta:{
            // 页面标题title
            title: '回执通知页',
            keepAlive: false //是否缓存
          }
        },
        {
          path: '/view/receipt',
          name: 'receipt',
          component: () => import('@/view/receiptProject/receipt.vue'),
          meta:{
            // 页面标题title
            title: '未回执清单',
            keepAlive: true //是否缓存
          }
        },
        {
            path: '/view/receiptNotice',
            name: 'receiptNotice',
            component: () => import('@/view/receiptProject/receiptNotice.vue'),
            meta:{
              // 页面标题title
              title: '回执通知',
              keepAlive: false //是否缓存
            }
        },
        {
          path: '/view/renewalIndex',
          name: 'renewalIndex',
          component: () => import('@/view/renewalService/renewalIndex.vue'),
          meta:{
            // 页面标题title
            title: '续期待办',
            keepAlive: false //是否缓存
          }
        },
        {
          path: '/view/renewalService/renewal',
          name: 'renewal',
          component: () => import('@/view/renewalService/renewal.vue'),
          meta:{
            // 页面标题title
            title: '续期待办',
            keepAlive: false //是否缓存
          }
        },
        {
          path: '/view/renewalService/renewalWhole',
          name: 'renewalWhole',
          component: () => import('@/view/renewalService/renewalWhole.vue'),
          meta:{
            // 页面标题title
            title: '续期待办',
            keepAlive: false //是否缓存
          }
        },
        {
          path: '/view/common/error',
          name: 'error',
          component: () => import('@/view/common/error.vue'),
          meta:{
            // 页面标题title
            title: '错误页'
          }
      }
    ]
})