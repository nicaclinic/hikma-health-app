import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, Button, TouchableOpacity
} from 'react-native';

import { database } from "../storage/Database";
import styles from './Style';
import { LocalizedStrings } from '../enums/LocalizedStrings';
import radioButtons from './shared/RadioButtons';
import Header from './shared/Header';

export const House = (value, action, language) => {
  return (
    <Picker
      selectedValue={value}
      onValueChange={value => action(value)}
      style={[styles.picker, { width: 180 }]}
    >
      <Picker.Item value='' label={LocalizedStrings[language].house} />
      <Picker.Item value={LocalizedStrings[language].own} label={LocalizedStrings[language].own} />
      <Picker.Item value={LocalizedStrings[language].rented} label={LocalizedStrings[language].rented} />
    </Picker>
  )
}

export const Walls = (value, action, language) => {
  return (
    <Picker
      selectedValue={value}
      onValueChange={value => action(value)}
      style={[styles.picker, { width: 180 }]}
    >
      <Picker.Item value='' label={LocalizedStrings[language].walls} />
      <Picker.Item value={LocalizedStrings[language].plastic} label={LocalizedStrings[language].plastic} />
      <Picker.Item value={LocalizedStrings[language].boards} label={LocalizedStrings[language].boards} />
      <Picker.Item value={LocalizedStrings[language].block} label={LocalizedStrings[language].block} />
      <Picker.Item value={LocalizedStrings[language].miniSkirt} label={LocalizedStrings[language].miniSkirt} />
      <Picker.Item value={LocalizedStrings[language].zinc} label={LocalizedStrings[language].zinc} />
      <Picker.Item value={LocalizedStrings[language].other} label={LocalizedStrings[language].other} />
    </Picker>
  )
}

export const Flat = (value, action, language) => {
  return (
    <Picker
      selectedValue={value}
      onValueChange={value => action(value)}
      style={[styles.picker, { width: 180 }]}
    >
      <Picker.Item value='' label={LocalizedStrings[language].flat} />
      <Picker.Item value={LocalizedStrings[language].land} label={LocalizedStrings[language].land} />
      <Picker.Item value={LocalizedStrings[language].tiling} label={LocalizedStrings[language].tiling} />
      <Picker.Item value={LocalizedStrings[language].ceramics} label={LocalizedStrings[language].ceramics} />
    </Picker>
  )
}

export const Ceiling = (value, action, language) => {
  return (
    <Picker
      selectedValue={value}
      onValueChange={value => action(value)}
      style={[styles.picker, { width: 180 }]}
    >
      <Picker.Item value='' label={LocalizedStrings[language].ceiling} />
      <Picker.Item value={LocalizedStrings[language].plastic} label={LocalizedStrings[language].plastic} />
      <Picker.Item value={LocalizedStrings[language].boards} label={LocalizedStrings[language].boards} />
      <Picker.Item value={LocalizedStrings[language].roofTile} label={LocalizedStrings[language].roofTile} />
      <Picker.Item value={LocalizedStrings[language].zinc} label={LocalizedStrings[language].zinc} />
      <Picker.Item value={LocalizedStrings[language].other} label={LocalizedStrings[language].other} />
    </Picker>
  )
}

export const Animals = (value, action, language) => {
  return (
    <Picker
      selectedValue={value}
      onValueChange={value => action(value)}
      style={[styles.picker, { width: 180 }]}
    >
      <Picker.Item value='' label={LocalizedStrings[language].animals} />
      <Picker.Item value={LocalizedStrings[language].pet} label={LocalizedStrings[language].pet} />
      <Picker.Item value={LocalizedStrings[language].farm} label={LocalizedStrings[language].farm} />
    </Picker>
  )
}

export const WaterSource = (value, action, language) => {
  return (
    <Picker
      selectedValue={value}
      onValueChange={value => action(value)}
      style={[styles.picker, { width: 180 }]}
    >
      <Picker.Item value='' label={LocalizedStrings[language].waterSource} />
      <Picker.Item value={LocalizedStrings[language].well} label={LocalizedStrings[language].well} />
      <Picker.Item value={LocalizedStrings[language].potable} label={LocalizedStrings[language].potable} />
      <Picker.Item value={LocalizedStrings[language].other} label={LocalizedStrings[language].other} />
    </Picker>
  )
}

export const Kitchen = (value, action, language) => {
  return (
    <Picker
      selectedValue={value}
      onValueChange={value => action(value)}
      style={[styles.picker, { width: 180 }]}
    >
      <Picker.Item value='' label={LocalizedStrings[language].kitchen} />
      <Picker.Item value={LocalizedStrings[language].gas} label={LocalizedStrings[language].gas} />
      <Picker.Item value={LocalizedStrings[language].firewood} label={LocalizedStrings[language].firewood} />
    </Picker>
  )
}

