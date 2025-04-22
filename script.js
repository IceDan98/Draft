// script.js - Полная версия (Исправлено)
// Цель: Чистый, структурированный код, готовый к будущей интеграции с бэкендом.
// Текущая версия: Полностью клиентская, использует localStorage для состояния.

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Fully Loaded. Initializing App (Complete Version)...");

    // --- Глобальные константы и переменные ---

    // Переводы (структура сохранена)
    const translations = {
        ru: {
            homeTitle: "LoL and Wild Rift Drafter", team1Placeholder: "Команда 1", team2Placeholder: "Команда 2",
            createLobbyButton: "Создать Лобби", lobbyJudgeLabel: "Судья:", lobbyTeam1Label: "Команда 1:",
            lobbyTeam2Label: "Команда 2:", copyButton: "Копировать", openButton: "Открыть",
            lobbyCreatedMsg: "Лобби создано! Скопируйте или откройте ссылки.", linkCopiedMsg: "Ссылка скопирована!",
            linkCopiedFallbackMsg: "Ссылка скопирована (fallback)", copyErrorMsg: "Ошибка копирования",
            adminButton: "Админ", themeToggleLight: "Переключить на светлую тему", themeToggleDark: "Переключить на темную тему",
            languageToggleButton: "EN", blueTeamDefaultName: "Синяя Команда", redTeamDefaultName: "Красная Команда",
            timerStartDraftTitle: "Начать драфт", timerDraftRunningTitle: "Драфт идет...",
            timerDraftCompleteText: "Драфт Завершен!", timerDraftCompleteTitle: "Драфт завершен",
            timerAriaLabelStart: "Таймер / Старт драфта", timerAriaLabelRunning: "Таймер: {time}",
            searchPlaceholder: "Поиск...", searchAriaLabel: "Поиск чемпиона",
            clearPicksTitle: "Очистить пики/баны текущей игры", clearPicksAriaLabel: "Очистить пики/баны текущей игры",
            resetTitle: "Полный сброс", resetAriaLabel: "Полный сброс",
            confirmPickBanTitle: "Подтвердить выбор/бан", confirmPickBanAriaLabel: "Подтвердить выбор/бан",
            roleFilterGroupAriaLabel: "Фильтр по ролям", roleFilterAllTitle: "Фильтр: Все", roleFilterAllText: "ВСЕ",
            roleFilterTopTitle: "Фильтр: Топ", roleFilterTopText: "ТОП", roleFilterJungleTitle: "Фильтр: Лес",
            roleFilterJungleText: "ЛЕС", roleFilterMidTitle: "Фильтр: Мид", roleFilterMidText: "МИД",
            roleFilterADCTitle: "Фильтр: АДК", roleFilterADCText: "АДК", roleFilterSupportTitle: "Фильтр: Поддержка",
            roleFilterSupportText: "САП", priorityFilterShowPriorityTitle: "Показать только приоритетных чемпионов",
            priorityFilterShowAllTitle: "Показать всех чемпионов", priorityFilterAriaLabel: "Переключить фильтр приоритетных чемпионов",
            nextDraftTitle: "Следующий драфт (Fearless)", nextDraftAriaLabel: "Следующий драфт (Fearless)",
            swapTeamsTitle: "Поменять команды местами", swapTeamsAriaLabel: "Поменять команды местами",
            toggleTimerTitle: "Сменить время таймера (30/45с)", toggleTimerAriaLabel: "Сменить время таймера",
            undoTitle: "Отменить действие", undoAriaLabel: "Отменить действие",
            returnHomeTitle: "Вернуться на главную", returnHomeAriaLabel: "Вернуться на главную",
            blueBanAriaLabel: "Синий бан {n}", redBanAriaLabel: "Красный бан {n}", bluePickAriaLabel: "Синий пик {n}",
            redPickAriaLabel: "Красный пик {n}", championGridAriaLabel: "Сетка выбора чемпионов",
            pickSlotNicknamePlaceholder: "Игрок", globalBanTitle: "{name} (Заблокирован {team} в пред. игре)",
            globalBanTeamBlue: "синими", globalBanTeamRed: "красными", loadingChampions: "Загрузка данных чемпионов...",
            errorLoadingVersions: "Ошибка загрузки версий: {status}", errorLoadingDataEN: "Ошибка загрузки данных EN: {status}",
            errorLoadingDataRU: "Не удалось загрузить данные RU: {status}. Используются английские имена.",
            errorLoadingChampions: "Ошибка загрузки данных чемпионов: {error}", errorInitCritical: "Критическая ошибка инициализации: {error}",
            errorInitDraftElements: "Ошибка UI: Элементы драфта не найдены.", championAlreadySelected: "{name} уже выбран или заблокирован.",
            actionUndone: "Действие отменено", resetFullConfirmation: "Вы уверены, что хотите полностью сбросить драфт (включая глобальные баны)?",
            resetFullComplete: "Драфт полностью сброшен.", resetCurrentConfirmation: "Остановить текущий драфт и очистить пики/баны этой игры?",
            resetCurrentGameKeptInfo: "Пики/баны текущей игры очищены (ники/глоб. баны сохранены).",
            resetCurrentComplete: "Пики/баны текущей игры{global} очищены.", resetCurrentCompleteKeptGlobal: "Текущая игра очищена.",
            swapSuccess: "Команды поменялись местами (пики/баны/ники/глоб. баны).",
            swapDuringDraftError: "Нельзя менять пики/баны во время драфта. Сменены только имена/счет/глоб. баны.",
            swapError: "Ошибка при смене команд.", timerToggled: "Время таймера: {duration} сек.",
            priorityFilterOn: "Показаны только приоритетные чемпионы.", priorityFilterOff: "Показаны все чемпионы.",
            nextDraftComplete: "Переход к следующему драфту. Пики предыдущей игры заблокированы.",
            nextDraftErrorNotComplete: "Драфт не завершен. Завершите его перед переходом к следующему.",
            timerEndedPickConfirm: "Время вышло! Авто-подтверждение: {name}", timerEndedPickClear: "Время вышло! Пик не выбран. Драфт очищен.",
            timerEndedBanSkip: "Время вышло! Бан пропущен.", swapPickSelect: "Нажмите для выбора обмена",
            swapConfirm: "Обмен: {champ1} <-> {champ2}", permDeniedReset: "Нет прав для сброса драфта.",
            permDeniedClear: "Нет прав для очистки драфта.", permDeniedUndo: "Нет прав для отмены этого действия.",
            permDeniedSwap: "Нет прав для смены сторон.", permDeniedToggleTimer: "Нет прав для смены таймера.",
            permDeniedPriorityFilter: "Нет прав для переключения приоритета.", permDeniedNextDraft: "Нет прав для перехода к следующему драфту.",
            permDeniedStartDraft: "Нет прав для старта драфта.", permDeniedPreviewPick: "Нет прав на выбор чемпиона.",
            permDeniedPreviewBan: "Нет прав на бан чемпиона.", permDeniedConfirm: "Нет прав на подтверждение действия.",
            permDeniedRoleFilter: "Нет прав на использование фильтров ролей.", permDeniedEditName: "Нет прав на изменение имени команды.",
            permDeniedEditScore: "Нет прав на изменение счета.", permDeniedEditNickname: "Нет прав на изменение никнейма.",
        },
        en: { /* ... английские переводы ... */
             homeTitle: "LoL and Wild Rift Drafter", team1Placeholder: "Team 1 Name", team2Placeholder: "Team 2 Name",
             createLobbyButton: "Create Lobby", lobbyJudgeLabel: "Judge:", lobbyTeam1Label: "Team 1:",
             lobbyTeam2Label: "Team 2:", copyButton: "Copy", openButton: "Open",
             lobbyCreatedMsg: "Lobby created! Copy or open the links.", linkCopiedMsg: "Link copied!",
             linkCopiedFallbackMsg: "Link copied (fallback)", copyErrorMsg: "Copy failed",
             adminButton: "Admin", themeToggleLight: "Switch to Light Theme", themeToggleDark: "Switch to Dark Theme",
             languageToggleButton: "RU", blueTeamDefaultName: "Blue Team", redTeamDefaultName: "Red Team",
             timerStartDraftTitle: "Start Draft", timerDraftRunningTitle: "Draft in progress...",
             timerDraftCompleteText: "Draft Complete!", timerDraftCompleteTitle: "Draft complete",
             timerAriaLabelStart: "Timer / Start Draft", timerAriaLabelRunning: "Timer: {time}",
             searchPlaceholder: "Search...", searchAriaLabel: "Search champion",
             clearPicksTitle: "Clear picks/bans for the current game", clearPicksAriaLabel: "Clear picks/bans for the current game",
             resetTitle: "Full Reset", resetAriaLabel: "Full Reset",
             confirmPickBanTitle: "Confirm Pick/Ban", confirmPickBanAriaLabel: "Confirm Pick/Ban",
             roleFilterGroupAriaLabel: "Filter by role", roleFilterAllTitle: "Filter: All", roleFilterAllText: "ALL",
             roleFilterTopTitle: "Filter: Top", roleFilterTopText: "TOP", roleFilterJungleTitle: "Filter: Jungle",
             roleFilterJungleText: "JGL", roleFilterMidTitle: "Filter: Mid", roleFilterMidText: "MID",
             roleFilterADCTitle: "Filter: ADC", roleFilterADCText: "ADC", roleFilterSupportTitle: "Filter: Support",
             roleFilterSupportText: "SUP", priorityFilterShowPriorityTitle: "Show only priority champions",
             priorityFilterShowAllTitle: "Show all champions", priorityFilterAriaLabel: "Toggle priority champion filter",
             nextDraftTitle: "Next Draft (Fearless)", nextDraftAriaLabel: "Next Draft (Fearless)",
             swapTeamsTitle: "Swap Teams", swapTeamsAriaLabel: "Swap Teams",
             toggleTimerTitle: "Change Timer Duration (30/45s)", toggleTimerAriaLabel: "Change Timer Duration",
             undoTitle: "Undo Action", undoAriaLabel: "Undo Action",
             returnHomeTitle: "Return to Home", returnHomeAriaLabel: "Return to Home",
             blueBanAriaLabel: "Blue Ban {n}", redBanAriaLabel: "Red Ban {n}", bluePickAriaLabel: "Blue Pick {n}",
             redPickAriaLabel: "Red Pick {n}", championGridAriaLabel: "Champion Selection Grid",
             pickSlotNicknamePlaceholder: "Player", globalBanTitle: "{name} (Banned by {team} in previous game)",
             globalBanTeamBlue: "Blue", globalBanTeamRed: "Red", loadingChampions: "Loading champion data...",
             errorLoadingVersions: "Error loading versions: {status}", errorLoadingDataEN: "Error loading EN data: {status}",
             errorLoadingDataRU: "Failed to load RU data: {status}. Using English names.",
             errorLoadingChampions: "Error loading champion data: {error}", errorInitCritical: "Critical initialization error: {error}",
             errorInitDraftElements: "UI Error: Draft elements not found.", championAlreadySelected: "{name} is already selected or banned.",
             actionUndone: "Action undone", resetFullConfirmation: "Are you sure you want to fully reset the draft (including global bans)?",
             resetFullComplete: "Draft fully reset.", resetCurrentConfirmation: "Stop the current draft and clear this game's picks/bans?",
             resetCurrentGameKeptInfo: "Current game picks/bans cleared (nicknames/global bans kept).",
             resetCurrentComplete: "Current game's picks/bans{global} cleared.", resetCurrentCompleteKeptGlobal: "Current game cleared.",
             swapSuccess: "Teams swapped (picks/bans/nicknames/global bans).",
             swapDuringDraftError: "Cannot swap picks/bans during an active draft. Only names/scores/global bans swapped.",
             swapError: "Error swapping teams.", timerToggled: "Timer duration: {duration} sec.",
             priorityFilterOn: "Showing only priority champions.", priorityFilterOff: "Showing all champions.",
             nextDraftComplete: "Moving to the next draft. Previous game's picks are banned.",
             nextDraftErrorNotComplete: "Draft is not complete. Finish it before proceeding to the next one.",
             timerEndedPickConfirm: "Time ran out! Auto-confirming: {name}", timerEndedPickClear: "Time ran out! Pick not selected. Draft cleared.",
             timerEndedBanSkip: "Time ran out! Ban skipped.", swapPickSelect: "Click to select for swap",
             swapConfirm: "Swapped: {champ1} <-> {champ2}", permDeniedReset: "No permission to reset draft.",
             permDeniedClear: "No permission to clear draft.", permDeniedUndo: "No permission to undo this action.",
             permDeniedSwap: "No permission to swap sides.", permDeniedToggleTimer: "No permission to change timer.",
             permDeniedPriorityFilter: "No permission to toggle priority.", permDeniedNextDraft: "No permission to proceed to next draft.",
             permDeniedStartDraft: "No permission to start draft.", permDeniedPreviewPick: "No permission to pick champion.",
             permDeniedPreviewBan: "No permission to ban champion.", permDeniedConfirm: "No permission to confirm action.",
             permDeniedRoleFilter: "No permission to use role filters.", permDeniedEditName: "No permission to edit team name.",
             permDeniedEditScore: "No permission to edit score.", permDeniedEditNickname: "No permission to edit nickname.",
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

    // Карта ролей чемпионов
    const championRolesMap = {
        'Aatrox': ['Top'], 'Ahri': ['Mid'], 'Akali': ['Mid', 'Top'], 'Akshan': ['Mid', 'Top'], 'Alistar': ['Support'], 'Amumu': ['Jungle', 'Support'], 'Anivia': ['Mid'], 'Annie': ['Mid', 'Support'], 'Aphelios': ['ADC'], 'Ashe': ['ADC', 'Support'], 'AurelionSol': ['Mid'], 'Azir': ['Mid'], 'Bard': ['Support'], 'Belveth': ['Jungle'], 'Blitzcrank': ['Support'], 'Brand': ['Support', 'Mid', 'Jungle'], 'Braum': ['Support'], 'Briar': ['Jungle'], 'Caitlyn': ['ADC'], 'Camille': ['Top'], 'Cassiopeia': ['Top', 'Mid'], 'Chogath': ['Top', 'Mid'], 'Corki': ['Mid', 'ADC'], 'Darius': ['Top', 'Jungle'], 'Diana': ['Jungle', 'Mid'], 'DrMundo': ['Top', 'Jungle'], 'Draven': ['ADC'], 'Ekko': ['Jungle', 'Mid'], 'Elise': ['Jungle'], 'Evelynn': ['Jungle'], 'Ezreal': ['ADC'], 'Fiddlesticks': ['Jungle'], 'Fiora': ['Top'], 'Fizz': ['Mid'], 'Galio': ['Mid', 'Support'], 'Gangplank': ['Top'], 'Garen': ['Top'], 'Gnar': ['Top'], 'Gragas': ['Jungle', 'Top', 'Mid', 'Support'], 'Graves': ['Jungle'], 'Gwen': ['Top', 'Jungle'], 'Hecarim': ['Jungle'], 'Heimerdinger': ['Top', 'Mid', 'Support'], 'Hwei': ['Mid', 'Support'], 'Illaoi': ['Top'], 'Irelia': ['Top', 'Mid'], 'Ivern': ['Jungle', 'Support'], 'Janna': ['Support'], 'JarvanIV': ['Jungle'], 'Jax': ['Top', 'Jungle'], 'Jayce': ['Top', 'Mid'], 'Jhin': ['ADC'], 'Jinx': ['ADC'], 'Kaisa': ['ADC'], 'Kalista': ['ADC'], 'Karma': ['Support', 'Mid'], 'Karthus': ['Jungle', 'Mid'], 'Kassadin': ['Mid'], 'Katarina': ['Mid'], 'Kayle': ['Top', 'Mid'], 'Kayn': ['Jungle'], 'Kennen': ['Top', 'Mid'], 'Khazix': ['Jungle'], 'Kindred': ['Jungle'], 'Kled': ['Top', 'Mid'], 'KogMaw': ['ADC'], 'KSante': ['Top'], 'Leblanc': ['Mid'], 'LeeSin': ['Jungle'], 'Leona': ['Support'], 'Lillia': ['Jungle'], 'Lissandra': ['Mid'], 'Lucian': ['ADC'], 'Lulu': ['Support'], 'Lux': ['Mid', 'Support'], 'Malphite': ['Top', 'Support', 'Mid'], 'Malzahar': ['Mid'], 'Maokai': ['Jungle', 'Support'], 'MasterYi': ['Jungle'], 'Milio': ['Support'], 'MissFortune': ['ADC'], 'Mordekaiser': ['Top', 'Jungle'], 'Morgana': ['Support', 'Mid', 'Jungle'], 'Naafiri': ['Jungle', 'Mid'], 'Nami': ['Support'], 'Nasus': ['Top'], 'Nautilus': ['Support'], 'Neeko': ['Mid', 'Support'], 'Nidalee': ['Jungle'], 'Nilah': ['ADC'], 'Nocturne': ['Jungle'], 'Nunu': ['Jungle'], 'Olaf': ['Top', 'Jungle'], 'Orianna': ['Mid'], 'Ornn': ['Top'], 'Pantheon': ['Top', 'Mid', 'Support', 'Jungle'], 'Poppy': ['Top', 'Jungle', 'Support'], 'Pyke': ['Support', 'Mid'], 'Qiyana': ['Jungle', 'Mid'], 'Quinn': ['Top', 'Mid'], 'Rakan': ['Support'], 'Rammus': ['Jungle'], 'RekSai': ['Jungle'], 'Rell': ['Support', 'Jungle'], 'Renata': ['Support'], 'Renekton': ['Top'], 'Rengar': ['Jungle', 'Top'], 'Riven': ['Top'], 'Rumble': ['Top', 'Mid', 'Jungle'], 'Ryze': ['Top', 'Mid'], 'Samira': ['ADC'], 'Sejuani': ['Jungle'], 'Senna': ['Support', 'ADC'], 'Seraphine': ['Support', 'Mid', 'ADC'], 'Sett': ['Top', 'Support'], 'Shaco': ['Jungle', 'Support'], 'Shen': ['Top', 'Support'], 'Shyvana': ['Jungle'], 'Singed': ['Top'], 'Sion': ['Top', 'Mid'], 'Sivir': ['ADC'], 'Skarner': ['Jungle', 'Top'], 'Smolder': ['ADC', 'Mid'], 'Sona': ['Support'], 'Soraka': ['Support'], 'Swain': ['Support', 'Mid', 'ADC'], 'Sylas': ['Mid', 'Jungle'], 'Syndra': ['Mid'], 'TahmKench': ['Top', 'Support'], 'Taliyah': ['Jungle', 'Mid'], 'Talon': ['Jungle', 'Mid'], 'Taric': ['Support'], 'Teemo': ['Top'], 'Thresh': ['Support'], 'Tristana': ['ADC', 'Mid'], 'Trundle': ['Top', 'Jungle'], 'Tryndamere': ['Top'], 'TwistedFate': ['Mid', 'ADC'], 'Twitch': ['ADC', 'Jungle'], 'Udyr': ['Jungle', 'Top'], 'Urgot': ['Top'], 'Varus': ['ADC', 'Mid'], 'Vayne': ['ADC', 'Top'], 'Veigar': ['Mid', 'ADC', 'Support'], 'Velkoz': ['Mid', 'Support'], 'Vex': ['Mid'], 'Vi': ['Jungle'], 'Viego': ['Jungle'], 'Viktor': ['Mid'], 'Vladimir': ['Top', 'Mid'], 'Volibear': ['Top', 'Jungle'], 'Warwick': ['Jungle', 'Top'], 'MonkeyKing': ['Top', 'Jungle'], 'Xayah': ['ADC'], 'Xerath': ['Mid', 'Support'], 'XinZhao': ['Jungle'], 'Yasuo': ['Mid', 'Top', 'ADC'], 'Yone': ['Top', 'Mid'], 'Yorick': ['Top', 'Jungle'], 'Yuumi': ['Support'], 'Zac': ['Jungle'], 'Zed': ['Mid', 'Jungle'], 'Zeri': ['ADC'], 'Ziggs': ['Mid', 'ADC', 'Support'], 'Zilean': ['Support', 'Mid'], 'Zoe': ['Mid', 'Support'], 'Zyra': ['Support', 'Jungle', 'Mid']
    };

    // Ссылки на DOM элементы (основные)
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

    // Элементы страницы драфта (будут инициализированы позже)
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
    let tooltipTimeout = null;

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
    function isAdminOrJudge() { return currentUserRole === 'admin' || currentUserRole === 'judge'; }

    // --- Функции для работы с localStorage ---
    function getLobbyStorageKey(key) { if (!currentLobbyId) { /* console.error("Attempted to get storage key without a currentLobbyId"); */ return null; } return `lobby_${currentLobbyId}_${key}`; }
    function getLobbyItem(key, defaultValue) { const storageKey = getLobbyStorageKey(key); if (!storageKey) { /* console.warn(`getLobbyItem called without valid lobbyId for key "${key}"`); */ return defaultValue; } try { const item = localStorage.getItem(storageKey); const value = item != null ? JSON.parse(item) : defaultValue; if (defaultValue instanceof Set && Array.isArray(value)) { return new Set(value); } return value; } catch (e) { console.error(`Error parsing localStorage item "${storageKey}":`, e); return defaultValue; } }
    function setLobbyItem(key, value) { const storageKey = getLobbyStorageKey(key); if (!storageKey) { /* console.warn(`setLobbyItem called without valid lobbyId for key "${key}"`); */ return; } try { let valueToStore = value; if (value instanceof Set) { valueToStore = Array.from(value); } localStorage.setItem(storageKey, JSON.stringify(valueToStore)); } catch (e) { console.error(`Error setting localStorage item "${storageKey}":`, e); showStatusMessage(translations[currentLanguage]?.copyErrorMsg || "Ошибка сохранения состояния!", 5000); } }
    function removeLobbyItem(key) { const storageKey = getLobbyStorageKey(key); if (!storageKey) return; localStorage.removeItem(storageKey); }
    function clearLobbyState() { if (!currentLobbyId) return; console.log(`Clearing state for lobby: ${currentLobbyId}`); for (const key in defaultLobbyState) { removeLobbyItem(key); } if (currentLobbyId !== 'admin_view') { localStorage.removeItem(`${currentLobbyId}_team1Name`); localStorage.removeItem(`${currentLobbyId}_team2Name`); } console.log(`Lobby state cleared for ${currentLobbyId}`); }

    // --- Управление Темами ---
    function applyTheme(theme) { console.log(`Applying theme: ${theme}`); document.documentElement.setAttribute('data-theme', theme); if (themeToggleButton) { themeToggleButton.textContent = theme === 'dark' ? '🌙' : '☀️'; const key = theme === 'dark' ? 'themeToggleLight' : 'themeToggleDark'; themeToggleButton.title = translations[currentLanguage]?.[key] || key; } else { console.warn("applyTheme: themeToggleButton not found."); } }
    function toggleTheme() { console.log("Toggling theme..."); currentTheme = currentTheme === 'dark' ? 'light' : 'dark'; localStorage.setItem('theme', currentTheme); applyTheme(currentTheme); updateUIText(currentLanguage); }

    // --- Управление Языком ---
    // ИСПРАВЛЕННАЯ ВЕРСИЯ updateUIText
    function updateUIText(lang) {
        console.log(`Updating UI text to: ${lang}`);
        const langTranslations = translations[lang] || translations.en; // Fallback to English

        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.dataset.langKey;
            const targetAttr = el.dataset.langTarget; // Атрибут для обновления (placeholder, title, aria-label)
            let translation = langTranslations[key];

            // Fallback на другой язык или сам ключ
            if (translation === undefined) {
                console.warn(`Missing translation for key "${key}" in language "${lang}"`);
                const fallbackLang = lang === 'ru' ? 'en' : 'ru';
                translation = translations[fallbackLang]?.[key] || key;
            }

            // Обработка плейсхолдеров в aria-label
            if (targetAttr === 'aria-label' && el.dataset.ariaValue && typeof translation === 'string') {
                translation = translation.replace(/{\w+}/g, el.dataset.ariaValue);
            }

            // Обновляем атрибут или textContent
            if (targetAttr) {
                // Обновляем указанный атрибут
                if (targetAttr === 'textContent') {
                    // Обновляем textContent только если элемент может содержать текст
                    // или если это span внутри кнопки фильтра
                    if (el.children.length === 0 || ['STRONG', 'SPAN', 'BUTTON'].includes(el.tagName) || el.querySelector(`span[data-lang-key="${key}"]`)) {
                         const targetSpan = el.querySelector(`span[data-lang-key="${key}"]`);
                         if(targetSpan) {
                             targetSpan.textContent = translation;
                         } else {
                             el.textContent = translation;
                         }
                    } else {
                         // console.warn(`Skipping textContent update for container element with key "${key}"`);
                    }
                } else {
                    el.setAttribute(targetAttr, translation);
                }
            } else {
                // По умолчанию обновляем textContent, если элемент может содержать текст
                // и не является INPUT или другим элементом, где это нежелательно
                if (el.children.length === 0 && !['INPUT', 'TEXTAREA'].includes(el.tagName)) {
                    el.textContent = translation;
                } else if (el.tagName === 'BUTTON' && !el.querySelector('span')) {
                    // Для простых кнопок без span внутри
                    el.textContent = translation;
                } else {
                    // console.warn(`Skipping default textContent update for element:`, el);
                }
            }
        });

        // Обновляем плейсхолдеры для никнеймов
        const nicknamePlaceholderText = langTranslations.pickSlotNicknamePlaceholder || 'Player';
        document.querySelectorAll('.nickname-input').forEach(input => {
            input.dataset.placeholder = nicknamePlaceholderText;
        });

        // Обновляем текст кнопки переключения языка
        if (languageToggleButton) {
            languageToggleButton.textContent = langTranslations.languageToggleButton || (lang === 'ru' ? 'EN' : 'RU');
        }
        // Обновляем title кнопки темы
        if (themeToggleButton) {
            const themeKey = currentTheme === 'dark' ? 'themeToggleLight' : 'themeToggleDark';
            themeToggleButton.title = langTranslations[themeKey] || themeKey;
        }
        // Обновляем title кнопки фильтра приоритета (если она уже инициализирована)
        if (isDraftInitialized && newPriorityFilterButton) {
            const priorityKey = getLobbyItem('isPriorityFilterActive', false) ? 'priorityFilterShowAllTitle' : 'priorityFilterShowPriorityTitle';
            newPriorityFilterButton.title = langTranslations[priorityKey] || priorityKey;
        }
        // Обновляем title и aria-label таймера в состоянии "готов к старту"
        if (isDraftInitialized && timerDisplay && !getLobbyItem('isDraftStarted', false)) {
             timerDisplay.title = langTranslations.timerStartDraftTitle || 'Start Draft';
             timerDisplay.setAttribute('aria-label', langTranslations.timerAriaLabelStart || 'Timer / Start Draft');
        }

        // Если страница драфта инициализирована, обновляем отображение чемпионов и UI драфта
        if (isDraftInitialized) {
             if (processedChampions.length > 0) {
                 processedChampions.sort((a, b) => a.name[currentLanguage].localeCompare(b.name[currentLanguage], currentLanguage));
                 displayChampions(); // Defined below
             }
             updateDraftUI(); // Defined below
        }

        console.log("UI text update complete.");
    }
    function toggleLanguage() { currentLanguage = (currentLanguage === 'ru') ? 'en' : 'ru'; localStorage.setItem('language', currentLanguage); console.log(`Language switched to: ${currentLanguage}`); document.documentElement.lang = currentLanguage; updateUIText(currentLanguage); }

    // --- Навигация и Роутинг ---
    function getParamsFromHash() { const hash = window.location.hash.substring(1); const params = new URLSearchParams(hash); const lobbyId = params.get('lobby'); const role = params.get('role'); if (lobbyId && role && permissions[role] && role !== 'admin') { return { lobbyId, role }; } return null; }
    function navigateTo(pageName) {
        console.log(`Navigating to: ${pageName}`);
        currentPage = pageName;

        if (homePage) homePage.classList.add('hidden');
        if (draftPage) draftPage.classList.add('hidden');

        if (pageName === 'home') {
            if (homePage) homePage.classList.remove('hidden');
            if (window.location.hash) {
                currentUserRole = null; userTeamSide = null; currentLobbyId = null; isDraftInitialized = false;
                history.pushState("", document.title, window.location.pathname + window.location.search);
            }
            updateUIText(currentLanguage); // Обновляем текст на главной
        } else if (pageName === 'draft') {
            if (draftPage) draftPage.classList.remove('hidden');
            const params = getParamsFromHash();

            if (params) {
                console.log(`Draft Navigation - Lobby: ${params.lobbyId}, Role: ${params.role}`);
                currentLobbyId = params.lobbyId; currentUserRole = params.role;
                if (currentUserRole === 'team1') userTeamSide = 'blue'; else if (currentUserRole === 'team2') userTeamSide = 'red'; else userTeamSide = null;
            } else if (currentUserRole === 'admin' && currentLobbyId === 'admin_view') {
                console.log("Navigating as Admin to admin_view");
            } else {
                console.error("Cannot navigate to draft: Missing or invalid lobbyId/role in hash.");
                showStatusMessage("errorInitCritical", 5000, { error: "Invalid lobby link." });
                navigateTo('home'); return;
            }

            // Инициализация драфта
            if (!isDraftInitialized || currentLobbyId !== getLobbyItem('lastInitializedLobbyId', null)) {
                 console.log(`Need to initialize draft for lobby ${currentLobbyId}...`);
                 setLobbyItem('lastInitializedLobbyId', currentLobbyId);
                 initializeAppDraft(); // Defined below
            } else {
                 console.log(`Draft already initialized for lobby ${currentLobbyId}, re-applying settings for role: ${currentUserRole}`);
                 if(checkDraftElements()){ // Defined below
                    applyRolePermissions(currentUserRole); // Defined below
                    const lobbyTeam1Key = `${currentLobbyId}_team1Name`;
                    const lobbyTeam2Key = `${currentLobbyId}_team2Name`;
                    if (blueTeamNameH2) blueTeamNameH2.textContent = localStorage.getItem(lobbyTeam1Key) || translations[currentLanguage].blueTeamDefaultName;
                    if (redTeamNameH2) redTeamNameH2.textContent = localStorage.getItem(lobbyTeam2Key) || translations[currentLanguage].redTeamDefaultName;
                    restoreDraftStateFromStorage(); // Defined below
                    updateUIText(currentLanguage);
                    updateDraftUI(); // Defined below
                 } else {
                    console.error("Draft elements missing on re-navigation!");
                    navigateTo('home');
                 }
            }
        }
    }

    // --- Логика Домашней страницы ---
    function handleCreateLobby() {
        console.log("handleCreateLobby called");
        if (!team1NameInput || !team2NameInput || !judgeLinkText || !team1LinkText || !team2LinkText || !lobbyLinksDisplay) {
             console.error("Cannot create lobby: One or more home page elements are missing.");
             return;
        }
        const lobbyId = generateLobbyId();
        console.log("Generated Lobby ID:", lobbyId);
        const team1Name = team1NameInput.value.trim() || translations[currentLanguage].blueTeamDefaultName;
        const team2Name = team2NameInput.value.trim() || translations[currentLanguage].redTeamDefaultName;
        localStorage.setItem(`${lobbyId}_team1Name`, team1Name);
        localStorage.setItem(`${lobbyId}_team2Name`, team2Name);
        const baseUrl = window.location.origin + window.location.pathname;
        const judgeLink = `${baseUrl}#lobby=${lobbyId}&role=judge`;
        const team1Link = `${baseUrl}#lobby=${lobbyId}&role=team1`;
        const team2Link = `${baseUrl}#lobby=${lobbyId}&role=team2`;
        judgeLinkText.textContent = judgeLink;
        team1LinkText.textContent = team1Link;
        team2LinkText.textContent = team2Link;
        if (openJudgeLinkButton) openJudgeLinkButton.href = judgeLink;
        if (openTeam1LinkButton) openTeam1LinkButton.href = team1Link;
        if (openTeam2LinkButton) openTeam2LinkButton.href = team2Link;
        lobbyLinksDisplay.classList.remove('hidden');
        showStatusMessage("lobbyCreatedMsg", 3000);
    }
    function handleAdminClick() {
        console.log("Admin button clicked.");
        currentUserRole = 'admin'; userTeamSide = null; currentLobbyId = 'admin_view'; isDraftInitialized = false;
        navigateTo('draft');
    }

    // --- Инициализация Драфта, Загрузка и Отображение Чемпионов ---

    /**
     * Проверяет наличие основных элементов страницы драфта и инициализирует переменные.
     * @returns {boolean} - true, если все основные элементы найдены, иначе false.
     */
    function checkDraftElements() {
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

        const elementsToCheck = [ loadingIndicator, mainLayout, championGridElement, timerDisplay, resetButton, undoButton, championSearch, blueColumn, redColumn, swapButton, clearPicksButton, toggleTimerButton, roleFilterButtonsContainer, confirmPickBanButton, newPriorityFilterButton, nextDraftButton, returnHomeButton, blueTeamNameH2, redTeamNameH2, blueScoreEl, redScoreEl, statusMessage, championTooltip, globalBansBlueContainer, globalBansRedContainer, globallyBannedDisplay ];
        if (!filterButtons || filterButtons.length === 0) console.warn("Role filter buttons NodeList is empty or null!");
        const missingElements = elementsToCheck.filter(el => !el);
        if (missingElements.length > 0) { const missingIds = elementsToCheck.map((el, index) => !el ? `Missing element index ${index}` : null).filter(id => id !== null); console.error("Missing critical draft elements:", missingIds); return false; }
        console.log("All critical draft elements found.");
        return true;
    }

    /**
     * Загружает данные о чемпионах с Riot Data Dragon API.
     * @returns {Promise<boolean>} - true в случае успеха, false в случае ошибки.
     */
    async function loadChampionData() {
        console.log("Loading champion data from DDragon...");
        if (processedChampions.length > 0) { console.log("Champion data already loaded."); return true; }
        try {
            const versionsResponse = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
            if (!versionsResponse.ok) throw new Error(translations[currentLanguage].errorLoadingVersions.replace('{status}', versionsResponse.statusText));
            const versions = await versionsResponse.json();
            ddragonVersion = versions[0];
            console.log(`Using DDragon version: ${ddragonVersion}`);
            baseIconUrl = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/`;
            baseSplashUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/`;
            const dataUrlEn = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/en_US/champion.json`;
            const dataUrlRu = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/ru_RU/champion.json`;
            const [enResponse, ruResponse] = await Promise.all([fetch(dataUrlEn), fetch(dataUrlRu)]);
            if (!enResponse.ok) throw new Error(translations[currentLanguage].errorLoadingDataEN.replace('{status}', enResponse.statusText));
            allChampionsData.en = (await enResponse.json()).data;
            if (!ruResponse.ok) { console.warn(translations[currentLanguage].errorLoadingDataRU.replace('{status}', ruResponse.statusText)); showStatusMessage("errorLoadingDataRU", 4000, { status: ruResponse.statusText }); allChampionsData.ru = null; }
            else { allChampionsData.ru = (await ruResponse.json()).data; }
            processedChampions = Object.keys(allChampionsData.en).map(champId => {
                const enData = allChampionsData.en[champId];
                const ruData = allChampionsData.ru?.[champId] || enData;
                return { id: enData.id, key: enData.key, name: { en: enData.name, ru: ruData.name }, title: { en: enData.title, ru: ruData.title }, roles: championRolesMap[enData.id] || [], iconUrl: `${baseIconUrl}${enData.image.full}`, splashUrl: `${baseSplashUrl}${enData.id}_0.jpg` };
            });
            processedChampions.sort((a, b) => a.name[currentLanguage].localeCompare(b.name[currentLanguage], currentLanguage));
            console.log(`Successfully loaded and processed ${processedChampions.length} champions.`);
            return true;
        } catch (error) { console.error("Error loading champion data:", error); showStatusMessage("errorLoadingChampions", 5000, { error: error.message }); processedChampions = []; allChampionsData = { en: null, ru: null }; return false; }
    }

    /**
     * Создает HTML-элемент (кнопку) для карточки чемпиона.
     * @param {object} champ - Объект с данными чемпиона.
     * @returns {HTMLButtonElement} - Готовый DOM-элемент карточки.
     */
    function createChampionCard(champ) {
        const card = document.createElement('button');
        card.className = 'champion-card';
        card.dataset.championId = champ.id;
        card.dataset.championNameEn = champ.name.en.toLowerCase();
        card.dataset.championNameRu = champ.name.ru.toLowerCase();
        card.dataset.roles = champ.roles.join(',');
        card.setAttribute('role', 'gridcell');
        card.setAttribute('aria-label', champ.name[currentLanguage]);
        const img = document.createElement('img');
        img.src = champ.iconUrl; img.alt = ""; img.className = 'w-full h-full object-cover block pointer-events-none'; img.loading = 'lazy';
        img.onerror = () => { console.warn(`Failed to load image for ${champ.id}`); card.innerHTML = `<span class="text-xs text-red-500">Err</span>`; card.setAttribute('aria-label', `${champ.name[currentLanguage]} (Ошибка загрузки изображения)`); };
        card.appendChild(img);
        // Слушатели будут добавлены в addDraftEventListeners
        return card;
    }

    /**
     * Отображает карточки чемпионов в сетке (#championGrid).
     */
    function displayChampions() {
        if (!championGridElement) { console.error("displayChampions: championGridElement not found"); return; }
        console.log(`Displaying ${processedChampions.length} champions...`);
        const fragment = document.createDocumentFragment();
        processedChampions.sort((a, b) => a.name[currentLanguage].localeCompare(b.name[currentLanguage], currentLanguage));
        processedChampions.forEach(champ => { fragment.appendChild(createChampionCard(champ)); });
        championGridElement.innerHTML = '';
        championGridElement.appendChild(fragment);
        // Фильтры и доступность будут применены позже в updateDraftUI
    }

    /**
     * Показывает всплывающую подсказку с информацией о чемпионе.
     * @param {MouseEvent | FocusEvent} event - Событие (для получения координат).
     * @param {object} champion - Объект чемпиона.
     */
    function showChampionTooltip(event, champion) { clearTimeout(tooltipTimeout); tooltipTimeout = setTimeout(() => { if (!championTooltip || !champion) return; championTooltip.innerHTML = `<strong class="tooltip-title">${champion.name[currentLanguage]}</strong><span class="tooltip-name">${champion.title[currentLanguage]}</span>`; championTooltip.style.visibility = 'hidden'; championTooltip.style.display = 'block'; const tooltipRect = championTooltip.getBoundingClientRect(); championTooltip.style.visibility = ''; championTooltip.style.display = ''; const targetRect = event.target.getBoundingClientRect(); let top = targetRect.top - tooltipRect.height - 8; let left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2); if (top < 0) top = targetRect.bottom + 8; if (left < 0) left = 5; else if (left + tooltipRect.width > window.innerWidth) left = window.innerWidth - tooltipRect.width - 5; championTooltip.style.left = `${left}px`; championTooltip.style.top = `${top}px`; championTooltip.classList.add('visible'); }, 100); }
    /**
     * Скрывает всплывающую подсказку.
     */
    function hideChampionTooltip() { clearTimeout(tooltipTimeout); if (championTooltip) { championTooltip.classList.remove('visible'); } }

    /**
     * Асинхронно инициализирует страницу драфта.
     */
    async function initializeAppDraft() {
        console.log(`initializeAppDraft started for lobby: ${currentLobbyId}`);
        isDraftInitialized = false; // Сбрасываем флаг на время инициализации

        if (!loadingIndicator) loadingIndicator = document.getElementById('loadingIndicator');
        if (!mainLayout) mainLayout = document.getElementById('mainLayout');
        if (loadingIndicator) loadingIndicator.classList.remove('hidden');
        if (mainLayout) mainLayout.classList.add('hidden');

        try {
            if (!currentUserRole || !currentLobbyId) throw new Error(`Invalid state: Role (${currentUserRole}) or Lobby ID (${currentLobbyId}) not set.`);
            if (!checkDraftElements()) throw new Error("One or more draft page elements were not found during initialization!");

            updateUIText(currentLanguage);

            if (processedChampions.length === 0) {
                const dataLoaded = await loadChampionData();
                if (!dataLoaded) throw new Error("Failed to load champion data.");
            } else { console.log("Champion data already loaded."); }

            console.log("Champion data loaded/verified. Initializing UI...");
            displayChampions(); // Отображаем чемпионов
            restoreDraftStateFromStorage(); // Восстанавливаем состояние (Определена ниже)
            const lobbyTeam1Key = `${currentLobbyId}_team1Name`;
            const lobbyTeam2Key = `${currentLobbyId}_team2Name`;
            if (blueTeamNameH2) blueTeamNameH2.textContent = localStorage.getItem(lobbyTeam1Key) || translations[currentLanguage].blueTeamDefaultName;
            if (redTeamNameH2) redTeamNameH2.textContent = localStorage.getItem(lobbyTeam2Key) || translations[currentLanguage].redTeamDefaultName;
            applyRolePermissions(currentUserRole); // Применяем права (Определена ниже)
            addDraftEventListeners(); // Добавляем слушатели (Определена ниже)
            updateDraftUI(); // Обновляем UI (Определена ниже)

            if (loadingIndicator) loadingIndicator.classList.add('hidden');
            if (mainLayout) mainLayout.classList.remove('hidden');
            isDraftInitialized = true;
            console.log(`Draft simulator page initialized successfully for lobby ${currentLobbyId}, role: ${currentUserRole}`);

        } catch (error) {
            console.error(`Error during initializeAppDraft for lobby ${currentLobbyId}:`, error);
            showStatusMessage("errorInitCritical", 10000, { error: error.message });
            if (loadingIndicator) { loadingIndicator.textContent = translations[currentLanguage]?.errorInitCritical.replace('{error}', error.message) || `Initialization Error! ${error.message}`; loadingIndicator.classList.remove('hidden'); }
            if (mainLayout) mainLayout.classList.add('hidden');
        }
    }

    // --- Восстановление Состояния, Права, Слушатели Драфта, Обновление UI ---

    /**
     * Применяет разрешения к элементам UI в зависимости от роли пользователя.
     */
    function applyRolePermissions(role) {
        console.log(`Applying permissions for role: ${role}`);
        const can = (action, team = null) => hasPermission(action, team);

        if(timerDisplay) timerDisplay.disabled = !can('startDraft');
        if(resetButton) resetButton.disabled = !can('resetDraft');
        if(clearPicksButton) clearPicksButton.disabled = !can('clearDraft');
        if(undoButton) undoButton.disabled = !can('undoAction');
        if(swapButton) swapButton.disabled = !can('swapSides');
        if(toggleTimerButton) toggleTimerButton.disabled = !can('toggleTimerDuration');
        if(confirmPickBanButton) confirmPickBanButton.disabled = !can('confirmAction');
        if(newPriorityFilterButton) newPriorityFilterButton.disabled = !can('togglePriorityFilter');
        if(nextDraftButton) nextDraftButton.disabled = !can('nextDraft');
        if(returnHomeButton) returnHomeButton.disabled = !can('returnHome');
        if(filterButtons) filterButtons.forEach(btn => { btn.disabled = !can('useRoleFilters'); });
        if(championSearch) championSearch.disabled = !can('useRoleFilters');
        if(blueTeamNameH2) blueTeamNameH2.contentEditable = can('editTeamName');
        if(redTeamNameH2) redTeamNameH2.contentEditable = can('editTeamName');
        if(blueScoreEl) blueScoreEl.contentEditable = can('editScore');
        if(redScoreEl) redScoreEl.contentEditable = can('editScore');
        updateNicknameEditability(); // Defined below
    }

    /**
     * Обновляет атрибут contentEditable у полей для никнеймов.
     */
    function updateNicknameEditability() {
        const canEdit = hasPermission('editNicknames');
        document.querySelectorAll('.nickname-input').forEach(input => {
            input.contentEditable = canEdit;
            input.style.cursor = canEdit ? 'text' : 'default';
        });
    }

    /**
     * Восстанавливает состояние драфта из localStorage.
     */
    function restoreDraftStateFromStorage() {
        if (!currentLobbyId) return;
        console.log(`Restoring state for lobby: ${currentLobbyId}`);

        const loadedStep = getLobbyItem('currentStep', 0);
        const loadedTimerDuration = getLobbyItem('draftTimerDuration', 30);
        const loadedTimerSeconds = getLobbyItem('timerSeconds', loadedTimerDuration);
        const loadedRoleFilter = getLobbyItem('currentRoleFilter', 'All');
        const loadedPriorityFilter = getLobbyItem('isPriorityFilterActive', false);
        const loadedBlueScore = getLobbyItem('blueScore', '');
        const loadedRedScore = getLobbyItem('redScore', '');
        const loadedDraftHistory = getLobbyItem('draftHistory', []);
        const loadedPickNicknames = getLobbyItem('pickNicknames', {});
        const loadedPreviewedChampionId = getLobbyItem('previewedChampionId', null);

        // Очищаем все слоты перед восстановлением
        document.querySelectorAll('.pick-slot, .ban-slot').forEach(slot => {
            restoreSlotPlaceholder(slot, slot.id, ''); // Defined in Part 5
        });

        // Заполняем слоты на основе истории
        loadedDraftHistory.forEach(action => {
            const champ = getChampionById(action.championId);
            const slotElement = document.getElementById(action.slotId);
            const nickname = loadedPickNicknames[action.slotId] || '';
            if (champ && slotElement) { fillSlot(slotElement, champ, action.type, nickname); } // Defined in Part 5
            else { console.warn(`Could not restore slot ${action.slotId}: Champion ${action.championId} or slot element not found.`); }
        });

        if (blueScoreEl) blueScoreEl.textContent = loadedBlueScore;
        if (redScoreEl) redScoreEl.textContent = loadedRedScore;
        if (championSearch) championSearch.value = '';
        setLobbyItem('currentRoleFilter', loadedRoleFilter);
        if (filterButtons) { filterButtons.forEach(btn => { btn.classList.toggle('active', btn.dataset.role === loadedRoleFilter); }); }
        setLobbyItem('isPriorityFilterActive', loadedPriorityFilter);
        if (newPriorityFilterButton) { newPriorityFilterButton.setAttribute('aria-pressed', loadedPriorityFilter.toString()); }
        filterChampions(); // Defined below

        setLobbyItem('previewedChampionId', loadedPreviewedChampionId);
        if (loadedPreviewedChampionId) {
            const previewChamp = getChampionById(loadedPreviewedChampionId);
            const draftOrder = getDraftOrder(); // Defined in Part 5
            if (previewChamp && loadedStep < draftOrder.length) {
                const previewSlotId = draftOrder[loadedStep].slot;
                setLobbyItem('previewedSlotId', previewSlotId);
                const previewSlotElement = document.getElementById(previewSlotId);
                if (previewSlotElement) {
                    const nickname = loadedPickNicknames[previewSlotId] || '';
                    fillSlot(previewSlotElement, previewChamp, draftOrder[loadedStep].type, nickname); // Defined in Part 5
                    previewSlotElement.classList.add('preview-flash');
                }
            } else { setLobbyItem('previewedChampionId', null); setLobbyItem('previewedSlotId', null); }
        } else { setLobbyItem('previewedSlotId', null); }

        setLobbyItem('draftTimerDuration', loadedTimerDuration);
        setLobbyItem('timerSeconds', loadedTimerSeconds);
        resetTimerDisplay(); // Defined in Part 5
        displayGloballyBanned(); // Defined in Part 5

        console.log(`State restored for lobby ${currentLobbyId}. Step: ${loadedStep}`);
        // updateDraftUI() вызывается из initializeAppDraft после этой функции
    }

    /**
     * Добавляет слушатели событий к элементам управления на странице драфта.
     */
    function addDraftEventListeners() {
        console.log("Attaching draft page event listeners...");

        if (timerDisplay) timerDisplay.addEventListener('click', handleStartDraft); else console.warn("Listener not attached: timerDisplay");
        if (resetButton) resetButton.addEventListener('click', () => resetDraftFull(false)); else console.warn("Listener not attached: resetButton");
        if (clearPicksButton) clearPicksButton.addEventListener('click', () => resetCurrentGamePicksBans(false, true)); else console.warn("Listener not attached: clearPicksButton");
        if (undoButton) undoButton.addEventListener('click', handleUndo); else console.warn("Listener not attached: undoButton");
        if (swapButton) swapButton.addEventListener('click', handleSwapTeams); else console.warn("Listener not attached: swapButton");
        if (toggleTimerButton) toggleTimerButton.addEventListener('click', handleToggleTimer); else console.warn("Listener not attached: toggleTimerButton");
        if (confirmPickBanButton) confirmPickBanButton.addEventListener('click', handleConfirmPickBan); else console.warn("Listener not attached: confirmPickBanButton");
        if (newPriorityFilterButton) newPriorityFilterButton.addEventListener('click', handleNewPriorityFilterToggle); else console.warn("Listener not attached: newPriorityFilterButton");
        if (nextDraftButton) nextDraftButton.addEventListener('click', handleNextDraft); else console.warn("Listener not attached: nextDraftButton");
        if (championSearch) championSearch.addEventListener('input', debouncedFilter); else console.warn("Listener not attached: championSearch");
        if (filterButtons) { filterButtons.forEach(button => button.addEventListener('click', handleRoleFilterClick)); } else { console.warn("Listener not attached: filterButtons"); }
        if (blueColumn) blueColumn.addEventListener('click', handlePickContainerClick); else console.warn("Listener not attached: blueColumn");
        if (redColumn) redColumn.addEventListener('click', handlePickContainerClick); else console.warn("Listener not attached: redColumn");
        if (returnHomeButton) returnHomeButton.addEventListener('click', () => navigateTo('home')); else console.warn("Listener not attached: returnHomeButton");

        // Слушатели для редактирования имен и счета
        [blueTeamNameH2, redTeamNameH2, blueScoreEl, redScoreEl].forEach(el => {
            if (el) {
                el.addEventListener('blur', (e) => {
                    const isName = el.id.includes('name'); const permissionNeeded = isName ? 'editTeamName' : 'editScore';
                    if (!hasPermission(permissionNeeded)) return; const newValue = e.target.textContent.trim(); e.target.textContent = newValue;
                    const key = isName ? (el.id.includes('blue') ? 'team1Name' : 'team2Name') : (el.id.includes('blue') ? 'blueScore' : 'redScore');
                    if (isName) { localStorage.setItem(`${currentLobbyId}_${key}`, newValue); } else { setLobbyItem(key, newValue); }
                    console.log(`Saved ${key}: ${newValue}`);
                });
                el.addEventListener('keydown', (e) => {
                    const permissionNeeded = el.id.includes('name') ? 'editTeamName' : 'editScore'; if (!hasPermission(permissionNeeded)) return;
                    if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); }
                });
            } else { console.warn("Listener not attached: An editable H2/Score element was not found"); }
        });

        // Слушатели для карточек чемпионов (делегирование)
        if (championGridElement) {
            championGridElement.addEventListener('click', (event) => { const card = event.target.closest('.champion-card'); if (card && !card.disabled) { const champId = card.dataset.championId; const champ = getChampionById(champId); if (champ) handleChampionPreview(champ); } });
            championGridElement.addEventListener('mouseover', (event) => { const card = event.target.closest('.champion-card'); if (card) { const champId = card.dataset.championId; const champ = getChampionById(champId); if (champ) showChampionTooltip(event, champ); } });
            championGridElement.addEventListener('mouseout', (event) => { if (event.target.closest('.champion-card')) { hideChampionTooltip(); } });
            championGridElement.addEventListener('focusin', (event) => { const card = event.target.closest('.champion-card'); if (card) { const champId = card.dataset.championId; const champ = getChampionById(champId); if (champ) showChampionTooltip(event, champ); } });
            championGridElement.addEventListener('focusout', (event) => { if (event.target.closest('.champion-card')) { hideChampionTooltip(); } });
        } else { console.warn("Listeners not attached: championGridElement not found"); }

        console.log("Draft page event listeners attached.");
    }

    /**
     * Обновляет состояние UI страницы драфта (кнопки, подсветка, блокировки).
     */
    function updateDraftUI() {
        if (!isDraftInitialized || !currentLobbyId) { /* console.warn("updateDraftUI called before draft initialization or without lobbyId."); */ return; }
        console.log(`Updating Draft UI for lobby ${currentLobbyId}`);

        const step = getLobbyItem('currentStep', 0);
        const isStarted = getLobbyItem('isDraftStarted', false);
        const isComplete = getLobbyItem('isDraftComplete', false);
        const history = getLobbyItem('draftHistory', []);
        const previewId = getLobbyItem('previewedChampionId', null);
        const previewChamp = previewId ? getChampionById(previewId) : null;
        const draftOrder = getDraftOrder(); // Defined in Part 5

        applyRolePermissions(currentUserRole); // Применяем базовые права

        document.querySelectorAll('.pick-slot, .ban-slot').forEach(el => { el.classList.remove('highlight-action', 'preview-flash', 'swap-selected'); });

        let currentActionTeam = null; let currentActionType = null; let currentActionSlotId = null;
        if (!isComplete && step < draftOrder.length) {
            const currentAction = draftOrder[step];
            currentActionTeam = currentAction.team; currentActionType = currentAction.type; currentActionSlotId = currentAction.slot;
        }

        // --- Управление доступностью кнопок (с учетом состояния) ---
        const canConfirm = hasPermission('confirmAction', currentActionTeam);
        if (confirmPickBanButton) confirmPickBanButton.disabled = !canConfirm || !previewChamp || !isStarted || isComplete;
        const lastAction = history[history.length - 1];
        const canUndo = hasPermission('undoAction', lastAction?.team);
        if (undoButton) undoButton.disabled = !canUndo || history.length === 0 || !isStarted || isComplete;
        const canStart = hasPermission('startDraft'); const canClear = hasPermission('clearDraft'); const canReset = hasPermission('resetDraft');
        const canSwap = hasPermission('swapSides'); const canToggleTimer = hasPermission('toggleTimerDuration'); const canNext = hasPermission('nextDraft');
        const canUseFilters = hasPermission('useRoleFilters'); const canTogglePriority = hasPermission('togglePriorityFilter');

        if(timerDisplay) timerDisplay.disabled = !canStart || isStarted;
        if(resetButton) resetButton.disabled = !canReset;
        if(clearPicksButton) clearPicksButton.disabled = !canClear;
        if(swapButton) swapButton.disabled = !canSwap || (isStarted && !isComplete);
        if(toggleTimerButton) toggleTimerButton.disabled = !canToggleTimer || isStarted;
        if(nextDraftButton) nextDraftButton.disabled = !canNext || !isComplete;
        if(newPriorityFilterButton) newPriorityFilterButton.disabled = !canTogglePriority || isStarted;
        if(filterButtons) filterButtons.forEach(btn => btn.disabled = !canUseFilters || isStarted);
        if(championSearch) championSearch.disabled = !canUseFilters || isStarted;

        // --- Управление состоянием UI в зависимости от фазы драфта ---
        if (!isStarted) {
            resetTimerDisplay(); // Defined in Part 5
            if (blueColumn) blueColumn.classList.add('draft-disabled'); if (redColumn) redColumn.classList.add('draft-disabled');
            if (championGridElement) championGridElement.style.pointerEvents = 'none';
        } else if (!isComplete) {
            if (blueColumn) blueColumn.classList.remove('draft-disabled'); if (redColumn) redColumn.classList.remove('draft-disabled');
            const activeSlotElement = document.getElementById(currentActionSlotId);
            if (activeSlotElement && (isAdminOrJudge() || userTeamSide === currentActionTeam)) { activeSlotElement.classList.add('highlight-action'); }
            const previewSlotId = getLobbyItem('previewedSlotId', null);
            if (previewChamp && previewSlotId === currentActionSlotId) { const previewSlotElement = document.getElementById(previewSlotId); if (previewSlotElement) previewSlotElement.classList.add('preview-flash'); }
            const isGridInteractive = hasPermission(currentActionType === 'pick' ? 'pickChampion' : 'banChampion', currentActionTeam);
            if (championGridElement) championGridElement.style.pointerEvents = isGridInteractive ? 'auto' : 'none';
            if (blueColumn) blueColumn.classList.toggle('role-disabled', !isAdminOrJudge() && userTeamSide === 'red');
            if (redColumn) redColumn.classList.toggle('role-disabled', !isAdminOrJudge() && userTeamSide === 'blue');
            if (!timerInterval && hasPermission('startDraft')) { startTimer(); } // Defined in Part 5
        } else { // Драфт завершен
            stopTimer(); // Defined in Part 5
            if (timerDisplay) { timerDisplay.textContent = translations[currentLanguage].timerDraftCompleteText; timerDisplay.classList.add('timer-disabled'); timerDisplay.disabled = true; timerDisplay.title = translations[currentLanguage].timerDraftCompleteTitle; }
            if (blueColumn) blueColumn.classList.remove('draft-disabled', 'role-disabled'); if (redColumn) redColumn.classList.remove('draft-disabled', 'role-disabled');
            if (championGridElement) championGridElement.style.pointerEvents = 'none';
            document.querySelectorAll('.pick-slot').forEach(slot => { const champId = getSlotChampionId(slot.id); const canSwapPicks = canSwap && champId; slot.style.cursor = canSwapPicks ? 'pointer' : 'default'; slot.title = canSwapPicks ? translations[currentLanguage].swapPickSelect : ''; });
        }

        updateChampionAvailability(); // Defined below
        displayGloballyBanned(); // Defined in Part 5
        updateNicknameEditability(); // Defined above
        console.log("Draft UI updated.");
    }

    // --- Фильтрация и доступность чемпионов ---
    function filterChampions() {
        if (!isDraftInitialized || !championSearch || !championGridElement) return;
        const searchTerm = championSearch.value.toLowerCase().trim();
        const roleFilter = getLobbyItem('currentRoleFilter', 'All');
        const priorityFilterActive = getLobbyItem('isPriorityFilterActive', false);
        championGridElement.querySelectorAll('.champion-card').forEach(card => {
            const champId = card.dataset.championId; const nameEn = card.dataset.championNameEn || ''; const nameRu = card.dataset.championNameRu || '';
            const champRoles = card.dataset.roles ? card.dataset.roles.split(',') : [];
            const searchMatch = searchTerm === '' || nameEn.includes(searchTerm) || nameRu.includes(searchTerm) || champId.toLowerCase().includes(searchTerm);
            const roleMatch = roleFilter === 'All' || champRoles.includes(roleFilter);
            const isPriority = priorityChampions.has(champId); const hideByPriorityFilter = priorityFilterActive && !isPriority;
            const isVisible = searchMatch && roleMatch && !hideByPriorityFilter;
            card.style.display = isVisible ? 'flex' : 'none';
        });
        updateChampionAvailability(); // Defined below
    }
    const debouncedFilter = debounce(filterChampions, 250);
    function updateChampionAvailability() {
        if (!isDraftInitialized || !currentLobbyId) return;
        const selectedSet = getLobbyItem('selectedChampions', new Set());
        const globallyDisabledSet = getLobbyItem('globallyDisabledChampions', new Set());
        const combinedDisabled = new Set([...selectedSet, ...globallyDisabledSet]);
        document.querySelectorAll('.champion-card').forEach(card => {
            const champId = card.dataset.championId; const isDisabled = combinedDisabled.has(champId); const isSelected = selectedSet.has(champId);
            card.classList.toggle('selected', isSelected && !isDisabled); card.classList.toggle('disabled', isDisabled);
            card.disabled = isDisabled; card.setAttribute('aria-disabled', isDisabled.toString());
        });
    }

    // --- Логика действий драфта (Предпросмотр, Фильтры) ---
    function handleChampionPreview(champion) {
        const isStarted = getLobbyItem('isDraftStarted', false); const isComplete = getLobbyItem('isDraftComplete', false); const step = getLobbyItem('currentStep', 0); const draftOrder = getDraftOrder(); // Defined in Part 5
        if (!isStarted || isComplete || step >= draftOrder.length) return;
        const currentAction = draftOrder[step]; const permissionNeeded = currentAction.type === 'pick' ? 'pickChampion' : 'banChampion'; const permKey = currentAction.type === 'pick' ? 'permDeniedPreviewPick' : 'permDeniedPreviewBan';
        if (!hasPermission(permissionNeeded, currentAction.team)) { showStatusMessage(permKey, 2000); return; }
        const selectedSet = getLobbyItem('selectedChampions', new Set()); const globallyDisabledSet = getLobbyItem('globallyDisabledChampions', new Set()); const isDisabled = selectedSet.has(champion.id) || globallyDisabledSet.has(champion.id);
        if (isDisabled) { showStatusMessage("championAlreadySelected", 2000, { name: champion.name[currentLanguage] }); return; }
        const slotElement = document.getElementById(currentAction.slot);
        if (slotElement) {
            document.querySelectorAll('.preview-flash').forEach(el => el.classList.remove('preview-flash'));
            setLobbyItem('previewedChampionId', champion.id); setLobbyItem('previewedSlotId', currentAction.slot);
            const nicknames = getLobbyItem('pickNicknames', {}); const existingNickname = nicknames[currentAction.slot] || '';
            fillSlot(slotElement, champion, currentAction.type, existingNickname); // Defined in Part 5
            slotElement.classList.add('preview-flash'); updateDraftUI();
        } else { console.warn(`Preview failed: Slot element ${currentAction.slot} not found.`); }
    }
    function handleRoleFilterClick(event) {
        const clickedButton = event.currentTarget; if (!clickedButton || clickedButton.disabled) return; const role = clickedButton.dataset.role; if (!role) return;
        if (!hasPermission('useRoleFilters')) { showStatusMessage("permDeniedRoleFilter", 2000); return; }
        setLobbyItem('currentRoleFilter', role); if (filterButtons) { filterButtons.forEach(btn => { btn.classList.remove('active'); }); clickedButton.classList.add('active'); }
        filterChampions();
    }
    function handleNewPriorityFilterToggle() {
        if (!hasPermission('togglePriorityFilter')) { showStatusMessage("permDeniedPriorityFilter", 2000); return; }
        let currentPriorityState = getLobbyItem('isPriorityFilterActive', false); currentPriorityState = !currentPriorityState; setLobbyItem('isPriorityFilterActive', currentPriorityState);
        if (newPriorityFilterButton) { newPriorityFilterButton.setAttribute('aria-pressed', currentPriorityState.toString()); const titleKey = currentPriorityState ? 'priorityFilterShowAllTitle' : 'priorityFilterShowPriorityTitle'; newPriorityFilterButton.title = translations[currentLanguage][titleKey] || titleKey; }
        filterChampions(); showStatusMessage(currentPriorityState ? "priorityFilterOn" : "priorityFilterOff", 2000);
    }

    console.log("Part 4/5: State Restore, Permissions, Draft Listeners, UI Update Complete.");
    // --- Конец Части 4 ---
    // Следующий код будет добавлен в Части 5
