import { delay } from '../utils'

export default {
  namespace: 'appModel',
  state: {
    dropMenu: false,
    showPlayer: false,
    isPlaying: false,
    showPio: true,
    tips: '欢迎来到<font color=#f6f> 蝉時雨 </font>！',
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *hiddenPio({ payload }, { call, put }) {
      yield put({ type: 'update', payload: { tips: '最美不过分别时' } })
      yield call(delay, 1600)
      yield put({ type: 'update', payload: { showPio: false } })
    },
  },
}
