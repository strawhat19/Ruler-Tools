import './AccountPreview.scss';
import Icon from '../Icon/Icon';
import { useAccountPreview, useAccountPreviewFocus } from './AccountPreview.logic';

export default function AccountPreview() {
    const { notice, heading, description, dialogMode, closeAccount, previewSignIn } = useAccountPreview();
    const dialog = useAccountPreviewFocus(dialogMode, closeAccount);

    if (!dialogMode) return null;

    return (
        <div
            id={`account-preview-backdrop`}
            className={`account-preview-backdrop`}
            onClick={(event) => {
                if (event.target === event.currentTarget) closeAccount();
            }}
        >
            <div
                ref={dialog}
                tabIndex={-1}
                role={`dialog`}
                aria-modal={true}
                id={`account-preview-dialog`}
                className={`account-preview-dialog`}
                aria-labelledby={`account-preview-title`}
                aria-describedby={`account-preview-description account-preview-notice`}
            >
                <button
                    type={`button`}
                    onClick={closeAccount}
                    id={`account-preview-close`}
                    aria-label={`Close account preview`}
                    className={`account-preview-close`}
                >
                    <Icon
                        size={20}
                        name={`x`}
                        id={`account-preview-close-icon`}
                        className={`account-preview-close-icon`}
                    />
                </button>
                <div id={`account-preview-emblem`} className={`account-preview-emblem`}>
                    <Icon
                        size={26}
                        id={`account-preview-emblem-icon`}
                        className={`account-preview-emblem-icon`}
                        name={dialogMode === `sign-up` ? `user-plus` : `log-in`}
                    />
                </div>
                <h2 id={`account-preview-title`} className={`account-preview-title`}>
                    {heading}
                </h2>
                <p id={`account-preview-description`} className={`account-preview-description`}>
                    {description}
                </p>
                <p id={`account-preview-notice`} className={`account-preview-notice`}>
                    {notice}
                </p>
                <button
                    type={`button`}
                    onClick={previewSignIn}
                    id={`account-preview-toolkit-button`}
                    className={`account-preview-toolkit-button`}
                >
                    <Icon
                        size={18}
                        name={`bookmark`}
                        id={`account-preview-toolkit-icon`}
                        className={`account-preview-toolkit-icon`}
                    />
                    <span id={`account-preview-toolkit-label`} className={`account-preview-toolkit-label`}>
                        {`Preview Toolkits`}
                    </span>
                </button>
            </div>
        </div>
    );
}
