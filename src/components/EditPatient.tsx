import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, TextInput, TouchableOpacity, Picker, TouchableWithoutFeedback, Button, ScrollView
} from 'react-native';
import { v4 as uuid } from 'uuid';
import { database } from "../storage/Database";
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


const EditPatient = (props) => {
  const patient = props.navigation.getParam('patient');

  const [language, setLanguage] = useState(props.navigation.getParam('language', 'sp'));
  const [givenNameText, setGivenNameText] = useState(!!props.navigation.state.params.patient.given_name ? props.navigation.state.params.patient.given_name.content[language] : '');
  const [surnameText, setSurnameText] = useState(!!props.navigation.state.params.patient.surname ? props.navigation.state.params.patient.surname.content[language] : '');
  const [dob, setDob] = useState(props.navigation.state.params.patient.date_of_birth == 'None' ? '' : props.navigation.state.params.patient.date_of_birth);
  const [male, setMale] = useState(props.navigation.state.params.patient.sex === 'M');
  const [countryText, setCountryText] = useState(!!props.navigation.state.params.patient.country ? props.navigation.state.params.patient.country.content[language] : '');
  const [hometownText, setHometownText] = useState(!!props.navigation.state.params.patient.hometown ? props.navigation.state.params.patient.hometown.content[language] : '');
  const [phone, setPhone] = useState(props.navigation.state.params.patient.phone || '');
  const [camp, setCamp] = useState('');
  const [medicalRecordNum, setMedicalRecordNum] = useState(props.navigation.state.params.patient.medical_record_num || '');
  const [attentionDateTime, setAttentionDateTime] = useState(props.navigation.state.params.patient.attention_datetime || '');
  const [resourceThatAttends, setResourceThatAttends] = useState(props.navigation.state.params.patient.attending_resources || '');
  const [origin, setOrigin] = useState(props.navigation.state.params.patient.origin || '');
  const [age, setAge] = useState(props.navigation.state.params.patient.age || '');
  const [localId, setLocalId] = useState(props.navigation.state.params.patient.localId || '');
  const [address, setAddress] = useState(props.navigation.state.params.patient.address || '');
  const [email, setEmail] = useState(props.navigation.state.params.patient.email || '');
  const [educationalStatus, setEducationalStatus] = useState(props.navigation.state.params.patient.educational_status || '');
  const [religion, setReligion] = useState(props.navigation.state.params.patient.religion || '');
  const [maritalStatus, setMaritalStatus] = useState(props.navigation.state.params.patient.marital_status || '');
  const [occupation, setOccupation] = useState(props.navigation.state.params.patient.occupation || '');
  const [motherName, setMotherName] = useState(props.navigation.state.params.patient.mother_name || '');
  const [fatherName, setFatherName] = useState(props.navigation.state.params.patient.father_name || '');
  const [deliveryPlace, setDeliveryPlace] = useState(props.navigation.state.params.patient.delivery_place || '');
  const [deliveryDateTime, setDeliveryDateTime] = useState(props.navigation.state.params.patient.delivery_datetime || '');
  const [gestationalAge, setGestationalAge] = useState(props.navigation.state.params.patient.gestational_age || '');
  const [deliveryCare, setDeliveryCare] = useState(props.navigation.state.params.patient.delivery_care || '');
  const [deliveryVia, setDeliveryVia] = useState(props.navigation.state.params.patient.delivery_via || '');
  const [presentation, setPresentation] = useState(props.navigation.state.params.patient.presentation || '');
  const [birthingEvents, setBirthingEvents] = useState(props.navigation.state.params.patient.birthing_events || '');

  const today = new Date();

  const handleSaveCamp = (campName: string) => {
    database.addEvent({
      id: uuid(),
      patient_id: patient.id,
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

  const editPatient = async () => {
    let givenNameId = !!patient.given_name ? patient.given_name.id : null
    let surnameId = !!patient.surname ? patient.surname.id : null
    let countryId = !!patient.country ? patient.country.id : null
    let hometownId = !!patient.hometown ? patient.hometown.id : null

    if (!!patient.given_name) {
      if (patient.given_name.content[language] !== undefined) {
        await database.editStringContent([{ language: language, content: givenNameText }], patient.given_name.id)
      } else {
        await database.saveStringContent([{ language: language, content: givenNameText }], patient.given_name.id)
      }
    } else {
      givenNameId = await database.saveStringContent([{ language: language, content: givenNameText }])
    }

    if (!!patient.surname) {
      if (patient.surname.content[language] !== undefined) {
        await database.editStringContent([{ language: language, content: surnameText }], patient.surname.id)
      } else {
        await database.saveStringContent([{ language: language, content: surnameText }], patient.surname.id)
      }
    } else {
      surnameId = await database.saveStringContent([{ language: language, content: surnameText }])
    }

    if (!!patient.country) {
      if (patient.country.content[language] !== undefined) {
        await database.editStringContent([{ language: language, content: countryText }], patient.country.id)
      } else {
        await database.saveStringContent([{ language: language, content: countryText }], patient.country.id)
      }
    } else {
      countryId = await database.saveStringContent([{ language: language, content: countryText }])
    }

    if (!!patient.hometown) {
      if (patient.hometown.content[language] !== undefined) {
        await database.editStringContent([{ language: language, content: hometownText }], patient.hometown.id)
      } else {
        await database.saveStringContent([{ language: language, content: hometownText }], patient.hometown.id)
      }
    } else {
      hometownId = await database.saveStringContent([{ language: language, content: hometownText }])
    }

    database.editPatient({
      id: patient.id,
      given_name: givenNameId,
      surname: surnameId,
      date_of_birth: dob,
      country: countryId,
      hometown: hometownId,
      phone: phone,
      sex: male ? 'M' : 'F',

      medical_record_num: medicalRecordNum,
      attention_datetime: attentionDateTime,
      attending_resources: resourceThatAttends,
      origin: origin,
      age: age,
      local_id: localId,
      address: address,
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
    }).then((updatedPatient) => props.navigation.navigate('PatientView', {
      patient: updatedPatient,
      language: language
    }))
  };

  useEffect(() => {
    setGivenNameText(!!patient.given_name ? patient.given_name.content[language] : '');
    setSurnameText(!!patient.surname ? patient.surname.content[language] : '');
    setCountryText(!!patient.country ? patient.country.content[language] : '');
    setHometownText(!!patient.hometown ? patient.hometown.content[language] : '');
  }, [language])

  useEffect(() => {
    database.getLatestPatientEventByType(patient.id, EventTypes.Camp).then((response: string) => {
      if (response.length > 0) {
        setCamp(response)
      }
    })
  }, [])

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
        {Header({ action: () => props.navigation.navigate('PatientView', { language }), language, setLanguage })}
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].medicalRecordNum}</Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].medicalRecordNum}
            onChangeText={(text) => setMedicalRecordNum(text)}
            value={medicalRecordNum}
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
            onChangeText={(text) => setGivenNameText(text)}
            value={givenNameText}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].surname}</Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].surname}
            onChangeText={(text) => setSurnameText(text)}
            value={surnameText}
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
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].localId}</Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].localId}
            onChangeText={(text) => setLocalId(text)}
            value={localId}
          />
        </View>
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].address}</Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].address}
            onChangeText={(text) => setAddress(text)}
            value={address}
          />
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
            onPress={() => editPatient()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditPatient;
