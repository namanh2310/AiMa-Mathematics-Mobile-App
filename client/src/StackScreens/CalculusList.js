import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCalculator,
  faTableCells,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';

const CalculusList = ({navigation}) => {
  const data = [
    {
      cateName: 'Basic calculus',
      navLink: 'Fundamental',
      icon: faCalculator,
    },
    {
      cateName: 'Linear algebra',
      navLink: 'Linear algebra',
      icon: faTableCells,
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.listText}>CALCULUS</Text>
        <View style={styles.categoriesContainer}>
          {data.map((el, key) => (
            <TouchableOpacity
              key={key}
              activeOpacity={0.8}
              style={styles.category}
              onPress={() => navigation.navigate(el.navLink)}>
              <View style={styles.left}>
                <FontAwesomeIcon
                  style={styles.categoryIcon}
                  icon={el.icon}
                  size={40}
                  color={'#1c2e4d'}
                />
                <Text style={styles.categoryName}>{el.cateName}</Text>
              </View>
              <FontAwesomeIcon
                style={styles.right}
                icon={faPlay}
                size={40}
                color={'white'}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalculusList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
    backgroundColor: '#ffff',
  },
  listText: {
    fontSize: 32,
    color: '#365894',
    fontWeight: 700,
  },
  cateText: {
    marginTop: '5%',
    fontSize: 26,
    color: 'black',
    fontWeight: 500,
  },
  categoriesContainer: {
    marginTop: '5%',
  },
  category: {
    width: '100%',
    height: 100,
    backgroundColor: '#5a94f7',
    borderRadius: 32,
    marginTop: '5%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  categoryName: {
    color: '#1c2e4d',
    fontSize: 24,
    marginLeft: '8%',
    fontWeight: 800,
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
