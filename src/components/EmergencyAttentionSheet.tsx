import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, Button, TouchableOpacity, Picker
} from 'react-native';

import { database } from "../storage/Database";
import { v4 as uuid } from 'uuid';
import styles from './Style';
import { EventTypes } from '../enums/EventTypes';
import { LocalizedStrings } from '../enums/LocalizedStrings';
import radioButtons from './shared/RadioButtons';
import Header from './shared/Header';
import DatePicker from 'react-native-datepicker';
import { formatTextDisplay, formatBooleanDisplay } from './shared/EventFieldDisplay';

const today = new Date();

export const ArrivesIn = (value, action, language) => {
  return (
    <Picker
      selectedValue={value}
      onValueChange={value => action(value)}
      style={[styles.picker, { width: 180 }]}
    >
      <Picker.Item value='' label={LocalizedStrings[language].arrivesIn} />
      <Picker.Item value={LocalizedStrings[language].ambulance} label={LocalizedStrings[language].ambulance} />
      <Picker.Item value={LocalizedStrings[language].walking} label={LocalizedStrings[language].walking} />
      <Picker.Item value={LocalizedStrings[language].particular} label={LocalizedStrings[language].particular} />
      <Picker.Item value={LocalizedStrings[language].buses} label={LocalizedStrings[language].buses} />
    </Picker>
  )
}

export const AccidentCauses = (value, action, language) => {
  return (
    <Picker
      selectedValue={value}
      onValueChange={value => action(value)}
      style={[styles.picker, { width: 180 }]}
    >
      <Picker.Item value='' label={LocalizedStrings[language].accidentCauses} />
      <Picker.Item value={LocalizedStrings[language].motorizedVehicle} label={LocalizedStrings[language].motorizedVehicle} />
      <Picker.Item value={LocalizedStrings[language].naturalPhenomenon} label={LocalizedStrings[language].naturalPhenomenon} />
      <Picker.Item value={LocalizedStrings[language].fireExplosion} label={LocalizedStrings[language].fireExplosion} />
      <Picker.Item value={LocalizedStrings[language].drop} label={LocalizedStrings[language].drop} />
      <Picker.Item value={LocalizedStrings[language].assaultBattery} label={LocalizedStrings[language].assaultBattery} />
      <Picker.Item value={LocalizedStrings[language].lateEffects} label={LocalizedStrings[language].lateEffects} />
      <Picker.Item value={LocalizedStrings[language].machinery} label={LocalizedStrings[language].machinery} />
      <Picker.Item value={LocalizedStrings[language].suicideAttempt} label={LocalizedStrings[language].suicideAttempt} />
      <Picker.Item value={LocalizedStrings[language].other} label={LocalizedStrings[language].other} />
    </Picker>
  )
}

export const AccidentPlace = (value, action, language) => {
  return (
    <Picker
      selectedValue={value}
      onValueChange={value => action(value)}
      style={[styles.picker, { width: 180 }]}
    >
      <Picker.Item value='' label={LocalizedStrings[language].accidentPlace} />
      <Picker.Item value={LocalizedStrings[language].work} label={LocalizedStrings[language].work} />
      <Picker.Item value={LocalizedStrings[language].sportFun} label={LocalizedStrings[language].sportFun} />
      <Picker.Item value={LocalizedStrings[language].livingPlace} label={LocalizedStrings[language].livingPlace} />
      <Picker.Item value={LocalizedStrings[language].publicRoad} label={LocalizedStrings[language].publicRoad} />
      <Picker.Item value={LocalizedStrings[language].studyCenter} label={LocalizedStrings[language].studyCenter} />
      <Picker.Item value={LocalizedStrings[language].other} label={LocalizedStrings[language].other} />
    </Picker>
  )
}

