import { AccountProvider } from './src/shared/AccountContext';
import { DirectoryProvider } from './src/shared/DirectoryContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LandingPage from './src/components/LandingPage/LandingPage';
import { NavigationProvider } from './src/shared/NavigationContext';
import AccountPreview from './src/components/AccountPreview/AccountPreview';

export default function App() {
    return (
        <SafeAreaProvider>
            <DirectoryProvider>
                <NavigationProvider>
                    <AccountProvider>
                        <LandingPage />
                        <AccountPreview />
                    </AccountProvider>
                </NavigationProvider>
            </DirectoryProvider>
        </SafeAreaProvider>
    );
}
