import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, Button, TouchableOpacity, Picker
} from 'react-native';

import { database } from "../storage/Database";
import { v4 as uuid } from 'uuid';
import styles from './Style';
import { EventTypes } from '../enums/EventTypes';
import { LocalizedStrings } from '../enums/LocalizedStrings';
import Header from './shared/Header';

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

export const PhysicalExplorationDisplay = (metadataObj, language) => {
  return (
    <View>
      <Text>{LocalizedStrings[language].provider}: {metadataObj.doctor} </Text>
      <Text>{LocalizedStrings[language].bloodPressure}: {metadataObj.bloodPressure}</Text>
      <Text>{LocalizedStrings[language].heartRate}: {metadataObj.heartRate}</Text>
      <Text>{LocalizedStrings[language].respiratoryRate}: {metadataObj.respiratoryRate}</Text>
      <Text>{LocalizedStrings[language].temperature}: {metadataObj.temperature}</Text>
      <Text>{LocalizedStrings[language].oxygenSaturation}: {metadataObj.oxygenSaturation}</Text>
      <Text>{LocalizedStrings[language].weight}: {metadataObj.weight}</Text>
      <Text>{LocalizedStrings[language].height}: {metadataObj.height}</Text>
      <Text>{LocalizedStrings[language].bodyMassIndex}: {metadataObj.bodyMassIndex}</Text>
      <Text>{LocalizedStrings[language].consultationReason}: {metadataObj.consultationReason}</Text>
      <Text>{LocalizedStrings[language].illnessHistory}: {metadataObj.illnessHistory}</Text>
      <Text style={[{ fontWeight: 'bold' }]} >{LocalizedStrings[language].objective}:</Text>
      <Text>{LocalizedStrings[language].head}: {metadataObj.head}</Text>
      <Text>{LocalizedStrings[language].eyes}: {metadataObj.eyes}</Text>
      <Text>{LocalizedStrings[language].earsNoseMouth}: {metadataObj.earsNoseMouth}</Text>
      <Text>{LocalizedStrings[language].neck}: {metadataObj.neck}</Text>
      <Text>{LocalizedStrings[language].chest}: {metadataObj.chest}</Text>
      <Text>{LocalizedStrings[language].heart}: {metadataObj.heart}</Text>
      <Text>{LocalizedStrings[language].lungFields}: {metadataObj.lungFields}</Text>
      <Text>{LocalizedStrings[language].abdomen}: {metadataObj.abdomen}</Text>
      <Text>{LocalizedStrings[language].genitals}: {metadataObj.genitals}</Text>
      <Text>{LocalizedStrings[language].skeletalMuscle}: {metadataObj.skeletalMuscle}</Text>
      <Text>{LocalizedStrings[language].extremities}: {metadataObj.extremities}</Text>
      <Text>{LocalizedStrings[language].neurological}: {metadataObj.neurological}</Text>
      <Text>{LocalizedStrings[language].evaluation}: {metadataObj.evaluation}</Text>
      <Text>{LocalizedStrings[language].diagnosis}: {metadataObj.diagnosis}</Text>
      <Text>{LocalizedStrings[language].feeding}: {metadataObj.feeding}</Text>
      <Text>{LocalizedStrings[language].medicines}: {metadataObj.medicines}</Text>
      <Text>{LocalizedStrings[language].exams}: {metadataObj.exams}</Text>
      <Text>{LocalizedStrings[language].normsOrRecommendations}: {metadataObj.normsOrRecommendations}</Text>
      <Text>{LocalizedStrings[language].treatingPhysician}: {metadataObj.treatingPhysician}</Text>
      <Text>{LocalizedStrings[language].minsaCode}: {metadataObj.minsaCode}</Text>
    </View>)
}

