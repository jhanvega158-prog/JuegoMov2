import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../src/types/navigation";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../src/screens/HomeScreen";
import CategorySelectScreen from "../src/screens/CategorySelectScreen";
import GameScreen from "../src/screens/GameScreen";
import ResultsScreen from "../src/screens/ResultsScreen";
import HighScoresScreen from "../src/screens/HighScoresScreen";
import ReviewAnswersScreen from "../src/screens/ReviewAnswersScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../src/screens/LoginScreen";
import RegistroScreen from "../src/screens/RegistroScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator<RootStackParamList>();

function MyStack() {
    return (
        <Stack.Navigator >
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
                headerStyle: { backgroundColor: '#16213e' },
                headerTintColor: '#e94560',
                headerTitleStyle: { fontWeight: '700', color: '#fff' },
                animation: 'none',
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="CategorySelect"
                component={CategorySelectScreen}
                options={{ title: 'Categorías' }}
            />
            <Tab.Screen
                name="Game"
                component={GameScreen}
                options={{ title: 'Trivia', headerBackVisible: false  }}
            />
            <Tab.Screen
                name="Results"
                component={ResultsScreen}
                options={{ title: 'Resultado', headerBackVisible: false }}
            />
            <Tab.Screen
                name="HighScores"
                component={HighScoresScreen}
                options={{ title: 'Puntajes' }}
            />
            <Tab.Screen
                name="ReviewAnswers"
                component={ReviewAnswersScreen}
                options={{ title: 'Respuestas correctas' }}
            />
        </Tab.Navigator>

    );

}

export function Navegador() {
    return (

        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}