import type { FeedbackItem, CategoryData, DashboardStats, DashboardData } from "@/types"

// Raw feedback data from n8n/webhook
interface RawFeedback {
  id: string
  timestamp: string
  feedback: string
  department: string
  anonymous: boolean
  category: string
  sentiment: "positive" | "neutral" | "negative"
  summary: string
  user_id?: string
}

// Import the fake feedback data
const rawFeedbackData: RawFeedback[] = [
  {
    "id": "67",
    "timestamp": "2026-01-31T10:59:58.080Z",
    "feedback": "Team retrospectives have really improved.",
    "department": "Customer Success",
    "anonymous": true,
    "category": "Communication",
    "sentiment": "positive",
    "summary": "Retros are effective",
    "user_id": "4"
  },
  {
    "id": "86",
    "timestamp": "2026-01-31T01:39:03.018Z",
    "feedback": "Weekly all-hands are fine, could be more interactive.",
    "department": "Product",
    "anonymous": true,
    "category": "Communication",
    "sentiment": "neutral",
    "summary": "All-hands could improve",
    "user_id": "1"
  },
  {
    "id": "68",
    "timestamp": "2026-01-30T10:08:40.436Z",
    "feedback": "Work-life balance is just a phrase here.",
    "department": "Product",
    "anonymous": true,
    "category": "Culture",
    "sentiment": "negative",
    "summary": "Poor work-life balance",
    "user_id": "1"
  },
  {
    "id": "28",
    "timestamp": "2026-01-29T17:50:02.669Z",
    "feedback": "GitHub Copilot is a game changer.",
    "department": "Marketing",
    "anonymous": true,
    "category": "Tools",
    "sentiment": "positive",
    "summary": "Copilot boosting productivity",
    "user_id": "3"
  },
  {
    "id": "7",
    "timestamp": "2026-01-29T15:02:12.476Z",
    "feedback": "Career growth paths are completely unclear.",
    "department": "Engineering",
    "anonymous": true,
    "category": "Culture",
    "sentiment": "negative",
    "summary": "Unclear career paths",
    "user_id": "2"
  },
  {
    "id": "73",
    "timestamp": "2026-01-28T19:16:24.682Z",
    "feedback": "Switching to Notion was the best decision ever!",
    "department": "Product",
    "anonymous": true,
    "category": "Tools",
    "sentiment": "positive",
    "summary": "Notion adoption successful",
    "user_id": "1"
  },
  {
    "id": "97",
    "timestamp": "2026-01-28T05:38:56.160Z",
    "feedback": "Our internal tools are outdated and breaking.",
    "department": "Customer Success",
    "anonymous": true,
    "category": "Tools",
    "sentiment": "negative",
    "summary": "Internal tools outdated",
    "user_id": "4"
  },
  {
    "id": "35",
    "timestamp": "2026-01-27T07:55:09.533Z",
    "feedback": "Love the new CI/CD pipeline!",
    "department": "HR",
    "anonymous": false,
    "category": "Process",
    "sentiment": "positive",
    "summary": "CI/CD pipeline working great",
    "user_id": "8"
  },
  {
    "id": "47",
    "timestamp": "2026-01-27T00:40:06.969Z",
    "feedback": "New office plants brighten up the space!",
    "department": "Marketing",
    "anonymous": false,
    "category": "Other",
    "sentiment": "positive",
    "summary": "Plants appreciated",
    "user_id": "3"
  },
  {
    "id": "65",
    "timestamp": "2026-01-26T20:45:58.543Z",
    "feedback": "The new ticket system is okay, needs customization.",
    "department": "Product",
    "anonymous": true,
    "category": "Process",
    "sentiment": "neutral",
    "summary": "Ticket system adequate",
    "user_id": "1"
  },
  {
    "id": "34",
    "timestamp": "2026-01-26T18:59:39.925Z",
    "feedback": "The office coffee is terrible.",
    "department": "Engineering",
    "anonymous": false,
    "category": "Other",
    "sentiment": "negative",
    "summary": "Coffee needs upgrade",
    "user_id": "6"
  },
  {
    "id": "87",
    "timestamp": "2026-01-25T09:41:24.656Z",
    "feedback": "Figma works fine, collaboration could be better.",
    "department": "Engineering",
    "anonymous": true,
    "category": "Tools",
    "sentiment": "neutral",
    "summary": "Figma needs better collab",
    "user_id": "2"
  },
  {
    "id": "51",
    "timestamp": "2026-01-25T01:02:36.388Z",
    "feedback": "The deployment process takes way too long. We need automation.",
    "department": "Sales",
    "anonymous": true,
    "category": "Process",
    "sentiment": "negative",
    "summary": "Deployment process needs automation",
    "user_id": "7"
  },
  {
    "id": "58",
    "timestamp": "2026-01-24T22:12:06.677Z",
    "feedback": "Our standup format works, but maybe we should try async.",
    "department": "Marketing",
    "anonymous": true,
    "category": "Process",
    "sentiment": "neutral",
    "summary": "Consider async standups",
    "user_id": "3"
  },
  {
    "id": "88",
    "timestamp": "2026-01-24T16:00:10.919Z",
    "feedback": "The new weekly newsletter is fantastic!",
    "department": "Sales",
    "anonymous": true,
    "category": "Communication",
    "sentiment": "positive",
    "summary": "Newsletter appreciated",
    "user_id": "7"
  },
  {
    "id": "95",
    "timestamp": "2026-01-24T09:50:43.779Z",
    "feedback": "Would be nice to have more snacks.",
    "department": "HR",
    "anonymous": false,
    "category": "Other",
    "sentiment": "neutral",
    "summary": "More snacks requested",
    "user_id": "8"
  },
  {
    "id": "82",
    "timestamp": "2026-01-24T08:20:11.392Z",
    "feedback": "GitHub Copilot is a game changer.",
    "department": "Product",
    "anonymous": true,
    "category": "Tools",
    "sentiment": "positive",
    "summary": "Copilot boosting productivity",
    "user_id": "1"
  },
  {
    "id": "33",
    "timestamp": "2026-01-24T06:14:26.774Z",
    "feedback": "Team events are nice but always the same format.",
    "department": "Product",
    "anonymous": true,
    "category": "Culture",
    "sentiment": "neutral",
    "summary": "Events need variety",
    "user_id": "1"
  },
  {
    "id": "92",
    "timestamp": "2026-01-23T17:16:36.915Z",
    "feedback": "Too many Slack channels. Information is scattered.",
    "department": "Product",
    "anonymous": true,
    "category": "Communication",
    "sentiment": "negative",
    "summary": "Slack channel overload",
    "user_id": "1"
  },
  {
    "id": "27",
    "timestamp": "2026-01-23T15:12:33.410Z",
    "feedback": "The VPN is so slow, remote work is painful.",
    "department": "Marketing",
    "anonymous": true,
    "category": "Tools",
    "sentiment": "negative",
    "summary": "VPN performance issues",
    "user_id": "3"
  },
  {
    "id": "59",
    "timestamp": "2026-01-23T08:28:18.516Z",
    "feedback": "Cross-team communication is basically non-existent.",
    "department": "HR",
    "anonymous": false,
    "category": "Communication",
    "sentiment": "negative",
    "summary": "Poor cross-team comms",
    "user_id": "8"
  },
  {
    "id": "99",
    "timestamp": "2026-01-23T04:04:08.233Z",
    "feedback": "Code review process is bottlenecking our releases.",
    "department": "Engineering",
    "anonymous": true,
    "category": "Process",
    "sentiment": "negative",
    "summary": "Code review causing delays",
    "user_id": "2"
  },
  {
    "id": "29",
    "timestamp": "2026-01-22T22:14:40.021Z",
    "feedback": "Flexible hours changed my productivity.",
    "department": "Customer Success",
    "anonymous": true,
    "category": "Culture",
    "sentiment": "positive",
    "summary": "Flex hours working well",
    "user_id": "4"
  },
  {
    "id": "15",
    "timestamp": "2026-01-22T12:05:17.558Z",
    "feedback": "Important decisions exclude remote workers.",
    "department": "Marketing",
    "anonymous": true,
    "category": "Communication",
    "sentiment": "negative",
    "summary": "Remote workers left out",
    "user_id": "3"
  },
  {
    "id": "36",
    "timestamp": "2026-01-21T22:42:23.080Z",
    "feedback": "Onboarding process has improved significantly.",
    "department": "Operations",
    "anonymous": true,
    "category": "Process",
    "sentiment": "positive",
    "summary": "Onboarding improved",
    "user_id": "5"
  },
  {
    "id": "63",
    "timestamp": "2026-01-21T08:22:32.918Z",
    "feedback": "The new ticket system is okay, needs customization.",
    "department": "Customer Success",
    "anonymous": true,
    "category": "Process",
    "sentiment": "neutral",
    "summary": "Ticket system adequate",
    "user_id": "4"
  },
  {
    "id": "54",
    "timestamp": "2026-01-21T06:39:44.833Z",
    "feedback": "The new weekly newsletter is fantastic!",
    "department": "Marketing",
    "anonymous": true,
    "category": "Communication",
    "sentiment": "positive",
    "summary": "Newsletter appreciated",
    "user_id": "3"
  },
  {
    "id": "84",
    "timestamp": "2026-01-21T02:52:23.159Z",
    "feedback": "Too many Slack channels. Information is scattered.",
    "department": "Product",
    "anonymous": true,
    "category": "Communication",
    "sentiment": "negative",
    "summary": "Slack channel overload",
    "user_id": "1"
  },
  {
    "id": "45",
    "timestamp": "2026-01-20T22:58:28.070Z",
    "feedback": "The office coffee is terrible.",
    "department": "Engineering",
    "anonymous": true,
    "category": "Other",
    "sentiment": "negative",
    "summary": "Coffee needs upgrade",
    "user_id": "6"
  },
  {
    "id": "93",
    "timestamp": "2026-01-20T20:51:27.502Z",
    "feedback": "Flexible hours changed my productivity.",
    "department": "Product",
    "anonymous": true,
    "category": "Culture",
    "sentiment": "positive",
    "summary": "Flex hours working well",
    "user_id": "1"
  },
  {
    "id": "55",
    "timestamp": "2026-01-20T09:49:01.578Z",
    "feedback": "Career growth paths are completely unclear.",
    "department": "Marketing",
    "anonymous": true,
    "category": "Culture",
    "sentiment": "negative",
    "summary": "Unclear career paths",
    "user_id": "3"
  },
  {
    "id": "85",
    "timestamp": "2026-01-19T22:53:36.361Z",
    "feedback": "Blame culture when things go wrong.",
    "department": "Operations",
    "anonymous": true,
    "category": "Culture",
    "sentiment": "negative",
    "summary": "Blame culture exists",
    "user_id": "5"
  },
  {
    "id": "94",
    "timestamp": "2026-01-19T18:25:44.775Z",
    "feedback": "New office plants brighten up the space!",
    "department": "Operations",
    "anonymous": false,
    "category": "Other",
    "sentiment": "positive",
    "summary": "Plants appreciated",
    "user_id": "5"
  },
  {
    "id": "24",
    "timestamp": "2026-01-19T08:00:02.668Z",
    "feedback": "Career growth paths are completely unclear.",
    "department": "Sales",
    "anonymous": true,
    "category": "Culture",
    "sentiment": "negative",
    "summary": "Unclear career paths",
    "user_id": "7"
  },
  {
    "id": "25",
    "timestamp": "2026-01-19T07:29:37.140Z",
    "feedback": "Flexible hours changed my productivity.",
    "department": "Marketing",
    "anonymous": true,
    "category": "Culture",
    "sentiment": "positive",
    "summary": "Flex hours working well",
    "user_id": "3"
  },
  {
    "id": "8",
    "timestamp": "2026-01-19T03:15:21.762Z",
    "feedback": "Career growth paths are completely unclear.",
    "department": "Engineering",
    "anonymous": false,
    "category": "Culture",
    "sentiment": "negative",
    "summary": "Unclear career paths",
    "user_id": "6"
  },
  {
    "id": "57",
    "timestamp": "2026-01-18T21:34:11.447Z",
    "feedback": "Important decisions exclude remote workers.",
    "department": "Customer Success",
    "anonymous": true,
    "category": "Communication",
    "sentiment": "negative",
    "summary": "Remote workers left out",
    "user_id": "4"
  },
  {
    "id": "76",
    "timestamp": "2026-01-18T12:43:16.088Z",
    "feedback": "New office plants brighten up the space!",
    "department": "Operations",
    "anonymous": true,
    "category": "Other",
    "sentiment": "positive",
    "summary": "Plants appreciated",
    "user_id": "5"
  },
  {
    "id": "98",
    "timestamp": "2026-01-18T00:24:56.081Z",
    "feedback": "Jira is a nightmare. Can we switch to Linear?",
    "department": "Operations",
    "anonymous": false,
    "category": "Tools",
    "sentiment": "negative",
    "summary": "Request to switch from Jira",
    "user_id": "5"
  },
  {
    "id": "13",
    "timestamp": "2026-01-17T17:21:57.765Z",
    "feedback": "Our internal tools are outdated and breaking.",
    "department": "Engineering",
    "anonymous": false,
    "category": "Tools",
    "sentiment": "negative",
    "summary": "Internal tools outdated",
    "user_id": "2"
  },
  {
    "id": "39",
    "timestamp": "2026-01-17T16:12:57.470Z",
    "feedback": "Team events are nice but always the same format.",
    "department": "Marketing",
    "anonymous": false,
    "category": "Culture",
    "sentiment": "neutral",
    "summary": "Events need variety",
    "user_id": "3"
  },
  {
    "id": "64",
    "timestamp": "2026-01-17T08:19:49.518Z",
    "feedback": "Weekly all-hands are fine, could be more interactive.",
    "department": "Sales",
    "anonymous": true,
    "category": "Communication",
    "sentiment": "neutral",
    "summary": "All-hands could improve",
    "user_id": "7"
  },
  {
    "id": "69",
    "timestamp": "2026-01-17T07:59:27.411Z",
    "feedback": "Figma works fine, collaboration could be better.",
    "department": "Customer Success",
    "anonymous": true,
    "category": "Tools",
    "sentiment": "neutral",
    "summary": "Figma needs better collab",
    "user_id": "4"
  },
  {
    "id": "71",
    "timestamp": "2026-01-17T05:32:23.719Z",
    "feedback": "Team retrospectives have really improved.",
    "department": "Engineering",
    "anonymous": true,
    "category": "Communication",
    "sentiment": "positive",
    "summary": "Retros are effective",
    "user_id": "2"
  },
  {
    "id": "44",
    "timestamp": "2026-01-17T03:46:10.080Z",
    "feedback": "Our standup format works, but maybe we should try async.",
    "department": "Sales",
    "anonymous": true,
    "category": "Process",
    "sentiment": "neutral",
    "summary": "Consider async standups",
    "user_id": "7"
  },
  {
    "id": "89",
    "timestamp": "2026-01-17T02:57:53.379Z",
    "feedback": "Weekly all-hands are fine, could be more interactive.",
    "department": "HR",
    "anonymous": true,
    "category": "Communication",
    "sentiment": "neutral",
    "summary": "All-hands could improve",
    "user_id": "8"
  },
  {
    "id": "9",
    "timestamp": "2026-01-17T02:40:55.941Z",
    "feedback": "The office coffee is terrible.",
    "department": "Marketing",
    "anonymous": true,
    "category": "Other",
    "sentiment": "negative",
    "summary": "Coffee needs upgrade",
    "user_id": "3"
  },
  {
    "id": "78",
    "timestamp": "2026-01-17T00:13:22.219Z",
    "feedback": "Onboarding process has improved significantly.",
    "department": "Engineering",
    "anonymous": false,
    "category": "Process",
    "sentiment": "positive",
    "summary": "Onboarding improved",
    "user_id": "6"
  },
  {
    "id": "74",
    "timestamp": "2026-01-16T06:13:07.793Z",
    "feedback": "Too many Slack channels. Information is scattered.",
    "department": "Operations",
    "anonymous": true,
    "category": "Communication",
    "sentiment": "negative",
    "summary": "Slack channel overload",
    "user_id": "5"
  },
  {
    "id": "52",
    "timestamp": "2026-01-16T02:30:42.531Z",
    "feedback": "Team retrospectives have really improved.",
    "department": "Engineering",
    "anonymous": true,
    "category": "Communication",
    "sentiment": "positive",
    "summary": "Retros are effective",
    "user_id": "2"
  },
  {
    "id": "6",
    "timestamp": "2026-01-15T22:00:29.637Z",
    "feedback": "Cross-team communication is basically non-existent.",
    "department": "Sales",
    "anonymous": true,
    "category": "Communication",
    "sentiment": "negative",
    "summary": "Poor cross-team comms",
    "user_id": "7"
  },
  {
    "id": "43",
    "timestamp": "2026-01-15T13:51:13.457Z",
    "feedback": "The office coffee is terrible.",
    "department": "Operations",
    "anonymous": true,
    "category": "Other",
    "sentiment": "negative",
    "summary": "Coffee needs upgrade",
    "user_id": "5"
  },
  {
    "id": "61",
    "timestamp": "2026-01-15T10:45:29.352Z",
    "feedback": "Would be nice to have more snacks.",
    "department": "HR",
    "anonymous": true,
    "category": "Other",
    "sentiment": "neutral",
    "summary": "More snacks requested",
    "user_id": "8"
  },
  {
    "id": "60",
    "timestamp": "2026-01-15T10:37:59.642Z",
    "feedback": "Figma works fine, collaboration could be better.",
    "department": "Engineering",
    "anonymous": false,
    "category": "Tools",
    "sentiment": "neutral",
    "summary": "Figma needs better collab",
    "user_id": "6"
  },
  {
    "id": "20",
    "timestamp": "2026-01-15T09:04:41.337Z",
    "feedback": "The office coffee is terrible.",
    "department": "Customer Success",
    "anonymous": true,
    "category": "Other",
    "sentiment": "negative",
    "summary": "Coffee needs upgrade",
    "user_id": "4"
  },
  {
    "id": "16",
    "timestamp": "2026-01-14T21:29:24.404Z",
    "feedback": "The new weekly newsletter is fantastic!",
    "department": "Sales",
    "anonymous": true,
    "category": "Communication",
    "sentiment": "positive",
    "summary": "Newsletter appreciated",
    "user_id": "7"
  },
  {
    "id": "46",
    "timestamp": "2026-01-14T14:40:48.595Z",
    "feedback": "GitHub Copilot is a game changer.",
    "department": "Product",
    "anonymous": true,
    "category": "Tools",
    "sentiment": "positive",
    "summary": "Copilot boosting productivity",
    "user_id": "1"
  },
  {
    "id": "19",
    "timestamp": "2026-01-14T13:58:23.741Z",
    "feedback": "Figma works fine, collaboration could be better.",
    "department": "Sales",
    "anonymous": false,
    "category": "Tools",
    "sentiment": "neutral",
    "summary": "Figma needs better collab",
    "user_id": "7"
  },
  {
    "id": "3",
    "timestamp": "2026-01-14T13:11:24.674Z",
    "feedback": "Figma works fine, collaboration could be better.",
    "department": "Marketing",
    "anonymous": false,
    "category": "Tools",
    "sentiment": "neutral",
    "summary": "Figma needs better collab",
    "user_id": "3"
  },
  {
    "id": "80",
    "timestamp": "2026-01-14T11:16:32.368Z",
    "feedback": "Our internal tools are outdated and breaking.",
    "department": "Operations",
    "anonymous": false,
    "category": "Tools",
    "sentiment": "negative",
    "summary": "Internal tools outdated",
    "user_id": "5"
  },
  {
    "id": "18",
    "timestamp": "2026-01-14T08:14:15.727Z",
    "feedback": "Sprint planning meetings are inefficient.",
    "department": "HR",
    "anonymous": true,
    "category": "Process",
    "sentiment": "negative",
    "summary": "Sprint planning needs improvement",
    "user_id": "8"
  },
  {
    "id": "32",
    "timestamp": "2026-01-14T06:56:20.941Z",
    "feedback": "Cross-team communication is basically non-existent.",
    "department": "Engineering",
    "anonymous": true,
    "category": "Communication",
    "sentiment": "negative",
    "summary": "Poor cross-team comms",
    "user_id": "2"
  },
  {
    "id": "96",
    "timestamp": "2026-01-14T03:43:34.354Z",
    "feedback": "Team retrospectives have really improved.",
    "department": "Customer Success",
    "anonymous": true,
    "category": "Communication",
    "sentiment": "positive",
    "summary": "Retros are effective",
    "user_id": "4"
  },
  {
    "id": "79",
    "timestamp": "2026-01-14T03:23:46.035Z",
    "feedback": "The new ticket system is okay, needs customization.",
    "department": "Customer Success",
    "anonymous": true,
    "category": "Process",
    "sentiment": "neutral",
    "summary": "Ticket system adequate",
    "user_id": "4"
  },
  {
    "id": "41",
    "timestamp": "2026-01-13T09:18:12.635Z",
    "feedback": "Figma works fine, collaboration could be better.",
    "department": "Customer Success",
    "anonymous": false,
    "category": "Tools",
    "sentiment": "neutral",
    "summary": "Figma needs better collab",
    "user_id": "4"
  },
  {
    "id": "62",
    "timestamp": "2026-01-13T04:14:52.616Z",
    "feedback": "Switching to Notion was the best decision ever!",
    "department": "Product",
    "anonymous": true,
    "category": "Tools",
    "sentiment": "positive",
    "summary": "Notion adoption successful",
    "user_id": "1"
  },
  {
    "id": "38",
    "timestamp": "2026-01-12T21:29:35.675Z",
    "feedback": "New office plants brighten up the space!",
    "department": "Engineering",
    "anonymous": true,
    "category": "Other",
    "sentiment": "positive",
    "summary": "Plants appreciated",
    "user_id": "6"
  },
  {
    "id": "11",
    "timestamp": "2026-01-12T18:28:04.627Z",
    "feedback": "The office coffee is terrible.",
    "department": "Engineering",
    "anonymous": true,
    "category": "Other",
    "sentiment": "negative",
    "summary": "Coffee needs upgrade",
    "user_id": "2"
  },
  {
    "id": "37",
    "timestamp": "2026-01-12T13:17:42.780Z",
    "feedback": "The office coffee is terrible.",
    "department": "HR",
    "anonymous": true,
    "category": "Other",
    "sentiment": "negative",
    "summary": "Coffee needs upgrade",
    "user_id": "8"
  },
  {
    "id": "31",
    "timestamp": "2026-01-12T07:14:14.503Z",
    "feedback": "The VPN is so slow, remote work is painful.",
    "department": "Operations",
    "anonymous": true,
    "category": "Tools",
    "sentiment": "negative",
    "summary": "VPN performance issues",
    "user_id": "5"
  },
  {
    "id": "75",
    "timestamp": "2026-01-12T05:13:08.516Z",
    "feedback": "Jira is a nightmare. Can we switch to Linear?",
    "department": "HR",
    "anonymous": true,
    "category": "Tools",
    "sentiment": "negative",
    "summary": "Request to switch from Jira",
    "user_id": "8"
  },
  {
    "id": "70",
    "timestamp": "2026-01-12T01:54:28.391Z",
    "feedback": "Blame culture when things go wrong.",
    "department": "Engineering",
    "anonymous": true,
    "category": "Culture",
    "sentiment": "negative",
    "summary": "Blame culture exists",
    "user_id": "2"
  },
  {
    "id": "49",
    "timestamp": "2026-01-11T23:32:58.782Z",
    "feedback": "Team events are nice but always the same format.",
    "department": "Engineering",
    "anonymous": true,
    "category": "Culture",
    "sentiment": "neutral",
    "summary": "Events need variety",
    "user_id": "2"
  },
  {
    "id": "53",
    "timestamp": "2026-01-11T06:15:12.236Z",
    "feedback": "Would be nice to have more snacks.",
    "department": "HR",
    "anonymous": true,
    "category": "Other",
    "sentiment": "neutral",
    "summary": "More snacks requested",
    "user_id": "8"
  },
  {
    "id": "17",
    "timestamp": "2026-01-09T20:38:06.668Z",
    "feedback": "New office plants brighten up the space!",
    "department": "Customer Success",
    "anonymous": true,
    "category": "Other",
    "sentiment": "positive",
    "summary": "Plants appreciated",
    "user_id": "4"
  },
  {
    "id": "22",
    "timestamp": "2026-01-09T19:53:04.527Z",
    "feedback": "Would be nice to have more snacks.",
    "department": "Product",
    "anonymous": false,
    "category": "Other",
    "sentiment": "neutral",
    "summary": "More snacks requested",
    "user_id": "1"
  },
  {
    "id": "30",
    "timestamp": "2026-01-09T07:31:33.258Z",
    "feedback": "Would be nice to have more snacks.",
    "department": "Marketing",
    "anonymous": true,
    "category": "Other",
    "sentiment": "neutral",
    "summary": "More snacks requested",
    "user_id": "3"
  },
  {
    "id": "14",
    "timestamp": "2026-01-08T20:09:33.302Z",
    "feedback": "Love the new CI/CD pipeline!",
    "department": "Marketing",
    "anonymous": false,
    "category": "Process",
    "sentiment": "positive",
    "summary": "CI/CD pipeline working great",
    "user_id": "3"
  },
  {
    "id": "72",
    "timestamp": "2026-01-08T13:16:27.633Z",
    "feedback": "Code review process is bottlenecking our releases.",
    "department": "Sales",
    "anonymous": true,
    "category": "Process",
    "sentiment": "negative",
    "summary": "Code review causing delays",
    "user_id": "7"
  },
  {
    "id": "50",
    "timestamp": "2026-01-08T12:46:00.260Z",
    "feedback": "Switching to Notion was the best decision ever!",
    "department": "Engineering",
    "anonymous": true,
    "category": "Tools",
    "sentiment": "positive",
    "summary": "Notion adoption successful",
    "user_id": "6"
  },
  {
    "id": "83",
    "timestamp": "2026-01-08T11:09:00.656Z",
    "feedback": "Jira is a nightmare. Can we switch to Linear?",
    "department": "Sales",
    "anonymous": true,
    "category": "Tools",
    "sentiment": "negative",
    "summary": "Request to switch from Jira",
    "user_id": "7"
  },
  {
    "id": "1",
    "timestamp": "2026-01-08T01:29:45.788Z",
    "feedback": "Love the learning budget!",
    "department": "Product",
    "anonymous": true,
    "category": "Culture",
    "sentiment": "positive",
    "summary": "Learning budget valued",
    "user_id": "1"
  },
  {
    "id": "21",
    "timestamp": "2026-01-07T11:37:40.703Z",
    "feedback": "The new ticket system is okay, needs customization.",
    "department": "Sales",
    "anonymous": true,
    "category": "Process",
    "sentiment": "neutral",
    "summary": "Ticket system adequate",
    "user_id": "7"
  },
  {
    "id": "90",
    "timestamp": "2026-01-07T10:28:50.142Z",
    "feedback": "Would be nice to have more snacks.",
    "department": "Sales",
    "anonymous": true,
    "category": "Other",
    "sentiment": "neutral",
    "summary": "More snacks requested",
    "user_id": "7"
  },
  {
    "id": "5",
    "timestamp": "2026-01-06T22:05:04.248Z",
    "feedback": "Onboarding process has improved significantly.",
    "department": "Customer Success",
    "anonymous": true,
    "category": "Process",
    "sentiment": "positive",
    "summary": "Onboarding improved",
    "user_id": "4"
  },
  {
    "id": "2",
    "timestamp": "2026-01-06T20:39:08.617Z",
    "feedback": "Cross-team communication is basically non-existent.",
    "department": "Engineering",
    "anonymous": false,
    "category": "Communication",
    "sentiment": "negative",
    "summary": "Poor cross-team comms",
    "user_id": "6"
  },
  {
    "id": "48",
    "timestamp": "2026-01-05T10:03:31.390Z",
    "feedback": "New office plants brighten up the space!",
    "department": "Sales",
    "anonymous": false,
    "category": "Other",
    "sentiment": "positive",
    "summary": "Plants appreciated",
    "user_id": "7"
  },
  {
    "id": "77",
    "timestamp": "2026-01-04T10:05:43.220Z",
    "feedback": "Work-life balance is just a phrase here.",
    "department": "Marketing",
    "anonymous": false,
    "category": "Culture",
    "sentiment": "negative",
    "summary": "Poor work-life balance",
    "user_id": "3"
  },
  {
    "id": "91",
    "timestamp": "2026-01-04T01:27:18.547Z",
    "feedback": "The new ticket system is okay, needs customization.",
    "department": "HR",
    "anonymous": true,
    "category": "Process",
    "sentiment": "neutral",
    "summary": "Ticket system adequate",
    "user_id": "8"
  },
  {
    "id": "40",
    "timestamp": "2026-01-03T22:43:10.544Z",
    "feedback": "Team events are nice but always the same format.",
    "department": "Engineering",
    "anonymous": true,
    "category": "Culture",
    "sentiment": "neutral",
    "summary": "Events need variety",
    "user_id": "2"
  },
  {
    "id": "81",
    "timestamp": "2026-01-03T21:58:34.613Z",
    "feedback": "Team retrospectives have really improved.",
    "department": "Engineering",
    "anonymous": true,
    "category": "Communication",
    "sentiment": "positive",
    "summary": "Retros are effective",
    "user_id": "6"
  },
  {
    "id": "42",
    "timestamp": "2026-01-03T13:19:35.414Z",
    "feedback": "Figma works fine, collaboration could be better.",
    "department": "Engineering",
    "anonymous": true,
    "category": "Tools",
    "sentiment": "neutral",
    "summary": "Figma needs better collab",
    "user_id": "6"
  },
  {
    "id": "100",
    "timestamp": "2026-01-03T10:36:15.239Z",
    "feedback": "New office plants brighten up the space!",
    "department": "Operations",
    "anonymous": true,
    "category": "Other",
    "sentiment": "positive",
    "summary": "Plants appreciated",
    "user_id": "5"
  },
  {
    "id": "12",
    "timestamp": "2026-01-03T09:13:34.055Z",
    "feedback": "Flexible hours changed my productivity.",
    "department": "HR",
    "anonymous": true,
    "category": "Culture",
    "sentiment": "positive",
    "summary": "Flex hours working well",
    "user_id": "8"
  },
  {
    "id": "10",
    "timestamp": "2026-01-03T09:01:32.384Z",
    "feedback": "Cross-team communication is basically non-existent.",
    "department": "Operations",
    "anonymous": true,
    "category": "Communication",
    "sentiment": "negative",
    "summary": "Poor cross-team comms",
    "user_id": "5"
  },
  {
    "id": "23",
    "timestamp": "2026-01-03T02:27:29.397Z",
    "feedback": "Code review process is bottlenecking our releases.",
    "department": "Marketing",
    "anonymous": true,
    "category": "Process",
    "sentiment": "negative",
    "summary": "Code review causing delays",
    "user_id": "3"
  },
  {
    "id": "66",
    "timestamp": "2026-01-02T18:49:42.648Z",
    "feedback": "New office plants brighten up the space!",
    "department": "HR",
    "anonymous": true,
    "category": "Other",
    "sentiment": "positive",
    "summary": "Plants appreciated",
    "user_id": "8"
  },
  {
    "id": "4",
    "timestamp": "2026-01-02T18:29:18.833Z",
    "feedback": "The office coffee is terrible.",
    "department": "Customer Success",
    "anonymous": true,
    "category": "Other",
    "sentiment": "negative",
    "summary": "Coffee needs upgrade",
    "user_id": "4"
  },
  {
    "id": "26",
    "timestamp": "2026-01-02T16:47:34.743Z",
    "feedback": "GitHub Copilot is a game changer.",
    "department": "Engineering",
    "anonymous": true,
    "category": "Tools",
    "sentiment": "positive",
    "summary": "Copilot boosting productivity",
    "user_id": "2"
  },
  {
    "id": "56",
    "timestamp": "2026-01-01T20:43:03.402Z",
    "feedback": "Our internal tools are outdated and breaking.",
    "department": "Operations",
    "anonymous": false,
    "category": "Tools",
    "sentiment": "negative",
    "summary": "Internal tools outdated",
    "user_id": "5"
  }
]

