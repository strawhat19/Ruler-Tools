import { pagePaths } from '../../shared/routes';
import type { PageId } from '../../shared/NavigationContext';

export type InformationPageId = Extract<PageId, `about` | `terms` | `privacy` | `contact` | `help` | `notFound`>;

interface InformationSection {
    id: string;
    title: string;
    paragraphs: string[];
}

interface InformationContent {
    title: string;
    eyebrow: string;
    description: string;
    icon: `info` | `terms` | `shield`;
    sections: InformationSection[];
}

export const reviewDate = `October 15, 2026`;
export const piratechsUrl = `https://piratechs.com/`;
export const informationLinks = [
    { page: `contact`, label: `Contact`, href: pagePaths.contact, icon: `info`, symbol: `✉` },
    { page: `help`, label: `Help`, href: pagePaths.help, icon: `info`, symbol: `?` },
    { page: `about`, label: `About`, href: pagePaths.about, icon: `info`, symbol: `ⓘ` },
    { page: `terms`, label: `Terms`, href: pagePaths.terms, icon: `terms`, symbol: `≡` },
    { page: `privacy`, label: `Privacy Policy`, href: pagePaths.privacy, icon: `shield`, symbol: `◇` },
] as const;

export const informationContent: Record<InformationPageId, InformationContent> = {
    contact: {
        icon: `info`, title: `Contact & Corrections`, eyebrow: `MAKE THE DIRECTORY BETTER`,
        description: `Found a broken link or have a tool suggestion?`,
        sections: [{ id: `contact`, title: `Contact Piratechs`, paragraphs: [`Use the Piratechs link below for current contact options. Include the tool name, official URL and what needs correcting. Do not send passwords or private account details.`, `In-app submissions are not connected yet. This page does not send or save messages.`] }],
    },
    help: {
        icon: `info`, title: `Your Toolkit Guide`, eyebrow: `A BETTER START`,
        description: `Find the right tool without losing track of your favorites.`,
        sections: [
            { id: `find`, title: `Find a tool`, paragraphs: [`Search by name or task, then filter by category or platform. Listings open the provider’s own website or app store. Always confirm compatibility, pricing and permissions there.`] },
            { id: `save`, title: `Save on this device`, paragraphs: [`Star a listing to save it on this device. Saved Tools shows these selections. These are not synced to an account. Toolkit drafts organize selections for this session only.`] },
            { id: `account`, title: `Accounts are not connected yet`, paragraphs: [`Google sign-in, email accounts, public sharing and owner analytics are planned. Disabled controls and design previews do not create accounts, publish data or collect analytics.`] },
        ],
    },
    notFound: {
        icon: `info`, title: `Page Not Found`, eyebrow: `LET’S FIND YOUR WAY`,
        description: `This address does not match a Ruler Tools page. Use Explore to return to the directory.`,
        sections: [],
    },
    about: {
        icon: `info`,
        title: `About Ruler Tools`,
        eyebrow: `A LITTLE CLARITY GOES A LONG WAY`,
        description: `Useful tools, brought together in one place. Find a calculator, measure a space, explore a color, or make everyday work a little easier.`,
        sections: [
            {
                id: `directory`,
                title: `A directory for everyday ideas`,
                paragraphs: [
                    `Ruler Tools is an independent directory of websites, browser extensions, and mobile apps. Browse tools for calculations, measuring, levels and angles, conversions, design, and development.`,
                    `Each listing points to a tool's official website or store listing. The tools belong to their respective makers; inclusion in this directory does not imply a partnership or endorsement by those makers.`,
                ],
            },
            {
                id: `toolkit`,
                title: `Build your own little toolkit`,
                paragraphs: [
                    `Search the catalog, choose a category or platform, and use the star on a tool to save it for later. Your saved selections stay on the device and browser where you made them. No account is required.`,
                    `Tool availability, features, pricing, and compatibility can change. Check the provider's current details before installing a tool or relying on its results.`,
                ],
            },
            {
                id: `piratechs`,
                title: `Connect with Piratechs`,
                paragraphs: [
                    `Have a question, a correction, or a useful tool to suggest? Visit Piratechs to find its current contact options and explore more of its work.`,
                ],
            },
        ],
    },
    terms: {
        icon: `terms`,
        title: `Terms of Use`,
        eyebrow: `A FEW GROUND RULES`,
        description: `These terms explain how to use the Ruler Tools directory and what to expect when following links to other services.`,
        sections: [
            {
                id: `using-directory`,
                title: `Using the directory`,
                paragraphs: [
                    `By using Ruler Tools, you agree to these terms. If you do not agree, please stop using the directory. Ruler Tools helps you discover third-party tools; it does not perform or validate the work those tools do.`,
                    `Use the directory lawfully and responsibly. Do not interfere with its operation, attempt unauthorized access, distribute harmful code through it, or use its content to misrepresent an affiliation with Ruler Tools or a listed provider.`,
                ],
            },
            {
                id: `third-party-tools`,
                title: `Third-party tools and services`,
                paragraphs: [
                    `External websites, extensions, apps, and app stores are operated by their respective providers. Their terms, privacy policies, permissions, purchases, and support arrangements apply when you use them.`,
                    `A listing is provided for discovery and does not guarantee a tool's quality, safety, accuracy, availability, or suitability. Review the provider's information and independently check results when accuracy matters. Ruler Tools does not handle accounts or payments for these services.`,
                ],
            },
            {
                id: `content-ownership`,
                title: `Content and ownership`,
                paragraphs: [
                    `Original Ruler Tools source code and documentation are available under the MIT License, copyright 2026 strawhat19. You may use, modify, and distribute that code, including commercially, subject to the license's copyright and permission notice requirements. Dependencies, fonts, and other third-party materials retain their own licenses.`,
                    `Third-party names, trademarks, and tools remain the property of their respective owners. Your use of the directory does not grant ownership of its branding or of a listed provider's intellectual property. Respect applicable rights when using or sharing content.`,
                ],
            },
            {
                id: `availability-liability`,
                title: `Availability and responsibility`,
                paragraphs: [
                    `The directory and catalog information are provided as available, without warranties to the extent permitted by applicable law. Listings may become outdated, links may stop working, and the directory may change or be unavailable.`,
                    `To the extent permitted by applicable law, Ruler Tools is not liable for losses resulting from use of the directory or third-party tools. Nothing in these terms excludes or limits rights or liability that cannot legally be excluded or limited.`,
                ],
            },
            {
                id: `changes-questions`,
                title: `Changes and questions`,
                paragraphs: [
                    `These terms may be updated as the directory changes. The review date identifies the current version. For questions about the directory or these terms, visit Piratechs for its current contact options.`,
                ],
            },
        ],
    },
    privacy: {
        icon: `shield`,
        title: `Privacy Policy`,
        eyebrow: `YOUR TOOLKIT, YOUR DEVICE`,
        description: `This policy describes the information used by the current Ruler Tools directory, your saved selections, and the services your browser connects to.`,
        sections: [
            {
                id: `directory-information`,
                title: `Information used by the directory`,
                paragraphs: [
                    `Ruler Tools does not ask you to create an account or provide a name, email address, or payment details. Searching and filtering the catalog happen in the app using its included tool listings.`,
                    `Your search text, category, platform, sorting choice, and saved-only filter are kept in the current app session. The directory does not send these choices to a search service or account backend.`,
                ],
            },
            {
                id: `saved-tools`,
                title: `Saved tools and device storage`,
                paragraphs: [
                    `When you save a tool, the directory stores that selection on your device so it can restore your toolkit when you return. Saved selections are not synchronized to an account or shared between devices by the directory.`,
                    `You can remove individual selections by turning off their stars. Clearing this site's stored data in your browser, or clearing the native app's data using your device settings, removes the saved selections. If storage is unavailable, saving may only last for the current session.`,
                ],
            },
            {
                id: `web-connections`,
                title: `Web hosting and fonts`,
                paragraphs: [
                    `Loading the web version makes requests to the service hosting the site. That service may process routine connection information, such as your IP address, browser details, and requested pages, to deliver and operate the site. Its logging and retention practices depend on the deployed hosting provider.`,
                    `The web version loads fonts from Google Fonts through fonts.googleapis.com and fonts.gstatic.com. Your browser connects to Google to request those files, which exposes routine connection information to Google. Google's own privacy policy applies to its handling of those requests.`,
                ],
            },
            {
                id: `external-links`,
                title: `Links to other services`,
                paragraphs: [
                    `Opening a tool, an app-store listing, or Piratechs takes you to another service. Those services may collect information, use cookies, request permissions, or require an account under their own policies. Review their privacy notices before providing information or installing an app or extension.`,
                ],
            },
            {
                id: `your-choices`,
                title: `Your choices`,
                paragraphs: [
                    `You can browse without saving tools, remove saved selections, and clear stored site or app data at any time. Browser privacy settings can also control external requests and stored data, although blocking resources may affect how the site looks or works.`,
                ],
            },
            {
                id: `policy-questions`,
                title: `Policy updates and questions`,
                paragraphs: [
                    `This policy may change when the directory's features or services change. The review date identifies the current version. For privacy questions about Ruler Tools, visit Piratechs for its current contact options.`,
                ],
            },
        ],
    },
};
