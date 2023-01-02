import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, Button, TouchableOpacity
} from 'react-native';

import { database } from "../storage/Database";
import styles from './Style';
import { LocalizedStrings } from '../enums/LocalizedStrings';
import radioButtons from './shared/RadioButtons';
import Header from './shared/Header';

const EditPostnatalHistory = (props) => {
  const event = props.navigation.getParam('event');
  const userName = props.navigation.getParam('userName');
  const [apgar, setApgar] = useState(null);
  const [weightInGrams, setWeightInGrams] = useState(null);
  const [sizeInCentimeters, setSizeInCentimeters] = useState(null);
  const [suffocation, setSuffocation] = useState(null);
  const [suffocationSpecify, setSuffocationSpecify] = useState(null);
  const [roomingIn, setRoomingIn] = useState(null);
  const [hospitalization, setHospitalization] = useState(null);

  const [language, setLanguage] = useState(props.navigation.getParam('language', 'en'));

  useEffect(() => {
    if (!!event.event_metadata) {
      const metadataObj = JSON.parse(event.event_metadata)
      setApgar(metadataObj.apgar)
      setWeightInGrams(metadataObj.weight)
      setSizeInCentimeters(metadataObj.sizeInCentimeters)
      setSuffocation(metadataObj.suffocation)
      setSuffocationSpecify(metadataObj.suffocationSpecify)
      setRoomingIn(metadataObj.roomingIn)
      setHospitalization(metadataObj.hospitalization)
    }
  }, [props])

  const submitPostnatalHistory = async () => {
    database.editEvent(
      event.id,
      JSON.stringify({
        doctor: userName,
        apgar,
        weightInGrams,
        sizeInCentimeters,
        suffocation,
        suffocationSpecify,
        roomingIn,
        hospitalization
      })
    ).then((response) => props.navigation.navigate('EventList', { events: response, language }))
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.containerLeft}>
        {Header({ action: () => props.navigation.navigate('EventList', { language }), language, setLanguage })}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', }}>
          <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].postnatalHistory}</Text>
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].apgar}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setApgar(text)}
            value={apgar}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].weightInGrams}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setWeightInGrams(text)}
            value={weightInGrams}
            keyboardType='numeric'
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].sizeInCentimeters}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setSizeInCentimeters(text)}
            value={sizeInCentimeters}
            keyboardType='numeric'
          />
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: suffocation, action: setSuffocation, prompt: LocalizedStrings[language].suffocation, language })}
        </View>
        {!!suffocation ?
          <View>
            <View style={styles.inputRow}>
              <TextInput
                multiline={true}
                numberOfLines={10}
                style={styles.inputs}
                onChangeText={(text) => setSuffocationSpecify(text)}
                value={suffocationSpecify}
              />
            </View>
          </View> : null
        }
        <View style={styles.responseRow}>
          {radioButtons({ field: roomingIn, action: setRoomingIn, prompt: LocalizedStrings[language].roomingIn, language })}
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].hospitalization}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setHospitalization(text)}
            value={hospitalization}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Button
            title={LocalizedStrings[language].save}
            color={'#F77824'}
            onPress={() => submitPostnatalHistory()} />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditPostnatalHistory;
