export default {
  namespace: 'appModel',
  state: {
    open: false,
    openIndex: 0,
    route: '',
  },
  reducers: {
    handleToggle(state, { payload }) {
      return { ...state, ...payload }
    },

    switchRoute(state, { payload }) {
      return { ...state, ...payload }
    },

  },
  effects: {
  },
}
