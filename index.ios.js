/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 /*
//ES5和ES6的写法有几个不同：
//引入模块的方法不同，
//创建组件的方式不同, 
//ES5传统静态成员定义方式，显式声明getDefaultProps()& getInitialState()，且在getInitialState中需要用return将一个对象字面量返回；
//对于ES6写法中可以用constructor来处理属性和状态
//this指向不同
//变量声明的不同（ES5中只能用var）
//ES6写法中无法使用mixin


//ES5引入模块
// var React = require('react')
// var ReactNative = require('react-native')
// var Component = React.Component
// var AppRegistry = ReactNative.AppRegistry
// var StyleSheet = ReactNative.StyleSheet
// var Text = ReactNative.Text
// var View = ReactNative.View

//ES6引入模块
*/
import React,{Component} from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'

/*
//ES5组件声明方式（构造函数），方法定义和属性声明上与ES6不同
//this指向rn已经帮我们处理好了，不需要额外bind设置context
*/

var AwesomePrj = React.createClass({
  //ES5中定义一个方法：方法名＋冒号＋function,每个函数结尾要逗号
  getDefaultProps: function(){
    console.log('father',"getDefaultProps")
  },

  getInitialState: function(){
    console.log('father',"getInitialState")
    return{
      times:2,
      hit:false
    };
  },

  componentWillMount: function(){
    console.log('father',"componentWillMount")
  },

  componentDidMount: function(){
    console.log('father',"componentDidMount")
  },

  shouldComponentWillUpdate: function(){
    console.log('father',"componentWillUpdate")
    return true;
  },

  componentWillUpdate: function(){
    console.log('father',"componentWillUpdate")
  },

  componentDidUpdate: function(){
    console.log('father',"componentDidUpdate")
  },

  timesReset: function(){
    this.setState({
      times:0
    })
  },

  willHit: function(){
    this.setState({
      hit:!this.state.hit
    })
  },

  timesPlus: function(){
    var times = this.state.times
    times+=3
    this.setState({
      times:times
    })
  },

  render: function(){
    console.log('father',"render")
    return(
      <View style={styles.container}>
        {
          this.state.hit
          ? <Son times={this.state.times} timesReset={this.timesReset}/>
          : null     
        }
        <Text style={styles.welcome} onPress={this.timesReset}>
          老子说，心情好放你一马。
        </Text>
        <Text style={styles.welcome} onPress={this.willHit}>
          到底揍不揍？
        </Text>
        <Text style={styles.welcome}>
          就揍了你{this.state.times}次而已
        </Text>
        <Text style={styles.welcome} onPress={this.timesPlus}>
          不听话，再揍你 3 次
        </Text>
      </View>
      )
  }
});

  

/*ES6组件声明方式*/

class Son extends Component{

  constructor(props){
    //继承外面拿到的属性
    super(props)
    /*设置初始状态值*/
    this.state={
      times:this.props.times
    }
  }
  componentWillMount(){
    console.log('Son',"componentWillMount")
  }

  componentDidMount(){
    console.log('Son',"componentDidMount")
  }

  componentWillReceiveProps(props){
    console.log(this.props)
    console.log('Son',"componentWillUpdate")
    this.setState({
      times:props.times
    })
  }

   shouldComponentWillUpdate(){
    console.log('Son',"componentWillUpdate")
    return true;
  }

  componentWillUpdate(){
    console.log('Son',"componentWillUpdate")
  }

  componentDidUpdate(){
    console.log('Son',"componentDidUpdate")
  }

  timesReset(){
    this.props.timesReset();
  }
  timesPlus(){
    console.log("son timeplus")
    var times = this.state.times
    times++
    this.setState({
      times:times
    })
  }

  render(){
    console.log('Son',"render")
    return(
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={this.timesPlus.bind(this)}>
          儿子说，有本事揍我啊。
        </Text>
        <Text style={styles.welcome}>
          你居然揍我{this.state.times}次
        </Text>
        /*<Text style={styles.welcome}>
          就揍了你{this.state.times}次而已
        </Text>*/
        <Text style={styles.welcome} onPress={this.timesReset.bind(this)}>
          信不信我亲亲你
        </Text>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

AppRegistry.registerComponent('AwesomePrj', () => AwesomePrj);
