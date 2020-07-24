import React from 'react';
import ReactDOM from 'react-dom';
// import { message } from 'antd';
// import { DatePicker, message } from 'antd';
 
// 引入css
// import '../src/main.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    };
  }
//   handleChange(date) {
//     message.info('您选择的日期是: ' + date.toString());
//     this.setState({ date });
//   }
    clickEvent(){
        console.log('点击了我');
        // message.info('点击了我');
    }
  render() {
    return (
      <div style={{ width: 400, margin: '100px auto' }} onClick={() => this.clickEvent()}>
          Hello World!
        {/* <DatePicker onChange={value => this.handleChange(value)} />
        <div style={{ marginTop: 20 }}>当前日期：{this.state.date.toString()}</div> */}
      </div>
    );
  }
}
 
ReactDOM.render(<App />, document.getElementById('root'));