const PhysicalExploration = (props) => {
  const [bloodPressure, setBloodPressure] = useState(null);
  const [heartRate, setHeartRate] = useState(null);
  const [respiratoryRate, setRespiratoryRate] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [oxygenSaturation, setOxygenSaturation] = useState(null);
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [bodyMassIndex, setBodyMassIndex] = useState(null);
  const [consultationReason, setConsultationReason] = useState(null);
  const [illnessHistory, setIllnessHistory] = useState(null);
  const [head, setHead] = useState(null);
  const [eyes, setEyes] = useState(null);
  const [earsNoseMouth, setEarsNoseMouth] = useState(null);
  const [neck, setNeck] = useState(null);
  const [chest, setChest] = useState(null);
  const [heart, setHeart] = useState(null);
  const [lungFields, setLungFields] = useState(null);
  const [abdomen, setAbdomen] = useState(null);
  const [genitals, setGenitals] = useState(null);
  const [skeletalMuscle, setSkeletalMuscle] = useState(null);
  const [extremities, setExtremities] = useState(null);
  const [neurological, setNeurological] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [feeding, setFeeding] = useState(null);
  const [medicines, setMedicines] = useState(null);
  const [exams, setExams] = useState(null);
  const [normsOrRecommendations, setNormsOrRecommendations] = useState(null);
  const [treatingPhysician, setTreatingPhysician] = useState(null);
  const [minsaCode, setMinsaCode] = useState(null);
  const [language, setLanguage] = useState(props.navigation.getParam('language', 'sp'));

  const patientId = props.navigation.getParam('patientId');
  const visitId = props.navigation.getParam('visitId');
  const userName = props.navigation.getParam('userName');

  const submit = async () => {
    database.addEvent({
      id: uuid(),
      patient_id: patientId,
      visit_id: visitId,
      event_type: EventTypes.PhysicalExploration,
      event_metadata: JSON.stringify({
        doctor: userName,
        bloodPressure,
        heartRate,
        respiratoryRate,
        temperature,
        oxygenSaturation,
        weight,
        height,
        bodyMassIndex,
        consultationReason,
        illnessHistory,
        head,
        eyes,
        earsNoseMouth,
        neck,
        chest,
        heart,
        lungFields,
        abdomen,
        genitals,
        skeletalMuscle,
        extremities,
        neurological,
        evaluation,
        diagnosis,
        feeding,
        medicines,
        exams,
        normsOrRecommendations,
        treatingPhysician,
        minsaCode
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
          <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].physicalExploration}</Text>
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].vitalSigns}</Text>
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
            placeholder={LocalizedStrings[language].respiratoryRate}
            onChangeText={(text) => setRespiratoryRate(text)}
            value={respiratoryRate}
            keyboardType='numeric'
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
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].weight}
            onChangeText={(text) => setWeight(text)}
            value={weight}
            keyboardType='numeric'
          />
          <Text style={{ color: '#FFFFFF' }}>kg</Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].height}
            onChangeText={(text) => setHeight(text)}
            value={height}
            keyboardType='numeric'
          />
          <Text style={{ color: '#FFFFFF' }}>cm</Text>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].bodyMassIndex}
            onChangeText={(text) => setBodyMassIndex(text)}
            value={bodyMassIndex}
            keyboardType='numeric'
          />
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
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>{LocalizedStrings[language].objective}</Text>
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].head}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.smallTextbox]}
            onChangeText={(text) => setHead(text)}
            value={head}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].eyes}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.smallTextbox]}
            onChangeText={(text) => setEyes(text)}
            value={eyes}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].earsNoseMouth}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.smallTextbox]}
            onChangeText={(text) => setEarsNoseMouth(text)}
            value={earsNoseMouth}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].neck}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.smallTextbox]}
            onChangeText={(text) => setNeck(text)}
            value={neck}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].chest}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.smallTextbox]}
            onChangeText={(text) => setChest(text)}
            value={chest}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].heart}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.smallTextbox]}
            onChangeText={(text) => setHeart(text)}
            value={heart}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].lungFields}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.smallTextbox]}
            onChangeText={(text) => setLungFields(text)}
            value={lungFields}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].abdomen}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.smallTextbox]}
            onChangeText={(text) => setAbdomen(text)}
            value={abdomen}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].genitals}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.smallTextbox]}
            onChangeText={(text) => setGenitals(text)}
            value={genitals}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].skeletalMuscle}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.smallTextbox]}
            onChangeText={(text) => setSkeletalMuscle(text)}
            value={skeletalMuscle}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].extremities}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.smallTextbox]}
            onChangeText={(text) => setExtremities(text)}
            value={extremities}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].neurological}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={[styles.inputs, styles.smallTextbox]}
            onChangeText={(text) => setNeurological(text)}
            value={neurological}
          />
        </View>
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
            onPress={() => submit()} />
        </View>
      </View>
    </ScrollView>
  );
};

export default PhysicalExploration;