export const Destiny = (value, action, language) => {
  return (
    <Picker
      selectedValue={value}
      onValueChange={value => action(value)}
      style={[styles.picker, { width: 180 }]}
    >
      <Picker.Item value='' label={LocalizedStrings[language].destiny} />
      <Picker.Item value={LocalizedStrings[language].ambulatory} label={LocalizedStrings[language].ambulatory} />
      <Picker.Item value={LocalizedStrings[language].naturalPhenomenon} label={LocalizedStrings[language].naturalPhenomenon} />
      <Picker.Item value={LocalizedStrings[language].fireExplosion} label={LocalizedStrings[language].fireExplosion} />
      <Picker.Item value={LocalizedStrings[language].drop} label={LocalizedStrings[language].drop} />
      <Picker.Item value={LocalizedStrings[language].assaultBattery} label={LocalizedStrings[language].assaultBattery} />
      <Picker.Item value={LocalizedStrings[language].lateEffects} label={LocalizedStrings[language].lateEffects} />
      <Picker.Item value={LocalizedStrings[language].machinery} label={LocalizedStrings[language].machinery} />
      <Picker.Item value={LocalizedStrings[language].suicideAttempt} label={LocalizedStrings[language].suicideAttempt} />
      <Picker.Item value={LocalizedStrings[language].other} label={LocalizedStrings[language].other} />
    </Picker>
  )
}

export const EmergencyType = (value, action, language) => {
  return (
    <Picker
      selectedValue={value}
      onValueChange={value => action(value)}
      style={[styles.picker, { width: 180 }]}
    >
      <Picker.Item value='' label={LocalizedStrings[language].emergencyType} />
      <Picker.Item value={LocalizedStrings[language].medical} label={LocalizedStrings[language].medical} />
      <Picker.Item value={LocalizedStrings[language].surgical} label={LocalizedStrings[language].surgical} />
      <Picker.Item value={LocalizedStrings[language].obstetricGynecology} label={LocalizedStrings[language].obstetricGynecology} />
      <Picker.Item value={LocalizedStrings[language].other} label={LocalizedStrings[language].other} />
    </Picker>
  )
}


export const EmergencyAttentionSheetDisplay = (metadataObj, language) => {
  return (
    <View>
      <Text>{LocalizedStrings[language].provider}: {metadataObj.doctor} </Text>
      <Text>{LocalizedStrings[language].dateTime}: {metadataObj.dateTime}</Text>
      <Text>{LocalizedStrings[language].names}: {metadataObj.names}</Text>
      <Text>{LocalizedStrings[language].surnames}: {metadataObj.surnames}</Text>
      <Text>{LocalizedStrings[language].occupation}: {metadataObj.occupation}</Text>
      <Text>{LocalizedStrings[language].address}: {metadataObj.address}</Text>
      <Text>{LocalizedStrings[language].phoneNumber}: {metadataObj.phoneNumber}</Text>
      <Text>{LocalizedStrings[language].id}: {metadataObj.id}</Text>
      <Text>{LocalizedStrings[language].arrivesIn}: {metadataObj.arrivesIn}</Text>
      <Text>{LocalizedStrings[language].accidentCauses}: {metadataObj.accidentCauses}</Text>
      <Text>{LocalizedStrings[language].accidentPlace}: {metadataObj.accidentPlace}</Text>
      <Text>{LocalizedStrings[language].notifyToName}: {metadataObj.notifyToName}</Text>
      <Text>{LocalizedStrings[language].weight}: {metadataObj.weight}</Text>
      <Text>{LocalizedStrings[language].size}: {metadataObj.size}</Text>
      <Text>{LocalizedStrings[language].temperature}: {metadataObj.temperature}</Text>
      <Text>{LocalizedStrings[language].bloodPressure}: {metadataObj.bloodPressure}</Text>
      <Text>{LocalizedStrings[language].heartRate}: {metadataObj.heartRate}</Text>
      <Text>{LocalizedStrings[language].breathingFrequency}: {metadataObj.breathingFrequency}</Text>
      <Text>{LocalizedStrings[language].oxygenSaturation}: {metadataObj.oxygenSaturation}</Text>
      <Text>{LocalizedStrings[language].attentionDateHours}: {metadataObj.attentionDateHours}</Text>
      <Text>{LocalizedStrings[language].attendantName}: {metadataObj.attendantName}</Text>
      <Text>{LocalizedStrings[language].personalMedicalHistory}: {metadataObj.personalMedicalHistory}</Text>
      <Text>{LocalizedStrings[language].allergies}: {metadataObj.allergies}</Text>
      <Text>{LocalizedStrings[language].reasonForConsultation}: {metadataObj.reasonForConsultation}</Text>
      <Text>{LocalizedStrings[language].clinicalSummary}: {metadataObj.clinicalSummary}</Text>
      <Text>{LocalizedStrings[language].physicalExam}: {metadataObj.physicalExam}</Text>
      <Text>{LocalizedStrings[language].evaluation}: {metadataObj.evaluation}</Text>
      <Text>{LocalizedStrings[language].diagnosis}: {metadataObj.diagnosis}</Text>
      <Text>{LocalizedStrings[language].feeding}: {metadataObj.feeding}</Text>
      <Text>{LocalizedStrings[language].medicines}: {metadataObj.medicines}</Text>
      <Text>{LocalizedStrings[language].exams}: {metadataObj.exams}</Text>
      <Text>{LocalizedStrings[language].normsOrRecommendations}: {metadataObj.normsOrRecommendations}</Text>
      <Text>{LocalizedStrings[language].destiny}: {metadataObj.destiny}</Text>
      <Text>{LocalizedStrings[language].emergencyType}: {metadataObj.emergencyType}</Text>
      <Text>{LocalizedStrings[language].treatingPhysicianSignature}: {metadataObj.treatingPhysicianSignature}</Text>
    </View>)
}

