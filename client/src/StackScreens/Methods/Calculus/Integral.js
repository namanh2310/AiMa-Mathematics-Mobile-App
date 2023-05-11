import {View, Text, TouchableOpacity, Button} from 'react-native';
import {useState} from 'react';
import MathView, {MathText} from 'react-native-math-view';
import {TextInput} from 'react-native-gesture-handler';

const Integral = ({equation, setEquation}) => {
  const [status, setStatus] = useState(false);
  const [expr, setExpr] = useState();
  const [int1, setInt1] = useState();
  const [int2, setInt2] = useState();
  return (
    <View>
      <Button
        title="Int"
        onPress={() => {
          setStatus(true);
        }}
      />
      {status && (
        <View>
          <TextInput
            placeholder="function"
            onChangeText={text => setExpr(text)}
          />
          <TextInput placeholder="int1" onChangeText={text => setInt1(text)} />
          <TextInput placeholder="int2" onChangeText={text => setInt2(text)} />
          <Button
            title="OK"
            onPress={() => {
              setStatus(false);
              setEquation([...equation, `\\int_{${int1}}^{${int2}}${expr}`]);
            }}
          />
        </View>
      )}
      <Text>{equation}</Text>
    </View>
  );
};

export default Integral;
