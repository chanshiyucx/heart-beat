import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: inline-block;
  margin: .06rem 0;
  width: 49%;
  border-radius: .03rem;
  background: rgba(255, 255, 255, .4);
  box-shadow: 0 3px 6px rgba(0, 0, 0, .16), 0 3px 6px rgba(0, 0, 0, .24);
  transition: all 0.25s ease 0s, transform 0.5s cubic-bezier(.6, .2, .1, 1) 0s, opacity 0.5s cubic-bezier(.6, .2, .1, 1) 0s;
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, .2), 0 6px 6px rgba(0, 0, 0, .24);
    transform: translateY(-4px);
  }
  @media (max-width: 700px) {
    width: 96%;
  }
`

const Header = styled.div`
  padding: .12rem .16rem 0;
  display: flex;
  justify-content: flex-start;
  img {
    width: 1.2rem;
    height: 1.6rem;
    margin-right: .16rem;
    box-shadow: 4px 6px 10px rgba(0, 0, 0, .2);
  }
`

const Info = styled.div`
  a {
    display: flex;
    align-items: center;
    padding: .06rem 0;
  }
  i {
    font-size: .16rem;
  }
  h2 {
    margin-left: .06rem;
    font-size: .2rem;
    font-weight: normal;
  }
  p {
    margin-top: .06rem;
  }
  p:first-child {
    margin-top: .1rem;
  }
`

const Extra = styled.div`
  margin-top: .05rem;
  i {
    margin-right: .02rem;
    color: #999;
  }
  i.enabled {
    color: #faf;
  }
`

const Desc = styled.p`
  padding: .12rem .16rem;
  line-height: 1.7;
`

const Book = ({
  book,
}) => {
  const { name, author, published, progress, rating, postTitle, postLink, cover, link, desc } = book
  const rateList = new Array(10).fill(1).map((o, i) => {
    return (
      <i key={i} className={`fa fa-star ${i <= 4 ? 'enabled' : ''}`} aria-hidden="true"></i>
    )
  })
  const rate =  [].slice.call(rateList, 5 - parseInt(rating), 10 - parseInt(rating))
  return (
    <Container>
      <Header>
        <img alt="" src={cover} />
        <Info>
          <a href={link} target="_blank">
            <i className="fa fa-external-link" aria-hidden="true"></i>
            <h2>{name}</h2>
          </a>
          <p>作者：{author}</p>
          <p>出版时间：{published}</p>
          <p>阅读进度：{progress}</p>
          <p>
            读书笔记：
            {!!(postLink.trim().length) ? (
              <a href={postLink} target="_blank">
                {postTitle}
              </a>
            ) : (
              '暂无'
            )}
          </p>
          <Extra>
            推荐指数：
            {
              rate
            }
          {/*  <Rating disabled maxRating={5} defaultRating={+rating} icon="star" size="large" /> */}
          </Extra>
        </Info>
      </Header>
      <Desc>{desc}</Desc>
    </Container>
  )
}

Book.propTypes = {
  book: PropTypes.any,
}

export default Book
