const state = {
  orders: {},
  reviews: {},
  newsList: {},
  tips: {},
};

const getters = {
  orders: state => state.orders,
  reviews: state => state.reviews,
  newsList: state => state.newsList,
  tips: state => state.tips,
};

const actions = {
  saveOrderSearchCondition({ commit }, data) {
    console.log('saveOrderSearchCondition')
    console.log(data)
    commit('saveOrderSearchCondition', data);
  },
  saveReviewSearchCondition({ commit }, data) {
    commit('saveReviewSearchCondition', data);
  },
  saveNewsSearchCondition({ commit }, data) {
    commit('saveNewsSearchCondition', data);
  },
  saveTipSearchCondition({ commit }, data) {
    commit('saveTipSearchCondition', data);
  },
};

const mutations = {
  saveOrderSearchCondition: (state, data) => (state.orders = data),
  saveReviewSearchCondition: (state, data) => (state.reviews = data),
  saveNewsSearchCondition: (state, data) => (state.newsList = data),
  saveTipSearchCondition: (state, data) => (state.tips = data),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};