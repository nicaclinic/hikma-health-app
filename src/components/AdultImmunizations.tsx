import React, { useState } from 'react';
import {
  View, Text, TextInput, ScrollView, Button, TouchableOpacity, Picker
} from 'react-native';

import { database } from "../storage/Database";
import { v4 as uuid } from 'uuid';
import styles from './Style';
import { EventTypes } from '../enums/EventTypes';
import { LocalizedStrings } from '../enums/LocalizedStrings';
import Header from './shared/Header';
import radioButtons from './shared/RadioButtons';
import { formatTextDisplay, formatBooleanDisplay } from './shared/EventFieldDisplay';

export const AdultImmunizationsDisplay = (metadataObj, language) => {
  return (
    <View>
      <Text>{LocalizedStrings[language].provider}: {metadataObj.doctor} </Text>
      <Text>{LocalizedStrings[language].pneumococcus}: {formatBooleanDisplay(metadataObj.pneumococcus, language)}</Text>
      <Text>{LocalizedStrings[language].influenza}: {formatBooleanDisplay(metadataObj.influenza, language)}</Text>
      <Text>{LocalizedStrings[language].tetanus}: {formatBooleanDisplay(metadataObj.tetanus, language)}</Text>
      <Text>{LocalizedStrings[language].hepatitisB}: {formatBooleanDisplay(metadataObj.hepatitisB, language)}</Text>
      <Text>{LocalizedStrings[language].covid}: {formatBooleanDisplay(metadataObj.covid, language)}</Text>
      <Text>{LocalizedStrings[language].tb}: {formatBooleanDisplay(metadataObj.tb, language)}</Text>
      <Text>{LocalizedStrings[language].others}: {metadataObj.others}</Text>
    </View>)
}

const AdultImmunizations = (props) => {
  const [pneumococcus, setPneumococcus] = useState(null)
  const [influenza, setInfluenza] = useState(null)
  const [tetanus, setTetanus] = useState(null)
  const [hepatitisB, setHepatitisB] = useState(null)
  const [covid, setCovid] = useState(null)
  const [tb, setTb] = useState(null)
  const [others, setOthers] = useState(null);
  const [language, setLanguage] = useState(props.navigation.getParam('language', 'sp'));

  const patientId = props.navigation.getParam('patientId');
  const visitId = props.navigation.getParam('visitId');
  const userName = props.navigation.getParam('userName');

  const submit = async () => {
    database.addEvent({
      id: uuid(),
      patient_id: patientId,
      visit_id: visitId,
      event_type: EventTypes.AdultImmunizations,
      event_metadata: JSON.stringify({
        doctor: userName,
        pneumococcus,
        influenza,
        tetanus,
        hepatitisB,
        covid,
        tb,
        others,
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
          <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].adultImmunizations}</Text>
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: pneumococcus, action: setPneumococcus, prompt: LocalizedStrings[language].pneumococcus, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: influenza, action: setInfluenza, prompt: LocalizedStrings[language].influenza, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: tetanus, action: setTetanus, prompt: LocalizedStrings[language].tetanus, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: hepatitisB, action: setHepatitisB, prompt: LocalizedStrings[language].hepatitisB, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: covid, action: setCovid, prompt: LocalizedStrings[language].covid, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: tb, action: setTb, prompt: LocalizedStrings[language].tb, language })}
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].others}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.textbox]}
            onChangeText={(text) => setOthers(text)}
            value={others}
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

export default AdultImmunizations;
