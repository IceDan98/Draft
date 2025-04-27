// script.js v8.8 - Rename Create Lobby button to Create Draft
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Fully Loaded. Initializing App v8.8..."); // Version Updated

    // --- Language State & Translations ---
    let currentLanguage = localStorage.getItem('language') || 'ru';
    const translations = {
        ru: {
            // Home Page
            homeTitle: "LoL Wild-Rift Drafter",
            team1Placeholder: "Команда 1",
            team2Placeholder: "Команда 2",
            createLobbyButton: "Создать Драфт", // MODIFIED: Text changed
            lobbyModalTitle: "",
            selectRolePrompt: "",
            judgeRoleButton: "Судья",
            team1RoleButton: "Команда 1",
            team2RoleButton: "Команда 2",
            lobbyLinkForRole: "Ссылка для роли '{role}':",
            copyButton: "Копировать",
            openButton: "Открыть",
            closeModalButton: "Закрыть",
            linkCopiedMsg: "Ссылка скопирована!",
            linkCopiedFallbackMsg: "Ссылка скопирована (fallback)",
            copyErrorMsg: "Ошибка копирования",
            // Top Right Buttons
            adminButton: "Админ",
            settingsButtonTitle: "Настройки",
            // Draft Page - Top Bar
            blueTeamDefaultName: "Синяя Команда",
            redTeamDefaultName: "Красная Команда",
            timerStartDraftTitle: "Начать драфт",
            timerConfirmActionTitle: "Подтвердить",
            timerDraftRunningTitle: "Драфт идет...",
            timerDraftCompleteText: "Драфт Завершен!",
            timerDraftCompleteTitle: "Драфт завершен",
            timerAriaLabelStart: "Таймер / Старт драфта",
            timerAriaLabelConfirm: "Подтвердить выбор/бан",
            timerAriaLabelRunning: "Таймер: {time}",
            // Draft Page - Search/Controls
            searchPlaceholder: "Поиск...",
            searchAriaLabel: "Поиск чемпиона",
            resetTitle: "Полный сброс",
            resetAriaLabel: "Полный сброс",
            roleFilterGroupAriaLabel: "Фильтр по ролям",
            roleFilterAllTitle: "Фильтр: Все",
            roleFilterAllText: "ВСЕ",
            roleFilterTopTitle: "Фильтр: Топ",
            roleFilterTopText: "ТОП",
            roleFilterJungleTitle: "Фильтр: Лес",
            roleFilterJungleText: "ЛЕС",
            roleFilterMidTitle: "Фильтр: Мид",
            roleFilterMidText: "МИД",
            roleFilterADCTitle: "Фильтр: АДК",
            roleFilterADCText: "АДК",
            roleFilterSupportTitle: "Фильтр: Поддержка",
            roleFilterSupportText: "САП",
            nextDraftTitle: "След. драфт",
            nextDraftAriaLabel: "Перейти к следующему драфту",
            swapTeamsTitle: "Смена сторон",
            swapTeamsAriaLabel: "Поменять команды местами",
            undoTitle: "Отменить действие",
            undoAriaLabel: "Отменить действие",
            returnHomeTitle: "Вернуться на главную",
            returnHomeAriaLabel: "Вернуться на главную",
            // Draft Page - Slots & Grid
            blueBanAriaLabel: "Синий бан {n}",
            redBanAriaLabel: "Красный бан {n}",
            bluePickAriaLabel: "Синий пик {n}",
            redPickAriaLabel: "Красный пик {n}",
            championGridAriaLabel: "Сетка выбора чемпионов",
            pickSlotNicknamePlaceholder: "Игрок",
            // Draft Page - Global Bans
            globalBanTitle: "{name} (Заблокирован {team} в пред. игре)",
            globalBanTeamBlue: "синими",
            globalBanTeamRed: "красными",
            // Draft Page - Misc
            loadingChampions: "Загрузка данных чемпионов...",
            // Status Messages
            errorLoadingVersions: "Ошибка загрузки версий: {status}",
            errorLoadingDataEN: "Ошибка загрузки данных EN: {status}",
            errorLoadingDataRU: "Не удалось загрузить данные RU: {status}. Используются английские имена.",
            errorLoadingChampions: "Ошибка загрузки данных чемпионов: {error}",
            errorInitCritical: "Критическая ошибка инициализации: {error}",
            errorInitDraftElements: "Ошибка UI: Элементы драфта не найдены.",
            championAlreadySelected: "{name} уже выбран или заблокирован.",
            actionUndone: "Действие отменено",
            resetFullConfirmation: "Вы уверены, что хотите полностью сбросить драфт (включая глобальные баны)?",
            resetFullComplete: "Драфт полностью сброшен.",
            resetCurrentConfirmation: "Остановить текущий драфт и очистить пики/баны этой игры{global}?",
            resetCurrentGlobalPart: " (включая глобальные)",
            resetCurrentComplete: "Пики/баны текущей игры{global} очищены.",
            resetCurrentCompleteKeptGlobal: "Текущая игра очищена.",
            swapSuccess: "Команды поменялись местами (пики/баны/ники/глоб. баны).",
            swapDuringDraftError: "Нельзя менять команды местами во время активного драфта.",
            swapError: "Ошибка при смене команд.",
            nextDraftComplete: "Переход к следующему драфту. Пики предыдущей игры заблокированы.",
            nextDraftErrorNotComplete: "Драфт не завершен. Завершите его перед переходом к следующему.",
            timerEndedPickConfirm: "Время вышло! Авто-подтверждение: {name}",
            timerEndedPickClear: "Время вышло! Пик не выбран. Драфт очищен.",
            timerEndedBanSkip: "Время вышло! Бан пропущен.",
            swapPickSelect: "Нажмите для выбора обмена",
            swapConfirm: "Обмен: {champ1} <-> {champ2}",
            // Permissions denied messages
            permDeniedReset: "Нет прав для сброса драфта.",
            permDeniedUndo: "Нет прав для отмены этого действия.",
            permDeniedSwap: "Нет прав для смены сторон.",
            permDeniedNextDraft: "Нет прав для перехода к следующему драфту.",
            permDeniedStartDraft: "Нет прав для старта драфта.",
            permDeniedPreviewPick: "Нет прав на выбор чемпиона.",
            permDeniedPreviewBan: "Нет прав на бан чемпиона.",
            permDeniedConfirm: "Нет прав на подтверждение действия.",
            permDeniedRoleFilter: "Нет прав на использование фильтров ролей.",
            permDeniedEditName: "Нет прав на изменение имени команды.",
            permDeniedEditScore: "Нет прав на изменение счета.",
            permDeniedEditNickname: "Нет прав на изменение никнейма.",
            // Settings
            settingsModalTitle: "Настройки Драфта",
            settingsTimerLabel: "Время таймера:",
            settingsDraftModeLabel: "Режим драфта:",
            draftModeNormal: "Обычный",
            draftModeFearless: "Fearless",
            settingsThemeLabel: "Тема:",
            themeLight: "Светлая",
            themeDark: "Темная",
            settingsLanguageLabel: "Язык:",
            languageRU: "Русский",
            languageEN: "English",
            settingsChampionListLabel: "Список чемпионов:",
            championListLoL: "League of Legends",
            championListWR: "Wild Rift",
            // Homepage BG
            errorLoadingSplashArt: "Ошибка загрузки фона: {error}",
        },
        en: { // --- English translations ---
            // Home Page
            homeTitle: "LoL Wild-Rift Drafter",
            team1Placeholder: "Team 1 Name",
            team2Placeholder: "Team 2 Name",
            createLobbyButton: "Create Draft", // MODIFIED: Text changed
            lobbyModalTitle: "",
            selectRolePrompt: "",
            judgeRoleButton: "Judge",
            team1RoleButton: "Team 1",
            team2RoleButton: "Team 2",
            lobbyLinkForRole: "Link for '{role}':",
            copyButton: "Copy",
            openButton: "Open",
            closeModalButton: "Close",
            linkCopiedMsg: "Link copied!",
            linkCopiedFallbackMsg: "Link copied (fallback)",
            copyErrorMsg: "Copy failed",
            // Top Right Buttons
            adminButton: "Admin",
            settingsButtonTitle: "Settings",
            // Draft Page - Top Bar
            blueTeamDefaultName: "Blue Team",
            redTeamDefaultName: "Red Team",
            timerStartDraftTitle: "Start Draft",
            timerConfirmActionTitle: "Confirm",
            timerDraftRunningTitle: "Draft in progress...",
            timerDraftCompleteText: "Draft Complete!",
            timerDraftCompleteTitle: "Draft complete",
            timerAriaLabelStart: "Timer / Start Draft",
            timerAriaLabelConfirm: "Confirm Pick/Ban",
            timerAriaLabelRunning: "Timer: {time}",
            // Draft Page - Search/Controls
            searchPlaceholder: "Search...",
            searchAriaLabel: "Search champion",
            resetTitle: "Full Reset",
            resetAriaLabel: "Full Reset",
            roleFilterGroupAriaLabel: "Filter by role",
            roleFilterAllTitle: "Filter: All",
            roleFilterAllText: "ALL",
            roleFilterTopTitle: "Filter: Top",
            roleFilterTopText: "TOP",
            roleFilterJungleTitle: "Filter: Jungle",
            roleFilterJungleText: "JGL",
            roleFilterMidTitle: "Filter: Mid",
            roleFilterMidText: "MID",
            roleFilterADCTitle: "Filter: ADC",
            roleFilterADCText: "ADC",
            roleFilterSupportTitle: "Filter: Support",
            roleFilterSupportText: "SUP",
            nextDraftTitle: "Next Draft",
            nextDraftAriaLabel: "Proceed to next draft",
            swapTeamsTitle: "Swap Teams",
            swapTeamsAriaLabel: "Swap team sides",
            undoTitle: "Undo Action",
            undoAriaLabel: "Undo Action",
            returnHomeTitle: "Return to Home",
            returnHomeAriaLabel: "Return to Home",
            // Draft Page - Slots & Grid
            blueBanAriaLabel: "Blue Ban {n}",
            redBanAriaLabel: "Red Ban {n}",
            bluePickAriaLabel: "Blue Pick {n}",
            redPickAriaLabel: "Red Pick {n}",
            championGridAriaLabel: "Champion Selection Grid",
            pickSlotNicknamePlaceholder: "Player",
            // Draft Page - Global Bans
            globalBanTitle: "{name} (Banned by {team} in previous game)",
            globalBanTeamBlue: "Blue",
            globalBanTeamRed: "Red",
            // Draft Page - Misc
            loadingChampions: "Loading champion data...",
            // Status Messages
            errorLoadingVersions: "Error loading versions: {status}",
            errorLoadingDataEN: "Error loading EN data: {status}",
            errorLoadingDataRU: "Failed to load RU data: {status}. Using English names.",
            errorLoadingChampions: "Error loading champion data: {error}",
            errorInitCritical: "Critical initialization error: {error}",
            errorInitDraftElements: "UI Error: Draft elements not found.",
            championAlreadySelected: "{name} is already selected or banned.",
            actionUndone: "Action undone",
            resetFullConfirmation: "Are you sure you want to fully reset the draft (including global bans)?",
            resetFullComplete: "Draft fully reset.",
            resetCurrentConfirmation: "Stop the current draft and clear this game's picks/bans{global}?",
            resetCurrentGlobalPart: " (including global)",
            resetCurrentComplete: "Current game's picks/bans{global} cleared.",
            resetCurrentCompleteKeptGlobal: "Current game cleared.",
            swapSuccess: "Teams swapped (picks/bans/nicknames/global bans).",
            swapDuringDraftError: "Cannot swap teams during an active draft.",
            swapError: "Error swapping teams.",
            nextDraftComplete: "Moving to the next draft. Previous game's picks are banned.",
            nextDraftErrorNotComplete: "Draft is not complete. Finish it before proceeding to the next one.",
            timerEndedPickConfirm: "Time ran out! Auto-confirming: {name}",
            timerEndedPickClear: "Time ran out! Pick not selected. Draft cleared.",
            timerEndedBanSkip: "Time ran out! Ban skipped.",
            swapPickSelect: "Click to select for swap",
            swapConfirm: "Swapped: {champ1} <-> {champ2}",
             // Permissions denied messages
            permDeniedReset: "No permission to reset draft.",
            permDeniedUndo: "No permission to undo this action.",
            permDeniedSwap: "No permission to swap sides.",
            permDeniedNextDraft: "No permission to proceed to next draft.",
            permDeniedStartDraft: "No permission to start draft.",
            permDeniedPreviewPick: "No permission to pick champion.",
            permDeniedPreviewBan: "No permission to ban champion.",
            permDeniedConfirm: "No permission to confirm action.",
            permDeniedRoleFilter: "No permission to use role filters.",
            permDeniedEditName: "No permission to edit team name.",
            permDeniedEditScore: "No permission to edit score.",
            permDeniedEditNickname: "No permission to edit nickname.",
            // Settings
            settingsModalTitle: "Draft Settings",
            settingsTimerLabel: "Timer Duration:",
            settingsDraftModeLabel: "Draft Mode:",
            draftModeNormal: "Normal",
            draftModeFearless: "Fearless",
            settingsThemeLabel: "Theme:",
            themeLight: "Light",
            themeDark: "Dark",
            settingsLanguageLabel: "Language:",
            languageRU: "Русский",
            languageEN: "English",
            settingsChampionListLabel: "Champion List:",
            championListLoL: "League of Legends",
            championListWR: "Wild Rift",
             // Homepage BG
            errorLoadingSplashArt: "Error loading background: {error}",
        }
    };

    // --- Page Elements ---
    const appContainer = document.getElementById('app-container');
    const homePage = document.getElementById('homePage');
    const draftPage = document.getElementById('draftPage');
    const adminButton = document.getElementById('adminButton');
    const settingsButton = document.getElementById('settingsButton');
    const team1NameInput = document.getElementById('team1NameInput');
    const team2NameInput = document.getElementById('team2NameInput');
    const createLobbyButton = document.getElementById('createLobbyButton');
    const lobbyModal = document.getElementById('lobbyModal');
    const lobbyModalContent = document.getElementById('lobbyModalContent');
    const lobbyModalCloseButton = document.getElementById('lobbyModalCloseButton');
    const lobbyLinksContainer = document.getElementById('lobbyLinksContainer');
    const settingsModal = document.getElementById('settingsModal');
    const settingsModalCloseButton = document.getElementById('settingsModalCloseButton');
    const timerDurationSetting = document.getElementById('timerDurationSetting');
    const draftModeSetting = document.getElementById('draftModeSetting');
    const themeSetting = document.getElementById('themeSetting');
    const languageSetting = document.getElementById('languageSetting');
    const championListSetting = document.getElementById('championListSetting');
    let loadingIndicator, mainLayout, championGridElement, resetButton, undoButton, timerDisplay, championSearch, bluePicksContainer, redPicksContainer, blueColumn, redColumn, filterButtons, nextDraftButton, swapTeamsButton, globallyBannedDisplay, globalBansBlueContainer, globalBansRedContainer, championTooltip, statusMessage, blueTeamNameH2, redTeamNameH2, blueScoreEl, redScoreEl, returnHomeButton, roleFilterButtonsContainer;

    // --- State Variables ---
    let currentPage = 'home';
    let isDraftInitialized = false;
    let currentUserRole = null;
    let userTeamSide = null;
    let currentTheme = localStorage.getItem('theme') || 'dark';
    let draftTimerDuration = parseInt(localStorage.getItem('timerDuration') || '30', 10);
    let draftMode = localStorage.getItem('draftMode') || 'fearless';
    let championListType = localStorage.getItem('championListType') || 'lol';
    let allChampionsData = { en: null, ru: null };
    let processedChampions = [];
    let wildRiftChampions = new Set(['Aatrox', 'Ahri', 'Akali', 'Akshan', 'Alistar', 'Amumu', 'Annie', 'Ashe', 'AurelionSol', 'Blitzcrank', 'Brand', 'Braum', 'Caitlyn', 'Camille', 'Corki', 'Darius', 'Diana', 'DrMundo', 'Draven', 'Ekko', 'Evelynn', 'Ezreal', 'Fiddlesticks', 'Fiora', 'Fizz', 'Galio', 'Garen', 'Gnar', 'Gragas', 'Graves', 'Gwen', 'Hecarim', 'Heimerdinger', 'Irelia', 'Janna', 'JarvanIV', 'Jax', 'Jayce', 'Jhin', 'Jinx', 'Kaisa', 'Kalista', 'Karma', 'Kassadin', 'Katarina', 'Kayle', 'Kayn', 'Kennen', 'Khazix', 'Kindred', 'LeeSin', 'Leona', 'Lillia', 'Lissandra', 'Lucian', 'Lulu', 'Lux', 'Malphite', 'Maokai', 'MasterYi', 'Milio', 'MissFortune', 'Mordekaiser', 'Morgana', 'Nami', 'Nasus', 'Nautilus', 'Nilah', 'Nunu', 'Olaf', 'Orianna', 'Ornn', 'Pantheon', 'Poppy', 'Pyke', 'Rakan', 'Rammus', 'Renekton', 'Rengar', 'Riven', 'Rumble', 'Samira', 'Senna', 'Seraphine', 'Sett', 'Shen', 'Shyvana', 'Singed', 'Sion', 'Sivir', 'Sona', 'Soraka', 'Swain', 'Syndra', 'Talon', 'Teemo', 'Thresh', 'Tristana', 'Tryndamere', 'TwistedFate', 'Twitch', 'Urgot', 'Varus', 'Vayne', 'Veigar', 'Vex', 'Vi', 'Viego', 'Viktor', 'Vladimir', 'Volibear', 'Warwick', 'MonkeyKing', 'Xayah', 'XinZhao', 'Yasuo', 'Yone', 'Yuumi', 'Zac', 'Zed', 'Zeri', 'Ziggs', 'Zoe', 'Zyra', 'Ryze', 'Nocturne', 'Zilean', 'Renata', 'Belveth', 'Naafiri', 'Briar', 'Hwei', 'Smolder']);
    let isWildRiftModeActive = championListType === 'wildrift';
    let ddragonVersion = 'latest';
    let baseIconUrl = '';
    let baseSplashUrl = '';
    let currentStep = 0;
    let selectedChampions = new Set();
    let draftHistory = [];
    let pickNicknames = {}; // Stores { slotId: nickname }
    let isDraftComplete = false;
    let isDraftStarted = false;
    let selectedSwapSlotId = null;
    let timerInterval = null;
    let timerSeconds = draftTimerDuration;
    let currentRoleFilter = 'All';
    let previewedChampion = null;
    let statusTimeout = null;
    let globallyDisabledChampions = new Set();
    let globalBanHistory = [];
    let homepageBgInterval = null;
    let isDataLoading = false;
    let initialPageDetermined = false;

    // --- Permissions Map ---
    const permissions = {
        admin: { editTeamName: true, editScore: true, resetDraft: true, startDraft: true, editNicknames: true, nextDraft: true, pickChampion: true, banChampion: true, undoAction: true, useRoleFilters: true, returnHome: true, nextOrSwap: true, confirmOrStart: true },
        judge: { editTeamName: true, editScore: true, resetDraft: true, startDraft: true, editNicknames: true, nextDraft: true, pickChampion: false, banChampion: false, undoAction: false, useRoleFilters: false, returnHome: true, nextOrSwap: true, confirmOrStart: true },
        team1: { editTeamName: false, editScore: false, resetDraft: false, startDraft: false, editNicknames: false, nextDraft: false, pickChampion: true, banChampion: true, undoAction: true, useRoleFilters: true, returnHome: true, nextOrSwap: false, confirmOrStart: true },
        team2: { editTeamName: false, editScore: false, resetDraft: false, startDraft: false, editNicknames: false, nextDraft: false, pickChampion: true, banChampion: true, undoAction: true, useRoleFilters: true, returnHome: true, nextOrSwap: false, confirmOrStart: true },
        default: { editTeamName: false, editScore: false, resetDraft: false, startDraft: false, editNicknames: false, nextDraft: false, pickChampion: false, banChampion: false, undoAction: false, useRoleFilters: false, returnHome: true, nextOrSwap: false, confirmOrStart: false }
    };

    // --- Helper Functions ---
    const debounce = (func, wait) => { let timeout; return function executedFunction(...args) { const later = () => { clearTimeout(timeout); func(...args); }; clearTimeout(timeout); timeout = setTimeout(later, wait); }; };
    const showStatusMessage = (key, duration = 3000, replacements = {}) => {
        if (!statusMessage) statusMessage = document.getElementById('statusMessage');
        if (!statusMessage) { console.warn("Status message element not found!"); return; }
        let message = translations[currentLanguage]?.[key] || key;
        for (const placeholder in replacements) {
            message = message.replace(`{${placeholder}}`, replacements[placeholder]);
        }
        statusMessage.textContent = message;
        statusMessage.classList.add('visible');
        clearTimeout(statusTimeout);
        statusTimeout = setTimeout(() => { statusMessage.classList.remove('visible'); }, duration);
    };
    const getChampionById = (id) => processedChampions.find(champ => champ.id === id);
    function hasPermission(action, team = null) {
        const rolePerms = permissions[currentUserRole] || permissions.default;
        const isAdminOrJudge = currentUserRole === 'admin' || currentUserRole === 'judge';
        const hasBasicPermission = rolePerms[action];

        if (!hasBasicPermission) return false;
        if (isAdminOrJudge) return true;
        if ((action === 'pickChampion' || action === 'banChampion' || action === 'undoAction' || action === 'confirmOrStart') && team) {
             return userTeamSide === team;
        }
        if (action === 'useRoleFilters' || action === 'returnHome') {
            return currentUserRole === 'team1' || currentUserRole === 'team2';
        }
        // --- ТЗ №5: Уточнение для кнопок next/swap ---
        // Разрешаем nextDraft только админу/судье
        if (action === 'nextDraft') return isAdminOrJudge;
        // Разрешаем swapTeams (nextOrSwap) только админу/судье
        if (action === 'nextOrSwap') return isAdminOrJudge;
        // Для остальных действий, если не специфично для команды, возвращаем базовое разрешение
        if (!team && action !== 'pickChampion' && action !== 'banChampion' && action !== 'undoAction' && action !== 'confirmOrStart') {
            return hasBasicPermission;
        }

        return false; // Default deny
    }
     async function copyToClipboard(text) {
         if (!navigator.clipboard) {
             try {
                 const textArea = document.createElement("textarea");
                 textArea.value = text;
                 textArea.style.position = "fixed"; document.body.appendChild(textArea);
                 textArea.focus(); textArea.select(); document.execCommand('copy');
                 document.body.removeChild(textArea);
                 showStatusMessage("linkCopiedFallbackMsg", 1500);
             } catch (err) { console.error('Fallback copy failed:', err); showStatusMessage("copyErrorMsg", 2000); }
             return;
         }
         try {
             await navigator.clipboard.writeText(text);
             showStatusMessage("linkCopiedMsg", 1500);
         } catch (err) { console.error('Async clipboard copy failed:', err); showStatusMessage("copyErrorMsg", 2000); }
     }

    // --- Settings Controlled Functions (Theme, Language) ---
    function applyTheme(theme) {
        console.log(`Applying theme: ${theme}`);
        document.documentElement.dataset.theme = theme;
        currentTheme = theme;
        localStorage.setItem('theme', theme);
        updateSettingsUI();
        updateUIText(currentLanguage);
     }
    function applyLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('language', currentLanguage);
        console.log(`Language switched to: ${currentLanguage}`);
        document.documentElement.lang = currentLanguage;
        if (processedChampions.length > 0) {
             processedChampions.sort((a, b) => a.name[currentLanguage].localeCompare(b.name[currentLanguage], currentLanguage));
        }
        updateUIText(currentLanguage);
        updateSettingsUI();
        if (isDraftInitialized) {
            updateDraftUI();
        }
     }

    // --- Update UI Text Function ---
    function updateUIText(lang) {
        const elements = document.querySelectorAll('[data-lang-key]');
        const langTranslations = translations[lang] || translations.en;
        elements.forEach(el => {
            const key = el.dataset.langKey;
            const target = el.dataset.langTarget || 'textContent';
            let translation = langTranslations[key];
            if (translation === undefined) {
                 console.warn(`Missing translation for key "${key}" in language "${lang}"`);
                 translation = translations[lang === 'ru' ? 'en' : 'ru']?.[key] || key;
            }
            if ((key === 'lobbyModalTitle' || key === 'selectRolePrompt') && translation === "") {
                 if (target === 'textContent') el.textContent = '';
                 return;
            }
            if (target === 'aria-label' && el.dataset.ariaValue && typeof translation === 'string') {
                translation = translation.replace(/{\w+}/g, el.dataset.ariaValue);
            } else if (target === 'title' && el.dataset.titleValue && typeof translation === 'string') {
                translation = translation.replace(/{\w+}/g, el.dataset.titleValue);
            }
            if (target === 'textContent') {
                const textSpan = el.querySelector('span[data-lang-text]');
                if (textSpan) {
                    textSpan.textContent = translation;
                } else {
                    const hasDirectText = Array.from(el.childNodes).some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '');
                    // Ensure button text is updated correctly
                    if (el.tagName === 'BUTTON' && key === 'createLobbyButton') {
                         el.textContent = translation;
                    } else if (hasDirectText || el.children.length === 0 || ['STRONG', 'LABEL', 'H1', 'H2', 'P'].includes(el.tagName)) {
                       el.textContent = translation;
                    }
                }
            } else if (target === 'placeholder') {
                el.placeholder = translation;
            } else if (target === 'title') {
                el.title = translation;
            } else if (target === 'aria-label') {
                 el.setAttribute('aria-label', translation);
            } else {
                el.setAttribute(target, translation);
            }
        });
        const nicknamePlaceholderText = langTranslations.pickSlotNicknamePlaceholder || 'Player';
        document.querySelectorAll('.nickname-input').forEach(input => {
            input.dataset.placeholder = nicknamePlaceholderText;
        });
        if (settingsButton) {
            settingsButton.title = langTranslations.settingsButtonTitle || 'Settings';
        }
         if (timerDisplay && isDraftInitialized) {
             updateTimerDisplayContent(langTranslations);
         }
         if (nextDraftButton && swapTeamsButton && isDraftInitialized) {
             updateNextSwapButtonContent(langTranslations);
         }
        if (isDraftInitialized) {
             displayChampions();
        }
     }
     function updateTimerDisplayContent(langTranslations) {
         if (!timerDisplay) return;
         // --- ТЗ v3: Animation logic moved to updateDraftUI ---
         // Remove animation class here initially, it will be added back in updateDraftUI if needed
         timerDisplay.classList.remove('timer-awaiting-confirmation');

         if (previewedChampion && isDraftStarted && !isDraftComplete) {
             timerDisplay.title = langTranslations.timerConfirmActionTitle;
             timerDisplay.setAttribute('aria-label', langTranslations.timerAriaLabelConfirm);
             timerDisplay.textContent = timerInterval ? formatTime(timerSeconds) : langTranslations.timerConfirmActionTitle;
             // --- ТЗ v3: Animation logic moved to updateDraftUI ---
             // timerDisplay.classList.add('timer-awaiting-confirmation'); // Moved
         } else if (!isDraftStarted) {
             timerDisplay.title = langTranslations.timerStartDraftTitle;
             timerDisplay.setAttribute('aria-label', langTranslations.timerAriaLabelStart);
             timerDisplay.textContent = formatTime(draftTimerDuration);
         } else if (isDraftComplete) {
             timerDisplay.title = langTranslations.timerDraftCompleteTitle;
             timerDisplay.setAttribute('aria-label', langTranslations.timerDraftCompleteTitle);
             timerDisplay.textContent = langTranslations.timerDraftCompleteText;
         } else { // Draft running, no preview
             timerDisplay.title = langTranslations.timerDraftRunningTitle;
             timerDisplay.setAttribute('aria-label', langTranslations.timerAriaLabelRunning.replace('{time}', formatTime(timerSeconds)));
             timerDisplay.textContent = timerInterval ? formatTime(timerSeconds) : "--:--";
         }
     }
     function updateNextSwapButtonContent(langTranslations) {
         if (nextDraftButton) {
             nextDraftButton.title = langTranslations.nextDraftTitle || "Next Draft";
             nextDraftButton.setAttribute('aria-label', langTranslations.nextDraftAriaLabel || "Proceed to next draft");
         }
         if (swapTeamsButton) {
             swapTeamsButton.title = langTranslations.swapTeamsTitle || "Swap Teams";
             swapTeamsButton.setAttribute('aria-label', langTranslations.swapTeamsAriaLabel || "Swap team sides");
         }
     }

    // --- Navigation & Role Handling ---
    function navigateTo(pageName) {
        console.log(`Navigating to: ${pageName}`);
        currentPage = pageName;
        stopHomepageBackgroundCycle();
        if(homePage) homePage.classList.add('hidden');
        if(draftPage) draftPage.classList.add('hidden');
        const currentAdminButton = document.getElementById('adminButton');
        const currentSettingsButton = document.getElementById('settingsButton');
        const telegramButton = document.getElementById('telegramLinkButton');
        if(currentAdminButton) currentAdminButton.classList.add('hidden');
        if(currentSettingsButton) currentSettingsButton.classList.add('hidden');
        if(telegramButton) telegramButton.classList.add('hidden');
        if (pageName === 'home') {
            if(homePage) homePage.classList.remove('hidden');
            if(currentAdminButton) currentAdminButton.classList.remove('hidden');
            if(currentSettingsButton) currentSettingsButton.classList.remove('hidden');
            if(telegramButton) telegramButton.classList.remove('hidden');
            console.log("DEBUG navigateTo: Showing buttons for home page");
            if (window.location.hash && currentUserRole !== 'admin') {
                currentUserRole = null;
                userTeamSide = null;
                history.pushState("", document.title, window.location.pathname + window.location.search);
            }
             updateUIText(currentLanguage); // Update text *after* showing the page
             if (processedChampions.length > 0) {
                startHomepageBackgroundCycle();
             } else {
                console.log("navigateTo(home): Champion data not loaded yet, background cycle deferred.");
             }
        } else if (pageName === 'draft') {
             if(draftPage) draftPage.classList.remove('hidden');
             console.log("DEBUG navigateTo: Navigating to draft page");
             if (!isDraftInitialized) {
                console.log("Initializing draft simulator for the first time...");
                initializeAppDraft();
                isDraftInitialized = true;
            } else {
                 console.log("Draft already initialized, re-applying state for role:", currentUserRole);
                 if (checkDraftElements()) {
                    const roleFromHash = getRoleFromHash();
                    if (roleFromHash && roleFromHash !== currentUserRole) {
                        currentUserRole = roleFromHash;
                        console.log("Role updated from hash:", currentUserRole);
                    } else if (!currentUserRole) {
                        currentUserRole = 'default';
                    }
                    if (currentUserRole === 'team1') userTeamSide = 'blue';
                    else if (currentUserRole === 'team2') userTeamSide = 'red';
                    else userTeamSide = null;
                    applyRolePermissions(currentUserRole);
                    if(blueTeamNameH2) blueTeamNameH2.textContent = localStorage.getItem('lobbyTeam1Name') || translations[currentLanguage].blueTeamDefaultName;
                    if(redTeamNameH2) redTeamNameH2.textContent = localStorage.getItem('lobbyTeam2Name') || translations[currentLanguage].redTeamDefaultName;
                    updateUIText(currentLanguage); // Update text *after* showing the page
                    updateDraftUI();
                 } else {
                     console.error("Draft elements not found when trying to re-apply state.");
                     showStatusMessage("errorInitDraftElements", 5000);
                 }
            }
        }
     }
    function getRoleFromHash() {
        const hash = window.location.hash;
        if (hash.startsWith('#role=')) {
            const role = hash.substring(6);
            if (permissions[role] && role !== 'admin') { return role; }
        }
        return null;
     }

    // --- Home Page Logic (Modals, Buttons) ---
    function showLobbyModal() {
        if (!lobbyModal || !lobbyModalContent) return;
        if (lobbyLinksContainer) lobbyLinksContainer.innerHTML = '';
        updateUIText(currentLanguage); // Update modal text before showing
        lobbyModal.classList.remove('hidden');
        lobbyModal.classList.add('flex');
        addLobbyModalRoleButtonListeners();
     }
    function hideLobbyModal() {
        if (!lobbyModal) return;
        lobbyModal.classList.add('hidden');
        lobbyModal.classList.remove('flex');
    }
    function addLobbyModalRoleButtonListeners() {
        const roleButtons = lobbyModalContent?.querySelectorAll('button[data-role]');
        roleButtons?.forEach(button => {
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            newButton.addEventListener('click', handleRoleSelection);
        });
     }
    function handleRoleSelection(event) {
        const role = event.target.dataset.role;
        if (!role || !lobbyLinksContainer) return;
        const team1Name = team1NameInput.value.trim() || translations[currentLanguage].blueTeamDefaultName;
        const team2Name = team2NameInput.value.trim() || translations[currentLanguage].redTeamDefaultName;
        localStorage.setItem('lobbyTeam1Name', team1Name);
        localStorage.setItem('lobbyTeam2Name', team2Name);
        const baseUrl = window.location.origin + window.location.pathname;
        const roleLink = baseUrl + '#role=' + role;
        lobbyLinksContainer.innerHTML = ''; // Clear previous links
        const linkContainer = document.createElement('div');
        linkContainer.className = 'mt-4 text-center';
        const labelText = translations[currentLanguage].lobbyLinkForRole.replace('{role}', event.target.textContent);
        const label = document.createElement('p');
        label.className = 'mb-2';
        label.textContent = labelText;
        linkContainer.appendChild(label);
        const linkSpan = document.createElement('span');
        linkSpan.id = `generated-${role}-link`;
        linkSpan.textContent = roleLink;
        linkSpan.className = 'inline-block bg-surface-2 p-1 px-2 rounded border border-border-medium break-all';
        linkContainer.appendChild(linkSpan);
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-button ml-2';
        copyBtn.textContent = translations[currentLanguage].copyButton;
        copyBtn.addEventListener('click', () => copyToClipboard(roleLink));
        linkContainer.appendChild(copyBtn);
        const openBtn = document.createElement('a');
        openBtn.className = 'copy-button open-button ml-1';
        openBtn.textContent = translations[currentLanguage].openButton;
        openBtn.href = roleLink;
        openBtn.target = '_self'; // Open in the same tab
        linkContainer.appendChild(openBtn);
        lobbyLinksContainer.appendChild(linkContainer);
     }
    function handleCreateLobby() {
        console.log("handleCreateLobby (now Create Draft) called - showing modal");
        showLobbyModal();
     }
    function handleAdminClick() {
        console.log("Admin button clicked.");
        currentUserRole = 'admin';
        userTeamSide = null;
        const team1Name = team1NameInput.value.trim() || translations[currentLanguage].blueTeamDefaultName;
        const team2Name = team2NameInput.value.trim() || translations[currentLanguage].redTeamDefaultName;
        localStorage.setItem('lobbyTeam1Name', team1Name);
        localStorage.setItem('lobbyTeam2Name', team2Name);
        navigateTo('draft');
     }

    // --- Settings Modal Logic ---
    function showSettingsModal() {
        if (!settingsModal) return;
        updateSettingsUI();
        settingsModal.classList.remove('hidden');
        settingsModal.classList.add('flex');
     }
    function hideSettingsModal() {
        if (!settingsModal) return;
        settingsModal.classList.add('hidden');
        settingsModal.classList.remove('flex');
     }
    function updateSettingsUI() {
        if (!settingsModal) return;
        timerDurationSetting?.querySelectorAll('button').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.value, 10) === draftTimerDuration);
        });
        draftModeSetting?.querySelectorAll('button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.value === draftMode);
        });
        themeSetting?.querySelectorAll('button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.value === currentTheme);
        });
        languageSetting?.querySelectorAll('button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.value === currentLanguage);
        });
        championListSetting?.querySelectorAll('button').forEach(btn => {
             btn.classList.toggle('active', btn.dataset.value === championListType);
        });
     }
    function handleSettingChange(event) {
        const button = event.target.closest('button[data-setting]');
        if (!button) return;
        const setting = button.dataset.setting;
        const value = button.dataset.value;
        console.log(`Setting changed: ${setting} = ${value}`);
        switch (setting) {
            case 'timerDuration':
                draftTimerDuration = parseInt(value, 10);
                localStorage.setItem('timerDuration', draftTimerDuration);
                timerSeconds = draftTimerDuration;
                if (!isDraftStarted && timerDisplay) {
                    updateTimerDisplayContent(translations[currentLanguage]);
                }
                break;
            case 'draftMode':
                draftMode = value;
                localStorage.setItem('draftMode', draftMode);
                if (isDraftInitialized) {
                    updateDraftUI();
                }
                break;
            case 'theme':
                applyTheme(value);
                break;
            case 'language':
                applyLanguage(value);
                break;
            case 'championList':
                championListType = value;
                localStorage.setItem('championListType', championListType);
                isWildRiftModeActive = championListType === 'wildrift';
                if (isDraftInitialized) {
                    filterChampions();
                }
                break;
        }
        updateSettingsUI();
     }

    // --- Event Listeners Setup ---
    function setupInitialEventListeners() {
        if (createLobbyButton) { createLobbyButton.addEventListener('click', handleCreateLobby); }
        else { console.warn("Create Draft Button not found"); } // Updated warning
        if (adminButton) { adminButton.addEventListener('click', handleAdminClick); }
        else { console.warn("Admin Button not found"); }
        if (settingsButton) { settingsButton.addEventListener('click', showSettingsModal); }
        else { console.warn("Settings Button not found"); }
        if (lobbyModalCloseButton) { lobbyModalCloseButton.addEventListener('click', hideLobbyModal); }
        else { console.warn("Lobby Modal Close Button not found"); }
        if (lobbyModal) {
            lobbyModal.addEventListener('click', (event) => {
                if (event.target === lobbyModal) { hideLobbyModal(); }
            });
        }
        if (settingsModalCloseButton) { settingsModalCloseButton.addEventListener('click', hideSettingsModal); }
        else { console.warn("Settings Modal Close Button not found"); }
        if (settingsModal) {
            const settingsContent = settingsModal.querySelector('.modal-content');
            if (settingsContent) {
                settingsContent.addEventListener('click', handleSettingChange);
            }
            settingsModal.addEventListener('click', (event) => {
                if (event.target === settingsModal) { hideSettingsModal(); }
            });
        }
    }

    // --- Check Draft Elements Function ---
    function checkDraftElements() {
        loadingIndicator = document.getElementById('loadingIndicator');
        mainLayout = document.getElementById('mainLayout');
        championGridElement = document.getElementById('championGrid');
        timerDisplay = document.getElementById('timerDisplay');
        resetButton = document.getElementById('resetButton');
        undoButton = document.getElementById('undoButton');
        championSearch = document.getElementById('championSearch');
        blueColumn = document.querySelector('.blue-column');
        redColumn = document.querySelector('.red-column');
        roleFilterButtonsContainer = document.getElementById('roleFilterButtons');
        filterButtons = roleFilterButtonsContainer ? roleFilterButtonsContainer.querySelectorAll('.filter-button') : null;
        nextDraftButton = document.getElementById('nextDraftButton');
        swapTeamsButton = document.getElementById('swapTeamsButton');
        returnHomeButton = document.getElementById('returnHomeButton');
        blueTeamNameH2 = document.getElementById('blue-team-name-h2');
        redTeamNameH2 = document.getElementById('red-team-name-h2');
        blueScoreEl = document.getElementById('blue-score');
        redScoreEl = document.getElementById('red-score');
        statusMessage = document.getElementById('statusMessage');
        championTooltip = document.getElementById('championTooltip');
        globalBansBlueContainer = document.getElementById('global-bans-blue');
        globalBansRedContainer = document.getElementById('global-bans-red');
        globallyBannedDisplay = document.getElementById('globallyBannedDisplay');

        const elementsToCheck = [ loadingIndicator, mainLayout, championGridElement, timerDisplay, resetButton, undoButton, championSearch, blueColumn, redColumn, roleFilterButtonsContainer, filterButtons, nextDraftButton, swapTeamsButton, returnHomeButton, blueTeamNameH2, redTeamNameH2, blueScoreEl, redScoreEl, statusMessage, championTooltip, globalBansBlueContainer, globalBansRedContainer, globallyBannedDisplay ];
        if (!filterButtons || filterButtons.length === 0) { console.error("Role filter buttons NodeList is empty or null!"); }
        const missingElements = elementsToCheck.filter((el, index) => {
            if (!el) {
                const expectedIds = [ 'loadingIndicator', 'mainLayout', 'championGrid', 'timerDisplay', 'resetButton', 'undoButton', 'championSearch', '.blue-column', '.red-column', 'roleFilterButtons', '.filter-button', 'nextDraftButton', 'swapTeamsButton', 'returnHomeButton', 'blue-team-name-h2', 'red-team-name-h2', 'blue-score', 'red-score', 'statusMessage', 'championTooltip', 'global-bans-blue', 'global-bans-red', 'globallyBannedDisplay' ];
                console.error(`Missing draft element: ${expectedIds[index] || `Element at index ${index}`}`);
                return true;
            }
            return false;
        });
        if (missingElements.length > 0) {
            console.error("One or more critical draft elements were not found!");
            return false;
        }
        return true;
     }

    // --- Draft Simulator Logic ---
    async function initializeAppDraft() {
        console.log("initializeAppDraft started");
        try {
            if (processedChampions.length === 0 && !isDataLoading) {
                console.log("initializeAppDraft: Data not loaded, calling loadChampionData...");
                const dataLoaded = await loadChampionData();
                if (!dataLoaded) throw new Error("Failed to load champion data.");
            } else {
                 console.log("initializeAppDraft: Data already loaded or loading.");
            }
            if (!currentUserRole) { currentUserRole = getRoleFromHash() || 'default'; }
            if (currentUserRole === 'team1') userTeamSide = 'blue';
            else if (currentUserRole === 'team2') userTeamSide = 'red';
            else userTeamSide = null;
            console.log(`initializeAppDraft: Role: ${currentUserRole}, Side: ${userTeamSide}`);
            if (!checkDraftElements()) throw new Error("Draft elements missing!");
            console.log("initializeAppDraft: All draft elements found.");
            displayChampions();
            resetDraftFull(true); // Initial reset (forced)
            console.log("initializeAppDraft: Champions displayed & draft state reset.");
            if(blueTeamNameH2) blueTeamNameH2.textContent = localStorage.getItem('lobbyTeam1Name') || translations[currentLanguage].blueTeamDefaultName;
            if(redTeamNameH2) redTeamNameH2.textContent = localStorage.getItem('lobbyTeam2Name') || translations[currentLanguage].redTeamDefaultName;
            console.log("initializeAppDraft: Team names set.");
            attachDraftEventListeners();
            updateUIText(currentLanguage);
            updateDraftUI(); // Initial UI update after reset
            console.log("initializeAppDraft: Initial UI update complete.");
            if(mainLayout) mainLayout.classList.remove('hidden');
            console.log("initializeAppDraft: Main layout shown.");
            console.log("initializeAppDraft: Draft simulator page initialized successfully.");
        } catch (error) {
            console.error("Error during initializeAppDraft:", error);
            showStatusMessage("errorInitCritical", 10000, { error: error.message });
            if(mainLayout) mainLayout.classList.add('hidden');
        }
     }
     function attachDraftEventListeners() {
         timerDisplay?.removeEventListener('click', handleTimerClick);
         timerDisplay?.addEventListener('click', handleTimerClick);
         nextDraftButton?.removeEventListener('click', handleNextDraftClick);
         nextDraftButton?.addEventListener('click', handleNextDraftClick);
         swapTeamsButton?.removeEventListener('click', handleSwapTeamsClick);
         swapTeamsButton?.addEventListener('click', handleSwapTeamsClick);
         resetButton?.removeEventListener('click', handleResetClick);
         resetButton?.addEventListener('click', handleResetClick);
         undoButton?.removeEventListener('click', handleUndo);
         undoButton?.addEventListener('click', handleUndo);
         championSearch?.removeEventListener('input', debouncedFilter);
         championSearch?.addEventListener('input', debouncedFilter);
         filterButtons?.forEach(button => {
             button?.removeEventListener('click', handleRoleFilterClick);
             button?.addEventListener('click', handleRoleFilterClick);
         });
         blueColumn?.removeEventListener('click', handlePickContainerClick);
         blueColumn?.addEventListener('click', handlePickContainerClick);
         redColumn?.removeEventListener('click', handlePickContainerClick);
         redColumn?.addEventListener('click', handlePickContainerClick);
         returnHomeButton?.removeEventListener('click', handleReturnHomeClick);
         returnHomeButton?.addEventListener('click', handleReturnHomeClick);
         [blueTeamNameH2, redTeamNameH2, blueScoreEl, redScoreEl].forEach(el => {
             if (el) {
                 el.removeEventListener('blur', handleEditableBlur);
                 el.addEventListener('blur', handleEditableBlur);
                 el.removeEventListener('keydown', handleEditableKeydown);
                 el.addEventListener('keydown', handleEditableKeydown);
             }
         });
         console.log("Draft event listeners attached/updated.");
     }
     const handleNextDraftClick = () => { console.log("Next Draft button clicked"); handleNextDraft(); };
     const handleSwapTeamsClick = () => { console.log("Swap Teams button clicked"); handleSwapTeams(); };
     const handleResetClick = () => { console.log("Reset button clicked"); resetDraftFull(false); }; // User-initiated reset
     const handleReturnHomeClick = () => { console.log("Return Home button clicked"); navigateTo('home'); };
     const handleEditableBlur = (e) => { const permissionNeeded = e.target.id.includes('name') ? 'editTeamName' : 'editScore'; if (!hasPermission(permissionNeeded)) return; e.target.textContent = e.target.textContent.trim(); };
     const handleEditableKeydown = (e) => { const permissionNeeded = e.target.id.includes('name') ? 'editTeamName' : 'editScore'; if (!hasPermission(permissionNeeded)) return; if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } };

    function applyRolePermissions(role) {
        const can = (action, team = null) => hasPermission(action, team);
        // Timer button is enabled if user can start OR confirm the current step
        const draftOrder = getDraftOrder();
        const currentAction = currentStep < draftOrder.length ? draftOrder[currentStep] : null;
        const currentTeam = currentAction ? currentAction.team : null;
        if(timerDisplay) timerDisplay.disabled = !( ( !isDraftStarted && can('startDraft') ) || ( isDraftStarted && !isDraftComplete && can('confirmOrStart', currentTeam) ) );

        if(resetButton) resetButton.disabled = !can('resetDraft');
        // Undo button permission depends on the last action's team
        const lastActionTeam = draftHistory.length > 0 ? draftHistory[draftHistory.length - 1]?.team : null;
        if(undoButton) undoButton.disabled = !can('undoAction', lastActionTeam) || draftHistory.length === 0 || !isDraftStarted;
        if(returnHomeButton) returnHomeButton.disabled = !can('returnHome');
        if(filterButtons) { filterButtons.forEach(btn => { btn.disabled = !can('useRoleFilters'); }); }
        // --- ТЗ №5: Permissions for Next/Swap ---
        if(nextDraftButton) nextDraftButton.disabled = !can('nextDraft') || !isDraftComplete; // Only enabled if permitted AND draft is complete
        if(swapTeamsButton) swapTeamsButton.disabled = !can('nextOrSwap') || isDraftStarted; // Only enabled if permitted AND draft not started
        // --- End ТЗ №5 ---
        if(blueTeamNameH2) blueTeamNameH2.contentEditable = can('editTeamName');
        if(redTeamNameH2) redTeamNameH2.contentEditable = can('editTeamName');
        if(blueScoreEl) blueScoreEl.contentEditable = can('editScore');
        if(redScoreEl) redScoreEl.contentEditable = can('editScore');
        if (blueColumn) blueColumn.classList.toggle('role-disabled', role === 'team2');
        if (redColumn) redColumn.classList.toggle('role-disabled', role === 'team1');
        if (role === 'admin' || role === 'judge') {
            if(blueColumn) blueColumn.classList.remove('role-disabled');
            if(redColumn) redColumn.classList.remove('role-disabled');
        }
        updateNicknameEditability();
     }
    function updateNicknameEditability() {
         const canEdit = hasPermission('editNicknames');
         document.querySelectorAll('.nickname-input').forEach(input => { input.contentEditable = canEdit; input.style.cursor = canEdit ? 'text' : 'default'; });
     }
    async function loadChampionData() {
         if (isDataLoading || processedChampions.length > 0) {
             console.log("loadChampionData: Already loading or loaded.");
             return processedChampions.length > 0;
         }
         isDataLoading = true;
         console.log("loadChampionData: Starting data load...");
         loadingIndicator = document.getElementById('loadingIndicator');
         if (loadingIndicator) {
             loadingIndicator.classList.remove('hidden');
             updateUIText(currentLanguage);
             console.log("loadChampionData: Loading indicator shown.");
         } else {
             console.warn("loadChampionData: Loading indicator element not found!");
         }
         try {
             const versionsResponse = await fetch('https://ddragon.leagueoflegends.com/api/versions.json'); if (!versionsResponse.ok) throw new Error(translations[currentLanguage].errorLoadingVersions.replace('{status}', versionsResponse.statusText)); const versions = await versionsResponse.json(); ddragonVersion = versions[0]; baseIconUrl = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/`; baseSplashUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/`;
             const championRolesMap = { 'Aatrox': ['Top'], 'Ahri': ['Mid'], 'Akali': ['Mid', 'Top'], 'Akshan': ['Mid', 'Top'], 'Alistar': ['Support'], 'Amumu': ['Jungle', 'Support'], 'Anivia': ['Mid'], 'Annie': ['Mid', 'Support'], 'Aphelios': ['ADC'], 'Ashe': ['ADC', 'Support'], 'AurelionSol': ['Mid'], 'Azir': ['Mid'], 'Bard': ['Support'], 'Belveth': ['Jungle'], 'Blitzcrank': ['Support'], 'Brand': ['Support', 'Mid', 'Jungle'], 'Braum': ['Support'], 'Briar': ['Jungle'], 'Caitlyn': ['ADC'], 'Camille': ['Top'], 'Cassiopeia': ['Top', 'Mid'], 'Chogath': ['Top', 'Mid'], 'Corki': ['Mid', 'ADC'], 'Darius': ['Top', 'Jungle'], 'Diana': ['Jungle', 'Mid'], 'DrMundo': ['Top', 'Jungle'], 'Draven': ['ADC'], 'Ekko': ['Jungle', 'Mid'], 'Elise': ['Jungle'], 'Evelynn': ['Jungle'], 'Ezreal': ['ADC'], 'Fiddlesticks': ['Jungle'], 'Fiora': ['Top'], 'Fizz': ['Mid'], 'Galio': ['Mid', 'Support'], 'Gangplank': ['Top'], 'Garen': ['Top'], 'Gnar': ['Top'], 'Gragas': ['Jungle', 'Top', 'Mid', 'Support'], 'Graves': ['Jungle'], 'Gwen': ['Top', 'Jungle'], 'Hecarim': ['Jungle'], 'Heimerdinger': ['Top', 'Mid', 'Support'], 'Hwei': ['Mid', 'Support'], 'Illaoi': ['Top'], 'Irelia': ['Top', 'Mid'], 'Ivern': ['Jungle', 'Support'], 'Janna': ['Support'], 'JarvanIV': ['Jungle'], 'Jax': ['Top', 'Jungle'], 'Jayce': ['Top', 'Mid'], 'Jhin': ['ADC'], 'Jinx': ['ADC'], 'Kaisa': ['ADC'], 'Kalista': ['ADC'], 'Karma': ['Support', 'Mid'], 'Karthus': ['Jungle', 'Mid'], 'Kassadin': ['Mid'], 'Katarina': ['Mid'], 'Kayle': ['Top', 'Mid'], 'Kayn': ['Jungle'], 'Kennen': ['Top', 'Mid'], 'Khazix': ['Jungle'], 'Kindred': ['Jungle'], 'Kled': ['Top', 'Mid'], 'KogMaw': ['ADC'], 'KSante': ['Top'], 'Leblanc': ['Mid'], 'LeeSin': ['Jungle'], 'Leona': ['Support'], 'Lillia': ['Jungle'], 'Lissandra': ['Mid'], 'Lucian': ['ADC'], 'Lulu': ['Support'], 'Lux': ['Mid', 'Support'], 'Malphite': ['Top', 'Support', 'Mid'], 'Malzahar': ['Mid'], 'Maokai': ['Jungle', 'Support'], 'MasterYi': ['Jungle'], 'Milio': ['Support'], 'MissFortune': ['ADC'], 'Mordekaiser': ['Top', 'Jungle'], 'Morgana': ['Support', 'Mid', 'Jungle'], 'Naafiri': ['Jungle', 'Mid'], 'Nami': ['Support'], 'Nasus': ['Top'], 'Nautilus': ['Support'], 'Neeko': ['Mid', 'Support'], 'Nidalee': ['Jungle'], 'Nilah': ['ADC'], 'Nocturne': ['Jungle'], 'Nunu': ['Jungle'], 'Olaf': ['Top', 'Jungle'], 'Orianna': ['Mid'], 'Ornn': ['Top'], 'Pantheon': ['Top', 'Mid', 'Support', 'Jungle'], 'Poppy': ['Top', 'Jungle', 'Support'], 'Pyke': ['Support', 'Mid'], 'Qiyana': ['Jungle', 'Mid'], 'Quinn': ['Top', 'Mid'], 'Rakan': ['Support'], 'Rammus': ['Jungle'], 'RekSai': ['Jungle'], 'Rell': ['Support', 'Jungle'], 'Renata': ['Support'], 'Renekton': ['Top'], 'Rengar': ['Jungle', 'Top'], 'Riven': ['Top'], 'Rumble': ['Top', 'Mid', 'Jungle'], 'Ryze': ['Top', 'Mid'], 'Samira': ['ADC'], 'Sejuani': ['Jungle'], 'Senna': ['Support', 'ADC'], 'Seraphine': ['Support', 'Mid', 'ADC'], 'Sett': ['Top', 'Support'], 'Shaco': ['Jungle', 'Support'], 'Shen': ['Top', 'Support'], 'Shyvana': ['Jungle'], 'Singed': ['Top'], 'Sion': ['Top', 'Mid'], 'Sivir': ['ADC'], 'Skarner': ['Jungle', 'Top'], 'Smolder': ['ADC', 'Mid'], 'Sona': ['Support'], 'Soraka': ['Support'], 'Swain': ['Support', 'Mid', 'ADC'], 'Sylas': ['Mid', 'Jungle'], 'Syndra': ['Mid'], 'TahmKench': ['Top', 'Support'], 'Taliyah': ['Jungle', 'Mid'], 'Talon': ['Jungle', 'Mid'], 'Taric': ['Support'], 'Teemo': ['Top'], 'Thresh': ['Support'], 'Tristana': ['ADC', 'Mid'], 'Trundle': ['Top', 'Jungle'], 'Tryndamere': ['Top'], 'TwistedFate': ['Mid', 'ADC'], 'Twitch': ['ADC', 'Jungle'], 'Udyr': ['Jungle', 'Top'], 'Urgot': ['Top'], 'Varus': ['ADC', 'Mid'], 'Vayne': ['ADC', 'Top'], 'Veigar': ['Mid', 'ADC', 'Support'], 'Velkoz': ['Mid', 'Support'], 'Vex': ['Mid'], 'Vi': ['Jungle'], 'Viego': ['Jungle'], 'Viktor': ['Mid'], 'Vladimir': ['Top', 'Mid'], 'Volibear': ['Top', 'Jungle'], 'Warwick': ['Jungle', 'Top'], 'MonkeyKing': ['Top', 'Jungle'], 'Xayah': ['ADC'], 'Xerath': ['Mid', 'Support'], 'XinZhao': ['Jungle'], 'Yasuo': ['Mid', 'Top', 'ADC'], 'Yone': ['Top', 'Mid'], 'Yorick': ['Top', 'Jungle'], 'Yuumi': ['Support'], 'Zac': ['Jungle'], 'Zed': ['Mid', 'Jungle'], 'Zeri': ['ADC'], 'Ziggs': ['Mid', 'ADC', 'Support'], 'Zilean': ['Support', 'Mid'], 'Zoe': ['Mid', 'Support'], 'Zyra': ['Support', 'Jungle', 'Mid'] };
             const dataUrlEn = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/en_US/champion.json`; const dataUrlRu = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/ru_RU/champion.json`; const [enResponse, ruResponse] = await Promise.all([ fetch(dataUrlEn), fetch(dataUrlRu) ]); if (!enResponse.ok) throw new Error(translations[currentLanguage].errorLoadingDataEN.replace('{status}', enResponse.statusText)); allChampionsData.en = (await enResponse.json()).data; if (!ruResponse.ok) { console.warn(translations[currentLanguage].errorLoadingDataRU.replace('{status}', ruResponse.statusText)); showStatusMessage("errorLoadingDataRU", 4000, { status: ruResponse.statusText }); allChampionsData.ru = null; } else { allChampionsData.ru = (await ruResponse.json()).data; }
             processedChampions = Object.keys(allChampionsData.en).map(champId => { const enData = allChampionsData.en[champId]; const ruData = allChampionsData.ru ? allChampionsData.ru[champId] : enData; return { id: enData.id, name: { en: enData.name, ru: ruData.name }, title: { en: enData.title, ru: ruData.title }, roles: championRolesMap[enData.id] || [], iconUrl: `${baseIconUrl}${enData.image.full}`, splashUrl: `${baseSplashUrl}${enData.id}_0.jpg` }; });
             processedChampions.sort((a, b) => a.name[currentLanguage].localeCompare(b.name[currentLanguage], currentLanguage));
             console.log(`Successfully loaded and processed ${processedChampions.length} champions.`);
             if (currentPage === 'home') {
                 console.log("loadChampionData: Data loaded, starting background cycle.");
                 startHomepageBackgroundCycle();
             }
             if(loadingIndicator) loadingIndicator.classList.add('hidden');
             console.log("loadChampionData: Loading indicator hidden.");
             isDataLoading = false;
             return true;
         } catch (error) {
             console.error("Error loading champion data:", error);
             showStatusMessage("errorLoadingChampions", 5000, { error: error.message });
             if(loadingIndicator) {
                 loadingIndicator.textContent = translations[currentLanguage].errorLoadingChampions.replace('{error}', error.message) || `Error! ${error.message}`;
             }
             isDataLoading = false;
             return false;
         }
     }
     function startHomepageBackgroundCycle() {
        if (!homePage || processedChampions.length === 0 || homepageBgInterval) return;
        console.log("Starting homepage background cycle.");
        let currentBgIndex = -1;
        const setBackground = () => {
            if (currentPage !== 'home') {
                stopHomepageBackgroundCycle();
                return;
            }
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * processedChampions.length);
            } while (randomIndex === currentBgIndex);
            currentBgIndex = randomIndex;
            const champion = processedChampions[currentBgIndex];
            const splashUrl = champion.splashUrl;
            const img = new Image();
            img.onload = () => {
                if (currentPage === 'home') {
                    homePage.classList.remove('background-fade-active');
                     void homePage.offsetWidth;
                    homePage.style.backgroundImage = `url('${splashUrl}')`;
                    homePage.classList.add('background-fade-active');
                }
            };
            img.onerror = (err) => {
                console.error(`Error loading splash art for ${champion.id}:`, err);
                showStatusMessage("errorLoadingSplashArt", 3000, { error: champion.id });
                if (currentPage === 'home') {
                    homePage.style.backgroundImage = 'none';
                    homePage.classList.remove('background-fade-active');
                }
            };
            img.src = splashUrl;
        };
        setBackground();
        homepageBgInterval = setInterval(setBackground, 10000);
     }
    function stopHomepageBackgroundCycle() {
        if (homepageBgInterval) {
            console.log("Stopping homepage background cycle.");
            clearInterval(homepageBgInterval);
            homepageBgInterval = null;
            if (homePage) {
                homePage.classList.remove('background-fade-active');
            }
        }
     }
    function stopTimer() { clearInterval(timerInterval); timerInterval = null; if(timerDisplay) timerDisplay.classList.remove('timer-running', 'timer-ending'); }
    function formatTime(seconds) { const minutes = Math.floor(seconds / 60); const remainingSeconds = seconds % 60; return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`; }
    function resetTimerDisplay() {
        stopTimer();
        timerSeconds = draftTimerDuration;
        if (timerDisplay && !isDraftStarted) {
             updateTimerDisplayContent(translations[currentLanguage]);
        }
        console.log("DEBUG: resetTimerDisplay - Timer stopped and seconds reset.");
     }
    function startTimer() {
        console.log("startTimer called");
        stopTimer(); // Ensure no multiple timers
        timerSeconds = draftTimerDuration;
        if (!timerDisplay) { console.warn("startTimer: timerDisplay not found"); return; }
        updateTimerDisplayContent(translations[currentLanguage]); // Set initial display
        timerDisplay.classList.add('timer-running');
        timerDisplay.classList.remove('timer-ending', 'timer-awaiting-confirmation'); // Ensure correct state
        timerInterval = setInterval(() => {
            timerSeconds--;
            if (timerDisplay) {
                timerDisplay.textContent = formatTime(timerSeconds);
                timerDisplay.setAttribute('aria-label', translations[currentLanguage].timerAriaLabelRunning.replace('{time}', formatTime(timerSeconds)));
                if (timerSeconds <= 10 && timerSeconds > 0) {
                    timerDisplay.classList.add('timer-ending');
                } else {
                    timerDisplay.classList.remove('timer-ending');
                }
            }
            if (timerSeconds <= 0) {
                stopTimer();
                if(timerDisplay) timerDisplay.classList.add('timer-ending');
                console.log("Timer reached zero!");
                const draftOrder = getDraftOrder();
                if (currentStep < draftOrder.length) {
                    const currentAction = draftOrder[currentStep];
                    if (currentAction.type === 'pick') {
                        if (previewedChampion) {
                            console.log("Timer ended during PICK phase. Auto-confirming:", previewedChampion.id);
                            showStatusMessage("timerEndedPickConfirm", 3000, { name: previewedChampion.name[currentLanguage] });
                            confirmAction(); // Confirm the previewed champion
                        } else {
                            console.log("Timer ended during PICK phase. No champion previewed. Clearing current game.");
                            showStatusMessage("timerEndedPickClear", 3000);
                            resetCurrentGamePicksBans(true, false); // Reset if nothing was selected
                        }
                    } else if (currentAction.type === 'ban') {
                        console.log("Timer ended during BAN phase. Skipping ban.");
                        showStatusMessage("timerEndedBanSkip", 2000);
                        const slotElement = document.getElementById(currentAction.slot);
                        if (slotElement) { restoreSlotPlaceholder(slotElement, currentAction.slot, ''); }
                        currentStep++;
                        previewedChampion = null; // Ensure preview is cleared
                        updateDraftUI(); // Update UI for the next step
                    }
                } else {
                    console.log("Timer ended but draft already complete?");
                    updateTimerDisplayContent(translations[currentLanguage]); // Update to "Draft Complete"
                }
            }
        }, 1000);
     }
    function handleTimerClick() {
        console.log(`DEBUG: handleTimerClick: previewed=${!!previewedChampion}, started=${isDraftStarted}, complete=${isDraftComplete}`);
        const draftOrder = getDraftOrder();
        const currentAction = currentStep < draftOrder.length ? draftOrder[currentStep] : null;
        const team = currentAction ? currentAction.team : null;

        // Check permissions based on state
        if (!isDraftStarted) { // If draft hasn't started, check permission to start
            if (!hasPermission('startDraft')) {
                 showStatusMessage("permDeniedStartDraft", 2000);
                 return;
            }
            console.log("DEBUG: handleTimerClick acting as Start button");
            handleStartDraft();
        } else if (previewedChampion && !isDraftComplete) { // If champion previewed, check permission to confirm
             // Permission check for the specific team whose turn it is
            if (!hasPermission('confirmOrStart', team)) {
                 showStatusMessage("permDeniedConfirm", 2000);
                 return;
            }
            console.log("DEBUG: handleTimerClick acting as Confirm button");
            confirmAction();
        } else {
            // Draft is running, but no champion previewed, or draft is complete.
            // Clicking the timer shouldn't do anything in these cases.
            console.log("DEBUG: Timer clicked but no action to take (draft running without preview, or complete).");
        }
     }

     function createChampionCard(champ) {
        const card = document.createElement('button'); card.className = 'champion-card'; card.dataset.championId = champ.id; card.dataset.championNameEn = champ.name.en.toLowerCase(); card.dataset.championNameRu = champ.name.ru.toLowerCase(); card.dataset.roles = champ.roles.join(','); card.setAttribute('role', 'gridcell'); card.setAttribute('aria-label', champ.name[currentLanguage]);
        const img = document.createElement('img'); img.src = champ.iconUrl; img.alt = ""; img.className = 'w-full h-full object-cover block pointer-events-none'; img.loading = 'lazy'; img.onerror = () => { img.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%234a5568'/%3E%3C/svg%3E`; card.setAttribute('aria-label', `${champ.name[currentLanguage]} (error)`); }; card.appendChild(img);
        card.addEventListener('click', () => handleChampionPreview(champ)); card.addEventListener('mouseover', (event) => showChampionTooltip(event, champ)); card.addEventListener('mouseout', hideChampionTooltip); card.addEventListener('focus', (event) => showChampionTooltip(event, champ)); card.addEventListener('blur', hideChampionTooltip); return card;
    }
    function displayChampions() { if(!championGridElement) { console.error("displayChampions: championGridElement not found"); return; } const fragment = document.createDocumentFragment(); processedChampions.sort((a, b) => a.name[currentLanguage].localeCompare(b.name[currentLanguage], currentLanguage)); processedChampions.forEach(champ => { fragment.appendChild(createChampionCard(champ)); }); championGridElement.innerHTML = ''; championGridElement.appendChild(fragment); filterChampions(); }

    // --- MODIFIED: updateDraftUI ---
    function updateDraftUI() {
        if (!isDraftInitialized || !checkDraftElements()) {
             console.warn("updateDraftUI: Draft not initialized or elements missing.");
             return;
        }
        document.querySelectorAll('.pick-slot, .ban-slot').forEach(el => {
            el.classList.remove('highlight-action', 'swap-selected', 'preview-flash');
        });
        const draftOrder = getDraftOrder();
        isDraftComplete = currentStep >= draftOrder.length;
        // console.log(`DEBUG updateDraftUI: Step ${currentStep}, isDraftComplete: ${isDraftComplete}`);
        let currentAction = null;
        let currentActionTeam = null;
        if (!isDraftComplete && isDraftStarted) { // Only get action if draft is ongoing
            currentAction = draftOrder[currentStep];
            currentActionTeam = currentAction.team;
        } else if (isDraftComplete && isDraftStarted) { // If draft just finished
            stopTimer(); // Ensure timer stops when draft completes
        }

        applyRolePermissions(currentUserRole); // Apply permissions first
        updateTimerDisplayContent(translations[currentLanguage]); // Update timer text/state

        // --- ТЗ v3: Add/Remove Timer Animation Class ---
        const shouldAnimateTimer = previewedChampion && isDraftStarted && !isDraftComplete;
        if (timerDisplay) {
             timerDisplay.classList.toggle('timer-awaiting-confirmation', shouldAnimateTimer);
             // console.log(`DEBUG updateDraftUI: Timer animation class ('timer-awaiting-confirmation') toggled: ${shouldAnimateTimer}`);
        }
        // --- End ТЗ v3 ---

        const lastActionTeam = draftHistory.length > 0 ? draftHistory[draftHistory.length - 1]?.team : null;
        const canUndo = hasPermission('undoAction', lastActionTeam);
        if(undoButton) undoButton.disabled = !canUndo || draftHistory.length === 0 || !isDraftStarted;

        // --- ТЗ №5: Button State Logic ---
        // Next Draft button enabled only if permitted AND draft is complete
        if (nextDraftButton) {
            const canGoNext = hasPermission('nextDraft');
            nextDraftButton.disabled = !isDraftComplete || !canGoNext;
            // console.log(`DEBUG updateDraftUI (next): canGoNext=${canGoNext}, isDraftComplete=${isDraftComplete}. Resulting disabled state: ${nextDraftButton.disabled}`);
        }
        // Swap Teams button enabled only if permitted AND draft NOT started
        if (swapTeamsButton) {
            const canSwap = hasPermission('nextOrSwap');
            swapTeamsButton.disabled = isDraftStarted || !canSwap;
            // console.log(`DEBUG updateDraftUI (swap): canSwap=${canSwap}, isDraftStarted=${isDraftStarted}. Resulting disabled state: ${swapTeamsButton.disabled}`);
        }
        // Reset button enabled only if permitted
        const canReset = hasPermission('resetDraft');
        if(resetButton) resetButton.disabled = !canReset;
        // --- End ТЗ №5 ---


        const isGridInteractive = currentAction && (hasPermission('pickChampion', currentActionTeam) || hasPermission('banChampion', currentActionTeam));
        if (championGridElement) {
             championGridElement.style.pointerEvents = isGridInteractive ? 'auto' : 'none';
             championGridElement.style.opacity = isDraftStarted ? '1' : '0.6';
        }
        if(blueColumn) blueColumn.classList.toggle('draft-disabled', !isDraftStarted);
        if(redColumn) redColumn.classList.toggle('draft-disabled', !isDraftStarted);

        // Highlight current action slot and manage timer start
        if (currentAction) {
            const activeSlot = document.getElementById(currentAction.slot);
            if (activeSlot) {
                 // Highlight if user has permission for the action OR to confirm/start
                 if (hasPermission(currentAction.type === 'pick' ? 'pickChampion' : 'banChampion', currentActionTeam) || hasPermission('confirmOrStart', currentActionTeam)) {
                    activeSlot.classList.add('highlight-action');
                 }
                 // Add flash if this is the previewed slot
                 if (previewedChampion && activeSlot.id === currentAction.slot) {
                     activeSlot.classList.add('preview-flash');
                 }
            }
            // --- ТЗ №5: Timer Start Logic Refined ---
            // Start timer ONLY if:
            // 1. Draft is started
            // 2. Draft is NOT complete
            // 3. There's a current action defined
            // 4. No champion is currently being previewed (not awaiting confirmation)
            // 5. Timer is not already running
            const shouldStartTimer = isDraftStarted && !isDraftComplete && currentAction && !previewedChampion;
            if (!timerInterval && shouldStartTimer) {
                 console.log(`DEBUG updateDraftUI: Starting timer for step ${currentStep}`);
                 startTimer();
            } else {
                 // console.log(`DEBUG updateDraftUI: Timer not starting (running: ${!!timerInterval}, shouldStart: ${shouldStartTimer})`);
            }
            // --- End ТЗ №5 ---
        }

        updateChampionAvailability();
        displayGloballyBanned();
        document.querySelectorAll('.pick-slot').forEach(slot => {
            const champId = getSlotChampionId(slot.id);
            const allowSwapSelect = !isDraftStarted && hasPermission('nextOrSwap'); // Allow swap select only if not started
            slot.style.cursor = allowSwapSelect && champId ? 'pointer' : 'default';
            slot.title = allowSwapSelect && champId ? translations[currentLanguage].swapPickSelect : '';
        });
        updateNicknameEditability();
        updateNextSwapButtonContent(translations[currentLanguage]);
     }
    // --- End MODIFIED: updateDraftUI ---

    function updateChampionAvailability() {
        if (!isDraftInitialized) return;
        const combinedDisabled = new Set([...selectedChampions, ...globallyDisabledChampions]);
        document.querySelectorAll('.champion-card').forEach(card => {
            const champId = card.dataset.championId;
            const isDisabled = combinedDisabled.has(champId);
            const isSelected = selectedChampions.has(champId);
            card.classList.toggle('selected', isSelected);
            card.classList.toggle('disabled', isDisabled);
            card.disabled = isDisabled;
            card.setAttribute('aria-disabled', isDisabled.toString());
        });
     }
    function handleChampionPreview(champion) {
        console.log(`DEBUG: handleChampionPreview called for ${champion.id}. Started: ${isDraftStarted}, Complete: ${isDraftComplete}`);
        if (!isDraftStarted || isDraftComplete) return;
        const draftOrder = getDraftOrder();
        if (currentStep >= draftOrder.length) return;
        const currentAction = draftOrder[currentStep];
        const permissionNeeded = currentAction.type === 'pick' ? 'pickChampion' : 'banChampion';
        const permKey = currentAction.type === 'pick' ? 'permDeniedPreviewPick' : 'permDeniedPreviewBan';
        if (!hasPermission(permissionNeeded, currentAction.team)) {
            showStatusMessage(permKey, 2000);
            return;
        }
        const isDisabled = selectedChampions.has(champion.id) || globallyDisabledChampions.has(champion.id);
        if (isDisabled) {
            showStatusMessage("championAlreadySelected", 2000, { name: champion.name[currentLanguage] });
            return;
        }
        const slotElement = document.getElementById(currentAction.slot);
        if (slotElement) {
            document.querySelectorAll('.preview-flash').forEach(el => {
                if (el.id !== currentAction.slot) {
                     const prevSlotId = el.id;
                     const prevNickname = pickNicknames[prevSlotId] || '';
                     const wasFilled = draftHistory.some(entry => entry.slotId === prevSlotId);
                     if (!wasFilled) { restoreSlotPlaceholder(el, prevSlotId, prevNickname); }
                }
                el.classList.remove('preview-flash');
            });
            previewedChampion = champion;
            console.log(`DEBUG: handleChampionPreview - previewedChampion set to: ${previewedChampion ? previewedChampion.id : null}`);
            const existingNickname = pickNicknames[currentAction.slot] || '';
            fillSlot(slotElement, champion, currentAction.type, existingNickname);
            slotElement.classList.add('preview-flash');
            stopTimer(); // Stop timer when previewing, confirmation click or timeout will handle next step/timer
            updateDraftUI(); // Update UI to show preview and animation
        } else {
            console.warn(`Preview failed: Slot element ${currentAction.slot} not found.`);
        }
     }
     function confirmAction() {
         console.log("confirmAction called");
         if (!previewedChampion || !isDraftStarted || isDraftComplete) {
             console.warn(`DEBUG: confirmAction aborted. previewed=${!!previewedChampion}, started=${isDraftStarted}, complete=${isDraftComplete}`);
             return;
         }
         const draftOrder = getDraftOrder();
         if (currentStep >= draftOrder.length) return;
         const currentAction = draftOrder[currentStep];
         if (!hasPermission('confirmOrStart', currentAction.team)) {
             showStatusMessage("permDeniedConfirm", 2000);
             return;
         }
         const championToConfirm = previewedChampion;
         const slotElement = document.getElementById(currentAction.slot);
         const isDisabled = selectedChampions.has(championToConfirm.id) || globallyDisabledChampions.has(championToConfirm.id);
         if (!slotElement || isDisabled) {
             console.warn("Confirmation failed: Slot not found or champion became unavailable.");
             previewedChampion = null;
             if (slotElement) {
                 slotElement.classList.remove('preview-flash');
                 const currentNickname = pickNicknames[currentAction.slot] || '';
                 restoreSlotPlaceholder(slotElement, currentAction.slot, currentNickname);
             }
             updateDraftUI(); // Update UI to remove preview/animation
             return;
         }
         console.log(`Confirming ${championToConfirm.id} for slot ${currentAction.slot}`);
         selectedChampions.add(championToConfirm.id);
         const previousNickname = pickNicknames[currentAction.slot] || '';
         draftHistory.push({
             championId: championToConfirm.id,
             slotId: currentAction.slot,
             step: currentStep,
             previousNickname: previousNickname,
             type: currentAction.type,
             team: currentAction.team
         });
         slotElement.classList.remove('preview-flash');
         fillSlot(slotElement, championToConfirm, currentAction.type, previousNickname);
         if (currentAction.type === 'pick') {
             const imgElement = slotElement.querySelector('img.slot-image');
             if (imgElement) {
                 imgElement.classList.add('animate-pick');
                 setTimeout(() => { imgElement.classList.remove('animate-pick'); }, 500);
             }
         }
         currentStep++;
         previewedChampion = null; // Clear preview after confirmation
         console.log(`DEBUG: confirmAction - Slot ${currentAction.slot} filled. previewedChampion cleared. Step incremented to ${currentStep}`);
         stopTimer(); // Ensure timer is stopped explicitly after confirmation
         timerSeconds = draftTimerDuration; // Reset timer seconds for the next step
         updateDraftUI(); // Update UI for the next step (will start timer if conditions met)
         filterChampions();
     }
    function fillSlot(slotElement, champion, type, nicknameText = '') {
        if (!slotElement || !champion) return;
        slotElement.innerHTML = '';
        const img = document.createElement('img');
        img.alt = champion.name[currentLanguage];
        img.className = 'slot-image';
        let imageUrl = (type === 'pick') ? champion.splashUrl : champion.iconUrl;
        img.src = imageUrl;
        img.onerror = () => {
             console.error(`Failed to load image for ${champion.id}: ${imageUrl}`);
             const errorSpan = document.createElement('span');
             errorSpan.className = 'slot-error-text';
             errorSpan.textContent = 'Err';
             slotElement.innerHTML = '';
             slotElement.appendChild(errorSpan);
             if (type === 'pick') { addNicknameInput(slotElement, nicknameText); }
        };
        slotElement.appendChild(img);
        if (type === 'pick') {
            addNicknameInput(slotElement, nicknameText);
            slotElement.dataset.championId = champion.id;
        } else {
            delete slotElement.dataset.championId;
        }
        const baseAriaLabelKey = slotElement.dataset.langKey;
        const baseAriaLabelTemplate = translations[currentLanguage][baseAriaLabelKey] || (type === 'pick' ? `Pick {n}` : `Ban {n}`);
        const slotNumberMatch = slotElement.id.match(/\d+$/);
        const slotNumber = slotNumberMatch ? slotNumberMatch[0] : '?';
        const baseAriaLabel = baseAriaLabelTemplate.replace('{n}', slotNumber);
        slotElement.setAttribute('aria-label', `${baseAriaLabel}: ${champion.name[currentLanguage]}`);
    }
    function addNicknameInput(slotElement, text = '') {
         const nicknameInput = document.createElement('div');
         nicknameInput.spellcheck = false;
         nicknameInput.className = 'nickname-input';
         nicknameInput.textContent = text || '';
         nicknameInput.dataset.slotId = slotElement.id;
         const canEdit = hasPermission('editNicknames');
         nicknameInput.contentEditable = canEdit;
         nicknameInput.style.cursor = canEdit ? 'text' : 'default';
         nicknameInput.dataset.placeholder = translations[currentLanguage].pickSlotNicknamePlaceholder || 'Player';
         if (canEdit) {
             nicknameInput.addEventListener('input', (e) => {
                 const slotId = e.target.dataset.slotId;
                 if (slotId) { pickNicknames[slotId] = e.target.textContent.trim(); }
             });
             nicknameInput.addEventListener('keydown', (e) => {
                 if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); }
             });
             nicknameInput.addEventListener('blur', (e) => {
                 const slotId = e.target.dataset.slotId;
                 if (slotId) { pickNicknames[slotId] = e.target.textContent.trim(); }
             });
         }
         slotElement.appendChild(nicknameInput);
     }
    function restoreSlotPlaceholder(slotElement, slotId, nicknameText = '') {
        if (!slotElement) return;
        slotElement.innerHTML = '';
        slotElement.classList.remove('preview-flash', 'swap-selected', 'highlight-action');
        delete slotElement.dataset.championId;
        slotElement.style.backgroundImage = '';
        slotElement.style.cursor = 'default';
        slotElement.title = '';
        const baseAriaLabelKey = slotElement.dataset.langKey;
        const baseAriaLabelTemplate = translations[currentLanguage][baseAriaLabelKey] || (slotId.includes('-pick-') ? `Pick {n}` : `Ban {n}`);
        const slotNumberMatch = slotId.match(/\d+$/);
        const slotNumber = slotNumberMatch ? slotNumberMatch[0] : '?';
        const baseAriaLabel = baseAriaLabelTemplate.replace('{n}', slotNumber);
        slotElement.setAttribute('aria-label', `${baseAriaLabel}: Empty`);
        if (slotId && slotId.includes('-pick-')) {
            addNicknameInput(slotElement, nicknameText);
            pickNicknames[slotId] = nicknameText; // Ensure state is updated when restoring
        } else {
            delete pickNicknames[slotId];
        }
    }
    function getSlotChampionId(slotId) { const slotElement = document.getElementById(slotId); return slotElement ? slotElement.dataset.championId : null; }
    function handleUndo() {
         console.log("handleUndo called"); if (draftHistory.length === 0 || !isDraftStarted) return;
         const lastAction = draftHistory[draftHistory.length - 1];
         if (!hasPermission('undoAction', lastAction.team)) {
             showStatusMessage("permDeniedUndo", 2000);
             return;
         }
         draftHistory.pop();
         if (!lastAction) return;
         console.log("Undoing action:", lastAction);
         currentStep = lastAction.step;
         selectedChampions.delete(lastAction.championId);
         const slotElement = document.getElementById(lastAction.slotId);
         if (slotElement) {
             restoreSlotPlaceholder(slotElement, lastAction.slotId, lastAction.previousNickname);
             slotElement.classList.remove('preview-flash');
         } else {
             console.warn(`Undo failed: Slot element ${lastAction.slotId} not found.`);
         }
         previewedChampion = null; // Clear preview on undo
         isDraftComplete = false; // Draft is no longer complete
         stopTimer(); // Stop timer after undoing
         timerSeconds = draftTimerDuration; // Reset timer seconds
         updateDraftUI(); // Update UI for the previous step (will restart timer if conditions met)
         filterChampions();
         deselectSwapSlots();
         showStatusMessage("actionUndone", 1500);
    }

    // --- MODIFIED: resetDraftFull ---
    function resetDraftFull(force = false) {
        console.log("resetDraftFull called, force:", force);
        if (!hasPermission('resetDraft')) {
            showStatusMessage("permDeniedReset", 2000);
            return;
        }
        const confirmationMessage = translations[currentLanguage].resetFullConfirmation;
        if (!force && !confirm(confirmationMessage)) {
            console.log("Full reset cancelled by user.");
            return;
        }
        console.log("resetDraftFull proceeding...");
        currentStep = 0;
        selectedChampions.clear();
        draftHistory = [];
        pickNicknames = {}; // Clear nicknames on full reset
        globallyDisabledChampions.clear();
        globalBanHistory = [];
        isDraftComplete = false;
        isDraftStarted = false; // Draft is no longer started
        previewedChampion = null; // --- ТЗ №5: Ensure previewedChampion is reset ---
        deselectSwapSlots();
        stopTimer(); // Stop any running timer
        timerSeconds = draftTimerDuration; // Reset timer duration display
        document.querySelectorAll('.pick-slot, .ban-slot').forEach((slot) => {
            restoreSlotPlaceholder(slot, slot.id, '');
            slot.classList.remove('highlight-action', 'preview-flash');
        });
        if (blueTeamNameH2) blueTeamNameH2.textContent = localStorage.getItem('lobbyTeam1Name') || translations[currentLanguage].blueTeamDefaultName;
        if (redTeamNameH2) redTeamNameH2.textContent = localStorage.getItem('lobbyTeam2Name') || translations[currentLanguage].redTeamDefaultName;
        if (blueScoreEl) blueScoreEl.textContent = '';
        if (redScoreEl) redScoreEl.textContent = '';
        if(blueColumn) blueColumn.classList.add('draft-disabled'); // Disable columns visually
        if(redColumn) redColumn.classList.add('draft-disabled');
        if(championSearch) championSearch.value = '';
        currentRoleFilter = 'All';
        if(filterButtons) {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            filterButtons[0]?.classList.add('active');
        }
        displayGloballyBanned(); // Update global ban display (should be empty)
        updateChampionAvailability(); // Update champion grid availability
        filterChampions(); // Apply filters (reset search term)
        updateDraftUI(); // Update the entire UI to reflect the reset state (timer display, button states etc.)
        updateUIText(currentLanguage); // Update text elements
        if (!force) {
             showStatusMessage("resetFullComplete", 2000);
        }
        console.log("Full reset complete. Timer stopped. isDraftStarted set to false.");
        // --- ТЗ №5: No calls to startTimer() or handleStartDraft() here ---
    }
    // --- End MODIFIED: resetDraftFull ---

    function resetCurrentGamePicksBans(force = false, keepGlobal = false) {
         console.log("resetCurrentGamePicksBans called, force:", force, "keepGlobal:", keepGlobal);
         if (!force) {
             const globalPart = keepGlobal ? translations[currentLanguage].resetCurrentGlobalPart : '';
             const confirmationMessage = translations[currentLanguage].resetCurrentConfirmation.replace('{global}', globalPart);
             if (!confirm(confirmationMessage)) {
                 console.log("Current game reset cancelled by user.");
                 return;
             }
         }
         console.log("resetCurrentGamePicksBans proceeding...");
         currentStep = 0;
         selectedChampions.clear();
         draftHistory = [];
         isDraftComplete = false;
         isDraftStarted = false; // Also reset draft started state here
         previewedChampion = null; // Reset preview
         deselectSwapSlots();
         stopTimer(); // Stop timer
         timerSeconds = draftTimerDuration; // Reset timer display
         if (!keepGlobal) {
             globallyDisabledChampions.clear();
             globalBanHistory = [];
             console.log("Global bans cleared as part of current game reset.");
         } else {
             globallyDisabledChampions.forEach(champId => selectedChampions.add(champId));
             console.log("Keeping global bans. Re-applied to selections.");
         }
         document.querySelectorAll('.pick-slot, .ban-slot').forEach((slot) => {
             const currentNickname = pickNicknames[slot.id] || ''; // Keep nicknames
             restoreSlotPlaceholder(slot, slot.id, currentNickname);
             slot.classList.remove('highlight-action', 'preview-flash');
         });
         if(blueColumn) blueColumn.classList.add('draft-disabled'); // Disable columns visually
         if(redColumn) redColumn.classList.add('draft-disabled');
         displayGloballyBanned();
         updateChampionAvailability();
         filterChampions();
         updateDraftUI(); // Update UI after reset
         if (!force) {
             const globalPartMsg = keepGlobal ? translations[currentLanguage].resetCurrentGlobalPart : '';
             const statusKey = keepGlobal ? "resetCurrentCompleteKeptGlobal" : "resetCurrentComplete";
             showStatusMessage(statusKey, 2000, { global: globalPartMsg });
         }
         console.log("resetCurrentGamePicksBans finished. Timer stopped. isDraftStarted set to false.");
         // --- ТЗ №5: No calls to startTimer() or handleStartDraft() here ---
    }
    function handleStartDraft() {
        console.log("Starting draft...");
        if (!hasPermission('startDraft')) {
            showStatusMessage("permDeniedStartDraft", 2000);
            return;
        }
        if (isDraftStarted) {
            console.log("Draft already started.");
            return; // Don't restart if already started
        }
        isDraftStarted = true;
        isDraftComplete = false; // Ensure complete is false
        currentStep = 0; // Ensure starting from step 0
        previewedChampion = null; // Ensure no preview carry-over
        if(blueColumn) blueColumn.classList.remove('draft-disabled');
        if(redColumn) redColumn.classList.remove('draft-disabled');
        updateDraftUI(); // Update UI after starting (will trigger timer start in updateDraftUI if conditions met)
    }
    const debouncedFilter = debounce(() => { filterChampions(); }, 250);
    function filterChampions() {
        if (!isDraftInitialized || !championSearch || !championGridElement) return;
        const searchTerm = championSearch.value.toLowerCase().trim();
        let visibleCount = 0;
        championGridElement.querySelectorAll('.champion-card').forEach(card => {
            const champId = card.dataset.championId;
            const nameEn = card.dataset.championNameEn || '';
            const nameRu = card.dataset.championNameRu || '';
            const champRoles = card.dataset.roles ? card.dataset.roles.split(',') : [];
            const searchMatch = !searchTerm || nameEn.includes(searchTerm) || nameRu.includes(searchTerm) || champId.toLowerCase().includes(searchTerm);
            const roleMatch = currentRoleFilter === 'All' || (champRoles.length > 0 && champRoles.includes(currentRoleFilter));
            const isWRChamp = wildRiftChampions.has(champId);
            const hideByWRFilter = isWildRiftModeActive && !isWRChamp;
            const isVisible = searchMatch && roleMatch && !hideByWRFilter;
            card.style.display = isVisible ? 'flex' : 'none';
            if (isVisible) visibleCount++;
            const isDisabled = selectedChampions.has(champId) || globallyDisabledChampions.has(champId);
            card.classList.toggle('disabled', isDisabled);
            card.disabled = isDisabled;
            card.setAttribute('aria-disabled', isDisabled.toString());
            card.classList.toggle('selected', selectedChampions.has(champId));
        });
    }
    function deselectSwapSlots() { if (selectedSwapSlotId) { const prevSelected = document.getElementById(selectedSwapSlotId); if (prevSelected) { prevSelected.classList.remove('swap-selected'); } selectedSwapSlotId = null; } }
    function handlePickContainerClick(event) {
         if (event.target.classList.contains('nickname-input')) { return; }
         if (!hasPermission('nextOrSwap')) { return; }
         const clickedSlot = event.target.closest('.pick-slot');
         if (isDraftStarted || !clickedSlot || !clickedSlot.dataset.championId) {
             deselectSwapSlots();
             return;
         }
         const clickedSlotId = clickedSlot.id;
         if (!selectedSwapSlotId) {
             selectedSwapSlotId = clickedSlotId;
             clickedSlot.classList.add('swap-selected');
             console.log(`Swap selected: ${selectedSwapSlotId}`);
         } else {
             if (selectedSwapSlotId === clickedSlotId) {
                 deselectSwapSlots();
                 console.log("Swap deselected.");
             } else {
                 const firstSlot = document.getElementById(selectedSwapSlotId);
                 if (!firstSlot) { deselectSwapSlots(); return; }
                 const team1 = selectedSwapSlotId.startsWith('blue') ? 'blue' : 'red';
                 const team2 = clickedSlotId.startsWith('blue') ? 'blue' : 'red';
                 if (team1 === team2) {
                     const champId1 = firstSlot.dataset.championId;
                     const champId2 = clickedSlot.dataset.championId;
                     const champ1 = getChampionById(champId1);
                     const champ2 = getChampionById(champId2);
                     const nick1 = pickNicknames[selectedSwapSlotId] || '';
                     const nick2 = pickNicknames[clickedSlotId] || '';
                     pickNicknames[selectedSwapSlotId] = nick2; // Swap state first
                     pickNicknames[clickedSlotId] = nick1;
                     if (champ1 && champ2) {
                         fillSlot(firstSlot, champ2, 'pick', nick2); // Then update visual
                         fillSlot(clickedSlot, champ1, 'pick', nick1);
                         showStatusMessage("swapConfirm", 2000, { champ1: champ1.name[currentLanguage], champ2: champ2.name[currentLanguage] });
                         console.log(`Swapped ${champId1} (${nick1}) in ${selectedSwapSlotId} with ${champId2} (${nick2}) in ${clickedSlotId}`);
                     } else {
                         console.error("Swap failed: Champion data missing.");
                         pickNicknames[selectedSwapSlotId] = nick1; // Revert state on error
                         pickNicknames[clickedSlotId] = nick2;
                     }
                     deselectSwapSlots();
                 } else {
                     console.log("Cannot swap between teams. Selecting new slot.");
                     deselectSwapSlots();
                     selectedSwapSlotId = clickedSlotId;
                     clickedSlot.classList.add('swap-selected');
                 }
             }
         }
     }
    // --- MODIFIED: handleSwapTeams ---
    function handleSwapTeams() {
        console.log("handleSwapTeams logic executing");
        if (!hasPermission('nextOrSwap')) {
            showStatusMessage("permDeniedSwap", 2000);
            return;
        }
        if (isDraftStarted && !isDraftComplete) {
            showStatusMessage("swapDuringDraftError", 3000);
            return;
        }

        try {
            // 1. Swap Team Names (Visual + LocalStorage)
            const tempName = blueTeamNameH2.textContent;
            blueTeamNameH2.textContent = redTeamNameH2.textContent;
            redTeamNameH2.textContent = tempName;
            const storedName1 = localStorage.getItem('lobbyTeam1Name');
            const storedName2 = localStorage.getItem('lobbyTeam2Name');
            localStorage.setItem('lobbyTeam1Name', storedName2 || translations[currentLanguage].redTeamDefaultName);
            localStorage.setItem('lobbyTeam2Name', storedName1 || translations[currentLanguage].blueTeamDefaultName);

            // 2. Swap Scores (Visual)
            const tempScore = blueScoreEl.textContent;
            blueScoreEl.textContent = redScoreEl.textContent;
            redScoreEl.textContent = tempScore;

            // 3. Swap Global Bans History & State
            globalBanHistory.forEach(ban => { ban.team = ban.team === 'blue' ? 'red' : 'blue'; });
            globallyDisabledChampions.clear();
            globalBanHistory.forEach(ban => globallyDisabledChampions.add(ban.championId));

            // 4. Prepare for Swapping Picks/Bans - Gather current state *before* modification
            const bluePicksData = []; // Stores { champId, nick } for blue slots 1-5
            const redPicksData = []; // Stores { champId, nick } for red slots 1-5
            const blueBansData = []; // Stores { championId } for blue bans 1-5
            const redBansData = []; // Stores { championId } for red bans 1-5

            for (let i = 1; i <= 5; i++) {
                // Gather Bans (using draftHistory for accuracy)
                const blueBanSlotId = `blue-ban-${i}`;
                const redBanSlotId = `red-ban-${i}`;
                const blueBanAction = draftHistory.find(a => a.slotId === blueBanSlotId && a.type === 'ban');
                const redBanAction = draftHistory.find(a => a.slotId === redBanSlotId && a.type === 'ban');
                blueBansData.push({ championId: blueBanAction?.championId || null }); // Store null if no ban
                redBansData.push({ championId: redBanAction?.championId || null });

                // Gather Picks (championId from slot, nickname from state)
                const bluePickSlotId = `blue-pick-${i}`;
                const redPickSlotId = `red-pick-${i}`;
                const bluePickChampId = getSlotChampionId(bluePickSlotId);
                const redPickChampId = getSlotChampionId(redPickSlotId);
                const blueNick = pickNicknames[bluePickSlotId] || '';
                const redNick = pickNicknames[redPickSlotId] || '';
                bluePicksData.push({ champId: bluePickChampId, nick: blueNick });
                redPicksData.push({ champId: redPickChampId, nick: redNick });
            }

            // 5. Update Nickname State Object (`pickNicknames`)
            const newPickNicknames = {};
            for (let i = 0; i < 5; i++) {
                const blueSlotId = `blue-pick-${i + 1}`;
                const redSlotId = `red-pick-${i + 1}`;
                newPickNicknames[blueSlotId] = redPicksData[i].nick; // Blue slot gets Red's old nickname
                newPickNicknames[redSlotId] = bluePicksData[i].nick; // Red slot gets Blue's old nickname
            }
            pickNicknames = newPickNicknames; // Update the main state object

            // 6. Update Visual Slots and Selected Champions Set
            const newSelectedChampions = new Set();
            // Apply swapped bans
            for (let i = 0; i < 5; i++) {
                const blueBanSlot = document.getElementById(`blue-ban-${i + 1}`);
                const redBanSlot = document.getElementById(`red-ban-${i + 1}`);
                const blueBanChampId = redBansData[i].championId; // Blue gets Red's ban
                const redBanChampId = blueBansData[i].championId; // Red gets Blue's ban

                if (blueBanChampId) {
                    const champ = getChampionById(blueBanChampId);
                    if (champ && blueBanSlot) fillSlot(blueBanSlot, champ, 'ban');
                    newSelectedChampions.add(blueBanChampId);
                } else if (blueBanSlot) {
                    restoreSlotPlaceholder(blueBanSlot, `blue-ban-${i + 1}`);
                }

                if (redBanChampId) {
                    const champ = getChampionById(redBanChampId);
                    if (champ && redBanSlot) fillSlot(redBanSlot, champ, 'ban');
                    newSelectedChampions.add(redBanChampId);
                } else if (redBanSlot) {
                    restoreSlotPlaceholder(redBanSlot, `red-ban-${i + 1}`);
                }
            }
            // Apply swapped picks (using the updated pickNicknames state)
            for (let i = 0; i < 5; i++) {
                const blueSlot = document.getElementById(`blue-pick-${i + 1}`);
                const redSlot = document.getElementById(`red-pick-${i + 1}`);
                const blueChampId = redPicksData[i].champId; // Blue gets Red's pick
                const redChampId = bluePicksData[i].champId; // Red gets Blue's pick
                const blueNick = pickNicknames[`blue-pick-${i + 1}`]; // Get newly assigned nickname
                const redNick = pickNicknames[`red-pick-${i + 1}`]; // Get newly assigned nickname

                if (blueChampId) {
                    const champ = getChampionById(blueChampId);
                    if (champ && blueSlot) fillSlot(blueSlot, champ, 'pick', blueNick);
                    newSelectedChampions.add(blueChampId);
                } else if (blueSlot) {
                    restoreSlotPlaceholder(blueSlot, `blue-pick-${i + 1}`, blueNick); // Restore with correct (swapped) nickname
                }

                if (redChampId) {
                    const champ = getChampionById(redChampId);
                    if (champ && redSlot) fillSlot(redSlot, champ, 'pick', redNick);
                    newSelectedChampions.add(redChampId);
                } else if (redSlot) {
                    restoreSlotPlaceholder(redSlot, `red-pick-${i + 1}`, redNick); // Restore with correct (swapped) nickname
                }
            }

            // Update selected champions state
            selectedChampions = newSelectedChampions;
            // Re-apply global bans to the selected set
            globallyDisabledChampions.forEach(id => selectedChampions.add(id));

            // 7. Final UI Updates
            deselectSwapSlots();
            showStatusMessage("swapSuccess", 2000);
            displayGloballyBanned();
            updateChampionAvailability();
            updateDraftUI(); // Update UI after swap
            // --- ТЗ №5: Ensure timer doesn't start after swap ---
            // updateDraftUI is called, and since isDraftStarted should be false, timer won't start.

        } catch (error) {
            console.error("Error in handleSwapTeams:", error);
            showStatusMessage("swapError", 3000);
        }
    }
    // --- End MODIFIED: handleSwapTeams ---

    function handleRoleFilterClick(event) {
         const clickedButton = event.currentTarget;
         if (!clickedButton || clickedButton.disabled) return;
         const role = clickedButton.dataset.role;
         if (!role) return;
         if (!hasPermission('useRoleFilters')) {
             showStatusMessage("permDeniedRoleFilter", 2000);
             return;
         }
         currentRoleFilter = role;
         if (filterButtons) {
             filterButtons.forEach(btn => { btn.classList.remove('active'); });
             clickedButton.classList.add('active');
         }
         filterChampions();
     }
    function displayGloballyBanned() {
        if (!globalBansBlueContainer || !globalBansRedContainer || !globallyBannedDisplay) {
             console.warn("Cannot display global bans: container elements not found.");
             return;
        }
        globalBansBlueContainer.innerHTML = '';
        globalBansRedContainer.innerHTML = '';
        const shouldShow = globalBanHistory.length > 0 && draftMode === 'fearless';
        globallyBannedDisplay.classList.toggle('hidden', !shouldShow);
        if (shouldShow) {
            const blueFragment = document.createDocumentFragment();
            const redFragment = document.createDocumentFragment();
            globalBanHistory.forEach(banInfo => {
                const champ = getChampionById(banInfo.championId);
                if (champ) {
                    const iconDiv = document.createElement('div');
                    iconDiv.className = 'global-ban-icon';
                    const banTeamTextKey = banInfo.team === 'blue' ? "globalBanTeamBlue" : "globalBanTeamRed";
                    const banTeamText = translations[currentLanguage][banTeamTextKey] || banInfo.team;
                    const titleTextTemplate = translations[currentLanguage].globalBanTitle || "{name} (Banned by {team}...)";
                    const titleText = titleTextTemplate.replace('{name}', champ.name[currentLanguage]).replace('{team}', banTeamText);
                    iconDiv.title = titleText;
                    iconDiv.setAttribute('aria-label', titleText);
                    const img = document.createElement('img');
                    img.src = champ.iconUrl;
                    img.alt = "";
                    img.loading = 'lazy';
                    img.onerror = () => { img.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%234a5568'/%3E%3C/svg%3E`; iconDiv.title = `${titleText} (Err)`; };
                    iconDiv.appendChild(img);
                    if (banInfo.team === 'blue') { blueFragment.appendChild(iconDiv); }
                    else { redFragment.appendChild(iconDiv); }
                } else {
                    console.warn(`Could not find champion data for globally banned ID: ${banInfo.championId}`);
                }
            });
            globalBansBlueContainer.appendChild(blueFragment);
            globalBansRedContainer.appendChild(redFragment);
        }
    }

    // --- MODIFIED: handleNextDraft ---
    function handleNextDraft() {
         console.log("handleNextDraft logic executing");
         if (!hasPermission('nextDraft')) {
             showStatusMessage("permDeniedNextDraft", 2000);
             return;
         }
         if (!isDraftComplete) {
             showStatusMessage("nextDraftErrorNotComplete", 3000);
             return;
         }
         let addedBansCount = 0;
         if (draftMode === 'fearless') {
             draftHistory.forEach(action => {
                 if (action.type === 'pick' && !globallyDisabledChampions.has(action.championId)) {
                     globalBanHistory.push({ championId: action.championId, team: action.team });
                     globallyDisabledChampions.add(action.championId);
                     addedBansCount++;
                 }
             });
             console.log(`handleNextDraft (Fearless): Added ${addedBansCount} champions to global bans.`);
             // Reset current game, keep global bans, force=true (no confirmation)
             resetCurrentGamePicksBans(true, true);
             showStatusMessage("nextDraftComplete", 2500);
         } else {
             console.log(`handleNextDraft (Normal): Resetting without adding global bans.`);
             // Reset current game, DO NOT keep global bans, force=true
             resetCurrentGamePicksBans(true, false);
             // Optionally show a different status message for normal mode reset?
             // showStatusMessage("nextDraftNormalReset", 2500); // Example
         }
         // --- ТЗ №5: Ensure timer doesn't start ---
         // resetCurrentGamePicksBans sets isDraftStarted = false and stops timer.
         // updateDraftUI is called inside resetCurrentGamePicksBans.
         // The condition `isDraftStarted` in updateDraftUI's timer logic prevents the timer from starting.
         console.log("handleNextDraft finished. Timer should remain stopped.");
    }
    // --- End MODIFIED: handleNextDraft ---

    function getDraftOrder() {
        // Standard 5 bans per side, standard pick order
        return [
            { team: 'blue', type: 'ban', slot: 'blue-ban-1' },
            { team: 'red', type: 'ban', slot: 'red-ban-1' },
            { team: 'blue', type: 'ban', slot: 'blue-ban-2' },
            { team: 'red', type: 'ban', slot: 'red-ban-2' },
            { team: 'blue', type: 'ban', slot: 'blue-ban-3' },
            { team: 'red', type: 'ban', slot: 'red-ban-3' },
            { team: 'blue', type: 'pick', slot: 'blue-pick-1' },
            { team: 'red', type: 'pick', slot: 'red-pick-1' },
            { team: 'red', type: 'pick', slot: 'red-pick-2' },
            { team: 'blue', type: 'pick', slot: 'blue-pick-2' },
            { team: 'blue', type: 'pick', slot: 'blue-pick-3' },
            { team: 'red', type: 'pick', slot: 'red-pick-3' },
            { team: 'red', type: 'ban', slot: 'red-ban-4' },
            { team: 'blue', type: 'ban', slot: 'blue-ban-4' },
            { team: 'red', type: 'ban', slot: 'red-ban-5' },
            { team: 'blue', type: 'ban', slot: 'blue-ban-5' },
            { team: 'red', type: 'pick', slot: 'red-pick-4' },
            { team: 'blue', type: 'pick', slot: 'blue-pick-4' },
            { team: 'blue', type: 'pick', slot: 'blue-pick-5' },
            { team: 'red', type: 'pick', slot: 'red-pick-5' },
        ];
    }
    let tooltipTimeout;
    function showChampionTooltip(event, champion) {
        clearTimeout(tooltipTimeout);
        tooltipTimeout = setTimeout(() => {
            if (!championTooltip || !champion) return;
            championTooltip.innerHTML = `<strong class="tooltip-title">${champion.name[currentLanguage]}</strong><span class="tooltip-name">${champion.title[currentLanguage]}</span>`;
            championTooltip.style.visibility = 'hidden'; championTooltip.style.display = 'block';
            const tooltipRect = championTooltip.getBoundingClientRect();
            championTooltip.style.visibility = ''; championTooltip.style.display = '';
            const targetRect = event.target.getBoundingClientRect();
            const gap = 8;
            let top = targetRect.top - tooltipRect.height - gap;
            let left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
            if (top < 0) { top = targetRect.bottom + gap; }
            const viewportWidth = window.innerWidth;
            if (left < gap) { left = gap; }
            else if (left + tooltipRect.width > viewportWidth - gap) { left = viewportWidth - tooltipRect.width - gap; }
            championTooltip.style.left = `${left}px`; championTooltip.style.top = `${top}px`;
            championTooltip.classList.add('visible');
        }, 100);
    }
    function hideChampionTooltip() { clearTimeout(tooltipTimeout); if (championTooltip) { championTooltip.classList.remove('visible'); } }

    // --- Initial App Setup ---
    async function initializeApp() {
        console.log("Initializing App...");
        setupInitialEventListeners();
        applyTheme(currentTheme);
        applyLanguage(currentLanguage);
        updateSettingsUI();
        await loadChampionData();
        if (!initialPageDetermined) {
             const initialRole = getRoleFromHash();
             if (initialRole) {
                 console.log(`Initial role from hash: ${initialRole}`);
                 currentUserRole = initialRole;
                 navigateTo('draft');
             } else {
                 console.log("No initial role hash found, navigating to home.");
                 navigateTo('home');
             }
             initialPageDetermined = true;
        } else {
             console.log("App already initialized, skipping initial navigation determination.");
        }
        console.log("App Initialized.");
    }

    // --- Start the application ---
    initializeApp();

}); // End DOMContentLoaded