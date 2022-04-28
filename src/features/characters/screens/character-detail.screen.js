import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {IconButton, Avatar, List, Card} from 'react-native-paper';

import {SafeViewComponent} from '../../../components/UI/SafeViewComponent';
import {useHomePlanet} from '../components/home-planet.component';
import {getId} from './characters.screen';

export const CharacterDetail = ({navigation, route}) => {
  const [characterDetail, setCharacterDetail] = useState('');
  const {id} = route.params;
  useEffect(() => {
    fetch(`https://swapi.dev/api/people/${id}`, {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => setCharacterDetail(response));
  }, [id]);
  return (
    <SafeViewComponent>
      <IconButton
        icon="arrow-left"
        size={30}
        onPress={() => navigation.goBack()}
      />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={{padding: 10, paddingBottom: 30}}>
          <Avatar.Image
            size={200}
            source={require('../../../../assets/imgs/starwars.png')}
          />
        </View>
        <Text style={{fontWeight: '600', fontSize: 23}}>
          {characterDetail.name}
        </Text>
      </View>
      <Card style={{margin: 16, flex: 1}} elevation={5}>
        <ScrollView>
          <List.Item
            description="Gender"
            title={characterDetail.gender?.toUpperCase()}
            left={props => <List.Icon {...props} icon="human-male-female" />}
          />
          <List.Item
            description="Birth Year"
            title={characterDetail.birth_year}
            left={props => <List.Icon {...props} icon="calendar" />}
          />
          <List.Item
            description="Eye Color"
            title={characterDetail.eye_color?.toUpperCase()}
            left={props => <List.Icon {...props} icon="eye" />}
          />
          <List.Item
            description="Height"
            title={characterDetail?.height + 'cm'}
            left={props => <List.Icon {...props} icon="human-male-height" />}
          />
          <List.Item
            description="Mass"
            title={characterDetail.mass}
            left={props => <List.Icon {...props} icon="weight" />}
          />
          <List.Item
            description="Home Planet"
            title={useHomePlanet({
              planetId: characterDetail.homeworld
                ? getId(characterDetail.homeworld)
                : null,
            })}
            left={props => <List.Icon {...props} icon="home-group" />}
          />
        </ScrollView>
      </Card>
    </SafeViewComponent>
  );
};
