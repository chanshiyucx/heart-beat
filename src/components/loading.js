import styled from 'styled-components'
import config from '../config'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 500px;
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
