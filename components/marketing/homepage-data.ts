export const buyerSignals = [
  "Candidates",
  "Campaigns",
  "PACs",
  "Committees",
  "Issue Groups",
  "Digital Teams",
  "Creators",
  "Influencers",
];

export const marketplaceStats = [
  { value: "5", label: "Core social channels" },
  { value: "2", label: "Sides of the marketplace" },
  { value: "1", label: "Workflow from sourcing to payout" },
  { value: "0", label: "Generic marketplace noise" },
];

export const workflowSteps = [
  {
    step: "01",
    title: "Launch a message campaign",
    description:
      "Set the message, audience, geography, creator criteria, and content lane in one marketplace workflow built for political teams.",
  },
  {
    step: "02",
    title: "Match with aligned creators",
    description:
      "Find creators by platform, issue fluency, geography, audience shape, and message fit across TikTok, Instagram, Facebook, Bluesky, and X.",
  },
  {
    step: "03",
    title: "Review, activate, and pay",
    description:
      "Run the brief, approve the content, and move creators into paid political campaigns without spreadsheet chaos.",
  },
];

export const platformBenefits = [
  {
    badge: "01",
    title: "Replace spreadsheet creator ops",
    description:
      "Manage discovery, creator matching, briefs, approvals, and payouts from one organized political workflow.",
  },
  {
    badge: "02",
    title: "Launch message-driven campaigns faster",
    description:
      "Turn campaign strategy into creator-ready execution across persuasion, narrative response, issue pushes, and turnout.",
  },
  {
    badge: "03",
    title: "Run a real two-sided marketplace",
    description:
      "Give campaigns a premium way to hire talent while giving creators a professional path to get selected and paid.",
  },
  {
    badge: "04",
    title: "Stay built for modern political media",
    description:
      "The product is shaped for the channels where narrative, persuasion, and attention actually move now.",
  },
];

export const audienceCards = [
  {
    eyebrow: "For campaigns",
    title: "Launch creator campaigns with message discipline and marketplace clarity.",
    description:
      "PolitiViral gives political buyers a premium surface to discover aligned creators, launch content campaigns, review deliverables, and pay talent in one place.",
    points: [
      "Set campaign goals, audience targets, and creator criteria",
      "Find aligned voices across five core social channels",
      "Run approvals, deliverables, and payments from one workflow",
    ],
    href: "/for-campaigns",
    action: "Explore campaign workflows",
  },
  {
    eyebrow: "For creators",
    title: "Join the political creator marketplace and get selected for serious work.",
    description:
      "Creators build a cleaner profile, show where their content fits politically, get discovered by buyers, and move into paid campaigns with less friction.",
    points: [
      "Show platform, content style, audience, and political fit",
      "Receive campaign opportunities tied to real deliverables",
      "Build repeat relationships with modern political buyers",
    ],
    href: "/for-creators",
    action: "Explore creator workflows",
  },
];

export const productModules = [
  {
    title: "Discover",
    subtitle: "Search aligned political creators by platform, geography, and content style.",
    tags: ["TikTok", "Instagram", "Statewide", "Issue explainers"],
    metric: "312 creators",
  },
  {
    title: "Brief",
    subtitle: "Package persuasion, narrative, and action goals into creator-ready campaign briefs.",
    tags: ["Narrative", "Rapid response", "Opinion", "Action"],
    metric: "4 live briefs",
  },
  {
    title: "Review",
    subtitle: "Approve scripts, cutdowns, and creator submissions inside the same workflow.",
    tags: ["Needs review", "Revisions", "Approved", "Scheduled"],
    metric: "11 assets",
  },
  {
    title: "Pay",
    subtitle: "Track creator work, move toward payouts, and keep campaign operations visible.",
    tags: ["Pending", "Cleared", "In flight", "Delivered"],
    metric: "$18.4k booked",
  },
];

export const platformFeatureCards = [
  {
    title: "Your political creator discovery engine",
    description:
      "Find political content makers who match the message, the moment, and the audience you need to move.",
  },
  {
    title: "Campaign briefs built for persuasion and narrative",
    description:
      "Organize creator asks around real campaign outcomes instead of generic influencer campaign templates.",
  },
  {
    title: "Marketplace logic that supports selection and payment",
    description:
      "Run the buyer side and the creator side in one polished system designed to scale with the work.",
  },
];

