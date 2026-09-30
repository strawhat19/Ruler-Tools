import { useRef, useEffect } from 'react';
import { useAccount } from '../../shared/AccountContext';

export function useAccountPreview() {
    const account = useAccount();
    const heading = account.dialogMode === `sign-up` ? `Sign Up` : `Sign In`;
    const description = `Accounts are coming soon. You can preview Toolkits in the meantime.`;
    const notice = `Preview only. No account is created, and no account information is entered or stored.`;

    return { ...account, heading, description, notice };
}

export function useAccountPreviewFocus(mode: string | null, close: () => void) {
    const dialog = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mode) return;

        const previousFocus = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        const panel = dialog.current;
        const focusable = () => Array.from(panel?.querySelectorAll<HTMLElement>(
            `button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]`,
        ) ?? []);

        document.body.style.overflow = `hidden`;
        focusable()[0]?.focus();

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === `Escape`) {
                event.preventDefault();
                close();
                return;
            }

            if (event.key !== `Tab`) return;

            const items = focusable();
            const first = items[0];
            const last = items[items.length - 1];
            const active = document.activeElement;

            if (!first || !last) {
                event.preventDefault();
                panel?.focus();
            } else if (!panel?.contains(active) || (event.shiftKey ? active === first : active === last)) {
                event.preventDefault();
                (event.shiftKey ? last : first).focus();
            }
        };

        const containFocus = (event: FocusEvent) => {
            if (panel && event.target instanceof Node && !panel.contains(event.target)) {
                (focusable()[0] ?? panel).focus();
            }
        };

        document.addEventListener(`keydown`, onKeyDown);
        document.addEventListener(`focusin`, containFocus);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener(`keydown`, onKeyDown);
            document.removeEventListener(`focusin`, containFocus);
            if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
                previousFocus.focus();
            } else {
                document.getElementById(`header-saved`)?.focus();
            }
        };
    }, [mode, close]);

    return dialog;
}
