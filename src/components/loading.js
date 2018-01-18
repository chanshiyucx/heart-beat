import styled from 'styled-components'
import config from '../config'

const Container = styled.div`
  text-align: center;
  img {
    width: 100px;
  }
`

const Loading = () => {
  return (
    <Container>
      <img alt="" src={config.loadingImg} />
    </Container>
  )
}

export default Loading
