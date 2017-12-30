import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  margin-top: 60px;
  background-color: rgba(255, 255, 255, .6);
`

const Comment = ({
  comments,
  number,
}) => {
  // const issuesUrl = `https://github.com/chanshiyucx/blog/issues/${number}`

  return (
    <Container id='gitalk'>

    </Container>
  )
}

Comment.propTypes = {
  Comment: PropTypes.array,
  number: PropTypes.number,
}

export default Comment
