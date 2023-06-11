import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, Button, TouchableOpacity
} from 'react-native';

import { database } from "../storage/Database";
import { v4 as uuid } from 'uuid';
import styles from './Style';
import { EventTypes } from '../enums/EventTypes';
import { LocalizedStrings } from '../enums/LocalizedStrings';
import radioButtons from './shared/RadioButtons';
import Header from './shared/Header';
import { formatTextDisplay, formatBooleanDisplay } from './shared/EventFieldDisplay';

export const PostnatalHistoryDisplay = (metadataObj, language) => {
  return (
    <View>
      <Text>{LocalizedStrings[language].provider}: {metadataObj.doctor} </Text>
      <Text>{LocalizedStrings[language].apgar}: {metadataObj.apgar}</Text>
      <Text>{LocalizedStrings[language].weightInGrams}: {metadataObj.weightInGrams}</Text>
      <Text>{LocalizedStrings[language].sizeInCentimeters}: {metadataObj.sizeInCentimeters}</Text>
      <Text>{LocalizedStrings[language].suffocation}: {formatBooleanDisplay(metadataObj.suffocation, language)}</Text>
      {!!metadataObj.suffocation ? <Text>{LocalizedStrings[language].specify}: {metadataObj.suffocationSpecify}</Text> : null}
      <Text>{LocalizedStrings[language].roomingIn}: {metadataObj.roomingIn}</Text>
      <Text>{LocalizedStrings[language].hospitalization}: {metadataObj.hospitalization}</Text>
    </View>)
}

const PostnatalHistory = (props) => {
  const [apgar, setApgar] = useState(null);
  const [weightInGrams, setWeightInGrams] = useState(null);
  const [sizeInCentimeters, setSizeInCentimeters] = useState(null);
  const [suffocation, setSuffocation] = useState(null);
  const [suffocationSpecify, setSuffocationSpecify] = useState(null);
  const [roomingIn, setRoomingIn] = useState(null);
  const [hospitalization, setHospitalization] = useState(null);
  const [language, setLanguage] = useState(props.navigation.getParam('language', 'sp'));

  const patientId = props.navigation.getParam('patientId');
  const visitId = props.navigation.getParam('visitId');
  const userName = props.navigation.getParam('userName');

  const submit = async () => {
    database.addEvent({
      id: uuid(),
      patient_id: patientId,
      visit_id: visitId,
      event_type: EventTypes.PostnatalHistory,
      event_metadata: JSON.stringify({
        doctor: userName,
        apgar,
        weightInGrams,
        sizeInCentimeters,
        suffocation,
        suffocationSpecify,
        roomingIn,
        hospitalization
      })
    }).then(() => {
      props.navigation.navigate('NewVisit')
    })
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.containerLeft}>
        {Header({ action: () => props.navigation.navigate('NewVisit', { language }), language, setLanguage })}
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
            onPress={() => submit()} />
        </View>
      </View>
    </ScrollView>
  );
};

export default PostnatalHistory;
