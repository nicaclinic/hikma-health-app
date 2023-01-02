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

export const NonPathologicalHistoryDisplay = (metadataObj, language) => {
  return (
    <View>
      <Text>{LocalizedStrings[language].provider}: {metadataObj.doctor} </Text>
      <Text>{LocalizedStrings[language].alcoholism}: {formatBooleanDisplay(metadataObj.alcoholismActive, language)}</Text>
      {!!metadataObj.alcoholismActive ? <Text>{LocalizedStrings[language].ageOfOnset}: {metadataObj.alcoholismAgeOfOnset}</Text> : null}
      {!!metadataObj.alcoholismActive ?  <Text>{LocalizedStrings[language].ageOfTermination}: {metadataObj.alcoholismAgeOfTermination}</Text> : null}
      {!!metadataObj.alcoholismActive ?  <Text>{LocalizedStrings[language].frequency}: {metadataObj.alcoholismFrequency}</Text> : null}
      {!!metadataObj.alcoholismActive ?  <Text>{LocalizedStrings[language].amountOfIntake}: {metadataObj.alcoholismAmount}</Text> : null}
      {!!metadataObj.alcoholismActive ?  <Text>{LocalizedStrings[language].typeOfLiquor}: {metadataObj.alcoholismtypeOfLiquor}</Text> : null}
      <Text>{LocalizedStrings[language].smoking}: {formatBooleanDisplay(metadataObj.smokingActive, language)}</Text>
      {!!metadataObj.smokingActive ? <Text>{LocalizedStrings[language].startAge}: {metadataObj.smokingStartAge}</Text> : null}
      {!!metadataObj.smokingActive ? <Text>{LocalizedStrings[language].endAge}: {metadataObj.smokingEndAge}</Text> : null}
      {!!metadataObj.smokingActive ? <Text>{LocalizedStrings[language].cigarettesNumber}: {metadataObj.smokingCigarettesNumber}</Text> : null}
      <Text>{LocalizedStrings[language].drugs}: {formatBooleanDisplay(metadataObj.drugsActive, language)}</Text>
      {!!metadataObj.drugsActive ? <Text>{LocalizedStrings[language].ageOfOnset}: {metadataObj.drugsAgeOfOnset}</Text> : null}
      {!!metadataObj.drugsActive ? <Text>{LocalizedStrings[language].ageOfTermination}: {metadataObj.drugsAgeOfTermination}</Text> : null}
      {!!metadataObj.drugsActive ? <Text>{LocalizedStrings[language].frequency}: {metadataObj.drugsFrequency}</Text> : null}
      {!!metadataObj.drugsActive ? <Text>{LocalizedStrings[language].drugType}: {metadataObj.drugstype}</Text> : null}
    </View>)
}

