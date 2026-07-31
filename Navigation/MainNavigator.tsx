// NavigationContainer must live at app root (App.tsx). Do not wrap navigators here.
import HomeScreen from "../src/screens/HomeScreen";
import CategorySelectScreen from "../src/screens/CategorySelectScreen";
import GameScreen from "../src/screens/GameScreen";
import ResultsScreen from "../src/screens/ResultsScreen";
import HighScoresScreen from "../src/screens/HighScoresScreen";
import ReviewAnswersScreen from "../src/screens/ReviewAnswersScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../src/screens/LoginScreen";
import RegistroScreen from "../src/screens/RegistroScreen";
import { createStackNavigator } from "@react-navigation/stack";
import {
  MainStackParamList,
  RootStackParamList,
} from "../src/types/navigation";
import PerfilScreen from "../src/screens/PerfilScreen";
import { Fonts } from "../style/estiloGlobal";

const Stack = createStackNavigator<MainStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

const hiddenTabOptions = {
  tabBarButton: () => null,
};

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: { fontFamily: Fonts.primary },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
      <Stack.Screen name="Tab" component={MyTabs} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "#16213e" },
        headerTintColor: "#e94560",
        headerTitleStyle: {
          fontFamily: Fonts.primary,
          fontWeight: "700",
          color: "#fff",
        },
        tabBarLabelStyle: { fontFamily: Fonts.primary },
        animation: "none",
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="CategorySelect"
        component={CategorySelectScreen}
        options={{ title: "Categorías", ...hiddenTabOptions }}
      />
      <Tab.Screen
        name="Game"
        component={GameScreen}
        options={{ title: "Trivia", ...hiddenTabOptions }}
      />
      <Tab.Screen
        name="Results"
        component={ResultsScreen}
        options={{ title: "Resultado", ...hiddenTabOptions }}
      />
      <Tab.Screen
        name="HighScores"
        component={HighScoresScreen}
        options={{ title: "Puntajes" }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{ title: "Perfil" }}
      />
      <Tab.Screen
        name="ReviewAnswers"
        component={ReviewAnswersScreen}
        options={{ title: "Respuestas correctas", ...hiddenTabOptions }}
      />
    </Tab.Navigator>
  );
}

export function Navegador() {
  return <MyStack />;
}
