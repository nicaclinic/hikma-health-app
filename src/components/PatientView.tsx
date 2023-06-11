import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, Button } from "react-native";
import { database } from '../storage/Database';
import styles from './Style';
import { v4 as uuid } from 'uuid';
import { EventTypes } from "../enums/EventTypes";
import { iconHash } from '../services/hash'
import { User } from "../types/User";
import { LocalizedStrings } from "../enums/LocalizedStrings";
import UserAvatar from 'react-native-user-avatar';
import Header from "./shared/Header";

const PatientView = (props) => {

  const [patient, setPatient] = useState(props.navigation.getParam('patient'));
  const [language, setLanguage] = useState(props.navigation.getParam('language', 'sp'));
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [userName, setUserName] = useState('');
  const [summary, setSummary] = useState(LocalizedStrings[(props.navigation.getParam('language', 'en'))].noContent)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const clinicId = props.navigation.state.params.clinicId;
  const userId = props.navigation.state.params.userId;
  const name1 = 'This'
  const name2 = 'Guy'

  useEffect(() => {
    setPatient(props.navigation.state.params.patient);
    let patientId = props.navigation.state.params.patient.id
    database.getLatestPatientEventByType(patientId, EventTypes.PatientSummary).then((response: string) => {
      if (response.length > 0) {
        setSummary(response)
      } else {
        setSummary(LocalizedStrings[language].noContent)
      }
    })
  }, [props, language])

  useEffect(() => {
    if (language !== props.navigation.getParam('language')) {
      setLanguage(props.navigation.getParam('language'));
    }
  }, [props])

  useEffect(() => {
    database.getUser(userId).then((user: User) => {
      if (!!user.name.content[language]) {
        setUserName(user.name.content[language])
      } else {
        setUserName(user.name.content[Object.keys(user.name.content)[0]])
      }
    })
  }, [])

  const displayName = (patient) => {
    if (!!patient.given_name.content[language] && !!patient.surname.content[language]) {
      return <Text>{`${patient.given_name.content[language]} ${patient.surname.content[language]}`}</Text>
    } else {
      patient.given_name.content[Object.keys(patient.given_name.content)[0]]
      return <Text>{`${patient.given_name.content[Object.keys(patient.given_name.content)[0]]} ${patient.surname.content[Object.keys(patient.surname.content)[0]]}`}</Text>
    }
  }

  const displayNameAvatar = (patient) => {
    if (!!patient.given_name.content[language] && !!patient.surname.content[language]) {
      return `${patient.given_name.content[language]} ${patient.surname.content[language]}`
    } else {
      patient.given_name.content[Object.keys(patient.given_name.content)[0]]
      return `${patient.given_name.content[Object.keys(patient.given_name.content)[0]]} ${patient.surname.content[Object.keys(patient.surname.content)[0]]}`
    }
  }

  const handleSaveSummary = () => {
    database.addEvent({
      id: uuid(),
      patient_id: patient.id,
      visit_id: null,
      event_type: EventTypes.PatientSummary,
      event_metadata: summary
    }).then(() => console.log('patient summary saved'))
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[styles.main, { justifyContent: 'space-between' }]}>
        {Header({ action: () => props.navigation.navigate('PatientList', { language: language, reloadPatientsToggle: !props.navigation.state.params.reloadPatientsToggle }), language, setLanguage })}
        <View style={[styles.card, { flex: 1, elevation: 0 }]}>
          <View style={[styles.cardContent, { alignItems: 'flex-start' }]}>

            <UserAvatar size={100} name={displayNameAvatar(patient)} bgColor='#ECECEC' textColor='#6177B7'/>
            <View style={{ marginLeft: 20, flex: 1 }}>

              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
                  <Text style={styles.gridItemText}>{displayName(patient)}</Text>
                  <View style={[styles.editPatientButton]}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('EditPatient', { language: language, patient: patient })}>
                      <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].edit}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Text>{`${LocalizedStrings[language].medicalRecordNum}:  ${patient.medical_record_num}`}</Text>
                <Text>{`${LocalizedStrings[language].dob}:  ${patient.date_of_birth}`}</Text>
                <Text>{`${LocalizedStrings[language].sex}:  ${patient.sex}`}</Text>
                {!!patient.attention_datetime ? <Text>{LocalizedStrings[language].attentionDateTime}: {patient.attention_datetime}</Text> : null}
                {!!patient.attending_resources ? <Text>{LocalizedStrings[language].resourceThatAttends}: {patient.attending_resources}</Text> : null}
                {!!patient.origin ? <Text>{LocalizedStrings[language].origin}: {patient.origin}</Text> : null}
                {!!patient.email ? <Text>{LocalizedStrings[language].email}: {patient.email}</Text> : null}
                {!!patient.educational_status ? <Text>{LocalizedStrings[language].educationalStatus}: {patient.educational_status}</Text> : null}
                {!!patient.religion ? <Text>{LocalizedStrings[language].religion}: {patient.religion}</Text> : null}
                {!!patient.marital_status ? <Text>{LocalizedStrings[language].maritalStatus}: {patient.marital_status}</Text> : null}
                {!!patient.occupation ? <Text>{LocalizedStrings[language].occupation}: {patient.occupation}</Text> : null}

                {!!patient.mother_name ? <Text>{LocalizedStrings[language].motherName}: {patient.mother_name}</Text> : null}
                {!!patient.father_name ? <Text>{LocalizedStrings[language].fatherName}: {patient.father_name}</Text> : null}
                {!!patient.delivery_place ? <Text>{LocalizedStrings[language].deliveryPlace}: {patient.delivery_place}</Text> : null}
                {!!patient.delivery_datetime ? <Text>{LocalizedStrings[language].deliveryDateTime}: {patient.delivery_datetime}</Text> : null}
                {!!patient.gestational_age ? <Text>{LocalizedStrings[language].gestationalAge}: {patient.gestational_age}</Text> : null}
                {!!patient.delivery_care ? <Text>{LocalizedStrings[language].deliveryCare}: {patient.delivery_care}</Text> : null}
                {!!patient.delivery_via ? <Text>{LocalizedStrings[language].via}: {patient.delivery_via}</Text> : null}
                {!!patient.presentation ? <Text>{LocalizedStrings[language].presentation}: {patient.presentation}</Text> : null}
                {!!patient.birthing_events ? <Text>{LocalizedStrings[language].birthing_events}: {patient.birthing_events}</Text> : null}
              </View>

              <View style={{ flex: 1, marginBottom: 15 }}>
                <TouchableOpacity onLongPress={() => setIsEditingSummary(true)} >
                  {isEditingSummary ?
                    <View>
                      <TextInput
                        style={styles.paragraph}
                        onChangeText={setSummary}
                        value={summary}
                      />
                      <TouchableOpacity
                        style={[styles.editPatientButton, { marginHorizontal: 0 }]}
                        onPress={() => {
                          handleSaveSummary();
                          setIsEditingSummary(false);
                        }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].save}</Text>
                        </View>
                      </TouchableOpacity>
                    </View> :
                    <View>
                      <Text style={[styles.gridItemText, { paddingBottom: 5 }]}>{LocalizedStrings[language].patientSummary}</Text>
                      <Text style={[styles.paragraph]}>
                        {summary}
                      </Text>
                    </View>
                  }
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.newVisit}>
          <Button
            title={LocalizedStrings[language].newVisit}
            color={'#F77824'}
            onPress={() => {
              const newVisitId = uuid();
              database.addVisit({
                id: newVisitId,
                patient_id: patient.id,
                clinic_id: clinicId,
                provider_id: userId
              })
              props.navigation.navigate('NewVisit',
                {
                  language: language,
                  patient: patient,
                  visitId: newVisitId.replace(/-/g, ""),
                  userName: userName
                }
              )
            }} />
        </View>
        
        <View style={{ alignItems: 'stretch', flexGrow: 1 }}>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => props.navigation.navigate('VisitList', { language: language, patient: patient, userName })}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.gridItemText}>{LocalizedStrings[language].visitHistory}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => props.navigation.navigate('SnapshotList', { eventType: EventTypes.EmergencyAttentionSheet, language: language, patient: patient })}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.gridItemText}>{LocalizedStrings[language].emergencyAttentionSheet}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => props.navigation.navigate('SnapshotList', { eventType: EventTypes.SubsequentEvolutionNote, language: language, patient: patient })}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.gridItemText}>{LocalizedStrings[language].subsequentEvolutionNote}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => props.navigation.navigate('SnapshotList', { eventType: EventTypes.NursingNote, language: language, patient: patient })}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.gridItemText}>{LocalizedStrings[language].nursingNote}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => props.navigation.navigate('SnapshotList', { eventType: EventTypes.UltrasoundConsultation, language: language, patient: patient })}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.gridItemText}>{LocalizedStrings[language].ultrasoundConsultation}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => props.navigation.navigate('SnapshotList', { eventType: EventTypes.LaboratoryConsultation, language: language, patient: patient })}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.gridItemText}>{LocalizedStrings[language].laboratoryConsultation}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => props.navigation.navigate('SnapshotList', { eventType: EventTypes.OdontologyConsultation, language: language, patient: patient })}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.gridItemText}>{LocalizedStrings[language].odontologyConsultation}</Text>
            </View>
          </TouchableOpacity>


          <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', }}>
            <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].adult}</Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => props.navigation.navigate('SnapshotList', { eventType: EventTypes.PathologicalHistory, language: language, patient: patient })}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.gridItemText}>{LocalizedStrings[language].pathologicalHistory}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => props.navigation.navigate('SnapshotList', { eventType: EventTypes.NonPathologicalHistory, language: language, patient: patient })}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.gridItemText}>{LocalizedStrings[language].nonPathologicalHistory}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => props.navigation.navigate('SnapshotList', { eventType: EventTypes.GynecologicalBackground, language: language, patient: patient })}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.gridItemText}>{LocalizedStrings[language].gynecologicalBackground}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => props.navigation.navigate('SnapshotList', { eventType: EventTypes.FamilyPathologicalHistory, language: language, patient: patient })}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.gridItemText}>{LocalizedStrings[language].familyPathologicalHistory}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => props.navigation.navigate('SnapshotList', { eventType: EventTypes.SocioeconomicSituation, language: language, patient: patient })}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.gridItemText}>{LocalizedStrings[language].socioeconomicSituation}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => props.navigation.navigate('SnapshotList', { eventType: EventTypes.PhysicalExploration, language: language, patient: patient })}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.gridItemText}>{LocalizedStrings[language].physicalExploration}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => props.navigation.navigate('SnapshotList', { eventType: EventTypes.AdultImmunizations, language: language, patient: patient })}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.gridItemText}>{LocalizedStrings[language].adultImmunizations}</Text>
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', }}>
            <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].pediatric}</Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => props.navigation.navigate('SnapshotList', { eventType: EventTypes.PostnatalHistory, language: language, patient: patient })}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.gridItemText}>{LocalizedStrings[language].postnatalHistory}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => props.navigation.navigate('SnapshotList', { eventType: EventTypes.Feeding, language: language, patient: patient })}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.gridItemText}>{LocalizedStrings[language].feeding}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => props.navigation.navigate('SnapshotList', { eventType: EventTypes.Immunizations, language: language, patient: patient })}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.gridItemText}>{LocalizedStrings[language].immunizations}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => props.navigation.navigate('SnapshotList', { eventType: EventTypes.PsychomotorDevelopment, language: language, patient: patient })}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.gridItemText}>{LocalizedStrings[language].psychomotorDevelopment}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => props.navigation.navigate('SnapshotList', { eventType: EventTypes.PediatricPathologicalHistory, language: language, patient: patient })}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.gridItemText}>{LocalizedStrings[language].pediatricPathologicalHistory}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => props.navigation.navigate('SnapshotList', { eventType: EventTypes.PediatricPhysicalExam, language: language, patient: patient })}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.gridItemText}>{LocalizedStrings[language].pediatricPhysicalExam}</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  )

}

export default PatientView;