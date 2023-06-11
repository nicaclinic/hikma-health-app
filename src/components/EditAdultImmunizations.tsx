import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, Button, TouchableOpacity, Picker
} from 'react-native';

import { database } from "../storage/Database";
import styles from './Style';
import { LocalizedStrings } from '../enums/LocalizedStrings';
import Header from './shared/Header';
import radioButtons from './shared/RadioButtons';

const EditAdultImmunizations = (props) => {
  const event = props.navigation.getParam('event');
  const userName = props.navigation.getParam('userName');
  const [pneumococcus, setPneumococcus] = useState(null)
  const [influenza, setInfluenza] = useState(null)
  const [tetanus, setTetanus] = useState(null)
  const [hepatitisB, setHepatitisB] = useState(null)
  const [covid, setCovid] = useState(null)
  const [tb, setTb] = useState(null)
  const [others, setOthers] = useState(null);
  const [language, setLanguage] = useState(props.navigation.getParam('language', 'sp'));

  useEffect(() => {
    if (!!event.event_metadata) {
      const metadataObj = JSON.parse(event.event_metadata)
      setPneumococcus(metadataObj.pneumococcus)
      setInfluenza(metadataObj.influenza)
      setTetanus(metadataObj.tetanus)
      setHepatitisB(metadataObj.hepatitisB)
      setCovid(metadataObj.covid)
      setTb(metadataObj.tb)
      setOthers(metadataObj.others)
    }
  }, [props])

  const submitAdultImmunizations = async () => {
    database.editEvent(
      event.id,
      JSON.stringify({
        doctor: userName,
        pneumococcus,
        influenza,
        tetanus,
        hepatitisB,
        covid,
        tb,
        others,
      })
    ).then((response) => props.navigation.navigate('EventList', { events: response, language }))
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.containerLeft}>
        {Header({ action: () => props.navigation.navigate('EventList', { language }), language, setLanguage })}
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
            onPress={() => submitAdultImmunizations()} />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditAdultImmunizations;
