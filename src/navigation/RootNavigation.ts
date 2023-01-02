import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Login from '../components/Login';
import PatientList from '../components/PatientList';
import NewPatient from '../components/NewPatient';
import PatientView from '../components/PatientView';
import NewVisit from '../components/NewVisit';
import Covid19Form from '../components/Covid19Form';
import EditPatient from '../components/EditPatient';
import OpenTextEvent from '../components/OpenTextEvent';
import EditOpenTextEvent from '../components/EditOpenTextEvent';
import Vitals from '../components/Vitals';
import VisitList from '../components/VisitList';
import EventList from '../components/EventList';
import EditVitals from '../components/EditVitals';
import MedicalHistory from '../components/MedicalHistory';
import Examination from '../components/Examination';
import Physiotherapy from '../components/Physiotherapy';
import Medicine from '../components/Medicine';
import EditExamination from '../components/EditExamination';
import EditMedicalHistory from '../components/EditMedicalHistory';
import EditPhysiotherapy from '../components/EditPhysiotherapy';
import EditMedicine from '../components/EditMedicine';
import SnapshotList from '../components/SnapshotList';
import PathologicalHistory from '../components/PathologicalHistory';
import EditPathologicalHistory from '../components/EditPathologicalHistory';
import NonPathologicalHistory from '../components/NonPathologicalHistory';
import EditNonPathologicalHistory from '../components/EditNonPathologicalHistory';
import GynecologicalBackground from '../components/GynecologicalBackground';
import EditGynecologicalBackground from '../components/EditGynecologicalBackground';
import FamilyPathologicalHistory from '../components/FamilyPathologicalHistory';
import EditFamilyPathologicalHistory from '../components/EditFamilyPathologicalHistory';
import SocioeconomicSituation from '../components/SocioeconomicSituation';
import EditSocioeconomicSituation from '../components/EditSocioeconomicSituation';
import PhysicalExploration from '../components/PhysicalExploration';
import EditPhysicalExploration from '../components/EditPhysicalExploration';
import EmergencyAttentionSheet from '../components/EmergencyAttentionSheet';
import EditEmergencyAttentionSheet from '../components/EditEmergencyAttentionSheet';
import PostnatalHistory from '../components/PostnatalHistoy';
import EditPostnatalHistory from '../components/EditPostnatalHistory';
import Feeding from '../components/Feeding';
import EditFeeding from '../components/EditFeeding';
import Immunizations from '../components/Immunizations';
import EditImmunizations from '../components/EditImmunizations';
import PsychomotorDevelopment from '../components/PsychomotorDevelopment';
import EditPsychomotorDevelopment from '../components/EditPsychomotorDevelopment';
import PediatricPathologicalHistory from '../components/PediatricPathologicalHistory';
import EditPediatricPathologicalHistory from '../components/EditPediatricPathologicalHistory';
import PediatricPhysicalExam from '../components/PediatricPhysicalExam';
import EditPediatricPhysicalExam from '../components/PediatricPhysicalExam';
import SubsequentEvolutionNote from '../components/SubsequentEvolutionNote';
import EditSubsequentEvolutionNote from '../components/EditSubsequentEvolutionNote';
import NursingNote from '../components/NursingNote';
import EditNursingNote from '../components/EditNursingNote';
import UltrasoundConsultation from '../components/UltrasoundConsultation';
import EditUltrasoundConsultation from '../components/EditUltrasoundConsultation';
import LaboratoryConsultation from '../components/LaboratoryConsultation';
import EditLaboratoryConsultation from '../components/EditLaboratoryConsultation';
import OdontologyConsultation from '../components/OdontologyConsultation';
import EditOdontologyConsultation from '../components/EditOdontologyConsultation';

