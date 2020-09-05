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
  state,
  getters,
  actions,
  mutations
};