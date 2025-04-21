// script.js v7.14 - Isolated Draft State per Lobby ID using localStorage
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Fully Loaded. Initializing App v7.14..."); // Version Updated

    // --- Language State & Translations ---
    let currentLanguage = localStorage.getItem('language') || 'ru'; // Default to Russian
    const translations = { /* ... (translations as before) ... */
        ru: {
            // Home Page
            homeTitle: "LoL and Wild Rift Drafter",
            team1Placeholder: "Команда 1",
            team2Placeholder: "Команда 2",
            createLobbyButton: "Создать Лобби",
            lobbyJudgeLabel: "Судья:",
            lobbyTeam1Label: "Команда 1:",
            lobbyTeam2Label: "Команда 2:",
            copyButton: "Копировать",
            openButton: "Открыть",
            lobbyCreatedMsg: "Лобби создано! Скопируйте или откройте ссылки.",
            linkCopiedMsg: "Ссылка скопирована!",
            linkCopiedFallbackMsg: "Ссылка скопирована (fallback)",
            copyErrorMsg: "Ошибка копирования",
            // Top Right Buttons
            adminButton: "Админ",
            themeToggleLight: "Переключить на светлую тему",
            themeToggleDark: "Переключить на темную тему",
            languageToggleButton: "EN", // Text on button when RU is active
            // Draft Page - Top Bar
            blueTeamDefaultName: "Синяя Команда",
            redTeamDefaultName: "Красная Команда",
            timerStartDraftTitle: "Начать драфт",
            timerDraftRunningTitle: "Драфт идет...",
            timerDraftCompleteText: "Драфт Завершен!",
            timerDraftCompleteTitle: "Драфт завершен",
            timerAriaLabelStart: "Таймер / Старт драфта",
            timerAriaLabelRunning: "Таймер: {time}",
            // Draft Page - Search/Controls
            searchPlaceholder: "Поиск...",
            searchAriaLabel: "Поиск чемпиона",
            clearPicksTitle: "Очистить пики/баны текущей игры (вкл. глоб.)",
            clearPicksAriaLabel: "Очистить пики/баны текущей игры",
            resetTitle: "Полный сброс",
            resetAriaLabel: "Полный сброс",
            confirmPickBanTitle: "Подтвердить выбор/бан",
            confirmPickBanAriaLabel: "Подтвердить выбор/бан",
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
            priorityFilterShowPriorityTitle: "Показать только приоритетных чемпионов",
            priorityFilterShowAllTitle: "Показать всех чемпионов",
            priorityFilterAriaLabel: "Переключить фильтр приоритетных чемпионов",
            nextDraftTitle: "Следующий драфт (Fearless)",
            nextDraftAriaLabel: "Следующий драфт (Fearless)",
            swapTeamsTitle: "Поменять команды местами",
            swapTeamsAriaLabel: "Поменять команды местами",
            toggleTimerTitle: "Сменить время таймера (30/45с)",
            toggleTimerAriaLabel: "Сменить время таймера",
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
            pickSlotNicknamePlaceholder: "Игрок", // Used for data-placeholder attribute
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
            swapDuringDraftError: "Нельзя менять пики/баны во время драфта. Сменены только имена/счет/глоб. баны.",
            swapError: "Ошибка при смене команд.",
            timerToggled: "Время таймера: {duration} сек.",
            priorityFilterOn: "Показаны только приоритетные чемпионы.",
            priorityFilterOff: "Показаны все чемпионы.",
            nextDraftComplete: "Переход к следующему драфту. Пики предыдущей игры заблокированы.",
            nextDraftErrorNotComplete: "Драфт не завершен. Завершите его перед переходом к следующему.",
            timerEndedPickConfirm: "Время вышло! Авто-подтверждение: {name}",
            timerEndedPickClear: "Время вышло! Пик не выбран. Драфт очищен.",
            timerEndedBanSkip: "Время вышло! Бан пропущен.",
            swapPickSelect: "Нажмите для выбора обмена",
            swapConfirm: "Обмен: {champ1} <-> {champ2}",
            // Permissions denied messages
            permDeniedReset: "Нет прав для сброса драфта.",
            permDeniedClear: "Нет прав для очистки драфта.",
            permDeniedUndo: "Нет прав для отмены этого действия.",
            permDeniedSwap: "Нет прав для смены сторон.",
            permDeniedToggleTimer: "Нет прав для смены таймера.",
            permDeniedPriorityFilter: "Нет прав для переключения приоритета.",
            permDeniedNextDraft: "Нет прав для перехода к следующему драфту.",
            permDeniedStartDraft: "Нет прав для старта драфта.",
            permDeniedPreviewPick: "Нет прав на выбор чемпиона.",
            permDeniedPreviewBan: "Нет прав на бан чемпиона.",
            permDeniedConfirm: "Нет прав на подтверждение действия.",
            permDeniedRoleFilter: "Нет прав на использование фильтров ролей.",
            permDeniedEditName: "Нет прав на изменение имени команды.",
            permDeniedEditScore: "Нет прав на изменение счета.",
            permDeniedEditNickname: "Нет прав на изменение никнейма.",
        },
        en: {
            // Home Page
            homeTitle: "LoL and Wild Rift Drafter",
            team1Placeholder: "Team 1 Name",
            team2Placeholder: "Team 2 Name",
            createLobbyButton: "Create Lobby",
            lobbyJudgeLabel: "Judge:",
            lobbyTeam1Label: "Team 1:",
            lobbyTeam2Label: "Team 2:",
            copyButton: "Copy",
            openButton: "Open",
            lobbyCreatedMsg: "Lobby created! Copy or open the links.",
            linkCopiedMsg: "Link copied!",
            linkCopiedFallbackMsg: "Link copied (fallback)",
            copyErrorMsg: "Copy failed",
            // Top Right Buttons
            adminButton: "Admin",
            themeToggleLight: "Switch to Light Theme",
            themeToggleDark: "Switch to Dark Theme",
            languageToggleButton: "RU", // Text on button when EN is active
            // Draft Page - Top Bar
            blueTeamDefaultName: "Blue Team",
            redTeamDefaultName: "Red Team",
            timerStartDraftTitle: "Start Draft",
            timerDraftRunningTitle: "Draft in progress...",
            timerDraftCompleteText: "Draft Complete!",
            timerDraftCompleteTitle: "Draft complete",
            timerAriaLabelStart: "Timer / Start Draft",
            timerAriaLabelRunning: "Timer: {time}",
            // Draft Page - Search/Controls
            searchPlaceholder: "Search...",
            searchAriaLabel: "Search champion",
            clearPicksTitle: "Clear picks/bans for the current game (incl. global)",
            clearPicksAriaLabel: "Clear picks/bans for the current game",
            resetTitle: "Full Reset",
            resetAriaLabel: "Full Reset",
            confirmPickBanTitle: "Confirm Pick/Ban",
            confirmPickBanAriaLabel: "Confirm Pick/Ban",
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
            priorityFilterShowPriorityTitle: "Show only priority champions",
            priorityFilterShowAllTitle: "Show all champions",
            priorityFilterAriaLabel: "Toggle priority champion filter",
            nextDraftTitle: "Next Draft (Fearless)",
            nextDraftAriaLabel: "Next Draft (Fearless)",
            swapTeamsTitle: "Swap Teams",
            swapTeamsAriaLabel: "Swap Teams",
            toggleTimerTitle: "Change Timer Duration (30/45s)",
            toggleTimerAriaLabel: "Change Timer Duration",
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
            pickSlotNicknamePlaceholder: "Player", // Used for data-placeholder attribute
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
            swapDuringDraftError: "Cannot swap picks/bans during an active draft. Only names/scores/global bans swapped.",
            swapError: "Error swapping teams.",
            timerToggled: "Timer duration: {duration} sec.",
            priorityFilterOn: "Showing only priority champions.",
            priorityFilterOff: "Showing all champions.",
            nextDraftComplete: "Moving to the next draft. Previous game's picks are banned.",
            nextDraftErrorNotComplete: "Draft is not complete. Finish it before proceeding to the next one.",
            timerEndedPickConfirm: "Time ran out! Auto-confirming: {name}",
            timerEndedPickClear: "Time ran out! Pick not selected. Draft cleared.",
            timerEndedBanSkip: "Time ran out! Ban skipped.",
            swapPickSelect: "Click to select for swap",
            swapConfirm: "Swapped: {champ1} <-> {champ2}",
             // Permissions denied messages
            permDeniedReset: "No permission to reset draft.",
            permDeniedClear: "No permission to clear draft.",
            permDeniedUndo: "No permission to undo this action.",
            permDeniedSwap: "No permission to swap sides.",
            permDeniedToggleTimer: "No permission to change timer.",
            permDeniedPriorityFilter: "No permission to toggle priority.",
            permDeniedNextDraft: "No permission to proceed to next draft.",
            permDeniedStartDraft: "No permission to start draft.",
            permDeniedPreviewPick: "No permission to pick champion.",
            permDeniedPreviewBan: "No permission to ban champion.",
            permDeniedConfirm: "No permission to confirm action.",
            permDeniedRoleFilter: "No permission to use role filters.",
            permDeniedEditName: "No permission to edit team name.",
            permDeniedEditScore: "No permission to edit score.",
            permDeniedEditNickname: "No permission to edit nickname.",
        }
    };

    // --- Page Elements ---
    const appContainer = document.getElementById('app-container');
    const homePage = document.getElementById('homePage');
    const draftPage = document.getElementById('draftPage');
    const adminButton = document.getElementById('adminButton');
    const themeToggleButton = document.getElementById('themeToggleButton');
    const languageToggleButton = document.getElementById('languageToggleButton');

    // Home Page Elements
    const team1NameInput = document.getElementById('team1NameInput');
    const team2NameInput = document.getElementById('team2NameInput');
    const createLobbyButton = document.getElementById('createLobbyButton');
    const lobbyLinksDisplay = document.getElementById('lobbyLinksDisplay');
    const judgeLinkText = document.getElementById('judgeLinkText');
    const team1LinkText = document.getElementById('team1LinkText');
    const team2LinkText = document.getElementById('team2LinkText');
    const openJudgeLinkButton = document.getElementById('openJudgeLinkButton');
    const openTeam1LinkButton = document.getElementById('openTeam1LinkButton');
    const openTeam2LinkButton = document.getElementById('openTeam2LinkButton');


    // --- Draft Simulator Global Elements ---
    let loadingIndicator, mainLayout, championGridElement, startButton, resetButton, undoButton, timerDisplay, championSearch, bluePicksContainer, redPicksContainer, blueColumn, redColumn, swapButton, clearPicksButton, toggleTimerButton, filterButtons, confirmPickBanButton, newPriorityFilterButton, nextDraftButton, globallyBannedDisplay, globalBansBlueContainer, globalBansRedContainer, championTooltip, statusMessage, blueTeamNameH2, redTeamNameH2, blueScoreEl, redScoreEl, returnHomeButton, roleFilterButtonsContainer;

    // --- State Variables ---
    let currentPage = 'home';
    let isDraftInitialized = false;
    let currentUserRole = null;
    let userTeamSide = null;
    let currentTheme = localStorage.getItem('theme') || 'dark';
    let currentLobbyId = null; // To store the current lobby ID

    // Global Data (Not lobby specific)
    let allChampionsData = { en: null, ru: null };
    let processedChampions = [];
    let ddragonVersion = 'latest';
    let baseIconUrl = '';
    let baseSplashUrl = '';

    // Lobby-Specific State (Defaults) - These will be loaded/saved per lobby
    // We don't declare them globally anymore, we use helper functions
    const defaultLobbyState = {
        currentStep: 0,
        selectedChampions: [], // Store as array for JSON
        draftHistory: [],
        pickNicknames: {},
        isDraftComplete: false,
        isDraftStarted: false,
        globallyDisabledChampions: [], // Store as array for JSON
        globalBanHistory: [],
        timerSeconds: 30,
        draftTimerDuration: 30,
        blueScore: '',
        redScore: '',
        currentRoleFilter: 'All',
        isPriorityFilterActive: false,
        previewedChampionId: null // Store ID instead of full object
    };

    // Priority list (remains global)
    const priorityChampions = new Set(['Aatrox', 'Ahri', 'Akali', 'Akshan', 'Alistar', 'Amumu', 'Annie', 'Ashe', 'AurelionSol', 'Blitzcrank', 'Brand', 'Braum', 'Caitlyn', 'Camille', 'Corki', 'Darius', 'Diana', 'DrMundo', 'Draven', 'Ekko', 'Evelynn', 'Ezreal', 'Fiddlesticks', 'Fiora', 'Fizz', 'Galio', 'Garen', 'Gnar', 'Gragas', 'Graves', 'Gwen', 'Hecarim', 'Heimerdinger', 'Irelia', 'Janna', 'JarvanIV', 'Jax', 'Jayce', 'Jhin', 'Jinx', 'Kaisa', 'Kalista', 'Karma', 'Kassadin', 'Katarina', 'Kayle', 'Kayn', 'Kennen', 'Khazix', 'Kindred', 'LeeSin', 'Leona', 'Lillia', 'Lissandra', 'Lucian', 'Lulu', 'Lux', 'Malphite', 'Maokai', 'MasterYi', 'Milio', 'MissFortune', 'Mordekaiser', 'Morgana', 'Nami', 'Nasus', 'Nautilus', 'Nilah', 'Nunu', 'Olaf', 'Orianna', 'Ornn', 'Pantheon', 'Poppy', 'Pyke', 'Rakan', 'Rammus', 'Renekton', 'Rengar', 'Riven', 'Rumble', 'Samira', 'Senna', 'Seraphine', 'Sett', 'Shen', 'Shyvana', 'Singed', 'Sion', 'Sivir', 'Sona', 'Soraka', 'Swain', 'Syndra', 'Talon', 'Teemo', 'Thresh', 'Tristana', 'Tryndamere', 'TwistedFate', 'Twitch', 'Urgot', 'Varus', 'Vayne', 'Veigar', 'Vex', 'Vi', 'Viego', 'Viktor', 'Vladimir', 'Volibear', 'Warwick', 'MonkeyKing', 'Xayah', 'XinZhao', 'Yasuo', 'Yone', 'Yuumi', 'Zac', 'Zed', 'Zeri', 'Ziggs', 'Zoe', 'Zyra', 'Ryze', 'Nocturne', 'Zilean', 'Renata', 'Belveth', 'Naafiri', 'Briar', 'Hwei', 'Smolder']);

    // Permissions Map (remains global)
    const permissions = { /* ... */
        admin: { editTeamName: true, editScore: true, clearDraft: true, resetDraft: true, startDraft: true, toggleTimerDuration: true, swapSides: true, editNicknames: true, togglePriorityFilter: true, nextDraft: true, pickChampion: true, banChampion: true, undoAction: true, confirmAction: true, useRoleFilters: true, returnHome: true },
        judge: { editTeamName: true, editScore: true, clearDraft: true, resetDraft: true, startDraft: true, toggleTimerDuration: true, swapSides: true, editNicknames: true, togglePriorityFilter: true, nextDraft: true, pickChampion: false, banChampion: false, undoAction: false, confirmAction: false, useRoleFilters: false, returnHome: true },
        team1: { editTeamName: false, editScore: false, clearDraft: false, resetDraft: false, startDraft: false, toggleTimerDuration: false, swapSides: false, editNicknames: false, togglePriorityFilter: false, nextDraft: false, pickChampion: true, banChampion: true, undoAction: true, confirmAction: true, useRoleFilters: true, returnHome: true },
        team2: { editTeamName: false, editScore: false, clearDraft: false, resetDraft: false, startDraft: false, toggleTimerDuration: false, swapSides: false, editNicknames: false, togglePriorityFilter: false, nextDraft: false, pickChampion: true, banChampion: true, undoAction: true, confirmAction: true, useRoleFilters: true, returnHome: true },
        default: { editTeamName: false, editScore: false, clearDraft: false, resetDraft: false, startDraft: false, toggleTimerDuration: false, swapSides: false, editNicknames: false, togglePriorityFilter: false, nextDraft: false, pickChampion: false, banChampion: false, undoAction: false, confirmAction: false, useRoleFilters: false, returnHome: true }
    };

    // --- Helper Functions ---
    const debounce = (func, wait) => { /* ... */ let timeout; return function executedFunction(...args) { const later = () => { clearTimeout(timeout); func(...args); }; clearTimeout(timeout); timeout = setTimeout(later, wait); }; };
    const showStatusMessage = (key, duration = 3000, replacements = {}) => { /* ... (Already modified) ... */ if (!statusMessage) statusMessage = document.getElementById('statusMessage'); if (!statusMessage) { console.warn("Status message element not found!"); return; } let message = translations[currentLanguage]?.[key] || key; for (const placeholder in replacements) { message = message.replace(`{${placeholder}}`, replacements[placeholder]); } statusMessage.textContent = message; statusMessage.classList.add('visible'); clearTimeout(statusTimeout); statusTimeout = setTimeout(() => { statusMessage.classList.remove('visible'); }, duration); };
    const getChampionById = (id) => processedChampions.find(champ => champ.id === id);
    function generateLobbyId(length = 6) { /* ... (Already added) ... */ const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; let result = ''; for (let i = 0; i < length; i++) { result += characters.charAt(Math.floor(Math.random() * characters.length)); } return result; }

    // --- ADDED: localStorage Helper Functions for Lobby State ---
    function getLobbyStorageKey(key) {
        if (!currentLobbyId) {
            console.error("Attempted to get storage key without a currentLobbyId");
            return null; // Or throw an error
        }
        return `lobby_${currentLobbyId}_${key}`;
    }

    function getLobbyItem(key, defaultValue) {
        const storageKey = getLobbyStorageKey(key);
        if (!storageKey) return defaultValue;

        try {
            const item = localStorage.getItem(storageKey);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error(`Error parsing localStorage item "${storageKey}":`, e);
            return defaultValue;
        }
    }

    function setLobbyItem(key, value) {
        const storageKey = getLobbyStorageKey(key);
        if (!storageKey) return;

        try {
            // Handle potential Sets before stringifying
            let valueToStore = value;
            if (value instanceof Set) {
                valueToStore = Array.from(value);
            }
            localStorage.setItem(storageKey, JSON.stringify(valueToStore));
        } catch (e) {
            console.error(`Error setting localStorage item "${storageKey}":`, e);
            // Handle potential quota errors, etc.
            showStatusMessage("Ошибка сохранения состояния лобби!", 5000);
        }
    }

    function removeLobbyItem(key) {
         const storageKey = getLobbyStorageKey(key);
         if (!storageKey) return;
         localStorage.removeItem(storageKey);
    }

    function clearLobbyState() {
        if (!currentLobbyId) return;
        console.log(`Clearing state for lobby: ${currentLobbyId}`);
        // Iterate through default keys and remove corresponding lobby items
        for (const key in defaultLobbyState) {
            removeLobbyItem(key);
        }
        // Also remove team names associated with this lobby
        localStorage.removeItem(currentLobbyId + '_team1Name');
        localStorage.removeItem(currentLobbyId + '_team2Name');
    }
    // --- END localStorage Helpers ---

    // Permission Check Function
    function hasPermission(action, team = null) { /* ... (no changes needed) ... */
        const rolePerms = permissions[currentUserRole] || permissions.default; const isAdmin = currentUserRole === 'admin'; const hasBasicPermission = isAdmin || rolePerms[action]; let result = false; if (!hasBasicPermission) { result = false; } else if (isAdmin) { result = true; } else if ((currentUserRole === 'team1' || currentUserRole === 'team2') && team) { result = userTeamSide === team; } else { result = true; } return result;
    }

     // Function to copy text to clipboard
     async function copyToClipboard(text) { /* ... (uses translation keys) ... */
         if (!navigator.clipboard) { try { const textArea = document.createElement("textarea"); textArea.value = text; textArea.style.position = "fixed"; document.body.appendChild(textArea); textArea.focus(); textArea.select(); document.execCommand('copy'); document.body.removeChild(textArea); showStatusMessage("linkCopiedFallbackMsg", 1500); } catch (err) { console.error('Fallback copy failed:', err); showStatusMessage("copyErrorMsg", 2000); } return; } try { await navigator.clipboard.writeText(text); showStatusMessage("linkCopiedMsg", 1500); } catch (err) { console.error('Async clipboard copy failed:', err); showStatusMessage("copyErrorMsg", 2000); }
     }

    // --- Theme Toggle Functions ---
    function applyTheme(theme) { /* ... (no changes needed) ... */
        console.log(`Applying theme: ${theme}`); document.documentElement.dataset.theme = theme; console.log(`DEBUG: html data-theme = ${document.documentElement.dataset.theme}`); if (themeToggleButton) { themeToggleButton.textContent = theme === 'dark' ? '🌙' : '☀️'; } else { console.warn("applyTheme: themeToggleButton not found when trying to update icon/title."); }
    }
    function toggleTheme() { /* ... (Calls updateUIText) ... */
        console.log("--- toggleTheme called ---"); currentTheme = currentTheme === 'dark' ? 'light' : 'dark'; localStorage.setItem('theme', currentTheme); applyTheme(currentTheme); updateUIText(currentLanguage);
    }

    // --- Language Toggle Functions ---
    function updateUIText(lang) { /* ... (Already modified) ... */
        console.log(`Updating UI text to: ${lang}`); const elements = document.querySelectorAll('[data-lang-key]'); const langTranslations = translations[lang] || translations.en; elements.forEach(el => { const key = el.dataset.langKey; const target = el.dataset.langTarget || 'textContent'; let translation = langTranslations[key]; if (translation === undefined) { console.warn(`Missing translation for key "${key}" in language "${lang}"`); translation = translations[lang === 'ru' ? 'en' : 'ru']?.[key] || key; } if (target === 'aria-label' && el.dataset.ariaValue && typeof translation === 'string') { translation = translation.replace(/{\w+}/g, el.dataset.ariaValue); } if (target === 'textContent') { const hasDirectText = Array.from(el.childNodes).some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ''); if (hasDirectText || el.children.length === 0 || el.tagName === 'STRONG') { el.textContent = translation; } else if (el.querySelector('span[data-lang-key]')) { const span = el.querySelector(`span[data-lang-key="${key}"]`); if (span) span.textContent = translation; } } else if (target === 'placeholder') { el.placeholder = translation; } else if (target === 'title') { el.title = translation; } else if (target === 'aria-label') { el.setAttribute('aria-label', translation); } else { el.setAttribute(target, translation); } });
        const nicknamePlaceholderText = langTranslations.pickSlotNicknamePlaceholder || 'Player'; document.querySelectorAll('.nickname-input').forEach(input => { input.dataset.placeholder = nicknamePlaceholderText; });
        if (languageToggleButton) { languageToggleButton.textContent = langTranslations.languageToggleButton || (lang === 'ru' ? 'EN' : 'RU'); } if (themeToggleButton) { themeToggleButton.title = currentTheme === 'dark' ? langTranslations.themeToggleLight : langTranslations.themeToggleDark; } if (newPriorityFilterButton) { newPriorityFilterButton.title = getLobbyItem('isPriorityFilterActive', false) ? langTranslations.priorityFilterShowAllTitle : langTranslations.priorityFilterShowPriorityTitle; } if (timerDisplay && !getLobbyItem('isDraftStarted', false)) { timerDisplay.title = langTranslations.timerStartDraftTitle; timerDisplay.setAttribute('aria-label', langTranslations.timerAriaLabelStart); }
        if (isDraftInitialized) { displayChampions(); updateDraftUI(); } console.log("UI text update complete.");
    }
    function toggleLanguage() { /* ... (Already modified) ... */
        currentLanguage = (currentLanguage === 'ru') ? 'en' : 'ru'; localStorage.setItem('language', currentLanguage); console.log(`Language switched to: ${currentLanguage}`); document.documentElement.lang = currentLanguage; if (processedChampions.length > 0) { processedChampions.sort((a, b) => a.name[currentLanguage].localeCompare(b.name[currentLanguage], currentLanguage)); } updateUIText(currentLanguage);
    }


    // --- Navigation & Role Handling ---
    function getParamsFromHash() { /* ... (Already modified) ... */
        const hash = window.location.hash.substring(1); const params = new URLSearchParams(hash); const lobbyId = params.get('lobby'); const role = params.get('role'); if (lobbyId && role && permissions[role] && role !== 'admin') { return { lobbyId, role }; } return null;
    }
    function navigateTo(pageName) { /* ... (Already modified) ... */
        console.log(`Navigating to: ${pageName}`); currentPage = pageName; if(homePage) homePage.classList.add('hidden'); if(draftPage) draftPage.classList.add('hidden'); const currentAdminButton = document.getElementById('adminButton'); const currentThemeButton = document.getElementById('themeToggleButton'); const currentLangButton = document.getElementById('languageToggleButton'); if(currentAdminButton) currentAdminButton.classList.add('hidden'); if(currentThemeButton) currentThemeButton.classList.add('hidden'); if(currentLangButton) currentLangButton.classList.add('hidden');
        if (pageName === 'home') { if(homePage) homePage.classList.remove('hidden'); if(currentAdminButton) currentAdminButton.classList.remove('hidden'); if(currentThemeButton) currentThemeButton.classList.remove('hidden'); if(currentLangButton) currentLangButton.classList.remove('hidden'); console.log("DEBUG navigateTo: Showing buttons for home page"); if (window.location.hash) { currentUserRole = null; userTeamSide = null; currentLobbyId = null; history.pushState("", document.title, window.location.pathname + window.location.search); } updateUIText(currentLanguage); }
        else if (pageName === 'draft') { if(draftPage) draftPage.classList.remove('hidden'); console.log("DEBUG navigateTo: Hiding buttons for draft page"); const params = getParamsFromHash(); if (params) { console.log(`Draft Navigation - Lobby: ${params.lobbyId}, Role: ${params.role}`); currentLobbyId = params.lobbyId; currentUserRole = params.role; if (currentUserRole === 'team1') userTeamSide = 'blue'; else if (currentUserRole === 'team2') userTeamSide = 'red'; else userTeamSide = null; } else if (currentUserRole === 'admin' && !currentLobbyId) { currentLobbyId = 'admin_lobby'; console.warn(`Admin navigated to draft without lobbyId, using default: ${currentLobbyId}`); } else { console.error("Cannot navigate to draft: Missing or invalid lobbyId/role in hash."); showStatusMessage("errorInitCritical", 5000, {error: "Invalid lobby link."}); navigateTo('home'); return; }
             if (!isDraftInitialized || !document.getElementById('championGrid')) { console.log(`Initializing draft simulator for lobby ${currentLobbyId}...`); initializeAppDraft(); isDraftInitialized = true; } else { console.log(`Draft already initialized for lobby ${currentLobbyId}, re-applying permissions for role: ${currentUserRole}`); if (checkDraftElements()) { applyRolePermissions(currentUserRole); const lobbyTeam1Key = currentLobbyId + '_team1Name'; const lobbyTeam2Key = currentLobbyId + '_team2Name'; if(blueTeamNameH2) blueTeamNameH2.textContent = localStorage.getItem(lobbyTeam1Key) || translations[currentLanguage].blueTeamDefaultName; if(redTeamNameH2) redTeamNameH2.textContent = localStorage.getItem(lobbyTeam2Key) || translations[currentLanguage].redTeamDefaultName; updateUIText(currentLanguage); console.warn("TODO: Implement loading draft state for lobby:", currentLobbyId); updateDraftUI(); } else { console.error("Draft elements not found when trying to re-apply permissions."); showStatusMessage("errorInitDraftElements", 5000); } } }
    }

    // --- Home Page Logic ---
    function handleCreateLobby() { /* ... (Already modified) ... */
        console.log("handleCreateLobby called"); const lobbyId = generateLobbyId(); console.log("Generated Lobby ID:", lobbyId); const team1Name = team1NameInput.value.trim() || translations[currentLanguage].blueTeamDefaultName; const team2Name = team2NameInput.value.trim() || translations[currentLanguage].redTeamDefaultName; localStorage.setItem(lobbyId + '_team1Name', team1Name); localStorage.setItem(lobbyId + '_team2Name', team2Name); const baseUrl = window.location.origin + window.location.pathname; const judgeLink = `${baseUrl}#lobby=${lobbyId}&role=judge`; const team1Link = `${baseUrl}#lobby=${lobbyId}&role=team1`; const team2Link = `${baseUrl}#lobby=${lobbyId}&role=team2`; if (judgeLinkText) judgeLinkText.textContent = judgeLink; if (team1LinkText) team1LinkText.textContent = team1Link; if (team2LinkText) team2LinkText.textContent = team2Link; const openJudgeBtn = document.getElementById('openJudgeLinkButton'); const openTeam1Btn = document.getElementById('openTeam1LinkButton'); const openTeam2Btn = document.getElementById('openTeam2LinkButton'); if (openJudgeBtn) openJudgeBtn.href = judgeLink; else console.warn("Judge 'Open' button not found"); if (openTeam1Btn) openTeam1Btn.href = team1Link; else console.warn("Team 1 'Open' button not found"); if (openTeam2Btn) openTeam2Btn.href = team2Link; else console.warn("Team 2 'Open' button not found"); if (lobbyLinksDisplay) lobbyLinksDisplay.classList.remove('hidden'); showStatusMessage("lobbyCreatedMsg", 3000);
    }
    function handleAdminClick() { /* ... (Already modified) ... */
        console.log("Admin button clicked."); const lobbyId = generateLobbyId(); const team1Name = team1NameInput.value.trim() || translations[currentLanguage].blueTeamDefaultName; const team2Name = team2NameInput.value.trim() || translations[currentLanguage].redTeamDefaultName; localStorage.setItem(lobbyId + '_team1Name', team1Name); localStorage.setItem(lobbyId + '_team2Name', team2Name); currentUserRole = 'admin'; currentLobbyId = lobbyId; userTeamSide = null; window.location.hash = `lobby=${lobbyId}&role=admin`; showStatusMessage("Создано новое лобби для Админа.", 2000);
    }

    // Add listener for create lobby button
    if (createLobbyButton) { createLobbyButton.addEventListener('click', handleCreateLobby); } else { console.warn("Create Lobby Button not found"); }
     // Add listeners for copy buttons
     document.querySelectorAll('.copy-button').forEach(button => { if (button.tagName === 'BUTTON') { button.addEventListener('click', (event) => { const linkId = event.target.dataset.linkId; const linkSpan = document.getElementById(linkId); if (linkSpan) { copyToClipboard(linkSpan.textContent); } else { console.warn("Copy link span not found for id:", linkId); } }); } });
    // Add listener for Admin button
    if (adminButton) { adminButton.addEventListener('click', handleAdminClick); } else { console.warn("Admin Button not found"); }
    // --- Theme Toggle Listener ---
    if (themeToggleButton) { themeToggleButton.addEventListener('click', toggleTheme); } else { console.warn("Theme toggle button not found! Listener not attached."); }
    // --- Language Toggle Listener ---
    if (languageToggleButton) { languageToggleButton.addEventListener('click', toggleLanguage); } else { console.warn("Language toggle button not found! Listener not attached."); }


    // --- Function to check if draft elements exist ---
    function checkDraftElements() { /* ... (no changes needed) ... */
        loadingIndicator = document.getElementById('loadingIndicator'); mainLayout = document.getElementById('mainLayout'); championGridElement = document.getElementById('championGrid'); timerDisplay = document.getElementById('timerDisplay'); resetButton = document.getElementById('resetButton'); undoButton = document.getElementById('undoButton'); championSearch = document.getElementById('championSearch'); blueColumn = document.querySelector('.blue-column'); redColumn = document.querySelector('.red-column'); swapButton = document.getElementById('swapButton'); clearPicksButton = document.getElementById('clearPicksButton'); toggleTimerButton = document.getElementById('toggleTimerButton'); roleFilterButtonsContainer = document.getElementById('roleFilterButtons'); filterButtons = roleFilterButtonsContainer ? roleFilterButtonsContainer.querySelectorAll('.filter-button') : null; confirmPickBanButton = document.getElementById('confirmPickBanButton'); newPriorityFilterButton = document.getElementById('newPriorityFilterButton'); nextDraftButton = document.getElementById('nextDraftButton'); returnHomeButton = document.getElementById('returnHomeButton'); blueTeamNameH2 = document.getElementById('blue-team-name-h2'); redTeamNameH2 = document.getElementById('red-team-name-h2'); blueScoreEl = document.getElementById('blue-score'); redScoreEl = document.getElementById('red-score'); statusMessage = document.getElementById('statusMessage'); championTooltip = document.getElementById('championTooltip'); globalBansBlueContainer = document.getElementById('global-bans-blue'); globalBansRedContainer = document.getElementById('global-bans-red'); globallyBannedDisplay = document.getElementById('globallyBannedDisplay'); const elementsToCheck = [ loadingIndicator, mainLayout, championGridElement, timerDisplay, resetButton, undoButton, championSearch, blueColumn, redColumn, swapButton, clearPicksButton, toggleTimerButton, roleFilterButtonsContainer, filterButtons, confirmPickBanButton, newPriorityFilterButton, nextDraftButton, returnHomeButton, blueTeamNameH2, redTeamNameH2, blueScoreEl, redScoreEl, statusMessage, championTooltip, globalBansBlueContainer, globalBansRedContainer, globallyBannedDisplay ]; if (!filterButtons || filterButtons.length === 0) { console.error("Role filter buttons NodeList is empty or null!"); } const missingElements = elementsToCheck.filter(el => !el); if (missingElements.length > 0) { console.error("Missing draft elements during check:", missingElements.map(el => el?.id || (el === newPriorityFilterButton ? 'newPriorityFilterButton' : 'unknown'))); return false; } return true;
    }


    // --- Draft Simulator Logic (all inside initializeAppDraft) ---
    // --- MODIFIED: initializeAppDraft uses lobby state helpers ---
    async function initializeAppDraft() {
        console.log(`initializeAppDraft started for lobby: ${currentLobbyId}`);
        try {
            if (!currentUserRole || !currentLobbyId) { throw new Error(`Invalid state: Role (${currentUserRole}) or Lobby ID (${currentLobbyId}) not set.`); }
            console.log(`Initializing draft with Role: ${currentUserRole}, Lobby: ${currentLobbyId}`);
            if (!checkDraftElements()) { throw new Error("One or more draft page elements were not found during initialization!"); }
            console.log("All draft elements found.");

            if(loadingIndicator) loadingIndicator.classList.remove('hidden');
            updateUIText(currentLanguage); // Update loading text

            // Load global champ data if not already loaded
            if (processedChampions.length === 0) {
                const dataLoaded = await loadChampionData();
                if (!dataLoaded) { throw new Error("Failed to load champion data."); }
            }

            if(loadingIndicator) loadingIndicator.classList.add('hidden');
            if(mainLayout) mainLayout.classList.remove('hidden');

            // --- Load lobby-specific state ---
            // No need to explicitly load here if using getLobbyItem throughout
            console.log(`State will be loaded lazily for lobby ${currentLobbyId} using getLobbyItem.`);

            displayChampions(); // Uses currentLanguage

            // Restore UI based on loaded/default lobby state
            restoreDraftStateFromStorage(); // New function to apply loaded state

            // Read team names using lobby ID prefix
            const lobbyTeam1Key = currentLobbyId + '_team1Name';
            const lobbyTeam2Key = currentLobbyId + '_team2Name';
            if(blueTeamNameH2) blueTeamNameH2.textContent = localStorage.getItem(lobbyTeam1Key) || translations[currentLanguage].blueTeamDefaultName;
            if(redTeamNameH2) redTeamNameH2.textContent = localStorage.getItem(lobbyTeam2Key) || translations[currentLanguage].redTeamDefaultName;
            // Scores are now handled by restoreDraftStateFromStorage

            console.log("Attaching draft page event listeners...");
            // Attach listeners... (no changes needed here)
            if (timerDisplay) timerDisplay.addEventListener('click', handleStartDraft); else console.warn("Listener not attached: timerDisplay not found"); if (resetButton) resetButton.addEventListener('click', () => { console.log("Reset button clicked"); resetDraftFull(false); }); else console.warn("Listener not attached: resetButton not found"); if (clearPicksButton) clearPicksButton.addEventListener('click', () => { console.log("Clear Picks button clicked"); resetCurrentGamePicksBans(false, false); }); else console.warn("Listener not attached: clearPicksButton not found"); if (undoButton) undoButton.addEventListener('click', handleUndo); else console.warn("Listener not attached: undoButton not found"); if (swapButton) swapButton.addEventListener('click', handleSwapTeams); else console.warn("Listener not attached: swapButton not found"); if (toggleTimerButton) toggleTimerButton.addEventListener('click', handleToggleTimer); else console.warn("Listener not attached: toggleTimerButton not found"); if (confirmPickBanButton) confirmPickBanButton.addEventListener('click', handleConfirmPickBan); else console.warn("Listener not attached: confirmPickBanButton not found"); if (newPriorityFilterButton) { newPriorityFilterButton.addEventListener('click', handleNewPriorityFilterToggle); } else { console.warn("Listener not attached: newPriorityFilterButton not found"); } if (nextDraftButton) nextDraftButton.addEventListener('click', handleNextDraft); else console.warn("Listener not attached: nextDraftButton not found"); if (championSearch) championSearch.addEventListener('input', debouncedFilter); else console.warn("Listener not attached: championSearch not found"); if (filterButtons) { filterButtons.forEach((button, index) => { if (button) { button.addEventListener('click', handleRoleFilterClick); } else { console.warn(`Listener not attached: filter button at index ${index} was null`); } }); } else { console.warn("Listener not attached: filterButtons collection is null/empty"); } if (blueColumn) blueColumn.addEventListener('click', handlePickContainerClick); else console.warn("Listener not attached: blueColumn not found"); if (redColumn) redColumn.addEventListener('click', handlePickContainerClick); else console.warn("Listener not attached: redColumn not found"); if (returnHomeButton) returnHomeButton.addEventListener('click', () => { console.log("Return Home button clicked"); navigateTo('home'); }); else console.warn("Listener not attached: returnHomeButton not found");
            [blueTeamNameH2, redTeamNameH2, blueScoreEl, redScoreEl].forEach(el => {
                 if (el) {
                     el.addEventListener('blur', (e) => {
                         const isName = el.id.includes('name');
                         const permissionNeeded = isName ? 'editTeamName' : 'editScore';
                         if (!hasPermission(permissionNeeded)) return;
                         const newValue = e.target.textContent.trim();
                         e.target.textContent = newValue; // Update UI immediately
                         // Save lobby-specific name/score
                         const key = isName ? (el.id.includes('blue') ? 'team1Name' : 'team2Name') : (el.id.includes('blue') ? 'blueScore' : 'redScore');
                         // Use direct localStorage for names as they are set outside lobby state object
                         if (isName) {
                              localStorage.setItem(`${currentLobbyId}_${key}`, newValue);
                         } else {
                              setLobbyItem(key, newValue); // Use helper for score
                         }
                     });
                     el.addEventListener('keydown', (e) => { const permissionNeeded = el.id.includes('name') ? 'editTeamName' : 'editScore'; if (!hasPermission(permissionNeeded)) return; if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } });
                 } else { console.warn("Listener not attached: An editable H2/Score element was not found"); }
             });
            console.log("Draft page event listeners attached.");

            updateUIText(currentLanguage); // Set initial text for draft page elements
            updateDraftUI(); // Apply initial UI state based on loaded lobby state
            console.log(`Draft simulator page initialized successfully for lobby ${currentLobbyId}, role: ${currentUserRole}`);

        } catch (error) {
            console.error(`Error during initializeAppDraft for lobby ${currentLobbyId}:`, error);
            showStatusMessage("errorInitCritical", 10000, { error: error.message });
            if(loadingIndicator) loadingIndicator.textContent = `Ошибка! ${error.message}`;
            if(mainLayout) mainLayout.classList.add('hidden');
        }
    }
    // --- END MODIFIED initializeAppDraft ---

    // --- ADDED: Function to restore UI from lobby state ---
    function restoreDraftStateFromStorage() {
        if (!currentLobbyId) return;
        console.log(`Restoring state for lobby: ${currentLobbyId}`);

        // Restore simple values
        const loadedStep = getLobbyItem('currentStep', 0);
        const loadedIsStarted = getLobbyItem('isDraftStarted', false);
        const loadedIsComplete = getLobbyItem('isDraftComplete', false);
        const loadedTimerDuration = getLobbyItem('draftTimerDuration', 30);
        const loadedTimerSeconds = getLobbyItem('timerSeconds', loadedTimerDuration);
        const loadedRoleFilter = getLobbyItem('currentRoleFilter', 'All');
        const loadedPriorityFilter = getLobbyItem('isPriorityFilterActive', false);
        const loadedBlueScore = getLobbyItem('blueScore', '');
        const loadedRedScore = getLobbyItem('redScore', '');

        // Restore complex values (arrays/objects/sets)
        const loadedSelectedChamps = new Set(getLobbyItem('selectedChampions', []));
        const loadedDraftHistory = getLobbyItem('draftHistory', []);
        const loadedPickNicknames = getLobbyItem('pickNicknames', {});
        const loadedGloballyDisabled = new Set(getLobbyItem('globallyDisabledChampions', []));
        const loadedGlobalBanHistory = getLobbyItem('globalBanHistory', []);
        const loadedPreviewedChampionId = getLobbyItem('previewedChampionId', null);

        // Clear existing UI slots before restoring
        document.querySelectorAll('.pick-slot, .ban-slot').forEach(slot => {
            restoreSlotPlaceholder(slot, slot.id, ''); // Clear with empty nickname initially
        });

        // Re-populate UI based on loaded history
        loadedDraftHistory.forEach(action => {
            const champ = getChampionById(action.championId);
            const slotElement = document.getElementById(action.slotId);
            const nickname = loadedPickNicknames[action.slotId] || ''; // Get nickname for this slot
            if (champ && slotElement) {
                fillSlot(slotElement, champ, action.type, nickname);
            }
        });

        // Apply loaded state to UI elements (scores, filters, etc.)
        if (blueScoreEl) blueScoreEl.textContent = loadedBlueScore;
        if (redScoreEl) redScoreEl.textContent = loadedRedScore;
        if (championSearch) championSearch.value = ''; // Clear search on load

        // Apply filters
        currentRoleFilter = loadedRoleFilter; // Need to update the global variable used by filterChampions
        if (filterButtons) {
            filterButtons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.role === currentRoleFilter);
            });
        }
        isPriorityFilterActive = loadedPriorityFilter; // Update global variable
        if (newPriorityFilterButton) {
            newPriorityFilterButton.setAttribute('aria-pressed', isPriorityFilterActive.toString());
        }
        filterChampions(); // Apply filters based on loaded state

        // Restore preview if any (find champion object from ID)
        previewedChampion = loadedPreviewedChampionId ? getChampionById(loadedPreviewedChampionId) : null;
        if (previewedChampion) {
             const draftOrder = getDraftOrder();
             if (loadedStep < draftOrder.length) {
                 const previewSlotId = draftOrder[loadedStep].slot;
                 const previewSlotElement = document.getElementById(previewSlotId);
                 if (previewSlotElement) {
                     previewSlotElement.classList.add('preview-flash');
                 }
             }
        }


        // Restore timer state
        draftTimerDuration = loadedTimerDuration;
        timerSeconds = loadedTimerSeconds;
        if(timerDisplay){
            timerDisplay.textContent = formatTime(timerSeconds);
            // Note: Timer itself isn't restarted here, updateDraftUI handles appearance
        }

        console.log(`State restored for lobby ${currentLobbyId}. Step: ${loadedStep}`);
        // updateDraftUI will be called after this in initializeAppDraft
    }
    // --- END restoreDraftStateFromStorage ---


    // --- Role Permission Application ---
    function applyRolePermissions(role) { /* ... (no changes needed) ... */
        const can = (action, team = null) => hasPermission(action, team); if(timerDisplay) timerDisplay.disabled = !can('startDraft'); if(resetButton) resetButton.disabled = !can('resetDraft'); if(clearPicksButton) clearPicksButton.disabled = !can('clearDraft'); if(undoButton) undoButton.disabled = !can('undoAction'); if(swapButton) swapButton.disabled = !can('swapSides'); if(toggleTimerButton) toggleTimerButton.disabled = !can('toggleTimerDuration'); if(confirmPickBanButton) confirmPickBanButton.disabled = !can('confirmAction'); if(newPriorityFilterButton) newPriorityFilterButton.disabled = !can('togglePriorityFilter'); if(nextDraftButton) nextDraftButton.disabled = !can('nextDraft'); if(returnHomeButton) returnHomeButton.disabled = !can('returnHome'); if(filterButtons) { filterButtons.forEach(btn => { btn.disabled = !can('useRoleFilters'); }); } if(blueTeamNameH2) blueTeamNameH2.contentEditable = can('editTeamName'); if(redTeamNameH2) redTeamNameH2.contentEditable = can('editTeamName'); if(blueScoreEl) blueScoreEl.contentEditable = can('editScore'); if(redScoreEl) redScoreEl.contentEditable = can('editScore'); if (blueColumn) blueColumn.classList.toggle('role-disabled', role === 'team2'); if (redColumn) redColumn.classList.toggle('role-disabled', role === 'team1'); if (role === 'admin') { if(blueColumn) blueColumn.classList.remove('role-disabled'); if(redColumn) redColumn.classList.remove('role-disabled'); } updateNicknameEditability();
    }

     // --- Update Nickname Editability based on Role ---
     function updateNicknameEditability() { /* ... (no changes needed) ... */
         const canEdit = hasPermission('editNicknames'); document.querySelectorAll('.nickname-input').forEach(input => { input.contentEditable = canEdit; input.style.cursor = canEdit ? 'text' : 'default'; });
     }

    // --- Data Fetching (Draft Specific) ---
    async function loadChampionData() { /* ... (Already modified) ... */
         // Only load if processedChampions is empty
         if (processedChampions.length > 0) {
             console.log("Champion data already loaded.");
             return true;
         }
         try { const versionsResponse = await fetch('https://ddragon.leagueoflegends.com/api/versions.json'); if (!versionsResponse.ok) throw new Error(translations[currentLanguage].errorLoadingVersions.replace('{status}', versionsResponse.statusText)); const versions = await versionsResponse.json(); ddragonVersion = versions[0]; baseIconUrl = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/`; baseSplashUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/`; const championRolesMap = { /* ... roles ... */ 'Aatrox': ['Top'], 'Ahri': ['Mid'], 'Akali': ['Mid', 'Top'], 'Akshan': ['Mid', 'Top'], 'Alistar': ['Support'], 'Amumu': ['Jungle', 'Support'], 'Anivia': ['Mid'], 'Annie': ['Mid', 'Support'], 'Aphelios': ['ADC'], 'Ashe': ['ADC', 'Support'], 'AurelionSol': ['Mid'], 'Azir': ['Mid'], 'Bard': ['Support'], 'Belveth': ['Jungle'], 'Blitzcrank': ['Support'], 'Brand': ['Support', 'Mid', 'Jungle'], 'Braum': ['Support'], 'Briar': ['Jungle'], 'Caitlyn': ['ADC'], 'Camille': ['Top'], 'Cassiopeia': ['Top', 'Mid'], 'Chogath': ['Top', 'Mid'], 'Corki': ['Mid', 'ADC'], 'Darius': ['Top', 'Jungle'], 'Diana': ['Jungle', 'Mid'], 'DrMundo': ['Top', 'Jungle'], 'Draven': ['ADC'], 'Ekko': ['Jungle', 'Mid'], 'Elise': ['Jungle'], 'Evelynn': ['Jungle'], 'Ezreal': ['ADC'], 'Fiddlesticks': ['Jungle'], 'Fiora': ['Top'], 'Fizz': ['Mid'], 'Galio': ['Mid', 'Support'], 'Gangplank': ['Top'], 'Garen': ['Top'], 'Gnar': ['Top'], 'Gragas': ['Jungle', 'Top', 'Mid', 'Support'], 'Graves': ['Jungle'], 'Gwen': ['Top', 'Jungle'], 'Hecarim': ['Jungle'], 'Heimerdinger': ['Top', 'Mid', 'Support'], 'Hwei': ['Mid', 'Support'], 'Illaoi': ['Top'], 'Irelia': ['Top', 'Mid'], 'Ivern': ['Jungle', 'Support'], 'Janna': ['Support'], 'JarvanIV': ['Jungle'], 'Jax': ['Top', 'Jungle'], 'Jayce': ['Top', 'Mid'], 'Jhin': ['ADC'], 'Jinx': ['ADC'], 'Kaisa': ['ADC'], 'Kalista': ['ADC'], 'Karma': ['Support', 'Mid'], 'Karthus': ['Jungle', 'Mid'], 'Kassadin': ['Mid'], 'Katarina': ['Mid'], 'Kayle': ['Top', 'Mid'], 'Kayn': ['Jungle'], 'Kennen': ['Top', 'Mid'], 'Khazix': ['Jungle'], 'Kindred': ['Jungle'], 'Kled': ['Top', 'Mid'], 'KogMaw': ['ADC'], 'KSante': ['Top'], 'Leblanc': ['Mid'], 'LeeSin': ['Jungle'], 'Leona': ['Support'], 'Lillia': ['Jungle'], 'Lissandra': ['Mid'], 'Lucian': ['ADC'], 'Lulu': ['Support'], 'Lux': ['Mid', 'Support'], 'Malphite': ['Top', 'Support', 'Mid'], 'Malzahar': ['Mid'], 'Maokai': ['Jungle', 'Support'], 'MasterYi': ['Jungle'], 'Milio': ['Support'], 'MissFortune': ['ADC'], 'Mordekaiser': ['Top', 'Jungle'], 'Morgana': ['Support', 'Mid', 'Jungle'], 'Naafiri': ['Jungle', 'Mid'], 'Nami': ['Support'], 'Nasus': ['Top'], 'Nautilus': ['Support'], 'Neeko': ['Mid', 'Support'], 'Nidalee': ['Jungle'], 'Nilah': ['ADC'], 'Nocturne': ['Jungle'], 'Nunu': ['Jungle'], 'Olaf': ['Top', 'Jungle'], 'Orianna': ['Mid'], 'Ornn': ['Top'], 'Pantheon': ['Top', 'Mid', 'Support', 'Jungle'], 'Poppy': ['Top', 'Jungle', 'Support'], 'Pyke': ['Support', 'Mid'], 'Qiyana': ['Jungle', 'Mid'], 'Quinn': ['Top', 'Mid'], 'Rakan': ['Support'], 'Rammus': ['Jungle'], 'RekSai': ['Jungle'], 'Rell': ['Support', 'Jungle'], 'Renata': ['Support'], 'Renekton': ['Top'], 'Rengar': ['Jungle', 'Top'], 'Riven': ['Top'], 'Rumble': ['Top', 'Mid', 'Jungle'], 'Ryze': ['Top', 'Mid'], 'Samira': ['ADC'], 'Sejuani': ['Jungle'], 'Senna': ['Support', 'ADC'], 'Seraphine': ['Support', 'Mid', 'ADC'], 'Sett': ['Top', 'Support'], 'Shaco': ['Jungle', 'Support'], 'Shen': ['Top', 'Support'], 'Shyvana': ['Jungle'], 'Singed': ['Top'], 'Sion': ['Top', 'Mid'], 'Sivir': ['ADC'], 'Skarner': ['Jungle', 'Top'], 'Smolder': ['ADC', 'Mid'], 'Sona': ['Support'], 'Soraka': ['Support'], 'Swain': ['Support', 'Mid', 'ADC'], 'Sylas': ['Mid', 'Jungle'], 'Syndra': ['Mid'], 'TahmKench': ['Top', 'Support'], 'Taliyah': ['Jungle', 'Mid'], 'Talon': ['Jungle', 'Mid'], 'Taric': ['Support'], 'Teemo': ['Top'], 'Thresh': ['Support'], 'Tristana': ['ADC', 'Mid'], 'Trundle': ['Top', 'Jungle'], 'Tryndamere': ['Top'], 'TwistedFate': ['Mid', 'ADC'], 'Twitch': ['ADC', 'Jungle'], 'Udyr': ['Jungle', 'Top'], 'Urgot': ['Top'], 'Varus': ['ADC', 'Mid'], 'Vayne': ['ADC', 'Top'], 'Veigar': ['Mid', 'ADC', 'Support'], 'Velkoz': ['Mid', 'Support'], 'Vex': ['Mid'], 'Vi': ['Jungle'], 'Viego': ['Jungle'], 'Viktor': ['Mid'], 'Vladimir': ['Top', 'Mid'], 'Volibear': ['Top', 'Jungle'], 'Warwick': ['Jungle', 'Top'], 'MonkeyKing': ['Top', 'Jungle'], 'Xayah': ['ADC'], 'Xerath': ['Mid', 'Support'], 'XinZhao': ['Jungle'], 'Yasuo': ['Mid', 'Top', 'ADC'], 'Yone': ['Top', 'Mid'], 'Yorick': ['Top', 'Jungle'], 'Yuumi': ['Support'], 'Zac': ['Jungle'], 'Zed': ['Mid', 'Jungle'], 'Zeri': ['ADC'], 'Ziggs': ['Mid', 'ADC', 'Support'], 'Zilean': ['Support', 'Mid'], 'Zoe': ['Mid', 'Support'], 'Zyra': ['Support', 'Jungle', 'Mid'] }; const dataUrlEn = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/en_US/champion.json`; const dataUrlRu = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/ru_RU/champion.json`; const [enResponse, ruResponse] = await Promise.all([ fetch(dataUrlEn), fetch(dataUrlRu) ]); if (!enResponse.ok) throw new Error(translations[currentLanguage].errorLoadingDataEN.replace('{status}', enResponse.statusText)); allChampionsData.en = (await enResponse.json()).data; if (!ruResponse.ok) { console.warn(translations[currentLanguage].errorLoadingDataRU.replace('{status}', ruResponse.statusText)); showStatusMessage("errorLoadingDataRU", 4000, { status: ruResponse.statusText }); allChampionsData.ru = null; } else { allChampionsData.ru = (await ruResponse.json()).data; } processedChampions = Object.keys(allChampionsData.en).map(champId => { const enData = allChampionsData.en[champId]; const ruData = allChampionsData.ru ? allChampionsData.ru[champId] : enData; return { id: enData.id, name: { en: enData.name, ru: ruData.name }, title: { en: enData.title, ru: ruData.title }, roles: championRolesMap[enData.id] || [], iconUrl: `${baseIconUrl}${enData.image.full}`, splashUrl: `${baseSplashUrl}${enData.id}_0.jpg` }; }); processedChampions.sort((a, b) => a.name[currentLanguage].localeCompare(b.name[currentLanguage], currentLanguage)); console.log(`Successfully loaded and processed ${processedChampions.length} champions.`); return true; } catch (error) { console.error("Error loading champion data:", error); showStatusMessage("errorLoadingChampions", 5000, { error: error.message }); if(loadingIndicator) loadingIndicator.textContent = `Ошибка загрузки! ${error.message}`; if(mainLayout) mainLayout.classList.add('hidden'); return false; }
     }

    // --- Timer Functions (Draft Specific) ---
    function stopTimer() { /* ... (no changes needed) ... */ clearInterval(timerInterval); timerInterval = null; if(timerDisplay) timerDisplay.classList.remove('timer-running', 'timer-ending'); }
    function formatTime(seconds) { /* ... (no changes needed) ... */ const minutes = Math.floor(seconds / 60); const remainingSeconds = seconds % 60; return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`; }
    // --- MODIFIED: resetTimerDisplay uses lobby state ---
    function resetTimerDisplay() {
        stopTimer();
        const duration = getLobbyItem('draftTimerDuration', 30);
        setLobbyItem('timerSeconds', duration); // Reset timer seconds in storage
        if(timerDisplay) {
            timerDisplay.textContent = formatTime(duration);
            timerDisplay.disabled = !hasPermission('startDraft');
            timerDisplay.classList.remove('timer-disabled', 'timer-running', 'timer-ending');
            timerDisplay.title = translations[currentLanguage].timerStartDraftTitle;
            timerDisplay.setAttribute('aria-label', translations[currentLanguage].timerAriaLabelStart);
        }
    }
    // --- MODIFIED: startTimer uses lobby state ---
    function startTimer() {
        console.log("startTimer called");
        if (!hasPermission('startDraft')) { showStatusMessage("permDeniedStartDraft", 2000); return; }
        stopTimer();
        let currentTimerSeconds = getLobbyItem('timerSeconds', getLobbyItem('draftTimerDuration', 30)); // Get current seconds
        if (!timerDisplay) { console.warn("startTimer: timerDisplay not found"); return; }
        timerDisplay.textContent = formatTime(currentTimerSeconds);
        timerDisplay.disabled = true;
        timerDisplay.classList.add('timer-running', 'timer-disabled');
        timerDisplay.title = translations[currentLanguage].timerDraftRunningTitle;
        timerDisplay.setAttribute('aria-label', translations[currentLanguage].timerAriaLabelRunning.replace('{time}', formatTime(currentTimerSeconds)));

        timerInterval = setInterval(() => {
            currentTimerSeconds--;
            setLobbyItem('timerSeconds', currentTimerSeconds); // Update stored seconds

            if (timerDisplay) {
                timerDisplay.textContent = formatTime(currentTimerSeconds);
                timerDisplay.setAttribute('aria-label', translations[currentLanguage].timerAriaLabelRunning.replace('{time}', formatTime(currentTimerSeconds)));
                if (currentTimerSeconds <= 10 && currentTimerSeconds > 0) { timerDisplay.classList.add('timer-ending'); }
                else { timerDisplay.classList.remove('timer-ending'); }
            }
            if (currentTimerSeconds <= 0) {
                stopTimer();
                if(timerDisplay) timerDisplay.classList.add('timer-ending');
                console.log("Timer reached zero!");
                const draftOrder = getDraftOrder();
                const step = getLobbyItem('currentStep', 0); // Get current step
                const currentPreviewId = getLobbyItem('previewedChampionId', null); // Get preview
                const currentPreview = currentPreviewId ? getChampionById(currentPreviewId) : null;

                if (step < draftOrder.length) {
                    const currentAction = draftOrder[step];
                    if (currentAction.type === 'pick') {
                        if (currentPreview) {
                            console.log("Timer ended during PICK phase. Auto-confirming:", currentPreview.id);
                            showStatusMessage("timerEndedPickConfirm", 3000, { name: currentPreview.name[currentLanguage] });
                            handleConfirmPickBan(); // Will use the preview stored in state implicitly
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
                        setLobbyItem('currentStep', step + 1); // Increment step
                        resetTimerDisplay();
                        updateDraftUI();
                    }
                } else { console.log("Timer ended but draft already complete?"); }
            }
        }, 1000);
    }


    // --- Draft Logic Functions (Refactored for Lobby State) ---
     function createChampionCard(champ) { /* ... (Already modified) ... */
        const card = document.createElement('button'); card.className = 'champion-card'; card.dataset.championId = champ.id; card.dataset.championNameEn = champ.name.en.toLowerCase(); card.dataset.championNameRu = champ.name.ru.toLowerCase(); card.dataset.roles = champ.roles.join(','); card.setAttribute('role', 'gridcell'); card.setAttribute('aria-label', champ.name[currentLanguage]);
        const img = document.createElement('img'); img.src = champ.iconUrl; img.alt = ""; img.className = 'w-full h-full object-cover block pointer-events-none'; img.loading = 'lazy'; img.onerror = () => { img.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%234a5568'/%3E%3C/svg%3E`; card.setAttribute('aria-label', `${champ.name[currentLanguage]} (error)`); }; card.appendChild(img);
        card.addEventListener('click', () => handleChampionPreview(champ)); card.addEventListener('mouseover', (event) => showChampionTooltip(event, champ)); card.addEventListener('mouseout', hideChampionTooltip); card.addEventListener('focus', (event) => showChampionTooltip(event, champ)); card.addEventListener('blur', hideChampionTooltip); return card;
    }
     function displayChampions() { /* ... (Already fixed) ... */
        console.log('Inside displayChampions. createChampionCard type:', typeof createChampionCard); if(!championGridElement) { console.error("displayChampions: championGridElement not found"); return; } const fragment = document.createDocumentFragment(); processedChampions.sort((a, b) => a.name[currentLanguage].localeCompare(b.name[currentLanguage], currentLanguage)); processedChampions.forEach(champ => { if (typeof createChampionCard === 'function') { fragment.appendChild(createChampionCard(champ)); } else { console.error('CRITICAL: createChampionCard is not defined or not a function when called from displayChampions!'); } }); championGridElement.innerHTML = ''; championGridElement.appendChild(fragment); filterChampions();
    }
    // --- MODIFIED: updateDraftUI reads lobby state ---
    function updateDraftUI() {
        if (!isDraftInitialized || !currentLobbyId) return;

        // Read current state for this lobby
        const step = getLobbyItem('currentStep', 0);
        const isStarted = getLobbyItem('isDraftStarted', false);
        const isComplete = getLobbyItem('isDraftComplete', false);
        const history = getLobbyItem('draftHistory', []);
        const previewId = getLobbyItem('previewedChampionId', null);
        const previewChamp = previewId ? getChampionById(previewId) : null;
        const canTogglePriority = hasPermission('togglePriorityFilter'); // Read permission once

        console.log(`DEBUG updateDraftUI (Lobby: ${currentLobbyId}): Step=${step}, Started=${isStarted}, Complete=${isComplete}, Preview=${previewId}`);

        document.querySelectorAll('.pick-slot, .ban-slot').forEach(el => { el.classList.remove('highlight-action', 'preview-flash', 'swap-selected'); });
        applyRolePermissions(currentUserRole); // Apply base role permissions first

        const draftOrder = getDraftOrder();
        let currentActionTeam = null;
        if (step < draftOrder.length) {
            currentActionTeam = draftOrder[step].team;
        }

        const canConfirm = hasPermission('confirmAction', currentActionTeam);
        if(confirmPickBanButton) confirmPickBanButton.disabled = !canConfirm || !previewChamp || !isStarted || isComplete;

        const canUndo = hasPermission('undoAction', history[history.length - 1]?.team);
        if(undoButton) undoButton.disabled = !canUndo || history.length === 0 || !isStarted;

        const canStart = hasPermission('startDraft');
        const canClear = hasPermission('clearDraft');
        const canReset = hasPermission('resetDraft');
        const canSwap = hasPermission('swapSides');
        const canToggleTimer = hasPermission('toggleTimerDuration');
        const canNext = hasPermission('nextDraft');
        const lobbySelectedChamps = new Set(getLobbyItem('selectedChampions', []));
        const lobbyGlobalHistory = getLobbyItem('globalBanHistory', []);
        const lobbyPickNicknames = getLobbyItem('pickNicknames', {});

        if (!isStarted) {
            resetTimerDisplay(); // Uses lobby state now
            if(blueColumn) blueColumn.classList.add('draft-disabled');
            if(redColumn) redColumn.classList.add('draft-disabled');
            if(nextDraftButton) nextDraftButton.disabled = !canNext || true; // Cannot go next if not complete
            if(swapButton) swapButton.disabled = !canSwap; // Can swap before start
            // Disable clear only if truly nothing to clear for this lobby
            if(clearPicksButton) clearPicksButton.disabled = !canClear || (history.length === 0 && Object.keys(lobbyPickNicknames).length === 0 && lobbySelectedChamps.size === 0 && lobbyGlobalHistory.length === 0);
            if(toggleTimerButton) toggleTimerButton.disabled = !canToggleTimer;
            if(newPriorityFilterButton) newPriorityFilterButton.disabled = !canTogglePriority;
            if(resetButton) resetButton.disabled = !canReset;
            if(timerDisplay) timerDisplay.disabled = !canStart;
            if (championGridElement) championGridElement.style.pointerEvents = 'none';
        } else if (step < draftOrder.length) { // Draft In Progress
            // isDraftComplete = false; // State handled by getLobbyItem
            const action = draftOrder[step];
            const activeSlot = document.getElementById(action.slot);
            if (activeSlot) {
                if (currentUserRole === 'admin' || currentUserRole === 'judge' || userTeamSide === currentActionTeam) {
                     activeSlot.classList.add('highlight-action');
                }
                 // Highlight preview if it matches the current slot
                 if (previewChamp && action.slot === getLobbyItem('previewedSlotId', null)) {
                     activeSlot.classList.add('preview-flash');
                 }
            }
            // Timer handling (start/stop appearance)
            const timerRunning = !!timerInterval; // Check if interval is active
            if (!timerRunning && hasPermission('startDraft')) {
                 // Timer should ideally be started/stopped based on state, not just presence of interval
                 // For now, assume startTimer handles starting if needed
                 // startTimer(); // Let startTimer be called explicitly or by other logic
            }
            if(nextDraftButton) nextDraftButton.disabled = true;
            if(timerDisplay) timerDisplay.disabled = true; // Timer running or user is team
            if(swapButton) swapButton.disabled = true;
            if(toggleTimerButton) toggleTimerButton.disabled = true;
            if(newPriorityFilterButton) newPriorityFilterButton.disabled = true; // Disable during active draft phase
            if(clearPicksButton) clearPicksButton.disabled = !canClear;
            if(resetButton) resetButton.disabled = !canReset;
            const isGridInteractive = (currentUserRole === 'admin' || userTeamSide === currentActionTeam);
            if (championGridElement) { championGridElement.style.pointerEvents = isGridInteractive ? 'auto' : 'none'; }
        } else { // Draft Complete
            // isDraftComplete = true; // State handled by getLobbyItem
            stopTimer(); // Ensure timer is stopped
            if(timerDisplay) { timerDisplay.textContent = translations[currentLanguage].timerDraftCompleteText; timerDisplay.classList.add('timer-disabled'); timerDisplay.disabled = true; timerDisplay.title = translations[currentLanguage].timerDraftCompleteTitle; }
            if(blueColumn) blueColumn.classList.remove('draft-disabled');
            if(redColumn) redColumn.classList.remove('draft-disabled');
            if(nextDraftButton) nextDraftButton.disabled = !canNext;
            if(swapButton) swapButton.disabled = !canSwap;
            if(clearPicksButton) clearPicksButton.disabled = !canClear;
            if(toggleTimerButton) toggleTimerButton.disabled = true;
            if(newPriorityFilterButton) newPriorityFilterButton.disabled = !canTogglePriority; // Re-enable after draft
            if(resetButton) resetButton.disabled = !canReset;
            if (championGridElement) championGridElement.style.pointerEvents = 'none';
        }

        updateChampionAvailability(); // Uses lobby state now
        displayGloballyBanned(); // Uses lobby state now
        document.querySelectorAll('.pick-slot').forEach(slot => {
            const champId = getSlotChampionId(slot.id); // This reads dataset, which is updated by fillSlot
            slot.style.cursor = isComplete && champId && can('swapSides') ? 'pointer' : 'default';
            slot.title = isComplete && champId && can('swapSides') ? translations[currentLanguage].swapPickSelect : '';
        });
         updateNicknameEditability();
    }
    // --- MODIFIED: updateChampionAvailability uses lobby state ---
    function updateChampionAvailability() {
        if (!isDraftInitialized || !currentLobbyId) return;
        const lobbySelectedChamps = new Set(getLobbyItem('selectedChampions', []));
        const lobbyGloballyDisabled = new Set(getLobbyItem('globallyDisabledChampions', []));
        const combinedDisabled = new Set([...lobbySelectedChamps, ...lobbyGloballyDisabled]);

        document.querySelectorAll('.champion-card').forEach(card => {
            const champId = card.dataset.championId;
            const isDisabled = combinedDisabled.has(champId);
            const isSelected = lobbySelectedChamps.has(champId); // Check against lobby's selected
            card.classList.toggle('selected', isSelected);
            card.classList.toggle('disabled', isDisabled);
            card.disabled = isDisabled;
            card.setAttribute('aria-disabled', isDisabled.toString());
        });
    }
    // --- MODIFIED: handleChampionPreview uses lobby state ---
    function handleChampionPreview(champion) {
        const isStarted = getLobbyItem('isDraftStarted', false);
        const isComplete = getLobbyItem('isDraftComplete', false);
        const step = getLobbyItem('currentStep', 0);
        const selectedSet = new Set(getLobbyItem('selectedChampions', []));
        const globallyDisabledSet = new Set(getLobbyItem('globallyDisabledChampions', []));

        if (!isStarted || isComplete) return;
        const draftOrder = getDraftOrder(); if (step >= draftOrder.length) return;
        const currentAction = draftOrder[step];
        if (currentUserRole !== 'admin' && userTeamSide !== currentAction.team) return;
        const permissionNeeded = currentAction.type === 'pick' ? 'pickChampion' : 'banChampion';
        const permKey = currentAction.type === 'pick' ? 'permDeniedPreviewPick' : 'permDeniedPreviewBan';
        if (!hasPermission(permissionNeeded, currentAction.team)) { showStatusMessage(permKey, 2000); return; }
        const isDisabled = selectedSet.has(champion.id) || globallyDisabledSet.has(champion.id);
        if (isDisabled) { showStatusMessage("championAlreadySelected", 2000, { name: champion.name[currentLanguage] }); return; }

        const slotElement = document.getElementById(currentAction.slot);
        if (slotElement) {
            document.querySelectorAll('.preview-flash').forEach(el => el.classList.remove('preview-flash'));
            setLobbyItem('previewedChampionId', champion.id); // Store ID
            setLobbyItem('previewedSlotId', currentAction.slot); // Store slot ID for potential highlight restoration
            const nicknames = getLobbyItem('pickNicknames', {});
            const existingNickname = nicknames[currentAction.slot] || '';
            fillSlot(slotElement, champion, currentAction.type, existingNickname);
            slotElement.classList.add('preview-flash');
            if(confirmPickBanButton) confirmPickBanButton.disabled = !hasPermission('confirmAction', currentAction.team);
        } else { console.warn(`Preview failed: Slot element ${currentAction.slot} not found.`); }
     }
    // --- MODIFIED: handleConfirmPickBan uses lobby state ---
    function handleConfirmPickBan() {
        console.log("handleConfirmPickBan called");
        const previewId = getLobbyItem('previewedChampionId', null);
        const isStarted = getLobbyItem('isDraftStarted', false);
        const isComplete = getLobbyItem('isDraftComplete', false);
        const step = getLobbyItem('currentStep', 0);
        let selectedSet = new Set(getLobbyItem('selectedChampions', [])); // Load as Set
        let history = getLobbyItem('draftHistory', []);
        let nicknames = getLobbyItem('pickNicknames', {});
        const globallyDisabledSet = new Set(getLobbyItem('globallyDisabledChampions', []));

        const championToConfirm = previewId ? getChampionById(previewId) : null;

        if (!championToConfirm || !isStarted || isComplete) return;
        const draftOrder = getDraftOrder(); if (step >= draftOrder.length) return;
        const currentAction = draftOrder[step];
        if ((currentUserRole !== 'admin' && userTeamSide !== currentAction.team) || !hasPermission('confirmAction', currentAction.team)) { showStatusMessage("permDeniedConfirm", 2000); return; }

        const slotElement = document.getElementById(currentAction.slot);
        const isDisabled = selectedSet.has(championToConfirm.id) || globallyDisabledSet.has(championToConfirm.id);

        if (!slotElement || isDisabled) { console.warn("Confirmation failed: Slot not found or champion unavailable."); setLobbyItem('previewedChampionId', null); setLobbyItem('previewedSlotId', null); if(confirmPickBanButton) confirmPickBanButton.disabled = true; if (slotElement) slotElement.classList.remove('preview-flash'); return; }

        console.log(`Confirming ${championToConfirm.id} for slot ${currentAction.slot} in lobby ${currentLobbyId}`);
        slotElement.classList.remove('preview-flash');
        const previousNickname = nicknames[currentAction.slot] || '';
        selectedSet.add(championToConfirm.id);
        history.push({ championId: championToConfirm.id, slotId: currentAction.slot, step: step, previousNickname: previousNickname, type: currentAction.type, team: currentAction.team });

        // Save updated state
        setLobbyItem('selectedChampions', Array.from(selectedSet)); // Save Set as Array
        setLobbyItem('draftHistory', history);
        setLobbyItem('currentStep', step + 1);
        setLobbyItem('previewedChampionId', null); // Clear preview
        setLobbyItem('previewedSlotId', null);

        resetTimerDisplay(); // Resets timer seconds in storage too
        updateDraftUI();
        filterChampions();
    }
    function fillSlot(slotElement, champion, type, nicknameText = '') { /* ... (Already modified) ... */
        if (!slotElement || !champion) return; slotElement.innerHTML = ''; slotElement.classList.remove('preview-flash'); const img = document.createElement('img'); img.alt = champion.name[currentLanguage]; img.className = 'w-full h-full object-cover block absolute inset-0 z-0 pointer-events-none'; let imageUrl; if (type === 'pick') { const isMobileView = window.innerWidth <= 768; imageUrl = isMobileView ? champion.iconUrl : champion.splashUrl; } else { imageUrl = champion.iconUrl; } img.src = imageUrl;
        img.onerror = () => { const errorSpan = document.createElement('span'); errorSpan.className = 'text-[1.5vmin] text-red-400'; errorSpan.textContent = 'Err'; slotElement.innerHTML = ''; slotElement.appendChild(errorSpan); if (type === 'pick') { addNicknameInput(slotElement, nicknameText); } }; slotElement.appendChild(img);
        if (type === 'pick') { addNicknameInput(slotElement, nicknameText); slotElement.dataset.championId = champion.id; } else { delete slotElement.dataset.championId; }
        const baseAriaLabel = slotElement.getAttribute('aria-label')?.split(':')[0] || (type === 'pick' ? `Pick ${slotElement.id.slice(-1)}` : `Ban ${slotElement.id.slice(-1)}`); slotElement.setAttribute('aria-label', `${baseAriaLabel}: ${champion.name[currentLanguage]}`);
    }
    // --- MODIFIED: addNicknameInput saves lobby state ---
    function addNicknameInput(slotElement, text = '') {
         const nicknameInput = document.createElement('div');
         nicknameInput.spellcheck = false;
         nicknameInput.className = 'nickname-input';
         nicknameInput.textContent = text || '';
         nicknameInput.dataset.slotId = slotElement.id;
         // Set placeholder via CSS attr(data-placeholder)
         const placeholderText = translations[currentLanguage]?.pickSlotNicknamePlaceholder || 'Player';
         nicknameInput.dataset.placeholder = placeholderText;

         const canEdit = hasPermission('editNicknames');
         nicknameInput.contentEditable = canEdit;
         nicknameInput.style.cursor = canEdit ? 'text' : 'default';

         if (canEdit) {
             nicknameInput.addEventListener('input', (e) => {
                 const slotId = e.target.dataset.slotId;
                 if (slotId && currentLobbyId) {
                     let nicknames = getLobbyItem('pickNicknames', {});
                     nicknames[slotId] = e.target.textContent.trim();
                     setLobbyItem('pickNicknames', nicknames);
                 }
             });
             nicknameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } });
         }
         slotElement.appendChild(nicknameInput);
     }
    // --- MODIFIED: restoreSlotPlaceholder uses lobby state ---
    function restoreSlotPlaceholder(slotElement, slotId, nicknameText = '') {
        if (!slotElement) return;
        slotElement.innerHTML = '';
        slotElement.classList.remove('preview-flash', 'swap-selected', 'highlight-action');
        delete slotElement.dataset.championId;
        slotElement.style.backgroundImage = '';
        slotElement.style.cursor = 'default';
        slotElement.title = '';
        const baseAriaLabel = slotElement.getAttribute('aria-label')?.split(':')[0] || (slotId.includes('-pick-') ? `Pick ${slotId.slice(-1)}` : `Ban ${slotId.slice(-1)}`);
        slotElement.setAttribute('aria-label', `${baseAriaLabel}: Empty`);

        if (slotId && slotId.includes('-pick-')) {
            addNicknameInput(slotElement, nicknameText); // Re-add input (placeholder handled by CSS/JS)
            // Ensure nickname state is consistent (might be redundant if called after state update)
            let nicknames = getLobbyItem('pickNicknames', {});
            nicknames[slotId] = nicknameText;
            setLobbyItem('pickNicknames', nicknames);
        } else {
            // Remove nickname from state if it's a ban slot being cleared
            let nicknames = getLobbyItem('pickNicknames', {});
            delete nicknames[slotId];
            setLobbyItem('pickNicknames', nicknames);
        }
    }
    function getSlotChampionId(slotId) { /* ... (no changes needed) ... */ const slotElement = document.getElementById(slotId); return slotElement ? slotElement.dataset.championId : null; }
    // --- MODIFIED: handleUndo uses lobby state ---
    function handleUndo() {
         console.log("handleUndo called");
         let history = getLobbyItem('draftHistory', []);
         const isStarted = getLobbyItem('isDraftStarted', false);

         if (history.length === 0 || !isStarted) return;
         const lastAction = history[history.length - 1];
         if (!hasPermission('undoAction', lastAction.team)) { showStatusMessage("permDeniedUndo", 2000); return; }

         deselectSwapSlots();
         history.pop(); // Remove last action
         if (!lastAction) return;

         console.log("Undoing action:", lastAction);
         let selectedSet = new Set(getLobbyItem('selectedChampions', []));
         selectedSet.delete(lastAction.championId); // Remove champ from selected

         const slotElement = document.getElementById(lastAction.slotId);
         if (slotElement) {
             restoreSlotPlaceholder(slotElement, lastAction.slotId, lastAction.previousNickname); // Restores UI and nickname state
         }

         // Save updated state
         setLobbyItem('draftHistory', history);
         setLobbyItem('selectedChampions', Array.from(selectedSet));
         setLobbyItem('currentStep', lastAction.step); // Revert step
         setLobbyItem('isDraftComplete', false); // Draft cannot be complete after undo
         setLobbyItem('previewedChampionId', null); // Clear preview
         setLobbyItem('previewedSlotId', null);

         resetTimerDisplay(); // Resets timer seconds in storage too
         updateDraftUI();
         filterChampions();
         showStatusMessage("actionUndone", 1500);
    }

    // --- Reset Functions (Refactored for Lobby State) ---
    function resetDraftFull(force = false) {
        console.log("resetDraftFull called, force:", force);
        if (!hasPermission('resetDraft')) { showStatusMessage("permDeniedReset", 2000); return; }
        const confirmationMessage = translations[currentLanguage].resetFullConfirmation;
        if (!force && !confirm(confirmationMessage)) { console.log("Full reset cancelled by user."); return; }

        console.log(`Resetting FULL state for lobby: ${currentLobbyId}`);
        clearLobbyState(); // Remove all lobby-specific keys from localStorage

        // Reset UI elements
        document.querySelectorAll('.pick-slot, .ban-slot').forEach((slot) => {
            restoreSlotPlaceholder(slot, slot.id, '');
            slot.classList.remove('highlight-action', 'preview-flash');
        });
        // Team names are handled separately by lobby ID prefix
        const lobbyTeam1Key = currentLobbyId + '_team1Name';
        const lobbyTeam2Key = currentLobbyId + '_team2Name';
        if (blueTeamNameH2) blueTeamNameH2.textContent = localStorage.getItem(lobbyTeam1Key) || translations[currentLanguage].blueTeamDefaultName;
        if (redTeamNameH2) redTeamNameH2.textContent = localStorage.getItem(lobbyTeam2Key) || translations[currentLanguage].redTeamDefaultName;
        if (blueScoreEl) blueScoreEl.textContent = ''; // Clear scores in UI
        if (redScoreEl) redScoreEl.textContent = '';
        if(blueColumn) blueColumn.classList.add('draft-disabled');
        if(redColumn) redColumn.classList.add('draft-disabled');
        if(championSearch) championSearch.value = '';
        // Reset filters (these might become lobby specific too eventually)
        currentRoleFilter = 'All';
        if(filterButtons) { filterButtons.forEach(btn => btn.classList.remove('active')); filterButtons[0]?.classList.add('active'); }
        isPriorityFilterActive = false;
        if (newPriorityFilterButton) { newPriorityFilterButton.setAttribute('aria-pressed', 'false'); }

        stopTimer();
        resetTimerDisplay(); // Resets timer state in storage too
        displayGloballyBanned(); // Will show empty based on cleared state
        updateChampionAvailability(); // Will show all available based on cleared state
        filterChampions();
        updateDraftUI(); // Reflects reset state
        updateUIText(currentLanguage); // Ensure static text is correct
        showStatusMessage("resetFullComplete", 2000);
    }

    function resetCurrentGamePicksBans(force = false, keepGlobal = false) {
         console.log("resetCurrentGamePicksBans called, force:", force, "keepGlobal:", keepGlobal);
         if (!hasPermission('clearDraft')) { showStatusMessage("permDeniedClear", 2000); return; }

         const isStarted = getLobbyItem('isDraftStarted', false);
         const isComplete = getLobbyItem('isDraftComplete', false);
         const globalPart = keepGlobal ? "" : translations[currentLanguage].resetCurrentGlobalPart;
         const confirmationMessage = translations[currentLanguage].resetCurrentConfirmation.replace('{global}', globalPart);

         if (!force && isStarted && !isComplete) { if (!confirm(confirmationMessage)) { console.log("resetCurrentGamePicksBans cancelled by user during draft."); return; } }
         console.log(`Resetting CURRENT GAME state for lobby: ${currentLobbyId}, KeepGlobal: ${keepGlobal}`);

        // Reset specific state items
        setLobbyItem('currentStep', 0);
        setLobbyItem('draftHistory', []);
        setLobbyItem('pickNicknames', {});
        setLobbyItem('isDraftComplete', false);
        setLobbyItem('isDraftStarted', false);
        setLobbyItem('previewedChampionId', null);
        setLobbyItem('previewedSlotId', null);
        setLobbyItem('timerSeconds', getLobbyItem('draftTimerDuration', 30)); // Reset timer

        let currentSelected = new Set(); // Start with empty set
        let currentGlobalDisabled = new Set(getLobbyItem('globallyDisabledChampions', []));
        let currentGlobalHistory = getLobbyItem('globalBanHistory', []);

        if (!keepGlobal) {
            setLobbyItem('globallyDisabledChampions', []);
            setLobbyItem('globalBanHistory', []);
            console.log("Global bans cleared for lobby.");
        } else {
            // If keeping global, re-populate selected set with only global bans
            currentGlobalDisabled.forEach(id => currentSelected.add(id));
            console.log("Keeping global bans for next draft in lobby.");
        }
        setLobbyItem('selectedChampions', Array.from(currentSelected)); // Save the potentially updated selected set

        // Reset UI
        deselectSwapSlots();
        stopTimer();
        resetTimerDisplay();
        document.querySelectorAll('.pick-slot, .ban-slot').forEach((slot) => {
            restoreSlotPlaceholder(slot, slot.id, ''); // Clear nicknames in UI and state
            slot.classList.remove('highlight-action', 'preview-flash');
        });
        if(blueColumn) blueColumn.classList.add('draft-disabled');
        if(redColumn) redColumn.classList.add('draft-disabled');

        displayGloballyBanned(); // Reads updated global history
        updateChampionAvailability(); // Reads updated selected/global sets
        filterChampions();
        updateDraftUI();
        const statusKey = keepGlobal ? "resetCurrentCompleteKeptGlobal" : "resetCurrentComplete";
        showStatusMessage(statusKey, 2000, { global: globalPart });
    }


    // --- Other Handlers (Refactored for Lobby State) ---
    function handleStartDraft() {
        console.log("handleStartDraft called");
        if (!hasPermission('startDraft')) { showStatusMessage("permDeniedStartDraft", 2000); return; }
        if (!getLobbyItem('isDraftStarted', false)) {
             console.log(`Starting draft for lobby ${currentLobbyId}...`);
             setLobbyItem('isDraftStarted', true);
             setLobbyItem('isDraftComplete', false); // Ensure complete is false
             if(blueColumn) blueColumn.classList.remove('draft-disabled');
             if(redColumn) redColumn.classList.remove('draft-disabled');
             resetTimerDisplay(); // Set timer to full duration before starting
             startTimer(); // Start the timer interval
             updateDraftUI(); // Update UI to reflect started state
         }
     }
    const debouncedFilter = debounce(() => { filterChampions(); }, 250);
    function filterChampions() { /* ... (Already modified to search both names) ... */
        if (!isDraftInitialized || !championSearch || !championGridElement) return; const searchTerm = championSearch.value.toLowerCase().trim(); let visibleCount = 0;
        // Read lobby-specific filters
        const roleFilter = getLobbyItem('currentRoleFilter', 'All');
        const priorityFilterActive = getLobbyItem('isPriorityFilterActive', false);
        const lobbySelectedChamps = new Set(getLobbyItem('selectedChampions', []));
        const lobbyGloballyDisabled = new Set(getLobbyItem('globallyDisabledChampions', []));
        const combinedDisabled = new Set([...lobbySelectedChamps, ...lobbyGloballyDisabled]);

        championGridElement.querySelectorAll('.champion-card').forEach(card => { const champId = card.dataset.championId; const nameEn = card.dataset.championNameEn || ''; const nameRu = card.dataset.championNameRu || ''; const champRoles = card.dataset.roles ? card.dataset.roles.split(',') : []; const searchMatch = nameEn.includes(searchTerm) || nameRu.includes(searchTerm) || champId.toLowerCase().includes(searchTerm); const roleMatch = roleFilter === 'All' || (champRoles.length > 0 && champRoles.includes(roleFilter)); const isPriority = priorityChampions.has(champId); const hideByPriorityFilter = priorityFilterActive && !isPriority; const isVisible = searchMatch && roleMatch && !hideByPriorityFilter; card.style.display = isVisible ? 'flex' : 'none'; if (isVisible) visibleCount++; const isDisabled = combinedDisabled.has(champId); card.classList.toggle('disabled', isDisabled); card.disabled = isDisabled; card.setAttribute('aria-disabled', isDisabled.toString()); card.classList.toggle('selected', lobbySelectedChamps.has(champId)); });
    }
    function deselectSwapSlots() { /* ... (no changes needed) ... */ if (selectedSwapSlotId) { const prevSelected = document.getElementById(selectedSwapSlotId); if (prevSelected) { prevSelected.classList.remove('swap-selected'); } selectedSwapSlotId = null; } }
    function handlePickContainerClick(event) { /* ... (uses lobby state for nicknames) ... */
         if (event.target.classList.contains('nickname-input')) { return; } if (!hasPermission('swapSides')) { return; } const clickedSlot = event.target.closest('.pick-slot');
         const isComplete = getLobbyItem('isDraftComplete', false);
         if (!isComplete || !clickedSlot || !clickedSlot.dataset.championId) { deselectSwapSlots(); return; } const clickedSlotId = clickedSlot.id;
         if (!selectedSwapSlotId) { selectedSwapSlotId = clickedSlotId; clickedSlot.classList.add('swap-selected'); } else { if (selectedSwapSlotId === clickedSlotId) { deselectSwapSlots(); } else { const firstSlot = document.getElementById(selectedSwapSlotId); if (!firstSlot) { deselectSwapSlots(); return; } const team1 = selectedSwapSlotId.startsWith('blue') ? 'blue' : 'red'; const team2 = clickedSlotId.startsWith('blue') ? 'blue' : 'red'; if (team1 === team2) { const champId1 = firstSlot.dataset.championId; const champId2 = clickedSlot.dataset.championId; const champ1 = getChampionById(champId1); const champ2 = getChampionById(champId2); let nicknames = getLobbyItem('pickNicknames', {}); const nick1 = nicknames[selectedSwapSlotId] || ''; const nick2 = nicknames[clickedSlotId] || ''; nicknames[selectedSwapSlotId] = nick2; nicknames[clickedSlotId] = nick1; setLobbyItem('pickNicknames', nicknames); if (champ1 && champ2) { fillSlot(firstSlot, champ2, 'pick', nick2); fillSlot(clickedSlot, champ1, 'pick', nick1); showStatusMessage("swapConfirm", 2000, { champ1: champ1.name[currentLanguage], champ2: champ2.name[currentLanguage] }); } deselectSwapSlots(); } else { deselectSwapSlots(); selectedSwapSlotId = clickedSlotId; clickedSlot.classList.add('swap-selected'); } } }
     }
    function handleSwapTeams() { /* ... (uses lobby state for names/scores/bans) ... */
         console.log("handleSwapTeams called"); if (!hasPermission('swapSides')) { showStatusMessage("permDeniedSwap", 2000); return; }
         try {
             // Swap Team Names (in UI and lobby-specific storage)
             const lobbyTeam1Key = currentLobbyId + '_team1Name';
             const lobbyTeam2Key = currentLobbyId + '_team2Name';
             const name1 = localStorage.getItem(lobbyTeam1Key) || translations[currentLanguage].blueTeamDefaultName;
             const name2 = localStorage.getItem(lobbyTeam2Key) || translations[currentLanguage].redTeamDefaultName;
             if(blueTeamNameH2) blueTeamNameH2.textContent = name2;
             if(redTeamNameH2) redTeamNameH2.textContent = name1;
             localStorage.setItem(lobbyTeam1Key, name2);
             localStorage.setItem(lobbyTeam2Key, name1);

             // Swap Scores (in UI and lobby-specific storage)
             const score1 = getLobbyItem('blueScore', '');
             const score2 = getLobbyItem('redScore', '');
             if(blueScoreEl) blueScoreEl.textContent = score2;
             if(redScoreEl) redScoreEl.textContent = score1;
             setLobbyItem('blueScore', score2);
             setLobbyItem('redScore', score1);

             // Swap Global Bans Team Association (in lobby-specific storage)
             let currentGlobalHistory = getLobbyItem('globalBanHistory', []);
             currentGlobalHistory.forEach(ban => { ban.team = ban.team === 'blue' ? 'red' : 'blue'; });
             setLobbyItem('globalBanHistory', currentGlobalHistory);
             displayGloballyBanned(); // Update display

             const isStarted = getLobbyItem('isDraftStarted', false);
             const isComplete = getLobbyItem('isDraftComplete', false);

             if (isComplete || !isStarted) {
                 console.log("Swapping picks/bans/nicknames...");
                 let nicknames = getLobbyItem('pickNicknames', {});
                 let history = getLobbyItem('draftHistory', []);
                 let selectedSet = new Set(getLobbyItem('selectedChampions', [])); // Load as Set

                 const newPickNicknames = {}; const newSelectedChampions = new Set();
                 const newBluePicks = []; const newRedPicks = []; const newBlueBans = []; const newRedBans = [];
                 const currentBlueBans = []; const currentRedBans = [];

                 // Collect current state based on history
                 history.forEach(action => {
                     if (action.type === 'ban') {
                         if (action.slotId.startsWith('blue')) currentBlueBans.push(action.championId);
                         else currentRedBans.push(action.championId);
                     }
                 });
                 for(let i=1; i<=5; i++) {
                      const bluePickSlotId = `blue-pick-${i}`; const redPickSlotId = `red-pick-${i}`;
                      const blueAction = history.find(a => a.slotId === bluePickSlotId);
                      const redAction = history.find(a => a.slotId === redPickSlotId);
                      const blueChampId = blueAction?.championId; const redChampId = redAction?.championId;
                      const blueNick = nicknames[bluePickSlotId] || ''; const redNick = nicknames[redPickSlotId] || '';
                      if(redChampId) newBluePicks.push({ slotId: bluePickSlotId, champId: redChampId, nick: redNick });
                      if(blueChampId) newRedPicks.push({ slotId: redPickSlotId, champId: blueChampId, nick: blueNick });
                      newPickNicknames[bluePickSlotId] = redNick; newPickNicknames[redPickSlotId] = blueNick;
                 }
                 currentRedBans.forEach((champId, index) => { if(champId) newBlueBans.push({ slotId: `blue-ban-${index+1}`, championId: champId }); });
                 currentBlueBans.forEach((champId, index) => { if(champId) newRedBans.push({ slotId: `red-ban-${index+1}`, championId: champId }); });

                 // Update state
                 setLobbyItem('pickNicknames', newPickNicknames);
                 nicknames = newPickNicknames; // Update local copy for restore

                 // Clear UI
                 document.querySelectorAll('.pick-slot, .ban-slot').forEach(slot => { restoreSlotPlaceholder(slot, slot.id, nicknames[slot.id] || ''); });

                 // Re-fill UI and update selected set
                 newBlueBans.forEach(b => { const champ = getChampionById(b.championId); if(champ) fillSlot(document.getElementById(b.slotId), champ, 'ban'); if(b.championId) newSelectedChampions.add(b.championId); });
                 newRedBans.forEach(b => { const champ = getChampionById(b.championId); if(champ) fillSlot(document.getElementById(b.slotId), champ, 'ban'); if(b.championId) newSelectedChampions.add(b.championId); });
                 newBluePicks.forEach(p => { const champ = getChampionById(p.champId); if(champ) fillSlot(document.getElementById(p.slotId), champ, 'pick', p.nick); if(p.champId) newSelectedChampions.add(p.champId); });
                 newRedPicks.forEach(p => { const champ = getChampionById(p.champId); if(champ) fillSlot(document.getElementById(p.slotId), champ, 'pick', p.nick); if(p.champId) newSelectedChampions.add(p.champId); });
                 setLobbyItem('selectedChampions', Array.from(newSelectedChampions)); // Save new selected set

                 // Rebuild history based on swapped picks/bans (optional, complex)
                 // For simplicity, we might just clear history on swap or leave it as is (representing original order)
                 // Let's clear history for now to avoid inconsistency after swap
                 setLobbyItem('draftHistory', []);
                 setLobbyItem('currentStep', 0); // Reset step if history is cleared
                 setLobbyItem('isDraftStarted', false); // Mark as not started if history cleared
                 setLobbyItem('isDraftComplete', false);


                 deselectSwapSlots();
                 showStatusMessage("swapSuccess", 2000);
             } else { console.warn("Attempted to swap teams during an active draft."); showStatusMessage("swapDuringDraftError", 3000); }
             updateChampionAvailability(); updateDraftUI();
         } catch (error) { console.error("Error in handleSwapTeams:", error); showStatusMessage("swapError", 3000); }
     }
     // --- MODIFIED: handleToggleTimer uses lobby state ---
    function handleToggleTimer() {
         console.log("handleToggleTimer called");
         if (!hasPermission('toggleTimerDuration')) { showStatusMessage("permDeniedToggleTimer", 2000); return; }
         if (getLobbyItem('isDraftStarted', false)) { return; } // Cannot change during draft
         let currentDuration = getLobbyItem('draftTimerDuration', 30);
         currentDuration = currentDuration === 30 ? 45 : 30;
         setLobbyItem('draftTimerDuration', currentDuration);
         resetTimerDisplay(); // Update display and reset timer seconds in storage
         toggleTimerButton.title = translations[currentLanguage].toggleTimerTitle; // Update title via updateUIText potentially
         showStatusMessage("timerToggled", 1500, { duration: currentDuration });
         console.log("Timer duration set to:", currentDuration);
     }
     // --- MODIFIED: handleRoleFilterClick uses lobby state ---
    function handleRoleFilterClick(event) {
         const clickedButton = event.currentTarget; if (!clickedButton || clickedButton.disabled) return;
         const role = clickedButton.dataset.role; if (!role) return;
         if (!hasPermission('useRoleFilters')) { showStatusMessage("permDeniedRoleFilter", 2000); return; }
         setLobbyItem('currentRoleFilter', role); // Save filter to lobby state
         if (filterButtons) { filterButtons.forEach(btn => { btn.classList.remove('active'); }); clickedButton.classList.add('active'); }
         filterChampions(); // Reads lobby state
     }
     // --- MODIFIED: handleNewPriorityFilterToggle uses lobby state ---
    function handleNewPriorityFilterToggle() {
        if (!hasPermission('togglePriorityFilter')) { showStatusMessage("permDeniedPriorityFilter", 2000); return; }
        let currentPriorityState = getLobbyItem('isPriorityFilterActive', false);
        currentPriorityState = !currentPriorityState;
        setLobbyItem('isPriorityFilterActive', currentPriorityState); // Save new state

        if (newPriorityFilterButton) {
            newPriorityFilterButton.setAttribute('aria-pressed', currentPriorityState.toString());
            newPriorityFilterButton.title = currentPriorityState ? translations[currentLanguage].priorityFilterShowAllTitle : translations[currentLanguage].priorityFilterShowPriorityTitle;
        }
        filterChampions(); // Reads lobby state
        showStatusMessage(currentPriorityState ? "priorityFilterOn" : "priorityFilterOff", 2000);
    }
    // --- MODIFIED: displayGloballyBanned uses lobby state ---
    function displayGloballyBanned() {
        if (!globalBansBlueContainer || !globalBansRedContainer || !globallyBannedDisplay || !currentLobbyId) return;
        globalBansBlueContainer.innerHTML = ''; globalBansRedContainer.innerHTML = '';
        const lobbyGlobalHistory = getLobbyItem('globalBanHistory', []); // Read from lobby state

        if (lobbyGlobalHistory.length > 0) {
            globallyBannedDisplay.classList.remove('hidden');
            const blueFragment = document.createDocumentFragment(); const redFragment = document.createDocumentFragment();
            lobbyGlobalHistory.forEach(banInfo => {
                const champ = getChampionById(banInfo.championId);
                if (champ) {
                    const iconDiv = document.createElement('div'); iconDiv.className = 'global-ban-icon';
                    const banTeamText = banInfo.team === 'blue' ? translations[currentLanguage].globalBanTeamBlue : translations[currentLanguage].globalBanTeamRed;
                    const titleText = translations[currentLanguage].globalBanTitle.replace('{name}', champ.name[currentLanguage]).replace('{team}', banTeamText);
                    iconDiv.title = titleText; iconDiv.setAttribute('aria-label', titleText);
                    const img = document.createElement('img'); img.src = champ.iconUrl; img.alt = ""; img.loading = 'lazy'; img.onerror = () => { img.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%234a5568'/%3E%3C/svg%3E`; }; iconDiv.appendChild(img);
                    if (banInfo.team === 'blue') { blueFragment.appendChild(iconDiv); } else { redFragment.appendChild(iconDiv); }
                }
            });
            globalBansBlueContainer.appendChild(blueFragment); globalBansRedContainer.appendChild(redFragment);
        } else {
            globallyBannedDisplay.classList.add('hidden');
        }
    }
    // --- MODIFIED: handleNextDraft uses lobby state ---
    function handleNextDraft() {
         console.log("handleNextDraft called");
         if (!hasPermission('nextDraft')) { showStatusMessage("permDeniedNextDraft", 2000); return; }
         if (!getLobbyItem('isDraftComplete', false)) { showStatusMessage("nextDraftErrorNotComplete", 3000); return; }

         let history = getLobbyItem('draftHistory', []);
         let currentGlobalDisabled = new Set(getLobbyItem('globallyDisabledChampions', []));
         let currentGlobalHistory = getLobbyItem('globalBanHistory', []);
         let addedBansCount = 0;

         history.forEach(action => {
             if (action.type === 'pick' && !currentGlobalDisabled.has(action.championId)) {
                 currentGlobalHistory.push({ championId: action.championId, team: action.team });
                 currentGlobalDisabled.add(action.championId);
                 addedBansCount++;
             }
         });

         setLobbyItem('globallyDisabledChampions', Array.from(currentGlobalDisabled));
         setLobbyItem('globalBanHistory', currentGlobalHistory);

         console.log(`handleNextDraft (Lobby ${currentLobbyId}): Added ${addedBansCount} champions to global bans.`);
         resetCurrentGamePicksBans(false, true); // Keep global bans for this lobby
         showStatusMessage("nextDraftComplete", 2500);
    }
    function getDraftOrder() { /* ... (no changes needed) ... */ return [ { team: 'blue', type: 'ban', slot: 'blue-ban-1' }, { team: 'red', type: 'ban', slot: 'red-ban-1' }, { team: 'blue', type: 'ban', slot: 'blue-ban-2' }, { team: 'red', type: 'ban', slot: 'red-ban-2' }, { team: 'blue', type: 'ban', slot: 'blue-ban-3' }, { team: 'red', type: 'ban', slot: 'red-ban-3' }, { team: 'blue', type: 'pick', slot: 'blue-pick-1' }, { team: 'red', type: 'pick', slot: 'red-pick-1' }, { team: 'red', type: 'pick', slot: 'red-pick-2' }, { team: 'blue', type: 'pick', slot: 'blue-pick-2' }, { team: 'blue', type: 'pick', slot: 'blue-pick-3' }, { team: 'red', type: 'pick', slot: 'red-pick-3' }, { team: 'red', type: 'ban', slot: 'red-ban-4' }, { team: 'blue', type: 'ban', slot: 'blue-ban-4' }, { team: 'red', type: 'ban', slot: 'red-ban-5' }, { team: 'blue', type: 'ban', slot: 'blue-ban-5' }, { team: 'red', type: 'pick', slot: 'red-pick-4' }, { team: 'blue', type: 'pick', slot: 'blue-pick-4' }, { team: 'blue', type: 'pick', slot: 'blue-pick-5' }, { team: 'red', type: 'pick', slot: 'red-pick-5' }, ]; }

    // --- Tooltip Functions (Draft Specific) ---
    let tooltipTimeout;
    function showChampionTooltip(event, champion) { /* ... (Already modified) ... */
        clearTimeout(tooltipTimeout); tooltipTimeout = setTimeout(() => { if (!championTooltip || !champion) return; championTooltip.innerHTML = `<strong class="tooltip-title">${champion.name[currentLanguage]}</strong><span class="tooltip-name">${champion.title[currentLanguage]}</span>`; championTooltip.style.visibility = 'hidden'; championTooltip.style.display = 'block'; const tooltipRect = championTooltip.getBoundingClientRect(); championTooltip.style.visibility = ''; championTooltip.style.display = ''; const rect = event.target.getBoundingClientRect(); let top = rect.top - tooltipRect.height - 8; let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2); if (top < 0) top = rect.bottom + 8; if (left < 0) left = 5; else if (left + tooltipRect.width > window.innerWidth) left = window.innerWidth - tooltipRect.width - 5; championTooltip.style.left = `${left}px`; championTooltip.style.top = `${top}px`; championTooltip.classList.add('visible'); }, 100);
    }
    function hideChampionTooltip() { /* ... (no changes needed) ... */ clearTimeout(tooltipTimeout); if (championTooltip) { championTooltip.classList.remove('visible'); } }

    // --- Initial App Setup ---
     applyTheme(currentTheme);
     document.documentElement.lang = currentLanguage; // Set initial HTML lang
     updateUIText(currentLanguage); // Set initial UI text

     const params = getParamsFromHash(); // Get params on initial load
     if (params) {
         // Set state needed before navigating
         currentUserRole = params.role;
         currentLobbyId = params.lobbyId;
         navigateTo('draft');
     } else {
         navigateTo('home');
     }

     // --- MODIFIED: hashchange listener uses getParamsFromHash ---
     window.addEventListener('hashchange', () => {
         console.log("Hash changed:", window.location.hash);
         const newParams = getParamsFromHash();

         if (newParams) {
             // Navigate to draft if lobby/role is new or different from current page context
             if (currentPage !== 'draft' || newParams.lobbyId !== currentLobbyId || newParams.role !== currentUserRole) {
                 // Update state *before* navigating
                 currentUserRole = newParams.role;
                 currentLobbyId = newParams.lobbyId;
                 isDraftInitialized = false; // Force re-initialization for the new lobby context
                 navigateTo('draft');
             }
         } else if (currentPage !== 'home') {
             // If hash is removed or invalid, go home
             navigateTo('home');
         }
     });
     // --- END MODIFIED hashchange listener ---

}); // End DOMContentLoaded