const NonPathologicalHistory = (props) => {
  const [alcoholismActive, setAlcoholismActive] = useState(null);
  const [alcoholismAgeOfOnset, setAlcoholismAgeOfOnset] = useState(null);
  const [alcoholismAgeOfTermination, setAlcoholismAgeOfTermination] = useState(null);
  const [alcoholismFrequency, setAlcoholismFrequency] = useState(null);
  const [alcoholismAmount, setAlcoholismAmount] = useState(null);
  const [alcoholismTypeOfLiquor, setAlcoholismTypeOfLiquor] = useState(null);
  const [smokingActive, setSmokingActive] = useState(null);
  const [smokingStartAge, setSmokingStartAge] = useState(null);
  const [smokingEndAge, setSmokingEndAge] = useState(null);
  const [smokingCigarettesNumber, setSmokingCigarettesNumber] = useState(null);
  const [drugsActive, setDrugsActive] = useState(null);
  const [drugsAgeOfOnset, setDrugsAgeOfOnset] = useState(null);
  const [drugsAgeOfTermination, setDrugsAgeOfTermination] = useState(null);
  const [drugsFrequency, setDrugsFrequency] = useState(null);
  const [drugsType, setDrugsType] = useState(null);
  const [language, setLanguage] = useState(props.navigation.getParam('language', 'en'));

  const patientId = props.navigation.getParam('patientId');
  const visitId = props.navigation.getParam('visitId');
  const userName = props.navigation.getParam('userName');

  const submit = async () => {
    database.addEvent({
      id: uuid(),
      patient_id: patientId,
      visit_id: visitId,
      event_type: EventTypes.NonPathologicalHistory,
      event_metadata: JSON.stringify({
        doctor: userName,
        alcoholismActive,
        alcoholismAgeOfOnset,
        alcoholismAgeOfTermination,
        alcoholismFrequency,
        alcoholismAmount,
        alcoholismTypeOfLiquor,
        smokingActive,
        smokingStartAge,
        smokingEndAge,
        smokingCigarettesNumber,
        drugsActive,
        drugsAgeOfOnset,
        drugsAgeOfTermination,
        drugsFrequency,
        drugsType
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
          <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].nonPathologicalHistory}</Text>
        </View>
        {/* Alcoholism */}
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].alcoholism}</Text>
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: alcoholismActive, action: setAlcoholismActive, prompt: LocalizedStrings[language].active, language })}
        </View>
        {!!alcoholismActive ?
          <View>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.inputs}
                placeholder= {LocalizedStrings[language].ageOfOnset}
                onChangeText={(text) => setAlcoholismAgeOfOnset(text)}
                value={alcoholismAgeOfOnset}
                keyboardType='numeric'
              />
              <TextInput
                style={styles.inputs}
                placeholder= {LocalizedStrings[language].ageOfTermination}
                onChangeText={(text) => setAlcoholismAgeOfTermination(text)}
                value={alcoholismAgeOfTermination}
                keyboardType='numeric'
              />
            </View>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.inputs}
                placeholder= {LocalizedStrings[language].frequency}
                onChangeText={(text) => setAlcoholismFrequency(text)}
                value={alcoholismFrequency}
              />
              <TextInput
                style={styles.inputs}
                placeholder= {LocalizedStrings[language].amountOfIntake}
                onChangeText={(text) => setAlcoholismAmount(text)}
                value={alcoholismAmount}
              />
            </View>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.inputs}
                placeholder= {LocalizedStrings[language].typeOfLiquor}
                onChangeText={(text) => setAlcoholismTypeOfLiquor(text)}
                value={alcoholismTypeOfLiquor}
              />
            </View>
          </View> :
          null
        }

        {/* Smoking */}
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].smoking}</Text>
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: smokingActive, action: setSmokingActive, prompt: LocalizedStrings[language].active, language })}
        </View>
        {!!smokingActive ?
          <View>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.inputs}
                placeholder= {LocalizedStrings[language].startAge}
                onChangeText={(text) => setSmokingStartAge(text)}
                value={smokingStartAge}
                keyboardType='numeric'
              />
              <TextInput
                style={styles.inputs}
                placeholder= {LocalizedStrings[language].endAge}
                onChangeText={(text) => setSmokingEndAge(text)}
                value={smokingEndAge}
                keyboardType='numeric'
              />
            </View>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.inputs}
                placeholder= {LocalizedStrings[language].cigarettesNumber}
                onChangeText={(text) => setSmokingCigarettesNumber(text)}
                value={smokingCigarettesNumber}
              />
            </View>
          </View> :
          null
        }

        {/* Drugs */}
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].drugs}</Text>
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: drugsActive, action: setDrugsActive, prompt: LocalizedStrings[language].active, language })}
        </View>
        {!!drugsActive ?
          <View>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.inputs}
                placeholder= {LocalizedStrings[language].ageOfOnset}
                onChangeText={(text) => setDrugsAgeOfOnset(text)}
                value={drugsAgeOfOnset}
                keyboardType='numeric'
              />
              <TextInput
                style={styles.inputs}
                placeholder= {LocalizedStrings[language].ageOfTermination}
                onChangeText={(text) => setDrugsAgeOfTermination(text)}
                value={drugsAgeOfTermination}
                keyboardType='numeric'
              />
            </View>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.inputs}
                placeholder= {LocalizedStrings[language].frequency}
                onChangeText={(text) => setDrugsFrequency(text)}
                value={drugsFrequency}
              />
              <TextInput
                style={styles.inputs}
                placeholder= {LocalizedStrings[language].typeOfLiquor}
                onChangeText={(text) => setDrugsType(text)}
                value={drugsType}
              />
            </View>
          </View> :
          null
        }
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

export default NonPathologicalHistory;
