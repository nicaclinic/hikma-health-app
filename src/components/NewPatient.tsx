import React, { useState } from 'react';
import {
  View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Picker, Button, ScrollView
} from 'react-native';
import { database } from "../storage/Database";
import { v4 as uuid } from 'uuid';
import styles from './Style';
import DatePicker from 'react-native-datepicker'
import { LocalizedStrings } from '../enums/LocalizedStrings';
import { EventTypes } from '../enums/EventTypes';
import Header from './shared/Header';

export const EducationalStatus = (value, action, language) => {
  return (
    <Picker
      selectedValue={value}
      onValueChange={value => action(value)}
      style={[styles.picker, { width: '90%' }]}
    >
      <Picker.Item value='' label={LocalizedStrings[language].educationalStatus} />
      <Picker.Item value={LocalizedStrings[language].preschool} label={LocalizedStrings[language].preschool} />
      <Picker.Item value={LocalizedStrings[language].primary} label={LocalizedStrings[language].primary} />
      <Picker.Item value={LocalizedStrings[language].secondary} label={LocalizedStrings[language].secondary} />
      <Picker.Item value={LocalizedStrings[language].university} label={LocalizedStrings[language].university} />
      <Picker.Item value={LocalizedStrings[language].technical} label={LocalizedStrings[language].technical} />
      <Picker.Item value={LocalizedStrings[language].knowsReadWrite} label={LocalizedStrings[language].knowsReadWrite} />
      <Picker.Item value={LocalizedStrings[language].illiterate} label={LocalizedStrings[language].illiterate} />
    </Picker>
  )
}

export const Religion = (value, action, language) => {
  return (
    <Picker
      selectedValue={value}
      onValueChange={value => action(value)}
      style={[styles.picker, { width: '90%' }]}
    >
      <Picker.Item value='' label={LocalizedStrings[language].religion} />
      <Picker.Item value={LocalizedStrings[language].catholic} label={LocalizedStrings[language].catholic} />
      <Picker.Item value={LocalizedStrings[language].evangelical} label={LocalizedStrings[language].evangelical} />
      <Picker.Item value={LocalizedStrings[language].none} label={LocalizedStrings[language].none} />
      <Picker.Item value={LocalizedStrings[language].other} label={LocalizedStrings[language].other} />
    </Picker>
  )
}

export const MaritalStatus = (value, action, language) => {
  return (
    <Picker
      selectedValue={value}
      onValueChange={value => action(value)}
      style={[styles.picker, { width: '90%' }]}
    >
      <Picker.Item value='' label={LocalizedStrings[language].maritalStatus} />
      <Picker.Item value={LocalizedStrings[language].single} label={LocalizedStrings[language].single} />
      <Picker.Item value={LocalizedStrings[language].married} label={LocalizedStrings[language].married} />
      <Picker.Item value={LocalizedStrings[language].stableUnion} label={LocalizedStrings[language].stableUnion} />
      <Picker.Item value={LocalizedStrings[language].widower} label={LocalizedStrings[language].widower} />
      <Picker.Item value={LocalizedStrings[language].divorced} label={LocalizedStrings[language].divorced} />
    </Picker>
  )
}

export const DeliveryCare = (value, action, language) => {
  return (
    <Picker
      selectedValue={value}
      onValueChange={value => action(value)}
      style={[styles.picker, { width: '90%' }]}
    >
      <Picker.Item value='' label={LocalizedStrings[language].deliveryCare} />
      <Picker.Item value={LocalizedStrings[language].medical} label={LocalizedStrings[language].medical} />
      <Picker.Item value={LocalizedStrings[language].nurse} label={LocalizedStrings[language].nurse} />
      <Picker.Item value={LocalizedStrings[language].midwife} label={LocalizedStrings[language].midwife} />
      <Picker.Item value={LocalizedStrings[language].other} label={LocalizedStrings[language].other} />
    </Picker>
  )
}

export const DeliveryVia = (value, action, language) => {
  return (
    <Picker
      selectedValue={value}
      onValueChange={value => action(value)}
      style={[styles.picker, { width: '90%' }]}
    >
      <Picker.Item value='' label={LocalizedStrings[language].via} />
      <Picker.Item value={LocalizedStrings[language].vaginal} label={LocalizedStrings[language].vaginal} />
      <Picker.Item value={LocalizedStrings[language].caesareanSection} label={LocalizedStrings[language].caesareanSection} />
    </Picker>
  )
}

