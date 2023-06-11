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

const EditGynecologicalBackground = (props) => {
  const event = props.navigation.getParam('event');
  const userName = props.navigation.getParam('userName');
  const [menarche, setMenarche] = useState(null);
  const [sexualLifeBeginning, setSexualLifeBeginning] = useState(null);
  const [sexualPartnersNum, setSexualPartnersNum] = useState(null);
  const [familyPlanning, setFamilyPlanning] = useState(null);
  const [lastMenstrualPeriodDate, setLastMenstrualPeriodDate] = useState(null);
  const [currentPregnancy, setCurrentPregnancy] = useState(null);
  const [weeksOfAmenorrhea, setWeeksOfAmenorrhea] = useState(null);
  const [estimatedDueDate, setEstimatedDueDate] = useState(null);
  const [lastDeliveryDate, setLastDeliveryDate] = useState(null);
  const [pregnanciesNumber, setPregnanciesNumber] = useState(null);
  const [births, setBirths] = useState(null);
  const [caesareanSection, setCaesareanSection] = useState(null);
  const [abortions, setAbortions] = useState(null);
  const [curettage, setCurettage] = useState(null);

  const [language, setLanguage] = useState(props.navigation.getParam('language', 'sp'));

  useEffect(() => {
    if (!!event.event_metadata) {
      const metadataObj = JSON.parse(event.event_metadata)
      setMenarche(metadataObj.menarche)
      setSexualLifeBeginning(metadataObj.sexualLifeBeginning)
      setSexualPartnersNum(metadataObj.sexualPartnersNum)
      setFamilyPlanning(metadataObj.familyPlanning)
      setLastMenstrualPeriodDate(metadataObj.lastMenstrualPeriodDate)
      setCurrentPregnancy(metadataObj.currentPregnancy)
      setWeeksOfAmenorrhea(metadataObj.weeksOfAmenorrhea)
      setEstimatedDueDate(metadataObj.estimatedDueDate)
      setLastDeliveryDate(metadataObj.lastDeliveryDate)
      setPregnanciesNumber(metadataObj.pregnanciesNumber)
      setBirths(metadataObj.births)
      setCaesareanSection(metadataObj.caesareanSection)
      setAbortions(metadataObj.abortions)
      setCurettage(metadataObj.curettage)
    }
  }, [props])

  const submitGynecologicalBackground = async () => {
    database.editEvent(
      event.id,
      JSON.stringify({
        doctor: userName,
        menarche,
        sexualLifeBeginning,
        sexualPartnersNum,
        familyPlanning,
        lastMenstrualPeriodDate,
        currentPregnancy,
        weeksOfAmenorrhea,
        estimatedDueDate,
        lastDeliveryDate,
        pregnanciesNumber,
        births,
        caesareanSection,
        abortions,
        curettage
      })
    ).then((response) => props.navigation.navigate('EventList', { events: response, language }))
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.containerLeft}>
        {Header({ action: () => props.navigation.navigate('EventList', { language }), language, setLanguage })}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', }}>
          <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].gynecologicalBackground}</Text>
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].menarche}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setMenarche(text)}
            value={menarche}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].sexualLifeBeginning}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setSexualLifeBeginning(text)}
            value={sexualLifeBeginning}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].sexualPartnersNum}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setSexualPartnersNum(text)}
            value={sexualPartnersNum}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].familyPlanning}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setFamilyPlanning(text)}
            value={familyPlanning}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].lastMenstrualPeriodDate}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <DatePicker
            style={styles.datePicker}
            date={lastMenstrualPeriodDate}
            mode="date"
            placeholder={LocalizedStrings[language].lastMenstrualPeriodDate}
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
            onDateChange={(date) => setLastMenstrualPeriodDate(date)}
          />
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: currentPregnancy, action: setCurrentPregnancy, prompt: LocalizedStrings[language].currentPregnancy, language })}
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].weeksOfAmenorrhea}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setWeeksOfAmenorrhea(text)}
            value={weeksOfAmenorrhea}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].estimatedDueDate}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <DatePicker
            style={styles.datePicker}
            date={estimatedDueDate}
            mode="date"
            placeholder={LocalizedStrings[language].estimatedDueDate}
            format="YYYY-MM-DD"
            minDate="1900-05-01"
            maxDate="2100-05-01"
            confirmBtnText={LocalizedStrings[language].confirm}
            cancelBtnText={LocalizedStrings[language].cancel}
            customStyles={{
              dateInput: {
                alignItems: 'flex-start',
                borderWidth: 0
              }
            }}
            androidMode='spinner'
            onDateChange={(date) => setEstimatedDueDate(date)}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].lastDeliveryDate}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <DatePicker
            style={styles.datePicker}
            date={lastDeliveryDate}
            mode="date"
            placeholder={LocalizedStrings[language].lastDeliveryDate}
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
            onDateChange={(date) => setLastDeliveryDate(date)}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].pregnanciesNumber}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setPregnanciesNumber(text)}
            value={pregnanciesNumber}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].births}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setBirths(text)}
            value={births}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].caesareanSection}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setCaesareanSection(text)}
            value={caesareanSection}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].abortions}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setAbortions(text)}
            value={abortions}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].curettage}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setCurettage(text)}
            value={curettage}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Button
            title={LocalizedStrings[language].save}
            color={'#F77824'}
            onPress={() => submitGynecologicalBackground()} />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditGynecologicalBackground;
