import PropTypes from 'prop-types'
import styled from 'styled-components'

const Header = styled.div`
  position: relative;
  padding: .32rem 0;
  margin-bottom: .26rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: .16rem;
  .fa {
    position: absolute;
    color: #999;
    font-size: .18rem;
  }
  .fa-quote-left {
    top: .16rem;
    left: .16rem;
  }
  .fa-quote-right {
    bottom: 0;
    right: .16rem;
  }
`

const Quote = ({ text }) => {
  return (
    <Header>
      <i className="fa fa-quote-left" aria-hidden="true"></i>
      <span>{text}</span>
      <i className="fa fa-quote-right" aria-hidden="true"></i>
    </Header>
  )
}

Quote.propTypes = {
  text: PropTypes.string,
}

export default Quote
