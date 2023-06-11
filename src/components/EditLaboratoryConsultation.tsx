import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, Button, TouchableOpacity
} from 'react-native';

import { database } from "../storage/Database";
import styles from './Style';
import { LocalizedStrings } from '../enums/LocalizedStrings';
import radioButtons from './shared/RadioButtons';
import Header from './shared/Header';
import DatePicker from 'react-native-datepicker';

const today = new Date();

const EditLaboratoryConsultation = (props) => {
  const event = props.navigation.getParam('event');
  const userName = props.navigation.getParam('userName');
  const [date, setDate] = useState(null);
  const [testPerformed, setTestPerformed] = useState(null);
  const [resource, setResource] = useState(null);
  const [minsaCode, setMinsaCode] = useState(null);
  const [language, setLanguage] = useState(props.navigation.getParam('language', 'sp'));

  useEffect(() => {
    if (!!event.event_metadata) {
      const metadataObj = JSON.parse(event.event_metadata)
      setDate(metadataObj.date)
      setTestPerformed(metadataObj.ultrasoundConsultation)
      setResource(metadataObj.resource)
      setMinsaCode(metadataObj.minsaCode)
    }
  }, [props])

  const submitLaboratoryConsultation = async () => {
    database.editEvent(
      event.id,
      JSON.stringify({
        doctor: userName,
        date,
        testPerformed,
        resource,
        minsaCode
      })
    ).then((response) => props.navigation.navigate('EventList', { events: response, language }))
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.containerLeft}>
        {Header({ action: () => props.navigation.navigate('EventList', { language }), language, setLanguage })}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', }}>
          <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].laboratoryConsultation}</Text>
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].date}</Text>
        </View>
        <View style={styles.inputRow}>
          <DatePicker
            style={styles.datePicker}
            date={date}
            mode="date"
            placeholder={LocalizedStrings[language].date}
            format="YYYY-MM-DD"
            minDate="1900-05-01"
            maxDate={today.toISOString().split('T')[0]}
            confirmBtnText={LocalizedStrings[language].confirm}
            cancelBtnText={LocalizedStrings[language].cancel}
            customStyles={{
              dateInput: {
                alignItems: 'flex-start',
                borderWidth: 0
              }
            }}
            androidMode='spinner'
            onDateChange={(date) => setDate(date)}
          />
        </View >
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].testPerformed}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setTestPerformed(text)}
            value={testPerformed}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].resource}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.smallTextbox]}
            onChangeText={(text) => setResource(text)}
            value={resource}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].minsaCode}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs]}
            onChangeText={(text) => setMinsaCode(text)}
            value={minsaCode}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Button
            title={LocalizedStrings[language].save}
            color={'#F77824'}
            onPress={() => submitLaboratoryConsultation()} />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditLaboratoryConsultation;
