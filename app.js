const STORAGE_KEY = "typing-hero-player-v1";
const ROUND_LENGTH = 60;
const HISTORY_LIMIT = 1000;
const WORDS = {
  easy: [
    "beat",
    "flow",
    "keys",
    "glow",
    "drum",
    "riff",
    "song",
    "note",
    "rock",
    "play",
    "band",
    "tune",
    "star",
    "live",
    "bass",
    "chord",
    "stage",
    "sound",
    "light",
    "dream",
    "power",
    "dance",
    "music",
    "rhythm",
    "spark",
    "crowd",
    "groove",
    "encore",
  ],
  medium: [
    "backbeat",
    "headliner",
    "spotlight",
    "feedback",
    "playlist",
    "sidekick",
    "soundcheck",
    "starlight",
    "wildcard",
    "overdrive",
    "powerful",
    "harmony",
    "stomping",
    "festival",
    "firework",
    "amplifier",
    "stagecraft",
    "showtime",
    "rockstar",
    "headphones",
    "electric",
    "chordplay",
  ],
  hard: [
    "synchronicity",
    "unforgettable",
    "reverberation",
    "improvisation",
    "percussionist",
    "amplification",
    "thunderstruck",
    "transformation",
    "interference",
    "superstardom",
    "counterpoint",
    "electrifying",
    "revolutionary",
    "multitalented",
    "instrumental",
    "unmistakable",
    "collaboration",
    "synchronization",
    "extraordinary",
    "unpredictable",
    "overachiever",
    "grandstanding",
  ],
};
const DIFFICULTIES = {
  easy: {
    label: "WARM UP",
    summary: "A laid-back set to find your rhythm.",
    bpm: 88,
    fallTime: 8.5,
  },
  medium: {
    label: "HEADLINER",
    summary: "Turn up the tempo and keep the flow.",
    bpm: 112,
    fallTime: 6.2,
  },
  hard: {
    label: "ENCORE",
    summary: "Fast notes. Long words. Big energy.",
    bpm: 136,
    fallTime: 4.4,
  },
};
const AUDIO_STORAGE_KEY = "typing-hero-audio-enabled-v1";
const COACH_TIP_STORAGE_KEY = "typing-hero-last-tip-v1";
const COACH_TIPS = [
  "Aim for clean keystrokes; speed grows from accuracy.",
  "Keep your wrists relaxed and level with the keyboard.",
  "Use the correct finger instead of reaching with one finger.",
  "Glance at the next word while finishing the current one.",
  "Tap keys lightly; force slows your hands down.",
  "Return your fingers to the home row after reaching.",
  "Use one relaxed thumb for the space bar.",
  "Practice in short daily sessions to build consistency.",
  "Let your shoulders drop; tension makes typing harder.",
  "When you mistype, fix it calmly and keep your rhythm.",
  "Take a short break if your hands or wrists feel tired.",
  "Accuracy first; steady improvement beats frantic speed.",
  "Type whole words by rhythm instead of one letter at a time.",
  "Keep your eyes on the prompt instead of hunting for keys.",
  "Warm up at an easy pace before raising the tempo.",
  "Keep your fingers curved and close to the keys.",
  "Find a pace you can sustain for the whole set.",
  "Relax your hands between words without losing your focus.",
];
const XP_PER_LEVEL_BASE = 100;
const XP_PER_LEVEL_STEP = 50;
const LEVEL_TITLES = [
  { level: 50, title: "ROCK GOD" },
  { level: 20, title: "HEADLINER" },
  { level: 10, title: "RISING STAR" },
  { level: 5, title: "LOCAL LEGEND" },
  { level: 1, title: "BEDROOM BEGINNER" },
];
const ACHIEVEMENT_DEFINITIONS = [
  {
    id: "first-gig",
    title: "First Gig",
    description: "Complete your first Career set.",
    xp: 20,
  },
  {
    id: "speed-demon",
    title: "Speed Demon",
    description: "Reach 80 WPM in Career.",
    xp: 30,
  },
  {
    id: "perfect-performance",
    title: "Perfect Performance",
    description: "Finish a Career set with 100% accuracy.",
    xp: 25,
  },
  {
    id: "encore-legend",
    title: "Encore Legend",
    description: "Complete 25 Encore Career sets.",
    xp: 75,
  },
  {
    id: "streak-machine",
    title: "Streak Machine",
    description: "Reach a 50-word Career streak.",
    xp: 50,
  },
  {
    id: "regular-performer",
    title: "Regular Performer",
    description: "Complete 10 Career sets.",
    xp: 40,
  },
  {
    id: "getting-better",
    title: "Getting Better",
    description: "Set a new personal best in Career.",
    xp: 30,
  },
  {
    id: "daily-performer",
    title: "Daily Performer",
    description: "Complete a Daily Mix challenge.",
    xp: 25,
  },
];
const DAILY_CHALLENGE_TEMPLATES = [
  {
    id: "quick-tempo",
    title: "Quick Tempo",
    requirement: "Reach 35 WPM in one Career set.",
    type: "wpm",
    target: 35,
    rewardXp: 60,
  },
  {
    id: "clean-set",
    title: "Clean Set",
    requirement: "Complete 2 Career sets at 95% accuracy or better.",
    type: "accuracy-runs",
    target: 2,
    minimumAccuracy: 95,
    rewardXp: 75,
  },
  {
    id: "long-chain",
    title: "Long Chain",
    requirement: "Reach a 15-word streak in Career.",
    type: "streak",
    target: 15,
    rewardXp: 60,
  },
  {
    id: "triple-bill",
    title: "Triple Bill",
    requirement: "Complete 3 Career sets today.",
    type: "career-runs",
    target: 3,
    rewardXp: 75,
  },
  {
    id: "personal-best",
    title: "Raise The Bar",
    requirement: "Beat your personal best in a Career set.",
    type: "personal-best",
    target: 1,
    rewardXp: 75,
  },
];

const $ = (selector) => document.querySelector(selector);
const ui = {
  profileButton: $("#profile-button"),
  headerAvatar: $("#header-avatar"),
  headerName: $("#header-name"),
  headerStatus: $("#header-status"),
  bestWpm: $("#best-wpm"),
  bestDetail: $("#best-detail"),
  lastWpm: $("#last-wpm"),
  lastDetail: $("#last-detail"),
  totalSets: $("#total-sets"),
  setsDetail: $("#sets-detail"),
  averageWpm: $("#average-wpm"),
  averageAccuracy: $("#average-accuracy"),
  performanceRounds: $("#performance-rounds"),
  longestStreak: $("#longest-streak"),
  bestWpmEasy: $("#best-wpm-easy"),
  bestWpmMedium: $("#best-wpm-medium"),
  bestWpmHard: $("#best-wpm-hard"),
  performanceChart: $("#performance-chart"),
  trendRange: $("#trend-range"),
  trendComparison: $("#trend-comparison"),
  dailyChip: $("#daily-chip"),
  dailySummary: $("#daily-summary"),
  dailyDialog: $("#daily-dialog"),
  dailyClose: $("#daily-close"),
  dailyTitle: $("#daily-title"),
  dailyRequirement: $("#daily-requirement"),
  dailyProgress: $("#daily-progress"),
  dailyProgressFill: $("#daily-progress-fill"),
  dailyProgressLabel: $("#daily-progress-label"),
  dailyCountdown: $("#daily-countdown"),
  dailyReward: $("#daily-reward"),
  dailyPlayCareer: $("#daily-play-career"),
  achievementList: $("#achievement-list"),
  achievementSummary: $("#achievement-summary"),
  achievementUnlocks: $("#achievement-unlocks"),
  achievementUnlockList: $("#achievement-unlock-list"),
  dailyResult: $("#daily-result"),
  dailyResultCopy: $("#daily-result-copy"),
  difficultySummary: $("#difficulty-summary"),
  songDifficulty: $("#song-difficulty"),
  difficultyPanel: $("#difficulty-panel"),
  careerPanel: $("#career-panel"),
  careerLevel: $("#career-level"),
  careerTitle: $("#career-title"),
  careerDifficulty: $("#career-difficulty"),
  careerDifficultyDetail: $("#career-difficulty-detail"),
  openMicMode: $("#open-mic-mode"),
  careerMode: $("#career-mode"),
  progressionStrip: $("#progression-strip"),
  coachTip: $("#coach-tip"),
  tipNumber: $("#tip-number"),
  playerLevel: $("#player-level"),
  playerTitle: $("#player-title"),
  totalXp: $("#total-xp"),
  levelProgress: $("#level-progress"),
  levelProgressFill: $("#level-progress-fill"),
  levelProgressLabel: $("#level-progress-label"),
  gamePanel: $("#game-panel"),
  gameSubtitle: $("#game-subtitle"),
  gameTitle: $("#game-title"),
  highway: $("#highway"),
  highwayInstruction: $("#highway-instruction"),
  typingInput: $("#typing-input"),
  inputWrap: $(".typing-input-wrap"),
  inputHint: $("#input-hint"),
  promptLabel: $("#prompt-label"),
  promptWord: $("#prompt-word"),
  keyboardVisualization: $("#keyboard-visualization"),
  score: $("#score-value"),
  streak: $("#streak-value"),
  timer: $("#timer-value"),
  timerBox: $(".timer-box"),
  accuracy: $("#accuracy-value"),
  liveWpm: $("#live-wpm"),
  restartButton: $("#restart-button"),
  playButton: $("#play-button"),
  playButtonLabel: $("#play-button-label"),
  soundToggle: $("#sound-toggle"),
  backgroundMusic: $("#background-music"),
  resultsCheer: $("#results-cheer"),
  hitFlash: $("#hit-flash"),
  historyList: $("#history-list"),
  historyMore: $("#history-more"),
  profileDialog: $("#profile-dialog"),
  profileForm: $("#profile-form"),
  profileName: $("#profile-name"),
  dialogClose: $("#dialog-close"),
  resultsDialog: $("#results-dialog"),
  resultsClose: $("#results-close"),
  resultsPlayAgain: $("#results-play-again"),
  resultsReturn: $("#results-return"),
  toast: $("#toast"),
};

