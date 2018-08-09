/*
 * https://github.com/Semantic-Org/Semantic-UI-React/blob/master/src/modules/Transition/Transition.js
 * Modified by 蝉時雨
 * Modified date 2018-07-01
 */

import { cloneElement, Component } from 'react'
import _ from 'lodash'
import classNames from 'classnames/bind'

import styles from './index.less'

const cx = classNames.bind(styles)

const useKeyOnly = (val, key) => val && key

const normalizeTransitionDuration = (duration, type) => (
  (typeof duration === 'number' || typeof duration === 'string') ? duration : duration[type]
)

const DIRECTIONAL_TRANSITIONS = [
  'browse', 'browse right',
  'drop',
  'fade', 'fade up', 'fade down', 'fade left', 'fade right',
  'fly up', 'fly down', 'fly left', 'fly right',
  'horizontal flip', 'vertical flip',
  'scale',
  'slide up', 'slide down', 'slide left', 'slide right',
  'swing up', 'swing down', 'swing left', 'swing right',
  'zoom',
]

// const STATIC_TRANSITIONS = ['jiggle', 'flash', 'shake', 'pulse', 'tada', 'bounce', 'glow']
// const TRANSITIONS = [...DIRECTIONAL_TRANSITIONS, ...STATIC_TRANSITIONS]

const TRANSITION_TYPE = {
  ENTERING: 'show',
  EXITING: 'hide',
}

/**
 * A transition is an animation usually used to move content in or out of view.
 */
export default class Transition extends Component {
  static defaultProps = {
    animation: 'fade',
    duration: 500,
    visible: true,
    mountOnShow: true,
    transitionOnMount: false,
    unmountOnHide: false,
  }

  static _meta = {
    name: 'Transition',
    type: 'module',
  }

  static ENTERED = 'ENTERED'
  static ENTERING = 'ENTERING'
  static EXITED = 'EXITED'
  static EXITING = 'EXITING'
  static UNMOUNTED = 'UNMOUNTED'

  constructor(...args) {
    super(...args)

    const { initial: status, next } = this.computeInitialStatuses()
    this.nextStatus = next
    this.state = { status }
  }

  // ----------------------------------------
  // Lifecycle
  // ----------------------------------------

  componentDidMount() {
    this.mounted = true
    this.updateStatus()
  }

  componentWillReceiveProps(nextProps) {
    const { current: status, next } = this.computeStatuses(nextProps)

    this.nextStatus = next
    if (status) this.setSafeState({ status })
  }

  componentDidUpdate() {
    this.updateStatus()
  }

  componentWillUnmount() {
    this.mounted = false
  }

  // ----------------------------------------
  // Callback handling
  // ----------------------------------------

  handleStart = () => {
    const { duration } = this.props
    const status = this.nextStatus

    this.nextStatus = null
    this.setSafeState({ status, animating: true }, () => {
      const durationType = TRANSITION_TYPE[status]
      const durationValue = normalizeTransitionDuration(duration, durationType)

      _.invoke(this.props, 'onStart', null, { ...this.props, status })
      setTimeout(this.handleComplete, durationValue)
    })
  }

  handleComplete = () => {
    const { status: current } = this.state

    _.invoke(this.props, 'onComplete', null, { ...this.props, status: current })

    if (this.nextStatus) {
      this.handleStart()
      return
    }

    const status = this.computeCompletedStatus()
    const callback = current === Transition.ENTERING ? 'onShow' : 'onHide'

    this.setSafeState({ status, animating: false }, () => {
      _.invoke(this.props, callback, null, { ...this.props, status })
    })
  }

  updateStatus = () => {
    const { animating } = this.state

    if (this.nextStatus) {
      this.nextStatus = this.computeNextStatus()
      if (!animating) this.handleStart()
    }
  }

  // ----------------------------------------
  // Helpers
  // ----------------------------------------

  computeClasses = () => {
    const { animation, children } = this.props
    const { animating, status } = this.state

    const childClasses = _.get(children, 'props.className')
    const directional = _.includes(DIRECTIONAL_TRANSITIONS, animation)

    if (directional) {
      return cx(
        animation,
        childClasses,
        useKeyOnly(animating, 'animating'),
        useKeyOnly(status === Transition.ENTERING, 'in'),
        useKeyOnly(status === Transition.EXITING, 'out'),
        useKeyOnly(status === Transition.EXITED, 'hidden'),
        useKeyOnly(status !== Transition.EXITED, 'visible'),
        'transition',
      )
    }

    return cx(
      animation,
      childClasses,
      useKeyOnly(animating, 'animating'),
      useKeyOnly(animating, 'transition'),
    )
  }

  computeCompletedStatus = () => {
    const { unmountOnHide } = this.props
    const { status } = this.state

    if (status === Transition.ENTERING) return Transition.ENTERED
    return unmountOnHide ? Transition.UNMOUNTED : Transition.EXITED
  }

  computeInitialStatuses = () => {
    const {
      visible,
      mountOnShow,
      transitionOnMount,
      unmountOnHide,
    } = this.props

    if (visible) {
      if (transitionOnMount) {
        return {
          initial: Transition.EXITED,
          next: Transition.ENTERING,
        }
      }
      return { initial: Transition.ENTERED }
    }

    if (mountOnShow || unmountOnHide) return { initial: Transition.UNMOUNTED }
    return { initial: Transition.EXITED }
  }

  computeNextStatus = () => {
    const { animating, status } = this.state

    if (animating) return status === Transition.ENTERING ? Transition.EXITING : Transition.ENTERING
    return status === Transition.ENTERED ? Transition.EXITING : Transition.ENTERING
  }

  computeStatuses = (props) => {
    const { status } = this.state
    const { visible } = props

    if (visible) {
      return {
        current: status === Transition.UNMOUNTED && Transition.EXITED,
        next: (status !== Transition.ENTERING && status !== Transition.ENTERED) && Transition.ENTERING,
      }
    }

    return {
      next: (status === Transition.ENTERING || status === Transition.ENTERED) && Transition.EXITING,
    }
  }

  computeStyle = () => {
    const { children, duration } = this.props
    const { status } = this.state

    const childStyle = _.get(children, 'props.style')
    const type = TRANSITION_TYPE[status]
    const animationDuration = type && `${normalizeTransitionDuration(duration, type)}ms`

    return { ...childStyle, animationDuration }
  }

  setSafeState = (...args) => this.mounted && this.setState(...args)

  // ----------------------------------------
  // Render
  // ----------------------------------------

  render() {
    const { children } = this.props
    const { status } = this.state

    if (status === Transition.UNMOUNTED) return null
    return cloneElement(children, {
      className: this.computeClasses(),
      style: this.computeStyle(),
    })
  }
}