```

**Что делает этот код (Часть 4):**

* Определяет функции `hasPermission`, `applyRolePermissions`, `updateNicknameEditability` для управления доступом.
* Определяет `restoreDraftStateFromStorage` для загрузки состояния.
* Определяет `addDraftEventListeners` для привязки ВСЕХ слушателей страницы драфта.
* Определяет `updateDraftUI` для обновления интерфейса.
* Определяет `filterChampions`, `debouncedFilter`, `updateChampionAvailability` для фильтров и доступности.
* Определяет `handleChampionPreview`, `handleRoleFilterClick`, `handleNewPriorityFilterToggle` для обработки действий пользователя.

**Что делать дальше:**

1.  **Добавьте** этот код в конец вашего `script.js` (после Части 3, перед `});`).
2.  **Проверьте:**
    * Переходит ли теперь на страницу драфта **без ошибок**? Отображается ли сетка чемпионов и восстанавливается ли предыдущее состояние (если было)?
    * Работают ли **фильтры** и **поиск**?
    * Можно ли **выбрать чемпиона для предпросмотра**?
    * Работает ли **редактирование имен/счета**?
    * **Блокируются/разблокируются** ли элементы управления в зависимости от роли/хода?

**Работа еще не закончена.** Основная логика самого драфта (подтверждение, отмена, таймер и т.д.) все еще не реализована. Это будет в **Части 5