let player = loadPlayer();
let difficulty = "easy";
let gameMode = "openMic";
let performanceDays = 7;
let round = null;
let toastTimeout;
let audioContext = null;
let masterGain = null;
let noiseBuffer = null;
let soundEnabled = loadSoundPreference();

function loadSoundPreference() {
  try {
    return localStorage.getItem(AUDIO_STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
}

function getAudioContext() {
  if (audioContext) return audioContext;
  const Context = window.AudioContext || window.webkitAudioContext;
  if (!Context) return null;
  audioContext = new Context();
  masterGain = audioContext.createGain();
  masterGain.gain.value = 0.3;
  const compressor = audioContext.createDynamicsCompressor();
  compressor.threshold.value = -18;
  compressor.knee.value = 16;
  compressor.ratio.value = 8;
  masterGain.connect(compressor);
  compressor.connect(audioContext.destination);
  return audioContext;
}

function getNoiseBuffer() {
  if (noiseBuffer || !audioContext) return noiseBuffer;
  noiseBuffer = audioContext.createBuffer(
    1,
    audioContext.sampleRate,
    audioContext.sampleRate,
  );
  const samples = noiseBuffer.getChannelData(0);
  for (let index = 0; index < samples.length; index += 1) {
    samples[index] = Math.random() * 2 - 1;
  }
  return noiseBuffer;
}

function playTone(
  frequency,
  startTime,
  duration,
  volume,
  waveform = "triangle",
) {
  if (!audioContext || !masterGain) return;
  const oscillator = audioContext.createOscillator();
  const envelope = audioContext.createGain();
  oscillator.type = waveform;
  oscillator.frequency.setValueAtTime(frequency, startTime);
  envelope.gain.setValueAtTime(0.0001, startTime);
  envelope.gain.exponentialRampToValueAtTime(volume, startTime + 0.012);
  envelope.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  oscillator.connect(envelope);
  envelope.connect(masterGain);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.02);
}

function playNoise(
  startTime,
  duration,
  volume,
  filterType,
  frequencyStart,
  frequencyEnd = frequencyStart,
) {
  if (!audioContext || !masterGain) return;
  const source = audioContext.createBufferSource();
  const filter = audioContext.createBiquadFilter();
  const envelope = audioContext.createGain();
  source.buffer = getNoiseBuffer();
  filter.type = filterType;
  filter.frequency.setValueAtTime(frequencyStart, startTime);
  filter.frequency.linearRampToValueAtTime(frequencyEnd, startTime + duration);
  envelope.gain.setValueAtTime(0.0001, startTime);
  envelope.gain.linearRampToValueAtTime(volume, startTime + 0.025);
  envelope.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  source.connect(filter);
  filter.connect(envelope);
  envelope.connect(masterGain);
  source.start(startTime);
  source.stop(startTime + duration + 0.02);
}

function startSoundtrack() {
  if (!soundEnabled) return;
  const context = getAudioContext();
  if (context && context.state !== "running") context.resume().catch(() => {});
  ui.backgroundMusic.volume = 0.28;
  const playAttempt = ui.backgroundMusic.play();
  if (playAttempt?.catch) {
    playAttempt.catch(() => showToast("The soundtrack could not be started."));
  }
}

function stopSoundtrack() {
  ui.backgroundMusic.pause();
  if (Number.isFinite(ui.backgroundMusic.duration)) {
    ui.backgroundMusic.currentTime = 0;
  }
}

function stopResultsCheer() {
  ui.resultsCheer.pause();
  if (Number.isFinite(ui.resultsCheer.duration)) {
    ui.resultsCheer.currentTime = 0;
  }
}

function playResultsCheer() {
  if (!soundEnabled) return;
  ui.resultsCheer.volume = 0.9;
  if (Number.isFinite(ui.resultsCheer.duration)) {
    ui.resultsCheer.currentTime = 0;
  }
  const playAttempt = ui.resultsCheer.play();
  if (playAttempt?.catch) {
    playAttempt.catch(() =>
      showToast("The results cheer could not be played."),
    );
  }
}

function playCrowdCue(reaction) {
  if (!soundEnabled || !audioContext || !masterGain) return;
  if (audioContext.state !== "running") {
    audioContext
      .resume()
      .then(() => {
        if (soundEnabled && audioContext.state === "running") {
          playCrowdCue(reaction);
        }
      })
      .catch(() => {});
    return;
  }
  const now = audioContext.currentTime + 0.01;
  if (reaction === "cheer" || reaction === "finale") {
    const isFinale = reaction === "finale";
    const cheerLength = isFinale ? 1.45 : 0.48;
    playNoise(
      now,
      cheerLength,
      isFinale ? 0.42 : 0.1,
      "bandpass",
      isFinale ? 500 : 650,
      isFinale ? 1750 : 1450,
    );
    if (isFinale) {
      [0.24, 0.58, 0.94].forEach((offset) => {
        playNoise(now + offset, 0.2, 0.22, "highpass", 1800, 4200);
      });
    }
    const frequencies = isFinale
      ? [294, 349, 392, 440, 494, 587, 659, 784]
      : [392, 494, 587, 659];
    frequencies.forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const envelope = audioContext.createGain();
      const start = now + index * (isFinale ? 0.035 : 0.018);
      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(frequency, start);
      oscillator.frequency.linearRampToValueAtTime(
        frequency * (isFinale ? 1.2 : 1.16),
        start + (isFinale ? 0.45 : 0.2),
      );
      envelope.gain.setValueAtTime(0.0001, start);
      envelope.gain.linearRampToValueAtTime(
        isFinale ? 0.12 : 0.035,
        start + 0.06,
      );
      envelope.gain.exponentialRampToValueAtTime(
        0.0001,
        start + (isFinale ? 1.05 : 0.34),
      );
      oscillator.connect(envelope);
      envelope.connect(masterGain);
      oscillator.start(start);
      oscillator.stop(start + (isFinale ? 1.08 : 0.36));
    });
    return;
  }
  playNoise(now, 0.34, 0.07, "bandpass", 950, 420);
  [220, 185, 155].forEach((frequency, index) => {
    playTone(frequency, now + index * 0.025, 0.28, 0.035, "sawtooth");
  });
}

