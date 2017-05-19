import React from 'react';
import List from './List';
import Detail from './Detail';
import {
  Route
  // Redirect
} from 'react-router-dom';
import BackTop from '../compoents/BackTop/'
import request from '../util/request'


export default class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      user: {}
    }
  }

  componentDidMount() {

  }

  render() {

    return (
      <div>
        {/* <Redirect to="/l"></Redirect> */}
          {/* <Route path="" component={List} ></Route> */}
         <Route path="/l" component={List} ></Route>
         <Route path="/a/:id" component={Detail}></Route>
         <BackTop></BackTop>
      </div>
    )
  }
}