// Convert raw feedback to FeedbackItem format
function convertToFeedbackItem(raw: RawFeedback): FeedbackItem {
  const date = new Date(raw.timestamp)
  const dateStr = date.toISOString().split("T")[0] // YYYY-MM-DD format

  return {
    id: raw.id,
    category: raw.category as FeedbackItem["category"],
    sentiment: raw.sentiment,
    summary: raw.summary || raw.feedback,
    date: dateStr,
    createdAt: raw.timestamp,
    source: "n8n"
  }
}

// Convert all raw feedback data
const allFeedbackItems: FeedbackItem[] = rawFeedbackData.map(convertToFeedbackItem)

/**
 * Randomly shuffle array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Get 25 randomly selected feedback items
 */
function getRandomFeedback(count: number = 25): FeedbackItem[] {
  const shuffled = shuffleArray(allFeedbackItems)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

/**
 * Calculate stats from feedback items
 */
function calculateStats(feedback: FeedbackItem[]): DashboardStats {
  const total = feedback.length

  // Calculate this week's feedback
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  const thisWeek = feedback.filter(f => {
    const feedbackDate = new Date(f.date)
    return feedbackDate >= weekAgo
  }).length

  // Calculate category distribution
  const categoryCounts = feedback.reduce((acc, f) => {
    acc[f.category] = (acc[f.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Find top category
  const topCategory = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || "Process"

  // Calculate sentiment score (percentage of positive)
  const positiveCount = feedback.filter(f => f.sentiment === "positive").length
  const sentimentScore = total > 0 ? Math.round((positiveCount / total) * 100) : 0

  // Calculate sentiment trend (mock for now, could be calculated from historical data)
  const sentimentTrend = Math.floor(Math.random() * 11) - 5 // Random between -5 and +5

  return {
    total,
    thisWeek,
    topCategory,
    sentimentScore,
    sentimentTrend
  }
}

/**
 * Calculate category distribution from feedback
 */
function calculateCategoryDistribution(feedback: FeedbackItem[]): CategoryData[] {
  const categoryCounts = feedback.reduce((acc, f) => {
    acc[f.category] = (acc[f.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const colors: Record<string, string> = {
    Process: "#2563EB",
    Communication: "#3B82F6",
    Tools: "#60A5FA",
    Culture: "#93C5FD",
    Other: "#BFDBFE"
  }

  const categories: FeedbackItem["category"][] = ["Process", "Communication", "Tools", "Culture", "Other"]

  return categories.map(category => ({
    name: category,
    count: categoryCounts[category] || 0,
    fill: colors[category]
  }))
}

/**
 * Get dashboard data with 25 randomly selected feedback items
 * This function is called each time the dashboard loads
 */
export function getMockDashboardData(): DashboardData {
  // Get 25 random feedback items
  const selectedFeedback = getRandomFeedback(25)

  // Calculate stats from selected feedback
  const stats = calculateStats(selectedFeedback)
  const categoryDistribution = calculateCategoryDistribution(selectedFeedback)

  return {
    stats,
    categoryDistribution,
    feedback: selectedFeedback
  }
}
