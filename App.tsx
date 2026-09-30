import { DirectoryProvider } from './src/shared/DirectoryContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LandingPage from './src/components/LandingPage/LandingPage';
import { NavigationProvider } from './src/shared/NavigationContext';

export default function App() {
    return (
        <SafeAreaProvider>
            <DirectoryProvider>
                <NavigationProvider>
                    <LandingPage />
                </NavigationProvider>
            </DirectoryProvider>
        </SafeAreaProvider>
    );
}
