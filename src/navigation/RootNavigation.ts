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