function loadPlayer() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (
      saved &&
      typeof saved.name === "string" &&
      Array.isArray(saved.history)
    ) {
      const progression =
        saved.progression && typeof saved.progression === "object"
          ? saved.progression
          : {};
      const history = saved.history
        .filter((run) => run && typeof run === "object" && !Array.isArray(run))
        .slice(0, HISTORY_LIMIT);
      const savedPerformance =
        saved.performance && typeof saved.performance === "object"
          ? saved.performance
          : {};
      const historicalWpm = history.reduce(
        (total, run) => total + (Number(run.wpm) || 0),
        0,
      );
      const historicalAccuracy = history.reduce(
        (total, run) => total + (Number(run.accuracy) || 0),
        0,
      );
      const historicalBestWpm = history.reduce(
        (best, run) => Math.max(best, Number(run.wpm) || 0),
        0,
      );
      const dailyByDate = {};
      const cutoffDate = new Date();
      cutoffDate.setHours(0, 0, 0, 0);
      cutoffDate.setDate(cutoffDate.getDate() - 89);
      const cutoffDateKey = localDateKey(cutoffDate);
      for (const run of history) {
        const date = new Date(run.date);
        if (Number.isNaN(date.getTime())) continue;
        const dateKey = localDateKey(date);
        if (dateKey < cutoffDateKey) continue;
        const bucket = dailyByDate[dateKey] ?? {
          count: 0,
          totalWpm: 0,
          totalAccuracy: 0,
        };
        bucket.count += 1;
        bucket.totalWpm += Number(run.wpm) || 0;
        bucket.totalAccuracy += Number(run.accuracy) || 0;
        dailyByDate[dateKey] = bucket;
      }
      const savedDailyByDate =
        savedPerformance.dailyByDate &&
        typeof savedPerformance.dailyByDate === "object"
          ? savedPerformance.dailyByDate
          : {};
      for (const [dateKey, bucket] of Object.entries(savedDailyByDate)) {
        if (
          !/^\d{4}-\d{2}-\d{2}$/.test(dateKey) ||
          dateKey < cutoffDateKey ||
          !bucket ||
          typeof bucket !== "object"
        ) {
          continue;
        }
        const count = Number.isFinite(bucket.count)
          ? Math.max(0, Math.floor(bucket.count))
          : 0;
        if (!count) continue;
        dailyByDate[dateKey] = {
          count,
          totalWpm: Number.isFinite(bucket.totalWpm)
            ? Math.max(0, bucket.totalWpm)
            : 0,
          totalAccuracy: Number.isFinite(bucket.totalAccuracy)
            ? Math.max(0, bucket.totalAccuracy)
            : 0,
        };
      }
      const savedDifficultyBests =
        savedPerformance.bestWpmByDifficulty &&
        typeof savedPerformance.bestWpmByDifficulty === "object"
          ? savedPerformance.bestWpmByDifficulty
          : {};
      const bestWpmByDifficulty = Object.fromEntries(
        Object.entries(DIFFICULTIES).map(([key, info]) => {
          const savedBest = Number.isFinite(savedDifficultyBests[key])
            ? Math.max(0, savedDifficultyBests[key])
            : 0;
          const historyBest = history.reduce(
            (best, run) =>
              run.difficulty === info.label
                ? Math.max(best, Number(run.wpm) || 0)
                : best,
            0,
          );
          return [key, Math.max(savedBest, historyBest)];
        }),
      );
      const totalRounds = Number.isFinite(savedPerformance.totalRounds)
        ? Math.max(history.length, Math.floor(savedPerformance.totalRounds))
        : history.length;
      const longestHistoryStreak = history.reduce(
        (best, run) => Math.max(best, Number(run.bestStreak) || 0),
        0,
      );
      const storedBestWpm = Number.isFinite(savedPerformance.bestWpm)
        ? Math.max(0, savedPerformance.bestWpm)
        : 0;
      return {
        name: saved.name,
        history,
        performance: {
          totalRounds,
          totalWpm: Number.isFinite(savedPerformance.totalWpm)
            ? Math.max(0, savedPerformance.totalWpm)
            : historicalWpm,
          totalAccuracy: Number.isFinite(savedPerformance.totalAccuracy)
            ? Math.max(0, savedPerformance.totalAccuracy)
            : historicalAccuracy,
          longestStreak: Math.max(
            Number.isFinite(savedPerformance.longestStreak)
              ? Math.max(0, savedPerformance.longestStreak)
              : 0,
            longestHistoryStreak,
          ),
          bestWpm: Math.max(
            storedBestWpm,
            historicalBestWpm,
            ...Object.values(bestWpmByDifficulty),
          ),
          bestWpmByDifficulty,
          dailyByDate,
        },
        progression: {
          totalXp: Number.isFinite(progression.totalXp)
            ? Math.min(
                1_000_000_000,
                Math.max(0, Math.floor(progression.totalXp)),
              )
            : 0,
          awardedRoundIds: Array.isArray(progression.awardedRoundIds)
            ? progression.awardedRoundIds
                .filter((roundId) => typeof roundId === "string")
                .slice(-100)
            : [],
        },
        achievements: Array.isArray(saved.achievements)
          ? [...new Set(saved.achievements)].filter((id) =>
              ACHIEVEMENT_DEFINITIONS.some(
                (achievement) => achievement.id === id,
              ),
            )
          : [],
        dailyChallenge:
          saved.dailyChallenge &&
          typeof saved.dailyChallenge.date === "string" &&
          typeof saved.dailyChallenge.challengeId === "string"
            ? {
                date: saved.dailyChallenge.date,
                challengeId: saved.dailyChallenge.challengeId,
                progress: Number.isFinite(saved.dailyChallenge.progress)
                  ? Math.max(0, Math.floor(saved.dailyChallenge.progress))
                  : 0,
                completed: saved.dailyChallenge.completed === true,
                rewarded: saved.dailyChallenge.rewarded === true,
              }
            : null,
      };
    }
  } catch {
    /* Start with a fresh local player if storage is unavailable. */
  }
  return {
    name: "",
    history: [],
    performance: {
      totalRounds: 0,
      totalWpm: 0,
      totalAccuracy: 0,
      longestStreak: 0,
      bestWpm: 0,
      bestWpmByDifficulty: { easy: 0, medium: 0, hard: 0 },
      dailyByDate: {},
    },
    progression: { totalXp: 0, awardedRoundIds: [] },
    achievements: [],
    dailyChallenge: null,
  };
}

function getCareerDifficulty(level) {
  if (level >= 10) return "hard";
  if (level >= 5) return "medium";
  return "easy";
}

function getUtcDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function getDailyChallengeDefinition(dateKey = getUtcDateKey()) {
  let hash = 2166136261;
  for (const character of dateKey) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  const index = (hash >>> 0) % DAILY_CHALLENGE_TEMPLATES.length;
  return { ...DAILY_CHALLENGE_TEMPLATES[index], date: dateKey };
}

function ensureDailyChallengeDate() {
  const date = getUtcDateKey();
  const definition = getDailyChallengeDefinition(date);
  if (
    player.dailyChallenge?.date === date &&
    player.dailyChallenge.challengeId === definition.id
  ) {
    return false;
  }
  player.dailyChallenge = {
    date,
    challengeId: definition.id,
    progress: 0,
    completed: false,
    rewarded: false,
  };
  return true;
}

function getDailyProgressText(challenge, dailyState) {
  if (dailyState.completed) return "COMPLETED";
  switch (challenge.type) {
    case "wpm":
      return `${dailyState.progress} / ${challenge.target} WPM`;
    case "accuracy-runs":
      return `${dailyState.progress} / ${challenge.target} qualifying sets`;
    case "streak":
      return `${dailyState.progress} / ${challenge.target} words`;
    case "career-runs":
      return `${dailyState.progress} / ${challenge.target} Career sets`;
    case "personal-best":
      return `${dailyState.progress} / 1 personal best`;
    default:
      return "0 / 1";
  }
}

function getDailyProgressTarget(challenge) {
  return challenge.type === "personal-best" ? 1 : challenge.target;
}

function formatDailyCountdown() {
  const now = new Date();
  const nextUtcMidnight = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
  );
  const minutesLeft = Math.max(
    0,
    Math.floor((nextUtcMidnight - now.getTime()) / 60000),
  );
  const hours = Math.floor(minutesLeft / 60);
  const minutes = minutesLeft % 60;
  return `${String(hours).padStart(2, "0")}H ${String(minutes).padStart(2, "0")}M`;
}

function updateDailyChallengeUI() {
  if (ensureDailyChallengeDate()) savePlayer();
  const dailyState = player.dailyChallenge;
  const challenge = getDailyChallengeDefinition(dailyState.date);
  const target = getDailyProgressTarget(challenge);
  const progress = Math.min(dailyState.progress, target);
  const progressText = getDailyProgressText(challenge, dailyState);
  const percent = target ? Math.floor((progress / target) * 100) : 0;
  const resetText = `NEXT MIX IN ${formatDailyCountdown()} UTC`;

  ui.dailyTitle.textContent = challenge.title;
  ui.dailyRequirement.textContent = challenge.requirement;
  ui.dailyProgressLabel.textContent = `${progressText} · ${dailyState.date}`;
  ui.dailyReward.textContent = dailyState.rewarded
    ? "REWARD CLAIMED"
    : `+${challenge.rewardXp} XP`;
  ui.dailyProgressFill.style.width = `${percent}%`;
  ui.dailyProgress.setAttribute("aria-valuemax", String(target));
  ui.dailyProgress.setAttribute("aria-valuenow", String(progress));
  ui.dailyCountdown.textContent = dailyState.completed
    ? `CHALLENGE COMPLETE · ${resetText}`
    : resetText;
  ui.dailySummary.textContent = dailyState.completed
    ? `COMPLETE · +${challenge.rewardXp} XP`
    : `${challenge.title} · ${progressText}`;
  ui.dailyChip.setAttribute(
    "aria-label",
    `Daily Mix: ${challenge.title}. ${challenge.requirement} ${progressText}. ${resetText}.`,
  );
}

function renderAchievements() {
  const unlockedIds = new Set(player.achievements);
  ui.achievementSummary.textContent = `${unlockedIds.size} / ${ACHIEVEMENT_DEFINITIONS.length} UNLOCKED`;
  ui.achievementList.innerHTML = ACHIEVEMENT_DEFINITIONS.map((achievement) => {
    const unlocked = unlockedIds.has(achievement.id);
    return `<div class="achievement-item ${unlocked ? "is-unlocked" : "is-locked"}" role="listitem"><span class="achievement-icon" aria-hidden="true">${unlocked ? "✓" : "◇"}</span><span class="achievement-copy"><strong>${achievement.title}</strong><small>${achievement.description}</small></span><span class="achievement-xp">${unlocked ? "UNLOCKED" : `+${achievement.xp} XP`}</span></div>`;
  }).join("");
}

function unlockAchievement(achievementId) {
  const achievement = ACHIEVEMENT_DEFINITIONS.find(
    (entry) => entry.id === achievementId,
  );
  if (!achievement || player.achievements.includes(achievementId)) return null;
  player.achievements.push(achievementId);
  player.progression.totalXp += achievement.xp;
  return achievement;
}

