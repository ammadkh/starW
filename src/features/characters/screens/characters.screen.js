import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import {SafeViewComponent} from '../../../components/UI/SafeViewComponent';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SearchBarComponent} from '../components/search-bar.component';
import {Character} from '../components/character.component';

Icon.loadFont();
export const Characters = () => {
  const [characters, setCharacters] = useState([]);
  // Need to use react query, just fetching data right now
  useEffect(() => {
    fetch('https://swapi.dev/api/people/?page=3', {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setCharacters(data.results));
  }, []);
  return (
    <SafeViewComponent>
      <View style={styles.container}>
        <SearchBarComponent />
        <ScrollView style={{paddingHorizontal: 24}}>
          {characters.map(character => (
            <Character character={character} />
          ))}
        </ScrollView>
      </View>
    </SafeViewComponent>
  );
};

const styles = StyleSheet.create({
  container: {},
});
