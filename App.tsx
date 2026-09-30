import { DirectoryProvider } from './src/shared/DirectoryContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LandingPage from './src/components/LandingPage/LandingPage';

export default function App() {
    return (
        <SafeAreaProvider>
            <DirectoryProvider>
                <LandingPage />
            </DirectoryProvider>
        </SafeAreaProvider>
    );
}