function unlockEligibleAchievements({ roundResult, previousBestWpm }) {
  const careerHistory = player.history.filter((run) => run.mode === "career");
  const encoreRuns = careerHistory.filter(
    (run) => run.difficulty === "ENCORE",
  ).length;
  const attempts =
    roundResult.correctWords + roundResult.errors + roundResult.misses;
  const eligible = {
    "first-gig": careerHistory.length >= 1,
    "speed-demon": roundResult.wpm >= 80,
    "perfect-performance": attempts > 0 && roundResult.accuracy === 100,
    "encore-legend": encoreRuns >= 25,
    "streak-machine": roundResult.bestStreak >= 50,
    "regular-performer": careerHistory.length >= 10,
    "getting-better": previousBestWpm > 0 && roundResult.wpm > previousBestWpm,
    "daily-performer": player.dailyChallenge?.completed === true,
  };
  return ACHIEVEMENT_DEFINITIONS.filter(
    (achievement) => eligible[achievement.id],
  )
    .map((achievement) => unlockAchievement(achievement.id))
    .filter(Boolean);
}

function updateDailyChallengeForRound({ roundResult, previousBestWpm }) {
  ensureDailyChallengeDate();
  const dailyState = player.dailyChallenge;
  if (dailyState.completed) {
    return { completedNow: false, bonusXp: 0 };
  }
  const challenge = getDailyChallengeDefinition(dailyState.date);
  switch (challenge.type) {
    case "wpm":
      dailyState.progress = Math.max(dailyState.progress, roundResult.wpm);
      break;
    case "accuracy-runs":
      if (roundResult.accuracy >= challenge.minimumAccuracy) {
        dailyState.progress = Math.min(
          challenge.target,
          dailyState.progress + 1,
        );
      }
      break;
    case "streak":
      dailyState.progress = Math.max(
        dailyState.progress,
        roundResult.bestStreak,
      );
      break;
    case "career-runs":
      dailyState.progress = Math.min(challenge.target, dailyState.progress + 1);
      break;
    case "personal-best":
      if (roundResult.wpm > previousBestWpm) dailyState.progress = 1;
      break;
  }
  const completedNow = dailyState.progress >= getDailyProgressTarget(challenge);
  let bonusXp = 0;
  if (completedNow) {
    dailyState.completed = true;
    if (!dailyState.rewarded) {
      dailyState.rewarded = true;
      bonusXp = challenge.rewardXp;
      player.progression.totalXp += bonusXp;
    }
  }
  return { completedNow, bonusXp };
}

function savePlayer() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
  } catch {
    showToast("Could not save profile on this device.");
  }
}

function getLevelInfo(totalXp) {
  const xp = Math.max(0, Math.floor(Number(totalXp) || 0));
  const completedLevels = Math.floor((Math.sqrt(75 ** 2 + 100 * xp) - 75) / 50);
  const xpAtLevelStart = 25 * completedLevels ** 2 + 75 * completedLevels;
  const level = completedLevels + 1;
  const xpForNextLevel =
    XP_PER_LEVEL_BASE + completedLevels * XP_PER_LEVEL_STEP;
  const title = LEVEL_TITLES.find((entry) => level >= entry.level).title;
  return {
    level,
    title,
    xpIntoLevel: xp - xpAtLevelStart,
    xpForNextLevel,
    progressPercent: Math.min(
      100,
      Math.floor(((xp - xpAtLevelStart) / xpForNextLevel) * 100),
    ),
  };
}

function calculateRoundXp({ accuracy, correctWords, bestStreak, attempts }) {
  const accuracyBonus = attempts > 0 ? Math.round(accuracy / 10) : 0;
  const streakBonus = Math.floor(bestStreak / 10) * 5;
  return 10 + correctWords * 2 + accuracyBonus + streakBonus;
}

function awardRoundXpOnce(roundId, stats) {
  if (player.progression.awardedRoundIds.includes(roundId)) return 0;
  const xpEarned = calculateRoundXp(stats);
  player.progression.awardedRoundIds.push(roundId);
  player.progression.awardedRoundIds =
    player.progression.awardedRoundIds.slice(-100);
  player.progression.totalXp += xpEarned;
  return xpEarned;
}

function createRoundId() {
  return window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
}

function updateProgressionUI() {
  const progression = getLevelInfo(player.progression.totalXp);
  ui.playerLevel.textContent = String(progression.level);
  ui.playerTitle.textContent = progression.title;
  ui.totalXp.textContent = player.progression.totalXp.toLocaleString();
  ui.levelProgressFill.style.width = `${progression.progressPercent}%`;
  ui.levelProgress.setAttribute(
    "aria-valuemax",
    String(progression.xpForNextLevel),
  );
  ui.levelProgress.setAttribute(
    "aria-valuenow",
    String(progression.xpIntoLevel),
  );
  ui.levelProgressLabel.textContent = `${progression.xpIntoLevel} / ${progression.xpForNextLevel} XP TO NEXT LEVEL`;
}

function updateProfile() {
  const name = player.name.trim();
  const history = player.history;
  const best = player.performance.bestWpm;
  const latest = history[0];
  ui.headerName.textContent = name ? name.toUpperCase() : "PLAYER ONE";
  ui.headerAvatar.textContent = name ? name.charAt(0).toUpperCase() : "G";
  ui.headerStatus.textContent = name ? "LOCAL PROFILE" : "GUEST PROFILE";
  ui.bestWpm.textContent = best ? String(best) : "--";
  ui.bestDetail.textContent = best
    ? "Your fastest set so far"
    : "Your next high score is waiting";
  ui.lastWpm.textContent = latest ? String(latest.wpm) : "--";
  ui.lastDetail.textContent = latest
    ? `${latest.accuracy}% accuracy · ${latest.difficulty}`
    : "Play a round to set your pace";
  ui.totalSets.textContent = String(player.performance.totalRounds);
  ui.setsDetail.textContent = player.performance.totalRounds
    ? `${player.performance.totalRounds} ${player.performance.totalRounds === 1 ? "set" : "sets"} played`
    : "Your progress lives here";
  updateProgressionUI();
  updateCareerPanel();
  renderAchievements();
  updateDailyChallengeUI();
  updatePerformanceDashboard();
  renderHistory();
}

function updateCareerPanel() {
  const levelInfo = getLevelInfo(player.progression.totalXp);
  const careerDifficulty = getCareerDifficulty(levelInfo.level);
  const difficultyInfo = DIFFICULTIES[careerDifficulty];
  ui.careerLevel.textContent = `LEVEL ${levelInfo.level}`;
  ui.careerTitle.textContent = levelInfo.title;
  ui.careerDifficulty.textContent = difficultyInfo.label;
  ui.careerDifficultyDetail.textContent = `${difficultyInfo.bpm} BPM · ${difficultyInfo.fallTime}s per word`;
}

function localDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function updatePerformanceDashboard() {
  const stats = player.performance;
  const totalRounds = stats.totalRounds;
  ui.averageWpm.textContent = totalRounds
    ? String(Math.round(stats.totalWpm / totalRounds))
    : "--";
  ui.averageAccuracy.textContent = totalRounds
    ? `${Math.round(stats.totalAccuracy / totalRounds)}%`
    : "--";
  ui.performanceRounds.textContent = totalRounds.toLocaleString();
  ui.longestStreak.textContent = String(stats.longestStreak);
  ui.bestWpmEasy.textContent = stats.bestWpmByDifficulty.easy
    ? String(stats.bestWpmByDifficulty.easy)
    : "--";
  ui.bestWpmMedium.textContent = stats.bestWpmByDifficulty.medium
    ? String(stats.bestWpmByDifficulty.medium)
    : "--";
  ui.bestWpmHard.textContent = stats.bestWpmByDifficulty.hard
    ? String(stats.bestWpmByDifficulty.hard)
    : "--";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentStart = new Date(today);
  currentStart.setDate(currentStart.getDate() - (performanceDays - 1));
  const previousStart = new Date(currentStart);
  previousStart.setDate(previousStart.getDate() - performanceDays);
  const nextDay = new Date(today);
  nextDay.setDate(nextDay.getDate() + 1);
  const getRunDate = (run) => new Date(run.date);
  const currentStartKey = localDateKey(currentStart);
  const previousStartKey = localDateKey(previousStart);
  const nextDayKey = localDateKey(nextDay);
  const dailyEntries = Object.entries(stats.dailyByDate);
  const currentBuckets = dailyEntries.filter(
    ([dateKey]) => dateKey >= currentStartKey && dateKey < nextDayKey,
  );
  const previousBuckets = dailyEntries.filter(
    ([dateKey]) => dateKey >= previousStartKey && dateKey < currentStartKey,
  );
  const summarizeBuckets = (entries) =>
    entries.reduce(
      (summary, [, bucket]) => ({
        count: summary.count + bucket.count,
        totalWpm: summary.totalWpm + bucket.totalWpm,
        totalAccuracy: summary.totalAccuracy + bucket.totalAccuracy,
      }),
      { count: 0, totalWpm: 0, totalAccuracy: 0 },
    );
  const currentPeriod = summarizeBuckets(currentBuckets);
  const previousPeriod = summarizeBuckets(previousBuckets);
  const buckets = [];
  for (let offset = performanceDays - 1; offset >= 0; offset -= 1) {
    const date = new Date(today);
    date.setDate(date.getDate() - offset);
    buckets.push({ date, key: localDateKey(date), runs: [] });
  }
  const bucketByDate = new Map(buckets.map((bucket) => [bucket.key, bucket]));
  const bucketAverages = buckets.map((bucket) => {
    const daily = stats.dailyByDate[bucket.key];
    return daily?.count ? daily.totalWpm / daily.count : 0;
  });
  const maxAverage = Math.max(1, ...bucketAverages);
  ui.performanceChart.dataset.period = String(performanceDays);
  ui.performanceChart.style.setProperty(
    "--chart-days",
    String(performanceDays),
  );
  ui.performanceChart.setAttribute(
    "aria-label",
    `Daily average words per minute over the last ${performanceDays} days`,
  );
  ui.performanceChart.innerHTML = buckets
    .map((bucket, index) => {
      const average = bucketAverages[index];
      const height = average
        ? Math.max(6, Math.round((average / maxAverage) * 100))
        : 0;
      const label =
        performanceDays === 7
          ? bucket.date.toLocaleDateString(undefined, { weekday: "short" })
          : index % 5 === 0 || index === performanceDays - 1
            ? `${bucket.date.getMonth() + 1}/${bucket.date.getDate()}`
            : "";
      return `<div class="performance-day" aria-hidden="true"><div class="performance-bar-track"><span class="performance-bar ${average ? "has-runs" : ""}" style="height:${height}%"></span></div><small>${label}</small></div>`;
    })
    .join("");

  ui.trendRange.textContent = `${currentPeriod.count} SETS THIS PERIOD · ${previousPeriod.count} PREVIOUS`;
  if (!currentPeriod.count) {
    ui.trendComparison.textContent = `No completed sets in the last ${performanceDays} days yet.`;
  } else if (!previousPeriod.count) {
    ui.trendComparison.textContent = `${Math.round(currentPeriod.totalWpm / currentPeriod.count)} average WPM · no previous period to compare yet.`;
  } else {
    const wpmDelta =
      Math.round(
        (currentPeriod.totalWpm / currentPeriod.count -
          previousPeriod.totalWpm / previousPeriod.count) *
          10,
      ) / 10;
    const accuracyDelta = Math.round(
      currentPeriod.totalAccuracy / currentPeriod.count -
        previousPeriod.totalAccuracy / previousPeriod.count,
    );
    const formatDelta = (value) => `${value > 0 ? "+" : ""}${value}`;
    ui.trendComparison.textContent = `${formatDelta(wpmDelta)} average WPM · ${formatDelta(accuracyDelta)} accuracy points vs previous ${performanceDays} days.`;
  }
}

function setPerformancePeriod(days) {
  if (![7, 30].includes(days)) return;
  performanceDays = days;
  document.querySelectorAll(".performance-period").forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(Number(button.dataset.days) === days),
    );
  });
  updatePerformanceDashboard();
}

function getUtcDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function getDailyChallengeDefinition(dateKey = getUtcDateKey()) {
  let hash = 2166136261;
  for (const character of dateKey) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  const index = (hash >>> 0) % DAILY_CHALLENGE_TEMPLATES.length;
  return { ...DAILY_CHALLENGE_TEMPLATES[index], date: dateKey };
}

function ensureDailyChallengeDate() {
  const date = getUtcDateKey();
  const challenge = getDailyChallengeDefinition(date);
  if (
    player.dailyChallenge?.date === date &&
    player.dailyChallenge.challengeId === challenge.id
  ) {
    return false;
  }
  player.dailyChallenge = {
    date,
    challengeId: challenge.id,
    progress: 0,
    completed: false,
    rewarded: false,
  };
  return true;
}

function getDailyProgressText(challenge, dailyState) {
  if (dailyState.completed) return "COMPLETED";
  switch (challenge.type) {
    case "wpm":
      return `${dailyState.progress} / ${challenge.target} WPM`;
    case "accuracy-runs":
      return `${dailyState.progress} / ${challenge.target} qualifying sets`;
    case "streak":
      return `${dailyState.progress} / ${challenge.target} words`;
    case "career-runs":
      return `${dailyState.progress} / ${challenge.target} Career sets`;
    case "personal-best":
      return `${dailyState.progress} / 1 personal best`;
    default:
      return "0 / 1";
  }
}

function getDailyProgressTarget(challenge) {
  return challenge.type === "personal-best" ? 1 : challenge.target;
}

function formatDailyCountdown() {
  const now = new Date();
  const nextUtcMidnight = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
  );
  const minutesLeft = Math.max(
    0,
    Math.floor((nextUtcMidnight - now.getTime()) / 60000),
  );
  const hours = Math.floor(minutesLeft / 60);
  const minutes = minutesLeft % 60;
  return `${String(hours).padStart(2, "0")}H ${String(minutes).padStart(2, "0")}M`;
}

function updateDailyChallengeUI() {
  if (ensureDailyChallengeDate()) savePlayer();
  const dailyState = player.dailyChallenge;
  const challenge = getDailyChallengeDefinition(dailyState.date);
  const target = getDailyProgressTarget(challenge);
  const progress = Math.min(dailyState.progress, target);
  const progressText = getDailyProgressText(challenge, dailyState);
  const percent = target ? Math.floor((progress / target) * 100) : 0;
  const resetText = `NEXT MIX IN ${formatDailyCountdown()} UTC`;

  ui.dailyTitle.textContent = challenge.title;
  ui.dailyRequirement.textContent = challenge.requirement;
  ui.dailyProgressLabel.textContent = `${progressText} · ${dailyState.date}`;
  ui.dailyReward.textContent = dailyState.rewarded
    ? "REWARD CLAIMED"
    : `+${challenge.rewardXp} XP`;
  ui.dailyProgressFill.style.width = `${percent}%`;
  ui.dailyProgress.setAttribute("aria-valuemax", String(target));
  ui.dailyProgress.setAttribute("aria-valuenow", String(progress));
  ui.dailyCountdown.textContent = dailyState.completed
    ? `CHALLENGE COMPLETE · ${resetText}`
    : resetText;
  ui.dailySummary.textContent = dailyState.completed
    ? `COMPLETE · +${challenge.rewardXp} XP`
    : `${challenge.title} · ${progressText}`;
  ui.dailyChip.setAttribute(
    "aria-label",
    `Daily Mix: ${challenge.title}. ${challenge.requirement} ${progressText}. ${resetText}.`,
  );
}

function renderAchievements() {
  const unlockedIds = new Set(player.achievements);
  ui.achievementSummary.textContent = `${unlockedIds.size} / ${ACHIEVEMENT_DEFINITIONS.length} UNLOCKED`;
  ui.achievementList.innerHTML = ACHIEVEMENT_DEFINITIONS.map((achievement) => {
    const unlocked = unlockedIds.has(achievement.id);
    return `<div class="achievement-item ${unlocked ? "is-unlocked" : "is-locked"}" role="listitem"><span class="achievement-icon" aria-hidden="true">${unlocked ? "✓" : "◇"}</span><span class="achievement-copy"><strong>${achievement.title}</strong><small>${achievement.description}</small></span><span class="achievement-xp">${unlocked ? "UNLOCKED" : `+${achievement.xp} XP`}</span></div>`;
  }).join("");
}

function unlockAchievement(achievementId) {
  const achievement = ACHIEVEMENT_DEFINITIONS.find(
    (entry) => entry.id === achievementId,
  );
  if (!achievement || player.achievements.includes(achievementId)) return null;
  player.achievements.push(achievementId);
  player.progression.totalXp += achievement.xp;
  return achievement;
}

function unlockEligibleAchievements({ roundResult, previousBestWpm }) {
  const careerHistory = player.history.filter((run) => run.mode === "career");
  const encoreRuns = careerHistory.filter(
    (run) => run.difficulty === "ENCORE",
  ).length;
  const attempts =
    roundResult.correctWords + roundResult.errors + roundResult.misses;
  const eligible = {
    "first-gig": careerHistory.length >= 1,
    "speed-demon": roundResult.wpm >= 80,
    "perfect-performance": attempts > 0 && roundResult.accuracy === 100,
    "encore-legend": encoreRuns >= 25,
    "streak-machine": roundResult.bestStreak >= 50,
    "regular-performer": careerHistory.length >= 10,
    "getting-better": previousBestWpm > 0 && roundResult.wpm > previousBestWpm,
    "daily-performer": player.dailyChallenge?.completed === true,
  };
  return ACHIEVEMENT_DEFINITIONS.filter(
    (achievement) => eligible[achievement.id],
  )
    .map((achievement) => unlockAchievement(achievement.id))
    .filter(Boolean);
}

