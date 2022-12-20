import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, Button, TouchableOpacity
} from 'react-native';

import { database } from "../storage/Database";
import styles from './Style';
import { LocalizedStrings } from '../enums/LocalizedStrings';
import radioButtons from './shared/RadioButtons';
import Header from './shared/Header';

const EditFamilyPathologicalHistory = (props) => {
  const event = props.navigation.getParam('event');
  const userName = props.navigation.getParam('userName');
  const [arterialHypertension, setArterialHypertension] = useState(null);
  const [diabetesMellitus, setDiabetesMellitus] = useState(null);
  const [tuberculosis, setTuberculosis] = useState(null);
  const [cancer, setCancer] = useState(null);
  const [epilepsy, setEpilepsy] = useState(null);
  const [heartDiseases, setHeartDiseases] = useState(null);
  const [nephropathies, setNephropathies] = useState(null);
  const [liverDiseases, setLiverDiseases] = useState(null);
  const [mentalDiseases, setMentalDiseases] = useState(null);
  const [others, setOthers] = useState(null);
  const [specify, setSpecify] = useState(null);

  const [language, setLanguage] = useState(props.navigation.getParam('language', 'en'));

  useEffect(() => {
    if (!!event.event_metadata) {
      const metadataObj = JSON.parse(event.event_metadata)
      setArterialHypertension(metadataObj.arterialHypertension)
      setTuberculosis(metadataObj.tuberculosis)
      setCancer(metadataObj.cancer)
      setEpilepsy(metadataObj.epilepsy)
      setHeartDiseases(metadataObj.heartDiseases)
      setNephropathies(metadataObj.nephropathies)
      setLiverDiseases(metadataObj.liverDiseases)
      setMentalDiseases(metadataObj.mentalDiseases)
      setDiabetesMellitus(metadataObj.diabetesMellitus)
      setOthers(metadataObj.others)
      setSpecify(metadataObj.specify)
    }
  }, [props])

  const submitFamilyPathologicalHistory = async () => {
    database.editEvent(
      event.id,
      JSON.stringify({
        doctor: userName,
        arterialHypertension,
        diabetesMellitus,
        tuberculosis,
        cancer,
        epilepsy,
        heartDiseases,
        nephropathies,
        liverDiseases,
        mentalDiseases,
        others,
        specify
      })
    ).then((response) => props.navigation.navigate('EventList', { events: response, language }))
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.containerLeft}>
        {Header({ action: () => props.navigation.navigate('EventList', { language }), language, setLanguage })}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', }}>
          <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].familyPathologicalHistory}</Text>
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].arterialHypertension}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setArterialHypertension(text)}
            value={arterialHypertension}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].diabetesMellitus}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setDiabetesMellitus(text)}
            value={diabetesMellitus}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].tuberculosis}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setTuberculosis(text)}
            value={tuberculosis}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].cancer}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setCancer(text)}
            value={cancer}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].epilepsy}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setEpilepsy(text)}
            value={epilepsy}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].heartDiseases}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setHeartDiseases(text)}
            value={heartDiseases}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].nephropathies}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setNephropathies(text)}
            value={nephropathies}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].liverDiseases}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setLiverDiseases(text)}
            value={liverDiseases}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].mentalDiseases}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setMentalDiseases(text)}
            value={mentalDiseases}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].others}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setOthers(text)}
            value={others}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].specify}</Text>
          <Text style={[styles.smallText, { color: '#FFFFFF' }]} >{LocalizedStrings[language].specifyDesc}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.smallTextbox]}
            onChangeText={(text) => setSpecify(text)}
            value={specify}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Button
            title={LocalizedStrings[language].save}
            color={'#F77824'}
            onPress={() => submitFamilyPathologicalHistory()} />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditFamilyPathologicalHistory;
