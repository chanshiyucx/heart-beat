import { delay } from '../utils'

export default {
  namespace: 'appModel',
  state: {
    dropMenu: false,
    showPlayer: false,
    isPlaying: false,
    showWaifu: true,
    waifu: 'tia',
    updatedAt: '',
    tips: '',
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
      yield put({ type: 'update', payload: { showWaifu: false } })
    },

    *showTips({ payload }, { select, call, put }) {
      yield put({ type: 'update', payload })
      yield call(delay, 8000)
      const updatedAt = yield(select(state => state.appModel.updatedAt))
      const duration = Date.now() - updatedAt
      if (duration >= 8000) {
        yield put({ type: 'update', payload: { tips: '' } })
      }
    }
  },
}
