
export default {
  namespaced: true,
  state: {
    isMobile: false,
    theme: 'dark',
    layout: 'side',
    systemName: '玉米苗教育',
    copyright: '2019 玉米苗教育. All Rights Reserved',
    footerLinks: [
      {link: 'https://pro.ant.design', name: 'Pro首页'},
      {link: 'https://github.com/iczer/vue-antd-admin', icon: 'github'},
      {link: 'https://ant.design', name: 'Ant Design'}
    ],
    multipage: true,
  },
  mutations: {
    setDevice (state, isMobile) {
      state.isMobile = isMobile;
    },
    setTheme (state, theme) {
      state.theme = theme;
    },
    setLayout (state, layout) {
      state.layout = layout;
    },
    setMultipage (state, multipage) {
      console.log('setMultipage', multipage);
      state.multipage = multipage;
    }
  }
};
