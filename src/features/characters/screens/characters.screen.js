import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import {SafeViewComponent} from '../../../components/UI/SafeViewComponent';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SearchBarComponent} from '../components/search-bar.component';
import {Character} from '../components/character.component';
import {DataTable} from 'react-native-paper';

Icon.loadFont();
const numberOfItemsPerPageList = [2, 3, 4];

const items = [
  {
    key: 1,
    name: 'Page 1',
  },
  {
    key: 2,
    name: 'Page 2',
  },
  {
    key: 3,
    name: 'Page 3',
  },
];
export const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = React.useState(0);
  const [totalCount, setTotalCount] = useState(1);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(10);
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, totalCount);

  // Need to use react query, just fetching data right now
  useEffect(() => {
    fetch(`https://swapi.dev/api/people/?page=${page + 1}`, {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setCharacters(data.results);
        setTotalCount(data.count);
      });
  }, [page]);
  return (
    <SafeViewComponent>
      <View style={styles.container}>
        <SearchBarComponent />
        <ScrollView>
          {characters?.map(character => (
            <Character character={character} />
          ))}
        </ScrollView>
        <DataTable style={styles.dataTable}>
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(totalCount / numberOfItemsPerPage)}
            onPageChange={page => setPage(page)}
            label={`${from + 1}-${to} of ${totalCount}`}
            showFastPaginationControls
          />
        </DataTable>
      </View>
    </SafeViewComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dataTable: {
    position: 'absolute',
    bottom: -20,
    backgroundColor: 'white',
  },
});
