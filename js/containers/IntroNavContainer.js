import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import IntroNav from '../components/IntroNav'
import { clearApiError } from '../actions/clapit'
import _ from 'lodash'

function stateToProps(state) {
  let { loggingIn, apiError, clapitAccountData, emailLoginError } = state

  return { loggingIn, apiError, clapitAccountData, emailLoginError }
}

function dispatchToProps(dispatch) {
  let actions = _.extend({}, { clearApiError })

  return bindActionCreators(actions, dispatch)
}

export default connect(stateToProps, dispatchToProps)(IntroNav)
