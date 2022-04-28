import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {SafeViewComponent} from '../../../components/UI/SafeViewComponent';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
      <Icon.Button name="facebook" backgroundColor="#3b5998">
        <Text style={{fontFamily: 'Arial', fontSize: 15}}>
          Login with Facebook
        </Text>
      </Icon.Button>
      {characters.map(character => (
        <Text key={character.name}>{character.name}</Text>
      ))}
    </SafeViewComponent>
  );
};
