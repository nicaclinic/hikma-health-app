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

const EditEmergencyAttentionSheet = (props) => {
  const event = props.navigation.getParam('event');
  const userName = props.navigation.getParam('userName');
  const [dateTime, setDateTime] = useState(null);
  const [medicalRecord, setMedicalRecord] = useState(null);
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

  useEffect(() => {
    if (!!event.event_metadata) {
      const metadataObj = JSON.parse(event.event_metadata)
      setDateTime(metadataObj.dateTime)
      setMedicalRecord(metadataObj.medicalRecord)
      setNames(metadataObj.names)
      setSurnames(metadataObj.surnames)
      setOccupation(metadataObj.occupation)
      setAddress(metadataObj.address)
      setPhoneNumber(metadataObj.phoneNumber)
      setId(metadataObj.id)
      setArrivesIn(metadataObj.arrivesIn)
      setAccidentCauses(metadataObj.accidentCauses)
      setAccidentPlace(metadataObj.accidentPlace)
      setNotifyToName(metadataObj.notifyToName)
      setNotifyToRelationship(metadataObj.notifyToRelationship)
      setNotifyToaddress(metadataObj.notifyToaddress)
      setNotifyTophone(metadataObj.notifyTophone)
      setWeight(metadataObj.weight)
      setSize(metadataObj.size)
      setTemperature(metadataObj.temperature)
      setBloodPressure(metadataObj.bloodGlucose)
      setHeartRate(metadataObj.heartRate)
      setBreathingFrequency(metadataObj.breathingFrequency)
      setOxygenSaturation(metadataObj.oxygenSaturation)
      setAttentionDateHours(metadataObj.attentionDateHours)
      setAttendantName(metadataObj.attendantName)
      setPersonalMedicalHistory(metadataObj.personalMedicalHistory)
      setAllergies(metadataObj.allergies)
      setReasonForConsultation(metadataObj.reasonForConsultation)
      setClinicalSummary(metadataObj.clinicalSummary)
      setPhysicalExam(metadataObj.physicalExam)
      setEvaluation(metadataObj.evaluation)
      setDiagnosis(metadataObj.diagnosis)
      setFeeding(metadataObj.feeding)
      setMedicines(metadataObj.medicines)
      setExams(metadataObj.exams)
      setNormsOrRecommendations(metadataObj.normsOrRecommendations)
      setDestiny(metadataObj.destiny)
      setEmergencyType(metadataObj.emergencyType)
      setTreatingPhysicianSignature(metadataObj.treatingPhysicianSignature)
    }
  }, [props])

  const submitEmergencyAttentionSheet = async () => {
    database.editEvent(
      event.id,
      JSON.stringify({
        doctor: userName,
        dateTime,
        medicalRecord,
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
    ).then((response) => props.navigation.navigate('EventList', { events: response, language }))
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.containerLeft}>
        {Header({ action: () => props.navigation.navigate('EventList', { language }), language, setLanguage })}
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
            onPress={() => submitEmergencyAttentionSheet()} />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditEmergencyAttentionSheet;
