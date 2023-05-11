import {View, Text, TouchableOpacity, Button} from 'react-native';
import {useState} from 'react';
import MathView, {MathText} from 'react-native-math-view';
import {TextInput} from 'react-native-gesture-handler';

const Equations = ({equation, setEquation}) => {
  const [status, setStatus] = useState(false);
  const [sqrt, setSqrt] = useState();
  return (
    <View>
      <Button
        title="sqrt"
        onPress={() => {
          setStatus(true);
        }}
      />
      {status && (
        <View>
          <TextInput onChangeText={text => setSqrt(text)} />
          <Button
            title="OK"
            onPress={() => {
              setStatus(false);
              setEquation([...equation, `\\sqrt{${sqrt}}`]);
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Equations;
