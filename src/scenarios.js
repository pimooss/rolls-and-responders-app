// Rolls & Responders Scenario Library
// Based on NCSC NZ Rolls & Responders Facilitator Manual V1.1

export const SCENARIOS = {
  'ddos-attack': {
    id: 'ddos-attack',
    code: '4452',
    title: "Scenario: Distributed Denial of Service (DDoS)",
    difficulty: "Easy",
    description: "A DDoS attack targets your organisation. The DDoS attack is from a paid stressor service hired by a group of criminals intending to extort your organisation for Bitcoin. Customers and senior stakeholders are becoming irritated.",
    turns: [
      {
        id: 0,
        title: "Briefing & Setup",
        publicText: "Welcome to the Tabletop Exercise.\n\nScenario: DDoS Attack\n\nRules:\n1. Discuss actions as a team.\n2. Facilitator sets Difficulty (Routine 5+, Challenging 10+, Hard 15+).\n3. Roll D20 to succeed.\n\nStatus: Normal operations.",
        facilitatorInfo: "Prepare the team for a DDoS scenario. Ensure roles are assigned."
      },
      {
        id: 1,
        title: "Turn 1: Pre-Incident",
        publicText: "Staff members have begun receiving calls from customers complaining about being unable to use important services.",
        facilitatorInfo: "BACKGROUND: A paid stressor service (hired by cyber criminals) is performing a DDoS attack against the organisation in the hopes of extorting Bitcoin (replace if not relevant to organisation).\n\nThe DDoS attack is targeting the organisation's website. The network traffic contains malformed HTTPS and is mostly coming from neighboring countries."
      },
      {
        id: 2,
        title: "Turn 2: Incident Declared",
        publicText: "Staff members are receiving calls, emails, and messages complaining about outages.",
        facilitatorInfo: "BACKGROUND: The DDoS attacks continue. As a result, customers are getting agitated. Some senior staff members are now aware of the incident.\n\nThe criminals have sent an email demanding payment."
      },
      {
        id: 3,
        title: "Turn 3: Recovery",
        publicText: "The DDoS attack has ceased.\n\nSenior leadership and important stakeholders are requesting an incident summary.",
        facilitatorInfo: "BACKGROUND: The attack has concluded. Media articles about your organisation's DDoS attack are circulating online."
      }
    ],
    injects: [
      {
        id: 'inject_11',
        title: "Inject 11: Ransom Demand",
        content: "A senior staff member receives an email from the criminals demanding the company pay (D20) Bitcoin to stop the DDoS attack.",
        triggerText: "Trigger Ransom Email"
      },
      {
        id: 'inject_8',
        title: "Inject 8: Escalation Threat",
        content: "Attacker sends an email including screenshots of social media complaints from your customers and threatens more cyber attacks if demands are not met (PRIVATE NOTE: GENUINE)",
        triggerText: "Trigger Escalation"
      },
      {
        id: 'inject_6',
        title: "Inject 6: Stakeholder Call",
        content: "An important stakeholder/board member calls for status",
        triggerText: "Trigger Call"
      }
    ]
  },

  'ransomware': {
    id: 'ransomware',
    code: '1456',
    title: "Scenario: Ransomware Attack",
    difficulty: "Medium",
    description: "Ransomware attack by hired security testers. Admin laptop compromised, user reported that machine boots into ransomware screen. Low-profile USB drive in one of the ports.",
    turns: [
      {
        id: 0,
        title: "Briefing & Setup",
        publicText: "Welcome to the Tabletop Exercise.\n\nScenario: Ransomware\n\nRules:\n1. Discuss actions as a team.\n2. Facilitator sets Difficulty (Routine 5+, Challenging 10+, Hard 15+).\n3. Roll D20 to succeed.\n\nStatus: Normal operations.",
        facilitatorInfo: "Prepare the team for a ransomware scenario."
      },
      {
        id: 1,
        title: "Turn 1: Pre-Incident",
        publicText: "A member of staff has contacted IT, reporting that their machine is booting into a ransomware screen.\n\nThey have admin privileges.\n\nThe machine was working fine in the morning, user only noticed the issue after lunch.\n\nNo other reported issues.",
        facilitatorInfo: "BACKGROUND: A security tester, hired by the business, has managed to gain access to the office area used by staff with admin privileges.\n\nThey have inserted a low-profile USB stick into one of the admin laptops while the user was away.\n\nIt has a ransomware payload, which has just deployed. The drive has been encrypted, but no data is being exfiltrated."
      },
      {
        id: 2,
        title: "Turn 2: Response Phase",
        publicText: "The staff member is panicking, worried they are going to lose their job. They keep coming to IT to ask if there's been any progress.\n\nMore users are reporting that their machines now have the same ransomware screens.",
        facilitatorInfo: "BACKGROUND: The tester is still in the building, and has managed to infect D6 more machines.\n\nThe tester will leave later this turn."
      },
      {
        id: 3,
        title: "Turn 3: Recovery",
        publicText: "Fast-forward one week. Management discloses to the team that the ransomware event was part of a security test.",
        facilitatorInfo: "BACKGROUND: The test has concluded."
      }
    ],
    injects: [
      {
        id: 'inject_13',
        title: "Inject 13: Backup Issues",
        content: "Hot backups do not work. Offsite backups will take (D6) hours to retrieve.",
        triggerText: "Trigger Backup Delay"
      }
    ]
  },

  'cloud-compromise': {
    id: 'cloud-compromise',
    code: '6244',
    title: "Scenario: Cloud Infrastructure Compromise",
    difficulty: "Hard",
    description: "The organisation has had their cloud infrastructure compromised by an attacker, leading to exfiltration of PII and unwanted media attention.",
    turns: [
      {
        id: 0,
        title: "Briefing & Setup",
        publicText: "Welcome to the Tabletop Exercise.\n\nScenario: Cloud Infrastructure Compromise\n\nRules:\n1. Discuss actions as a team.\n2. Facilitator sets Difficulty (Routine 5+, Challenging 10+, Hard 15+).\n3. Roll D20 to succeed.\n\nStatus: Normal operations.",
        facilitatorInfo: "Prepare the team for a cloud compromise scenario involving PII."
      },
      {
        id: 1,
        title: "Turn 1: Pre-Incident",
        publicText: "The organisation's IT administrators have received an email from law enforcement notifying you of malicious connections to your cloud infrastructure.",
        facilitatorInfo: "BACKGROUND: The organisation's cloud infrastructure was compromised due to a misconfiguration (exposed access keys).\n\nThe attacker has used this access to access a hosting bucket, downloading PII data on customers."
      },
      {
        id: 2,
        title: "Turn 2: Response Phase",
        publicText: "A staff member finds a screenshot on social media showing PII from the organisation's customers.",
        facilitatorInfo: "BACKGROUND: The attacker has begun leaking samples of the PII on a darknet forum and is offering to sell the full dataset to anyone online. Screenshots of these samples are being posted on social media.\n\nThe attacker continues to have access until they are removed and prevented from regaining access (e.g. access key is rotated, and the misconfiguration is fixed)."
      },
      {
        id: 3,
        title: "Turn 3: Recovery",
        publicText: "No further information (You may want to provide a summary of the current state of the attack).",
        facilitatorInfo: "BACKGROUND: The attacker continues to have access until they are removed and prevented from regaining access."
      }
    ],
    injects: [
      {
        id: 'inject_12',
        title: "Inject 12: Researcher Warning",
        content: "A staff member finds an email from months ago in which a researcher details the misconfiguration (exposed access keys).",
        triggerText: "Trigger Old Warning"
      },
      {
        id: 'inject_18',
        title: "Inject 18: Media Article",
        content: "A media outlet has released an article outlining the incident and critiquing the organisation's data collection and privacy practices. The article cites an anonymous source within the company.",
        triggerText: "Trigger Media Story"
      }
    ]
  }
};

export const DIFFICULTY_TABLE = [
  { level: "Trivial", roll: "No Roll", ex: "Checking Slack/Email" },
  { level: "Routine", roll: "5+", ex: "Examining Logs" },
  { level: "Challenging", roll: "10+", ex: "Unfamiliar Tool / Code Review" },
  { level: "Hard", roll: "15+", ex: "Restoring locked backups / IAM Fix" },
  { level: "Elite Hacker", roll: "20", ex: "Highly complex technical wizardry" },
];

// Get scenario by ID
export function getScenario(id) {
  return SCENARIOS[id] || SCENARIOS['ddos-attack'];
}

// Get all scenario IDs
export function getScenarioIds() {
  return Object.keys(SCENARIOS);
}

// Get scenario list for selection
export function getScenarioList() {
  return Object.values(SCENARIOS).map(s => ({
    id: s.id,
    title: s.title,
    difficulty: s.difficulty,
    description: s.description
  }));
}