function updateDailyChallengeForRound({ roundResult, previousBestWpm }) {
  ensureDailyChallengeDate();
  const dailyState = player.dailyChallenge;
  const challenge = getDailyChallengeDefinition(dailyState.date);
  if (dailyState.completed) {
    return { completedNow: false, bonusXp: 0 };
  }

  switch (challenge.type) {
    case "wpm":
      dailyState.progress = Math.max(dailyState.progress, roundResult.wpm);
      break;
    case "accuracy-runs":
      if (roundResult.accuracy >= challenge.minimumAccuracy) {
        dailyState.progress = Math.min(
          challenge.target,
          dailyState.progress + 1,
        );
      }
      break;
    case "streak":
      dailyState.progress = Math.max(
        dailyState.progress,
        roundResult.bestStreak,
      );
      break;
    case "career-runs":
      dailyState.progress = Math.min(challenge.target, dailyState.progress + 1);
      break;
    case "personal-best":
      if (roundResult.wpm > previousBestWpm) dailyState.progress = 1;
      break;
  }

  const completedNow = dailyState.progress >= getDailyProgressTarget(challenge);
  let bonusXp = 0;
  if (completedNow) {
    dailyState.completed = true;
    if (!dailyState.rewarded) {
      dailyState.rewarded = true;
      bonusXp = challenge.rewardXp;
      player.progression.totalXp += bonusXp;
    }
  }
  return { completedNow, bonusXp };
}

function renderHistory() {
  if (!player.history.length) {
    ui.historyList.innerHTML =
      '<p class="history-empty">Your first set is one song away.</p>';
    return;
  }
  ui.historyList.innerHTML = player.history
    .slice(0, 5)
    .map((run, index) => {
      const colors = [
        "var(--cyan)",
        "var(--orange)",
        "var(--yellow)",
        "var(--pink)",
        "var(--lime)",
      ];
      const date = new Date(run.date);
      const label = Number.isNaN(date.getTime())
        ? "RECENT"
        : date
            .toLocaleDateString(undefined, { month: "short", day: "numeric" })
            .toUpperCase();
      return `<div class="history-item" style="--lane-color:${colors[index % colors.length]}"><span><strong>${escapeHtml(run.difficulty)}</strong><small>${label} · ${run.accuracy}% ACC</small></span><span class="history-wpm">${Number(run.wpm) || 0}</span></div>`;
    })
    .join("");
}

function escapeHtml(text) {
  return String(text).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );
}