export const creatorChannels = [
  {
    accent: "from-[#101723] via-[#15203d] to-[#0c1321]",
    avatarTone: "from-[#1dd3f8] via-[#2156ff] to-[#ff3b92]",
    contentStyles: ["Explainers", "Rapid response", "Swing-state audience"],
    description:
      "Voting-rights explainers, stitched reactions, and fast-turn narrative responses for younger persuasion audiences.",
    engagement: "6.8% ER",
    followers: "184K",
    handle: "@sofiavotes",
    lane: "Voting rights",
    location: "Phoenix, AZ",
    name: "Sofia Ramirez",
    platform: "TikTok",
    status: "Invite-ready",
    title: "Rapid persuasion creators",
    trustCue: "Verified for paid political briefs",
  },
  {
    accent: "from-[#51284a] via-[#844271] to-[#d16a78]",
    avatarTone: "from-[#6f4cff] via-[#b74bf0] to-[#ff8b58]",
    contentStyles: ["Reels", "Candidate moments", "Lifestyle politics"],
    description:
      "Reel-first storytellers who turn candidate moments and issue narratives into polished, shareable political content.",
    engagement: "4.9% ER",
    followers: "92K",
    handle: "@malikmovesmedia",
    lane: "Narrative",
    location: "Atlanta, GA",
    name: "Malik Carter",
    platform: "Instagram",
    status: "Open to statewide briefs",
    title: "Polished narrative voices",
    trustCue: "Strong story-to-camera performance",
  },
  {
    accent: "from-[#17335f] via-[#24548e] to-[#3c78bf]",
    avatarTone: "from-[#1d4ed8] via-[#2563eb] to-[#60a5fa]",
    contentStyles: ["Local trust", "Community proof", "Action pushes"],
    description:
      "Community-trust creators who move local audiences with event momentum, organizer energy, and call-to-action content.",
    engagement: "5.1% ER",
    followers: "58K",
    handle: "@naomiorganizes",
    lane: "Community outreach",
    location: "Milwaukee, WI",
    name: "Naomi Brooks",
    platform: "Facebook",
    status: "High-fit for turnout work",
    title: "Community-trust creators",
    trustCue: "Reliable turnout and action messaging",
  },
  {
    accent: "from-[#0e4e81] via-[#13659e] to-[#2294db]",
    avatarTone: "from-[#0ea5e9] via-[#2563eb] to-[#7dd3fc]",
    contentStyles: ["Opinion", "Policy fluency", "Narrative framing"],
    description:
      "High-context opinion makers who translate policy, discourse, and campaign moments into credible political takes.",
    engagement: "7.4% ER",
    followers: "41K",
    handle: "@averycivics",
    lane: "Policy context",
    location: "Washington, DC",
    name: "Avery Chen",
    platform: "Bluesky",
    status: "Trusted for issue narratives",
    title: "High-context opinion makers",
    trustCue: "Strong policy and media fluency",
  },
  {
    accent: "from-[#14181f] via-[#232b39] to-[#3a4658]",
    avatarTone: "from-[#111827] via-[#334155] to-[#94a3b8]",
    contentStyles: ["Debate night", "Commentary", "Pressure-cycle clips"],
    description:
      "Real-time amplification creators who turn debate moments, endorsements, and fast-moving narratives into shareable commentary.",
    engagement: "5.7% ER",
    followers: "129K",
    handle: "@jordansignals",
    lane: "Rapid commentary",
    location: "Philadelphia, PA",
    name: "Jordan Ellis",
    platform: "X",
    status: "Fast-turn response ready",
    title: "Real-time amplification",
    trustCue: "Reliable for debate and news-cycle bursts",
  },
];

export const useCases = [
  {
    label: "Candidate persuasion",
    title: "Run creator campaigns around biography, stakes, contrast, and persuasion.",
    description:
      "Ideal for candidates, statewide campaigns, and coordinated messaging pushes that need authentic political creators to move undecided or low-attention audiences.",
    points: ["Direct-to-camera persuasion", "Interview cutdowns", "Creator-led contrast videos"],
  },
  {
    label: "Issue advocacy",
    title: "Activate creators around policy, causes, ballot fights, and issue education.",
    description:
      "Give advocacy groups and issue campaigns a stronger way to shape narrative and drive action without falling into generic nonprofit marketing.",
    points: ["Issue explainers", "Narrative reframing", "Tracked action links"],
  },
  {
    label: "Rapid response",
    title: "Move fast when the moment changes and the narrative needs pressure.",
    description:
      "Coordinate creator reactions around debates, interviews, attacks, endorsements, major news moments, or opposition narratives.",
    points: ["Fast-turn reactions", "Opinion content", "Same-day creator briefs"],
  },
  {
    label: "Turnout and fundraising",
    title: "Use creator trust to drive signups, volunteers, small-dollar energy, and turnout.",
    description:
      "Connect creators with campaign moments that ask audiences to do something concrete, from giving to showing up.",
    points: ["Volunteer pushes", "Donation asks", "Merch and turnout links"],
  },
];

export const faqItems = [
  {
    question: "Who is PolitiViral built for?",
    answer:
      "PolitiViral is built for Democratic and progressive campaigns, PACs, committees, issue groups, advocacy organizations, strategists, and political creators who want a premium marketplace for creator-led political work.",
  },
  {
    question: "Is this just another influencer marketplace?",
    answer:
      "No. The product is purpose-built for message campaigns, persuasion content, narrative shaping, opinion videos, creator-led issue communication, and political engagement work.",
  },
  {
    question: "What kind of creator work can run here?",
    answer:
      "Campaigns can run persuasion videos, opinion content, rapid-response reactions, interview clips, promotional assets, tracked action campaigns, and other creator deliverables tied to political goals.",
  },
  {
    question: "Can creators use PolitiViral too?",
    answer:
      "Yes. Creators can join the marketplace, build a campaign-ready profile, get selected for aligned work, and move into paid political creator campaigns.",
  },
];

export const heroCreators = [
  {
    audience: "184K",
    fit: "High fit",
    handle: "@sofiavotes",
    lane: "Voting rights",
    location: "Phoenix, AZ",
    name: "Sofia Ramirez",
    platform: "TikTok",
    summary:
      "Progressive creator covering voting rights, education, and Arizona politics with direct-to-camera explainers and rapid reactions.",
  },
  {
    audience: "62K",
    fit: "Strong fit",
    handle: "@malikmovesmedia",
    lane: "Narrative",
    location: "Atlanta, GA",
    name: "Malik Carter",
    platform: "Instagram",
    summary:
      "Political storyteller producing reel-first issue packages, candidate moments, and creator-led interviews for younger audiences.",
  },
];
