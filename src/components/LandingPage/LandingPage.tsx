import Logo from '../Logo/Logo';
import { useRef, useState, useEffect } from 'react';
import { palette, styles } from './LandingPage.styles';
import { categories } from '../../shared/catalog';
import RulerMarquee from '../RulerMarquee/RulerMarquee';
import { useDirectory } from '../../shared/DirectoryContext';
import { useAccount } from '../../shared/AccountContext';
import { useNavigation } from '../../shared/NavigationContext';
import InformationPage from '../InformationPage/InformationPage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { elementProps, platformFilters, toolColors, toolSymbols } from './LandingPage.logic';
import { Alert, View, Text, Linking, Pressable, TextInput, ScrollView, LayoutAnimation, useWindowDimensions } from 'react-native';

export default function LandingPage() {
    const year = new Date().getFullYear();
    const scroll = useRef<ScrollView>(null);
    const { page, navigate } = useNavigation();
    const { width } = useWindowDimensions();
    const { isSignedIn, openAccount, signOut } = useAccount();
    const pendingDirectoryScroll = useRef(false);
    const [directoryY, setDirectoryY] = useState(0);
    const {
        sort,
        query,
        category,
        platform,
        savedIds,
        setSort,
        setQuery,
        savedOnly,
        savedCount,
        setCategory,
        setPlatform,
        toggleSaved,
        setSavedOnly,
        filteredTools,
        resetFilters,
    } = useDirectory();

    const animateChange = (change: () => void) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        change();
    };

    useEffect(() => {
        if (!pendingDirectoryScroll.current) {
            scroll.current?.scrollTo({ y: 0, animated: true });
        }
    }, [page]);

    const browseTools = () => {
        if (page !== `home`) {
            pendingDirectoryScroll.current = true;
            navigate(`home`, `tool-directory`);
            return;
        }

        scroll.current?.scrollTo({ y: directoryY, animated: true });
    };

    const openTool = async (url: string) => {
        try {
            await Linking.openURL(url);
        } catch {
            Alert.alert(`Unable to open this tool`, `Please try opening the tool again in a moment.`);
        }
    };

    const cardWidth = width >= 900 ? `31.5%` : width >= 620 ? `48.5%` : `100%`;

    return (
        <SafeAreaView
            style={styles.safeArea}
            {...elementProps(`ruler-tools-safe-area`)}
        >
            <View
                style={styles.headerContainer}
                {...elementProps(`ruler-tools-header-container`)}
            >
                <View
                    style={styles.header}
                    {...elementProps(`ruler-tools-header`)}
                >
                    <View
                        accessible={false}
                        pointerEvents={`none`}
                        accessibilityElementsHidden
                        style={styles.headerWatermark}
                        importantForAccessibility={`no-hide-descendants`}
                        {...elementProps(`ruler-tools-header-watermark`)}
                    >
                        <Logo
                            icon
                            light
                            width={170}
                            nativeID={`ruler-tools-header-watermark-crown`}
                            className={`ruler-tools-header-watermark-crown`}
                        />
                    </View>
                    <Logo
                        light
                        width={width < 370 ? 150 : 180}
                        nativeID={`ruler-tools-header-logo`}
                        className={`ruler-tools-header-logo`}
                    />
                    <View
                        style={styles.headerAccountActions}
                        {...elementProps(`header-account-actions`)}
                    >
                        {isSignedIn ? (
                            <>
                                <Pressable
                                    accessibilityRole={`button`}
                                    accessibilityLabel={`Show ${savedCount} saved tools`}
                                    accessibilityState={{ selected: page === `home` && savedOnly }}
                                    style={({ pressed }) => [styles.headerBookmark, pressed && styles.pressed]}
                                    onPress={() => {
                                        animateChange(() => setSavedOnly(!savedOnly));
                                        browseTools();
                                    }}
                                    {...elementProps(`header-saved-tools-button`)}
                                >
                                    <Text
                                        style={styles.headerBookmarkText}
                                        {...elementProps(`header-saved-tools-icon`)}
                                    >
                                        {savedOnly ? `★` : `☆`}
                                    </Text>
                                    <Text
                                        style={styles.headerBookmarkText}
                                        {...elementProps(`header-saved-tools-label`)}
                                    >
                                        {`Toolkits`}
                                    </Text>
                                </Pressable>
                                <Pressable
                                    accessibilityRole={`button`}
                                    onPress={signOut}
                                    accessibilityLabel={`Exit account preview`}
                                    style={({ pressed }) => [styles.headerBookmark, pressed && styles.pressed]}
                                    {...elementProps(`header-sign-out-button`)}
                                >
                                    <Text
                                        style={styles.headerBookmarkText}
                                        {...elementProps(`header-sign-out-icon`)}
                                    >
                                        {`↪`}
                                    </Text>
                                </Pressable>
                            </>
                        ) : (
                            <>
                                <Pressable
                                    accessibilityRole={`button`}
                                    onPress={() => openAccount(`sign-in`)}
                                    style={({ pressed }) => [styles.headerBookmark, pressed && styles.pressed]}
                                    {...elementProps(`header-sign-in-button`)}
                                >
                                    <Text
                                        style={styles.headerBookmarkText}
                                        {...elementProps(`header-sign-in-icon`)}
                                    >
                                        {`↪`}
                                    </Text>
                                    <Text
                                        style={styles.headerBookmarkText}
                                        {...elementProps(`header-sign-in-label`)}
                                    >
                                        {`Sign In`}
                                    </Text>
                                </Pressable>
                                <Pressable
                                    accessibilityRole={`button`}
                                    onPress={() => openAccount(`sign-up`)}
                                    style={({ pressed }) => [styles.headerBookmark, pressed && styles.pressed]}
                                    {...elementProps(`header-sign-up-button`)}
                                >
                                    <Text
                                        style={styles.headerBookmarkText}
                                        {...elementProps(`header-sign-up-icon`)}
                                    >
                                        {`+`}
                                    </Text>
                                    <Text
                                        style={styles.headerBookmarkText}
                                        {...elementProps(`header-sign-up-label`)}
                                    >
                                        {`Sign Up`}
                                    </Text>
                                </Pressable>
                            </>
                        )}
                    </View>
                </View>

                <View
                    style={styles.navigation}
                    {...elementProps(`ruler-tools-navigation`)}
                >
                    {([
                        { page: `home`, label: `Explore`, icon: `⊞` },
                        { page: `about`, label: `About`, icon: `ⓘ` },
                        { page: `terms`, label: `Terms`, icon: `§` },
                        { page: `privacy`, label: `Privacy Policy`, icon: `▣` },
                    ] as const).map((item) => (
                        <Pressable
                            key={item.page}
                            accessibilityRole={`button`}
                            accessibilityState={{ selected: page === item.page }}
                            onPress={() => navigate(item.page)}
                            style={({ pressed }) => [
                                styles.navigationLink,
                                page === item.page && styles.navigationLinkActive,
                                pressed && styles.pressed,
                            ]}
                            {...elementProps(`ruler-tools-navigation-link`, item.page)}
                        >
                            <Text
                                style={styles.navigationIcon}
                                {...elementProps(`ruler-tools-navigation-icon`, item.page)}
                            >
                                {item.icon}
                            </Text>
                            <Text
                                style={styles.navigationLabel}
                                {...elementProps(`ruler-tools-navigation-label`, item.page)}
                            >
                                {item.label}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                <RulerMarquee
                    variant={`slim`}
                    id={`header-ruler-marquee`}
                />
            </View>
            <ScrollView
                ref={scroll}
                keyboardShouldPersistTaps={`handled`}
                showsVerticalScrollIndicator={false}
                {...elementProps(`ruler-tools-page-scroll`)}
            >
                <View
                    style={styles.page}
                    {...elementProps(`ruler-tools-page`)}
                >
                    {page === `home` ? (
                        <View
                            {...elementProps(`ruler-tools-home-content`)}
                        >
                    <View
                        style={styles.hero}
                        {...elementProps(`ruler-tools-hero`)}
                    >
                        <View
                            style={styles.eyebrow}
                            {...elementProps(`hero-eyebrow`)}
                        >
                            <View
                                style={styles.eyebrowDot}
                                {...elementProps(`hero-eyebrow-dot`)}
                            />
                            <Text
                                style={styles.eyebrowText}
                                {...elementProps(`hero-eyebrow-label`)}
                            >
                                {`THE RIGHT TOOL. RIGHT HERE.`}
                            </Text>
                        </View>
                        <Text
                            accessibilityRole={`header`}
                            style={[styles.heroTitle, width >= 620 && { fontSize: 66, lineHeight: 73 }]}
                            {...elementProps(`hero-title`)}
                        >
                            {`One tool to\nrule them `}
                            <Text
                                style={styles.heroTitleAccent}
                                {...elementProps(`hero-title-accent`)}
                            >
                                {`all.`}
                            </Text>
                        </Text>
                        <Text
                            style={styles.heroDescription}
                            {...elementProps(`hero-description`)}
                        >
                            {`A thoughtfully picked collection of useful tools. Calculate, measure, create, and get things done — wherever you work.`}
                        </Text>
                        <View
                            style={styles.search}
                            {...elementProps(`hero-search`)}
                        >
                            <Text
                                style={styles.searchIcon}
                                {...elementProps(`hero-search-icon`)}
                            >
                                {`⌕`}
                            </Text>
                            <TextInput
                                value={query}
                                returnKeyType={`search`}
                                onChangeText={setQuery}
                                autoCapitalize={`none`}
                                style={styles.searchInput}
                                onSubmitEditing={browseTools}
                                placeholderTextColor={palette.muted}
                                accessibilityLabel={`Search the tool directory`}
                                placeholder={`Find a tool for your next task…`}
                                {...elementProps(`hero-search-input`)}
                            />
                            {query.length > 0 && (
                                <Pressable
                                    style={styles.clearSearch}
                                    onPress={() => setQuery(``)}
                                    accessibilityRole={`button`}
                                    accessibilityLabel={`Clear search`}
                                    {...elementProps(`hero-search-clear-button`)}
                                >
                                    <Text
                                        style={styles.clearSearchText}
                                        {...elementProps(`hero-search-clear-icon`)}
                                    >
                                        {`×`}
                                    </Text>
                                </Pressable>
                            )}
                        </View>
                        <Text
                            style={styles.heroCaption}
                            {...elementProps(`hero-search-caption`)}
                        >
                            {`Websites, browser extensions, and apps. One useful place.`}
                        </Text>
                    </View>

                    <View
                        style={styles.featurePanel}
                        {...elementProps(`precision-feature-panel`)}
                    >
                        <View
                            style={styles.featurePanelTop}
                            {...elementProps(`precision-feature-panel-top`)}
                        >
                            <Logo
                                icon
                                width={65}
                                nativeID={`precision-feature-crown`}
                                className={`precision-feature-crown`}
                            />
                            <Text
                                style={styles.featurePanelText}
                                {...elementProps(`precision-feature-title`)}
                            >
                                {`A little precision.\nA lot of possibility.`}
                            </Text>
                        </View>
                        <View
                            style={styles.ruler}
                            {...elementProps(`precision-feature-ruler`)}
                        >
                            {Array.from({ length: 31 }, (_, index) => (
                                <View
                                    key={index}
                                    style={[styles.rulerTick, index % 5 === 0 && styles.rulerTickLong]}
                                    {...elementProps(`precision-feature-ruler-tick`, `${index}`)}
                                />
                            ))}
                        </View>
                        <Text
                            style={styles.featurePanelCaption}
                            {...elementProps(`precision-feature-caption`)}
                        >
                            {`LESS SEARCHING. MORE DOING.`}
                        </Text>
                    </View>

                    <Text
                        style={styles.sectionEyebrow}
                        {...elementProps(`category-section-eyebrow`)}
                    >
                        {`WHAT ARE YOU WORKING ON?`}
                    </Text>
                    <View
                        style={styles.categories}
                        {...elementProps(`category-filter-list`)}
                    >
                        <Pressable
                            accessibilityRole={`button`}
                            accessibilityState={{ selected: category === `all` }}
                            onPress={() => animateChange(() => setCategory(`all`))}
                            style={({ pressed }) => [styles.categoryChip, category === `all` && styles.categoryChipActive, pressed && styles.pressed]}
                            {...elementProps(`category-filter-button`, `all`)}
                        >
                            <Text
                                style={[styles.categoryIcon, category === `all` && styles.activeText]}
                                {...elementProps(`category-filter-icon`, `all`)}
                            >
                                {`⊞`}
                            </Text>
                            <Text
                                style={[styles.categoryText, category === `all` && styles.activeText]}
                                {...elementProps(`category-filter-label`, `all`)}
                            >
                                {`All Tools`}
                            </Text>
                        </Pressable>
                        {categories.map((item) => (
                            <Pressable
                                key={item.id}
                                accessibilityRole={`button`}
                                accessibilityState={{ selected: category === item.id }}
                                onPress={() => animateChange(() => setCategory(item.id))}
                                style={({ pressed }) => [styles.categoryChip, category === item.id && styles.categoryChipActive, pressed && styles.pressed]}
                                {...elementProps(`category-filter-button`, item.id)}
                            >
                                <Text
                                    style={[styles.categoryIcon, category === item.id && styles.activeText]}
                                    {...elementProps(`category-filter-icon`, item.id)}
                                >
                                    {toolSymbols[item.icon]}
                                </Text>
                                <Text
                                    style={[styles.categoryText, category === item.id && styles.activeText]}
                                    {...elementProps(`category-filter-label`, item.id)}
                                >
                                    {item.name}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    <View
                        onLayout={(event) => {
                            const position = event.nativeEvent.layout.y;
                            setDirectoryY(position);

                            if (pendingDirectoryScroll.current) {
                                pendingDirectoryScroll.current = false;
                                scroll.current?.scrollTo({ y: position, animated: true });
                            }
                        }}
                        {...elementProps(`tool-directory`)}
                    >
                        <View
                            style={styles.directoryHeading}
                            {...elementProps(`tool-directory-heading`)}
                        >
                            <Text
                                accessibilityRole={`header`}
                                style={styles.directoryTitle}
                                {...elementProps(`tool-directory-title`)}
                            >
                                {savedOnly ? `Your trusty favorites.` : `Small tools. Big possibilities.`}
                            </Text>
                            <Text
                                style={styles.directoryDescription}
                                {...elementProps(`tool-directory-description`)}
                            >
                                {savedOnly ? `Keep the tools you reach for close at hand.` : `Useful discoveries for everyday problems.`}
                            </Text>
                        </View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.platformScroll}
                            {...elementProps(`platform-filter-scroll`)}
                        >
                            {platformFilters.map((item) => (
                                <Pressable
                                    key={item.id}
                                    accessibilityRole={`button`}
                                    accessibilityState={{ selected: platform === item.id }}
                                    onPress={() => animateChange(() => setPlatform(item.id))}
                                    style={({ pressed }) => [styles.platformChip, platform === item.id && styles.platformChipActive, pressed && styles.pressed]}
                                    {...elementProps(`platform-filter-button`, item.id)}
                                >
                                    <Text
                                        style={styles.platformText}
                                        {...elementProps(`platform-filter-icon`, item.id)}
                                    >
                                        {item.icon}
                                    </Text>
                                    <Text
                                        style={styles.platformText}
                                        {...elementProps(`platform-filter-label`, item.id)}
                                    >
                                        {item.label}
                                    </Text>
                                </Pressable>
                            ))}
                            <Pressable
                                accessibilityRole={`button`}
                                accessibilityState={{ selected: savedOnly }}
                                onPress={() => animateChange(() => setSavedOnly(!savedOnly))}
                                style={({ pressed }) => [styles.platformChip, savedOnly && styles.platformChipActive, pressed && styles.pressed]}
                                {...elementProps(`platform-saved-filter-button`)}
                            >
                                <Text
                                    style={styles.platformText}
                                    {...elementProps(`platform-saved-filter-icon`)}
                                >
                                    {`☆`}
                                </Text>
                                <Text
                                    style={styles.platformText}
                                    {...elementProps(`platform-saved-filter-label`)}
                                >
                                    {`Saved`}
                                </Text>
                            </Pressable>
                        </ScrollView>
                        <View
                            style={styles.resultsBar}
                            {...elementProps(`tool-results-bar`)}
                        >
                            <Text
                                accessibilityLiveRegion={`polite`}
                                style={styles.resultsCount}
                                {...elementProps(`tool-results-count`)}
                            >
                                {`${filteredTools.length} useful ${filteredTools.length === 1 ? `tool` : `tools`}`}
                            </Text>
                            <View
                                style={styles.sortControl}
                                {...elementProps(`tool-sort-control`)}
                            >
                                {([`featured`, `name`] as const).map((value) => (
                                    <Pressable
                                        key={value}
                                        style={styles.sortButton}
                                        accessibilityRole={`button`}
                                        accessibilityState={{ selected: sort === value }}
                                        onPress={() => animateChange(() => setSort(value))}
                                        {...elementProps(`tool-sort-button`, value)}
                                    >
                                        <Text
                                            style={[styles.sortText, sort === value && styles.sortTextActive]}
                                            {...elementProps(`tool-sort-label`, value)}
                                        >
                                            {value === `featured` ? `✦ Featured` : `↓ A–Z`}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                        </View>
                        {filteredTools.length > 0 ? (
                            <View
                                style={styles.toolGrid}
                                {...elementProps(`tool-card-grid`)}
                            >
                                {filteredTools.map((tool) => {
                                    const saved = savedIds.includes(tool.id);
                                    const colors = toolColors[tool.color] ?? toolColors.blue;
                                    const platformIcon = platformFilters.find((item) => item.id === tool.platform)?.icon;

                                    return (
                                        <View
                                            key={tool.id}
                                            style={[styles.toolCard, { width: cardWidth }]}
                                            {...elementProps(`tool-card`, tool.id)}
                                        >
                                            <View
                                                style={styles.toolCardTop}
                                                {...elementProps(`tool-card-top`, tool.id)}
                                            >
                                                <View
                                                    style={[styles.toolIcon, { backgroundColor: colors.background }]}
                                                    {...elementProps(`tool-card-icon-container`, tool.id)}
                                                >
                                                    <Text
                                                        style={[styles.toolIconText, { color: colors.foreground }]}
                                                        {...elementProps(`tool-card-icon`, tool.id)}
                                                    >
                                                        {toolSymbols[tool.icon]}
                                                    </Text>
                                                </View>
                                                <Pressable
                                                    accessibilityRole={`button`}
                                                    accessibilityState={{ selected: saved }}
                                                    onPress={() => animateChange(() => toggleSaved(tool.id))}
                                                    accessibilityLabel={`${saved ? `Unsave` : `Save`} ${tool.name}`}
                                                    style={({ pressed }) => [styles.saveButton, saved && styles.saveButtonActive, pressed && styles.pressed]}
                                                    {...elementProps(`tool-card-save-button`, tool.id)}
                                                >
                                                    <Text
                                                        style={styles.saveButtonText}
                                                        {...elementProps(`tool-card-save-icon`, tool.id)}
                                                    >
                                                        {saved ? `★` : `☆`}
                                                    </Text>
                                                </Pressable>
                                            </View>
                                            <Text
                                                style={styles.toolName}
                                                {...elementProps(`tool-card-name`, tool.id)}
                                            >
                                                {tool.name}
                                            </Text>
                                            <Text
                                                style={styles.toolDescription}
                                                {...elementProps(`tool-card-description`, tool.id)}
                                            >
                                                {tool.description}
                                            </Text>
                                            <View
                                                style={styles.toolCardBottom}
                                                {...elementProps(`tool-card-bottom`, tool.id)}
                                            >
                                                <Text
                                                    style={styles.toolPlatform}
                                                    {...elementProps(`tool-card-platform`, tool.id)}
                                                >
                                                    {`${platformIcon}  ${tool.platformLabel}`}
                                                </Text>
                                                <Pressable
                                                    accessibilityRole={`link`}
                                                    onPress={() => void openTool(tool.url)}
                                                    accessibilityLabel={`Open ${tool.name}`}
                                                    style={({ pressed }) => [styles.openTool, pressed && styles.pressed]}
                                                    {...elementProps(`tool-card-open-button`, tool.id)}
                                                >
                                                    <Text
                                                        style={styles.openToolText}
                                                        {...elementProps(`tool-card-open-label`, tool.id)}
                                                    >
                                                        {`Open tool ↗`}
                                                    </Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                        ) : (
                            <View
                                style={styles.emptyState}
                                {...elementProps(`tool-directory-empty-state`)}
                            >
                                <Text
                                    style={styles.emptyIcon}
                                    {...elementProps(`tool-directory-empty-icon`)}
                                >
                                    {savedOnly ? `☆` : `⌕`}
                                </Text>
                                <Text
                                    style={styles.emptyTitle}
                                    {...elementProps(`tool-directory-empty-title`)}
                                >
                                    {savedOnly ? `Your toolkit starts here.` : `No tools found just yet.`}
                                </Text>
                                <Text
                                    style={styles.emptyDescription}
                                    {...elementProps(`tool-directory-empty-description`)}
                                >
                                    {savedOnly ? `Save a tool with the star on its card, or clear your filters to see more favorites.` : `Try another search or clear your filters to explore the full collection.`}
                                </Text>
                                <Pressable
                                    accessibilityRole={`button`}
                                    onPress={() => animateChange(resetFilters)}
                                    style={({ pressed }) => [styles.resetButton, pressed && styles.pressed]}
                                    {...elementProps(`tool-directory-reset-button`)}
                                >
                                    <Text
                                        style={styles.resetButtonText}
                                        {...elementProps(`tool-directory-reset-label`)}
                                    >
                                        {`↻ Explore all tools`}
                                    </Text>
                                </Pressable>
                            </View>
                        )}
                    </View>

                    <View
                        style={styles.closingNote}
                        {...elementProps(`toolkit-closing-note`)}
                    >
                        <Text
                            style={styles.sectionEyebrow}
                            {...elementProps(`toolkit-closing-eyebrow`)}
                        >
                            {`A TOOLKIT, WITHOUT THE CLUTTER`}
                        </Text>
                        <Text
                            style={styles.closingTitle}
                            {...elementProps(`toolkit-closing-title`)}
                        >
                            {`Good tools make room for great ideas.`}
                        </Text>
                        <Text
                            style={styles.closingDescription}
                            {...elementProps(`toolkit-closing-description`)}
                        >
                            {`From measuring a shelf to finding the perfect color, the right little tool can make a big difference. Find yours here.`}
                        </Text>
                    </View>
                    <RulerMarquee
                        id={`featured-ruler-marquee`}
                    />
                        </View>
                    ) : (
                        <InformationPage page={page} />
                    )}
                    <View
                        style={styles.footer}
                        {...elementProps(`ruler-tools-footer`)}
                    >
                        <View
                            accessible={false}
                            pointerEvents={`none`}
                            accessibilityElementsHidden
                            style={styles.footerWatermark}
                            importantForAccessibility={`no-hide-descendants`}
                            {...elementProps(`ruler-tools-footer-watermark`)}
                        >
                            <Logo
                                icon
                                light
                                width={180}
                                nativeID={`ruler-tools-footer-watermark-crown`}
                                className={`ruler-tools-footer-watermark-crown`}
                            />
                        </View>
                        <Logo
                            light
                            width={140}
                            nativeID={`ruler-tools-footer-logo`}
                            className={`ruler-tools-footer-logo`}
                        />
                        <Text
                            style={styles.footerText}
                            {...elementProps(`ruler-tools-footer-note`)}
                        >
                            {`One tool to rule them all.\nAn independent directory. Tools belong to their respective makers.`}
                        </Text>
                        <Text
                            style={styles.footerText}
                            {...elementProps(`ruler-tools-footer-copyright`)}
                        >
                            {`© ${year} Ruler Tools. All rights reserved.`}
                        </Text>
                        <Pressable
                            accessibilityRole={`link`}
                            accessibilityLabel={`Visit Piratechs`}
                            onPress={() => void openTool(`https://piratechs.com/`)}
                            style={({ pressed }) => [styles.footerLink, pressed && styles.pressed]}
                            {...elementProps(`ruler-tools-footer-piratechs-link`)}
                        >
                            <Text
                                style={styles.footerLinkText}
                                {...elementProps(`ruler-tools-footer-piratechs-label`)}
                            >
                                {`Made by Piratechs ↗`}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
