import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, Image, TextInput, TouchableOpacity, Picker, ScrollView
} from 'react-native';
import styles from './Style';
import { EventTypes } from '../enums/EventTypes';
import { database } from "../storage/Database";
import { v4 as uuid } from 'uuid';
import { LocalizedStrings } from '../enums/LocalizedStrings';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import Header from './shared/Header';

const NewVisit = (props) => {
  const [visitType, setVisitType] = useState('');
  const [visitDate, setVisitDate] = useState(new Date().toISOString().split('T')[0]);
  const [language, setLanguage] = useState(props.navigation.getParam('language', 'en'))
  const [typeTextColor, setTypeTextColor] = useState('#A9A9A9')
  const patient = props.navigation.getParam('patient');
  const visitId = props.navigation.getParam('visitId');
  const userName = props.navigation.getParam('userName');
  const existingVisit = props.navigation.getParam('existingVisit');

  const today = new Date();

  useEffect(() => {
    let patientId = props.navigation.state.params.patient.id;
    database.getLatestPatientEventByType(patientId, EventTypes.VisitType).then((response: string) => {
      if (response.length > 0) {
        setVisitType(response)
      }
    })

    if (!!props.navigation.getParam('language') && language !== props.navigation.getParam('language')) {
      setLanguage(props.navigation.getParam('language'));
    }
  }, [props])

  const LanguageToggle = () => {
    return (
      <Picker
        selectedValue={language}
        onValueChange={value => setLanguage(value)}
        style={[styles.picker, { marginLeft: 10 }]}
      >
        <Picker.Item value='en' label='en' />
        <Picker.Item value='ar' label='ar' />
      </Picker>
    )
  }

  const openTextEvent = (eventType: string) => {
    props.navigation.navigate('OpenTextEvent', { patientId: patient.id, visitId: visitId, eventType: eventType, language: language })
  }

  const handleSaveVisitType = () => {
    database.addEvent({
      id: uuid(),
      patient_id: patient.id,
      visit_id: visitId,
      event_type: EventTypes.VisitType,
      event_metadata: visitType
    }).then(() => console.log('visit type saved'))
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.containerLeft}>
        {Header({
          action: () => existingVisit ?
            props.navigation.navigate('EventList', { language, patient }) :
            props.navigation.navigate('PatientView', { language, patient }), language, setLanguage
        })}

        {existingVisit ?
          null :
          <View style={styles.inputsContainer}>
            <View style={styles.inputRow}>
              <DatePicker
                style={styles.datePicker}
                date={visitDate}
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
                onDateChange={(date) => {
                  setVisitDate(date)
                  database.editVisitDate(visitId, moment(date).toISOString())
                }}
              />
              <TextInput
                style={[styles.inputs, { color: typeTextColor }]}
                placeholder={LocalizedStrings[language].visitType}
                onChangeText={(text) => {
                  setTypeTextColor('#000000')
                  setVisitType(text)
                }}
                onEndEditing={handleSaveVisitType}
                value={visitType}
              />
            </View>
          </View>
        }

        <View style={styles.gridContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('EmergencyAttentionSheet', { patientId: patient.id, visitId, userName, language })}>
            <View style={styles.actionIcon}>
              <Image source={require('../images/medicalHistory.png')} style={{ width: 53, height: 51 }} />
            </View>
            <Text style={styles.actionText}>{LocalizedStrings[language].emergencyAttentionSheet}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('SubsequentEvolutionNote', { patientId: patient.id, visitId, userName, language })}>
            <View style={styles.actionIcon}>
              <Image source={require('../images/medicalHistory.png')} style={{ width: 53, height: 51 }} />
            </View>
            <Text style={styles.actionText}>{LocalizedStrings[language].subsequentEvolutionNote}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('NursingNote', { patientId: patient.id, visitId, userName, language })}>
          <View style={styles.actionIcon}>
              <Image source={require('../images/notes.png')} style={{ width: 43, height: 47 }} />
            </View>
            <Text style={styles.actionText}>{LocalizedStrings[language].nursingNote}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('UltrasoundConsultation', { patientId: patient.id, visitId, userName, language })}>
            <View style={styles.actionIcon}>
              <Image source={require('../images/medicalHistory.png')} style={{ width: 53, height: 51 }} />
            </View>
            <Text style={styles.actionText}>{LocalizedStrings[language].ultrasoundConsultation}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('LaboratoryConsultation', { patientId: patient.id, visitId, userName, language })}>
            <View style={styles.actionIcon}>
              <Image source={require('../images/medicalHistory.png')} style={{ width: 53, height: 51 }} />
            </View>
            <Text style={styles.actionText}>{LocalizedStrings[language].laboratoryConsultation}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('OdontologyConsultation', { patientId: patient.id, visitId, userName, language })}>
          <View style={styles.actionIcon}>
              <Image source={require('../images/notes.png')} style={{ width: 43, height: 47 }} />
            </View>
            <Text style={styles.actionText}>{LocalizedStrings[language].odontologyConsultation}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('FamilyPathologicalHistory', { patientId: patient.id, visitId, userName, language })}>
            <View style={styles.actionIcon}>
              <Image source={require('../images/stethoscope.png')} style={{ width: 43, height: 47 }} />
            </View>
            <Text style={styles.actionText}>{LocalizedStrings[language].familyPathologicalHistory}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('SocioeconomicSituation', { patientId: patient.id, visitId, userName, language })}>
            <View style={styles.actionIcon}>
              <Image source={require('../images/medicine.png')} style={{ width: 43, height: 47 }} />
            </View>
            <Text style={styles.actionText}>{LocalizedStrings[language].socioeconomicSituation}</Text>
          </TouchableOpacity>
        </View>


        <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', }}>
          <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].adult}</Text>
        </View>


        <View style={styles.gridContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('PathologicalHistory', { patientId: patient.id, visitId, userName, language })}>
            <View style={styles.actionIcon}>
              <Image source={require('../images/medicalHistory.png')} style={{ width: 53, height: 51 }} />
            </View>
            <Text style={styles.actionText}>{LocalizedStrings[language].pathologicalHistory}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('NonPathologicalHistory', { patientId: patient.id, visitId, userName, language })}>
            <View style={styles.actionIcon}>
              <Image source={require('../images/medicalHistory.png')} style={{ width: 53, height: 51 }} />
            </View>
            <Text style={styles.actionText}>{LocalizedStrings[language].nonPathologicalHistory}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('GynecologicalBackground', { patientId: patient.id, visitId, userName, language })}>
            <View style={styles.actionIcon}>
              <Image source={require('../images/vitals.png')} style={{ width: 66, height: 31 }} />
            </View>
            <Text style={styles.actionText}>{LocalizedStrings[language].gynecologicalBackground}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('PhysicalExploration', { patientId: patient.id, visitId, userName, language })}>
            <View style={styles.actionIcon}>
              <Image source={require('../images/stethoscope.png')} style={{ width: 66, height: 31 }} />
            </View>
            <Text style={styles.actionText}>{LocalizedStrings[language].physicalExploration}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('AdultImmunizations', { patientId: patient.id, visitId, userName, language })}>
            <View style={styles.actionIcon}>
              <Image source={require('../images/medicine.png')} style={{ width: 66, height: 31 }} />
            </View>
            <Text style={styles.actionText}>{LocalizedStrings[language].adultImmunizations}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', }}>
          <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].pediatric}</Text>
        </View>

        <View style={styles.gridContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('PostnatalHistory', { patientId: patient.id, visitId, userName, language })}>
            <View style={styles.actionIcon}>
              <Image source={require('../images/stethoscope.png')} style={{ width: 43, height: 47 }} />
            </View>
            <Text style={styles.actionText}>{LocalizedStrings[language].postnatalHistory}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('Feeding', { patientId: patient.id, visitId, userName, language })}>
            <View style={styles.actionIcon}>
              <Image source={require('../images/medicine.png')} style={{ width: 43, height: 47 }} />
            </View>
            <Text style={styles.actionText}>{LocalizedStrings[language].feeding}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('Immunizations', { patientId: patient.id, visitId, userName, language })}>
            <View style={styles.actionIcon}>
              <Image source={require('../images/vitals.png')} style={{ width: 66, height: 31 }} />
            </View>
            <Text style={styles.actionText}>{LocalizedStrings[language].immunizations}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('PsychomotorDevelopment', { patientId: patient.id, visitId, userName, language })}>
            <View style={styles.actionIcon}>
              <Image source={require('../images/medicalHistory.png')} style={{ width: 53, height: 51 }} />
            </View>
            <Text style={styles.actionText}>{LocalizedStrings[language].psychomotorDevelopment}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('PediatricPathologicalHistory', { patientId: patient.id, visitId, userName, language })}>
            <View style={styles.actionIcon}>
              <Image source={require('../images/medicine.png')} style={{ width: 43, height: 47 }} />
            </View>
            <Text style={styles.actionText}>{LocalizedStrings[language].pediatricPathologicalHistory}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('PediatricPhysicalExam', { patientId: patient.id, visitId, userName, language })}>
            <View style={styles.actionIcon}>
              <Image source={require('../images/medicalHistory.png')} style={{ width: 53, height: 51 }} />
            </View>
            <Text style={styles.actionText}>{LocalizedStrings[language].pediatricPhysicalExam}</Text>
          </TouchableOpacity>
        </View>


        

        {/* <View style={styles.gridContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => openTextEvent(EventTypes.DentalTreatment)}>
            <View style={styles.actionIcon}>
              <Image source={require('../images/dental_treatment.png')} style={{ width: 50, height: 50 }} />
            </View>
            <Text style={styles.actionText}>{LocalizedStrings[language].dentalTreatment}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => openTextEvent(EventTypes.Notes)}>
            <View style={styles.actionIcon}>
              <Image source={require('../images/notes.png')} style={{ width: 43, height: 47 }} />
            </View>
            <Text style={styles.actionText}>{LocalizedStrings[language].notes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => props.navigation.navigate('Covid19Form', { language, patient, visitId, userName })}>
            <View style={styles.actionIcon}>
              <Image source={require('../images/covid.png')} style={{ width: 43, height: 47 }} />
            </View>
            <Text style={styles.actionText}>{LocalizedStrings[language].covidScreening}</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </ScrollView>
  );
};

export default NewVisit;