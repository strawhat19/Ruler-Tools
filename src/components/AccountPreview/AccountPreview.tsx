import { styles } from './AccountPreview.styles';
import { useAccountPreview } from './AccountPreview.logic';
import { Modal, View, Text, Pressable } from 'react-native';
import { elementProps } from '../LandingPage/LandingPage.logic';

export default function AccountPreview() {
    const { notice, heading, description, dialogMode, closeAccount, previewSignIn } = useAccountPreview();

    return (
        <Modal
            transparent
            animationType={`fade`}
            visible={dialogMode !== null}
            onRequestClose={closeAccount}
            {...elementProps(`account-preview-modal`)}
        >
            <View style={styles.backdrop} {...elementProps(`account-preview-backdrop`)}>
                <Pressable
                    accessible={false}
                    onPress={closeAccount}
                    style={styles.backdropDismiss}
                    {...elementProps(`account-preview-backdrop-dismiss`)}
                />
                <View
                    accessibilityViewIsModal
                    style={styles.dialog}
                    {...elementProps(`account-preview-dialog`)}
                >
                    <Pressable
                        onPress={closeAccount}
                        accessibilityRole={`button`}
                        accessibilityLabel={`Close account preview`}
                        {...elementProps(`account-preview-close`)}
                        style={({ pressed }) => [styles.close, pressed && styles.pressed]}
                    >
                        <Text style={styles.closeIcon} {...elementProps(`account-preview-close-icon`)}>
                            {`×`}
                        </Text>
                    </Pressable>
                    <View style={styles.emblem} {...elementProps(`account-preview-emblem`)}>
                        <Text style={styles.emblemIcon} {...elementProps(`account-preview-emblem-icon`)}>
                            {dialogMode === `sign-up` ? `＋` : `↪`}
                        </Text>
                    </View>
                    <Text
                        style={styles.title}
                        accessibilityRole={`header`}
                        {...elementProps(`account-preview-title`)}
                    >
                        {heading}
                    </Text>
                    <Text style={styles.description} {...elementProps(`account-preview-description`)}>
                        {description}
                    </Text>
                    <Text style={styles.notice} {...elementProps(`account-preview-notice`)}>
                        {notice}
                    </Text>
                    <Pressable
                        onPress={previewSignIn}
                        accessibilityRole={`button`}
                        {...elementProps(`account-preview-toolkit-button`)}
                        style={({ pressed }) => [styles.toolkitButton, pressed && styles.pressed]}
                    >
                        <Text style={styles.toolkitLabel} {...elementProps(`account-preview-toolkit-icon`)}>
                            {`▱`}
                        </Text>
                        <Text style={styles.toolkitLabel} {...elementProps(`account-preview-toolkit-label`)}>
                            {`Preview Toolkits`}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}