const EditSocioeconomicSituation = (props) => {
  const event = props.navigation.getParam('event');
  const userName = props.navigation.getParam('userName');
  const [house, setHouse] = useState(null);
  const [walls, setWalls] = useState(null);
  const [flat, setFlat] = useState(null);
  const [ceiling, setCeiling] = useState(null);
  const [bedrooms, setBedrooms] = useState(null);
  const [animals, setAnimals] = useState(null);
  const [animalsAndQuantity, setAnimalsAndQuantity] = useState(null);
  const [waterSource, setWaterSource] = useState(null);
  const [electricPower, setElectricPower] = useState(null);
  const [toilet, setToilet] = useState(null);
  const [latrine, setLatrine] = useState(null);
  const [kitchen, setKitchen] = useState(null);
  const [children_0_5, setChildren_0_5] = useState(null);
  const [children_6_10, setChildren_6_10] = useState(null);
  const [children_11_15, setChildren_11_15] = useState(null);
  const [adults, setAdults] = useState(null);
  const [seniors, setSeniors] = useState(null);
  const [women, setWomen] = useState(null);
  const [men, setMen] = useState(null);
  const [peopleWorkingNumber, setPeopleWorkingNumber] = useState(null);

  const [language, setLanguage] = useState(props.navigation.getParam('language', 'en'));

  useEffect(() => {
    if (!!event.event_metadata) {
      const metadataObj = JSON.parse(event.event_metadata)
      setHouse(metadataObj.house)
      setWalls(metadataObj.walls)
      setFlat(metadataObj.flat)
      setCeiling(metadataObj.ceiling)
      setBedrooms(metadataObj.bedrooms)
      setAnimals(metadataObj.animals)
      setAnimalsAndQuantity(metadataObj.animalsAndQuantity)
      setWaterSource(metadataObj.waterSource)
      setElectricPower(metadataObj.electricPower)
      setToilet(metadataObj.toilet)
      setLatrine(metadataObj.latrine)
      setKitchen(metadataObj.kitchen)
      setChildren_0_5(metadataObj.children_0_5)
      setChildren_6_10(metadataObj.children_6_10)
      setChildren_11_15(metadataObj.children_11_15)
      setAdults(metadataObj.adults)
      setSeniors(metadataObj.seniors)
      setWomen(metadataObj.women)
      setMen(metadataObj.men)
      setPeopleWorkingNumber(metadataObj.peopleWorkingNumber)
    }
  }, [props])

  const submitSocioeconomicSituation = async () => {
    database.editEvent(
      event.id,
      JSON.stringify({
        doctor: userName,
        house,
        walls,
        flat,
        ceiling,
        bedrooms,
        animals,
        animalsAndQuantity,
        waterSource,
        electricPower,
        toilet,
        latrine,
        kitchen,
        children_0_5,
        children_6_10,
        children_11_15,
        adults,
        seniors,
        women,
        men,
        peopleWorkingNumber
      })
    ).then((response) => props.navigation.navigate('EventList', { events: response, language }))
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.containerLeft}>
        {Header({ action: () => props.navigation.navigate('EventList', { language }), language, setLanguage })}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', }}>
          <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].socioeconomicSituation}</Text>
        </View>
        {House(house, setHouse, language)}
        {Walls(walls, setWalls, language)}
        {Flat(flat, setFlat, language)}
        {Ceiling(ceiling, setCeiling, language)}
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setBedrooms(text)}
            value={house}
            placeholder={LocalizedStrings[language].bedrooms}
          />
        </View>
        {Animals(animals, setAnimals, language)}
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setAnimalsAndQuantity(text)}
            value={animalsAndQuantity}
            placeholder={LocalizedStrings[language].animalsAndQuantity}
          />
        </View>
        {WaterSource(waterSource, setWaterSource, language)}
        <View style={styles.responseRow}>
          {radioButtons({ field: electricPower, action: setElectricPower, prompt: LocalizedStrings[language].electricPower, language })}
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setToilet(text)}
            value={toilet}
            placeholder={LocalizedStrings[language].toilet}
          />
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputs}
            onChangeText={(text) => setLatrine(text)}
            value={latrine}
            placeholder={LocalizedStrings[language].latrine}
          />
        </View>
        {Kitchen(kitchen, setKitchen, language)}
        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].population}</Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].children_0_5}
            onChangeText={(text) => setChildren_0_5(text)}
            value={children_0_5}
          />
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].children_6_10}
            onChangeText={(text) => setChildren_6_10(text)}
            value={children_6_10}
          />
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].children_11_15}
            onChangeText={(text) => setChildren_11_15(text)}
            value={children_11_15}
          />
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].adults}
            onChangeText={(text) => setAdults(text)}
            value={adults}
          />
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].seniors}
            onChangeText={(text) => setSeniors(text)}
            value={seniors}
          />
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].women}
            onChangeText={(text) => setWomen(text)}
            value={women}
          />
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].men}
            onChangeText={(text) => setMen(text)}
            value={men}
          />
          <TextInput
            style={styles.inputs}
            placeholder={LocalizedStrings[language].peopleWorkingNumber}
            onChangeText={(text) => setPeopleWorkingNumber(text)}
            value={peopleWorkingNumber}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Button
            title={LocalizedStrings[language].save}
            color={'#F77824'}
            onPress={() => submitSocioeconomicSituation()} />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditSocioeconomicSituation;
