export default {
  namespace: 'appModel',
  state: {
    dropMenu: false,
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
  },
}
