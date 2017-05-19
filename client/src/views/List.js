import React from 'react';
import ListItem from '../compoents/ListItem/'
// import imgs from '../../test/imgs.json'

import request from '../util/request'


export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      articles: [],
      total: 14,
      page: 1,
      scrollTop: 0
    };

    this.doc = document.body ? document.body : document.documentElement;
    // 兼容性处理

    this.setScrollTop = this.setScrollTop.bind(this); //移除和绑定事件就指向同一个函数了
  }

  setScrollTop() {
    console.log(this);
    var scrollTop = this.doc.scrollTop;
    this.setState({
      scrollTop
    });
    this.store();
  }

  componentDidMount() {
    let state = sessionStorage.getItem('listState');
    let doc = this.doc;

    console.log(this.props);


    if(state) { // 缓存
      state = JSON.parse(state);
      this.setState(state);
      setTimeout(() => {
        this.doc.scrollTop  = state.scrollTop;
      },0)
    }else {
      this.fetchList()

      request('/user')
        .then(response => {
          if(response) {
            this.setState({
             user: response
           })
          }
        })
    }

    window.addEventListener('scroll', (() => this.setScrollTop)())
    // 需要在销毁组件的时候
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', (() => this.setScrollTop)())
    console.log('removed');
  }



  store() {
    let state = this.state;
    state = JSON.stringify(state);
    sessionStorage.setItem('listState',state);
  }

  fetchList(option) {
    option = option || {};
    option.params = Object.assign({
        flag: 1, // 已发布文章
        perPage: 6
    },option.params)
    option = {url: '/article', ...option};

    return request(option)
            .then(response => {
              const { records, total } = response;
              const state = {
                articles: [...this.state.articles,...records],
                total
              }
              this.setState(state);
              this.store(); // 存储到sessionStorage
            });

  }



  render() {
    const loadMore = () => {
      let { page, articles } = this.state;

      page++

      this.fetchList({
        params: {page}
      })
      .then(() => {
        this.setState({
          page
        })
      })
      // .then(response => {
      //   const { records, total } = response;
      //   this.setState({
      //     page,
      //     articles: articles.concat(records),
      //     total
      //   })
      //
      //   this.store();
      // })
    }

    const navigateTo = (id) => {
      console.log(id);
    }

    const { articles, user , total } = this.state;

    return (
      <div className="page-list">

          <div className="header">
            <div className="avatar">
              <img src={user.avatar} alt={user.username}/>
            </div>
            <p className="name">{user.username}</p>
          </div>

            {
              articles.length
              ?
              (
                <div>
                  <ol  className="list">
                    {
                      articles.map(item => {
                        return <ListItem {...item} key={item.id} onClick={navigateTo}></ListItem>
                      })
                    }
                  </ol>

                  <div className="btn-wrap">
                    {
                      articles.length < total
                      ?
                      <button onClick={loadMore}>加载更多</button>
                      :
                      <button disabled>没有更多了</button>
                    }
                  </div>
                </div>
              )
              :
              (
                <p className="no-more">
                  <span>無</span>
                </p>
              )
            }
      </div>
    )

  }
}
