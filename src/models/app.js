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
    lightbulb: false,
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *showTips({ payload }, { select, call, put }) {
      yield put({ type: 'update', payload: { ...payload, updatedAt: Date.now() } })
      yield call(delay, 8000)
      const updatedAt = yield(select(state => state.appModel.updatedAt))
      const duration = Date.now() - updatedAt
      if (duration >= 8000) {
        yield put({ type: 'update', payload: { tips: '' } })
      }
    },

    *hiddenWaifu({ payload }, { call, put }) {
      yield put({ type: 'update', payload: { ...payload, updatedAt: Date.now() } })
      yield call(delay, 2000)
      yield put({ type: 'update', payload: { showWaifu: false } })
    },
  },
}
