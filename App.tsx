import { ThemeProvider } from './src/shared/ThemeContext';
import { AccountProvider } from './src/shared/AccountContext';
import { DirectoryProvider } from './src/shared/DirectoryContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LandingPage from './src/components/LandingPage/LandingPage';
import { NavigationProvider } from './src/shared/NavigationContext';

export default function App() {
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <DirectoryProvider>
                    <NavigationProvider>
                        <AccountProvider>
                            <LandingPage />
                        </AccountProvider>
                    </NavigationProvider>
                </DirectoryProvider>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