const EmergencyAttentionSheet = (props) => {
  const [dateTime, setDateTime] = useState(null);
  const [names, setNames] = useState(null);
  const [surnames, setSurnames] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [address, setAddress] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [id, setId] = useState(null);
  const [arrivesIn, setArrivesIn] = useState(null);
  const [accidentCauses, setAccidentCauses] = useState(null);
  const [accidentPlace, setAccidentPlace] = useState(null);
  const [notifyToName, setNotifyToName] = useState(null);
  const [notifyToRelationship, setNotifyToRelationship] = useState(null);
  const [notifyToaddress, setNotifyToaddress] = useState(null);
  const [notifyTophone, setNotifyTophone] = useState(null);
  const [weight, setWeight] = useState(null);
  const [size, setSize] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [bloodPressure, setBloodPressure] = useState(null);
  const [heartRate, setHeartRate] = useState(null);
  const [breathingFrequency, setBreathingFrequency] = useState(null);
  const [oxygenSaturation, setOxygenSaturation] = useState(null);
  const [attentionDateHours, setAttentionDateHours] = useState(null);
  const [attendantName, setAttendantName] = useState(null);
  const [personalMedicalHistory, setPersonalMedicalHistory] = useState(null);
  const [allergies, setAllergies] = useState(null);
  const [reasonForConsultation, setReasonForConsultation] = useState(null);
  const [clinicalSummary, setClinicalSummary] = useState(null);
  const [physicalExam, setPhysicalExam] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [feeding, setFeeding] = useState(null);
  const [medicines, setMedicines] = useState(null);
  const [exams, setExams] = useState(null);
  const [normsOrRecommendations, setNormsOrRecommendations] = useState(null);
  const [destiny, setDestiny] = useState(null);
  const [emergencyType, setEmergencyType] = useState(null);
  const [treatingPhysicianSignature, setTreatingPhysicianSignature] = useState(null);
  const [language, setLanguage] = useState(props.navigation.getParam('language', 'en'));

  const patientId = props.navigation.getParam('patientId');
  const visitId = props.navigation.getParam('visitId');
  const userName = props.navigation.getParam('userName');

  const submit = async () => {
    database.addEvent({
      id: uuid(),
      patient_id: patientId,
      visit_id: visitId,
      event_type: EventTypes.EmergencyAttentionSheet,
      event_metadata: JSON.stringify({
        doctor: userName,
        dateTime,
        names,
        surnames,
        occupation,
        address,
        phoneNumber,
        id,
        arrivesIn,
        accidentCauses,
        accidentPlace,
        weight,
        size,
        temperature,
        bloodPressure,
        heartRate,
        breathingFrequency,
        oxygenSaturation,
        attentionDateHours,
        attendantName,
        notifyToName,
        notifyToRelationship,
        notifyToaddress,
        notifyTophone,
        personalMedicalHistory,
        allergies,
        reasonForConsultation,
        clinicalSummary,
        physicalExam,
        evaluation,
        diagnosis,
        feeding,
        medicines,
        exams,
        normsOrRecommendations,
        destiny,
        emergencyType,
        treatingPhysicianSignature
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
          <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].emergencyAttentionSheet}</Text>
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>{LocalizedStrings[language].emergencyAdmission}</Text>
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].dateTime}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <DatePicker
            style={styles.datePicker}
            date={dateTime}
            mode="datetime"
            placeholder={LocalizedStrings[language].dateTime}
            format="YYYY-MM-DD h.mm a"
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
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].names}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setNames(text)}
            value={names}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].surnames}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setSurnames(text)}
            value={surnames}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].occupation}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setOccupation(text)}
            value={occupation}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].address}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setAddress(text)}
            value={address}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].phoneNumber}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setPhoneNumber(text)}
            value={phoneNumber}
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
        {ArrivesIn(arrivesIn, setArrivesIn, language)}
        {AccidentCauses(accidentCauses, setAccidentCauses, language)}
        {AccidentPlace(accidentPlace, setAccidentPlace, language)}
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>{LocalizedStrings[language].notifyTo}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setNotifyToName(text)}
            value={notifyToName}
            placeholder={LocalizedStrings[language].name}
          />
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setNotifyToRelationship(text)}
            value={notifyToRelationship}
            placeholder={LocalizedStrings[language].relationship}
          />
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setNotifyToaddress(text)}
            value={notifyToaddress}
            placeholder={LocalizedStrings[language].address}
          />
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setNotifyTophone(text)}
            value={notifyTophone}
            placeholder={LocalizedStrings[language].telephone}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>{LocalizedStrings[language].vitalSigns}</Text>
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
          />
          <Text style={{ color: '#FFFFFF' }}>cm</Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].temperature}
            onChangeText={(text) => setTemperature(text)}
            value={temperature}
            keyboardType='numeric'
          />
          <Text style={{ color: '#FFFFFF' }}>°C</Text>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].bloodPressure}
            onChangeText={(text) => setBloodPressure(text)}
            value={bloodPressure}
            keyboardType='numeric'
          />
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].heartRate}
            onChangeText={(text) => setHeartRate(text)}
            value={heartRate}
            keyboardType='numeric'
          />
          <Text style={{ color: '#FFFFFF' }}>BPM</Text>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].breathingFrequency}
            onChangeText={(text) => setBreathingFrequency(text)}
            value={breathingFrequency}
            keyboardType='numeric'
          />
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].oxygenSaturation}
            onChangeText={(text) => setOxygenSaturation(text)}
            value={oxygenSaturation}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].attentionDateHours}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <DatePicker
            style={styles.datePicker}
            date={attentionDateHours}
            mode="datetime"
            placeholder={LocalizedStrings[language].attentionDateHours}
            format="YYYY-MM-DD h.mm a"
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
            onDateChange={(date) => setAttentionDateHours(date)}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].attendantName}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setAttendantName(text)}
            value={attendantName}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].personalMedicalHistory}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.textbox]}
            onChangeText={(text) => setPersonalMedicalHistory(text)}
            value={personalMedicalHistory}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].allergies}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs]}
            onChangeText={(text) => setAllergies(text)}
            value={allergies}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].reasonForConsultation}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.textbox]}
            onChangeText={(text) => setReasonForConsultation(text)}
            value={reasonForConsultation}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].clinicalSummary}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.textbox]}
            onChangeText={(text) => setClinicalSummary(text)}
            value={clinicalSummary}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].physicalExam}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.textbox]}
            onChangeText={(text) => setPhysicalExam(text)}
            value={physicalExam}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].evaluation}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.textbox]}
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
            style={[styles.inputs, styles.textbox]}
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
            style={[styles.inputs, styles.textbox]}
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
            style={[styles.inputs, styles.textbox]}
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
            style={[styles.inputs, styles.textbox]}
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
            style={[styles.inputs, styles.textbox]}
            onChangeText={(text) => setNormsOrRecommendations(text)}
            value={normsOrRecommendations}
          />
        </View>
        {Destiny(destiny, setDestiny, language)}
        {EmergencyType(emergencyType, setEmergencyType, language)}
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].treatingPhysicianSignature}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.textbox]}
            onChangeText={(text) => setTreatingPhysicianSignature(text)}
            value={treatingPhysicianSignature}
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

export default EmergencyAttentionSheet;
