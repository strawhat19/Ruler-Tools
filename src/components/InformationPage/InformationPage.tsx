import { styles } from './InformationPage.styles';
import { Alert, View, Text, Linking, Pressable } from 'react-native';
import { useNavigation } from '../../shared/NavigationContext';
import { elementProps } from '../LandingPage/LandingPage.logic';
import type { InformationPageId } from './InformationPage.logic';
import { reviewDate, piratechsUrl, informationLinks, informationContent } from './InformationPage.logic';

export default function InformationPage({ page }: { page: InformationPageId }) {
    const { navigate } = useNavigation();
    const content = informationContent[page];
    const pageLink = informationLinks.find((link) => link.page === page);

    const openPiratechs = async () => {
        try {
            await Linking.openURL(piratechsUrl);
        } catch {
            Alert.alert(`Unable to open Piratechs`, `Please try again in a moment.`);
        }
    };

    return (
        <View style={styles.page} {...elementProps(`information-page`, page)}>
            <Pressable
                accessibilityRole={`button`}
                onPress={() => navigate(`home`, `directory`)}
                {...elementProps(`information-back-link`, page)}
                style={({ pressed }) => [styles.backLink, pressed && styles.pressed]}
            >
                <Text
                    style={styles.backText}
                    {...elementProps(`information-back-icon`, page)}
                >
                    {`←`}
                </Text>
                <Text
                    style={styles.backText}
                    {...elementProps(`information-back-label`, page)}
                >
                    {`Back to tools`}
                </Text>
            </Pressable>
            <View style={styles.header} {...elementProps(`information-header`, page)}>
                <View style={styles.iconWrap} {...elementProps(`information-icon-wrap`, page)}>
                    <Text style={styles.icon} {...elementProps(`information-icon`, page)}>
                        {pageLink?.symbol}
                    </Text>
                </View>
                <Text style={styles.eyebrow} {...elementProps(`information-eyebrow`, page)}>
                    {content.eyebrow}
                </Text>
                <Text
                    style={styles.title}
                    accessibilityRole={`header`}
                    {...elementProps(`information-title`, page)}
                >
                    {content.title}
                </Text>
                <Text style={styles.description} {...elementProps(`information-description`, page)}>
                    {content.description}
                </Text>
                <Text style={styles.reviewDate} {...elementProps(`information-review-date`, page)}>
                    {`Last reviewed: ${reviewDate}`}
                </Text>
            </View>
            {content.sections.map((section) => (
                <View
                    key={section.id}
                    style={styles.section}
                    {...elementProps(`information-section`, `${page}-${section.id}`)}
                >
                    <Text
                        style={styles.sectionTitle}
                        accessibilityRole={`header`}
                        {...elementProps(`information-section-title`, `${page}-${section.id}`)}
                    >
                        {section.title}
                    </Text>
                    {section.paragraphs.map((paragraph, index) => (
                        <Text
                            key={index}
                            style={styles.paragraph}
                            {...elementProps(`information-section-paragraph`, `${page}-${section.id}-${index}`)}
                        >
                            {paragraph}
                        </Text>
                    ))}
                </View>
            ))}
            <View style={styles.related} {...elementProps(`information-related`, page)}>
                <Text
                    style={styles.relatedTitle}
                    accessibilityRole={`header`}
                    {...elementProps(`information-related-title`, page)}
                >
                    {`More about Ruler Tools`}
                </Text>
                {informationLinks.filter((link) => link.page !== page).map((link) => (
                    <Pressable
                        key={link.page}
                        accessibilityRole={`button`}
                        onPress={() => navigate(link.page)}
                        {...elementProps(`information-related-link`, `${page}-${link.page}`)}
                        style={({ pressed }) => [styles.relatedLink, pressed && styles.pressed]}
                    >
                        <Text
                            style={styles.relatedText}
                            {...elementProps(`information-related-icon`, `${page}-${link.page}`)}
                        >
                            {link.symbol}
                        </Text>
                        <Text
                            style={styles.relatedText}
                            {...elementProps(`information-related-label`, `${page}-${link.page}`)}
                        >
                            {link.label}
                        </Text>
                    </Pressable>
                ))}
                <Pressable
                    accessibilityRole={`link`}
                    onPress={() => void openPiratechs()}
                    {...elementProps(`information-piratechs-link`, page)}
                    style={({ pressed }) => [styles.relatedLink, styles.piratechsLink, pressed && styles.pressed]}
                >
                    <Text
                        style={styles.relatedText}
                        {...elementProps(`information-piratechs-icon`, page)}
                    >
                        {`↗`}
                    </Text>
                    <Text
                        style={styles.relatedText}
                        {...elementProps(`information-piratechs-label`, page)}
                    >
                        {`Visit Piratechs`}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
