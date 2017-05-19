import React from 'react';
import { Link } from 'react-router-dom';

import request from '../util/request'


export default class Detail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      article: {
        banner: '',
      }
    }
  }


  componentDidMount() {
    window.scrollTo(0, 0);
    const { match } = this.props;
    const { id }= match.params;

    request({
      url: `/article/${id}`
    })
    .then(response => {
      if(response) {
        this.setState({
          article: response
        })
      }
    })

  }

  render () {
    const { article } = this.state;
    const { history } = this.props;
    const goBack = () => {
      history.push('/l')
    }
    return (
      <div className="page-detail">
        <div className="back-arrow" onClick={goBack}>&larr;</div>
        <div className="article-wrap">
          <div className="banner">
            <p>{article.title}</p>
            <div className="banner-overlay">
            </div>
            <img src={article.banner} alt=""/>
          </div>

          <div className="padding">
            <div className="author">

            </div>

            <article>
              {article.article}
            </article>


            <div className="back" >
                <a onClick={goBack}>返回主页&nbsp;&gt;</a>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
