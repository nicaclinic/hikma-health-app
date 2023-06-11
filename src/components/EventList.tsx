import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Picker, Button } from "react-native";
import { database } from "../storage/Database";
import styles from './Style';
import { LocalizedStrings } from '../enums/LocalizedStrings'
import { EventTypes } from "../enums/EventTypes";
import { Event } from "../types/Event";
import { Covid19Display } from "./Covid19Form";
import { VitalsDisplay } from "./Vitals";
import { ExaminationDisplay } from "./Examination";
import { MedicineDisplay } from "./Medicine";
import { MedicalHistoryDisplay } from "./MedicalHistory";
import { PhysiotherapyDisplay } from "./Physiotherapy";
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
import { AdultImmunizationsDisplay } from "./AdultImmunizations";

import Header from "./shared/Header";

const EventList = (props) => {
  const visit = props.navigation.getParam('visit');
  const patient = props.navigation.getParam('patient');
  const userName = props.navigation.getParam('userName');

  const [list, setList] = useState(props.navigation.getParam('events', []));
  const [language, setLanguage] = useState(props.navigation.getParam('language', 'sp'));

  useEffect(() => {
    database.getEvents(visit.id).then(events => {
      const filteredEvents = events.filter(event => {
        return !!event.event_metadata;
      })
      setList(filteredEvents);
    })
  }, [props, language])

  useEffect(() => {
    if (language !== props.navigation.getParam('language')) {
      setLanguage(props.navigation.getParam('language'));
    }
  }, [props])

  const keyExtractor = (item, index) => index.toString()

  const editEvent = (event: Event) => {
    switch (event.event_type) {
      case EventTypes.Vitals:
        props.navigation.navigate('EditVitals', { event, language, userName })
        break
      case EventTypes.ExaminationFull:
        props.navigation.navigate('EditExamination', { event, language, userName })
        break
      case EventTypes.Medicine:
        props.navigation.navigate('EditMedicine', { event, language, userName })
        break
      case EventTypes.MedicalHistoryFull:
        props.navigation.navigate('EditMedicalHistory', { event, language, userName })
        break
      case EventTypes.Physiotherapy:
        props.navigation.navigate('EditPhysiotherapy', { event, language, userName })
        break
      case EventTypes.Complaint:
      case EventTypes.DentalTreatment:
      case EventTypes.Notes:
        props.navigation.navigate('EditOpenTextEvent', { event, language })
      case EventTypes.PathologicalHistory:
        props.navigation.navigate('EditPathologicalHistory', { event, language, userName })
      case EventTypes.NonPathologicalHistory:
        props.navigation.navigate('EditNonPathologicalHistory', { event, language, userName })
      case EventTypes.GynecologicalBackground:
        props.navigation.navigate('EditGynecologicalBackgroundDisplay', { event, language, userName })
      case EventTypes.FamilyPathologicalHistory:
        props.navigation.navigate('EditFamilyPathologicalHistory', { event, language, userName })
      case EventTypes.GynecologicalBackground:
        props.navigation.navigate('EditSocioeconomicSituation', { event, language, userName })
      case EventTypes.PhysicalExploration:
        props.navigation.navigate('EditPhysicalExploration', { event, language, userName })
      case EventTypes.EmergencyAttentionSheet:
        props.navigation.navigate('EditEmergencyAttentionSheet', { event, language, userName })
      case EventTypes.PostnatalHistory:
        props.navigation.navigate('EditPostnatalHistory', { event, language, userName })
      case EventTypes.Feeding:
        props.navigation.navigate('EditFeeding', { event, language, userName })
      case EventTypes.Immunizations:
        props.navigation.navigate('EditImmunizations', { event, language, userName })
      case EventTypes.PsychomotorDevelopment:
        props.navigation.navigate('EditPsychomotorDevelopment', { event, language, userName })
      case EventTypes.PediatricPathologicalHistory:
        props.navigation.navigate('EditPediatricPathologicalHistory', { event, language, userName })
      case EventTypes.PediatricPhysicalExam:
        props.navigation.navigate('EditPediatricPhysicalExam', { event, language, userName })
      case EventTypes.SubsequentEvolutionNote:
        props.navigation.navigate('EditSubsequentEvolutionNote', { event, language, userName })
      case EventTypes.NursingNote:
        props.navigation.navigate('EditNursingNote', { event, language, userName })
      case EventTypes.AdultImmunizations:
        props.navigation.navigate('EditAdultImmunizations', { event, language, userName })
      case EventTypes.UltrasoundConsultation:
        props.navigation.navigate('EditUltrasoundConsultation', { event, language, userName })
      case EventTypes.LaboratoryConsultation:
        props.navigation.navigate('EditLaboratoryConsultation', { event, language, userName })
      case EventTypes.OdontologyConsultation:
        props.navigation.navigate('EditOdontologyConsultation', { event, language, userName })
      default:
        break

    }
  }

  const renderItem = ({ item }) => {
    const metadataObj = parseMetadata(item.event_metadata)
    let eventTypeText: string
    let display

    switch (item.event_type) {
      case EventTypes.Covid19Screening:
        eventTypeText = LocalizedStrings[language].covidScreening
        display = Covid19Display(metadataObj, language)
        break
      case EventTypes.Vitals:
        eventTypeText = LocalizedStrings[language].vitals
        display = VitalsDisplay(metadataObj)
        break
      case EventTypes.ExaminationFull:
        eventTypeText = LocalizedStrings[language].examination
        display = ExaminationDisplay(metadataObj, language)
        break
      case EventTypes.Medicine:
        eventTypeText = LocalizedStrings[language].medicine
        display = MedicineDisplay(metadataObj, language)
        break
      case EventTypes.MedicalHistoryFull:
        eventTypeText = LocalizedStrings[language].medicalHistory
        display = MedicalHistoryDisplay(metadataObj, language)
        break
      case EventTypes.Physiotherapy:
        eventTypeText = LocalizedStrings[language].physiotherapy
        display = PhysiotherapyDisplay(metadataObj, language)
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
      case EventTypes.AdultImmunizations:
        eventTypeText = LocalizedStrings[language].adultImmunizations
        display = AdultImmunizationsDisplay(metadataObj, language)
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
    const time = new Date(item.event_timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })

    return (
      <TouchableOpacity style={styles.card}
      //  onLongPress={() => editEvent(item)}
       >
        <View style={styles.cardContent} >
          <View style={{ margin: 10 }}>
            <Text>{`${eventTypeText}, ${time}`}</Text>
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

  const parseMetadata = (metadata: string) => {
    try {
      JSON.parse(metadata);
    } catch (e) {
      return metadata;
    }
    return JSON.parse(metadata);
  }

  return (
    <View style={styles.main}>
      {Header({ action: () => props.navigation.navigate('VisitList', { language: language, patient: patient }), language, setLanguage })}
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={styles.text}>{visit.check_in_timestamp.split('T')[0]}   ({list.length})</Text>
      </View>
      <View style={styles.listContainer}>

        <View style={styles.scroll}>
          <FlatList
            keyExtractor={keyExtractor}
            data={list}
            renderItem={(item) => renderItem(item)}
          />
        </View>

      </View>
      <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <Button
          title={LocalizedStrings[language].newEntry}
          color={'#F77824'}
          onPress={() => {
            props.navigation.navigate('NewVisit',
              {
                language: language,
                patient: patient,
                visitId: visit.id,
                userName: userName,
                existingVisit: true
              }
            )
          }} />
      </View>
    </View>
  )

}

export default EventList;