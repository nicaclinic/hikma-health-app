import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, Button, TouchableOpacity
} from 'react-native';

import { database } from "../storage/Database";
import styles from './Style';
import { LocalizedStrings } from '../enums/LocalizedStrings';
import radioButtons from './shared/RadioButtons';
import Header from './shared/Header';

const EditPsychomotorDevelopment = (props) => {
  const event = props.navigation.getParam('event');
  const userName = props.navigation.getParam('userName');
  const [suckVigorously, setSuckVigorously] = useState(null);
  const [handsClosed, setHandsClosed] = useState(null);
  const [flexArms, setFlexArms] = useState(null);
  const [moorishReflex, setMoorishReflex] = useState(null);
  const [vocalize, setVocalize] = useState(null);
  const [alternateLegMovement, setAlternateLegMovement] = useState(null);
  const [openHands, setOpenHands] = useState(null);
  const [socialSmile, setSocialSmile] = useState(null);
  const [lookAtMothers, setLookAtMothers] = useState(null);
  const [followObjects, setFollowObjects] = useState(null);
  const [reactToSound, setReactToSound] = useState(null);
  const [raiseHead, setRaiseHead] = useState(null);
  const [answerToExam, setAnswerToExam] = useState(null);
  const [grabObjects, setGrabObjects] = useState(null);
  const [makeSounds, setMakeSounds] = useState(null);
  const [holdsHead, setHoldsHead] = useState(null);
  const [takeToy, setTakeToy] = useState(null);
  const [bringsObjectsToMouth, setBringsObjectsToMouth] = useState(null);
  const [locateSound, setLocateSound] = useState(null);
  const [turnTowardsObject, setTurnTowardsObject] = useState(null);
  const [playDiscover, setPlayDiscover] = useState(null);
  const [objectsPassed, setObjectsPassed] = useState(null);
  const [sitsAlone, setSitsAlone] = useState(null);
  const [doubleSyllables, setDoubleSyllables] = useState(null);
  const [imitateGestures, setImitateGestures] = useState(null);
  const [topPliers, setTopPliers] = useState(null);
  const [confusingWords, setConfusingWords] = useState(null);
  const [walkWithSupport, setWalkWithSupport] = useState(null);
  const [gesturesOnDemand, setGesturesOnDemand] = useState(null);
  const [placeCubes, setPlaceCubes] = useState(null);
  const [sayWord, setSayWord] = useState(null);
  const [walkWithoutSupport, setWalkWithoutSupport] = useState(null);
  const [identifyTwoObjects, setIdentifyTwoObjects] = useState(null);
  const [scribbles, setScribbles] = useState(null);
  const [saysThreeWords, setSaysThreeWords] = useState(null);
  const [walkBackwards, setWalkBackwards] = useState(null);
  const [takesOffClothes, setTakesOffClothes] = useState(null);
  const [kickBall, setKickBall] = useState(null);
  const [towerFiveCubes, setTowerFiveCubes] = useState(null);
  const [saysShortSentences, setSaysShortSentences] = useState(null);
  const [feedsItself, setFeedsItself] = useState(null);
  const [saysLongSentences, setSaysLongSentences] = useState(null);
  const [dressesAlone, setDressesAlone] = useState(null);
  const [complexOrders, setComplexOrders] = useState(null);

  const [language, setLanguage] = useState(props.navigation.getParam('language', 'en'));

  useEffect(() => {
    if (!!event.event_metadata) {
      const metadataObj = JSON.parse(event.event_metadata)
      setSuckVigorously(metadataObj.suckVigorously)
      setHandsClosed(metadataObj.handsClosed)
      setFlexArms(metadataObj.flexArms)
      setMoorishReflex(metadataObj.moorishReflex)
      setVocalize(metadataObj.vocalize)
      setAlternateLegMovement(metadataObj.alternateLegMovement)
      setOpenHands(metadataObj.openHands)
      setSocialSmile(metadataObj.socialSmile)
      setLookAtMothers(metadataObj.lookAtMothers)
      setFollowObjects(metadataObj.followObjects)
      setReactToSound(metadataObj.reactToSound)
      setRaiseHead(metadataObj.raiseHead)
      setAnswerToExam(metadataObj.answerToExam)
      setGrabObjects(metadataObj.grabObjects)
      setMakeSounds(metadataObj.makeSounds)
      setHoldsHead(metadataObj.holdsHead)
      setTakeToy(metadataObj.takeToy)
      setBringsObjectsToMouth(metadataObj.bringsObjectsToMouth)
      setLocateSound(metadataObj.locateSound)
      setTurnTowardsObject(metadataObj.turnTowardsObject)
      setTakeToy(metadataObj.takeToy)
      setBringsObjectsToMouth(metadataObj.bringsObjectsToMouth)
      setLocateSound(metadataObj.locateSound)
      setTurnTowardsObject(metadataObj.turnTowardsObject)
      setPlayDiscover(metadataObj.playDiscover)
      setObjectsPassed(metadataObj.objectsPassed)
      setSitsAlone(metadataObj.sitsAlone)
      setDoubleSyllables(metadataObj.doubleSyllables)
      setImitateGestures(metadataObj.imitateGestures)
      setTopPliers(metadataObj.topPliers)
      setConfusingWords(metadataObj.confusingWords)
      setWalkWithSupport(metadataObj.walkWithSupport)
      setGesturesOnDemand(metadataObj.gesturesOnDemand)
      setPlaceCubes(metadataObj.placeCubes)
      setSayWord(metadataObj.sayWord)
      setWalkBackwards(metadataObj.walkWithoutSupport)
      setIdentifyTwoObjects(metadataObj.identifyTwoObjects)
      setScribbles(metadataObj.scribbles)
      setSaysThreeWords(metadataObj.saysThreeWords)
      setWalkBackwards(metadataObj.walkBackwards)
      setTakesOffClothes(metadataObj.takesOffClothes)
      setSaysShortSentences(metadataObj.saysShortSentences)
      setKickBall(metadataObj.kickBall)
      setFeedsItself(metadataObj.feedsItself)
      setSaysLongSentences(metadataObj.saysLongSentences)
      setDressesAlone(metadataObj.dressesAlone)
      setComplexOrders(metadataObj.complexOrders)
    }
  }, [props])

  const submitPsychomotorDevelopment = async () => {
    database.editEvent(
      event.id,
      JSON.stringify({
        doctor: userName,
        suckVigorously,
        handsClosed,
        flexArms,
        moorishReflex,
        vocalize,
        alternateLegMovement,
        openHands,
        socialSmile,
        lookAtMothers,
        followObjects,
        reactToSound,
        raiseHead,
        grabObjects,
        makeSounds,
        holdsHead,
        takeToy,
        bringsObjectsToMouth,
        locateSound,
        turnTowardsObject,
        playDiscover,
        objectsPassed,
        sitsAlone,
        doubleSyllables,
        imitateGestures,
        topPliers,
        confusingWords,
        walkWithSupport,
        gesturesOnDemand,
        placeCubes,
        sayWord,
        walkWithoutSupport,
        identifyTwoObjects,
        scribbles,
        saysThreeWords,
        walkBackwards,
        takesOffClothes,
        towerFiveCubes,
        saysShortSentences,
        kickBall,
        feedsItself,
        saysLongSentences,
        dressesAlone,
        complexOrders
      })
    ).then((response) => props.navigation.navigate('EventList', { events: response, language }))
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.containerLeft}>
        {Header({ action: () => props.navigation.navigate('EventList', { language }), language, setLanguage })}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', }}>
          <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].psychomotorDevelopment}</Text>
        </View>

        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].lessThan1Month}</Text>
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: suckVigorously, action: setSuckVigorously, prompt: LocalizedStrings[language].suckVigorously, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: handsClosed, action: setHandsClosed, prompt: LocalizedStrings[language].handsClosed, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: flexArms, action: setFlexArms, prompt: LocalizedStrings[language].flexArms, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: moorishReflex, action: setMoorishReflex, prompt: LocalizedStrings[language].moorishReflex, language })}
        </View>

        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].month1}</Text>
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: vocalize, action: setVocalize, prompt: LocalizedStrings[language].vocalize, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: alternateLegMovement, action: setAlternateLegMovement, prompt: LocalizedStrings[language].alternateLegMovement, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: openHands, action: setOpenHands, prompt: LocalizedStrings[language].openHands, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: socialSmile, action: setSocialSmile, prompt: LocalizedStrings[language].socialSmile, language })}
        </View>

        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].months2_3}</Text>
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: lookAtMothers, action: setLookAtMothers, prompt: LocalizedStrings[language].lookAtMothers, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: followObjects, action: setFollowObjects, prompt: LocalizedStrings[language].followObjects, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: reactToSound, action: setReactToSound, prompt: LocalizedStrings[language].reactToSound, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: raiseHead, action: setRaiseHead, prompt: LocalizedStrings[language].raiseHead, language })}
        </View>

        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].months4_5}</Text>
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: answerToExam, action: setAnswerToExam, prompt: LocalizedStrings[language].answerToExam, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: grabObjects, action: setGrabObjects, prompt: LocalizedStrings[language].grabObjects, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: makeSounds, action: setMakeSounds, prompt: LocalizedStrings[language].makeSounds, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: holdsHead, action: setHoldsHead, prompt: LocalizedStrings[language].holdsHead, language })}
        </View>

        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].months6_8}</Text>
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: takeToy, action: setTakeToy, prompt: LocalizedStrings[language].takeToy, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: bringsObjectsToMouth, action: setBringsObjectsToMouth, prompt: LocalizedStrings[language].bringsObjectsToMouth, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: locateSound, action: setLocateSound, prompt: LocalizedStrings[language].locateSound, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: turnTowardsObject, action: setTurnTowardsObject, prompt: LocalizedStrings[language].turnTowardsObject, language })}
        </View>

        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].months9_11}</Text>
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: playDiscover, action: setPlayDiscover, prompt: LocalizedStrings[language].playDiscover, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: objectsPassed, action: setObjectsPassed, prompt: LocalizedStrings[language].objectsPassed, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: sitsAlone, action: setSitsAlone, prompt: LocalizedStrings[language].sitsAlone, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: doubleSyllables, action: setDoubleSyllables, prompt: LocalizedStrings[language].doubleSyllables, language })}
        </View>

        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].months12_14}</Text>
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: imitateGestures, action: setImitateGestures, prompt: LocalizedStrings[language].imitateGestures, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: topPliers, action: setTopPliers, prompt: LocalizedStrings[language].topPliers, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: confusingWords, action: setConfusingWords, prompt: LocalizedStrings[language].confusingWords, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: walkWithSupport, action: setWalkWithSupport, prompt: LocalizedStrings[language].walkWithSupport, language })}
        </View>

        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].months15_17}</Text>
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: gesturesOnDemand, action: setGesturesOnDemand, prompt: LocalizedStrings[language].gesturesOnDemand, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: placeCubes, action: setPlaceCubes, prompt: LocalizedStrings[language].placeCubes, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: sayWord, action: setSayWord, prompt: LocalizedStrings[language].sayWord, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: walkWithoutSupport, action: setWalkWithoutSupport, prompt: LocalizedStrings[language].walkWithoutSupport, language })}
        </View>

        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].months18_23}</Text>
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: identifyTwoObjects, action: setIdentifyTwoObjects, prompt: LocalizedStrings[language].identifyTwoObjects, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: scribbles, action: setScribbles, prompt: LocalizedStrings[language].scribbles, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: saysThreeWords, action: setSaysThreeWords, prompt: LocalizedStrings[language].saysThreeWords, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: walkBackwards, action: setWalkBackwards, prompt: LocalizedStrings[language].walkBackwards, language })}
        </View>

        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].months24_35}</Text>
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: takesOffClothes, action: setTakesOffClothes, prompt: LocalizedStrings[language].takesOffClothes, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: towerFiveCubes, action: setTowerFiveCubes, prompt: LocalizedStrings[language].towerFiveCubes, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: saysShortSentences, action: setSaysShortSentences, prompt: LocalizedStrings[language].saysShortSentences, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: kickBall, action: setKickBall, prompt: LocalizedStrings[language].kickBall, language })}
        </View>

        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].months36_59}</Text>
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: feedsItself, action: setFeedsItself, prompt: LocalizedStrings[language].feedsItself, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: saysLongSentences, action: setSaysLongSentences, prompt: LocalizedStrings[language].saysLongSentences, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: dressesAlone, action: setDressesAlone, prompt: LocalizedStrings[language].dressesAlone, language })}
        </View>
        <View style={styles.responseRow}>
          {radioButtons({ field: complexOrders, action: setComplexOrders, prompt: LocalizedStrings[language].complexOrders, language })}
        </View>

        <View style={{ alignItems: 'center' }}>
          <Button
            title={LocalizedStrings[language].save}
            color={'#F77824'}
            onPress={() => submitPsychomotorDevelopment()} />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditPsychomotorDevelopment;