function setDifficulty(nextDifficulty) {
  if (round?.active || gameMode !== "openMic") return;
  difficulty = nextDifficulty;
  document.querySelectorAll(".difficulty-option").forEach((button) => {
    const selected = button.dataset.difficulty === difficulty;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  ui.difficultySummary.textContent = `${DIFFICULTIES[difficulty].summary} ${DIFFICULTIES[difficulty].bpm} BPM.`;
  ui.songDifficulty.textContent = DIFFICULTIES[difficulty].label;
}

function setGameMode(nextMode) {
  if (round?.active || !["openMic", "career"].includes(nextMode)) return;
  gameMode = nextMode;
  const isCareer = gameMode === "career";
  ui.openMicMode.classList.toggle("is-selected", !isCareer);
  ui.openMicMode.setAttribute("aria-pressed", String(!isCareer));
  ui.careerMode.classList.toggle("is-selected", isCareer);
  ui.careerMode.setAttribute("aria-pressed", String(isCareer));
  ui.difficultyPanel.hidden = isCareer;
  ui.careerPanel.hidden = !isCareer;
  ui.progressionStrip.hidden = !isCareer;
  const selectedDifficulty = isCareer
    ? getCareerDifficulty(getLevelInfo(player.progression.totalXp).level)
    : difficulty;
  ui.songDifficulty.textContent = DIFFICULTIES[selectedDifficulty].label;
  ui.gameTitle.textContent = isCareer ? "CAREER RUN" : "OPEN MIC";
  ui.gameSubtitle.textContent = isCareer
    ? "BUILD YOUR RANK ONE SET AT A TIME"
    : "YOUR SET IS READY WHEN YOU ARE";
  ui.highwayInstruction.textContent = isCareer
    ? "CAREER SETS EARN XP AND ADVANCE YOUR RANK"
    : "HIT PLAY TO START YOUR SET";
}

function showRandomCoachTip() {
  let previousIndex = -1;
  try {
    const savedIndex = Number(localStorage.getItem(COACH_TIP_STORAGE_KEY));
    if (
      Number.isInteger(savedIndex) &&
      savedIndex >= 0 &&
      savedIndex < COACH_TIPS.length
    ) {
      previousIndex = savedIndex;
    }
  } catch {
    previousIndex = -1;
  }
  const candidates = COACH_TIPS.map((_, index) => index).filter(
    (index) => index !== previousIndex,
  );
  const tipIndex = candidates[Math.floor(Math.random() * candidates.length)];
  ui.coachTip.textContent = COACH_TIPS[tipIndex];
  ui.tipNumber.textContent = `TIP ${String(tipIndex + 1).padStart(2, "0")}`;
  try {
    localStorage.setItem(COACH_TIP_STORAGE_KEY, String(tipIndex));
  } catch {
    // Keep the selected tip for this page even when storage is unavailable.
  }
}

function beginRound() {
  if (round?.active) return;
  if (!player.name) {
    openProfileDialog();
    showToast("Choose a stage name before your first set.");
    return;
  }
  stopResultsCheer();
  const careerLevel = getLevelInfo(player.progression.totalXp).level;
  const roundDifficulty =
    gameMode === "career" ? getCareerDifficulty(careerLevel) : difficulty;
  round = {
    id: createRoundId(),
    mode: gameMode,
    difficulty: roundDifficulty,
    active: true,
    score: 0,
    streak: 0,
    bestStreak: 0,
    correctChars: 0,
    errors: 0,
    correctWords: 0,
    misses: 0,
    startedAt: Date.now(),
    timeLeft: ROUND_LENGTH,
    currentWord: "",
    lastTypedValue: "",
    noteId: 0,
    lane: 0,
    ticker: null,
    noteTimer: null,
  };
  ui.gamePanel.classList.add("is-playing");
  ui.gamePanel.classList.remove(
    "has-error",
    "is-word-hit",
    "is-streak-milestone",
  );
  ui.gameTitle.textContent =
    gameMode === "career" ? `CAREER · LEVEL ${careerLevel}` : "OPEN MIC";
  ui.gameSubtitle.textContent =
    gameMode === "career"
      ? "TYPE EACH WORD · EARN XP FOR YOUR CAREER"
      : "TYPE EACH WORD BEFORE IT LEAVES THE STAGE";
  ui.songDifficulty.textContent = DIFFICULTIES[roundDifficulty].label;
  ui.highwayInstruction.textContent = "KEEP THE STREAK ALIVE";
  ui.typingInput.disabled = false;
  ui.typingInput.value = "";
  ui.inputHint.textContent = "TYPE TO HIT THE NOTE";
  ui.promptLabel.textContent = "TYPE THIS";
  ui.liveWpm.textContent = "0";
  ui.timer.textContent = "01:00";
  ui.timerBox.classList.remove("is-low");
  ui.restartButton.disabled = false;
  ui.playButton.disabled = true;
  ui.playButtonLabel.textContent = "PLAYING";
  startSoundtrack();
  updateRoundStats();
  spawnWord();
  ui.typingInput.focus();
  round.ticker = window.setInterval(updateTimer, 200);
}

function restartRound() {
  if (!round?.active) return;
  window.clearInterval(round.ticker);
  window.clearTimeout(round.noteTimer);
  stopSoundtrack();
  ui.highway.querySelectorAll(".lane-note").forEach((note) => note.remove());
  ui.gamePanel.classList.remove("is-playing", "has-note");
  ui.typingInput.disabled = true;
  round = null;
  beginRound();
}

function spawnWord() {
  if (!round?.active) return;
  window.clearTimeout(round.noteTimer);
  round.noteTimer = null;
  const noteId = ++round.noteId;
  const wordList = WORDS[round.difficulty];
  let word = wordList[Math.floor(Math.random() * wordList.length)];
  if (word === round.currentWord && wordList.length > 1)
    word = wordList[(wordList.indexOf(word) + 1) % wordList.length];
  round.currentWord = word;
  round.lane = Math.floor(Math.random() * 4);
  const note = document.createElement("span");
  note.className = `lane-note lane-note-${round.lane} is-active`;
  note.dataset.word = word;
  note.style.setProperty(
    "--fall-time",
    `${DIFFICULTIES[round.difficulty].fallTime}s`,
  );
  const maxTextWidth = Math.min(80, (ui.highway.clientWidth / 4) * 0.8);
  note.style.fontSize = `${Math.max(6, Math.min(12, maxTextWidth / (word.length * 0.62)))}px`;
  note.textContent = word;
  ui.highway
    .querySelectorAll(".lane-note")
    .forEach((oldNote) => oldNote.remove());
  ui.highway.querySelector(`[data-lane="${round.lane}"]`).append(note);
  ui.gamePanel.classList.add("has-note");
  renderPromptWord();
  ui.typingInput.value = "";
  round.lastTypedValue = "";
  ui.inputWrap.classList.remove("has-value");
  ui.typingInput.focus({ preventScroll: true });
  round.noteTimer = window.setTimeout(() => {
    if (!round?.active || round.noteId !== noteId) return;
    round.noteTimer = null;
    round.misses += 1;
    round.streak = 0;
    playCrowdCue("boo");
    updateRoundStats();
    ui.promptLabel.textContent = "MISSED — NEXT UP";
    spawnWord();
  }, DIFFICULTIES[round.difficulty].fallTime * 1000);
}

function updateTimer() {
  if (!round?.active) return;
  const elapsed = (Date.now() - round.startedAt) / 1000;
  round.timeLeft = Math.max(0, ROUND_LENGTH - elapsed);
  ui.timer.textContent = formatTime(round.timeLeft);
  updateLiveWpm();
  ui.timerBox.classList.toggle("is-low", round.timeLeft <= 10);
  if (round.timeLeft <= 0) finishRound();
}

function formatTime(seconds) {
  const value = Math.ceil(seconds);
  return `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;
}

function updateLiveWpm() {
  if (!round?.active) {
    ui.liveWpm.textContent = "0";
    return;
  }
  const elapsedMinutes = Math.max(
    (Date.now() - round.startedAt) / 60000,
    1 / 60,
  );
  ui.liveWpm.textContent = String(
    Math.round(round.correctChars / 5 / elapsedMinutes),
  );
}

function renderPromptWord(typed = "", mismatchIndex = -1) {
  if (!round?.currentWord) return;
  const expected = [...round.currentWord];
  const entered = [...typed];
  ui.promptWord.innerHTML = expected
    .map((character, index) => {
      const isError = index === mismatchIndex && entered[index] !== undefined;
      const displayedCharacter = isError ? entered[index] : character;
      const characterClass = isError
        ? "is-error"
        : index < entered.length
          ? "is-typed"
          : "is-upcoming";
      return `<span class="prompt-char ${characterClass}">${escapeHtml(displayedCharacter)}</span>`;
    })
    .join("");
  ui.promptWord.setAttribute("aria-label", `Type ${round.currentWord}`);
  updateKeyboardTarget(mismatchIndex >= 0 ? mismatchIndex : entered.length);
}

function updateKeyboardTarget(index) {
  ui.keyboardVisualization
    .querySelectorAll(".keyboard-key.is-next")
    .forEach((key) => key.classList.remove("is-next"));
  const nextCharacter = round?.currentWord?.[index];
  if (!nextCharacter) return;
  const nextKey = ui.keyboardVisualization.querySelector(
    `[data-key="${nextCharacter}"]`,
  );
  nextKey?.classList.add("is-next");
}

function animateKeyboardKey(keyName) {
  const key = ui.keyboardVisualization.querySelector(`[data-key="${keyName}"]`);
  if (!key) return;
  key.classList.remove("is-pressed");
  void key.offsetWidth;
  key.classList.add("is-pressed");
  window.setTimeout(() => key.classList.remove("is-pressed"), 150);
}

function updateRoundStats() {
  ui.score.textContent = String(round?.score || 0).padStart(6, "0");
  ui.streak.textContent = String(round?.streak || 0);
  const total =
    (round?.correctWords || 0) + (round?.errors || 0) + (round?.misses || 0);
  const accuracy = total ? Math.round((round.correctWords / total) * 100) : 100;
  ui.accuracy.textContent = `${accuracy}%`;
}

function registerTyping() {
  if (!round?.active) return;
  const rawValue = ui.typingInput.value;
  const typed = rawValue.toLowerCase().replace(/[^a-z]/g, "");
  if (typed !== rawValue) {
    const cursor = Math.min(ui.typingInput.selectionStart, typed.length);
    ui.typingInput.value = typed;
    ui.typingInput.setSelectionRange(cursor, cursor);
  }
  ui.inputWrap.classList.toggle("has-value", typed.length > 0);
  const previousValue = round.lastTypedValue;
  round.lastTypedValue = typed;
  const expected = round.currentWord;
  const mismatchIndex = [...typed].findIndex(
    (character, index) => character !== expected[index],
  );
  if (mismatchIndex !== -1) {
    let changedIndex = 0;
    while (
      changedIndex < typed.length &&
      changedIndex < previousValue.length &&
      typed[changedIndex] === previousValue[changedIndex]
    ) {
      changedIndex += 1;
    }
    if (
      changedIndex < typed.length &&
      typed[changedIndex] !== expected[changedIndex]
    ) {
      round.errors += 1;
      playCrowdCue("boo");
    }
    renderPromptWord(typed, mismatchIndex);
    ui.gamePanel.classList.add("has-error");
    window.setTimeout(() => ui.gamePanel.classList.remove("has-error"), 180);
    ui.promptLabel.textContent = "CHECK THE WORD · BACKSPACE TO FIX";
    updateRoundStats();
    return;
  }
  renderPromptWord(typed);
  ui.promptLabel.textContent = "TYPE THIS";
  if (typed === expected) hitWord();
}

function hitWord() {
  if (!round?.active) return;
  window.clearTimeout(round.noteTimer);
  round.noteTimer = null;
  round.noteId += 1;
  round.correctWords += 1;
  playCrowdCue("cheer");
  round.correctChars += round.currentWord.length;
  round.streak += 1;
  round.bestStreak = Math.max(round.bestStreak, round.streak);
  round.score += round.currentWord.length * 10 + Math.min(round.streak, 20) * 5;
  ui.gamePanel.classList.add("is-word-hit");
  window.setTimeout(() => ui.gamePanel.classList.remove("is-word-hit"), 240);
  if (round.streak > 0 && round.streak % 5 === 0) {
    ui.gamePanel.classList.add("is-streak-milestone");
    window.setTimeout(
      () => ui.gamePanel.classList.remove("is-streak-milestone"),
      500,
    );
  }
  ui.promptLabel.textContent =
    round.streak > 0 && round.streak % 5 === 0
      ? `ON FIRE · ${round.streak} IN A ROW`
      : "NICE · NEXT UP";
  ui.hitFlash.classList.remove("is-hit");
  void ui.hitFlash.offsetWidth;
  ui.hitFlash.classList.add("is-hit");
  updateRoundStats();
  spawnWord();
}

function finishRound() {
  if (!round?.active) return;
  round.active = false;
  window.clearInterval(round.ticker);
  window.clearTimeout(round.noteTimer);
  stopSoundtrack();
  const elapsedMinutes = Math.max(
    (Date.now() - round.startedAt) / 60000,
    1 / 60,
  );
  const wpm = Math.round(round.correctChars / 5 / elapsedMinutes);
  const attempts = round.correctWords + round.errors + round.misses;
  const accuracy = attempts
    ? Math.round((round.correctWords / attempts) * 100)
    : 100;
  const previousBestWpm = player.performance.bestWpm;
  const isNewPersonalBest = wpm > previousBestWpm;
  const levelBefore = getLevelInfo(player.progression.totalXp);
  const roundStats = {
    wpm,
    accuracy,
    correctWords: round.correctWords,
    errors: round.errors,
    misses: round.misses,
    bestStreak: round.bestStreak,
  };
  const roundXp =
    round.mode === "career"
      ? awardRoundXpOnce(round.id, { ...roundStats, attempts })
      : 0;
  const dailyProgress =
    round.mode === "career"
      ? updateDailyChallengeForRound({
          roundResult: roundStats,
          previousBestWpm,
        })
      : { completedNow: false, bonusXp: 0 };
  const result = {
    roundId: round.id,
    mode: round.mode,
    wpm,
    accuracy,
    score: round.score,
    correctWords: round.correctWords,
    errors: round.errors,
    misses: round.misses,
    bestStreak: round.bestStreak,
    xpEarned: roundXp + dailyProgress.bonusXp,
    difficulty: DIFFICULTIES[round.difficulty].label,
    date: new Date().toISOString(),
    dailyChallenge:
      round.mode === "career"
        ? {
            date: player.dailyChallenge.date,
            challengeId: player.dailyChallenge.challengeId,
            progress: player.dailyChallenge.progress,
            completed: player.dailyChallenge.completed,
          }
        : null,
  };
  player.performance.totalRounds += 1;
  player.performance.totalWpm += wpm;
  player.performance.totalAccuracy += accuracy;
  player.performance.longestStreak = Math.max(
    player.performance.longestStreak,
    round.bestStreak,
  );
  player.performance.bestWpm = Math.max(player.performance.bestWpm, wpm);
  player.performance.bestWpmByDifficulty[round.difficulty] = Math.max(
    player.performance.bestWpmByDifficulty[round.difficulty],
    wpm,
  );
  const dateKey = localDateKey(new Date(result.date));
  const dailyBucket = player.performance.dailyByDate[dateKey] ?? {
    count: 0,
    totalWpm: 0,
    totalAccuracy: 0,
  };
  dailyBucket.count += 1;
  dailyBucket.totalWpm += wpm;
  dailyBucket.totalAccuracy += accuracy;
  player.performance.dailyByDate[dateKey] = dailyBucket;
  const cutoffDate = new Date();
  cutoffDate.setHours(0, 0, 0, 0);
  cutoffDate.setDate(cutoffDate.getDate() - 89);
  const cutoffDateKey = localDateKey(cutoffDate);
  for (const savedDate of Object.keys(player.performance.dailyByDate)) {
    if (savedDate < cutoffDateKey)
      delete player.performance.dailyByDate[savedDate];
  }
  player.history.unshift(result);
  player.history = player.history.slice(0, HISTORY_LIMIT);
  const newlyUnlocked =
    round.mode === "career"
      ? unlockEligibleAchievements({ roundResult: result, previousBestWpm })
      : [];
  result.achievementUnlocks = newlyUnlocked.map(
    (achievement) => achievement.id,
  );
  result.xpEarned += newlyUnlocked.reduce(
    (total, achievement) => total + achievement.xp,
    0,
  );
  const levelAfter = getLevelInfo(player.progression.totalXp);
  savePlayer();
  updateProfile();
  ui.gamePanel.classList.remove("is-playing", "has-note");
  ui.typingInput.disabled = true;
  ui.promptLabel.textContent = "SET COMPLETE";
  ui.promptWord.textContent = "NICE WORK";
  ui.keyboardVisualization
    .querySelectorAll(".keyboard-key")
    .forEach((key) => key.classList.remove("is-next", "is-pressed"));
  ui.highwayInstruction.textContent = "THAT'S A WRAP. YOUR NEXT SET IS READY.";
  ui.highway.querySelectorAll(".lane-note").forEach((note) => note.remove());
  ui.playButton.disabled = false;
  ui.restartButton.disabled = true;
  ui.playButtonLabel.textContent = "PLAY AGAIN";
  ui.playButton.querySelector(".play-icon").textContent = "▶";
  ui.gameTitle.textContent =
    round.mode === "career" ? "CAREER SET COMPLETE" : "OPEN MIC COMPLETE";
  ui.gameSubtitle.textContent =
    round.mode === "career"
      ? "YOUR CAREER PROGRESS HAS BEEN SAVED"
      : "PRACTICE AT YOUR OWN PACE";
  ui.timer.textContent = "00:00";
  ui.liveWpm.textContent = String(wpm);
  ui.timerBox.classList.remove("is-low");
  $("#result-wpm").textContent = String(wpm);
  $("#result-score-primary").textContent = result.score.toLocaleString();
  $("#result-mode").textContent =
    round.mode === "career" ? "CAREER SET COMPLETE" : "OPEN MIC SET COMPLETE";
  $("#result-accuracy").textContent = `${accuracy}%`;
  $("#result-best-streak").textContent = String(round.bestStreak);
  $("#result-best").textContent = String(player.performance.bestWpm);
  $("#personal-best-notice").hidden = !isNewPersonalBest;
  $("#results-title").innerHTML = isNewPersonalBest
    ? "NEW <span>HIGH SCORE.</span>"
    : "SET <span>COMPLETE.</span>";
  $("#result-xp-earned").textContent = String(result.xpEarned);
  $("#result-xp-label").textContent =
    round.mode === "career" ? "CAREER XP" : "OPEN MIC XP";
  $("#result-level").textContent =
    `LEVEL ${levelAfter.level} · ${levelAfter.title}`;
  $("#result-total-xp").textContent =
    `${player.progression.totalXp.toLocaleString()} XP TOTAL`;
  $("#result-level-fill").style.width = `${levelAfter.progressPercent}%`;
  $("#result-level-progress").setAttribute(
    "aria-valuemax",
    String(levelAfter.xpForNextLevel),
  );
  $("#result-level-progress").setAttribute(
    "aria-valuenow",
    String(levelAfter.xpIntoLevel),
  );
  $("#result-level-progress-label").textContent =
    `${levelAfter.xpIntoLevel} / ${levelAfter.xpForNextLevel} XP TO NEXT LEVEL`;
  const levelUpNotice = $("#level-up-notice");
  levelUpNotice.hidden =
    round.mode !== "career" || levelAfter.level <= levelBefore.level;
  if (!levelUpNotice.hidden) {
    $("#level-up-title").textContent =
      `LEVEL ${levelAfter.level} · ${levelAfter.title}`;
  }
  ui.dailyResult.hidden = round.mode !== "career";
  if (round.mode === "career") {
    const challenge = getDailyChallengeDefinition(player.dailyChallenge.date);
    const dailyMessage = player.dailyChallenge.completed
      ? dailyProgress.completedNow
        ? `${challenge.title} complete · +${dailyProgress.bonusXp} bonus XP.`
        : `${challenge.title} is complete for today.`
      : `${challenge.title}: ${getDailyProgressText(challenge, player.dailyChallenge)}.`;
    ui.dailyResultCopy.textContent = dailyMessage;
  }
  ui.achievementUnlocks.hidden = newlyUnlocked.length === 0;
  ui.achievementUnlockList.innerHTML = newlyUnlocked
    .map(
      (achievement) =>
        `<li>${escapeHtml(achievement.title)} · +${achievement.xp} XP</li>`,
    )
    .join("");
  $("#result-note").textContent =
    round.mode === "openMic"
      ? "Open Mic is for practice. Play Career to earn XP and level up."
      : round.bestStreak
        ? `Best streak: ${round.bestStreak} words. Keep that rhythm going.`
        : "Every set makes the next one smoother.";
  ui.resultsDialog.showModal();
  playResultsCheer();
}

function openProfileDialog() {
  renderAchievements();
  ui.profileName.value = player.name;
  ui.profileDialog.showModal();
  window.setTimeout(() => ui.profileName.focus(), 30);
}

function openDailyDialog() {
  if (round?.active) {
    showToast("Finish your current set before opening Daily Mix.");
    return;
  }
  updateDailyChallengeUI();
  ui.dailyDialog.showModal();
}

function showToast(message) {
  ui.toast.textContent = message;
  ui.toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(
    () => ui.toast.classList.remove("is-visible"),
    2600,
  );
}

document
  .querySelectorAll(".difficulty-option")
  .forEach((button) =>
    button.addEventListener("click", () =>
      setDifficulty(button.dataset.difficulty),
    ),
  );
ui.openMicMode.addEventListener("click", () => setGameMode("openMic"));
ui.careerMode.addEventListener("click", () => setGameMode("career"));
ui.dailyChip.addEventListener("click", openDailyDialog);
ui.dailyClose.addEventListener("click", () => ui.dailyDialog.close());
ui.dailyDialog.addEventListener("click", (event) => {
  if (event.target === ui.dailyDialog) ui.dailyDialog.close();
});
ui.dailyPlayCareer.addEventListener("click", () => {
  ui.dailyDialog.close();
  setGameMode("career");
  beginRound();
});
ui.restartButton.addEventListener("click", restartRound);
ui.playButton.addEventListener("click", beginRound);
ui.soundToggle.checked = soundEnabled;
ui.soundToggle.addEventListener("change", () => {
  soundEnabled = ui.soundToggle.checked;
  try {
    localStorage.setItem(AUDIO_STORAGE_KEY, soundEnabled ? "on" : "off");
  } catch {
    showToast("Could not save your sound preference.");
  }
  if (soundEnabled && round?.active) startSoundtrack();
  else if (!soundEnabled) {
    stopSoundtrack();
    stopResultsCheer();
  }
});
ui.typingInput.addEventListener("input", registerTyping);
ui.typingInput.addEventListener("keydown", (event) => {
  const pressedKey = event.key === " " ? "space" : event.key.toLowerCase();
  animateKeyboardKey(pressedKey);
  if (event.key === "Enter" && round?.active) {
    event.preventDefault();
    round.misses += 1;
    round.streak = 0;
    playCrowdCue("boo");
    updateRoundStats();
    ui.promptLabel.textContent = "SKIPPED — NEXT UP";
    spawnWord();
  }
});
ui.profileButton.addEventListener("click", openProfileDialog);
ui.historyMore.addEventListener("click", openProfileDialog);
ui.dialogClose.addEventListener("click", () => ui.profileDialog.close());
ui.resultsClose.addEventListener("click", () => ui.resultsDialog.close());
ui.resultsPlayAgain.addEventListener("click", () => {
  ui.resultsDialog.close();
  beginRound();
});
ui.resultsReturn.addEventListener("click", () => {
  ui.resultsDialog.close();
  setGameMode("openMic");
});
document.querySelectorAll(".performance-period").forEach((button) => {
  button.addEventListener("click", () =>
    setPerformancePeriod(Number(button.dataset.days)),
  );
});
ui.profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = ui.profileName.value.trim().replace(/\s+/g, " ");
  if (!name) return;
  player.name = name;
  savePlayer();
  updateProfile();
  ui.profileDialog.close();
  showToast(`Welcome to the stage, ${name}.`);
});
ui.profileDialog.addEventListener("click", (event) => {
  if (event.target === ui.profileDialog) ui.profileDialog.close();
});
ui.resultsDialog.addEventListener("click", (event) => {
  if (event.target === ui.resultsDialog) ui.resultsDialog.close();
});

setDifficulty(difficulty);
setGameMode(gameMode);
showRandomCoachTip();
updateProfile();
window.setInterval(updateDailyChallengeUI, 60_000);
if (!player.name)
  window.setTimeout(() => {
    if (!ui.profileDialog.open) openProfileDialog();
  }, 450);
