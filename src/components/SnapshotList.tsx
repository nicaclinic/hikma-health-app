import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { database } from "../storage/Database";
import styles from './Style';
import { LocalizedStrings } from '../enums/LocalizedStrings'
import { EventTypes } from "../enums/EventTypes";
import { MedicineDisplay } from "./Medicine";
import { MedicalHistoryDisplay } from "./MedicalHistory";
import { ExaminationDisplay } from "./Examination";
import { PathologicalHistoryDisplay } from "./PathologicalHistory";
import { NonPathologicalHistoryDisplay } from "./NonPathologicalHistory";
import { GynecologicalBackgroundDisplay } from "./GynecologicalBackground";
import { FamilyPathologicalHistoryDisplay } from "./FamilyPathologicalHistory";
import { SocioeconomicSituationDisplay } from "./SocioeconomicSituation";
import { PhysicalExplorationDisplay } from "./PhysicalExploration";
import { EmergencyAttentionSheetDisplay } from "./EmergencyAttentionSheet";
import { PostnatalHistoryDisplay } from "./PostnatalHistoy";
import { FeedingDisplay } from "./Feeding";
import { ImmunizationsDisplay } from "./Immunizations";
import { PsychomotorDevelopmentDisplay } from "./PsychomotorDevelopment";
import { PediatricPathologicalHistoryDisplay } from "./PediatricPathologicalHistory";
import { PediatricPhysicalExamDisplay } from "./PediatricPhysicalExam";
import { SubsequentEvolutionNoteDisplay } from "./SubsequentEvolutionNote";
import { NursingNoteDisplay } from "./NursingNote";
import { UltrasoundConsultationDisplay } from "./UltrasoundConsultation";
import { LaboratoryConsultationDisplay } from "./LaboratoryConsultation";
import { OdontologyConsultationDisplay } from "./OdontologyConsultation";


import Header from "./shared/Header";

