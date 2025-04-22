// script.js - Воссозданная версия с комментариями
// Цель: Чистый, структурированный код, готовый к будущей интеграции с бэкендом (согласно ТЗ).
// Текущая версия: Полностью клиентская, использует localStorage для состояния.

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Fully Loaded. Initializing App...");

    // --- Глобальные константы и переменные ---

    // Переводы (структура сохранена, для краткости сами тексты опущены, но они должны быть здесь)
    const translations = {
        ru: {
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
            adminButton: "Админ",
            themeToggleLight: "Переключить на светлую тему",
            themeToggleDark: "Переключить на темную тему",
            languageToggleButton: "EN",
            blueTeamDefaultName: "Синяя Команда",
            redTeamDefaultName: "Красная Команда",
            timerStartDraftTitle: "Начать драфт",
            timerDraftRunningTitle: "Драфт идет...",
            timerDraftCompleteText: "Драфт Завершен!",
            timerDraftCompleteTitle: "Драфт завершен",
            timerAriaLabelStart: "Таймер / Старт драфта",
            timerAriaLabelRunning: "Таймер: {time}",
            searchPlaceholder: "Поиск...",
            searchAriaLabel: "Поиск чемпиона",
            clearPicksTitle: "Очистить пики/баны текущей игры",
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
            blueBanAriaLabel: "Синий бан {n}",
            redBanAriaLabel: "Красный бан {n}",
            bluePickAriaLabel: "Синий пик {n}",
            redPickAriaLabel: "Красный пик {n}",
            championGridAriaLabel: "Сетка выбора чемпионов",
            pickSlotNicknamePlaceholder: "Игрок",
            globalBanTitle: "{name} (Заблокирован {team} в пред. игре)",
            globalBanTeamBlue: "синими",
            globalBanTeamRed: "красными",
            loadingChampions: "Загрузка данных чемпионов...",
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
            resetCurrentConfirmation: "Остановить текущий драфт и очистить пики/баны этой игры?",
            resetCurrentGameKeptInfo: "Пики/баны текущей игры очищены (ники/глоб. баны сохранены).",
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
            adminButton: "Admin",
            themeToggleLight: "Switch to Light Theme",
            themeToggleDark: "Switch to Dark Theme",
            languageToggleButton: "RU",
            blueTeamDefaultName: "Blue Team",
            redTeamDefaultName: "Red Team",
            timerStartDraftTitle: "Start Draft",
            timerDraftRunningTitle: "Draft in progress...",
            timerDraftCompleteText: "Draft Complete!",
            timerDraftCompleteTitle: "Draft complete",
            timerAriaLabelStart: "Timer / Start Draft",
            timerAriaLabelRunning: "Timer: {time}",
            searchPlaceholder: "Search...",
            searchAriaLabel: "Search champion",
            clearPicksTitle: "Clear picks/bans for the current game",
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
            blueBanAriaLabel: "Blue Ban {n}",
            redBanAriaLabel: "Red Ban {n}",
            bluePickAriaLabel: "Blue Pick {n}",
            redPickAriaLabel: "Red Pick {n}",
            championGridAriaLabel: "Champion Selection Grid",
            pickSlotNicknamePlaceholder: "Player",
            globalBanTitle: "{name} (Banned by {team} in previous game)",
            globalBanTeamBlue: "Blue",
            globalBanTeamRed: "Red",
            loadingChampions: "Loading champion data...",
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
            resetCurrentConfirmation: "Stop the current draft and clear this game's picks/bans?",
            resetCurrentGameKeptInfo: "Current game picks/bans cleared (nicknames/global bans kept).",
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

    // Карта разрешений для разных ролей
    const permissions = {
        admin: { editTeamName: true, editScore: true, clearDraft: true, resetDraft: true, startDraft: true, toggleTimerDuration: true, swapSides: true, editNicknames: true, togglePriorityFilter: true, nextDraft: true, pickChampion: true, banChampion: true, undoAction: true, confirmAction: true, useRoleFilters: true, returnHome: true },
        judge: { editTeamName: true, editScore: true, clearDraft: true, resetDraft: true, startDraft: true, toggleTimerDuration: true, swapSides: true, editNicknames: true, togglePriorityFilter: true, nextDraft: true, pickChampion: false, banChampion: false, undoAction: false, confirmAction: false, useRoleFilters: false, returnHome: true },
        team1: { editTeamName: false, editScore: false, clearDraft: false, resetDraft: false, startDraft: false, toggleTimerDuration: false, swapSides: false, editNicknames: false, togglePriorityFilter: false, nextDraft: false, pickChampion: true, banChampion: true, undoAction: true, confirmAction: true, useRoleFilters: true, returnHome: true },
        team2: { editTeamName: false, editScore: false, clearDraft: false, resetDraft: false, startDraft: false, toggleTimerDuration: false, swapSides: false, editNicknames: false, togglePriorityFilter: false, nextDraft: false, pickChampion: true, banChampion: true, undoAction: true, confirmAction: true, useRoleFilters: true, returnHome: true },
        spectator: { editTeamName: false, editScore: false, clearDraft: false, resetDraft: false, startDraft: false, toggleTimerDuration: false, swapSides: false, editNicknames: false, togglePriorityFilter: false, nextDraft: false, pickChampion: false, banChampion: false, undoAction: false, confirmAction: false, useRoleFilters: false, returnHome: true },
        default: { editTeamName: false, editScore: false, clearDraft: false, resetDraft: false, startDraft: false, toggleTimerDuration: false, swapSides: false, editNicknames: false, togglePriorityFilter: false, nextDraft: false, pickChampion: false, banChampion: false, undoAction: false, confirmAction: false, useRoleFilters: false, returnHome: true }
    };

    // Список приоритетных чемпионов
    const priorityChampions = new Set(['Aatrox', 'Ahri', 'Akali', 'Akshan', 'Alistar', 'Amumu', 'Annie', 'Ashe', 'AurelionSol', 'Blitzcrank', 'Brand', 'Braum', 'Caitlyn', 'Camille', 'Corki', 'Darius', 'Diana', 'DrMundo', 'Draven', 'Ekko', 'Evelynn', 'Ezreal', 'Fiddlesticks', 'Fiora', 'Fizz', 'Galio', 'Garen', 'Gnar', 'Gragas', 'Graves', 'Gwen', 'Hecarim', 'Heimerdinger', 'Irelia', 'Janna', 'JarvanIV', 'Jax', 'Jayce', 'Jhin', 'Jinx', 'Kaisa', 'Kalista', 'Karma', 'Kassadin', 'Katarina', 'Kayle', 'Kayn', 'Kennen', 'Khazix', 'Kindred', 'LeeSin', 'Leona', 'Lillia', 'Lissandra', 'Lucian', 'Lulu', 'Lux', 'Malphite', 'Maokai', 'MasterYi', 'Milio', 'MissFortune', 'Mordekaiser', 'Morgana', 'Nami', 'Nasus', 'Nautilus', 'Nilah', 'Nunu', 'Olaf', 'Orianna', 'Ornn', 'Pantheon', 'Poppy', 'Pyke', 'Rakan', 'Rammus', 'Renekton', 'Rengar', 'Riven', 'Rumble', 'Samira', 'Senna', 'Seraphine', 'Sett', 'Shen', 'Shyvana', 'Singed', 'Sion', 'Sivir', 'Sona', 'Soraka', 'Swain', 'Syndra', 'Talon', 'Teemo', 'Thresh', 'Tristana', 'Tryndamere', 'TwistedFate', 'Twitch', 'Urgot', 'Varus', 'Vayne', 'Veigar', 'Vex', 'Vi', 'Viego', 'Viktor', 'Vladimir', 'Volibear', 'Warwick', 'MonkeyKing', 'Xayah', 'XinZhao', 'Yasuo', 'Yone', 'Yuumi', 'Zac', 'Zed', 'Zeri', 'Ziggs', 'Zoe', 'Zyra', 'Ryze', 'Nocturne', 'Zilean', 'Renata', 'Belveth', 'Naafiri', 'Briar', 'Hwei', 'Smolder']);

    // Ссылки на DOM элементы
    const appContainer = document.getElementById('app-container');
    const homePage = document.getElementById('homePage');
    const draftPage = document.getElementById('draftPage');
    const adminButton = document.getElementById('adminButton');
    const themeToggleButton = document.getElementById('themeToggleButton');
    const languageToggleButton = document.getElementById('languageToggleButton');
    const statusMessage = document.getElementById('statusMessage');
    const championTooltip = document.getElementById('championTooltip');

    // Элементы домашней страницы
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

    // Элементы страницы драфта (инициализируются в checkDraftElements)
    let loadingIndicator, mainLayout, championGridElement, startButton, resetButton, undoButton, timerDisplay, championSearch, bluePicksContainer, redPicksContainer, blueColumn, redColumn, swapButton, clearPicksButton, toggleTimerButton, filterButtons, confirmPickBanButton, newPriorityFilterButton, nextDraftButton, globallyBannedDisplay, globalBansBlueContainer, globalBansRedContainer, blueTeamNameH2, redTeamNameH2, blueScoreEl, redScoreEl, returnHomeButton, roleFilterButtonsContainer;

    // --- Переменные состояния приложения ---
    let currentLanguage = localStorage.getItem('language') || 'ru';
    let currentTheme = localStorage.getItem('theme') || 'dark';
    let currentPage = 'home';
    let isDraftInitialized = false;
    let currentUserRole = null;
    let userTeamSide = null;
    let currentLobbyId = null;
    let statusTimeout = null;
    let timerInterval = null;
    let selectedSwapSlotId = null;

    // Глобальные данные о чемпионах
    let allChampionsData = { en: null, ru: null };
    let processedChampions = [];
    let ddragonVersion = 'latest';
    let baseIconUrl = '';
    let baseSplashUrl = '';

    // Состояние драфта по умолчанию (ключи используются для localStorage)
    const defaultLobbyState = {
        currentStep: 0, selectedChampions: [], draftHistory: [], pickNicknames: {},
        isDraftComplete: false, isDraftStarted: false, globallyDisabledChampions: [],
        globalBanHistory: [], timerSeconds: 30, draftTimerDuration: 30, blueScore: '',
        redScore: '', currentRoleFilter: 'All', isPriorityFilterActive: false,
        previewedChampionId: null, previewedSlotId: null
    };

    // --- Вспомогательные функции ---
    const debounce = (func, wait) => { let timeout; return function executedFunction(...args) { const later = () => { clearTimeout(timeout); func(...args); }; clearTimeout(timeout); timeout = setTimeout(later, wait); }; };
    const showStatusMessage = (key, duration = 3000, replacements = {}) => { if (!statusMessage) { console.warn("Status message element not found!"); return; } let message = translations[currentLanguage]?.[key] || key; for (const placeholder in replacements) { message = message.replace(`{${placeholder}}`, replacements[placeholder]); } statusMessage.textContent = message; statusMessage.classList.add('visible'); clearTimeout(statusTimeout); statusTimeout = setTimeout(() => { statusMessage.classList.remove('visible'); }, duration); };
    const getChampionById = (id) => processedChampions.find(champ => champ.id === id);
    function generateLobbyId(length = 6) { const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; let result = ''; for (let i = 0; i < length; i++) { result += characters.charAt(Math.floor(Math.random() * characters.length)); } return result; }
    async function copyToClipboard(text) { if (!navigator.clipboard) { try { const textArea = document.createElement("textarea"); textArea.value = text; textArea.style.position = "fixed"; document.body.appendChild(textArea); textArea.focus(); textArea.select(); document.execCommand('copy'); document.body.removeChild(textArea); showStatusMessage("linkCopiedFallbackMsg", 1500); } catch (err) { console.error('Fallback copy failed:', err); showStatusMessage("copyErrorMsg", 2000); } return; } try { await navigator.clipboard.writeText(text); showStatusMessage("linkCopiedMsg", 1500); } catch (err) { console.error('Async clipboard copy failed:', err); showStatusMessage("copyErrorMsg", 2000); } }

    // --- Функции для работы с localStorage ---
    function getLobbyStorageKey(key) { if (!currentLobbyId) { console.error("Attempted to get storage key without a currentLobbyId"); return null; } return `lobby_${currentLobbyId}_${key}`; }
    function getLobbyItem(key, defaultValue) { const storageKey = getLobbyStorageKey(key); if (!storageKey) { console.warn(`getLobbyItem called without valid lobbyId for key "${key}"`); return defaultValue; } try { const item = localStorage.getItem(storageKey); const value = item != null ? JSON.parse(item) : defaultValue; if (defaultValue instanceof Set && Array.isArray(value)) { return new Set(value); } return value; } catch (e) { console.error(`Error parsing localStorage item "${storageKey}":`, e); return defaultValue; } }
    function setLobbyItem(key, value) { const storageKey = getLobbyStorageKey(key); if (!storageKey) { console.warn(`setLobbyItem called without valid lobbyId for key "${key}"`); return; } try { let valueToStore = value; if (value instanceof Set) { valueToStore = Array.from(value); } localStorage.setItem(storageKey, JSON.stringify(valueToStore)); } catch (e) { console.error(`Error setting localStorage item "${storageKey}":`, e); showStatusMessage(translations[currentLanguage]?.copyErrorMsg || "Ошибка сохранения состояния!", 5000); } }
    function removeLobbyItem(key) { const storageKey = getLobbyStorageKey(key); if (!storageKey) return; localStorage.removeItem(storageKey); }
    function clearLobbyState() { if (!currentLobbyId) return; console.log(`Clearing state for lobby: ${currentLobbyId}`); for (const key in defaultLobbyState) { removeLobbyItem(key); } if (currentLobbyId !== 'admin_view') { localStorage.removeItem(`${currentLobbyId}_team1Name`); localStorage.removeItem(`${currentLobbyId}_team2Name`); } console.log(`Lobby state cleared for ${currentLobbyId}`); }

    // --- Управление Темами ---
    function applyTheme(theme) { console.log(`Applying theme: ${theme}`); document.documentElement.setAttribute('data-theme', theme); if (themeToggleButton) { themeToggleButton.textContent = theme === 'dark' ? '🌙' : '☀️'; const key = theme === 'dark' ? 'themeToggleLight' : 'themeToggleDark'; themeToggleButton.title = translations[currentLanguage]?.[key] || key; } else { console.warn("applyTheme: themeToggleButton not found."); } }
    function toggleTheme() { console.log("Toggling theme..."); currentTheme = currentTheme === 'dark' ? 'light' : 'dark'; localStorage.setItem('theme', currentTheme); applyTheme(currentTheme); updateUIText(currentLanguage); }

    // --- Управление Языком ---
    function updateUIText(lang) { console.log(`Updating UI text to: ${lang}`); const langTranslations = translations[lang] || translations.en; document.querySelectorAll('[data-lang-key]').forEach(el => { const key = el.dataset.langKey; const target = el.dataset.langTarget || 'textContent'; let translation = langTranslations[key]; if (translation === undefined) { console.warn(`Missing translation for key "${key}" in language "${lang}"`); const fallbackLang = lang === 'ru' ? 'en' : 'ru'; translation = translations[fallbackLang]?.[key] || key; } if (target === 'aria-label' && el.dataset.ariaValue && typeof translation === 'string') { translation = translation.replace(/{\w+}/g, el.dataset.ariaValue); } switch (target) { case 'textContent': const hasDirectText = Array.from(el.childNodes).some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ''); if (hasDirectText || el.children.length === 0 || ['STRONG', 'SPAN'].includes(el.tagName)) { el.textContent = translation; } else if (el.querySelector(`span[data-lang-key="${key}"]`)) { const span = el.querySelector(`span[data-lang-key="${key}"]`); if (span) span.textContent = translation; } break; case 'placeholder': el.placeholder = translation; break; case 'title': el.title = translation; break; case 'aria-label': el.setAttribute('aria-label', translation); break; default: el.setAttribute(target, translation); break; } }); const nicknamePlaceholderText = langTranslations.pickSlotNicknamePlaceholder || 'Player'; document.querySelectorAll('.nickname-input').forEach(input => { input.dataset.placeholder = nicknamePlaceholderText; }); if (languageToggleButton) { languageToggleButton.textContent = langTranslations.languageToggleButton || (lang === 'ru' ? 'EN' : 'RU'); } if (themeToggleButton) { const themeKey = currentTheme === 'dark' ? 'themeToggleLight' : 'themeToggleDark'; themeToggleButton.title = langTranslations[themeKey] || themeKey; } if (newPriorityFilterButton) { const priorityKey = getLobbyItem('isPriorityFilterActive', false) ? 'priorityFilterShowAllTitle' : 'priorityFilterShowPriorityTitle'; newPriorityFilterButton.title = langTranslations[priorityKey] || priorityKey; } if (timerDisplay && !getLobbyItem('isDraftStarted', false)) { timerDisplay.title = langTranslations.timerStartDraftTitle || 'Start Draft'; timerDisplay.setAttribute('aria-label', langTranslations.timerAriaLabelStart || 'Timer / Start Draft'); } if (isDraftInitialized) { if (processedChampions.length > 0) { processedChampions.sort((a, b) => a.name[currentLanguage].localeCompare(b.name[currentLanguage], currentLanguage)); displayChampions(); } updateDraftUI(); } console.log("UI text update complete."); }
    function toggleLanguage() { currentLanguage = (currentLanguage === 'ru') ? 'en' : 'ru'; localStorage.setItem('language', currentLanguage); console.log(`Language switched to: ${currentLanguage}`); document.documentElement.lang = currentLanguage; updateUIText(currentLanguage); }

    // --- Навигация и Роутинг ---
    function getParamsFromHash() { const hash = window.location.hash.substring(1); const params = new URLSearchParams(hash); const lobbyId = params.get('lobby'); const role = params.get('role'); if (lobbyId && role && permissions[role] && role !== 'admin') { return { lobbyId, role }; } return null; }

    /**
     * Переключает отображение между страницами 'home' и 'draft'.
     * Инициализирует страницу драфта при необходимости.
     * @param {'home' | 'draft'} pageName - Имя страницы для отображения.
     */
    function navigateTo(pageName) {
        console.log(`Navigating to: ${pageName}`);
        currentPage = pageName;

        // Скрываем все страницы
        if (homePage) homePage.classList.add('hidden');
        if (draftPage) draftPage.classList.add('hidden');
        // Кнопки админа, темы, языка всегда видимы (убрано скрытие/показ)

        if (pageName === 'home') {
            if (homePage) homePage.classList.remove('hidden');

            // Если перешли на главную, сбрасываем хэш и состояние лобби/роли
            if (window.location.hash) {
                currentUserRole = null;
                userTeamSide = null;
                currentLobbyId = null;
                isDraftInitialized = false;
                history.pushState("", document.title, window.location.pathname + window.location.search);
            }
            updateUIText(currentLanguage);
        }
        else if (pageName === 'draft') {
            if (draftPage) draftPage.classList.remove('hidden');

            const params = getParamsFromHash();

            if (params) {
                console.log(`Draft Navigation - Lobby: ${params.lobbyId}, Role: ${params.role}`);
                currentLobbyId = params.lobbyId;
                currentUserRole = params.role;
                if (currentUserRole === 'team1') userTeamSide = 'blue';
                else if (currentUserRole === 'team2') userTeamSide = 'red';
                else userTeamSide = null;
            } else if (currentUserRole === 'admin' && currentLobbyId === 'admin_view') {
                console.log("Navigating as Admin to admin_view");
            } else {
                console.error("Cannot navigate to draft: Missing or invalid lobbyId/role in hash.");
                showStatusMessage("errorInitCritical", 5000, { error: "Invalid lobby link." });
                navigateTo('home');
                return;
            }

            // Инициализируем страницу драфта, если она еще не была инициализирована
            // ИЛИ если ID лобби изменился (для случая admin_view -> lobby_id)
            // ИЛИ если элементы еще не найдены (на всякий случай)
            if (!isDraftInitialized || currentLobbyId !== getLobbyItem('lastInitializedLobbyId', null) || !checkDraftElements()) {
                console.log(`Initializing draft simulator for lobby ${currentLobbyId}...`);
                // Сохраняем ID лобби, для которого идет инициализация
                setLobbyItem('lastInitializedLobbyId', currentLobbyId);
                initializeAppDraft(); // Асинхронная функция
            } else {
                // Если драфт уже инициализирован для этого лобби
                console.log(`Draft already initialized for lobby ${currentLobbyId}, re-applying settings for role: ${currentUserRole}`);
                // Применяем права доступа для текущей роли
                applyRolePermissions(currentUserRole); // Функция будет добавлена позже
                // Загружаем имена команд из localStorage
                const lobbyTeam1Key = `${currentLobbyId}_team1Name`;
                const lobbyTeam2Key = `${currentLobbyId}_team2Name`;
                if (blueTeamNameH2) blueTeamNameH2.textContent = localStorage.getItem(lobbyTeam1Key) || translations[currentLanguage].blueTeamDefaultName;
                if (redTeamNameH2) redTeamNameH2.textContent = localStorage.getItem(lobbyTeam2Key) || translations[currentLanguage].redTeamDefaultName;
                // Восстанавливаем состояние драфта из localStorage
                restoreDraftStateFromStorage(); // Функция будет добавлена позже
                updateUIText(currentLanguage); // Обновляем тексты
                updateDraftUI(); // Обновляем интерфейс драфта (будет добавлена позже)
            }
        }
    }

    // --- Логика Домашней страницы ---
    function handleCreateLobby() { console.log("handleCreateLobby called"); const lobbyId = generateLobbyId(); console.log("Generated Lobby ID:", lobbyId); const team1Name = team1NameInput.value.trim() || translations[currentLanguage].blueTeamDefaultName; const team2Name = team2NameInput.value.trim() || translations[currentLanguage].redTeamDefaultName; localStorage.setItem(`${lobbyId}_team1Name`, team1Name); localStorage.setItem(`${lobbyId}_team2Name`, team2Name); const baseUrl = window.location.origin + window.location.pathname; const judgeLink = `${baseUrl}#lobby=${lobbyId}&role=judge`; const team1Link = `${baseUrl}#lobby=${lobbyId}&role=team1`; const team2Link = `${baseUrl}#lobby=${lobbyId}&role=team2`; if (judgeLinkText) judgeLinkText.textContent = judgeLink; if (team1LinkText) team1LinkText.textContent = team1Link; if (team2LinkText) team2LinkText.textContent = team2Link; if (openJudgeLinkButton) openJudgeLinkButton.href = judgeLink; if (openTeam1LinkButton) openTeam1LinkButton.href = team1Link; if (openTeam2LinkButton) openTeam2LinkButton.href = team2Link; if (lobbyLinksDisplay) lobbyLinksDisplay.classList.remove('hidden'); showStatusMessage("lobbyCreatedMsg", 3000); }
    function handleAdminClick() { console.log("Admin button clicked."); currentUserRole = 'admin'; userTeamSide = null; currentLobbyId = 'admin_view'; isDraftInitialized = false; navigateTo('draft'); }

    // --- Добавление Слушателей Событий ---
    if (themeToggleButton) { themeToggleButton.addEventListener('click', toggleTheme); } else { console.warn("Theme toggle button not found!"); }
    if (languageToggleButton) { languageToggleButton.addEventListener('click', toggleLanguage); } else { console.warn("Language toggle button not found!"); }
    if (adminButton) { adminButton.addEventListener('click', handleAdminClick); } else { console.warn("Admin Button not found!"); }
    if (createLobbyButton) { createLobbyButton.addEventListener('click', handleCreateLobby); } else { console.warn("Create Lobby Button not found"); }
    document.querySelectorAll('.copy-button').forEach(button => { if (button.tagName === 'BUTTON' && button.dataset.linkId) { button.addEventListener('click', (event) => { const linkId = event.target.dataset.linkId; const linkSpan = document.getElementById(linkId); if (linkSpan) { copyToClipboard(linkSpan.textContent); } else { console.warn("Copy link span not found for id:", linkId); } }); } });

    // --- Инициализация и Управление страницей Драфта ---

    /**
     * Асинхронно инициализирует страницу драфта.
     * Загружает данные, настраивает UI, восстанавливает состояние.
     */
    async function initializeAppDraft() {
        console.log(`initializeAppDraft started for lobby: ${currentLobbyId}`);
        isDraftInitialized = false; // Сбрасываем флаг на время инициализации

        // Показываем индикатор загрузки
        if (loadingIndicator) loadingIndicator.classList.remove('hidden');
        if (mainLayout) mainLayout.classList.add('hidden'); // Скрываем основной макет на время загрузки

        try {
            if (!currentUserRole || !currentLobbyId) {
                throw new Error(`Invalid state: Role (${currentUserRole}) or Lobby ID (${currentLobbyId}) not set.`);
            }
            console.log(`Initializing draft with Role: ${currentUserRole}, Lobby: ${currentLobbyId}`);

            // Проверяем наличие DOM-элементов страницы драфта
            if (!checkDraftElements()) {
                throw new Error("One or more draft page elements were not found during initialization!");
            }
            console.log("All draft elements found.");

            // Обновляем тексты (например, текст индикатора загрузки)
            updateUIText(currentLanguage);

            // Загружаем данные чемпионов (если еще не загружены)
            // В реальном приложении здесь будет fetch
            if (processedChampions.length === 0) {
                const dataLoaded = await loadChampionData(); // Функция будет добавлена позже
                if (!dataLoaded) {
                    throw new Error("Failed to load champion data.");
                }
            }

            // --- Инициализация UI после загрузки данных ---
            console.log("Champion data loaded/verified. Initializing UI...");

            // Отображаем чемпионов в сетке
            displayChampions(); // Функция будет добавлена позже

            // Восстанавливаем состояние драфта из localStorage
            restoreDraftStateFromStorage(); // Функция будет добавлена позже

            // Устанавливаем имена команд
            const lobbyTeam1Key = `${currentLobbyId}_team1Name`;
            const lobbyTeam2Key = `${currentLobbyId}_team2Name`;
            if (blueTeamNameH2) blueTeamNameH2.textContent = localStorage.getItem(lobbyTeam1Key) || translations[currentLanguage].blueTeamDefaultName;
            if (redTeamNameH2) redTeamNameH2.textContent = localStorage.getItem(lobbyTeam2Key) || translations[currentLanguage].redTeamDefaultName;

            // Применяем права доступа для роли
            applyRolePermissions(currentUserRole); // Функция будет добавлена позже

            // Добавляем слушатели событий к элементам управления драфтом
            addDraftEventListeners(); // Функция будет добавлена позже

            // Обновляем весь UI драфта (состояния кнопок, подсветка и т.д.)
            updateDraftUI(); // Функция будет добавлена позже

            // Скрываем индикатор загрузки и показываем основной макет
            if (loadingIndicator) loadingIndicator.classList.add('hidden');
            if (mainLayout) mainLayout.classList.remove('hidden');

            // Устанавливаем флаг успешной инициализации
            isDraftInitialized = true;
            console.log(`Draft simulator page initialized successfully for lobby ${currentLobbyId}, role: ${currentUserRole}`);

        } catch (error) {
            console.error(`Error during initializeAppDraft for lobby ${currentLobbyId}:`, error);
            showStatusMessage("errorInitCritical", 10000, { error: error.message });
            if (loadingIndicator) {
                loadingIndicator.textContent = `Ошибка инициализации! ${error.message}`;
                // Не скрываем индикатор, чтобы показать ошибку
            }
            if (mainLayout) mainLayout.classList.add('hidden'); // Скрываем макет при ошибке
            // Можно перенаправить на главную или оставить сообщение об ошибке
            // navigateTo('home');
        }
    }

    /**
     * Проверяет наличие основных элементов страницы драфта и инициализирует переменные.
     * @returns {boolean} - true, если все основные элементы найдены, иначе false.
     */
    function checkDraftElements() {
        // Эта функция теперь вызывается внутри initializeAppDraft,
        // поэтому можно считать, что элементы уже найдены, если она вызвана оттуда.
        // Но для надежности оставим проверку.
        console.log("Checking draft elements...");
        loadingIndicator = document.getElementById('loadingIndicator');
        mainLayout = document.getElementById('mainLayout');
        championGridElement = document.getElementById('championGrid');
        timerDisplay = document.getElementById('timerDisplay');
        resetButton = document.getElementById('resetButton');
        undoButton = document.getElementById('undoButton');
        championSearch = document.getElementById('championSearch');
        blueColumn = document.querySelector('.blue-column');
        redColumn = document.querySelector('.red-column');
        swapButton = document.getElementById('swapButton');
        clearPicksButton = document.getElementById('clearPicksButton');
        toggleTimerButton = document.getElementById('toggleTimerButton');
        roleFilterButtonsContainer = document.getElementById('roleFilterButtons');
        filterButtons = roleFilterButtonsContainer ? roleFilterButtonsContainer.querySelectorAll('.filter-button') : null;
        confirmPickBanButton = document.getElementById('confirmPickBanButton');
        newPriorityFilterButton = document.getElementById('newPriorityFilterButton');
        nextDraftButton = document.getElementById('nextDraftButton');
        returnHomeButton = document.getElementById('returnHomeButton');
        blueTeamNameH2 = document.getElementById('blue-team-name-h2');
        redTeamNameH2 = document.getElementById('red-team-name-h2');
        blueScoreEl = document.getElementById('blue-score');
        redScoreEl = document.getElementById('red-score');
        globalBansBlueContainer = document.getElementById('global-bans-blue');
        globalBansRedContainer = document.getElementById('global-bans-red');
        globallyBannedDisplay = document.getElementById('globallyBannedDisplay');

        const elementsToCheck = [
            loadingIndicator, mainLayout, championGridElement, timerDisplay, resetButton, undoButton,
            championSearch, blueColumn, redColumn, swapButton, clearPicksButton, toggleTimerButton,
            roleFilterButtonsContainer, confirmPickBanButton, newPriorityFilterButton, nextDraftButton,
            returnHomeButton, blueTeamNameH2, redTeamNameH2, blueScoreEl, redScoreEl, statusMessage,
            championTooltip, globalBansBlueContainer, globalBansRedContainer, globallyBannedDisplay
        ];

        if (!filterButtons || filterButtons.length === 0) {
            console.warn("Role filter buttons NodeList is empty or null!");
            // Не считаем критической ошибкой для базовой работы
        }

        const missingElements = elementsToCheck.filter(el => !el);
        if (missingElements.length > 0) {
            const missingIds = elementsToCheck
                .map((el, index) => {
                    if (!el) {
                        // Попробуем угадать ID по порядку для лога
                        const expectedIds = [
                            'loadingIndicator', 'mainLayout', 'championGrid', 'timerDisplay', 'resetButton', 'undoButton',
                            'championSearch', '.blue-column', '.red-column', 'swapButton', 'clearPicksButton', 'toggleTimerButton',
                            'roleFilterButtons', 'confirmPickBanButton', 'newPriorityFilterButton', 'nextDraftButton',
                            'returnHomeButton', 'blue-team-name-h2', 'red-team-name-h2', 'blue-score', 'red-score', 'statusMessage',
                            'championTooltip', 'global-bans-blue', 'global-bans-red', 'globallyBannedDisplay'
                        ];
                        return `Missing element (expected: ${expectedIds[index] || 'unknown'})`;
                    }
                    return null;
                })
                .filter(id => id !== null);
            console.error("Missing critical draft elements during check:", missingIds);
            return false; // Элементы не найдены
        }
        console.log("All critical draft elements found.");
        return true; // Все на месте
    }

    // --- Заглушки для функций, которые будут реализованы позже ---
    async function loadChampionData() { console.warn("loadChampionData() not implemented yet."); return true; /* Заглушка */ }
    function displayChampions() { console.warn("displayChampions() not implemented yet."); }
    function restoreDraftStateFromStorage() { console.warn("restoreDraftStateFromStorage() not implemented yet."); }
    function applyRolePermissions(role) { console.warn("applyRolePermissions() not implemented yet.", role); }
    function addDraftEventListeners() { console.warn("addDraftEventListeners() not implemented yet."); }
    function updateDraftUI() { console.warn("updateDraftUI() not implemented yet."); }


    // --- Инициализация Роутинга при загрузке ---
    const initialParams = getParamsFromHash();
    if (initialParams) {
        navigateTo('draft');
    } else {
        navigateTo('home');
    }

    // --- Слушатель изменения хэша URL ---
    window.addEventListener('hashchange', () => {
        console.log("Hash changed:", window.location.hash);
        const newParams = getParamsFromHash();

        if (newParams) {
            if (currentPage !== 'draft' || newParams.lobbyId !== currentLobbyId || newParams.role !== currentUserRole) {
                isDraftInitialized = false; // Сбрасываем флаг при смене лобби/роли
                navigateTo('draft');
            }
        } else if (currentPage !== 'home') {
            navigateTo('home');
        }
    });

    console.log("Initial setup complete. Application is running.");

}); // Конец DOMContentLoaded