export const Presentation = (value, action, language) => {
  return (
    <Picker
      selectedValue={value}
      onValueChange={value => action(value)}
      style={[styles.picker, { width: '90%' }]}
    >
      <Picker.Item value='' label={LocalizedStrings[language].presentation} />
      <Picker.Item value={LocalizedStrings[language].cephalic} label={LocalizedStrings[language].cephalic} />
      <Picker.Item value={LocalizedStrings[language].podalic} label={LocalizedStrings[language].podalic} />
      <Picker.Item value={LocalizedStrings[language].transverse} label={LocalizedStrings[language].transverse} />
      <Picker.Item value={LocalizedStrings[language].other} label={LocalizedStrings[language].other} />
    </Picker>
  )
}

const NewPatient = (props) => {
  const [givenName, setGivenName] = useState('');
  const [surname, setSurname] = useState('');
  const [dob, setDob] = useState('');
  const [male, setMale] = useState(false);
  const [country, setCountry] = useState('');
  const [hometown, setHometown] = useState('');
  const [phone, setPhone] = useState('');
  const [language, setLanguage] = useState(props.navigation.getParam('language', 'en'))
  const [camp, setCamp] = useState('');
  const [medicalRecordNum, setMedicalRecordNum] = useState('');
  const [attentionDateTime, setAttentionDateTime] = useState('');
  const [resourceThatAttends, setResourceThatAttends] = useState('');
  const [origin, setOrigin] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [educationalStatus, setEducationalStatus] = useState('');
  const [religion, setReligion] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [occupation, setOccupation] = useState('');
  const [motherName, setMotherName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [deliveryPlace, setDeliveryPlace] = useState('');
  const [deliveryDateTime, setDeliveryDateTime] = useState('');
  const [gestationalAge, setGestationalAge] = useState('');
  const [deliveryCare, setDeliveryCare] = useState('');
  const [deliveryVia, setDeliveryVia] = useState('');
  const [presentation, setPresentation] = useState('');
  const [birthingEvents, setBirthingEvents] = useState('');
  

  const today = new Date();
  const [patientId] = useState(uuid().replace(/-/g, ''));

  const handleSaveCamp = (campName: string) => {
    database.addEvent({
      id: uuid(),
      patient_id: patientId,
      visit_id: null,
      event_type: EventTypes.Camp,
      event_metadata: campName
    }).then(() => console.log('camp saved'))
  }

  const handleSaveDob = (dob: string) => {
    setDob(dob)
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    setAge(age.toString())
  }

  const addPatient = async () => {
    const givenNameId = await database.saveStringContent([{ language: language, content: givenName }])
    const surnameId = await database.saveStringContent([{ language: language, content: surname }])
    const countryId = await database.saveStringContent([{ language: language, content: country }])
    const hometownId = await database.saveStringContent([{ language: language, content: hometown }])

    database.addPatient({
      id: patientId,
      given_name: givenNameId,
      surname: surnameId,
      date_of_birth: dob,
      country: countryId,
      hometown: hometownId,
      phone: phone,
      sex: male ? 'M' : 'F',

      medical_record_num: patientId,
      attention_datetime: attentionDateTime,
      attending_resources: resourceThatAttends,
      origin: origin,
      age: age,
      email: email,
      educational_status: educationalStatus,
      religion: religion,
      marital_status: maritalStatus,
      occupation: occupation,
      mother_name: motherName,
      father_name: fatherName,
      delivery_place: deliveryPlace,
      delivery_datetime: deliveryDateTime,
      gestational_age: gestationalAge,
      delivery_via: deliveryVia,
      delivery_care: deliveryCare,
      presentation: presentation,
      birthing_events: birthingEvents
    }).then(() => {
      if (!!camp) {
        handleSaveCamp(camp)
      }
      props.navigation.navigate('PatientList', {
        reloadPatientsToggle: !props.navigation.state.params.reloadPatientsToggle,
        language: language
      })
    })
  };

  function RadioButton(props) {
    return (
      <TouchableOpacity onPress={() => setMale(!male)}>
        <View style={styles.outerRadioButton}>
          {props.selected ? <View style={styles.selectedRadioButton} /> : null}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.containerLeft}>
        {Header({ action: () => props.navigation.navigate('PatientList', { language }), language, setLanguage })}
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].medicalRecordNum}</Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].medicalRecordNum}
            onChangeText={(text) => setMedicalRecordNum(text)}
            value={patientId}
            editable = {false}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].firstName}</Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].firstName}
            onChangeText={(text) => setGivenName(text)}
            value={givenName}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].surname}</Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].surname}
            onChangeText={(text) => setSurname(text)}
            value={surname}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].attentionDateTime}</Text>
        </View>
        <View style={styles.inputRow}>
          <DatePicker
            style={styles.datePicker}
            date={attentionDateTime}
            mode="datetime"
            placeholder={LocalizedStrings[language].attentionDateTime}
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
            onDateChange={(date) => setAttentionDateTime(date)}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].resourceThatAttends}</Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].resourceThatAttends}
            onChangeText={(text) => setResourceThatAttends(text)}
            value={resourceThatAttends}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].origin}</Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].origin}
            onChangeText={(text) => setOrigin(text)}
            value={origin}
          />
          <Text style={[{ color: '#FFFFFF' }]}>{LocalizedStrings[language].gender}</Text>
          <View style={[{ flexDirection: 'row' }]}>
            {RadioButton({ selected: male })}<Text style={[{ color: '#FFFFFF', paddingHorizontal: 5 }]}>M</Text>
            {RadioButton({ selected: !male })}<Text style={[{ color: '#FFFFFF', paddingHorizontal: 5 }]}>F</Text>
          </View>
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
            onDateChange={(date) => handleSaveDob(date)}
          />
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].age}</Text>
        </View>
          <View>
            <TextInput
              style={styles.inputs}
              placeholder={LocalizedStrings[language].age}
              onChangeText={(text) => setAge(text)}
              value={age}
              editable = {false}
            />
          </View>
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].phone}</Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].phone}
            onChangeText={(text) => setPhone(text)}
            value={phone}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].email}</Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].email}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].educationalStatus}</Text>
        </View>
        {EducationalStatus(educationalStatus, setEducationalStatus, language)}


        <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', }}>
          <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].adult}</Text>
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].religion}</Text>
        </View>
        {Religion(religion, setReligion, language)}
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].maritalStatus}</Text>
        </View>
        {MaritalStatus(maritalStatus, setMaritalStatus, language)}
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].occupation}</Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].occupation}
            onChangeText={(text) => setOccupation(text)}
            value={occupation}
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', }}>
          <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].pediatric}</Text>
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].motherName}</Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].motherName}
            onChangeText={(text) => setMotherName(text)}
            value={motherName}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].fatherName}</Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].fatherName}
            onChangeText={(text) => setFatherName(text)}
            value={fatherName}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].birthHistory}</Text>
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].deliveryPlace}</Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].deliveryPlace}
            onChangeText={(text) => setDeliveryPlace(text)}
            value={deliveryPlace}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].gestationalAge}</Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].gestationalAge}
            onChangeText={(text) => setGestationalAge(text)}
            value={gestationalAge}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].deliveryDateTime}</Text>
        </View>
        <View style={styles.inputRow}>
          <DatePicker
            style={styles.datePicker}
            date={deliveryDateTime}
            mode="datetime"
            placeholder={LocalizedStrings[language].deliveryDateTime}
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
            onDateChange={(date) => setDeliveryDateTime(date)}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].deliveryCare}</Text>
        </View>
        {DeliveryCare(deliveryCare, setDeliveryCare, language)}
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].via}</Text>
        </View>
        {DeliveryVia(deliveryVia, setDeliveryVia, language)}
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].presentation}</Text>
        </View>
        {Presentation(presentation, setPresentation, language)}
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].birthingEvents}</Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].birthingEvents}
            onChangeText={(text) => setBirthingEvents(text)}
            value={birthingEvents}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Button
            title={LocalizedStrings[language].save}
            color={'#F77824'}
            onPress={() => addPatient()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default NewPatient;