const SnapshotList = (props) => {
  const patient = props.navigation.getParam('patient');
  const eventType = props.navigation.getParam('eventType');
  const [language, setLanguage] = useState(props.navigation.getParam('language', 'en'));

  const [list, setList] = useState(props.navigation.getParam('events', []));

  useEffect(() => {
    database.getAllPatientEventsByType(patient.id, eventType).then(events => {
      const filteredEvents = events.filter(event => {
        return !!event.event_metadata;
      })
      setList(filteredEvents);
    })
  }, [props, language])

  const keyExtractor = (item, index) => index.toString()

  const parseMetadata = (metadata: string) => {
    try {
      JSON.parse(metadata);
    } catch (e) {
      return metadata;
    }
    return JSON.parse(metadata);
  }

  const renderItem = ({ item }) => {
    const metadataObj = parseMetadata(item.event_metadata)

    let eventTypeText: string
    let display
    switch (item.event_type) {
      case EventTypes.MedicalHistoryFull:
        eventTypeText = LocalizedStrings[language].medicalHistory
        display = MedicalHistoryDisplay(metadataObj, language)
        break
      case EventTypes.ExaminationFull:
        eventTypeText = LocalizedStrings[language].examination
        display = ExaminationDisplay(metadataObj, language)
        break
      case EventTypes.Medicine:
        eventTypeText = LocalizedStrings[language].medicine
        display = MedicineDisplay(metadataObj, language)
        break
      case EventTypes.Complaint:
        eventTypeText = LocalizedStrings[language].complaint
        display = <Text>{metadataObj}</Text>
        break
      case EventTypes.PathologicalHistory:
        eventTypeText = LocalizedStrings[language].pathologicalHistory
        display = PathologicalHistoryDisplay(metadataObj, language)
        break
      case EventTypes.NonPathologicalHistory:
        eventTypeText = LocalizedStrings[language].nonPathologicalHistory
        display = NonPathologicalHistoryDisplay(metadataObj, language)
        break
      case EventTypes.GynecologicalBackground:
        eventTypeText = LocalizedStrings[language].gynecologicalBackground
        display = GynecologicalBackgroundDisplay(metadataObj, language)
        break
      case EventTypes.FamilyPathologicalHistory:
        eventTypeText = LocalizedStrings[language].familyPathologicalHistory
        display = FamilyPathologicalHistoryDisplay(metadataObj, language)
        break
      case EventTypes.SocioeconomicSituation:
        eventTypeText = LocalizedStrings[language].socioeconomicSituation
        display = SocioeconomicSituationDisplay(metadataObj, language)
        break
      case EventTypes.PhysicalExploration:
        eventTypeText = LocalizedStrings[language].physicalExploration
        display = PhysicalExplorationDisplay(metadataObj, language)
        break
      case EventTypes.EmergencyAttentionSheet:
        eventTypeText = LocalizedStrings[language].emergencyAttentionSheet
        display = EmergencyAttentionSheetDisplay(metadataObj, language)
        break
      case EventTypes.PostnatalHistory:
        eventTypeText = LocalizedStrings[language].postnatalHistory
        display = PostnatalHistoryDisplay(metadataObj, language)
        break
      case EventTypes.Feeding:
        eventTypeText = LocalizedStrings[language].feeding
        display = FeedingDisplay(metadataObj, language)
        break
      case EventTypes.Immunizations:
        eventTypeText = LocalizedStrings[language].immunizations
        display = ImmunizationsDisplay(metadataObj, language)
        break
      case EventTypes.PsychomotorDevelopment:
        eventTypeText = LocalizedStrings[language].psychomotorDevelopment
        display = PsychomotorDevelopmentDisplay(metadataObj, language)
        break
      case EventTypes.PediatricPathologicalHistory:
        eventTypeText = LocalizedStrings[language].pediatricPathologicalHistory
        display = PediatricPathologicalHistoryDisplay(metadataObj, language)
        break
      case EventTypes.PediatricPhysicalExam:
        eventTypeText = LocalizedStrings[language].pediatricPhysicalExam
        display = PediatricPhysicalExamDisplay(metadataObj, language)
        break
      case EventTypes.SubsequentEvolutionNote:
        eventTypeText = LocalizedStrings[language].subsequentEvolutionNote
        display = SubsequentEvolutionNoteDisplay(metadataObj, language)
        break
      case EventTypes.NursingNote:
        eventTypeText = LocalizedStrings[language].nursingNote
        display = NursingNoteDisplay(metadataObj, language)
        break
      case EventTypes.UltrasoundConsultation:
        eventTypeText = LocalizedStrings[language].ultrasoundConsultation
        display = UltrasoundConsultationDisplay(metadataObj, language)
        break
      case EventTypes.LaboratoryConsultation:
        eventTypeText = LocalizedStrings[language].laboratoryConsultation
        display = LaboratoryConsultationDisplay(metadataObj, language)
        break
      case EventTypes.OdontologyConsultation:
        eventTypeText = LocalizedStrings[language].odontologyConsultation
        display = OdontologyConsultationDisplay(metadataObj, language)
        break
      default:
        eventTypeText = item.event_type
        display = <Text>{metadataObj}</Text>
        break
    }

    const time = new Date(item.edited_at).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })

    return (
      <TouchableOpacity style={styles.card}
      // onLongPress={() => editEvent(item)}
      >
        <View style={styles.cardContent} >
          <View style={{ margin: 10 }}>
            <Text>{`${eventTypeText}, ${!!metadataObj.doctor ? metadataObj.doctor + ',' : ''} ${time} `}</Text>
            <View
              style={{
                marginVertical: 5,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}
            />
            {display}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.main}>
      {Header({ action: () => props.navigation.navigate('PatientView', { language: language, patient: patient }), language, setLanguage })}
      <View style={styles.listContainer}>
        <View style={styles.scroll}>
          <FlatList
            keyExtractor={keyExtractor}
            data={list}
            renderItem={(item) => renderItem(item)}
          />
        </View>
      </View>
    </View>
  )
}

export default SnapshotList;