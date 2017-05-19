import React from 'react';
import { Link } from 'react-router-dom';
import formatter from '../../util/formatter'
import './index.css'

export default class BackTop extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  componentDidMount() {
    const move = () => {
      const scrollTop = document.documentElement.scrollTop + document.body.scrollTop;

      if( scrollTop > 50) {
        this.show()
      }else {
        this.hide()
      }
    }

    window.addEventListener('scroll',move)
  }


  hide () {
    this.setState({
      visible: false
    })
  }

  show () {
    this.setState({
      visible: true
    })
  }


  render ()  {
    const {visible} = this.state;
    const toTop = (rate) => {
      var doc = document.body ? document.body : document.documentElement;
      var scroll = doc.scrollTop;

      if(!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(fn) {
          setTimeout(fn,1000 / 60);
        }
      }

      const top = function () {
        console.log(scroll);
        scroll = scroll + (0 - scroll) / (rate || 2);
        if(scroll < 1) {
          doc.scrollTop = 0;
          return;
        }
        doc.scrollTop = scroll;
        requestAnimationFrame(top);
      }

      top();
    }

    return (
      <div>
        {
          visible
          ?
          (
            <div className="to-top" onClick={() => toTop()}>

                <span>&lt;</span>

            </div>
          )
          :
          ''
        }
      </div>

    )
  }
}
