import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, Button, TouchableOpacity, Picker
} from 'react-native';

import { database } from "../storage/Database";
import styles from './Style';
import { LocalizedStrings } from '../enums/LocalizedStrings';
import radioButtons from './shared/RadioButtons';
import Header from './shared/Header';
import DatePicker from 'react-native-datepicker';

const today = new Date();

export const Objective = (value, action, language) => {
  return (
    <Picker
      selectedValue={value}
      onValueChange={value => action(value)}
      style={[styles.picker, { width: 180 }]}
    >
      <Picker.Item value='' label={LocalizedStrings[language].objective} />
      <Picker.Item value={LocalizedStrings[language].head} label={LocalizedStrings[language].head} />
      <Picker.Item value={LocalizedStrings[language].eyes} label={LocalizedStrings[language].eyes} />
      <Picker.Item value={LocalizedStrings[language].earsNoseMouth} label={LocalizedStrings[language].earsNoseMouth} />
      <Picker.Item value={LocalizedStrings[language].neck} label={LocalizedStrings[language].neck} />
      <Picker.Item value={LocalizedStrings[language].chest} label={LocalizedStrings[language].chest} />
      <Picker.Item value={LocalizedStrings[language].heart} label={LocalizedStrings[language].heart} />
      <Picker.Item value={LocalizedStrings[language].lungFields} label={LocalizedStrings[language].lungFields} />
      <Picker.Item value={LocalizedStrings[language].abdomen} label={LocalizedStrings[language].abdomen} />
      <Picker.Item value={LocalizedStrings[language].genitals} label={LocalizedStrings[language].genitals} />
      <Picker.Item value={LocalizedStrings[language].skeletalMuscle} label={LocalizedStrings[language].skeletalMuscle} />
      <Picker.Item value={LocalizedStrings[language].extremities} label={LocalizedStrings[language].extremities} />
      <Picker.Item value={LocalizedStrings[language].neurological} label={LocalizedStrings[language].neurological} />
    </Picker>
  )
}

export const Sex = (value, action, language) => {
  return (
    <Picker
      selectedValue={value}
      onValueChange={value => action(value)}
      style={[styles.picker, { width: 180 }]}
    >
      <Picker.Item value='' label={LocalizedStrings[language].sex} />
      <Picker.Item value={LocalizedStrings[language].male} label={LocalizedStrings[language].male} />
      <Picker.Item value={LocalizedStrings[language].female} label={LocalizedStrings[language].female} />
    </Picker>
  )
}

