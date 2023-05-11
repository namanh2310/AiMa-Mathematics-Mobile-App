import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from '../TabScreens/HomeScreen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHouse,
  faCamera,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import ScanScreen from '../TabScreens/ScanScreen';
import Forum from '../TabScreens/Forum';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 80,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomePage}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.controllerBtn}>
              <FontAwesomeIcon
                icon={faHouse}
                color={focused ? 'rgba(34,115,254,255)' : '#737373'}
                size={24}
              />
              <Text
                style={
                  focused ? styles.controllerTextActive : styles.controllerText
                }>
                Home
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="ScanScreen"
        component={ScanScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.controllerBtn}>
              <FontAwesomeIcon
                icon={faCamera}
                color={focused ? 'rgba(34,115,254,255)' : '#737373'}
                size={24}
              />
              <Text
                style={
                  focused ? styles.controllerTextActive : styles.controllerText
                }>
                Scan
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Forum"
        component={Forum}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.controllerBtn}>
              <FontAwesomeIcon
                icon={faUserGroup}
                color={focused ? 'rgba(34,115,254,255)' : '#737373'}
                size={24}
              />
              <Text
                style={
                  focused ? styles.controllerTextActive : styles.controllerText
                }>
                Forum
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  controllerBtn: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default TabNavigator;
