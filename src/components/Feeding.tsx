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

export const FeedingDisplay = (metadataObj, language) => {
  return (
    <View>
      <Text>{LocalizedStrings[language].provider}: {metadataObj.doctor} </Text>
      <Text>{LocalizedStrings[language].exclusiveBreastfeeding}: {formatBooleanDisplay(metadataObj.exclusiveBreastfeeding, language)}</Text>
      {!!metadataObj.exclusiveBreastfeeding ? <Text>{LocalizedStrings[language].durationOfExclusiveBreastfeeding}: {metadataObj.durationOfExclusiveBreastfeeding}</Text> : null}
      <Text>{LocalizedStrings[language].mixedBreastfeeding}: {formatBooleanDisplay(metadataObj.mixedBreastfeeding, language)}</Text>
      {!!metadataObj.mixedBreastfeeding ? <Text>{LocalizedStrings[language].mixedBreastfeedingDuration}: {metadataObj.mixedBreastfeedingDuration}</Text> : null}
      <Text>{LocalizedStrings[language].ablactation}: {metadataObj.ablactation}</Text>
    </View>)
}

const Feeding = (props) => {
  const [exclusiveBreastfeeding, setExclusiveBreastfeeding] = useState(null);
  const [durationOfExclusiveBreastfeeding, setDurationOfExclusiveBreastfeeding] = useState(null);
  const [mixedBreastfeeding, setMixedBreastfeeding] = useState(null);
  const [mixedBreastfeedingDuration, setMixedBreastfeedingDuration] = useState(null);
  const [ablactation, setAblactation] = useState(null);
  const [language, setLanguage] = useState(props.navigation.getParam('language', 'sp'));

  const patientId = props.navigation.getParam('patientId');
  const visitId = props.navigation.getParam('visitId');
  const userName = props.navigation.getParam('userName');

  const submit = async () => {
    database.addEvent({
      id: uuid(),
      patient_id: patientId,
      visit_id: visitId,
      event_type: EventTypes.Feeding,
      event_metadata: JSON.stringify({
        doctor: userName,
        exclusiveBreastfeeding,
        durationOfExclusiveBreastfeeding,
        mixedBreastfeeding,
        mixedBreastfeedingDuration,
        ablactation,
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
          <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].feeding}</Text>
        </View>

        <View style={styles.responseRow}>
          {radioButtons({ field: exclusiveBreastfeeding, action: setExclusiveBreastfeeding, prompt: LocalizedStrings[language].exclusiveBreastfeeding, language })}
        </View>
        {!!exclusiveBreastfeeding ?
          <View>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.inputs}
                placeholder= {LocalizedStrings[language].ageOfOnset}
                onChangeText={(text) => setDurationOfExclusiveBreastfeeding(text)}
                value={durationOfExclusiveBreastfeeding}
              />
            </View>
          </View> :
          null
        }

        <View style={styles.responseRow}>
          {radioButtons({ field: mixedBreastfeeding, action: setMixedBreastfeeding, prompt: LocalizedStrings[language].mixedBreastfeeding, language })}
        </View>
        {!!mixedBreastfeeding ?
          <View>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.inputs}
                placeholder= {LocalizedStrings[language].startAge}
                onChangeText={(text) => setMixedBreastfeedingDuration(text)}
                value={mixedBreastfeedingDuration}
              />
            </View>
          </View> :
          null
        }
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].ablactation}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setAblactation(text)}
            value={ablactation}
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

export default Feeding;