const EditSubsequentEvolutionNote = (props) => {
  const event = props.navigation.getParam('event');
  const userName = props.navigation.getParam('userName');
  const [medicalRecord, setMedicalRecord] = useState(null);
  const [nameSurname, setNameSurname] = useState(null);
  const [id, setId] = useState(null);
  const [dob, setDob] = useState(null);
  const [age, setAge] = useState(null);
  const [sex, setSex] = useState(null);
  const [community, setCommunity] = useState(null);
  const [proceedings, setProceedings] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const [bloodPressure, setBloodPressure] = useState(null);
  const [heartRate, setHeartRate] = useState(null);
  const [breathingFrequency, setBreathingFrequency] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [oxygenSaturation, setOxygenSaturation] = useState(null);
  const [weight, setWeight] = useState(null);
  const [size, setSize] = useState(null);
  const [consultationReason, setConsultationReason] = useState(null);
  const [illnessHistory, setIllnessHistory] = useState(null);
  const [objective, setObjective] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [feeding, setFeeding] = useState(null);
  const [medicines, setMedicines] = useState(null);
  const [exams, setExams] = useState(null);
  const [normsOrRecommendations, setNormsOrRecommendations] = useState(null);
  const [treatingPhysician, setTreatingPhysician] = useState(null);
  const [minsaCode, setMinsaCode] = useState(null);

  const [language, setLanguage] = useState(props.navigation.getParam('language', 'en'));

  useEffect(() => {
    if (!!event.event_metadata) {
      const metadataObj = JSON.parse(event.event_metadata)
      setMedicalRecord(metadataObj.medicalRecord)
      setNameSurname(metadataObj.nameSurname)
      setId(metadataObj.id)
      setDob(metadataObj.dob)
      setAge(metadataObj.age)
      setSex(metadataObj.sex)
      setCommunity(metadataObj.community)
      setProceedings(metadataObj.proceedings)
      setDateTime(metadataObj.dateTime)
      setHeartRate(metadataObj.heartRate)
      setBreathingFrequency(metadataObj.breathingFrequency)
      setTemperature(metadataObj.temperature)
      setOxygenSaturation(metadataObj.oxygenSaturation)
      setWeight(metadataObj.weight)
      setSize(metadataObj.size)
      setConsultationReason(metadataObj.consultationReason)
      setIllnessHistory(metadataObj.illnessHistory)
      setObjective(metadataObj.objective)
      setEvaluation(metadataObj.evaluation)
      setDiagnosis(metadataObj.diagnosis)
      setFeeding(metadataObj.feeding)
      setMedicines(metadataObj.medicines)
      setExams(metadataObj.exams)
      setNormsOrRecommendations(metadataObj.normsOrRecommendations)
      setTreatingPhysician(metadataObj.treatingPhysician)
      setMinsaCode(metadataObj.minsaCode)
    }
  }, [props])

  const submitSubsequentEvolutionNote = async () => {
    database.editEvent(
      event.id,
      JSON.stringify({
        doctor: userName,
        medicalRecord,
        nameSurname,id,
        dob,
        age,
        sex,
        community,
        proceedings,
        dateTime,
        bloodPressure,
        heartRate,
        breathingFrequency,
        temperature,
        oxygenSaturation,
        weight,
        size,
        consultationReason,
        illnessHistory,
        objective,
        evaluation,
        diagnosis,
        feeding,
        medicines,
        exams,
        normsOrRecommendations,
        treatingPhysician,
        minsaCode
      })
    ).then((response) => props.navigation.navigate('EventList', { events: response, language }))
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.containerLeft}>
        {Header({ action: () => props.navigation.navigate('EventList', { language }), language, setLanguage })}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', }}>
          <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].subsequentEvolutionNote}</Text>
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].medicalRecord}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setMedicalRecord(text)}
            value={medicalRecord}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].nameSurname}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setNameSurname(text)}
            value={nameSurname}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].id}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setId(text)}
            value={id}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].dob}</Text>
        </View>
        <View style={styles.inputRow}>
          <DatePicker
            style={styles.datePicker}
            date={dob}
            mode="date"
            placeholder={LocalizedStrings[language].selectDob}
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
            onDateChange={(date) => setDob(date)}
          />
        </View >
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].age}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setAge(text)}
            value={age}
          />
        </View>
        {Sex(sex, setSex, language)}
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].community}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setCommunity(text)}
            value={community}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].proceedings}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setProceedings(text)}
            value={proceedings}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].dateTime}</Text>
        </View>
        <View style={styles.inputRow}>
          <DatePicker
            style={styles.datePicker}
            date={dob}
            mode="datetime"
            placeholder={LocalizedStrings[language].dateTime}
            format="YYYY-MM-DD h:mm a"
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
            onDateChange={(date) => setDateTime(date)}
          />
        </View >
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>{LocalizedStrings[language].vitalSigns}</Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].bloodPressure}
            onChangeText={(text) => setBloodPressure(text)}
            value={bloodPressure}
          />
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].heartRate}
            onChangeText={(text) => setHeartRate(text)}
            value={heartRate}
            keyboardType='numeric'
          />
          <Text style={{ color: '#FFFFFF' }}>BPM</Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].breathingFrequency}
            onChangeText={(text) => setBreathingFrequency(text)}
            value={breathingFrequency}
          />
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].temperature}
            onChangeText={(text) => setTemperature(text)}
            value={temperature}
            keyboardType='numeric'
          />
          <Text style={{ color: '#FFFFFF' }}>°C</Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].oxygenSaturation}
            onChangeText={(text) => setOxygenSaturation(text)}
            value={oxygenSaturation}
            keyboardType='numeric'
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>{LocalizedStrings[language].anthropometricData}</Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].weight}
            onChangeText={(text) => setWeight(text)}
            value={weight}
            keyboardType='numeric'
          />
          <Text style={{ color: '#FFFFFF' }}>kg</Text>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].size}
            onChangeText={(text) => setSize(text)}
            value={size}
            keyboardType='numeric'
          />
          <Text style={{ color: '#FFFFFF' }}>cm</Text>
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].consultationReason}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.smallTextbox]}
            onChangeText={(text) => setConsultationReason(text)}
            value={consultationReason}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].illnessHistory}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.smallTextbox]}
            onChangeText={(text) => setIllnessHistory(text)}
            value={illnessHistory}
          />
        </View>
        {Objective(objective, setObjective, language)}
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].evaluation}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.smallTextbox]}
            onChangeText={(text) => setEvaluation(text)}
            value={evaluation}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].diagnosis}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.smallTextbox]}
            onChangeText={(text) => setDiagnosis(text)}
            value={diagnosis}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>{LocalizedStrings[language].plans}</Text>
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].feeding}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.smallTextbox]}
            onChangeText={(text) => setFeeding(text)}
            value={feeding}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].medicines}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.smallTextbox]}
            onChangeText={(text) => setMedicines(text)}
            value={medicines}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].exams}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.smallTextbox]}
            onChangeText={(text) => setExams(text)}
            value={exams}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].normsOrRecommendations}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.smallTextbox]}
            onChangeText={(text) => setNormsOrRecommendations(text)}
            value={normsOrRecommendations}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].treatingPhysician}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs]}
            onChangeText={(text) => setTreatingPhysician(text)}
            value={treatingPhysician}
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
            onPress={() => submitSubsequentEvolutionNote()} />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditSubsequentEvolutionNote;
