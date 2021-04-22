const state = {
  isAuthorized: false
};

const getters = {
  isAuthorized: state => state.isAuthorized
};

const actions = {
    setIsAuthorized({ commit }, isAuthorized) {
        commit('setIsAuthorized', isAuthorized);
    },
};

const mutations = {
  setIsAuthorized: (state, isAuthorized) => (state.isAuthorized = isAuthorized),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};