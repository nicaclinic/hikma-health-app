import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, Button, TouchableOpacity
} from 'react-native';

import { database } from "../storage/Database";
import styles from './Style';
import { LocalizedStrings } from '../enums/LocalizedStrings';
import radioButtons from './shared/RadioButtons';
import Header from './shared/Header';

const EditImmunizations = (props) => {
  const event = props.navigation.getParam('event');
  const userName = props.navigation.getParam('userName');
  const [bcgDose1, setBcgDose1] = useState(null);
  const [pentavalentDose1, setPentavalentDose1] = useState(null);
  const [pentavalentDose2, setPentavalentDose2] = useState(null);
  const [pentavalentDose3, setPentavalentDose3] = useState(null);
  const [polioDose1, setPolioDose1] = useState(null);
  const [polioDose2, setPolioDose2] = useState(null);
  const [polioDose3, setPolioDose3] = useState(null);
  const [polioReinforcement, setPolioReinforcement] = useState(null);
  const [polioReinforcementDoses, setPolioReinforcementDoses] = useState(null);
  const [rotavirusDose1, setRotavirusDose1] = useState(null);
  const [rotavirusDose2, setRotavirusDose2] = useState(null);
  const [rotavirusDose3, setRotavirusDose3] = useState(null);
  const [mmrDose1, setMmrDose1] = useState(null);
  const [dptReinforcement, setDptReinforcement] = useState(null);
  const [dptReinforcementDoses, setDptReinforcementDoses] = useState(null);
  const [dtDose1, setDtDose1] = useState(null);
  const [dtDose2, setDtDose2] = useState(null);
  const [dtReinforcement, setDtReinforcement] = useState(null);
  const [dtReinforcementDoses, setDtReinforcementDoses] = useState(null);
  const [language, setLanguage] = useState(props.navigation.getParam('language', 'en'));

  useEffect(() => {
    if (!!event.event_metadata) {
      const metadataObj = JSON.parse(event.event_metadata)
      setBcgDose1(metadataObj.bcgDose1)
      setPentavalentDose1(metadataObj.pentavalentDose1)
      setPentavalentDose2(metadataObj.pentavalentDose2)
      setPentavalentDose3(metadataObj.pentavalentDose3)
      setPolioDose1(metadataObj.polioDose1)
      setPolioDose2(metadataObj.polioDose2)
      setPolioDose3(metadataObj.polioDose3)
      setPolioReinforcement(metadataObj.polioReinforcement)
      setPolioReinforcementDoses(metadataObj.polioReinforcementDoses)
      setRotavirusDose1(metadataObj.rotavirusDose1)
      setRotavirusDose2(metadataObj.rotavirusDose2)
      setRotavirusDose3(metadataObj.rotavirusDose3)
      setMmrDose1(metadataObj.mmrDose1)
      setDptReinforcement(metadataObj.dptReinforcement)
      setDptReinforcementDoses(metadataObj.dptReinforcementDoses)
      setDtDose1(metadataObj.dtDose1)
      setDtDose2(metadataObj.dtDose2)
      setDtReinforcement(metadataObj.dtReinforcement)
      setDtReinforcementDoses(metadataObj.dtReinforcementDoses)
    }
  }, [props])

  const submitImmunizations = async () => {
    database.editEvent(
      event.id,
      JSON.stringify({
        doctor: userName,
        bcgDose1,
        pentavalentDose1,
        pentavalentDose2,
        pentavalentDose3,
        polioDose1,
        polioDose2,
        polioDose3,
        polioReinforcement,
        polioReinforcementDoses,
        rotavirusDose1,
        rotavirusDose2,
        rotavirusDose3,
        mmrDose1,
        dptReinforcement,
        dptReinforcementDoses,
        dtDose1,
        dtDose2,
        dtReinforcement,
        dtReinforcementDoses
      })
    ).then((response) => props.navigation.navigate('EventList', { events: response, language }))
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.containerLeft}>
        {Header({ action: () => props.navigation.navigate('EventList', { language }), language, setLanguage })}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', }}>
          <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].immunizations}</Text>
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].bcg}</Text>
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: bcgDose1, action: setBcgDose1, prompt: LocalizedStrings[language].dose1, language })}
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].pentavalent}</Text>
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: pentavalentDose1, action: setPentavalentDose1, prompt: LocalizedStrings[language].dose1, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: pentavalentDose2, action: setPentavalentDose2, prompt: LocalizedStrings[language].doses2, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: pentavalentDose3, action: setPentavalentDose3, prompt: LocalizedStrings[language].doses3, language })}
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].polio}</Text>
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: polioDose1, action: setPolioDose1, prompt: LocalizedStrings[language].dose1, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: polioDose2, action: setPolioDose2, prompt: LocalizedStrings[language].doses2, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: polioDose3, action: setPolioDose3, prompt: LocalizedStrings[language].doses3, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: polioReinforcement, action: setPolioReinforcement, prompt: LocalizedStrings[language].reinforcement, language })}
        </View>
        {!!polioReinforcement ?
          <View>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.inputs}
                placeholder= {LocalizedStrings[language].reinforcementCount}
                onChangeText={(text) => setPolioReinforcementDoses(text)}
                value={polioReinforcementDoses}
                keyboardType='numeric'
              />
            </View>
          </View> :
          null
        }

        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].rotavirus}</Text>
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: rotavirusDose1, action: setRotavirusDose1, prompt: LocalizedStrings[language].dose1, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: rotavirusDose1, action: setRotavirusDose2, prompt: LocalizedStrings[language].doses2, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: rotavirusDose1, action: setRotavirusDose3, prompt: LocalizedStrings[language].doses3, language })}
        </View>

        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].mmr}</Text>
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: mmrDose1, action: setMmrDose1, prompt: LocalizedStrings[language].dose1, language })}
        </View>

        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].dpt}</Text>
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: dptReinforcement, action: setDptReinforcement, prompt: LocalizedStrings[language].reinforcement, language })}
        </View>
        {!!dptReinforcement ?
          <View>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.inputs}
                placeholder= {LocalizedStrings[language].reinforcementCount}
                onChangeText={(text) => setDptReinforcementDoses(text)}
                value={dptReinforcementDoses}
                keyboardType='numeric'
              />
            </View>
          </View> :
          null
        }

        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].dt}</Text>
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: dtDose1, action: setDtDose1, prompt: LocalizedStrings[language].dose1, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: dtDose2, action: setDtDose2, prompt: LocalizedStrings[language].doses2, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: dtReinforcement, action: setDtReinforcement, prompt: LocalizedStrings[language].reinforcement, language })}
        </View>
        {!!dtReinforcement ?
          <View>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.inputs}
                placeholder= {LocalizedStrings[language].reinforcementCount}
                onChangeText={(text) => setDtReinforcementDoses(text)}
                value={dtReinforcementDoses}
                keyboardType='numeric'
              />
            </View>
          </View> :
          null
        }

        <View style={{ alignItems: 'center' }}>
          <Button
            title={LocalizedStrings[language].save}
            color={'#F77824'}
            onPress={() => submitImmunizations()} />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditImmunizations;
