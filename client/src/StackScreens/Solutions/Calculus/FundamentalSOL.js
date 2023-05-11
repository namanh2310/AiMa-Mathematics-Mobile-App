import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import MathView, {MathText} from 'react-native-math-view';
import {ScrollView} from 'react-native-gesture-handler';

const Fundamental = () => {
  const [show, setShow] = useState(false);
  const route = useRoute();
  const result = route.params.data;
  const equation = route.params.equation;
  const step = route.params.step;
  return (
    <View style={styles.container}>
      <View style={styles.infor}>
        <MathView
          // style={equation.length > 20 ? styles.size_medium : styles.size_larger}
          style={styles.equation}
          resizeMode="cover"
          math={equation}
        />
        <Text style={styles.text}>Solution:</Text>
        <MathView
          // style={
          //   result && result.length > 20 ? styles.size_medium : styles.size_larger
          // }
          style={styles.result}
          resizeMode="cover"
          math={result}
        />
        <TouchableOpacity
          style={styles.showStepBtn}
          onPress={() => setShow(!show)}>
          <Text style={styles.textBtn}>Show step</Text>
        </TouchableOpacity>
      </View>

      {show && (
        <View style={styles.step}>
          <ScrollView>
            <Text style={styles.stepText}>The problem is</Text>
            <MathView
              style={
                equation.length > 20 ? styles.size_medium : styles.size_larger
              }
              resizeMode="cover"
              math={`${equation}`}
            />
            {step.map(el => (
              <>
                <Text style={styles.stepText}>
                  Calculate the antiderivative of
                </Text>
                {el[0].length > 20 ? (
                  <>
                    <MathView
                      resizeMode="cover"
                      math={`${el[0]}`}
                      style={{width: '100%'}}
                    />
                    <MathView resizeMode="cover" math={`= ${el[1]}`} />
                  </>
                ) : (
                  <>
                    <MathView
                      resizeMode="cover"
                      math={`${el[0]}= ${el[1]}`}
                      style={{width: '100%'}}
                    />
                  </>
                )}
                <Text style={styles.stepText}>Subtitute the integral to x</Text>
                <MathView resizeMode="cover" math={el[2]} />
              </>
            ))}
            <Text style={styles.stepText}>
              Subitute the calculated value to the equation, the result is:
            </Text>
            <MathView resizeMode="cover" math={result} />
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Fundamental;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infor: {
    flex: 0.3,
    backgroundColor: '#2874fc',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: '10%',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    width: '100%',
  },
  equation: {
    marginBottom: '5%',
    marginTop: '5%',
    color: '#fff',
    maxWidth: '100%',
    // marginLeft: '5%',
  },
  result: {
    marginBottom: '5%',
    marginTop: '5%',
    color: '#fff',
    // marginLeft: '5%',
  },

  text: {
    fontSize: 24,
    fontWeight: 600,
    color: '#fff',
    // marginLeft: '5%',
  },
  showStepBtn: {
    width: '100%',
    height: 40,
    backgroundColor: '#E7E6E1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  textBtn: {
    fontSize: 18,
    color: 'black',
    fontWeight: 500,
  },
  step: {
    // marginTop: '5%',
    flex: 0.7,
    // marginBottom: '5%',
  },
  stepText: {
    fontSize: 20,
    color: 'black',
    marginTop: '5%',
  },
  stepTitle: {
    fontFamily: 'Candal-Regular',
    fontSize: 20,
    color: 'black',
  },
  // size_medium: {
  //   height: '15%',
  // },
  // size_mediumm: {
  //   height: '10%',
  // },
  // size_large: {
  //   height: '5%',
  // },
  // size_larger: {
  //   height: '1%',
  // },
});
