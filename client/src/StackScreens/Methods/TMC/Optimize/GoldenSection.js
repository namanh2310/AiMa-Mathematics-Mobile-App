import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useState} from 'react';
import axios from 'axios';

const GoldenSection = ({navigation}) => {
  const handleSubmit = e => {
    e.preventDefault();
    const getData = async () => {
      try {
        await axios
          .post('http://localhost:8081/Optimize/goldensection', {input}) //For Flask server
          .then(res => {
            // setResult(res.data.data);
            navigation.navigate('Golden Section SOL', {data: res.data.data});
          });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  };
  const [input, setInput] = useState({});
  const [type, setType] = useState(null);
  const [result, setResult] = useState('x^5 - 5*x^4 + x^3- 6*x^2+7*x+10');
  const handleChange = (name, text) => {
    setInput({...input, [name]: text});
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GOLDEN SECTION</Text>
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
            placeholder="xl"
            onChangeText={text => handleChange('xl', text)}
            style={{...styles.inputField, ...styles.variableField}}
          />
          <TextInput
            placeholder="xu"
            onChangeText={text => handleChange('xu', text)}
            style={{...styles.inputField, ...styles.variableField}}
          />
          <TextInput
            placeholder="error"
            onChangeText={text => handleChange('es', text)}
            style={{...styles.inputField, ...styles.variableField}}
          />
        </View>
        <View style={styles.typeFields}>
          <TouchableOpacity
            style={
              type === 'Maximum'
                ? {borderWidth: 3, borderColor: '#2874fc', ...styles.type}
                : styles.type
            }
            onPress={() => {
              setType('Maximum');
              handleChange('type', 'maximum');
            }}>
            <Text style={styles.typeText}>Maximum</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              type === 'Minimum'
                ? {borderWidth: 3, borderColor: '#2874fc', ...styles.type}
                : styles.type
            }
            onPress={() => {
              setType('Minimum');
              handleChange('type', 'minimum');
            }}>
            <Text style={styles.typeText}>Minimum</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Calculate</Text>
      </TouchableOpacity>

      <Text>{input.function}</Text>
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
    flex: 0.3,
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

export default GoldenSection;
