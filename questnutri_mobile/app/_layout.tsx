import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { View } from 'react-native';
import QN_Input from '@/components/QN_Components/QN_Input';
import QN_TextArea from '@/components/QN_Components/QN_TextArea';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [inputValue, setInputValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      <View style={{ padding: 20 }}>
        <QN_Input 
          value={inputValue} 
          onChange={setInputValue} 
          placeholder="Digite seu texto" 
        />
        <QN_TextArea
          value={textAreaValue}
          onChange={setTextAreaValue}
          placeholder="Digite algo..."
          label="Comentário"
        />
      </View>
    </ThemeProvider>
  );
}
