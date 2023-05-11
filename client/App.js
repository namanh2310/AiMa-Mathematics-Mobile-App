import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from './src/StackScreens/Welcome';
import TabNavigator from './src/StackScreens/TabNavigator';

//Calculus
import Fundamental from './src/StackScreens/Methods/Calculus/Fundamental';
import FundamentalSol from './src/StackScreens/Solutions/Calculus/FundamentalSOL';
import Derivative from './src/StackScreens/Methods/Calculus/Derivative';
import Integral from './src/StackScreens/Methods/Calculus/Integral';
import Limit from './src/StackScreens/Methods/Calculus/Limit';
import Equations from './src/StackScreens/Methods/Calculus/Equations';
//====

//Geometric
import Circle from './src/StackScreens/Methods/Geometric/Circle';
import Rectangle from './src/StackScreens/Methods/Geometric/Rectangle';
import Square from './src/StackScreens/Methods/Geometric/Square';
//====

//TMC
import GoldenSection from './src/StackScreens/Methods/TMC/Optimize/GoldenSection';
import GoldenSectionSOL from './src/StackScreens/Solutions/TMC/Optimize/GoldenSectionSOL';
import Newton from './src/StackScreens/Methods/TMC/Optimize/Newton';
import Parabolic from './src/StackScreens/Methods/TMC/Optimize/Parabolic';
import NewtonMethodSOL from './src/StackScreens/Solutions/TMC/Optimize/NewtonMethodSOL';
import EulerMethod from './src/StackScreens/Methods/TMC/ODE/EulerMethod';
import EulerMethodSOL from './src/StackScreens/Solutions/TMC/ODE/EulerMethodSOL';
import HeunMethod from './src/StackScreens/Methods/TMC/ODE/HeunMethod';
import HeunMethodSOL from './src/StackScreens/Solutions/TMC/ODE/HeunMethodSOL';
import CalculusList from './src/StackScreens/CalculusList';
import GeometricList from './src/StackScreens/GeometricList';
import TMCList from './src/StackScreens/TMCList';
import MidPointMethod from './src/StackScreens/Methods/TMC/ODE/MidPointMethod';
import RalstonMethod from './src/StackScreens/Methods/TMC/ODE/RalstonMethod';
import ThirdOrderMethod from './src/StackScreens/Methods/TMC/ODE/ThirdOrderMethod';
import MidPointMethodSOL from './src/StackScreens/Solutions/TMC/ODE/MidPointMethodSOL';
import RalstonMethodSOL from './src/StackScreens/Solutions/TMC/ODE/RalstonMethodSOL';
import ThirdOrderMethodSOL from './src/StackScreens/Solutions/TMC/ODE/ThirdOrderMethodSOL';
import Classic4thOrder from './src/StackScreens/Methods/TMC/ODE/Classic4thOrder';
import Classic4thOrderSOL from './src/StackScreens/Solutions/TMC/ODE/Classic4thOrderSOL';
import Simpson13Rule from './src/StackScreens/Solutions/TMC/ODE/Simpson13Rule';
import Simpson13RuleSOL from './src/StackScreens/Solutions/TMC/ODE/Simpson13RuleSOL';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />

        {/* Calculus */}
        <Stack.Screen name="CalculusList" component={CalculusList} />
        <Stack.Screen name="Fundamental" component={Fundamental} />
        <Stack.Screen name="Fundamental SOL" component={FundamentalSol} />
        <Stack.Screen name="Derivative" component={Derivative} />
        <Stack.Screen name="Integral" component={Integral} />
        <Stack.Screen name="Limit" component={Limit} />
        <Stack.Screen name="Equations" component={Equations} />
        {/* ===== */}

        {/* Geometric */}
        <Stack.Screen name="GeometricList" component={GeometricList} />
        <Stack.Screen name="Circle" component={Circle} />
        <Stack.Screen name="Rectangle" component={Rectangle} />
        <Stack.Screen name="Square" component={Square} />
        {/* ===== */}

        <Stack.Screen name="TMCList" component={TMCList} />
        {/* TMC - OPTIMIZE */}

        <Stack.Screen name="Golden Section" component={GoldenSection} />
        <Stack.Screen name="Golden Section SOL" component={GoldenSectionSOL} />

        <Stack.Screen name="Newton Method" component={Newton} />
        <Stack.Screen name="Newton Method SOL" component={NewtonMethodSOL} />

        <Stack.Screen name="Parabolic Interpolation" component={Parabolic} />

        {/* TMC - ODE */}
        <Stack.Screen name="Euler Method" component={EulerMethod} />
        <Stack.Screen name="Euler Method SOL" component={EulerMethodSOL} />

        <Stack.Screen name="Heun Method" component={HeunMethod} />
        <Stack.Screen name="Heun Method SOL" component={HeunMethodSOL} />

        <Stack.Screen name="MidPoint Method" component={MidPointMethod} />
        <Stack.Screen
          name="MidPoint Method SOL"
          component={MidPointMethodSOL}
        />

        <Stack.Screen name="Ralston Method" component={RalstonMethod} />
        <Stack.Screen name="Ralston Method SOL" component={RalstonMethodSOL} />

        <Stack.Screen name="Third-order Method" component={ThirdOrderMethod} />
        <Stack.Screen
          name="Third-order Method SOL"
          component={ThirdOrderMethodSOL}
        />

        <Stack.Screen
          name="Classic Fourth-order Method"
          component={Classic4thOrder}
        />
        <Stack.Screen
          name="Classic Fourth-order Method SOL"
          component={Classic4thOrderSOL}
        />
        {/* ===== */}
        <Stack.Screen name="Simpson 1/3 Rule" component={Simpson13Rule} />
        <Stack.Screen
          name="Simpson 1/3 Rule SOL"
          component={Simpson13RuleSOL}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
