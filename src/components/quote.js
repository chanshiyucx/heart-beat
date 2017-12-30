import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'

const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px 0;
  margin-bottom: 26px;
`

const QuoteLeft =styled(Icon)`
  position: absolute;
  top: 16px;
  left: 16px;
  color: #999;
`

const QuoteRight =styled(Icon)`
  position: absolute;
  bottom: 0;
  right: 16px;
  color: #999;
`

const Text = styled.span`
  padding: 8px;
  font-size: 16px;
`

const Quote = ({
  text,
}) => {
  return(
    <Header>
      <QuoteLeft name='quote left' size='large'/>
      <Text>{text}</Text>
      <QuoteRight name='quote right' size='large'/>
    </Header>
  )
}

Quote.propTypes = {
  text: PropTypes.string,
}

export default Quote
