import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, Button, TouchableOpacity
} from 'react-native';

import { database } from "../storage/Database";
import styles from './Style';
import { LocalizedStrings } from '../enums/LocalizedStrings';
import radioButtons from './shared/RadioButtons';
import Header from './shared/Header';

const EditNonPathologicalHistory = (props) => {
  const event = props.navigation.getParam('event');
  const userName = props.navigation.getParam('userName');
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

  const [language, setLanguage] = useState(props.navigation.getParam('language', 'sp'));

  useEffect(() => {
    if (!!event.event_metadata) {
      const metadataObj = JSON.parse(event.event_metadata)
      setAlcoholismActive(metadataObj.alcoholismActive)
      setAlcoholismAgeOfOnset(metadataObj.alcoholismAgeOfOnset)
      setAlcoholismAgeOfTermination(metadataObj.alcoholismAgeOfTermination)
      setAlcoholismFrequency(metadataObj.alcoholismFrequency)
      setAlcoholismAmount(metadataObj.alcoholismAmount)
      setAlcoholismTypeOfLiquor(metadataObj.alcoholismTypeOfLiquor)
      setSmokingActive(metadataObj.smokingActive)
      setSmokingStartAge(metadataObj.smokingStartAge)
      setSmokingEndAge(metadataObj.smokingEndAge)
      setSmokingCigarettesNumber(metadataObj.smokingCigarettesNumber)
      setDrugsActive(metadataObj.drugsActive)
      setDrugsAgeOfOnset(metadataObj.drugsAgeOfOnset)
      setDrugsAgeOfTermination(metadataObj.drugsAgeOfTermination)
      setDrugsFrequency(metadataObj.drugsFrequency)
      setDrugsType(metadataObj.drugsType)
    }
  }, [props])

  const submitNonPathologicalHistory = async () => {
    database.editEvent(
      event.id,
      JSON.stringify({
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
    ).then((response) => props.navigation.navigate('EventList', { events: response, language }))
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.containerLeft}>
        {Header({ action: () => props.navigation.navigate('EventList', { language }), language, setLanguage })}
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
            onPress={() => submitNonPathologicalHistory()} />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditNonPathologicalHistory;
