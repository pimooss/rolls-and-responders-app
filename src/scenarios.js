// Rolls & Responders Scenario Library
// Based on NCSC NZ Rolls & Responders Facilitator Manual V1.1

// Get scenario data with translations
export function getScenarioData(t) {
  return {
    'ddos-attack': {
      id: 'ddos-attack',
      code: '4452',
      title: t('scenarios.ddosAttack.title'),
      difficulty: t('scenarios.ddosAttack.difficulty'),
      description: t('scenarios.ddosAttack.description'),
      turns: [
        {
          id: 0,
          title: t('scenarios.ddosAttack.briefingTitle'),
          publicText: t('scenarios.ddosAttack.briefingPublic'),
          facilitatorInfo: t('scenarios.ddosAttack.briefingFacilitator')
        },
        {
          id: 1,
          title: t('scenarios.ddosAttack.turn1Title'),
          publicText: t('scenarios.ddosAttack.turn1Public'),
          facilitatorInfo: t('scenarios.ddosAttack.turn1Facilitator')
        },
        {
          id: 2,
          title: t('scenarios.ddosAttack.turn2Title'),
          publicText: t('scenarios.ddosAttack.turn2Public'),
          facilitatorInfo: t('scenarios.ddosAttack.turn2Facilitator')
        },
        {
          id: 3,
          title: t('scenarios.ddosAttack.turn3Title'),
          publicText: t('scenarios.ddosAttack.turn3Public'),
          facilitatorInfo: t('scenarios.ddosAttack.turn3Facilitator')
        }
      ],
      injects: [
        {
          id: 'inject_11',
          title: t('scenarios.ddosAttack.inject11Title'),
          content: t('scenarios.ddosAttack.inject11Content')
        },
        {
          id: 'inject_8',
          title: t('scenarios.ddosAttack.inject8Title'),
          content: t('scenarios.ddosAttack.inject8Content')
        },
        {
          id: 'inject_6',
          title: t('scenarios.ddosAttack.inject6Title'),
          content: t('scenarios.ddosAttack.inject6Content')
        }
      ]
    },
    'ransomware': {
      id: 'ransomware',
      code: '1456',
      title: t('scenarios.ransomware.title'),
      difficulty: t('scenarios.ransomware.difficulty'),
      description: t('scenarios.ransomware.description'),
      turns: [
        {
          id: 0,
          title: t('scenarios.ransomware.briefingTitle'),
          publicText: t('scenarios.ransomware.briefingPublic'),
          facilitatorInfo: t('scenarios.ransomware.briefingFacilitator')
        },
        {
          id: 1,
          title: t('scenarios.ransomware.turn1Title'),
          publicText: t('scenarios.ransomware.turn1Public'),
          facilitatorInfo: t('scenarios.ransomware.turn1Facilitator')
        },
        {
          id: 2,
          title: t('scenarios.ransomware.turn2Title'),
          publicText: t('scenarios.ransomware.turn2Public'),
          facilitatorInfo: t('scenarios.ransomware.turn2Facilitator')
        },
        {
          id: 3,
          title: t('scenarios.ransomware.turn3Title'),
          publicText: t('scenarios.ransomware.turn3Public'),
          facilitatorInfo: t('scenarios.ransomware.turn3Facilitator')
        }
      ],
      injects: [
        {
          id: 'inject_13',
          title: t('scenarios.ransomware.inject13Title'),
          content: t('scenarios.ransomware.inject13Content')
        }
      ]
    },
    'cloud-compromise': {
      id: 'cloud-compromise',
      code: '6244',
      title: t('scenarios.cloudCompromise.title'),
      difficulty: t('scenarios.cloudCompromise.difficulty'),
      description: t('scenarios.cloudCompromise.description'),
      turns: [
        {
          id: 0,
          title: t('scenarios.cloudCompromise.briefingTitle'),
          publicText: t('scenarios.cloudCompromise.briefingPublic'),
          facilitatorInfo: t('scenarios.cloudCompromise.briefingFacilitator')
        },
        {
          id: 1,
          title: t('scenarios.cloudCompromise.turn1Title'),
          publicText: t('scenarios.cloudCompromise.turn1Public'),
          facilitatorInfo: t('scenarios.cloudCompromise.turn1Facilitator')
        },
        {
          id: 2,
          title: t('scenarios.cloudCompromise.turn2Title'),
          publicText: t('scenarios.cloudCompromise.turn2Public'),
          facilitatorInfo: t('scenarios.cloudCompromise.turn2Facilitator')
        },
        {
          id: 3,
          title: t('scenarios.cloudCompromise.turn3Title'),
          publicText: t('scenarios.cloudCompromise.turn3Public'),
          facilitatorInfo: t('scenarios.cloudCompromise.turn3Facilitator')
        }
      ],
      injects: [
        {
          id: 'inject_12',
          title: t('scenarios.cloudCompromise.inject12Title'),
          content: t('scenarios.cloudCompromise.inject12Content')
        },
        {
          id: 'inject_18',
          title: t('scenarios.cloudCompromise.inject18Title'),
          content: t('scenarios.cloudCompromise.inject18Content')
        }
      ]
    }
  };
}

export function getDifficultyTable(t) {
  return [
    { level: t('difficulty.trivial'), roll: t('difficulty.noRoll'), ex: t('difficulty.checkingComms') },
    { level: t('difficulty.routine'), roll: "5+", ex: t('difficulty.examiningLogs') },
    { level: t('difficulty.challenging'), roll: "10+", ex: t('difficulty.unfamiliarTool') },
    { level: t('difficulty.hard'), roll: "15+", ex: t('difficulty.restoringBackups') },
    { level: t('difficulty.eliteHacker'), roll: "20", ex: t('difficulty.complexWizardry') },
  ];
}

// Keep DIFFICULTY_TABLE for backwards compatibility
export const DIFFICULTY_TABLE = [
  { level: "Trivial", roll: "No Roll", ex: "Checking Slack/Email" },
  { level: "Routine", roll: "5+", ex: "Examining Logs" },
  { level: "Challenging", roll: "10+", ex: "Unfamiliar Tool / Code Review" },
  { level: "Hard", roll: "15+", ex: "Restoring locked backups / IAM Fix" },
  { level: "Elite Hacker", roll: "20", ex: "Highly complex technical wizardry" },
];

// Get scenario by ID with translations
export function getScenario(id, t) {
  const scenarios = getScenarioData(t);
  return scenarios[id] || scenarios['ddos-attack'];
}

// Get all scenario IDs
export function getScenarioIds() {
  return ['ddos-attack', 'ransomware', 'cloud-compromise'];
}

// Get scenario list for selection
export function getScenarioList(t) {
  const scenarios = getScenarioData(t);
  return Object.values(scenarios).map(s => ({
    id: s.id,
    title: s.title,
    difficulty: s.difficulty,
    description: s.description
  }));
}
