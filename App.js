import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList,Dimensions,Image } from 'react-native';
import axios from 'axios';

const {height, width} = Dimensions.get('window')

export default class App extends Component {

  constructor(props){
    super(props);
    this.state={
      isLoading: true,
      images:[]
    }
    this.loadWallpaper=this.loadWallpaper.bind(this);
    this.renderItem=this.renderItem.bind(this)
  }

  loadWallpaper(){
    axios
    .get( 
      'https://api.unsplash.com/photos/client_id=tWdx-B8D3cQHMyXkpqzbS5tUYqtNbcLO5mQbc__2gAA?query=house'
    )
    .then(function(response){
      console.log(response.data)
      this.setState({
        images:response.data, isLoading:false
      }) 
    }.bind(this))
    .catch(function(error){
      console.log(error)
    })
    .finally(function(){
      console.log('request completed')
    })
  }

  componentDidMount(){
    this.loadWallpaper()
  }

  renderItem(image){
    return(
      <View style={{height,width}}>
        <Image
        style={{flex:1,height:null,width:null}}
        source={{uri:image.uri.regular}}
        resizeMode='cover'/>
      </View>
    )
  }
  

  render(){

    return this.state.isLoading? (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='grey'/>
      </View>
    ) : (<View style={styles.container}>
      <FlatList 
      horizontal
      pagingEnabled
      data={this.state.images}
      renderItem={(({item})=>this.renderItem(item))}/>
    </View>)
  }
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

