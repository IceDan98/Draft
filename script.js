// script.js - Воссозданная версия с комментариями
// Цель: Чистый, структурированный код, готовый к будущей интеграции с бэкендом (согласно ТЗ).
// Текущая версия: Полностью клиентская, использует localStorage для состояния.

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Fully Loaded. Initializing App...");

    // --- Глобальные константы и переменные ---

    // Переводы (структура сохранена)
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

    // Карта ролей чемпионов
    const championRolesMap = {
        'Aatrox': ['Top'], 'Ahri': ['Mid'], 'Akali': ['Mid', 'Top'], 'Akshan': ['Mid', 'Top'], 'Alistar': ['Support'], 'Amumu': ['Jungle', 'Support'], 'Anivia': ['Mid'], 'Annie': ['Mid', 'Support'], 'Aphelios': ['ADC'], 'Ashe': ['ADC', 'Support'], 'AurelionSol': ['Mid'], 'Azir': ['Mid'], 'Bard': ['Support'], 'Belveth': ['Jungle'], 'Blitzcrank': ['Support'], 'Brand': ['Support', 'Mid', 'Jungle'], 'Braum': ['Support'], 'Briar': ['Jungle'], 'Caitlyn': ['ADC'], 'Camille': ['Top'], 'Cassiopeia': ['Top', 'Mid'], 'Chogath': ['Top', 'Mid'], 'Corki': ['Mid', 'ADC'], 'Darius': ['Top', 'Jungle'], 'Diana': ['Jungle', 'Mid'], 'DrMundo': ['Top', 'Jungle'], 'Draven': ['ADC'], 'Ekko': ['Jungle', 'Mid'], 'Elise': ['Jungle'], 'Evelynn': ['Jungle'], 'Ezreal': ['ADC'], 'Fiddlesticks': ['Jungle'], 'Fiora': ['Top'], 'Fizz': ['Mid'], 'Galio': ['Mid', 'Support'], 'Gangplank': ['Top'], 'Garen': ['Top'], 'Gnar': ['Top'], 'Gragas': ['Jungle', 'Top', 'Mid', 'Support'], 'Graves': ['Jungle'], 'Gwen': ['Top', 'Jungle'], 'Hecarim': ['Jungle'], 'Heimerdinger': ['Top', 'Mid', 'Support'], 'Hwei': ['Mid', 'Support'], 'Illaoi': ['Top'], 'Irelia': ['Top', 'Mid'], 'Ivern': ['Jungle', 'Support'], 'Janna': ['Support'], 'JarvanIV': ['Jungle'], 'Jax': ['Top', 'Jungle'], 'Jayce': ['Top', 'Mid'], 'Jhin': ['ADC'], 'Jinx': ['ADC'], 'Kaisa': ['ADC'], 'Kalista': ['ADC'], 'Karma': ['Support', 'Mid'], 'Karthus': ['Jungle', 'Mid'], 'Kassadin': ['Mid'], 'Katarina': ['Mid'], 'Kayle': ['Top', 'Mid'], 'Kayn': ['Jungle'], 'Kennen': ['Top', 'Mid'], 'Khazix': ['Jungle'], 'Kindred': ['Jungle'], 'Kled': ['Top', 'Mid'], 'KogMaw': ['ADC'], 'KSante': ['Top'], 'Leblanc': ['Mid'], 'LeeSin': ['Jungle'], 'Leona': ['Support'], 'Lillia': ['Jungle'], 'Lissandra': ['Mid'], 'Lucian': ['ADC'], 'Lulu': ['Support'], 'Lux': ['Mid', 'Support'], 'Malphite': ['Top', 'Support', 'Mid'], 'Malzahar': ['Mid'], 'Maokai': ['Jungle', 'Support'], 'MasterYi': ['Jungle'], 'Milio': ['Support'], 'MissFortune': ['ADC'], 'Mordekaiser': ['Top', 'Jungle'], 'Morgana': ['Support', 'Mid', 'Jungle'], 'Naafiri': ['Jungle', 'Mid'], 'Nami': ['Support'], 'Nasus': ['Top'], 'Nautilus': ['Support'], 'Neeko': ['Mid', 'Support'], 'Nidalee': ['Jungle'], 'Nilah': ['ADC'], 'Nocturne': ['Jungle'], 'Nunu': ['Jungle'], 'Olaf': ['Top', 'Jungle'], 'Orianna': ['Mid'], 'Ornn': ['Top'], 'Pantheon': ['Top', 'Mid', 'Support', 'Jungle'], 'Poppy': ['Top', 'Jungle', 'Support'], 'Pyke': ['Support', 'Mid'], 'Qiyana': ['Jungle', 'Mid'], 'Quinn': ['Top', 'Mid'], 'Rakan': ['Support'], 'Rammus': ['Jungle'], 'RekSai': ['Jungle'], 'Rell': ['Support', 'Jungle'], 'Renata': ['Support'], 'Renekton': ['Top'], 'Rengar': ['Jungle', 'Top'], 'Riven': ['Top'], 'Rumble': ['Top', 'Mid', 'Jungle'], 'Ryze': ['Top', 'Mid'], 'Samira': ['ADC'], 'Sejuani': ['Jungle'], 'Senna': ['Support', 'ADC'], 'Seraphine': ['Support', 'Mid', 'ADC'], 'Sett': ['Top', 'Support'], 'Shaco': ['Jungle', 'Support'], 'Shen': ['Top', 'Support'], 'Shyvana': ['Jungle'], 'Singed': ['Top'], 'Sion': ['Top', 'Mid'], 'Sivir': ['ADC'], 'Skarner': ['Jungle', 'Top'], 'Smolder': ['ADC', 'Mid'], 'Sona': ['Support'], 'Soraka': ['Support'], 'Swain': ['Support', 'Mid', 'ADC'], 'Sylas': ['Mid', 'Jungle'], 'Syndra': ['Mid'], 'TahmKench': ['Top', 'Support'], 'Taliyah': ['Jungle', 'Mid'], 'Talon': ['Jungle', 'Mid'], 'Taric': ['Support'], 'Teemo': ['Top'], 'Thresh': ['Support'], 'Tristana': ['ADC', 'Mid'], 'Trundle': ['Top', 'Jungle'], 'Tryndamere': ['Top'], 'TwistedFate': ['Mid', 'ADC'], 'Twitch': ['ADC', 'Jungle'], 'Udyr': ['Jungle', 'Top'], 'Urgot': ['Top'], 'Varus': ['ADC', 'Mid'], 'Vayne': ['ADC', 'Top'], 'Veigar': ['Mid', 'ADC', 'Support'], 'Velkoz': ['Mid', 'Support'], 'Vex': ['Mid'], 'Vi': ['Jungle'], 'Viego': ['Jungle'], 'Viktor': ['Mid'], 'Vladimir': ['Top', 'Mid'], 'Volibear': ['Top', 'Jungle'], 'Warwick': ['Jungle', 'Top'], 'MonkeyKing': ['Top', 'Jungle'], 'Xayah': ['ADC'], 'Xerath': ['Mid', 'Support'], 'XinZhao': ['Jungle'], 'Yasuo': ['Mid', 'Top', 'ADC'], 'Yone': ['Top', 'Mid'], 'Yorick': ['Top', 'Jungle'], 'Yuumi': ['Support'], 'Zac': ['Jungle'], 'Zed': ['Mid', 'Jungle'], 'Zeri': ['ADC'], 'Ziggs': ['Mid', 'ADC', 'Support'], 'Zilean': ['Support', 'Mid'], 'Zoe': ['Mid', 'Support'], 'Zyra': ['Support', 'Jungle', 'Mid']
    };

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
    function navigateTo(pageName) { console.log(`Navigating to: ${pageName}`); currentPage = pageName; if (homePage) homePage.classList.add('hidden'); if (draftPage) draftPage.classList.add('hidden'); if (pageName === 'home') { if (homePage) homePage.classList.remove('hidden'); if (window.location.hash) { currentUserRole = null; userTeamSide = null; currentLobbyId = null; isDraftInitialized = false; history.pushState("", document.title, window.location.pathname + window.location.search); } updateUIText(currentLanguage); } else if (pageName === 'draft') { if (draftPage) draftPage.classList.remove('hidden'); const params = getParamsFromHash(); if (params) { console.log(`Draft Navigation - Lobby: ${params.lobbyId}, Role: ${params.role}`); currentLobbyId = params.lobbyId; currentUserRole = params.role; if (currentUserRole === 'team1') userTeamSide = 'blue'; else if (currentUserRole === 'team2') userTeamSide = 'red'; else userTeamSide = null; } else if (currentUserRole === 'admin' && currentLobbyId === 'admin_view') { console.log("Navigating as Admin to admin_view"); } else { console.error("Cannot navigate to draft: Missing or invalid lobbyId/role in hash."); showStatusMessage("errorInitCritical", 5000, { error: "Invalid lobby link." }); navigateTo('home'); return; } if (!isDraftInitialized || currentLobbyId !== getLobbyItem('lastInitializedLobbyId', null) || !checkDraftElements()) { console.log(`Initializing draft simulator for lobby ${currentLobbyId}...`); setLobbyItem('lastInitializedLobbyId', currentLobbyId); initializeAppDraft(); } else { console.log(`Draft already initialized for lobby ${currentLobbyId}, re-applying settings for role: ${currentUserRole}`); applyRolePermissions(currentUserRole); const lobbyTeam1Key = `${currentLobbyId}_team1Name`; const lobbyTeam2Key = `${currentLobbyId}_team2Name`; if (blueTeamNameH2) blueTeamNameH2.textContent = localStorage.getItem(lobbyTeam1Key) || translations[currentLanguage].blueTeamDefaultName; if (redTeamNameH2) redTeamNameH2.textContent = localStorage.getItem(lobbyTeam2Key) || translations[currentLanguage].redTeamDefaultName; restoreDraftStateFromStorage(); updateUIText(currentLanguage); updateDraftUI(); } } }

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
     */
    async function initializeAppDraft() {
        console.log(`initializeAppDraft started for lobby: ${currentLobbyId}`);
        isDraftInitialized = false;
        if (loadingIndicator) loadingIndicator.classList.remove('hidden');
        if (mainLayout) mainLayout.classList.add('hidden');

        try {
            if (!currentUserRole || !currentLobbyId) throw new Error(`Invalid state: Role (${currentUserRole}) or Lobby ID (${currentLobbyId}) not set.`);
            if (!checkDraftElements()) throw new Error("One or more draft page elements were not found during initialization!");

            updateUIText(currentLanguage);

            if (processedChampions.length === 0) {
                const dataLoaded = await loadChampionData();
                if (!dataLoaded) throw new Error("Failed to load champion data.");
            } else {
                 console.log("Champion data already loaded.");
            }

            console.log("Champion data loaded/verified. Initializing UI...");
            displayChampions();
            restoreDraftStateFromStorage(); // РЕАЛИЗОВАНО НИЖЕ
            const lobbyTeam1Key = `${currentLobbyId}_team1Name`;
            const lobbyTeam2Key = `${currentLobbyId}_team2Name`;
            if (blueTeamNameH2) blueTeamNameH2.textContent = localStorage.getItem(lobbyTeam1Key) || translations[currentLanguage].blueTeamDefaultName;
            if (redTeamNameH2) redTeamNameH2.textContent = localStorage.getItem(lobbyTeam2Key) || translations[currentLanguage].redTeamDefaultName;
            applyRolePermissions(currentUserRole); // РЕАЛИЗОВАНО НИЖЕ
            addDraftEventListeners(); // РЕАЛИЗОВАНО НИЖЕ
            updateDraftUI(); // РЕАЛИЗОВАНО НИЖЕ

            if (loadingIndicator) loadingIndicator.classList.add('hidden');
            if (mainLayout) mainLayout.classList.remove('hidden');
            isDraftInitialized = true;
            console.log(`Draft simulator page initialized successfully for lobby ${currentLobbyId}, role: ${currentUserRole}`);

        } catch (error) {
            console.error(`Error during initializeAppDraft for lobby ${currentLobbyId}:`, error);
            showStatusMessage("errorInitCritical", 10000, { error: error.message });
            if (loadingIndicator) loadingIndicator.textContent = `Ошибка инициализации! ${error.message}`;
            if (mainLayout) mainLayout.classList.add('hidden');
        }
    }

    /**
     * Проверяет наличие DOM-элементов страницы драфта.
     * @returns {boolean}
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
        // statusMessage и championTooltip инициализированы глобально

        const elementsToCheck = [ loadingIndicator, mainLayout, championGridElement, timerDisplay, resetButton, undoButton, championSearch, blueColumn, redColumn, swapButton, clearPicksButton, toggleTimerButton, roleFilterButtonsContainer, confirmPickBanButton, newPriorityFilterButton, nextDraftButton, returnHomeButton, blueTeamNameH2, redTeamNameH2, blueScoreEl, redScoreEl, statusMessage, championTooltip, globalBansBlueContainer, globalBansRedContainer, globallyBannedDisplay ];
        if (!filterButtons || filterButtons.length === 0) console.warn("Role filter buttons NodeList is empty or null!");
        const missingElements = elementsToCheck.filter(el => !el);
        if (missingElements.length > 0) { const missingIds = elementsToCheck.map((el, index) => !el ? `Missing element index ${index}` : null).filter(id => id !== null); console.error("Missing critical draft elements:", missingIds); return false; }
        console.log("All critical draft elements found.");
        return true;
    }

    // --- Загрузка данных чемпионов ---
    async function loadChampionData() {
        console.log("Loading champion data from DDragon...");
        if (processedChampions.length > 0) {
            console.log("Champion data already loaded.");
            return true;
        }
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
            if (!ruResponse.ok) {
                console.warn(translations[currentLanguage].errorLoadingDataRU.replace('{status}', ruResponse.statusText));
                showStatusMessage("errorLoadingDataRU", 4000, { status: ruResponse.statusText });
                allChampionsData.ru = null;
            } else {
                allChampionsData.ru = (await ruResponse.json()).data;
            }
            processedChampions = Object.keys(allChampionsData.en).map(champId => {
                const enData = allChampionsData.en[champId];
                const ruData = allChampionsData.ru?.[champId] || enData;
                return { id: enData.id, key: enData.key, name: { en: enData.name, ru: ruData.name }, title: { en: enData.title, ru: ruData.title }, roles: championRolesMap[enData.id] || [], iconUrl: `${baseIconUrl}${enData.image.full}`, splashUrl: `${baseSplashUrl}${enData.id}_0.jpg` };
            });
            processedChampions.sort((a, b) => a.name[currentLanguage].localeCompare(b.name[currentLanguage], currentLanguage));
            console.log(`Successfully loaded and processed ${processedChampions.length} champions.`);
            return true;
        } catch (error) {
            console.error("Error loading champion data:", error);
            showStatusMessage("errorLoadingChampions", 5000, { error: error.message });
            processedChampions = [];
            allChampionsData = { en: null, ru: null };
            return false;
        }
    }

    // --- Отображение чемпионов и Тултипы ---
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
        img.src = champ.iconUrl;
        img.alt = "";
        img.className = 'w-full h-full object-cover block pointer-events-none';
        img.loading = 'lazy';
        img.onerror = () => { console.warn(`Failed to load image for ${champ.id}`); card.innerHTML = `<span class="text-xs text-red-500">Err</span>`; card.setAttribute('aria-label', `${champ.name[currentLanguage]} (Ошибка загрузки изображения)`); };
        card.appendChild(img);
        card.addEventListener('click', () => handleChampionPreview(champ)); // РЕАЛИЗОВАНО НИЖЕ
        card.addEventListener('mouseover', (event) => showChampionTooltip(event, champ));
        card.addEventListener('mouseout', hideChampionTooltip);
        card.addEventListener('focus', (event) => showChampionTooltip(event, champ));
        card.addEventListener('blur', hideChampionTooltip);
        return card;
    }
    function displayChampions() {
        if (!championGridElement) { console.error("displayChampions: championGridElement not found"); return; }
        console.log(`Displaying ${processedChampions.length} champions...`);
        const fragment = document.createDocumentFragment();
        processedChampions.sort((a, b) => a.name[currentLanguage].localeCompare(b.name[currentLanguage], currentLanguage));
        processedChampions.forEach(champ => { fragment.appendChild(createChampionCard(champ)); });
        championGridElement.innerHTML = '';
        championGridElement.appendChild(fragment);
        filterChampions(); // РЕАЛИЗОВАНО НИЖЕ
        updateChampionAvailability(); // РЕАЛИЗОВАНО НИЖЕ
    }
    function showChampionTooltip(event, champion) { clearTimeout(tooltipTimeout); tooltipTimeout = setTimeout(() => { if (!championTooltip || !champion) return; championTooltip.innerHTML = `<strong class="tooltip-title">${champion.name[currentLanguage]}</strong><span class="tooltip-name">${champion.title[currentLanguage]}</span>`; championTooltip.style.visibility = 'hidden'; championTooltip.style.display = 'block'; const tooltipRect = championTooltip.getBoundingClientRect(); championTooltip.style.visibility = ''; championTooltip.style.display = ''; const targetRect = event.target.getBoundingClientRect(); let top = targetRect.top - tooltipRect.height - 8; let left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2); if (top < 0) top = targetRect.bottom + 8; if (left < 0) left = 5; else if (left + tooltipRect.width > window.innerWidth) left = window.innerWidth - tooltipRect.width - 5; championTooltip.style.left = `${left}px`; championTooltip.style.top = `${top}px`; championTooltip.classList.add('visible'); }, 100); }
    function hideChampionTooltip() { clearTimeout(tooltipTimeout); if (championTooltip) { championTooltip.classList.remove('visible'); } }


    // --- Восстановление состояния, Права, Слушатели драфта, Обновление UI ---

    /**
     * Восстанавливает состояние драфта из localStorage при загрузке страницы драфта.
     */
    function restoreDraftStateFromStorage() {
        if (!currentLobbyId) return;
        console.log(`Restoring state for lobby: ${currentLobbyId}`);

        // Получаем сохраненные значения или дефолтные
        const loadedStep = getLobbyItem('currentStep', 0);
        const loadedIsStarted = getLobbyItem('isDraftStarted', false);
        const loadedIsComplete = getLobbyItem('isDraftComplete', false);
        const loadedTimerDuration = getLobbyItem('draftTimerDuration', 30);
        const loadedTimerSeconds = getLobbyItem('timerSeconds', loadedTimerDuration);
        const loadedRoleFilter = getLobbyItem('currentRoleFilter', 'All');
        const loadedPriorityFilter = getLobbyItem('isPriorityFilterActive', false);
        const loadedBlueScore = getLobbyItem('blueScore', '');
        const loadedRedScore = getLobbyItem('redScore', '');
        const loadedSelectedChamps = getLobbyItem('selectedChampions', new Set()); // Теперь Set по умолчанию
        const loadedDraftHistory = getLobbyItem('draftHistory', []);
        const loadedPickNicknames = getLobbyItem('pickNicknames', {});
        const loadedGloballyDisabled = getLobbyItem('globallyDisabledChampions', new Set()); // Теперь Set по умолчанию
        const loadedGlobalBanHistory = getLobbyItem('globalBanHistory', []);
        const loadedPreviewedChampionId = getLobbyItem('previewedChampionId', null);

        // Очищаем все слоты перед восстановлением
        document.querySelectorAll('.pick-slot, .ban-slot').forEach(slot => {
            restoreSlotPlaceholder(slot, slot.id, ''); // РЕАЛИЗОВАНО НИЖЕ
        });

        // Заполняем слоты на основе истории
        loadedDraftHistory.forEach(action => {
            const champ = getChampionById(action.championId);
            const slotElement = document.getElementById(action.slotId);
            const nickname = loadedPickNicknames[action.slotId] || ''; // Берем ник из сохраненного состояния
            if (champ && slotElement) {
                fillSlot(slotElement, champ, action.type, nickname); // РЕАЛИЗОВАНО НИЖЕ
            } else {
                 console.warn(`Could not restore slot ${action.slotId}: Champion ${action.championId} or slot element not found.`);
            }
        });

        // Восстанавливаем счет
        if (blueScoreEl) blueScoreEl.textContent = loadedBlueScore;
        if (redScoreEl) redScoreEl.textContent = loadedRedScore;

        // Восстанавливаем фильтры
        if (championSearch) championSearch.value = ''; // Очищаем поиск при загрузке
        setLobbyItem('currentRoleFilter', loadedRoleFilter); // Обновляем состояние фильтра роли
        if (filterButtons) {
            filterButtons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.role === loadedRoleFilter);
            });
        }
        setLobbyItem('isPriorityFilterActive', loadedPriorityFilter); // Обновляем состояние фильтра приоритета
        if (newPriorityFilterButton) {
            newPriorityFilterButton.setAttribute('aria-pressed', loadedPriorityFilter.toString());
            // Title кнопки обновится в updateUIText
        }
        filterChampions(); // Применяем фильтры

        // Восстанавливаем предпросмотр (если был)
        setLobbyItem('previewedChampionId', loadedPreviewedChampionId);
        if (loadedPreviewedChampionId) {
            const previewChamp = getChampionById(loadedPreviewedChampionId);
            const draftOrder = getDraftOrder(); // РЕАЛИЗОВАНО НИЖЕ
            if (previewChamp && loadedStep < draftOrder.length) {
                const previewSlotId = draftOrder[loadedStep].slot;
                setLobbyItem('previewedSlotId', previewSlotId); // Сохраняем слот предпросмотра
                const previewSlotElement = document.getElementById(previewSlotId);
                if (previewSlotElement) {
                    // Заполняем слот для предпросмотра (без сохранения в историю)
                    const nickname = loadedPickNicknames[previewSlotId] || '';
                    fillSlot(previewSlotElement, previewChamp, draftOrder[loadedStep].type, nickname);
                    previewSlotElement.classList.add('preview-flash');
                }
            } else {
                // Сбрасываем предпросмотр, если он невалиден
                setLobbyItem('previewedChampionId', null);
                setLobbyItem('previewedSlotId', null);
            }
        } else {
             setLobbyItem('previewedSlotId', null);
        }


        // Восстанавливаем таймер
        setLobbyItem('draftTimerDuration', loadedTimerDuration);
        setLobbyItem('timerSeconds', loadedTimerSeconds);
        resetTimerDisplay(); // РЕАЛИЗОВАНО НИЖЕ

        // Отображаем глобальные баны
        displayGloballyBanned(); // РЕАЛИЗОВАНО НИЖЕ

        console.log(`State restored for lobby ${currentLobbyId}. Step: ${loadedStep}`);
        // Обновляем весь UI в конце
        updateDraftUI();
    }

     /**
     * Проверяет, имеет ли текущий пользователь разрешение на выполнение действия.
     * @param {string} action - Название действия (ключ в permissions).
     * @param {string | null} [team=null] - Команда, к которой относится действие ('blue' или 'red'), если применимо.
     * @returns {boolean} - true, если разрешение есть, иначе false.
     */
     function hasPermission(action, team = null) {
        const rolePerms = permissions[currentUserRole] || permissions.default;
        const isAdmin = currentUserRole === 'admin';
        const hasBasicPermission = isAdmin || rolePerms[action];

        if (!hasBasicPermission) {
            return false; // Нет базового разрешения
        }

        // Админ может все
        if (isAdmin) {
            return true;
        }

        // Проверка для командных действий (пик/бан/подтверждение/отмена)
        if ((action === 'pickChampion' || action === 'banChampion' || action === 'confirmAction' || action === 'undoAction') && team) {
            // Разрешено, если роль совпадает со стороной команды
            return userTeamSide === team;
        }

        // Для остальных действий достаточно базового разрешения
        return true;
    }

    /**
     * Применяет разрешения к элементам UI в зависимости от роли пользователя.
     * Включает/выключает кнопки, делает поля редактируемыми/нередактируемыми.
     * @param {string} role - Текущая роль пользователя.
     */
    function applyRolePermissions(role) {
        console.log(`Applying permissions for role: ${role}`);
        const can = (action, team = null) => hasPermission(action, team); // Удобная обертка

        // Основные кнопки управления
        if(timerDisplay) timerDisplay.disabled = !can('startDraft');
        if(resetButton) resetButton.disabled = !can('resetDraft');
        if(clearPicksButton) clearPicksButton.disabled = !can('clearDraft');
        if(undoButton) undoButton.disabled = !can('undoAction'); // Доступность undo зависит еще и от истории
        if(swapButton) swapButton.disabled = !can('swapSides');
        if(toggleTimerButton) toggleTimerButton.disabled = !can('toggleTimerDuration');
        if(confirmPickBanButton) confirmPickBanButton.disabled = !can('confirmAction'); // Доступность зависит еще и от предпросмотра
        if(newPriorityFilterButton) newPriorityFilterButton.disabled = !can('togglePriorityFilter');
        if(nextDraftButton) nextDraftButton.disabled = !can('nextDraft'); // Доступность зависит еще и от завершения драфта
        if(returnHomeButton) returnHomeButton.disabled = !can('returnHome');

        // Фильтры
        if(filterButtons) {
            filterButtons.forEach(btn => { btn.disabled = !can('useRoleFilters'); });
        }
        if(championSearch) championSearch.disabled = !can('useRoleFilters'); // Поиск тоже зависит от прав на фильтры

        // Редактируемые поля
        if(blueTeamNameH2) blueTeamNameH2.contentEditable = can('editTeamName');
        if(redTeamNameH2) redTeamNameH2.contentEditable = can('editTeamName');
        if(blueScoreEl) blueScoreEl.contentEditable = can('editScore');
        if(redScoreEl) redScoreEl.contentEditable = can('editScore');

        // Обновляем редактируемость никнеймов
        updateNicknameEditability();
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
     * Добавляет слушатели событий к элементам управления на странице драфта.
     * Вызывается один раз при инициализации страницы.
     */
    function addDraftEventListeners() {
        console.log("Attaching draft page event listeners...");

        // Кнопка старта/Таймер
        if (timerDisplay) timerDisplay.addEventListener('click', handleStartDraft); // РЕАЛИЗОВАНО НИЖЕ
        else console.warn("Listener not attached: timerDisplay not found");

        // Кнопка полного сброса
        if (resetButton) resetButton.addEventListener('click', () => {
            console.log("Reset button clicked");
            resetDraftFull(false); // РЕАЛИЗОВАНО НИЖЕ
        });
        else console.warn("Listener not attached: resetButton not found");

        // Кнопка очистки текущей игры
        if (clearPicksButton) clearPicksButton.addEventListener('click', () => {
            console.log("Clear Picks button clicked");
            resetCurrentGamePicksBans(false, true); // РЕАЛИЗОВАНО НИЖЕ
        });
        else console.warn("Listener not attached: clearPicksButton not found");

        // Кнопка отмены
        if (undoButton) undoButton.addEventListener('click', handleUndo); // РЕАЛИЗОВАНО НИЖЕ
        else console.warn("Listener not attached: undoButton not found");

        // Кнопка смены сторон
        if (swapButton) swapButton.addEventListener('click', handleSwapTeams); // Заглушка
        else console.warn("Listener not attached: swapButton not found");

        // Кнопка смены длительности таймера
        if (toggleTimerButton) toggleTimerButton.addEventListener('click', handleToggleTimer); // РЕАЛИЗОВАНО НИЖЕ
        else console.warn("Listener not attached: toggleTimerButton not found");

        // Кнопка подтверждения пика/бана
        if (confirmPickBanButton) confirmPickBanButton.addEventListener('click', handleConfirmPickBan); // РЕАЛИЗОВАНО НИЖЕ
        else console.warn("Listener not attached: confirmPickBanButton not found");

        // Кнопка фильтра приоритета
        if (newPriorityFilterButton) newPriorityFilterButton.addEventListener('click', handleNewPriorityFilterToggle); // Реализовано ранее
        else console.warn("Listener not attached: newPriorityFilterButton not found");

        // Кнопка следующего драфта
        if (nextDraftButton) nextDraftButton.addEventListener('click', handleNextDraft); // Заглушка
        else console.warn("Listener not attached: nextDraftButton not found");

        // Поле поиска
        if (championSearch) championSearch.addEventListener('input', debouncedFilter); // Реализовано ранее
        else console.warn("Listener not attached: championSearch not found");

        // Кнопки фильтра ролей
        if (filterButtons) {
            filterButtons.forEach((button) => {
                if (button) {
                    button.addEventListener('click', handleRoleFilterClick); // Реализовано ранее
                } else {
                    console.warn(`Listener not attached: a filter button was null`);
                }
            });
        } else { console.warn("Listener not attached: filterButtons collection is null/empty"); }

        // Клики по колонкам (для обмена пиками)
        if (blueColumn) blueColumn.addEventListener('click', handlePickContainerClick); // Заглушка
        else console.warn("Listener not attached: blueColumn not found");
        if (redColumn) redColumn.addEventListener('click', handlePickContainerClick); // Заглушка
        else console.warn("Listener not attached: redColumn not found");

        // Кнопка "Домой"
        if (returnHomeButton) returnHomeButton.addEventListener('click', () => {
            console.log("Return Home button clicked");
            navigateTo('home');
        });
        else console.warn("Listener not attached: returnHomeButton not found");

        // Слушатели для редактирования имен и счета
        [blueTeamNameH2, redTeamNameH2, blueScoreEl, redScoreEl].forEach(el => {
            if (el) {
                // Сохранение при потере фокуса
                el.addEventListener('blur', (e) => {
                    const isName = el.id.includes('name');
                    const permissionNeeded = isName ? 'editTeamName' : 'editScore';
                    if (!hasPermission(permissionNeeded)) return; // Проверка прав
                    const newValue = e.target.textContent.trim();
                    e.target.textContent = newValue; // Обновляем текст в элементе
                    const key = isName ? (el.id.includes('blue') ? 'team1Name' : 'team2Name') : (el.id.includes('blue') ? 'blueScore' : 'redScore');
                    if (isName) { localStorage.setItem(`${currentLobbyId}_${key}`, newValue); }
                    else { setLobbyItem(key, newValue); }
                    console.log(`Saved ${key}: ${newValue}`);
                });
                // Сохранение по Enter
                el.addEventListener('keydown', (e) => {
                    const permissionNeeded = el.id.includes('name') ? 'editTeamName' : 'editScore';
                    if (!hasPermission(permissionNeeded)) return; // Проверка прав
                    if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); }
                });
            } else { console.warn("Listener not attached: An editable H2/Score element was not found"); }
        });

        console.log("Draft page event listeners attached.");
    }

    /**
     * Обновляет состояние UI страницы драфта (кнопки, подсветка, блокировки).
     * Вызывается после каждого изменения состояния драфта.
     */
    function updateDraftUI() {
        if (!isDraftInitialized || !currentLobbyId) { console.warn("updateDraftUI called before draft initialization or without lobbyId."); return; }
        console.log(`Updating Draft UI for lobby ${currentLobbyId}`);

        const step = getLobbyItem('currentStep', 0);
        const isStarted = getLobbyItem('isDraftStarted', false);
        const isComplete = getLobbyItem('isDraftComplete', false);
        const history = getLobbyItem('draftHistory', []);
        const previewId = getLobbyItem('previewedChampionId', null);
        const previewChamp = previewId ? getChampionById(previewId) : null;
        const draftOrder = getDraftOrder();

        applyRolePermissions(currentUserRole); // Применяем базовые права

        document.querySelectorAll('.pick-slot, .ban-slot').forEach(el => { el.classList.remove('highlight-action', 'preview-flash', 'swap-selected'); });

        let currentActionTeam = null;
        let currentActionType = null;
        let currentActionSlotId = null;
        if (!isComplete && step < draftOrder.length) {
            const currentAction = draftOrder[step];
            currentActionTeam = currentAction.team;
            currentActionType = currentAction.type;
            currentActionSlotId = currentAction.slot;
        }

        // --- Управление доступностью кнопок ---
        const canConfirm = hasPermission('confirmAction', currentActionTeam);
        if (confirmPickBanButton) confirmPickBanButton.disabled = !canConfirm || !previewChamp || !isStarted || isComplete;

        const lastAction = history[history.length - 1];
        const canUndo = hasPermission('undoAction', lastAction?.team);
        if (undoButton) undoButton.disabled = !canUndo || history.length === 0 || !isStarted || isComplete;

        const canStart = hasPermission('startDraft');
        const canClear = hasPermission('clearDraft');
        const canReset = hasPermission('resetDraft');
        const canSwap = hasPermission('swapSides');
        const canToggleTimer = hasPermission('toggleTimerDuration');
        const canNext = hasPermission('nextDraft');
        const canUseFilters = hasPermission('useRoleFilters');
        const canTogglePriority = hasPermission('togglePriorityFilter');

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
            resetTimerDisplay();
            if (blueColumn) blueColumn.classList.add('draft-disabled');
            if (redColumn) redColumn.classList.add('draft-disabled');
            if (championGridElement) championGridElement.style.pointerEvents = 'none';
        } else if (!isComplete) {
            if (blueColumn) blueColumn.classList.remove('draft-disabled');
            if (redColumn) redColumn.classList.remove('draft-disabled');

            const activeSlotElement = document.getElementById(currentActionSlotId);
            if (activeSlotElement && (isAdminOrJudge() || userTeamSide === currentActionTeam)) {
                activeSlotElement.classList.add('highlight-action');
            }

            const previewSlotId = getLobbyItem('previewedSlotId', null);
            if (previewChamp && previewSlotId === currentActionSlotId) {
                 const previewSlotElement = document.getElementById(previewSlotId);
                 if (previewSlotElement) previewSlotElement.classList.add('preview-flash');
            }

            const isGridInteractive = hasPermission(currentActionType === 'pick' ? 'pickChampion' : 'banChampion', currentActionTeam);
            if (championGridElement) championGridElement.style.pointerEvents = isGridInteractive ? 'auto' : 'none';

            if (blueColumn) blueColumn.classList.toggle('role-disabled', !isAdminOrJudge() && userTeamSide === 'red');
            if (redColumn) redColumn.classList.toggle('role-disabled', !isAdminOrJudge() && userTeamSide === 'blue');

            if (!timerInterval && hasPermission('startDraft')) {
                 startTimer(); // Запускаем таймер, если он не идет
            }
        } else { // Драфт завершен
            stopTimer();
            if (timerDisplay) {
                timerDisplay.textContent = translations[currentLanguage].timerDraftCompleteText;
                timerDisplay.classList.add('timer-disabled');
                timerDisplay.disabled = true;
                timerDisplay.title = translations[currentLanguage].timerDraftCompleteTitle;
            }
            if (blueColumn) blueColumn.classList.remove('draft-disabled', 'role-disabled');
            if (redColumn) redColumn.classList.remove('draft-disabled', 'role-disabled');
            if (championGridElement) championGridElement.style.pointerEvents = 'none';

            document.querySelectorAll('.pick-slot').forEach(slot => {
                const champId = getSlotChampionId(slot.id);
                const canSwapPicks = canSwap && champId;
                slot.style.cursor = canSwapPicks ? 'pointer' : 'default';
                slot.title = canSwapPicks ? translations[currentLanguage].swapPickSelect : '';
            });
        }

        updateChampionAvailability();
        displayGloballyBanned();
        updateNicknameEditability();
        console.log("Draft UI updated.");
    }

    // --- Фильтрация и доступность чемпионов ---
    function filterChampions() {
        if (!isDraftInitialized || !championSearch || !championGridElement) return;
        const searchTerm = championSearch.value.toLowerCase().trim();
        const roleFilter = getLobbyItem('currentRoleFilter', 'All');
        const priorityFilterActive = getLobbyItem('isPriorityFilterActive', false);
        // console.log(`Filtering champions: Role=${roleFilter}, Priority=${priorityFilterActive}, Search="${searchTerm}"`);
        championGridElement.querySelectorAll('.champion-card').forEach(card => {
            const champId = card.dataset.championId;
            const nameEn = card.dataset.championNameEn || '';
            const nameRu = card.dataset.championNameRu || '';
            const champRoles = card.dataset.roles ? card.dataset.roles.split(',') : [];
            const searchMatch = searchTerm === '' || nameEn.includes(searchTerm) || nameRu.includes(searchTerm) || champId.toLowerCase().includes(searchTerm);
            const roleMatch = roleFilter === 'All' || champRoles.includes(roleFilter);
            const isPriority = priorityChampions.has(champId);
            const hideByPriorityFilter = priorityFilterActive && !isPriority;
            const isVisible = searchMatch && roleMatch && !hideByPriorityFilter;
            card.style.display = isVisible ? 'flex' : 'none';
        });
        updateChampionAvailability();
    }
    const debouncedFilter = debounce(filterChampions, 250);
    function updateChampionAvailability() {
        if (!isDraftInitialized || !currentLobbyId) return;
        const selectedSet = getLobbyItem('selectedChampions', new Set());
        const globallyDisabledSet = getLobbyItem('globallyDisabledChampions', new Set());
        const combinedDisabled = new Set([...selectedSet, ...globallyDisabledSet]);
        document.querySelectorAll('.champion-card').forEach(card => {
            const champId = card.dataset.championId;
            const isDisabled = combinedDisabled.has(champId);
            const isSelected = selectedSet.has(champId);
            card.classList.toggle('selected', isSelected && !isDisabled);
            card.classList.toggle('disabled', isDisabled);
            card.disabled = isDisabled;
            card.setAttribute('aria-disabled', isDisabled.toString());
        });
         // console.log("Champion availability updated."); // Слишком частое сообщение
    }

    // --- Логика действий драфта (Предпросмотр, Фильтры) ---
    function handleChampionPreview(champion) {
        const isStarted = getLobbyItem('isDraftStarted', false);
        const isComplete = getLobbyItem('isDraftComplete', false);
        const step = getLobbyItem('currentStep', 0);
        const draftOrder = getDraftOrder();
        if (!isStarted || isComplete || step >= draftOrder.length) return;
        const currentAction = draftOrder[step];
        const permissionNeeded = currentAction.type === 'pick' ? 'pickChampion' : 'banChampion';
        const permKey = currentAction.type === 'pick' ? 'permDeniedPreviewPick' : 'permDeniedPreviewBan';
        if (!hasPermission(permissionNeeded, currentAction.team)) { showStatusMessage(permKey, 2000); return; }
        const selectedSet = getLobbyItem('selectedChampions', new Set());
        const globallyDisabledSet = getLobbyItem('globallyDisabledChampions', new Set());
        const isDisabled = selectedSet.has(champion.id) || globallyDisabledSet.has(champion.id);
        if (isDisabled) { showStatusMessage("championAlreadySelected", 2000, { name: champion.name[currentLanguage] }); return; }
        const slotElement = document.getElementById(currentAction.slot);
        if (slotElement) {
            document.querySelectorAll('.preview-flash').forEach(el => el.classList.remove('preview-flash'));
            setLobbyItem('previewedChampionId', champion.id);
            setLobbyItem('previewedSlotId', currentAction.slot);
            const nicknames = getLobbyItem('pickNicknames', {});
            const existingNickname = nicknames[currentAction.slot] || '';
            fillSlot(slotElement, champion, currentAction.type, existingNickname); // РЕАЛИЗОВАНО НИЖЕ
            slotElement.classList.add('preview-flash');
            updateDraftUI();
        } else { console.warn(`Preview failed: Slot element ${currentAction.slot} not found.`); }
    }
    function handleRoleFilterClick(event) {
        const clickedButton = event.currentTarget;
        if (!clickedButton || clickedButton.disabled) return;
        const role = clickedButton.dataset.role;
        if (!role) return;
        if (!hasPermission('useRoleFilters')) { showStatusMessage("permDeniedRoleFilter", 2000); return; }
        setLobbyItem('currentRoleFilter', role);
        if (filterButtons) { filterButtons.forEach(btn => { btn.classList.remove('active'); }); clickedButton.classList.add('active'); }
        filterChampions();
    }
    function handleNewPriorityFilterToggle() {
        if (!hasPermission('togglePriorityFilter')) { showStatusMessage("permDeniedPriorityFilter", 2000); return; }
        let currentPriorityState = getLobbyItem('isPriorityFilterActive', false);
        currentPriorityState = !currentPriorityState;
        setLobbyItem('isPriorityFilterActive', currentPriorityState);
        if (newPriorityFilterButton) { newPriorityFilterButton.setAttribute('aria-pressed', currentPriorityState.toString()); const titleKey = currentPriorityState ? 'priorityFilterShowAllTitle' : 'priorityFilterShowPriorityTitle'; newPriorityFilterButton.title = translations[currentLanguage][titleKey] || titleKey; }
        filterChampions();
        showStatusMessage(currentPriorityState ? "priorityFilterOn" : "priorityFilterOff", 2000);
    }

    // --- НОВАЯ ЧАСТЬ: Основная логика драфта ---

    /**
     * Возвращает стандартный порядок пиков и банов.
     * @returns {Array<object>} - Массив объектов { team, type, slot }.
     */
    function getDraftOrder() {
        // Стандартный порядок для LoL 5v5
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

    /**
     * Заполняет слот изображением чемпиона и никнеймом (если это пик).
     * @param {HTMLElement} slotElement - DOM-элемент слота.
     * @param {object} champion - Объект чемпиона.
     * @param {'pick' | 'ban'} type - Тип действия.
     * @param {string} [nicknameText=''] - Текст никнейма.
     */
    function fillSlot(slotElement, champion, type, nicknameText = '') {
        if (!slotElement || !champion) {
             console.warn("fillSlot: slotElement or champion is missing.");
             return;
        }
        slotElement.innerHTML = ''; // Очищаем предыдущее содержимое
        slotElement.classList.remove('preview-flash'); // Убираем анимацию предпросмотра

        // Создаем и добавляем изображение
        const img = document.createElement('img');
        img.alt = champion.name[currentLanguage]; // Alt для доступности
        img.className = 'w-full h-full object-cover block absolute inset-0 z-0 pointer-events-none'; // Стили

        // Выбираем URL изображения: сплеш для пиков (если не мобильный), иконка для банов/мобильных
        let imageUrl;
        if (type === 'pick') {
            const isMobileView = window.innerWidth <= 768; // Примерная граница мобильного вида
            imageUrl = isMobileView ? champion.iconUrl : champion.splashUrl;
        } else { // ban
            imageUrl = champion.iconUrl;
        }
        img.src = imageUrl;

        // Обработчик ошибки загрузки
        img.onerror = () => {
            console.warn(`Failed to load image for ${champion.id} in slot ${slotElement.id}`);
            const errorSpan = document.createElement('span');
            errorSpan.className = 'text-[1.5vmin] text-red-400'; // Маленький красный текст
            errorSpan.textContent = 'Err';
            slotElement.innerHTML = ''; // Очищаем снова
            slotElement.appendChild(errorSpan);
            // Если это пик, все равно добавляем поле для ника
            if (type === 'pick') {
                addNicknameInput(slotElement, nicknameText); // РЕАЛИЗОВАНО НИЖЕ
            }
        };
        slotElement.appendChild(img);

        // Добавляем поле для никнейма, если это пик
        if (type === 'pick') {
            addNicknameInput(slotElement, nicknameText); // РЕАЛИЗОВАНО НИЖЕ
            slotElement.dataset.championId = champion.id; // Сохраняем ID пикнутого чемпиона
        } else {
            delete slotElement.dataset.championId; // Убираем ID, если это бан
        }

        // Обновляем aria-label слота
        const baseAriaLabel = slotElement.getAttribute('aria-label')?.split(':')[0] || (type === 'pick' ? `Pick ${slotElement.id.slice(-1)}` : `Ban ${slotElement.id.slice(-1)}`);
        slotElement.setAttribute('aria-label', `${baseAriaLabel}: ${champion.name[currentLanguage]}`);
    }

    /**
     * Добавляет редактируемое поле для никнейма в слот пика.
     * @param {HTMLElement} slotElement - DOM-элемент слота пика.
     * @param {string} [text=''] - Начальный текст никнейма.
     */
    function addNicknameInput(slotElement, text = '') {
        // Удаляем старый инпут, если он есть
        const oldInput = slotElement.querySelector('.nickname-input');
        if (oldInput) oldInput.remove();

        // Создаем новый div для ника
        const nicknameInput = document.createElement('div');
        nicknameInput.spellcheck = false; // Отключаем проверку орфографии
        nicknameInput.className = 'nickname-input'; // Класс для стилизации
        nicknameInput.textContent = text || ''; // Устанавливаем текст
        nicknameInput.dataset.slotId = slotElement.id; // Сохраняем ID слота

        // Устанавливаем плейсхолдер через data-атрибут (стили CSS используют ::before)
        const placeholderText = translations[currentLanguage]?.pickSlotNicknamePlaceholder || 'Player';
        nicknameInput.dataset.placeholder = placeholderText;

        // Устанавливаем редактируемость в зависимости от прав
        const canEdit = hasPermission('editNicknames');
        nicknameInput.contentEditable = canEdit;
        nicknameInput.style.cursor = canEdit ? 'text' : 'default';

        // Добавляем слушатели для сохранения, если можно редактировать
        if (canEdit) {
            nicknameInput.addEventListener('blur', (e) => { // Сохранение при потере фокуса
                const slotId = e.target.dataset.slotId;
                if (slotId && currentLobbyId) {
                    let nicknames = getLobbyItem('pickNicknames', {});
                    nicknames[slotId] = e.target.textContent.trim();
                    setLobbyItem('pickNicknames', nicknames);
                    console.log(`Nickname saved for ${slotId}: ${nicknames[slotId]}`);
                }
            });
             nicknameInput.addEventListener('keydown', (e) => { // Сохранение по Enter
                 if (e.key === 'Enter') {
                     e.preventDefault();
                     e.target.blur(); // Снять фокус для сохранения
                 }
             });
        }
        slotElement.appendChild(nicknameInput); // Добавляем поле в слот
    }

    /**
     * Восстанавливает пустой слот (удаляет изображение, очищает ник).
     * @param {HTMLElement} slotElement - DOM-элемент слота.
     * @param {string} slotId - ID слота.
     * @param {string} [nicknameText=''] - Текст для восстановления в поле ника (обычно пустой).
     */
    function restoreSlotPlaceholder(slotElement, slotId, nicknameText = '') {
        if (!slotElement) return;
        slotElement.innerHTML = ''; // Очищаем содержимое
        slotElement.classList.remove('preview-flash', 'swap-selected', 'highlight-action');
        delete slotElement.dataset.championId; // Удаляем ID чемпиона
        slotElement.style.backgroundImage = ''; // Убираем фон (на всякий случай)
        slotElement.style.cursor = 'default';
        slotElement.title = '';

        // Восстанавливаем базовый aria-label
        const isPick = slotId.includes('-pick-');
        const baseAriaLabel = slotElement.getAttribute('aria-label')?.split(':')[0] || (isPick ? `Pick ${slotId.slice(-1)}` : `Ban ${slotId.slice(-1)}`);
        slotElement.setAttribute('aria-label', `${baseAriaLabel}: Empty`);

        // Если это слот пика, добавляем пустое поле для ника
        if (isPick) {
            addNicknameInput(slotElement, nicknameText);
            // Убедимся, что в состоянии ник тоже очищен или установлен в nicknameText
            let nicknames = getLobbyItem('pickNicknames', {});
            nicknames[slotId] = nicknameText;
            setLobbyItem('pickNicknames', nicknames);
        } else {
            // Для банов удаляем ник из состояния, если он там был
            let nicknames = getLobbyItem('pickNicknames', {});
            if (nicknames.hasOwnProperty(slotId)) {
                 delete nicknames[slotId];
                 setLobbyItem('pickNicknames', nicknames);
            }
        }
    }

    /**
     * Получает ID чемпиона, находящегося в слоте.
     * @param {string} slotId - ID слота.
     * @returns {string | null} - ID чемпиона или null, если слот пуст или не найден.
     */
    function getSlotChampionId(slotId) {
        const slotElement = document.getElementById(slotId);
        return slotElement ? slotElement.dataset.championId : null;
    }

    /**
     * Обрабатывает подтверждение пика или бана.
     * Обновляет состояние драфта, историю, переходит к следующему шагу.
     */
    function handleConfirmPickBan() {
        console.log("handleConfirmPickBan called");
        const previewId = getLobbyItem('previewedChampionId', null);
        const isStarted = getLobbyItem('isDraftStarted', false);
        const isComplete = getLobbyItem('isDraftComplete', false);
        const step = getLobbyItem('currentStep', 0);
        const draftOrder = getDraftOrder();

        const championToConfirm = previewId ? getChampionById(previewId) : null;

        // Проверки: есть ли предпросмотр, начат ли драфт, не завершен ли он
        if (!championToConfirm || !isStarted || isComplete || step >= draftOrder.length) {
            console.warn("Confirmation failed: No preview or draft not in correct state.");
            return;
        }

        const currentAction = draftOrder[step];

        // Проверка прав на подтверждение для текущей команды
        if (!hasPermission('confirmAction', currentAction.team)) {
            showStatusMessage("permDeniedConfirm", 2000);
            return;
        }

        const slotElement = document.getElementById(currentAction.slot);
        const selectedSet = getLobbyItem('selectedChampions', new Set());
        const globallyDisabledSet = getLobbyItem('globallyDisabledChampions', new Set());
        const isDisabled = selectedSet.has(championToConfirm.id) || globallyDisabledSet.has(championToConfirm.id);

        // Дополнительная проверка, что слот найден и чемпион все еще доступен
        if (!slotElement || isDisabled) {
            console.warn("Confirmation failed: Slot not found or champion unavailable.");
            // Сбрасываем предпросмотр
            setLobbyItem('previewedChampionId', null);
            setLobbyItem('previewedSlotId', null);
            if (slotElement) slotElement.classList.remove('preview-flash');
            updateDraftUI(); // Обновляем UI (кнопка подтверждения станет неактивной)
            return;
        }

        console.log(`Confirming ${championToConfirm.id} for slot ${currentAction.slot} in lobby ${currentLobbyId}`);

        // Обновляем состояние
        let history = getLobbyItem('draftHistory', []);
        let nicknames = getLobbyItem('pickNicknames', {});
        const previousNickname = nicknames[currentAction.slot] || ''; // Сохраняем старый ник для отмены

        // Добавляем чемпиона в выбранные
        selectedSet.add(championToConfirm.id);
        setLobbyItem('selectedChampions', selectedSet);

        // Добавляем действие в историю
        history.push({
            championId: championToConfirm.id,
            slotId: currentAction.slot,
            step: step,
            previousNickname: previousNickname, // Сохраняем для отмены
            type: currentAction.type,
            team: currentAction.team
        });
        setLobbyItem('draftHistory', history);

        // Переходим к следующему шагу
        const nextStep = step + 1;
        setLobbyItem('currentStep', nextStep);

        // Сбрасываем предпросмотр
        setLobbyItem('previewedChampionId', null);
        setLobbyItem('previewedSlotId', null);

        // Проверяем, завершен ли драфт
        if (nextStep >= draftOrder.length) {
            setLobbyItem('isDraftComplete', true);
            console.log("Draft complete!");
            stopTimer(); // Останавливаем таймер при завершении
        } else {
            // Если драфт не завершен, сбрасываем и запускаем таймер для след. хода
            resetTimerDisplay();
            startTimer();
        }

        // Обновляем UI
        slotElement.classList.remove('preview-flash'); // Убираем анимацию с подтвержденного слота
        updateDraftUI();
        filterChampions(); // Обновляем фильтры (чемпион стал неактивным)
    }

    /**
     * Обрабатывает отмену последнего действия.
     */
    function handleUndo() {
        console.log("handleUndo called");
        let history = getLobbyItem('draftHistory', []);
        const isStarted = getLobbyItem('isDraftStarted', false);

        if (history.length === 0 || !isStarted) {
            console.warn("Undo failed: No history or draft not started.");
            return;
        }

        const lastAction = history[history.length - 1]; // Получаем последнее действие

        // Проверка прав на отмену для команды, совершившей действие
        if (!hasPermission('undoAction', lastAction.team)) {
            showStatusMessage("permDeniedUndo", 2000);
            return;
        }

        // Убираем выделение слотов для обмена (если было)
        deselectSwapSlots(); // Функция будет реализована позже

        // Удаляем последнее действие из истории
        history.pop();
        setLobbyItem('draftHistory', history);

        console.log("Undoing action:", lastAction);

        // Убираем чемпиона из выбранных
        let selectedSet = getLobbyItem('selectedChampions', new Set());
        selectedSet.delete(lastAction.championId);
        setLobbyItem('selectedChampions', selectedSet);

        // Восстанавливаем предыдущее состояние слота
        const slotElement = document.getElementById(lastAction.slotId);
        if (slotElement) {
            restoreSlotPlaceholder(slotElement, lastAction.slotId, lastAction.previousNickname); // Восстанавливаем с предыдущим ником
        }

        // Возвращаемся к предыдущему шагу
        setLobbyItem('currentStep', lastAction.step);

        // Сбрасываем флаг завершения и предпросмотр
        setLobbyItem('isDraftComplete', false);
        setLobbyItem('previewedChampionId', null);
        setLobbyItem('previewedSlotId', null);

        // Сбрасываем и перезапускаем таймер
        resetTimerDisplay();
        startTimer(); // Перезапускаем таймер для текущего (восстановленного) шага

        // Обновляем UI
        updateDraftUI();
        filterChampions(); // Обновляем доступность чемпиона
        showStatusMessage("actionUndone", 1500);
    }

    // --- НОВАЯ ЧАСТЬ: Управление Таймером ---

    /**
     * Форматирует время в секундах в строку MM:SS.
     * @param {number} seconds - Время в секундах.
     * @returns {string} - Отформатированная строка времени.
     */
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    /**
     * Останавливает интервал таймера.
     */
    function stopTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
            console.log("Timer stopped.");
        }
        if (timerDisplay) {
            timerDisplay.classList.remove('timer-running', 'timer-ending');
        }
    }

    /**
     * Сбрасывает отображение таймера к начальному значению (30 или 45 сек).
     */
    function resetTimerDisplay() {
        stopTimer(); // Сначала останавливаем текущий таймер
        const duration = getLobbyItem('draftTimerDuration', 30);
        setLobbyItem('timerSeconds', duration); // Устанавливаем полное время
        if (timerDisplay) {
            timerDisplay.textContent = formatTime(duration);
            // Доступность кнопки старта зависит от прав и состояния драфта (управляется в updateDraftUI)
            timerDisplay.classList.remove('timer-disabled', 'timer-running', 'timer-ending');
            timerDisplay.title = translations[currentLanguage].timerStartDraftTitle;
            timerDisplay.setAttribute('aria-label', translations[currentLanguage].timerAriaLabelStart);
        }
    }

    /**
     * Запускает таймер обратного отсчета.
     */
    function startTimer() {
        console.log("startTimer called");
        // Проверка прав не нужна здесь, т.к. вызывается из handleStartDraft или handleConfirmPickBan/handleUndo
        if (timerInterval) {
             console.warn("Timer already running.");
             return; // Не запускаем, если уже идет
        }

        let currentTimerSeconds = getLobbyItem('timerSeconds', getLobbyItem('draftTimerDuration', 30));
        if (!timerDisplay) { console.warn("startTimer: timerDisplay not found"); return; }

        // Начальное отображение
        timerDisplay.textContent = formatTime(currentTimerSeconds);
        timerDisplay.disabled = true; // Кнопка неактивна во время отсчета
        timerDisplay.classList.add('timer-running', 'timer-disabled');
        timerDisplay.title = translations[currentLanguage].timerDraftRunningTitle;
        timerDisplay.setAttribute('aria-label', translations[currentLanguage].timerAriaLabelRunning.replace('{time}', formatTime(currentTimerSeconds)));

        // Запускаем интервал
        timerInterval = setInterval(() => {
            currentTimerSeconds--;
            setLobbyItem('timerSeconds', currentTimerSeconds); // Сохраняем текущее время

            if (timerDisplay) {
                timerDisplay.textContent = formatTime(currentTimerSeconds);
                timerDisplay.setAttribute('aria-label', translations[currentLanguage].timerAriaLabelRunning.replace('{time}', formatTime(currentTimerSeconds)));

                // Добавляем/убираем класс для подсветки последних секунд
                if (currentTimerSeconds <= 10 && currentTimerSeconds > 0) {
                    timerDisplay.classList.add('timer-ending');
                } else {
                    timerDisplay.classList.remove('timer-ending');
                }
            }

            // Время вышло
            if (currentTimerSeconds <= 0) {
                stopTimer();
                if(timerDisplay) timerDisplay.classList.add('timer-ending'); // Оставляем красным
                console.log("Timer reached zero!");

                const step = getLobbyItem('currentStep', 0);
                const draftOrder = getDraftOrder();
                const currentPreviewId = getLobbyItem('previewedChampionId', null);
                const currentPreview = currentPreviewId ? getChampionById(currentPreviewId) : null;

                if (step < draftOrder.length) {
                    const currentAction = draftOrder[step];
                    if (currentAction.type === 'pick') {
                        // Если был предпросмотр пика - подтверждаем его
                        if (currentPreview && hasPermission('confirmAction', currentAction.team)) {
                            console.log("Timer ended during PICK phase. Auto-confirming:", currentPreview.id);
                            showStatusMessage("timerEndedPickConfirm", 3000, { name: currentPreview.name[currentLanguage] });
                            handleConfirmPickBan(); // Выполняем подтверждение
                        } else {
                            // Если не было предпросмотра или нет прав - сбрасываем текущую игру
                            console.log("Timer ended during PICK phase. No champion previewed or no permission. Clearing current game.");
                            showStatusMessage("timerEndedPickClear", 3000);
                            if (hasPermission('clearDraft')) { // Проверяем права на сброс
                                resetCurrentGamePicksBans(true, true); // Сбрасываем принудительно
                            } else {
                                // Если нет прав на сброс, просто останавливаемся
                                setLobbyItem('isDraftComplete', true); // Считаем драфт условно завершенным (зависшим)
                                updateDraftUI();
                            }
                        }
                    } else if (currentAction.type === 'ban') {
                        // Если время вышло на бане - пропускаем его
                        console.log("Timer ended during BAN phase. Skipping ban.");
                        showStatusMessage("timerEndedBanSkip", 2000);
                        const slotElement = document.getElementById(currentAction.slot);
                        if (slotElement) {
                            restoreSlotPlaceholder(slotElement, currentAction.slot, ''); // Очищаем слот
                        }
                        // Переходим к следующему шагу без добавления в историю
                        const nextStep = step + 1;
                        setLobbyItem('currentStep', nextStep);
                         // Проверяем завершение драфта
                        if (nextStep >= draftOrder.length) {
                            setLobbyItem('isDraftComplete', true);
                            console.log("Draft complete after skipping ban!");
                        } else {
                            resetTimerDisplay(); // Сбрасываем таймер для след. хода
                            startTimer(); // Запускаем таймер для след. хода
                        }
                        updateDraftUI(); // Обновляем UI
                    }
                } else {
                    console.log("Timer ended but draft already complete?");
                }
            }
        }, 1000); // Интервал в 1 секунду
        console.log("Timer started.");
    }

    /**
     * Обрабатывает клик по кнопке таймера (старт драфта).
     */
    function handleStartDraft() {
        console.log("handleStartDraft called");
        if (!hasPermission('startDraft')) {
            showStatusMessage("permDeniedStartDraft", 2000);
            return;
        }
        if (!getLobbyItem('isDraftStarted', false)) {
            console.log(`Starting draft for lobby ${currentLobbyId}...`);
            setLobbyItem('isDraftStarted', true);
            setLobbyItem('isDraftComplete', false);
            setLobbyItem('currentStep', 0); // Убедимся, что начинаем с 0 шага
            // Сброс предпросмотра на всякий случай
            setLobbyItem('previewedChampionId', null);
            setLobbyItem('previewedSlotId', null);

            resetTimerDisplay(); // Сбрасываем таймер на начальное значение
            startTimer(); // Запускаем таймер
            updateDraftUI(); // Обновляем UI (убираем блокировки и т.д.)
        } else {
             console.warn("Draft already started.");
        }
    }

    /**
     * Переключает длительность таймера между 30 и 45 секундами.
     */
    function handleToggleTimer() {
         console.log("handleToggleTimer called");
         if (!hasPermission('toggleTimerDuration')) {
             showStatusMessage("permDeniedToggleTimer", 2000);
             return;
         }
         // Нельзя менять во время активного драфта
         if (getLobbyItem('isDraftStarted', false)) {
             console.warn("Cannot toggle timer during an active draft.");
             return;
         }
         let currentDuration = getLobbyItem('draftTimerDuration', 30);
         currentDuration = currentDuration === 30 ? 45 : 30;
         setLobbyItem('draftTimerDuration', currentDuration);
         resetTimerDisplay(); // Обновляем отображение таймера
         // Обновляем title кнопки
         if(toggleTimerButton) toggleTimerButton.title = translations[currentLanguage].toggleTimerTitle;
         showStatusMessage("timerToggled", 1500, { duration: currentDuration });
         console.log("Timer duration set to:", currentDuration);
     }

    // --- НОВАЯ ЧАСТЬ: Функции сброса ---

    /**
     * Выполняет полный сброс драфта (пики, баны, ники, история, глобальные баны).
     * Требует подтверждения пользователя.
     * @param {boolean} [force=false] - Сбросить без подтверждения.
     */
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

        console.log(`Resetting FULL state for lobby: ${currentLobbyId}`);
        stopTimer(); // Останавливаем таймер

        // Очищаем ВСЕ состояние лобби в localStorage
        clearLobbyState();

        // Очищаем все слоты в UI
        document.querySelectorAll('.pick-slot, .ban-slot').forEach((slot) => {
            restoreSlotPlaceholder(slot, slot.id, ''); // Используем функцию очистки
            slot.classList.remove('highlight-action', 'preview-flash', 'swap-selected');
        });

        // Сбрасываем имена команд и счет в UI (они не хранятся в lobby state)
        const lobbyTeam1Key = `${currentLobbyId}_team1Name`;
        const lobbyTeam2Key = `${currentLobbyId}_team2Name`;
        if (blueTeamNameH2) blueTeamNameH2.textContent = localStorage.getItem(lobbyTeam1Key) || translations[currentLanguage].blueTeamDefaultName;
        if (redTeamNameH2) redTeamNameH2.textContent = localStorage.getItem(lobbyTeam2Key) || translations[currentLanguage].redTeamDefaultName;
        if (blueScoreEl) blueScoreEl.textContent = '';
        if (redScoreEl) redScoreEl.textContent = '';

        // Сбрасываем фильтры
        if (championSearch) championSearch.value = '';
        setLobbyItem('currentRoleFilter', 'All');
        setLobbyItem('isPriorityFilterActive', false);
        if (filterButtons) {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            const allButton = roleFilterButtonsContainer?.querySelector('[data-role="All"]');
            if(allButton) allButton.classList.add('active');
        }
        if (newPriorityFilterButton) {
            newPriorityFilterButton.setAttribute('aria-pressed', 'false');
        }

        // Обновляем UI
        resetTimerDisplay(); // Сброс таймера
        displayGloballyBanned(); // Очистка глобальных банов
        updateChampionAvailability(); // Обновление доступности чемпионов
        filterChampions(); // Применение сброшенных фильтров
        updateDraftUI(); // Обновление общего состояния UI
        updateUIText(currentLanguage); // Обновление текстов (на всякий случай)
        showStatusMessage("resetFullComplete", 2000);
    }

    /**
     * Сбрасывает только текущую игру (пики, баны, историю), сохраняя ники и глобальные баны.
     * Используется кнопкой "Очистить".
     * @param {boolean} [force=false] - Сбросить без подтверждения (если драфт идет).
     * @param {boolean} [keepGlobal=true] - Сохранять ли глобальные баны (обычно true для этой кнопки).
     */
    function resetCurrentGamePicksBans(force = false, keepGlobal = true) {
        console.log("--- resetCurrentGamePicksBans ---", { force, keepGlobal });
        if (!hasPermission('clearDraft')) {
            showStatusMessage("permDeniedClear", 2000);
            return;
        }

        const isStarted = getLobbyItem('isDraftStarted', false);
        const isComplete = getLobbyItem('isDraftComplete', false);

        // Запрашиваем подтверждение, только если драфт активно идет
        if (!force && isStarted && !isComplete) {
            const confirmationMessage = translations[currentLanguage].resetCurrentConfirmation;
            if (!confirm(confirmationMessage)) {
                console.log("Clear current game cancelled by user.");
                return;
            }
        }
        console.log(`Resetting CURRENT GAME state for lobby: ${currentLobbyId}, KeepGlobal: ${keepGlobal}`);

        stopTimer(); // Останавливаем таймер

        // 1. Сохраняем никнеймы перед очисткой
        const currentNicknames = getLobbyItem('pickNicknames', {});
        console.log("Nicknames read before clearing slots:", currentNicknames);

        // 2. Сбрасываем состояние текущего драфта
        setLobbyItem('currentStep', 0);
        setLobbyItem('draftHistory', []);
        // НЕ сбрасываем 'pickNicknames'
        setLobbyItem('isDraftComplete', false);
        setLobbyItem('isDraftStarted', false); // Останавливаем драфт
        setLobbyItem('previewedChampionId', null);
        setLobbyItem('previewedSlotId', null);
        setLobbyItem('timerSeconds', getLobbyItem('draftTimerDuration', 30)); // Сброс времени таймера

        // 3. Обрабатываем selectedChampions и глобальные баны
        let currentSelected = new Set();
        if (keepGlobal) {
            const currentGlobalDisabled = getLobbyItem('globallyDisabledChampions', new Set());
            currentGlobalDisabled.forEach(id => currentSelected.add(id));
            console.log("Keeping global bans.");
            // Не трогаем 'globallyDisabledChampions' и 'globalBanHistory'
        } else {
             // Этот блок не должен выполняться для кнопки "Очистить", но полезен для полного сброса
             setLobbyItem('globallyDisabledChampions', new Set());
             setLobbyItem('globalBanHistory', []);
             console.log("Global bans cleared for lobby.");
        }
        // Сохраняем только глобально забаненных (если keepGlobal=true)
        setLobbyItem('selectedChampions', currentSelected);

        // 4. Очищаем слоты в UI, сохраняя никнеймы
        console.log("Clearing UI slots, preserving nicknames...");
        document.querySelectorAll('.pick-slot, .ban-slot').forEach((slot) => {
            restoreSlotPlaceholder(slot, slot.id, currentNicknames[slot.id] || ''); // Восстанавливаем с сохраненным ником
        });
        console.log("Finished slot clearing loop.");

        // 5. Обновляем UI
        resetTimerDisplay(); // Обновляем таймер
        displayGloballyBanned(); // Обновляем показ глобальных банов
        updateChampionAvailability(); // Обновляем доступность чемпионов
        filterChampions(); // Применяем фильтры
        updateDraftUI(); // Обновляем общее состояние UI

        showStatusMessage("resetCurrentGameKeptInfo", 2500); // Сообщение о сохранении ников/глоб. банов
    }

    // --- НОВАЯ ЧАСТЬ: Отображение глобальных банов ---

    /**
     * Отображает иконки глобально забаненных чемпионов.
     */
    function displayGloballyBanned() {
        if (!globalBansBlueContainer || !globalBansRedContainer || !globallyBannedDisplay || !currentLobbyId) {
             console.warn("Cannot display global bans: elements not found or lobbyId missing.");
             return;
        }
        globalBansBlueContainer.innerHTML = ''; // Очищаем контейнеры
        globalBansRedContainer.innerHTML = '';

        const lobbyGlobalHistory = getLobbyItem('globalBanHistory', []); // Получаем историю глоб. банов

        if (lobbyGlobalHistory.length > 0) {
            globallyBannedDisplay.classList.remove('hidden'); // Показываем блок
            const blueFragment = document.createDocumentFragment();
            const redFragment = document.createDocumentFragment();

            lobbyGlobalHistory.forEach(banInfo => {
                const champ = getChampionById(banInfo.championId);
                if (champ) {
                    const iconDiv = document.createElement('div');
                    iconDiv.className = 'global-ban-icon'; // Класс для стилизации

                    // Формируем title (всплывающую подсказку)
                    const banTeamText = banInfo.team === 'blue'
                        ? translations[currentLanguage].globalBanTeamBlue
                        : translations[currentLanguage].globalBanTeamRed;
                    const titleText = translations[currentLanguage].globalBanTitle
                        .replace('{name}', champ.name[currentLanguage])
                        .replace('{team}', banTeamText);
                    iconDiv.title = titleText;
                    iconDiv.setAttribute('aria-label', titleText); // Для доступности

                    // Добавляем изображение
                    const img = document.createElement('img');
                    img.src = champ.iconUrl;
                    img.alt = ""; // Alt не нужен, есть aria-label
                    img.loading = 'lazy';
                    img.onerror = () => { // Обработчик ошибки загрузки
                        img.remove(); // Удаляем сломанное изображение
                        iconDiv.textContent = 'X'; // Показываем 'X' вместо иконки
                        iconDiv.style.fontSize = '20px';
                        iconDiv.style.textAlign = 'center';
                        iconDiv.style.lineHeight = 'var(--global-ban-icon-size)';
                    };
                    iconDiv.appendChild(img);

                    // Добавляем в нужный фрагмент
                    if (banInfo.team === 'blue') {
                        blueFragment.appendChild(iconDiv);
                    } else {
                        redFragment.appendChild(iconDiv);
                    }
                } else {
                    console.warn(`Global ban display: Champion not found for ID ${banInfo.championId}`);
                }
            });
            // Вставляем фрагменты в DOM
            globalBansBlueContainer.appendChild(blueFragment);
            globalBansRedContainer.appendChild(redFragment);
        } else {
            globallyBannedDisplay.classList.add('hidden'); // Скрываем блок, если банов нет
        }
    }


    // --- Заглушки для функций, которые будут реализованы позже ---
    function handleSwapTeams() { console.warn("handleSwapTeams() not implemented yet."); }
    function handleNextDraft() { console.warn("handleNextDraft() not implemented yet."); }
    function handlePickContainerClick(event) { console.warn("handlePickContainerClick() not implemented yet."); }
    function deselectSwapSlots() { console.warn("deselectSwapSlots() not implemented yet."); if (selectedSwapSlotId) { const prevSelected = document.getElementById(selectedSwapSlotId); if (prevSelected) { prevSelected.classList.remove('swap-selected'); } selectedSwapSlotId = null; } }
    function isAdminOrJudge() { return currentUserRole === 'admin' || currentUserRole === 'judge'; } // Простая проверка


    // --- Инициализация Роутинга при загрузке ---
    if(adminButton) adminButton.classList.remove('hidden');
    if(themeToggleButton) themeToggleButton.classList.remove('hidden');
    if(languageToggleButton) languageToggleButton.classList.remove('hidden');
    applyTheme(currentTheme);
    document.documentElement.lang = currentLanguage;
    updateUIText(currentLanguage);
    const initialParams = getParamsFromHash();
    if (initialParams) { navigateTo('draft'); } else { navigateTo('home'); }

    // --- Слушатель изменения хэша URL ---
    window.addEventListener('hashchange', () => { console.log("Hash changed:", window.location.hash); const newParams = getParamsFromHash(); if (newParams) { if (currentPage !== 'draft' || newParams.lobbyId !== currentLobbyId || newParams.role !== currentUserRole) { isDraftInitialized = false; navigateTo('draft'); } } else if (currentPage !== 'home') { navigateTo('home'); } });

    console.log("Initial setup complete. Application is running.");

}); // Конец DOMContentLoaded
