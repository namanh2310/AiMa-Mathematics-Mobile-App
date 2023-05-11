import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useState} from 'react';
import axios from 'axios';

const Newton = ({navigation}) => {
  const handleSubmit = e => {
    e.preventDefault();
    const getData = async () => {
      try {
        await axios
          .post('http://localhost:8081/Optimize/newtonmethod', {input}) //For Flask server
          .then(res => {
            // setResult(res.data.data);
            navigation.navigate('Newton Method SOL', {
              data: res.data.data,
              function: res.data.formula,
              firstDeri: res.data.firtDeri,
              secondDeri: res.data.secondDeri,
            });
          });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  };
  const [input, setInput] = useState({});
  const [result, setResult] = useState('x^5 - 5*x^4 + x^3- 6*x^2+7*x+10');
  const handleChange = (name, text) => {
    setInput({...input, [name]: text});
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NEWTON METHOD</Text>
      <View style={styles.input}>
        <View style={styles.functionField}>
          <TextInput
            defaultValue={result}
            placeholder="Function"
            onChangeText={text => handleChange('function', text)}
            style={styles.inputField}
          />
        </View>
        <View style={styles.variableFields}>
          <TextInput
            placeholder="x0"
            onChangeText={text => handleChange('x0', text)}
            style={{...styles.inputField, ...styles.variableField}}
          />

          <TextInput
            placeholder="error"
            onChangeText={text => handleChange('es', text)}
            style={{...styles.inputField, ...styles.variableField}}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Calculate</Text>
      </TouchableOpacity>

      <Text>{result && JSON.stringify(result)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '5%',
  },
  title: {
    fontFamily: 'Candal-Regular',
    color: 'black',
    fontSize: 28,
  },
  input: {
    marginBottom: '5%',
    marginTop: '5%',
  },
  functionField: {
    // flex: 1,
  },
  inputField: {
    borderWidth: 3,
    borderColor: '#2874fc',
    borderRadius: 12,
    paddingLeft: 24,
    marginBottom: '5%',
    fontSize: 22,
  },
  variableFields: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // flexWrap: 'wrap',
  },
  variableField: {
    flex: 0.48,
  },
  submitButton: {
    height: 48,
    backgroundColor: '#2874fc',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeFields: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  type: {
    flex: 0.48,
    height: 48,
    backgroundColor: '#28f1fc',
    justifyContent: 'center',
    borderRadius: 12,
  },
  typeText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
  },
  submitText: {
    fontFamily: 'Candal-Regular',
    fontSize: 20,
    color: 'white',
  },
});

export default Newton;