const rootNavigator = createStackNavigator(
  {
    Home: {
      screen: Login,
      navigationOptions: () => ({
        title: `Login`,
        header: null,
      })
    },
    PatientList: {
      screen: PatientList,
      navigationOptions: () => ({
        title: `PatientList`,
        header: null,
      })
    },
    NewPatient: {
      screen: NewPatient,
      navigationOptions: () => ({
        title: `NewPatient`,
        header: null,
      })
    },
    PatientView: {
      screen: PatientView,
      navigationOptions: () => ({
        title: `PatientView`,
        header: null,
      })
    },
    EditPatient: {
      screen: EditPatient,
      navigationOptions: () => ({
        title: `EditPatient`,
        header: null,
      })
    },
    NewVisit: {
      screen: NewVisit,
      navigationOptions: () => ({
        title: `NewVisit`,
        header: null,
      })
    },
    Covid19Form: {
      screen: Covid19Form,
      navigationOptions: () => ({
        title: `Covid19Form`,
        header: null
      })
    },
    OpenTextEvent: {
      screen: OpenTextEvent,
      navigationOptions: () => ({
        title: `OpenTextEvent`,
        header: null
      })
    },
    EditOpenTextEvent: {
      screen: EditOpenTextEvent,
      navigationOptions: () => ({
        title: `EditOpenTextEvent`,
        header: null
      })
    },
    Vitals: {
      screen: Vitals,
      navigationOptions: () => ({
        title: `Vitals`,
        header: null
      })
    },
    EditVitals: {
      screen: EditVitals,
      navigationOptions: () => ({
        title: `EditVitals`,
        header: null
      })
    },
    MedicalHistory: {
      screen: MedicalHistory,
      navigationOptions: () => ({
        title: `MedicalHistory`,
        header: null
      })
    },
    EditMedicalHistory: {
      screen: EditMedicalHistory,
      navigationOptions: () => ({
        title: `EditMedicalHistory`,
        header: null
      })
    },
    Examination: {
      screen: Examination,
      navigationOptions: () => ({
        title: `Examination`,
        header: null
      })
    },
    EditExamination: {
      screen: EditExamination,
      navigationOptions: () => ({
        title: `EditExamination`,
        header: null
      })
    },
    Physiotherapy: {
      screen: Physiotherapy,
      navigationOptions: () => ({
        title: `Physiotherapy`,
        header: null
      })
    },
    EditPhysiotherapy: {
      screen: EditPhysiotherapy,
      navigationOptions: () => ({
        title: `EditPhysiotherapy`,
        header: null
      })
    },
    Medicine: {
      screen: Medicine,
      navigationOptions: () => ({
        title: `Medicine`,
        header: null
      })
    },
    EditMedicine: {
      screen: EditMedicine,
      navigationOptions: () => ({
        title: `EditMedicine`,
        header: null
      })
    },
    PathologicalHistory: {
      screen: PathologicalHistory,
      navigationOptions: () => ({
        title: `PathologicalHistory`,
        header: null
      })
    },
    EditPathologicalHistory: {
      screen: EditPathologicalHistory,
      navigationOptions: () => ({
        title: `EditPathologicalHistory`,
        header: null
      })
    },
    NonPathologicalHistory: {
      screen: NonPathologicalHistory,
      navigationOptions: () => ({
        title: `NonPathologicalHistory`,
        header: null
      })
    },
    EditNonPathologicalHistory: {
      screen: EditNonPathologicalHistory,
      navigationOptions: () => ({
        title: `EditNonPathologicalHistory`,
        header: null
      })
    },
    GynecologicalBackground: {
      screen: GynecologicalBackground,
      navigationOptions: () => ({
        title: `GynecologicalBackground`,
        header: null
      })
    },
    EditGynecologicalBackground: {
      screen: EditGynecologicalBackground,
      navigationOptions: () => ({
        title: `EditGynecologicalBackground`,
        header: null
      })
    },
    FamilyPathologicalHistory: {
      screen: FamilyPathologicalHistory,
      navigationOptions: () => ({
        title: `FamilyPathologicalHistory`,
        header: null
      })
    },
    EditFamilyPathologicalHistory: {
      screen: EditFamilyPathologicalHistory,
      navigationOptions: () => ({
        title: `EditFamilyPathologicalHistory`,
        header: null
      })
    },
    SocioeconomicSituation: {
      screen: SocioeconomicSituation,
      navigationOptions: () => ({
        title: `SocioeconomicSituation`,
        header: null
      })
    },
    EditSocioeconomicSituation: {
      screen: EditSocioeconomicSituation,
      navigationOptions: () => ({
        title: `EditSocioeconomicSituation`,
        header: null
      })
    },
    PhysicalExploration: {
      screen: PhysicalExploration,
      navigationOptions: () => ({
        title: `PhysicalExploration`,
        header: null
      })
    },
    EditPhysicalExploration: {
      screen: EditPhysicalExploration,
      navigationOptions: () => ({
        title: `EditPhysicalExploration`,
        header: null
      })
    },
    EmergencyAttentionSheet: {
      screen: EmergencyAttentionSheet,
      navigationOptions: () => ({
        title: `EmergencyAttentionSheet`,
        header: null
      })
    },
    EditEmergencyAttentionSheet: {
      screen: EditEmergencyAttentionSheet,
      navigationOptions: () => ({
        title: `EditEmergencyAttentionSheet`,
        header: null
      })
    },
    PostnatalHistory: {
      screen: PostnatalHistory,
      navigationOptions: () => ({
        title: `PostnatalHistory`,
        header: null
      })
    },
    EditPostnatalHistory: {
      screen: EditPostnatalHistory,
      navigationOptions: () => ({
        title: `EditPostnatalHistory`,
        header: null
      })
    },
    Feeding: {
      screen: Feeding,
      navigationOptions: () => ({
        title: `Feeding`,
        header: null
      })
    },
    EditFeeding: {
      screen: EditFeeding,
      navigationOptions: () => ({
        title: `EditFeeding`,
        header: null
      })
    },
    Immunizations: {
      screen: Immunizations,
      navigationOptions: () => ({
        title: `Immunizations`,
        header: null
      })
    },
    EditImmunizations: {
      screen: EditImmunizations,
      navigationOptions: () => ({
        title: `EditImmunizations`,
        header: null
      })
    },
    PsychomotorDevelopment: {
      screen: PsychomotorDevelopment,
      navigationOptions: () => ({
        title: `PsychomotorDevelopment`,
        header: null
      })
    },
    EditPsychomotorDevelopment: {
      screen: EditPsychomotorDevelopment,
      navigationOptions: () => ({
        title: `EditPsychomotorDevelopment`,
        header: null
      })
    },
    PediatricPathologicalHistory: {
      screen: PediatricPathologicalHistory,
      navigationOptions: () => ({
        title: `PediatricPathologicalHistory`,
        header: null
      })
    },
    EditPediatricPathologicalHistory: {
      screen: EditPediatricPathologicalHistory,
      navigationOptions: () => ({
        title: `EditPediatricPathologicalHistory`,
        header: null
      })
    },
    PediatricPhysicalExam: {
      screen: PediatricPhysicalExam,
      navigationOptions: () => ({
        title: `PediatricPhysicalExam`,
        header: null
      })
    },
    EditPediatricPhysicalExam: {
      screen: EditPediatricPhysicalExam,
      navigationOptions: () => ({
        title: `EditPediatricPhysicalExam`,
        header: null
      })
    },
    SubsequentEvolutionNote: {
      screen: SubsequentEvolutionNote,
      navigationOptions: () => ({
        title: `SubsequentEvolutionNote`,
        header: null
      })
    },
    EditSubsequentEvolutionNote: {
      screen: EditSubsequentEvolutionNote,
      navigationOptions: () => ({
        title: `EditSubsequentEvolutionNote`,
        header: null
      })
    },
    NursingNote: {
      screen: NursingNote,
      navigationOptions: () => ({
        title: `NursingNote`,
        header: null
      })
    },
    EditNursingNote: {
      screen: EditNursingNote,
      navigationOptions: () => ({
        title: `EditNursingNote`,
        header: null
      })
    },
    UltrasoundConsultation: {
      screen: UltrasoundConsultation,
      navigationOptions: () => ({
        title: `UltrasoundConsultation`,
        header: null
      })
    },
    EditUltrasoundConsultation: {
      screen: EditUltrasoundConsultation,
      navigationOptions: () => ({
        title: `EditUltrasoundConsultation`,
        header: null
      })
    },
    LaboratoryConsultation: {
      screen: LaboratoryConsultation,
      navigationOptions: () => ({
        title: `LaboratoryConsultation`,
        header: null
      })
    },
    EditLaboratoryConsultation: {
      screen: EditLaboratoryConsultation,
      navigationOptions: () => ({
        title: `EditLaboratoryConsultation`,
        header: null
      })
    },
    OdontologyConsultation: {
      screen: OdontologyConsultation,
      navigationOptions: () => ({
        title: `OdontologyConsultation`,
        header: null
      })
    },
    EditOdontologyConsultation: {
      screen: EditOdontologyConsultation,
      navigationOptions: () => ({
        title: `EditOdontologyConsultation`,
        header: null
      })
    },
    VisitList: {
      screen: VisitList,
      navigationOptions: () => ({
        title: `VisitList`,
        header: null
      })
    },
    EventList: {
      screen: EventList,
      navigationOptions: () => ({
        title: `EventList`,
        header: null
      })
    },
    SnapshotList: {
      screen: SnapshotList,
      navigationOptions: () => ({
        title: `SnapshotList`,
        header: null
      })
    }
  },
  {
    initialRouteName: 'Home'
  });

export default createAppContainer(rootNavigator);