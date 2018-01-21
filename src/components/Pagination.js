import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: .12rem;
`

const Button = styled.button`
  padding: .12rem .2rem;
  color: ${props => props.disabled ? '#999' : '#666'};
  font-size: .12rem;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  outline: 0;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0,.1);
  border-radius: .03rem;
  background: rgba(255, 255, 255, .6);
  transition: opacity .1s ease,background-color .1s ease,color .1s ease,box-shadow .1s ease,background .1s ease;
  &:hover {
    box-shadow: ${props => props.disabled ? '' : '0 0 40px #999 inset'};
  }
`

const PreBtn = Button.extend`
  margin-right: -.1rem;
`

const NextBtn = Button.extend`
  margin-left: -.1rem;
`

const Page = styled.span`
  display: inline-block;
  width: .26rem;
  height: .26rem;
  line-height: .26rem;
  text-align: center;
  border-radius: 50%;
  background: #fff;
  z-index: 10;
`

const Pagination = ({
  maxPage,
  page,
  prev,
  next,
}) => {
  return (
    <Container>
      <PreBtn disabled={page <= 1} onClick={prev}>
        上一页
      </PreBtn>
      <Page>{page}</Page>
      <NextBtn disabled={page >= maxPage} onClick={next}>
        下一页
      </NextBtn>
    </Container>
  )
}

Pagination.propTypes = {
  maxPage: PropTypes.number,
  page: PropTypes.number,
  prev: PropTypes.func,
  next: PropTypes.func,
}

export default Pagination
