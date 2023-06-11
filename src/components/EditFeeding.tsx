import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, Button, TouchableOpacity
} from 'react-native';

import { database } from "../storage/Database";
import styles from './Style';
import { LocalizedStrings } from '../enums/LocalizedStrings';
import radioButtons from './shared/RadioButtons';
import Header from './shared/Header';

const EditFeeding = (props) => {
  const event = props.navigation.getParam('event');
  const userName = props.navigation.getParam('userName');
  const [exclusiveBreastfeeding, setExclusiveBreastfeeding] = useState(null);
  const [durationOfExclusiveBreastfeeding, setDurationOfExclusiveBreastfeeding] = useState(null);
  const [mixedBreastfeeding, setMixedBreastfeeding] = useState(null);
  const [mixedBreastfeedingDuration, setMixedBreastfeedingDuration] = useState(null);
  const [ablactation, setAblactation] = useState(null);

  const [language, setLanguage] = useState(props.navigation.getParam('language', 'sp'));

  useEffect(() => {
    if (!!event.event_metadata) {
      const metadataObj = JSON.parse(event.event_metadata)
      setExclusiveBreastfeeding(metadataObj.exclusiveBreastfeeding)
      setDurationOfExclusiveBreastfeeding(metadataObj.durationOfExclusiveBreastfeeding)
      setMixedBreastfeeding(metadataObj.mixedBreastfeeding)
      setMixedBreastfeeding(metadataObj.mixedBreastfeedingDuration)
      setAblactation(metadataObj.ablactation)
    }
  }, [props])

  const submitFeeding = async () => {
    database.editEvent(
      event.id,
      JSON.stringify({
        doctor: userName,
        exclusiveBreastfeeding,
        durationOfExclusiveBreastfeeding,
        mixedBreastfeeding,
        mixedBreastfeedingDuration,
        ablactation,
      })
    ).then((response) => props.navigation.navigate('EventList', { events: response, language }))
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.containerLeft}>
        {Header({ action: () => props.navigation.navigate('EventList', { language }), language, setLanguage })}
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
            onPress={() => submitFeeding()} />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditFeeding;
