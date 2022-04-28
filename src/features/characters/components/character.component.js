import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Avatar, Card, IconButton} from 'react-native-paper';

export const Character = ({character}) => {
  return (
    <TouchableOpacity>
      <Card elevation={5} style={styles.card}>
        <Card.Title
          title={character.name}
          subtitle={character.gender.toUpperCase()}
          leftStyle={styles.avatarStyle}
          left={props => (
            <Avatar.Image
              {...props}
              size={60}
              source={require('../../../../assets/imgs/starwars.png')}
            />
          )}
        />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
    padding: 8,
    marginHorizontal: 24,
  },
  avatarStyle: {
    marginRight: 40,
  },
});
