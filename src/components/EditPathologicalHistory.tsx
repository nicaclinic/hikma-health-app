import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, Button, TouchableOpacity
} from 'react-native';

import { database } from "../storage/Database";
import styles from './Style';
import { LocalizedStrings } from '../enums/LocalizedStrings';
import radioButtons from './shared/RadioButtons';
import Header from './shared/Header';

const EditPathologicalHistory = (props) => {
  const event = props.navigation.getParam('event');
  const userName = props.navigation.getParam('userName');
  const [childhoodDiseases, setChildhoodDiseases] = useState(null);
  const [cardiovascular, setCardiovascular] = useState(null);
  const [customizedAllergies, setCustomizedAllergies] = useState(null);
  const [pulmonary, setPulmonary] = useState(null);
  const [chronicDiseases, setChronicDiseases] = useState(null);
  const [transfusions, setTransfusions] = useState(null);
  const [sexuallyTransmittedInfections, setSexuallyTransmittedInfections] = useState(null);
  const [digestive, setDigestive] = useState(null);
  const [surgical, setSurgical] = useState(null);
  const [hospitalizations, setHospitalizations] = useState(null);
  const [others, setOthers] = useState(null);
  const [specify, setSpecify] = useState(null);

  const [language, setLanguage] = useState(props.navigation.getParam('language', 'en'));

  useEffect(() => {
    if (!!event.event_metadata) {
      const metadataObj = JSON.parse(event.event_metadata)
      setChildhoodDiseases(metadataObj.childhoodDiseases)
      setCardiovascular(metadataObj.cardiovascular)
      setCustomizedAllergies(metadataObj.customizedAllergies)
      setPulmonary(metadataObj.pulmonary)
      setChronicDiseases(metadataObj.chronicDiseases)
      setTransfusions(metadataObj.transfusions)
      setSexuallyTransmittedInfections(metadataObj.sexuallyTransmittedInfections)
      setDigestive(metadataObj.digestive)
      setSurgical(metadataObj.surgical)
      setHospitalizations(metadataObj.hospitalizations)
      setOthers(metadataObj.others)
      setSpecify(metadataObj.specify)
    }
  }, [props])

  const submitPathologicalHistory = async () => {
    database.editEvent(
      event.id,
      JSON.stringify({
        doctor: userName,
        childhoodDiseases,
        cardiovascular,
        customizedAllergies,
        pulmonary,
        chronicDiseases,
        transfusions,
        sexuallyTransmittedInfections,
        digestive,
        surgical,
        hospitalizations,
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
          <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].pathologicalHistory}</Text>
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].childhoodDiseases}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setChildhoodDiseases(text)}
            value={childhoodDiseases}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].cardiovascular}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setCardiovascular(text)}
            value={cardiovascular}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].customizedAllergies}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setCustomizedAllergies(text)}
            value={customizedAllergies}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].pulmonary}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setPulmonary(text)}
            value={pulmonary}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].chronicDiseases}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setChronicDiseases(text)}
            value={chronicDiseases}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].transfusions}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setTransfusions(text)}
            value={transfusions}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].sexuallyTransmittedInfections}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setSexuallyTransmittedInfections(text)}
            value={sexuallyTransmittedInfections}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].digestive}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setDigestive(text)}
            value={digestive}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].surgical}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setSurgical(text)}
            value={surgical}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].hospitalizations}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setHospitalizations(text)}
            value={hospitalizations}
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
            style={styles.inputs}
            onChangeText={(text) => setSpecify(text)}
            value={specify}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Button
            title={LocalizedStrings[language].save}
            color={'#F77824'}
            onPress={() => submitPathologicalHistory()} />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditPathologicalHistory;
