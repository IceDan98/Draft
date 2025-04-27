// script.js v9.6 - Implement Ready State UI Indicators (TZ Point 8)
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Fully Loaded. Initializing App v9.6..."); // Version Updated

    // --- Language State & Translations ---
    let currentLanguage = localStorage.getItem('language') || 'ru';
    const translations = {
        ru: {
            // Home Page
            homeTitle: "LoL Wild-Rift Drafter",
            team1Placeholder: "Команда 1",
            team2Placeholder: "Команда 2",
            createLobbyButton: "Создать Драфт",
            lobbyModalTitle: "",
            selectRolePrompt: "",
            judgeRoleButton: "Наблюдатель",
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
            timerReadyTitle: "Готов",
            timerConfirmActionTitle: "Подтвердить",
            timerDraftRunningTitle: "Драфт идет...",
            timerDraftCompleteText: "Драфт Завершен!",
            timerDraftCompleteTitle: "Драфт завершен",
            timerAriaLabelStartAdmin: "Таймер / Старт драфта (Админ)",
            timerAriaLabelReadyTeam: "Подтвердить готовность к драфту",
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
            nextDraftReadyTitle: "Готов",
            nextDraftWaitingTitle: "Ожидание...",
            nextDraftAriaLabel: "Перейти к следующему драфту",
            swapTeamsTitle: "Смена сторон",
            swapTeamsReadyTitle: "Готов",
            swapTeamsWaitingTitle: "Ожидание...",
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
            permDeniedSetReadySwap: "Нет прав подтвердить готовность к смене сторон.",
            permDeniedNextDraft: "Нет прав для перехода к следующему драфту.",
            permDeniedStartDraft: "Нет прав для старта драфта.",
            permDeniedSetReady: "Нет прав для подтверждения готовности.",
            permDeniedSetReadyNext: "Нет прав подтвердить готовность к след. драфту.",
            permDeniedPreviewPick: "Нет прав на выбор чемпиона.",
            permDeniedPreviewBan: "Нет прав на бан чемпиона.",
            permDeniedConfirm: "Нет прав на подтверждение действия.",
            permDeniedRoleFilter: "Нет прав на использование фильтров ролей.",
            permDeniedEditName: "Нет прав на изменение имени команды.",
            permDeniedEditScore: "Нет прав на изменение счета.",
            permDeniedEditNickname: "Нет прав на изменение никнейма.",
            // Ready state messages
            readyConfirmation: "Вы подтвердили готовность. Ожидание другой команды...",
            bothTeamsReadyStarting: "Обе команды готовы. Драфт начинается!",
            readyTimeout: "Время ожидания другой команды истекло. Ваша готовность сброшена.",
            nextDraftReadyConfirmation: "Готовность к следующему драфту подтверждена. Ожидание...",
            bothTeamsReadyNextDraft: "Обе команды готовы к следующему драфту. Переход...",
            nextDraftReadyTimeout: "Время ожидания готовности другой команды к след. драфту истекло.",
            swapReadyConfirmation: "Готовность к смене сторон подтверждена. Ожидание...",
            bothTeamsReadySwap: "Обе команды готовы к смене сторон. Меняем...",
            swapReadyTimeout: "Время ожидания готовности другой команды к смене сторон истекло.",
            swapNotAllowed: "Смена сторон сейчас недоступна.",
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
            createLobbyButton: "Create Draft",
            lobbyModalTitle: "",
            selectRolePrompt: "",
            judgeRoleButton: "Spectator",
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
            timerReadyTitle: "Ready",
            timerConfirmActionTitle: "Confirm",
            timerDraftRunningTitle: "Draft in progress...",
            timerDraftCompleteText: "Draft Complete!",
            timerDraftCompleteTitle: "Draft complete",
            timerAriaLabelStartAdmin: "Timer / Start Draft (Admin)",
            timerAriaLabelReadyTeam: "Confirm ready for draft",
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
            nextDraftReadyTitle: "Ready",
            nextDraftWaitingTitle: "Waiting...",
            nextDraftAriaLabel: "Proceed to next draft",
            swapTeamsTitle: "Swap Teams",
            swapTeamsReadyTitle: "Ready",
            swapTeamsWaitingTitle: "Waiting...",
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
            permDeniedSetReadySwap: "No permission to confirm ready for swap.",
            permDeniedNextDraft: "No permission to proceed to next draft.",
            permDeniedStartDraft: "No permission to start draft.",
            permDeniedSetReady: "No permission to set ready state.",
            permDeniedSetReadyNext: "No permission to confirm ready for next draft.",
            permDeniedPreviewPick: "No permission to pick champion.",
            permDeniedPreviewBan: "No permission to ban champion.",
            permDeniedConfirm: "No permission to confirm action.",
            permDeniedRoleFilter: "No permission to use role filters.",
            permDeniedEditName: "No permission to edit team name.",
            permDeniedEditScore: "No permission to edit score.",
            permDeniedEditNickname: "No permission to edit nickname.",
             // Ready state messages
            readyConfirmation: "You confirmed readiness. Waiting for the other team...",
            bothTeamsReadyStarting: "Both teams ready. Starting draft!",
            readyTimeout: "Waiting time for the other team expired. Your readiness has been reset.",
            nextDraftReadyConfirmation: "Confirmed ready for next draft. Waiting...",
            bothTeamsReadyNextDraft: "Both teams ready for next draft. Proceeding...",
            nextDraftReadyTimeout: "Waiting time for the other team for next draft expired.",
            swapReadyConfirmation: "Confirmed ready for swap. Waiting...",
            bothTeamsReadySwap: "Both teams ready for swap. Swapping...",
            swapReadyTimeout: "Waiting time for the other team for swap expired.",
            swapNotAllowed: "Swapping sides is not available right now.",
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

    // --- State Variables for Ready Mechanics ---
    let team1ReadyState = false;
    let team2ReadyState = false;
    let team1ReadyTimeout = null;
    let team2ReadyTimeout = null;
    let team1NextReadyTimeout = null;
    let team2NextReadyTimeout = null;
    let team1SwapReadyState = false;
    let team2SwapReadyState = false;
    let team1SwapReadyTimeout = null;
    let team2SwapReadyTimeout = null;
    let swapTeamsAllowed = false;

    // --- Permissions Map ---
    const permissions = {
        admin: { editTeamName: true, editScore: true, resetDraft: true, startDraft: true, editNicknames: true, nextDraft: true, pickChampion: true, banChampion: true, undoAction: true, useRoleFilters: true, returnHome: true, nextOrSwap: true, confirmOrStart: true, swapTeams: true, setReady: true, setReadyNext: true, setReadySwap: true },
        spectator: {
            editTeamName: false, editScore: false, resetDraft: false, startDraft: false,
            editNicknames: false, nextDraft: false, pickChampion: false, banChampion: false,
            undoAction: false, useRoleFilters: false, returnHome: true, nextOrSwap: false,
            confirmOrStart: false, swapTeams: false, setReady: false, setReadyNext: false, setReadySwap: false
        },
        team1: {
            editTeamName: false, editScore: false, resetDraft: true,
            startDraft: false,
            editNicknames: true, // Logic updated in updateNicknameEditability
            nextDraft: true,
            pickChampion: true, banChampion: true, undoAction: true, // Logic updated in handleUndo
            useRoleFilters: true, returnHome: true, nextOrSwap: false,
            confirmOrStart: true, swapTeams: true, setReady: true, setReadyNext: true, setReadySwap: true
        },
        team2: {
            editTeamName: false, editScore: false, resetDraft: true,
            startDraft: false,
            editNicknames: true, // Logic updated in updateNicknameEditability
            nextDraft: true,
            pickChampion: true, banChampion: true, undoAction: true, // Logic updated in handleUndo
            useRoleFilters: true, returnHome: true, nextOrSwap: false,
            confirmOrStart: true, swapTeams: true, setReady: true, setReadyNext: true, setReadySwap: true
        },
        default: {
            editTeamName: false, editScore: false, resetDraft: false, startDraft: false,
            editNicknames: false, nextDraft: false, pickChampion: false, banChampion: false,
            undoAction: false, useRoleFilters: false, returnHome: true, nextOrSwap: false,
            confirmOrStart: false, swapTeams: false, setReady: false, setReadyNext: false, setReadySwap: false
        }
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
        const isAdmin = currentUserRole === 'admin';
        const isSpectator = currentUserRole === 'spectator';

        if (isSpectator) {
            return action === 'returnHome';
        }

        const hasBasicPermission = rolePerms[action];

        if (!hasBasicPermission) return false;
        if (isAdmin) return true;

        if (currentUserRole === 'team1' || currentUserRole === 'team2') {
            // Check if action requires team context and if the user is on that team
            if ((action === 'pickChampion' || action === 'banChampion' || action === 'confirmOrStart') && team) {
                 return userTeamSide === team;
            }
            // Specific logic for editNicknames (checked in updateNicknameEditability)
            // Specific logic for undoAction (checked in handleUndo)
            if (action === 'editNicknames' || action === 'undoAction') {
                return hasBasicPermission; // Basic permission check is enough here
            }
            // Check other team permissions
            if (action === 'resetDraft' || action === 'nextDraft' || action === 'swapTeams' || action === 'setReady' || action === 'setReadyNext' || action === 'setReadySwap' || action === 'useRoleFilters' || action === 'returnHome') {
                return hasBasicPermission;
            }
        }
        // Fallback for default role or unhandled cases
        return hasBasicPermission;
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
            if (el.tagName === 'BUTTON' && el.dataset.role === 'judge') {
                 key = 'judgeRoleButton';
                 translation = langTranslations[key];
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
                    // Update button text, ensuring icons are preserved if needed
                    if (el.tagName === 'BUTTON' && (key === 'createLobbyButton' || key === 'judgeRoleButton' || key === 'nextDraftTitle' || key === 'swapTeamsTitle')) {
                        // Preserve icon if it's an icon button
                        const icon = el.querySelector('svg');
                        el.textContent = translation; // Set text first
                        if (icon && (key === 'nextDraftTitle' || key === 'swapTeamsTitle')) {
                            el.prepend(icon); // Add icon back if it was there
                        }
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
             updateNextSwapButtonContent(langTranslations); // Update next/swap button text
         }
        if (isDraftInitialized) {
             displayChampions();
        }
     }
     function updateTimerDisplayContent(langTranslations) {
         if (!timerDisplay) return;
         timerDisplay.classList.remove('timer-awaiting-confirmation', 'timer-running', 'timer-ending');

         if (!isDraftStarted) {
             if (currentUserRole === 'admin') {
                 timerDisplay.title = langTranslations.timerStartDraftTitle;
                 timerDisplay.setAttribute('aria-label', langTranslations.timerAriaLabelStartAdmin);
                 timerDisplay.textContent = langTranslations.timerStartDraftTitle;
             } else if (currentUserRole === 'team1' || currentUserRole === 'team2') {
                 const isReady = (currentUserRole === 'team1' && team1ReadyState) || (currentUserRole === 'team2' && team2ReadyState);
                 timerDisplay.title = langTranslations.timerReadyTitle;
                 timerDisplay.setAttribute('aria-label', langTranslations.timerAriaLabelReadyTeam);
                 timerDisplay.textContent = langTranslations.timerReadyTitle;
                 timerDisplay.disabled = isReady;
             } else {
                 timerDisplay.title = "";
                 timerDisplay.setAttribute('aria-label', "");
                 timerDisplay.textContent = "--:--";
                 timerDisplay.disabled = true;
             }
         } else if (isDraftComplete) {
             timerDisplay.title = langTranslations.timerDraftCompleteTitle;
             timerDisplay.setAttribute('aria-label', langTranslations.timerDraftCompleteTitle);
             timerDisplay.textContent = langTranslations.timerDraftCompleteText;
             timerDisplay.disabled = true;
         } else if (previewedChampion) {
             timerDisplay.title = langTranslations.timerConfirmActionTitle;
             timerDisplay.setAttribute('aria-label', langTranslations.timerAriaLabelConfirm);
             timerDisplay.textContent = timerInterval ? formatTime(timerSeconds) : langTranslations.timerConfirmActionTitle;
             timerDisplay.classList.add('timer-awaiting-confirmation');
             const draftOrder = getDraftOrder();
             const currentAction = currentStep < draftOrder.length ? draftOrder[currentStep] : null;
             timerDisplay.disabled = !currentAction || !hasPermission('confirmOrStart', currentAction.team);
         } else {
             timerDisplay.title = langTranslations.timerDraftRunningTitle;
             timerDisplay.setAttribute('aria-label', langTranslations.timerAriaLabelRunning.replace('{time}', formatTime(timerSeconds)));
             timerDisplay.textContent = timerInterval ? formatTime(timerSeconds) : "--:--";
             timerDisplay.classList.add('timer-running');
             timerDisplay.disabled = true;
             if (timerSeconds <= 10 && timerSeconds > 0) {
                 timerDisplay.classList.add('timer-ending');
             }
         }
     }
     function updateNextSwapButtonContent(langTranslations) {
         // --- Next Draft Button ---
         if (nextDraftButton) {
             const isTeamRole = currentUserRole === 'team1' || currentUserRole === 'team2';
             const isReady = isTeamRole && ((currentUserRole === 'team1' && team1ReadyState) || (currentUserRole === 'team2' && team2ReadyState));
             const otherReady = isTeamRole && ((currentUserRole === 'team1' && team2ReadyState) || (currentUserRole === 'team2' && team1ReadyState));
             let textKey = 'nextDraftTitle';
             let titleKey = 'nextDraftTitle';

             if (isDraftComplete && isTeamRole) {
                 if (isReady && !otherReady) {
                     textKey = 'nextDraftWaitingTitle';
                     titleKey = 'nextDraftWaitingTitle';
                 } else if (isReady && otherReady) {
                     textKey = 'nextDraftTitle'; // Reverts briefly before disable
                     titleKey = 'nextDraftTitle';
                 } else {
                     textKey = 'nextDraftTitle';
                     titleKey = 'nextDraftTitle';
                 }
             } else if (isDraftComplete && currentUserRole === 'admin') {
                 textKey = 'nextDraftTitle';
                 titleKey = 'nextDraftTitle';
             }
             // Set text and title using keys
             nextDraftButton.textContent = langTranslations[textKey] || textKey;
             nextDraftButton.title = langTranslations[titleKey] || titleKey;
             nextDraftButton.setAttribute('aria-label', langTranslations.nextDraftAriaLabel || "Proceed to next draft");
         }

         // --- Swap Teams Button ---
         if (swapTeamsButton) {
             const isTeamRole = currentUserRole === 'team1' || currentUserRole === 'team2';
             const isSwapReady = isTeamRole && ((currentUserRole === 'team1' && team1SwapReadyState) || (currentUserRole === 'team2' && team2SwapReadyState));
             const otherSwapReady = isTeamRole && ((currentUserRole === 'team1' && team2SwapReadyState) || (currentUserRole === 'team2' && team1SwapReadyState));
             let textKey = 'swapTeamsTitle';
             let titleKey = 'swapTeamsTitle';

             // Change text only if swapping is currently allowed
             if (swapTeamsAllowed && isTeamRole) {
                 if (isSwapReady && !otherSwapReady) {
                     textKey = 'swapTeamsWaitingTitle';
                     titleKey = 'swapTeamsWaitingTitle';
                 } else if (isSwapReady && otherSwapReady) {
                     textKey = 'swapTeamsTitle'; // Reverts briefly before disable/action
                     titleKey = 'swapTeamsTitle';
                 } else { // Not ready yet
                     textKey = 'swapTeamsTitle';
                     titleKey = 'swapTeamsTitle';
                 }
             } else if (swapTeamsAllowed && currentUserRole === 'admin') {
                  textKey = 'swapTeamsTitle';
                  titleKey = 'swapTeamsTitle';
             }

             // Set text and title using keys, preserving the icon
             const icon = swapTeamsButton.querySelector('svg');
             swapTeamsButton.textContent = langTranslations[textKey] || textKey; // Set text
             if (icon) swapTeamsButton.prepend(icon); // Add icon back
             swapTeamsButton.title = langTranslations[titleKey] || titleKey;
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
            if (window.location.hash && currentUserRole !== 'admin' && currentUserRole !== 'spectator') {
                currentUserRole = null;
                userTeamSide = null;
                history.pushState("", document.title, window.location.pathname + window.location.search);
            }
             updateUIText(currentLanguage);
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
                    updateUIText(currentLanguage);
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
        updateUIText(currentLanguage);
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
            const key = newButton.dataset.langKey;
            if (key) {
                newButton.textContent = translations[currentLanguage][key] || newButton.textContent;
            }
            newButton.addEventListener('click', handleRoleSelection);
        });
     }
    function handleRoleSelection(event) {
        const role = event.target.dataset.role === 'judge' ? 'spectator' : event.target.dataset.role;
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
        else { console.warn("Create Draft Button not found"); }
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
     const handleNextDraftClick = () => {
         console.log(`DEBUG: handleNextDraftClick: Role=${currentUserRole}, Complete=${isDraftComplete}`);
         if (!isDraftComplete) { showStatusMessage("nextDraftErrorNotComplete", 3000); return; }
         if (currentUserRole === 'admin') {
             if (!hasPermission('nextDraft')) { showStatusMessage("permDeniedNextDraft", 2000); return; }
             console.log("DEBUG: Admin forcing next draft.");
             handleNextDraft();
         } else if (currentUserRole === 'team1' || currentUserRole === 'team2') {
             if (!hasPermission('setReadyNext')) { showStatusMessage("permDeniedSetReadyNext", 2000); return; }
             const currentTeam = currentUserRole;
             const otherTeam = (currentTeam === 'team1') ? 'team2' : 'team1';
             const currentReadyState = (currentTeam === 'team1') ? team1ReadyState : team2ReadyState;
             const otherReadyState = (currentTeam === 'team1') ? team2ReadyState : team1ReadyState;
             const currentTimeoutRef = (currentTeam === 'team1') ? 'team1NextReadyTimeout' : 'team2NextReadyTimeout';
             const otherTimeoutRef = (currentTeam === 'team1') ? 'team2NextReadyTimeout' : 'team1NextReadyTimeout';
             if (currentReadyState) { console.log(`DEBUG: ${currentTeam} is already ready for next draft.`); return; }
             console.log(`DEBUG: ${currentTeam} setting ready state for next draft.`);
             if (currentTeam === 'team1') { team1ReadyState = true; } else { team2ReadyState = true; }
             if (window[currentTimeoutRef]) clearTimeout(window[currentTimeoutRef]);
             window[currentTimeoutRef] = setTimeout(() => {
                 console.log(`DEBUG: ${currentTeam} next draft readiness timed out.`);
                 if (currentTeam === 'team1') { team1ReadyState = false; } else { team2ReadyState = false; }
                 window[currentTimeoutRef] = null;
                 showStatusMessage("nextDraftReadyTimeout", 3000);
                 updateDraftUI();
             }, 60000);
             showStatusMessage("nextDraftReadyConfirmation", 2000);
             if (otherReadyState) {
                 console.log("DEBUG: Both teams are now ready for next draft. Proceeding.");
                 if (window[otherTimeoutRef]) clearTimeout(window[otherTimeoutRef]);
                 window[otherTimeoutRef] = null;
                 showStatusMessage("bothTeamsReadyNextDraft", 1500);
                 setTimeout(handleNextDraft, 500);
             } else {
                 console.log(`DEBUG: ${currentTeam} is ready for next draft, waiting for ${otherTeam}.`);
                 updateDraftUI();
             }
         }
     };
     const handleSwapTeamsClick = () => {
         console.log(`DEBUG: handleSwapTeamsClick: Role=${currentUserRole}, Allowed=${swapTeamsAllowed}`);
         if (!swapTeamsAllowed) {
             showStatusMessage("swapNotAllowed", 2000);
             return;
         }

         if (currentUserRole === 'admin') {
             if (!hasPermission('swapTeams')) { showStatusMessage("permDeniedSwap", 2000); return; }
             console.log("DEBUG: Admin forcing swap teams.");
             handleSwapTeams();
         } else if (currentUserRole === 'team1' || currentUserRole === 'team2') {
             if (!hasPermission('swapTeams')) { showStatusMessage("permDeniedSetReadySwap", 2000); return; }
             const currentTeam = currentUserRole;
             const otherTeam = (currentTeam === 'team1') ? 'team2' : 'team1';
             const currentSwapReadyState = (currentTeam === 'team1') ? team1SwapReadyState : team2SwapReadyState;
             const otherSwapReadyState = (currentTeam === 'team1') ? team2SwapReadyState : team1SwapReadyState;
             const currentSwapTimeoutRef = (currentTeam === 'team1') ? 'team1SwapReadyTimeout' : 'team2SwapReadyTimeout';
             const otherSwapTimeoutRef = (currentTeam === 'team1') ? 'team2SwapReadyTimeout' : 'team1SwapReadyTimeout';

             if (currentSwapReadyState) { console.log(`DEBUG: ${currentTeam} is already ready for swap.`); return; }

             console.log(`DEBUG: ${currentTeam} setting ready state for swap.`);
             if (currentTeam === 'team1') { team1SwapReadyState = true; } else { team2SwapReadyState = true; }

             if (window[currentSwapTimeoutRef]) clearTimeout(window[currentSwapTimeoutRef]);
             window[currentSwapTimeoutRef] = setTimeout(() => {
                 console.log(`DEBUG: ${currentTeam} swap readiness timed out.`);
                 if (currentTeam === 'team1') { team1SwapReadyState = false; } else { team2SwapReadyState = false; }
                 window[currentSwapTimeoutRef] = null;
                 showStatusMessage("swapReadyTimeout", 3000);
                 updateDraftUI();
             }, 60000);

             showStatusMessage("swapReadyConfirmation", 2000);

             if (otherSwapReadyState) {
                 console.log("DEBUG: Both teams are now ready for swap. Swapping.");
                 if (window[otherSwapTimeoutRef]) clearTimeout(window[otherSwapTimeoutRef]);
                 window[otherSwapTimeoutRef] = null;
                 showStatusMessage("bothTeamsReadySwap", 1500);
                 setTimeout(handleSwapTeams, 500);
             } else {
                 console.log(`DEBUG: ${currentTeam} is ready for swap, waiting for ${otherTeam}.`);
                 updateDraftUI();
             }
         }
     };
     const handleResetClick = () => { console.log("Reset button clicked"); resetDraftFull(false); };
     const handleReturnHomeClick = () => { console.log("Return Home button clicked"); navigateTo('home'); };
     const handleEditableBlur = (e) => { const permissionNeeded = e.target.id.includes('name') ? 'editTeamName' : 'editScore'; if (!hasPermission(permissionNeeded)) return; e.target.textContent = e.target.textContent.trim(); };
     const handleEditableKeydown = (e) => { const permissionNeeded = e.target.id.includes('name') ? 'editTeamName' : 'editScore'; if (!hasPermission(permissionNeeded)) return; if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } };

    function applyRolePermissions(role) {
        const can = (action, team = null) => hasPermission(action, team);
        const isSpectator = role === 'spectator';
        const isTeamRole = role === 'team1' || role === 'team2';

        // Timer/Ready button logic
        if(timerDisplay) {
            const isReady = isTeamRole && ((role === 'team1' && team1ReadyState) || (role === 'team2' && team2ReadyState));
            const draftOrder = getDraftOrder();
            const currentAction = currentStep < draftOrder.length ? draftOrder[currentStep] : null;
            const currentTeam = currentAction ? currentAction.team : null;
            let isDisabled = true;
            if (isSpectator) { isDisabled = true; }
            else if (!isDraftStarted) { isDisabled = (isTeamRole && isReady) || !can('setReady'); }
            else if (previewedChampion && !isDraftComplete) { isDisabled = !currentAction || !can('confirmOrStart', currentAction.team); }
            else if (isDraftStarted && !isDraftComplete && !previewedChampion) { isDisabled = true; }
            else if (isDraftComplete) { isDisabled = true; }
            timerDisplay.disabled = isDisabled;
            timerDisplay.style.display = isSpectator ? 'none' : 'flex';
        }

        // Reset button logic
        if(resetButton) {
            resetButton.disabled = isSpectator || (isTeamRole && isDraftStarted) || !can('resetDraft');
            resetButton.style.display = isSpectator ? 'none' : 'flex';
        }

        // Undo button logic (State check moved to handleUndo)
        const lastAction = draftHistory.length > 0 ? draftHistory[draftHistory.length - 1] : null;
        if(undoButton) {
            // Basic disable conditions: spectator, no history, draft not started
            undoButton.disabled = isSpectator || draftHistory.length === 0 || !isDraftStarted;
            // Further disable if team tries to undo opponent's action (checked in handleUndo)
            if (!undoButton.disabled && isTeamRole && lastAction && lastAction.team !== userTeamSide) {
                 // Button might appear enabled briefly, handleUndo is the final gate.
            }
             undoButton.style.display = isSpectator ? 'none' : 'flex';
        }


        // Return home button
        if(returnHomeButton) returnHomeButton.disabled = !can('returnHome');

        // Filter buttons logic
        if(filterButtons) {
            const canFilter = can('useRoleFilters');
            filterButtons.forEach(btn => {
                btn.disabled = !canFilter;
                btn.style.display = isSpectator ? 'none' : 'inline-flex';
            });
            if (roleFilterButtonsContainer) {
                roleFilterButtonsContainer.style.display = isSpectator ? 'none' : 'flex';
            }
        }

        // Next Draft button logic
        if(nextDraftButton) {
            const isReady = isTeamRole && ((role === 'team1' && team1ReadyState) || (role === 'team2' && team2ReadyState));
            nextDraftButton.disabled = isSpectator || !isDraftComplete || !can('nextDraft') || (isTeamRole && isReady);
            nextDraftButton.style.display = isSpectator ? 'none' : 'flex';
        }

        // Swap Teams button logic
        if(swapTeamsButton) {
            const isSwapReady = isTeamRole && ((role === 'team1' && team1SwapReadyState) || (role === 'team2' && team2SwapReadyState));
            swapTeamsButton.disabled = isSpectator || !swapTeamsAllowed || !can('swapTeams') || (isTeamRole && isSwapReady);
            swapTeamsButton.style.display = isSpectator ? 'none' : 'flex';
        }

        // Search input logic
        if (championSearch) {
            championSearch.disabled = isSpectator;
            championSearch.style.display = isSpectator ? 'none' : 'block';
        }

        // Team name/score editability
        if(blueTeamNameH2) blueTeamNameH2.contentEditable = can('editTeamName') && !isSpectator;
        if(redTeamNameH2) redTeamNameH2.contentEditable = can('editTeamName') && !isSpectator;
        if(blueScoreEl) blueScoreEl.contentEditable = can('editScore') && !isSpectator;
        if(redScoreEl) redScoreEl.contentEditable = can('editScore') && !isSpectator;

        // Column disabling
        if (blueColumn) blueColumn.classList.toggle('role-disabled', !isDraftStarted || isSpectator);
        if (redColumn) redColumn.classList.toggle('role-disabled', !isDraftStarted || isSpectator);
        if (role === 'admin' && isDraftStarted) {
            if(blueColumn) blueColumn.classList.remove('role-disabled');
            if(redColumn) redColumn.classList.remove('role-disabled');
        }

        updateNicknameEditability(); // Call nickname update
        // Update button texts *after* applying permissions and states
        updateTimerDisplayContent(translations[currentLanguage]);
        updateNextSwapButtonContent(translations[currentLanguage]);

// --- Add Ready State Indicators (TZ 8) ---
        const readyIndicator = ' ✔️';
        // Clear existing indicators first by restoring base names
        const baseBlueName = localStorage.getItem('lobbyTeam1Name') || translations[currentLanguage].blueTeamDefaultName;
        const baseRedName = localStorage.getItem('lobbyTeam2Name') || translations[currentLanguage].redTeamDefaultName;
        if (blueTeamNameH2) blueTeamNameH2.textContent = baseBlueName;
        if (redTeamNameH2) redTeamNameH2.textContent = baseRedName;

        // Determine which ready state to show based on context
        let blueReady = false;
        let redReady = false;

        if (!isDraftStarted) { // Show start ready state
            blueReady = team1ReadyState;
            redReady = team2ReadyState;
            console.log(`DEBUG Indicators (Start): BlueReady=${blueReady}, RedReady=${redReady}`);
        } else if (isDraftComplete && !swapTeamsAllowed) { // Show next draft ready state (after complete, before swap allowed)
             // Note: team1ReadyState/team2ReadyState are reused for next draft ready
             blueReady = team1ReadyState;
             redReady = team2ReadyState;
             console.log(`DEBUG Indicators (Next): BlueReady=${blueReady}, RedReady=${redReady}`);
        } else if (swapTeamsAllowed) { // Show swap ready state
             blueReady = team1SwapReadyState;
             redReady = team2SwapReadyState;
             console.log(`DEBUG Indicators (Swap): BlueReady=${blueReady}, RedReady=${redReady}`);
        }

        // Append indicator if ready
        if (blueReady && blueTeamNameH2) {
            blueTeamNameH2.textContent += readyIndicator;
        }
        if (redReady && redTeamNameH2) {
            redTeamNameH2.textContent += readyIndicator;
        }
        // --- End Ready State Indicators ---
     }
     // MODIFIED: updateNicknameEditability (TZ Point 6)
     function updateNicknameEditability() {
         const canEditGlobally = hasPermission('editNicknames'); // Check base permission first

         document.querySelectorAll('.nickname-input').forEach(input => {
             const slotId = input.dataset.slotId;
             if (!slotId) return; // Skip if no slot ID

             const isBlueSlot = slotId.startsWith('blue-pick-');
             const isRedSlot = slotId.startsWith('red-pick-');
             let canEditThisSlot = false; // Default to false

             if (currentUserRole === 'admin' && canEditGlobally) {
                 // Admin can edit any nickname if they have the base permission
                 canEditThisSlot = true;
             } else if (currentUserRole === 'team1' && isBlueSlot && canEditGlobally) {
                 // Team 1 can edit blue slots if they have the base permission
                 canEditThisSlot = true;
             } else if (currentUserRole === 'team2' && isRedSlot && canEditGlobally) {
                 // Team 2 can edit red slots if they have the base permission
                 canEditThisSlot = true;
             }
             // Spectator or other roles without permission, or wrong team slot, will result in canEditThisSlot = false

             input.contentEditable = canEditThisSlot;
             input.style.cursor = canEditThisSlot ? 'text' : 'default';
             input.style.pointerEvents = canEditThisSlot ? 'auto' : 'none'; // Allow interaction only if editable
         });
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
        if (timerDisplay) {
             updateTimerDisplayContent(translations[currentLanguage]);
        }
        console.log("DEBUG: resetTimerDisplay - Timer stopped and seconds reset.");
     }
    function startTimer() {
        console.log("startTimer called");
        stopTimer();
        timerSeconds = draftTimerDuration;
        if (!timerDisplay) { console.warn("startTimer: timerDisplay not found"); return; }
        updateTimerDisplayContent(translations[currentLanguage]);
        timerInterval = setInterval(() => {
            timerSeconds--;
            if (timerDisplay) {
                timerDisplay.textContent = formatTime(timerSeconds);
                timerDisplay.setAttribute('aria-label', translations[currentLanguage].timerAriaLabelRunning.replace('{time}', formatTime(timerSeconds)));
                timerDisplay.classList.toggle('timer-ending', timerSeconds <= 10 && timerSeconds > 0);
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
                            confirmAction();
                        } else {
                            console.log("Timer ended during PICK phase. No champion previewed. Clearing current game.");
                            showStatusMessage("timerEndedPickClear", 3000);
                            resetCurrentGamePicksBans(true, false);
                        }
                    } else if (currentAction.type === 'ban') {
                        console.log("Timer ended during BAN phase. Skipping ban.");
                        showStatusMessage("timerEndedBanSkip", 2000);
                        const slotElement = document.getElementById(currentAction.slot);
                        if (slotElement) { restoreSlotPlaceholder(slotElement, currentAction.slot, ''); }
                        currentStep++;
                        previewedChampion = null;
                        updateDraftUI();
                    }
                } else {
                    console.log("Timer ended but draft already complete?");
                    updateTimerDisplayContent(translations[currentLanguage]);
                }
            }
        }, 1000);
     }
     function handleTimerClick() {
         console.log(`DEBUG: handleTimerClick: Role=${currentUserRole}, Started=${isDraftStarted}, Complete=${isDraftComplete}, Preview=${!!previewedChampion}, T1Ready=${team1ReadyState}, T2Ready=${team2ReadyState}`);

         if (!isDraftStarted) {
             // --- Ready State Logic ---
             if (currentUserRole === 'admin') {
                 if (!hasPermission('startDraft')) { showStatusMessage("permDeniedStartDraft", 2000); return; }
                 console.log("DEBUG: Admin forcing start.");
                 handleStartDraft();
             } else if (currentUserRole === 'team1' || currentUserRole === 'team2') {
                 if (!hasPermission('setReady')) { showStatusMessage("permDeniedSetReady", 2000); return; }
                 const currentTeam = currentUserRole;
                 const otherTeam = (currentTeam === 'team1') ? 'team2' : 'team1';
                 const currentReadyState = (currentTeam === 'team1') ? team1ReadyState : team2ReadyState;
                 const otherReadyState = (currentTeam === 'team1') ? team2ReadyState : team1ReadyState;
                 const currentTimeoutRef = (currentTeam === 'team1') ? 'team1ReadyTimeout' : 'team2ReadyTimeout'; // Use string ref
                 const otherTimeoutRef = (currentTeam === 'team1') ? 'team2ReadyTimeout' : 'team1ReadyTimeout';

                 if (currentReadyState) { console.log(`DEBUG: ${currentTeam} is already ready.`); return; }

                 console.log(`DEBUG: ${currentTeam} setting ready state.`);
                 if (currentTeam === 'team1') { team1ReadyState = true; } else { team2ReadyState = true; }

                 // Clear existing timeout for this team
                 if (window[currentTimeoutRef]) clearTimeout(window[currentTimeoutRef]);

                 // Set new timeout
                 window[currentTimeoutRef] = setTimeout(() => {
                     console.log(`DEBUG: ${currentTeam} readiness timed out.`);
                     if (currentTeam === 'team1') { team1ReadyState = false; } else { team2ReadyState = false; }
                     window[currentTimeoutRef] = null; // Clear timeout variable
                     showStatusMessage("readyTimeout", 3000);
                     updateDraftUI();
                 }, 60000);

                 showStatusMessage("readyConfirmation", 2000);

                 if (otherReadyState) {
                     console.log("DEBUG: Both teams are now ready. Starting draft.");
                     if (window[otherTimeoutRef]) clearTimeout(window[otherTimeoutRef]); // Clear other team's timeout
                     window[otherTimeoutRef] = null;
                     showStatusMessage("bothTeamsReadyStarting", 1500);
                     setTimeout(handleStartDraft, 500);
                 } else {
                     console.log(`DEBUG: ${currentTeam} is ready, waiting for ${otherTeam}.`);
                     updateDraftUI();
                 }
             }
         } else if (previewedChampion && !isDraftComplete) {
             // --- Confirmation Logic ---
             const draftOrder = getDraftOrder();
             const currentAction = currentStep < draftOrder.length ? draftOrder[currentStep] : null;
             const team = currentAction ? currentAction.team : null;
             if (!hasPermission('confirmOrStart', team)) { showStatusMessage("permDeniedConfirm", 2000); return; }
             console.log("DEBUG: handleTimerClick acting as Confirm button");
             confirmAction();
         } else {
             console.log("DEBUG: Timer clicked but no action to take (draft running/complete or spectator).");
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
        let currentAction = null;
        let currentActionTeam = null;
        if (!isDraftComplete && isDraftStarted) {
            currentAction = draftOrder[currentStep];
            currentActionTeam = currentAction.team;
        } else if (isDraftComplete && isDraftStarted) {
            stopTimer();
        }

        applyRolePermissions(currentUserRole); // Apply permissions (includes timer/button state updates)

        // --- Add/Remove Timer Animation Class ---
        const shouldAnimateTimer = previewedChampion && isDraftStarted && !isDraftComplete;
        if (timerDisplay) {
             timerDisplay.classList.toggle('timer-awaiting-confirmation', shouldAnimateTimer);
        }

        // Grid interactivity depends on permissions for the current action
        const isGridInteractive = currentAction && (hasPermission('pickChampion', currentActionTeam) || hasPermission('banChampion', currentActionTeam)) && currentUserRole !== 'spectator';
        if (championGridElement) {
             championGridElement.style.pointerEvents = isGridInteractive ? 'auto' : 'none';
             championGridElement.style.opacity = (isDraftStarted && currentUserRole !== 'spectator') ? '1' : '0.6';
        }
        // Column disabling includes spectator check and draft started state
        if(blueColumn) blueColumn.classList.toggle('draft-disabled', !isDraftStarted || currentUserRole === 'spectator');
        if(redColumn) redColumn.classList.toggle('draft-disabled', !isDraftStarted || currentUserRole === 'spectator');

        // Highlight current action slot and manage timer start
        if (currentAction && currentUserRole !== 'spectator') {
            const activeSlot = document.getElementById(currentAction.slot);
            if (activeSlot) {
                 if (hasPermission(currentAction.type === 'pick' ? 'pickChampion' : 'banChampion', currentActionTeam) || hasPermission('confirmOrStart', currentActionTeam)) {
                    activeSlot.classList.add('highlight-action');
                 }
                 if (previewedChampion && activeSlot.id === currentAction.slot) {
                     activeSlot.classList.add('preview-flash');
                 }
            }
            // Timer start logic (only if draft running and no preview)
            const shouldStartTimer = isDraftStarted && !isDraftComplete && currentAction && !previewedChampion;
            if (!timerInterval && shouldStartTimer) {
                 console.log(`DEBUG updateDraftUI: Starting timer for step ${currentStep}`);
                 startTimer();
            }
        } else if (!isDraftStarted) {
            stopTimer(); // Ensure timer is stopped if draft is not started
        }

        updateChampionAvailability();
        displayGloballyBanned();
        // Swap selection logic
        document.querySelectorAll('.pick-slot').forEach(slot => {
            const champId = getSlotChampionId(slot.id);
            // Allow swap select only if swap is allowed, user has perm, AND is not spectator
            const allowSwapSelect = swapTeamsAllowed && hasPermission('swapTeams') && currentUserRole !== 'spectator';
            slot.style.cursor = allowSwapSelect && champId ? 'pointer' : 'default';
            slot.title = allowSwapSelect && champId ? translations[currentLanguage].swapPickSelect : '';
        });
        // updateNicknameEditability is called inside applyRolePermissions now
        // updateNextSwapButtonContent is called inside applyRolePermissions now

        // --- Add Ready State Indicators (TZ 8) ---
        const readyIndicator = ' ✔️';
        // Clear existing indicators first
        if (blueTeamNameH2) blueTeamNameH2.textContent = blueTeamNameH2.textContent.replace(readyIndicator, '');
        if (redTeamNameH2) redTeamNameH2.textContent = redTeamNameH2.textContent.replace(readyIndicator, '');

        // Determine which ready state to show based on context
        if (!isDraftStarted) { // Show start ready state
            if (team1ReadyState && blueTeamNameH2) blueTeamNameH2.textContent += readyIndicator;
            if (team2ReadyState && redTeamNameH2) redTeamNameH2.textContent += readyIndicator;
        } else if (isDraftComplete && !swapTeamsAllowed) { // Show next draft ready state
             if (team1ReadyState && blueTeamNameH2) blueTeamNameH2.textContent += readyIndicator;
             if (team2ReadyState && redTeamNameH2) redTeamNameH2.textContent += readyIndicator;
        } else if (swapTeamsAllowed) { // Show swap ready state
             if (team1SwapReadyState && blueTeamNameH2) blueTeamNameH2.textContent += readyIndicator;
             if (team2SwapReadyState && redTeamNameH2) redTeamNameH2.textContent += readyIndicator;
        }
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
            card.disabled = isDisabled || currentUserRole === 'spectator';
            card.setAttribute('aria-disabled', (isDisabled || currentUserRole === 'spectator').toString());
        });
     }
    function handleChampionPreview(champion) {
        console.log(`DEBUG: handleChampionPreview called for ${champion.id}. Started: ${isDraftStarted}, Complete: ${isDraftComplete}`);
        if (!isDraftStarted || isDraftComplete || currentUserRole === 'spectator') return;
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
            stopTimer();
            updateDraftUI();
        } else {
            console.warn(`Preview failed: Slot element ${currentAction.slot} not found.`);
        }
     }
     function confirmAction() {
         console.log("confirmAction called");
         if (!previewedChampion || !isDraftStarted || isDraftComplete || currentUserRole === 'spectator') {
             console.warn(`DEBUG: confirmAction aborted. previewed=${!!previewedChampion}, started=${isDraftStarted}, complete=${isDraftComplete}, role=${currentUserRole}`);
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
             updateDraftUI();
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
         previewedChampion = null;
         console.log(`DEBUG: confirmAction - Slot ${currentAction.slot} filled. previewedChampion cleared. Step incremented to ${currentStep}`);
         stopTimer();
         timerSeconds = draftTimerDuration;
         updateDraftUI();
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
            addNicknameInput(slotElement, nicknameText); // Calls updateNicknameEditability inside
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
    // MODIFIED: addNicknameInput - Calls updateNicknameEditability
    function addNicknameInput(slotElement, text = '') {
         const nicknameInput = document.createElement('div');
         nicknameInput.spellcheck = false;
         nicknameInput.className = 'nickname-input';
         nicknameInput.textContent = text || '';
         nicknameInput.dataset.slotId = slotElement.id;
         nicknameInput.contentEditable = false; // Default to false
         nicknameInput.style.cursor = 'default';
         nicknameInput.dataset.placeholder = translations[currentLanguage].pickSlotNicknamePlaceholder || 'Player';
         nicknameInput.addEventListener('input', (e) => {
             if (!e.target.isContentEditable) return;
             const slotId = e.target.dataset.slotId;
             if (slotId) { pickNicknames[slotId] = e.target.textContent.trim(); }
         });
         nicknameInput.addEventListener('keydown', (e) => {
             if (!e.target.isContentEditable) return;
             if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); }
         });
         nicknameInput.addEventListener('blur', (e) => {
             if (!e.target.isContentEditable) return;
             const slotId = e.target.dataset.slotId;
             if (slotId) { pickNicknames[slotId] = e.target.textContent.trim(); }
         });
         slotElement.appendChild(nicknameInput);
         updateNicknameEditability(); // Update editability right after adding
     }
     // MODIFIED: restoreSlotPlaceholder - Calls updateNicknameEditability
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
            addNicknameInput(slotElement, nicknameText); // Calls updateNicknameEditability inside
            pickNicknames[slotId] = nicknameText;
        } else {
            delete pickNicknames[slotId];
        }
    }
    function getSlotChampionId(slotId) { const slotElement = document.getElementById(slotId); return slotElement ? slotElement.dataset.championId : null; }
    // MODIFIED: handleUndo (TZ Point 7)
    function handleUndo() {
         console.log("handleUndo called");
         if (draftHistory.length === 0 || !isDraftStarted || currentUserRole === 'spectator') {
            console.log("Undo aborted: No history, draft not started, or spectator.");
            return;
         }
         const lastAction = draftHistory[draftHistory.length - 1];
         if (!lastAction) {
             console.warn("Undo aborted: Last action is undefined.");
             return; // Should not happen if history is not empty, but safety check
         }

         // Check base permission first
         if (!hasPermission('undoAction')) {
             // This check might be redundant if spectator check already happened, but good for clarity
             showStatusMessage("permDeniedUndo", 2000);
             console.log("Undo aborted: Basic permission denied.");
             return;
         }

         // Team-specific permission check (TZ 7)
         if ((currentUserRole === 'team1' || currentUserRole === 'team2') && lastAction.team !== userTeamSide) {
             showStatusMessage("permDeniedUndo", 2000); // Show message: cannot undo opponent's action
             console.log(`Undo aborted: Role ${currentUserRole} (side ${userTeamSide}) cannot undo action by team ${lastAction.team}.`);
             return;
         }

         // --- Proceed with Undo ---
         draftHistory.pop();
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
         previewedChampion = null;
         isDraftComplete = false;
         stopTimer();
         timerSeconds = draftTimerDuration;
         updateDraftUI();
         filterChampions();
         deselectSwapSlots();
         showStatusMessage("actionUndone", 1500);
    }

    // --- MODIFIED: resetDraftFull ---
    function resetDraftFull(force = false) {
        console.log("resetDraftFull called, force:", force);
        if (currentUserRole === 'spectator') return;
        if ((currentUserRole === 'team1' || currentUserRole === 'team2') && isDraftStarted) {
            showStatusMessage("permDeniedReset", 2000);
            return;
        }
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
        pickNicknames = {};
        globallyDisabledChampions.clear();
        globalBanHistory = [];
        isDraftComplete = false;
        isDraftStarted = false;
        previewedChampion = null;
        deselectSwapSlots();
        stopTimer();
        timerSeconds = draftTimerDuration;
        // Clear ready states and ALL timeouts
        team1ReadyState = false;
        team2ReadyState = false;
        clearTimeout(team1ReadyTimeout); team1ReadyTimeout = null;
        clearTimeout(team2ReadyTimeout); team2ReadyTimeout = null;
        clearTimeout(team1NextReadyTimeout); team1NextReadyTimeout = null;
        clearTimeout(team2NextReadyTimeout); team2NextReadyTimeout = null;
        // Clear swap states and timeouts (TZ 9)
        team1SwapReadyState = false;
        team2SwapReadyState = false;
        clearTimeout(team1SwapReadyTimeout); team1SwapReadyTimeout = null;
        clearTimeout(team2SwapReadyTimeout); team2SwapReadyTimeout = null;
        swapTeamsAllowed = false; // Reset swap allowed flag

        document.querySelectorAll('.pick-slot, .ban-slot').forEach((slot) => {
            restoreSlotPlaceholder(slot, slot.id, '');
            slot.classList.remove('highlight-action', 'preview-flash');
        });
        if (blueTeamNameH2) blueTeamNameH2.textContent = localStorage.getItem('lobbyTeam1Name') || translations[currentLanguage].blueTeamDefaultName;
        if (redTeamNameH2) redTeamNameH2.textContent = localStorage.getItem('lobbyTeam2Name') || translations[currentLanguage].redTeamDefaultName;
        if (blueScoreEl) blueScoreEl.textContent = '';
        if (redScoreEl) redScoreEl.textContent = '';
        if(blueColumn) blueColumn.classList.add('draft-disabled');
        if(redColumn) redColumn.classList.add('draft-disabled');
        if(championSearch) championSearch.value = '';
        currentRoleFilter = 'All';
        if(filterButtons) {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            filterButtons[0]?.classList.add('active');
        }
        displayGloballyBanned();
        updateChampionAvailability();
        filterChampions();
        updateDraftUI();
        updateUIText(currentLanguage);
        if (!force) {
             showStatusMessage("resetFullComplete", 2000);
        }
        console.log("Full reset complete. Timer stopped. isDraftStarted=false. All ready states/timeouts/swap states cleared.");
    }
    // --- End MODIFIED: resetDraftFull ---

    // MODIFIED: resetCurrentGamePicksBans
    function resetCurrentGamePicksBans(force = false, keepGlobal = false) {
         console.log("resetCurrentGamePicksBans called, force:", force, "keepGlobal:", keepGlobal);
         if (currentUserRole === 'spectator') return;
         if (!hasPermission('resetDraft')) {
             showStatusMessage("permDeniedReset", 2000);
             return;
         }
         if ((currentUserRole === 'team1' || currentUserRole === 'team2') && isDraftStarted) {
            showStatusMessage("permDeniedReset", 2000);
            return;
         }
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
         isDraftStarted = false;
         previewedChampion = null;
         deselectSwapSlots();
         stopTimer();
         timerSeconds = draftTimerDuration;
         // Clear ready states and ALL timeouts
         team1ReadyState = false;
         team2ReadyState = false;
         clearTimeout(team1ReadyTimeout); team1ReadyTimeout = null;
         clearTimeout(team2ReadyTimeout); team2ReadyTimeout = null;
         clearTimeout(team1NextReadyTimeout); team1NextReadyTimeout = null;
         clearTimeout(team2NextReadyTimeout); team2NextReadyTimeout = null;
         // Clear swap states and timeouts (TZ 9)
         team1SwapReadyState = false;
         team2SwapReadyState = false;
         clearTimeout(team1SwapReadyTimeout); team1SwapReadyTimeout = null;
         clearTimeout(team2SwapReadyTimeout); team2SwapReadyTimeout = null;
         swapTeamsAllowed = false; // Reset swap allowed flag

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
         if(blueColumn) blueColumn.classList.add('draft-disabled');
         if(redColumn) redColumn.classList.add('draft-disabled');
         displayGloballyBanned();
         updateChampionAvailability();
         filterChampions();
         updateDraftUI();
         if (!force) {
             const globalPartMsg = keepGlobal ? translations[currentLanguage].resetCurrentGlobalPart : '';
             const statusKey = keepGlobal ? "resetCurrentCompleteKeptGlobal" : "resetCurrentComplete";
             showStatusMessage(statusKey, 2000, { global: globalPartMsg });
         }
         console.log("resetCurrentGamePicksBans finished. Timer stopped. isDraftStarted=false. All ready states/timeouts/swap states cleared.");
    }
    // MODIFIED: handleStartDraft
    function handleStartDraft() {
        console.log("Starting draft...");
        if (isDraftStarted) { console.log("Draft already started."); return; }
        isDraftStarted = true;
        isDraftComplete = false;
        currentStep = 0;
        previewedChampion = null;
        // Clear ready states and start timeouts
        team1ReadyState = false;
        team2ReadyState = false;
        clearTimeout(team1ReadyTimeout); team1ReadyTimeout = null;
        clearTimeout(team2ReadyTimeout); team2ReadyTimeout = null;
        // Clear next draft timeouts
        clearTimeout(team1NextReadyTimeout); team1NextReadyTimeout = null;
        clearTimeout(team2NextReadyTimeout); team2NextReadyTimeout = null;
        // Clear swap states and timeouts, disallow swap (TZ 5.1, 5.4)
        team1SwapReadyState = false;
        team2SwapReadyState = false;
        clearTimeout(team1SwapReadyTimeout); team1SwapReadyTimeout = null;
        clearTimeout(team2SwapReadyTimeout); team2SwapReadyTimeout = null;
        swapTeamsAllowed = false;

        if(blueColumn) blueColumn.classList.remove('draft-disabled');
        if(redColumn) redColumn.classList.remove('draft-disabled');
        updateDraftUI(); // Update UI (will trigger timer start)
        console.log("Draft successfully started. All ready states/timeouts cleared. Swap disallowed.");
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
            card.classList.toggle('disabled', isDisabled || currentUserRole === 'spectator');
            card.disabled = isDisabled || currentUserRole === 'spectator';
            card.setAttribute('aria-disabled', (isDisabled || currentUserRole === 'spectator').toString());
            card.classList.toggle('selected', selectedChampions.has(champId));
        });
    }
    function deselectSwapSlots() { if (selectedSwapSlotId) { const prevSelected = document.getElementById(selectedSwapSlotId); if (prevSelected) { prevSelected.classList.remove('swap-selected'); } selectedSwapSlotId = null; } }
    function handlePickContainerClick(event) {
         if (event.target.classList.contains('nickname-input')) { return; }
         if (currentUserRole === 'spectator') return;
         // Allow swap selection only if swap is allowed
         if (!swapTeamsAllowed || !hasPermission('swapTeams')) {
             deselectSwapSlots(); // Deselect if swap not allowed
             return;
         }
         const clickedSlot = event.target.closest('.pick-slot');
         // Can only swap filled slots when swap is allowed
         if (!clickedSlot || !clickedSlot.dataset.championId) {
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
                     pickNicknames[selectedSwapSlotId] = nick2;
                     pickNicknames[clickedSlotId] = nick1;
                     if (champ1 && champ2) {
                         fillSlot(firstSlot, champ2, 'pick', nick2);
                         fillSlot(clickedSlot, champ1, 'pick', nick1);
                         showStatusMessage("swapConfirm", 2000, { champ1: champ1.name[currentLanguage], champ2: champ2.name[currentLanguage] });
                         console.log(`Swapped ${champId1} (${nick1}) in ${selectedSwapSlotId} with ${champId2} (${nick2}) in ${clickedSlotId}`);
                     } else {
                         console.error("Swap failed: Champion data missing.");
                         pickNicknames[selectedSwapSlotId] = nick1;
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
    // MODIFIED: handleSwapTeams (TZ 5.4)
    function handleSwapTeams() {
        console.log("handleSwapTeams logic executing (actual swap)");
        // Permission and availability checks done in handleSwapTeamsClick

        try {
            // 1. Swap Team Names
            const tempName = blueTeamNameH2.textContent;
            blueTeamNameH2.textContent = redTeamNameH2.textContent;
            redTeamNameH2.textContent = tempName;
            const storedName1 = localStorage.getItem('lobbyTeam1Name');
            const storedName2 = localStorage.getItem('lobbyTeam2Name');
            localStorage.setItem('lobbyTeam1Name', storedName2 || translations[currentLanguage].redTeamDefaultName);
            localStorage.setItem('lobbyTeam2Name', storedName1 || translations[currentLanguage].blueTeamDefaultName);

            // 2. Swap Scores
            const tempScore = blueScoreEl.textContent;
            blueScoreEl.textContent = redScoreEl.textContent;
            redScoreEl.textContent = tempScore;

            // 3. Swap Global Bans
            globalBanHistory.forEach(ban => { ban.team = ban.team === 'blue' ? 'red' : 'blue'; });
            globallyDisabledChampions.clear();
            globalBanHistory.forEach(ban => globallyDisabledChampions.add(ban.championId));

            // 4. Prepare Swap Data
            const bluePicksData = []; const redPicksData = [];
            const blueBansData = []; const redBansData = [];
            for (let i = 1; i <= 5; i++) {
                const blueBanSlotId = `blue-ban-${i}`; const redBanSlotId = `red-ban-${i}`;
                const blueBanAction = draftHistory.slice().reverse().find(a => a.slotId === blueBanSlotId && a.type === 'ban');
                const redBanAction = draftHistory.slice().reverse().find(a => a.slotId === redBanSlotId && a.type === 'ban');
                blueBansData.push({ championId: blueBanAction?.championId || null });
                redBansData.push({ championId: redBanAction?.championId || null });
                const bluePickSlotId = `blue-pick-${i}`; const redPickSlotId = `red-pick-${i}`;
                const bluePickChampId = getSlotChampionId(bluePickSlotId);
                const redPickChampId = getSlotChampionId(redPickSlotId);
                const blueNick = pickNicknames[bluePickSlotId] || '';
                const redNick = pickNicknames[redPickSlotId] || '';
                bluePicksData.push({ champId: bluePickChampId, nick: blueNick });
                redPicksData.push({ champId: redPickChampId, nick: redNick });
            }

            // 5. Update Nickname State
            const newPickNicknames = {};
            for (let i = 0; i < 5; i++) {
                newPickNicknames[`blue-pick-${i + 1}`] = redPicksData[i].nick;
                newPickNicknames[`red-pick-${i + 1}`] = bluePicksData[i].nick;
            }
            pickNicknames = newPickNicknames;

            // 6. Update Visual Slots & Selections
            const newSelectedChampions = new Set();
            for (let i = 0; i < 5; i++) {
                const blueBanSlot = document.getElementById(`blue-ban-${i + 1}`);
                const redBanSlot = document.getElementById(`red-ban-${i + 1}`);
                const blueBanChampId = redBansData[i].championId;
                const redBanChampId = blueBansData[i].championId;
                if (blueBanChampId) { const champ = getChampionById(blueBanChampId); if (champ && blueBanSlot) fillSlot(blueBanSlot, champ, 'ban'); newSelectedChampions.add(blueBanChampId); } else if (blueBanSlot) { restoreSlotPlaceholder(blueBanSlot, `blue-ban-${i + 1}`); }
                if (redBanChampId) { const champ = getChampionById(redBanChampId); if (champ && redBanSlot) fillSlot(redBanSlot, champ, 'ban'); newSelectedChampions.add(redBanChampId); } else if (redBanSlot) { restoreSlotPlaceholder(redBanSlot, `red-ban-${i + 1}`); }

                const blueSlot = document.getElementById(`blue-pick-${i + 1}`);
                const redSlot = document.getElementById(`red-pick-${i + 1}`);
                const blueChampId = redPicksData[i].champId;
                const redChampId = bluePicksData[i].champId;
                const blueNick = pickNicknames[`blue-pick-${i + 1}`];
                const redNick = pickNicknames[`red-pick-${i + 1}`];
                if (blueChampId) { const champ = getChampionById(blueChampId); if (champ && blueSlot) fillSlot(blueSlot, champ, 'pick', blueNick); newSelectedChampions.add(blueChampId); } else if (blueSlot) { restoreSlotPlaceholder(blueSlot, `blue-pick-${i + 1}`, blueNick); }
                if (redChampId) { const champ = getChampionById(redChampId); if (champ && redSlot) fillSlot(redSlot, champ, 'pick', redNick); newSelectedChampions.add(redChampId); } else if (redSlot) { restoreSlotPlaceholder(redSlot, `red-pick-${i + 1}`, redNick); }
            }
            selectedChampions = newSelectedChampions;
            globallyDisabledChampions.forEach(id => selectedChampions.add(id));

            // 7. Final Updates & State Reset (TZ 5.4)
            deselectSwapSlots();
            team1SwapReadyState = false; // Reset swap ready states
            team2SwapReadyState = false;
            clearTimeout(team1SwapReadyTimeout); team1SwapReadyTimeout = null; // Clear swap timeouts
            clearTimeout(team2SwapReadyTimeout); team2SwapReadyTimeout = null;
            swapTeamsAllowed = false; // Disallow further swaps until next draft cycle
            showStatusMessage("swapSuccess", 2000);
            displayGloballyBanned();
            updateChampionAvailability();
            updateDraftUI(); // Update UI after swap (will disable swap button)
            console.log("Swap complete. Swap ready states cleared. Swap disallowed.");

        } catch (error) {
            console.error("Error in handleSwapTeams:", error);
            showStatusMessage("swapError", 3000);
        }
    }
    // --- End MODIFIED: handleSwapTeams ---

    // MODIFIED: handleNextDraft
    function handleNextDraft() {
         console.log("handleNextDraft logic executing (actual transition)");
         // Permission checks are done in handleNextDraftClick

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
             resetCurrentGamePicksBans(true, true); // Keep global bans
             showStatusMessage("nextDraftComplete", 2500);
         } else {
             console.log(`handleNextDraft (Normal): Resetting without adding global bans.`);
             resetCurrentGamePicksBans(true, false); // Do NOT keep global bans
         }
         // Clear ready states and next draft timeouts
         team1ReadyState = false;
         team2ReadyState = false;
         clearTimeout(team1NextReadyTimeout); team1NextReadyTimeout = null;
         clearTimeout(team2NextReadyTimeout); team2NextReadyTimeout = null;

         // Allow swapping after next draft confirmation (TZ 5.1)
         swapTeamsAllowed = true;
         console.log("handleNextDraft finished. Ready states cleared. Swap ALLOWED.");
         // UI is updated inside resetCurrentGamePicksBans, which calls updateDraftUI
         // updateDraftUI will now enable the swap button if conditions met
    }
    // --- End MODIFIED: handleNextDraft ---

    function getDraftOrder() {
        // Standard 5 bans per side, standard pick order
        return [
            { team: 'blue', type: 'ban', slot: 'blue-ban-1' }, { team: 'red', type: 'ban', slot: 'red-ban-1' },
            { team: 'blue', type: 'ban', slot: 'blue-ban-2' }, { team: 'red', type: 'ban', slot: 'red-ban-2' },
            { team: 'blue', type: 'ban', slot: 'blue-ban-3' }, { team: 'red', type: 'ban', slot: 'red-ban-3' },
            { team: 'blue', type: 'pick', slot: 'blue-pick-1' },
            { team: 'red', type: 'pick', slot: 'red-pick-1' }, { team: 'red', type: 'pick', slot: 'red-pick-2' },
            { team: 'blue', type: 'pick', slot: 'blue-pick-2' }, { team: 'blue', type: 'pick', slot: 'blue-pick-3' },
            { team: 'red', type: 'pick', slot: 'red-pick-3' },
            { team: 'red', type: 'ban', slot: 'red-ban-4' }, { team: 'blue', type: 'ban', slot: 'blue-ban-4' },
            { team: 'red', type: 'ban', slot: 'red-ban-5' }, { team: 'blue', type: 'ban', slot: 'blue-ban-5' },
            { team: 'red', type: 'pick', slot: 'red-pick-4' },
            { team: 'blue', type: 'pick', slot: 'blue-pick-4' }, { team: 'blue', type: 'pick', slot: 'blue-pick-5' },
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