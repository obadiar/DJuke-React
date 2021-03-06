import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Picker,
  Modal
} from 'react-native';

import { Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeModules } from 'react-native';
const { RNNetworkInfo } = NativeModules;

export default class AddQueueItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedItem: '',
      bid: 0.00,
      modalVisible: false
    }
    this.handleClick = this.handleClick.bind(this);

  }


  handleClick(id) {
    this.setState({modalVisible: true, clickedItem: id});
  }
  render() {
    const {songImage,title, artist, id, duration, submitSongQueue, saveSongAsync, showAlreadyPlayed} = this.props;
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);
    return(
      <View key={id}>
      <Modal
      animationType="slide"
      transparent={false}
      visible={this.state.modalVisible}
      onRequestClose={() => {alert("Modal has been closed.")}}
      >
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding:10, backgroundColor:'#2980b9'}}>
             <Text style={{color: 'white'}}>Enter a bid for <Text style={{fontWeight: 'bold'}}>{title} by {artist}</Text>. Remember - the more you bid the more likely your song will be played!</Text>
             <TextInput
               style={{height: 40, width: 100,paddingLeft: 10,fontSize: 15, borderColor: 'grey', borderWidth: 1, borderRadius: 10,backgroundColor: 'white', marginTop: 20}}
               keyboardType = 'numeric'
               onChangeText={(bid) => {this.setState({bid: parseInt(bid)})}}
               value={this.state.bid}
               placeholder= "$$"
             />

             <TouchableOpacity style={{marginTop: 15}} onPress={() => {
               this.setState({modalVisible: !this.state.modalVisible});
               console.log("id of song added", id, this.state.bid , this.props.usedAPI);
                  saveSongAsync({
                    songImage,
                    title,
                    artist,
                    id,
                    duration
                  })
                 submitSongQueue({
                   id,
                   payment: parseInt(this.state.bid),
                   type: this.props.usedAPI
                 })

             }}>
               <Text style={{color: 'aquamarine'}}>Submit</Text>
             </TouchableOpacity>

        </View>
    </Modal>
      <TouchableOpacity onPress={() => this.handleClick(id)}>
      <View style={{flex: 1, flexDirection: 'row', marginTop:15}}>
        {songImage ? <Image
          style={{width: 50, height: 50, marginRight: 10}}
          source={{uri: songImage}}
        /> :
        <Image
          style={{width: 50, height: 50, marginRight: 10}}
          source={require('../assets/images/robot-dev.png')}
        /> }
        <View>
          <Text style={{color: 'white'}}>{title} - {artist}</Text>
          <Text style={{color: 'white'}}>{minutes}:{seconds}</Text>
        </View>
      </View>
      </TouchableOpacity>
      </View>
    )
  }

}
