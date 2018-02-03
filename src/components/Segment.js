import PropTypes from 'prop-types'
import styled from 'styled-components'
import marked from 'marked'

const Container = styled.div`
  margin: .16rem 0;
  padding: .16rem;
  border-top: 2px solid ${props => props.color || '#faf'};
  border-radius: .03rem;
  background: rgba(255, 255, 255, .4);
  box-shadow: 0 3px 6px rgba(0, 0, 0, .16), 0 3px 6px rgba(0, 0, 0, .24);
  transition: transform 0.6s cubic-bezier(.6, .2, .1, 1) 0s;
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, .2), 0 6px 6px rgba(0, 0, 0, .24);
    transform: translateY(-4px);
  }
`

const Label = styled.span`
  position: relative;
  left: -.304rem;
  padding: .06rem .144rem .06rem .304rem;
  font-size: .12rem;
  color: #fff;
  border-radius: 0 .03rem .03rem 0;
  background: ${props => props.color || '#faf'};
  &::after {
    position: absolute;
    content: '';
    top: 100%;
    left: 0;
    width: 0;
    height: 0;
    background-color: transparent;
    border-style: solid;
    border-width: 0 .144rem .144rem 0;
    border-color: transparent;
    border-right-color: ${props => props.color || '#faf'};
    filter:brightness(120%)
  }
`

const Inner = styled.div`
  margin-top: .12rem;
  p, ol, ul {
    line-height: 1.7;
  }
  p {
    margin-top: .12rem;
  }
  ol, ul {
    margin: .06rem .24rem .06rem .5rem;
  }
`
const Segment = ({
  color,
  title,
  content,
}) => {
  return (
    <Container color={color}>
      <Label color={color}>
        {title}
      </Label>
      <Inner dangerouslySetInnerHTML={{__html: marked(content)}} />
    </Container>
  )
}

Segment.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
}

export default Segment
