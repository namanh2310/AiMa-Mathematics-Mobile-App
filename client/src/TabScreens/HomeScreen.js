import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {useState} from 'react';

const HomeScreen = ({navigation}) => {
  const data = [
    {
      field: 'Calculus',
      background: require('../../assets/image/calculusimg.png'),
      navLink: 'CalculusList',
    },
    {
      field: 'Geometric',
      background: require('../../assets/image/geometricimg.png'),
      navLink: 'GeometricList',
    },
    {
      field: 'TMC',
      background: require('../../assets/image/tmcimg.png'),
      navLink: 'TMCList',
    },
    {
      field: 'Etc',
      background: require('../../assets/image/unknown.png'),
      navLink: 'etc',
    },
  ];

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 150);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -150],
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={{
          transform: [{translateY: translateY}],
          // height: '15%',
          elevation: 4,
          zIndex: 100,
        }}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Hi, Nam Anh!</Text>
          <View style={styles.searchBarContainer}>
            <TextInput style={styles.searchBar} placeholder="Search" />
          </View>
        </View>
      </Animated.View>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        onScroll={e => scrollY.setValue(e.nativeEvent.contentOffset.y)}>
        <View style={styles.buffer}></View>
        <View style={styles.popularFieldsContainer}>
          <Text style={styles.popularText}>Popular Fields</Text>
          <View style={styles.popularFields}>
            {data.map((el, key) => (
              <TouchableOpacity
                key={key}
                style={{width: '47%'}}
                activeOpacity={0.8}
                onPress={() => navigation.navigate(el.navLink)}>
                <ImageBackground
                  source={el.background}
                  style={styles.popularField}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.popularPostsContainer}>
          <Text style={styles.popularText}>Popular Posts</Text>
          <View style={styles.popularPosts}>
            <Image
              style={styles.popularPost}
              source={{
                uri: 'https://cdn.dribbble.com/users/1507491/screenshots/4945826/media/116a8ebc414c519ad1cfc0fe63f79d3e.jpg?compress=1&resize=400x300',
              }}
            />
            <Image
              style={styles.popularPost}
              source={{
                uri: 'https://cdn.dribbble.com/users/1507491/screenshots/4945826/media/116a8ebc414c519ad1cfc0fe63f79d3e.jpg?compress=1&resize=400x300',
              }}
            />
            <Image
              style={styles.popularPost}
              source={{
                uri: 'https://cdn.dribbble.com/users/1507491/screenshots/4945826/media/116a8ebc414c519ad1cfc0fe63f79d3e.jpg?compress=1&resize=400x300',
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  header: {
    height: 150,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    elevation: 4,
    backgroundColor: 'white',
    paddingLeft: '5%',
    paddingRight: '5%',
    backgroundColor: '#00b2ca',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  welcomeText: {
    fontFamily: 'Candal-Regular',
    fontSize: 34,
    color: 'white',
    marginTop: 15,
  },
  searchBarContainer: {
    marginTop: 15,
  },
  searchBar: {
    backgroundColor: '#faf9ff',
    borderRadius: 16,
    paddingLeft: 16,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  buffer: {
    width: '100%',
    height: 150,
  },
  scrollContainer: {
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  popularFieldsContainer: {
    marginTop: '8%',
  },
  popularText: {
    fontFamily: 'Candal-Regular',
    fontSize: 24,
    color: 'black',
  },
  popularFields: {
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  popularField: {
    width: '100%',
    height: 154,
    borderRadius: 16,
    overflow: 'hidden',
    // margin: '2%',
    marginBottom: '5%',
    marginTop: '5%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
  },
  popularPostsContainer: {
    marginTop: '8%',
  },
  popularPosts: {},
  popularPost: {
    width: '100%',
    height: 240,
    borderWidth: 2,
    borderColor: '#c8c8c8',
    borderRadius: 16,
    marginBottom: '3%',
    marginTop: '3%',
  },
});
