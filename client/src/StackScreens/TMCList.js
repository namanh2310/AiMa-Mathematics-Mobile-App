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

const TMCList = ({navigation}) => {
  const data = [
    {
      cateName: '1. Optimization',
      icon: faCalculator,
      fields: [
        {
          fieldName: 'Golden Section',
          navLink: 'Golden Section',
        },
        {
          fieldName: 'Newton Method',
          navLink: 'Newton Method',
        },
      ],
    },
    {
      cateName: '2. ODE',
      icon: faCalculator,
      fields: [
        {
          fieldName: 'Euler Method',
          navLink: 'Euler Method',
        },
        {
          fieldName: 'Heun Method',
          navLink: 'Heun Method',
        },
        {
          fieldName: 'Midpoint Method',
          navLink: 'MidPoint Method',
        },
        {
          fieldName: 'Ralston Method',
          navLink: 'Ralston Method',
        },
        {
          fieldName: 'Third-order Method',
          navLink: 'Third-order Method',
        },
        {
          fieldName: 'Classic Fourth-order RK',
          navLink: 'Classic Fourth-order Method',
        },
        {
          fieldName: 'Simpson 1/3 Rule',
          navLink: 'Simpson 1/3 Rule',
        },
        {
          fieldName: 'Simpson 1/3 MA Rule',
          navLink: 'Simpson 1/3 MA Rule',
        },
        {
          fieldName: 'Simpson 3/8 Rule',
          navLink: 'Simpson 3/8 Rule',
        },
      ],
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.listText}>Theoretical Models of Computing</Text>
        <View style={styles.categoriesContainer}>
          {data.map((el, key) => (
            <View style={{marginTop: '5%'}} key={key}>
              <Text style={styles.categoryName}>{el.cateName}</Text>
              {el.fields.map((field, key) => (
                <TouchableOpacity
                  key={key}
                  activeOpacity={0.8}
                  style={styles.category}
                  onPress={() => navigation.navigate(field.navLink)}>
                  <View style={styles.left}>
                    {/* <FontAwesomeIcon
                style={styles.categoryIcon}
                icon={el.icon}
                size={40}
                color={'#1c2e4d'}
              /> */}
                    <Text style={styles.categoryField}>{field.fieldName}</Text>
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
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TMCList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
    backgroundColor: '#ffff',
  },
  listText: {
    fontSize: 28,
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
    fontWeight: 800,
  },
  categoryField: {
    color: 'white',
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
