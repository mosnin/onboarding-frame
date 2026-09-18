import type { WizardConfig, OnboardingTheme } from "../types";

/**
 * Preset flows.
 *
 * Each one recreates a distinct real-world onboarding shape with fictional
 * product names and copy. They are ordinary configs: edit any field, or use
 * one as the starting point for your own.
 */

/* ------------------------------------------------------------------ *
 * 1. Fullscreen quiz — dark canvas, accent progress rail, poster cards
 * ------------------------------------------------------------------ */

export const fullscreenQuizTheme: OnboardingTheme = {
  scheme: "dark",
  brand: "#1fd760",
  brandForeground: "#08120c",
  ctaBackground: "#e6e6e6",
  ctaForeground: "#141414",
  radius: "0.9rem",
};

export const fullscreenQuiz: WizardConfig = {
  id: "lumen-setup",
  variant: "fullscreen-quiz",
  progressStyle: "bar",
  showBack: true,
  ctaLabel: "Continue",
  topBarAction: {
    id: "toggle-sound",
    label: "Toggle sound",
    glyph: "megaphone",
  },
  steps: [
    {
      id: "voice",
      title: "How do you want me to sound?",
      description: "Turn up your volume if you can't hear me.",
      fields: [
        {
          id: "voice",
          kind: "poster-cards",
          required: true,
          columns: 2,
          options: [
            {
              id: "melodic",
              label: "Melodic",
              gradient: "linear-gradient(170deg,#3a3f52,#c9b8ff)",
            },
            {
              id: "deep",
              label: "Deep",
              gradient: "linear-gradient(170deg,#13253a,#9fd8cc)",
            },
          ],
        },
        {
          id: "voice-on",
          kind: "toggle",
          label: "Voice on",
          defaultValue: true,
        },
      ],
    },
    {
      id: "level",
      title: "What level of programming are you currently at?",
      fields: [
        {
          id: "level",
          kind: "choice-cards",
          required: true,
          columns: 4,
          checkPosition: "none",
          options: [
            {
              id: "beginner",
              label: "Beginner",
              description: "I want to start from the basics.",
              code: 'print("hello")',
            },
            {
              id: "novice",
              label: "Novice",
              description: "I've seen, but not touched code before.",
              code: "if b > a:\n  print b",
            },
            {
              id: "intermediate",
              label: "Intermediate",
              description: "I can write simple programs with loops.",
              code: "for i in range(5):",
            },
            {
              id: "advanced",
              label: "Advanced",
              description: "I've written longer programs.",
              code: "def circle(size):",
            },
          ],
        },
      ],
    },
    {
      id: "goal",
      title: "What are you hoping to build?",
      skippable: true,
      fields: [
        {
          id: "goal",
          kind: "choice-cards",
          columns: 3,
          multiple: true,
          options: [
            { id: "games", label: "Games", glyph: "puzzle" },
            { id: "data", label: "Data science", glyph: "barChart" },
            { id: "web", label: "Websites", glyph: "globe" },
          ],
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ *
 * 2. Neon quiz — black canvas, top-edge accent bar, corner checks
 * ------------------------------------------------------------------ */

export const neonQuizTheme: OnboardingTheme = {
  scheme: "dark",
  brand: "#ccff00",
  brandForeground: "#101400",
  radius: "0.85rem",
  canvas: { kind: "solid" },
};

export const neonQuiz: WizardConfig = {
  id: "fathom-setup",
  variant: "neon-quiz",
  progressStyle: "bar",
  ctaLabel: "Continue",
  ctaStyle: "block",
  steps: [
    {
      id: "context",
      title: "How do you plan to use Fathom?",
      description: "We'll tailor features and tools to your goals.",
      fields: [
        {
          id: "context",
          kind: "choice-cards",
          required: true,
          columns: 2,
          checkPosition: "corner",
          options: [
            {
              id: "personal",
              label: "For personal use",
              description:
                "For individuals who want to build and experiment with their own projects.",
              glyph: "sparkle",
            },
            {
              id: "team",
              label: "With my team",
              description:
                "For organisations who want to collaborate and build at scale.",
              glyph: "users",
            },
          ],
        },
      ],
    },
    {
      id: "experience",
      title: "How experienced are you with generative tools?",
      description: "We'll adapt the interface to match your expertise level.",
      fields: [
        {
          id: "experience",
          kind: "choice-cards",
          required: true,
          columns: 2,
          checkPosition: "corner",
          options: [
            {
              id: "beginner",
              label: "Beginner",
              description: "Simple interface with ready-made templates.",
              glyph: "•",
            },
            {
              id: "intermediate",
              label: "Intermediate",
              description: "Fast workflows for trend-ready content.",
              glyph: "••",
            },
            {
              id: "advanced",
              label: "Advanced",
              description: "Consistent, brand-safe assets for client work.",
              glyph: "⋱",
            },
            {
              id: "expert",
              label: "Expert",
              description: "Full creative control with director tools.",
              glyph: "⁘",
            },
          ],
        },
      ],
    },
    {
      id: "outputs",
      title: "What do you want to create?",
      description: "Choose as many options as you want.",
      fields: [
        {
          id: "outputs",
          kind: "choice-cards",
          required: true,
          multiple: true,
          columns: 3,
          checkPosition: "corner",
          options: [
            { id: "video", label: "Video generation", glyph: "video" },
            { id: "image", label: "Image generation", glyph: "image" },
            { id: "upscale", label: "Upscale", glyph: "⤢" },
            { id: "cinematic", label: "Cinematic visuals", glyph: "video" },
            { id: "storyboard", label: "Storyboarding", glyph: "book" },
            { id: "vfx", label: "Filmmaking & VFX", glyph: "video" },
            { id: "ads", label: "Commercial & ad videos", glyph: "briefcase" },
            { id: "social", label: "Viral social content", glyph: "heart" },
            { id: "editing", label: "Editing & inpaint", glyph: "wand" },
          ],
        },
      ],
    },
    {
      id: "source",
      title: "How did you hear about us?",
      description: "This helps us improve our product.",
      sidePanel: {
        kind: "media",
        media: "linear-gradient(200deg,#1d2a33,#0d1116)",
        caption:
          "Commercial shot of a winter jacket on an open frozen landscape. Strong wind drives snow across the frame, cold blue-grey tones, dramatic high-contrast lighting.",
        metaChips: [
          { label: "Fathom 3.0", glyph: "sparkle" },
          { label: "9:16", glyph: "expand" },
          { label: "High quality", glyph: "gem" },
        ],
      },
      fields: [
        {
          id: "source",
          kind: "list-rows",
          required: true,
          columns: 2,
          options: [
            { id: "instagram", label: "Instagram", glyph: "brand:instagram" },
            { id: "x", label: "Twitter / X", glyph: "brand:x" },
            { id: "tiktok", label: "TikTok", glyph: "brand:tiktok" },
            { id: "youtube", label: "YouTube", glyph: "brand:youtube" },
            { id: "search", label: "Search", glyph: "search" },
            { id: "linkedin", label: "LinkedIn", glyph: "briefcase" },
            { id: "friend", label: "Word of mouth", glyph: "chat" },
            { id: "other", label: "Other", glyph: "⋯" },
          ],
        },
      ],
    },
    {
      id: "frustration",
      title: "Last question. What frustrates you most about generative tools?",
      description: "We'll focus on delivering what matters most to you.",
      sidePanel: {
        kind: "media",
        media: "linear-gradient(200deg,#c88a3a,#2b1d12)",
        caption:
          "Commercial sports sequence featuring performance eyewear. Dynamic cycling on a velodrome, smooth side tracking, bright daylight, crisp focus on reflective lenses.",
        metaChips: [
          { label: "Fathom 3.0", glyph: "sparkle" },
          { label: "9:16", glyph: "expand" },
          { label: "High quality", glyph: "gem" },
        ],
      },
      fields: [
        {
          id: "frustration",
          kind: "choice-cards",
          required: true,
          columns: 2,
          checkPosition: "corner",
          options: [
            { id: "cost", label: "High cost of top models", glyph: "dollar" },
            { id: "limits", label: "Limited generations", glyph: "clock" },
            { id: "quality", label: "Not production-ready", glyph: "wand" },
            {
              id: "consistency",
              label: "Inconsistent results",
              glyph: "image",
            },
            { id: "confusing", label: "Too confusing", glyph: "alert" },
            { id: "other", label: "Other" },
          ],
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ *
 * 3. Warm survey — cream canvas, dot pagination, list rows
 * ------------------------------------------------------------------ */

export const warmSurveyTheme: OnboardingTheme = {
  scheme: "light",
  brand: "#8fdc8f",
  brandForeground: "#10281a",
  ctaBackground: "#111111",
  ctaForeground: "#ffffff",
  radius: "0.9rem",
};

export const warmSurvey: WizardConfig = {
  id: "driftwood-setup",
  variant: "warm-survey",
  brandName: "Driftwood",
  progressStyle: "dots",
  showDots: true,
  showSchemeToggle: true,
  skipLabel: "Skip",
  ctaLabel: "Continue",
  ambientTiles: [
    "brand:instagram",
    "brand:x",
    "brand:linkedin",
    "brand:youtube",
    "brand:tiktok",
    "brand:pinterest",
    "brand:bluesky",
    "brand:threads",
    "brand:mastodon",
    "brand:facebook",
    "brand:reddit",
    "brand:discord",
  ],
  steps: [
    {
      id: "welcome",
      kind: "welcome",
      title: "Hey there 👋\nWelcome to Driftwood",
      ctaLabel: "Let's start",
    },
    {
      id: "role",
      title: "How would you describe yourself?",
      skippable: true,
      fields: [
        {
          id: "role",
          kind: "list-rows",
          required: true,
          columns: 2,
          options: [
            {
              id: "creator",
              label: "Solo creator",
              glyph: "hand",
              glyphTone: "#efe6ff",
            },
            {
              id: "smb",
              label: "Small business owner",
              glyph: "trendUp",
              glyphTone: "#ffe9de",
            },
            {
              id: "team",
              label: "Part of a marketing team",
              glyph: "building",
              glyphTone: "#e4f6e8",
            },
            {
              id: "freelancer",
              label: "Freelancer / consultant",
              glyph: "star",
              glyphTone: "#fdeaf4",
            },
            {
              id: "agency",
              label: "Marketing agency",
              glyph: "target",
              glyphTone: "#e2f5f3",
            },
            {
              id: "nonprofit",
              label: "Non-profit organisation",
              glyph: "trophy",
              glyphTone: "#ffeade",
            },
            {
              id: "other",
              label: "Other",
              glyph: "circle",
              glyphTone: "#eceaff",
            },
          ],
        },
      ],
    },
    {
      id: "tools",
      title: "What tools do you use to manage your social media?",
      skippable: true,
      fields: [
        {
          id: "tools",
          kind: "list-rows",
          required: true,
          multiple: true,
          columns: 2,
          options: [
            {
              id: "none",
              label: "None — I post to platforms directly",
              glyph: "monitor",
              glyphTone: "#efe6ff",
            },
            {
              id: "suite",
              label: "A platform's own business suite",
              glyph: "layers",
              glyphTone: "#ffe4e4",
            },
            {
              id: "smm",
              label: "An existing management tool",
              description: "e.g. a scheduler you already pay for",
              glyph: "settings",
              glyphTone: "#e4f6e8",
            },
            {
              id: "niche",
              label: "Tools for specific platforms",
              description: "e.g. a single-network scheduler",
              glyph: "puzzle",
              glyphTone: "#fdeaf4",
            },
            {
              id: "ai",
              label: "AI assistants",
              description: "for drafting and ideas",
              glyph: "robot",
              glyphTone: "#e2f5f3",
            },
            {
              id: "other",
              label: "Other",
              glyph: "circle",
              glyphTone: "#eceaff",
            },
          ],
        },
      ],
    },
    {
      id: "accounts",
      title: "How many social accounts do you currently manage?",
      skippable: true,
      fields: [
        {
          id: "accounts",
          kind: "list-rows",
          required: true,
          columns: 2,
          checkPosition: "none",
          options: [
            { id: "1-3", label: "1–3" },
            { id: "4-6", label: "4–6" },
            { id: "7-10", label: "7–10" },
            { id: "11-20", label: "11–20" },
            { id: "21-50", label: "21–50" },
            { id: "50+", label: "50+" },
          ],
        },
      ],
    },
    {
      id: "channels",
      title: "What channels are in focus?",
      skippable: true,
      fields: [
        {
          id: "channels",
          kind: "icon-grid",
          required: true,
          multiple: true,
          columns: 6,
          options: [
            {
              id: "photos",
              label: "Photos",
              glyph: "brand:instagram",
              glyphTone: "#fdeaf4",
            },
            {
              id: "social",
              label: "Social",
              glyph: "brand:facebook",
              glyphTone: "#e4efff",
            },
            {
              id: "posts",
              label: "Posts",
              glyph: "brand:x",
              glyphTone: "#ececec",
            },
            {
              id: "work",
              label: "Work",
              glyph: "briefcase",
              glyphTone: "#e4efff",
            },
            {
              id: "shorts",
              label: "Shorts",
              glyph: "brand:tiktok",
              glyphTone: "#ececec",
            },
            {
              id: "video",
              label: "Video",
              glyph: "brand:youtube",
              glyphTone: "#ffe4e4",
            },
            {
              id: "pins",
              label: "Pins",
              glyph: "brand:pinterest",
              glyphTone: "#ffe4e4",
            },
            {
              id: "threads",
              label: "Threads",
              glyph: "brand:threads",
              glyphTone: "#ececec",
            },
            {
              id: "micro",
              label: "Micro",
              glyph: "brand:bluesky",
              glyphTone: "#e4efff",
            },
            {
              id: "fediverse",
              label: "Fediverse",
              glyph: "brand:mastodon",
              glyphTone: "#eceaff",
            },
            {
              id: "local",
              label: "Local",
              glyph: "store",
              glyphTone: "#e4efff",
            },
            { id: "news", label: "News", glyph: "book", glyphTone: "#f2f0ec" },
          ],
        },
      ],
    },
    {
      id: "building",
      kind: "interstitial",
      title: "Thanks for choosing Driftwood 🌱",
      description: "Here's what you can do to get started",
      autoAdvanceMs: 2400,
    },
  ],
};

/* ------------------------------------------------------------------ *
 * 4. Split rail — breadcrumb header, live side panel
 * ------------------------------------------------------------------ */

export const splitRailTheme: OnboardingTheme = {
  scheme: "light",
  brand: "#4f7cf7",
  brandForeground: "#ffffff",
  radius: "0.7rem",
};

export const splitRail: WizardConfig = {
  id: "ledgerline-setup",
  variant: "split-rail",
  brandName: "Ledgerline",
  progressStyle: "breadcrumb",
  ctaLabel: "Continue",
  headerActions: [{ id: "help", label: "Help", glyph: "chat" }],
  steps: [
    {
      id: "security",
      breadcrumbLabel: "Security",
      title: "First, add an extra layer of security",
      description:
        "We use bank-level encryption to protect your data. Two-factor authentication adds extra security by requiring a code when you sign in.",
      learnMore: { label: "Learn more" },
      secondaryCta: { id: "skip-2fa", label: "Skip for now" },
      sidePanel: { kind: "medallion", glyph: "send" },
      fields: [
        {
          id: "twofa",
          kind: "action-rows",
          options: [
            {
              id: "authenticator",
              label: "Set up 2FA with an authenticator app",
              glyph: "key",
            },
          ],
        },
      ],
    },
    {
      id: "accounts",
      breadcrumbLabel: "Accounts",
      title: "Link accounts",
      description:
        "Securely give Ledgerline read-only access to automatically keep track of your accounts.",
      learnMore: { label: "Learn more." },
      sidePanel: {
        kind: "summary",
        title: "Total net worth",
        stats: [
          { label: "in assets", value: "$350", tone: "#4f7cf7" },
          { label: "in debts", value: "$0", tone: "#f0803c" },
        ],
        groups: [
          {
            heading: "Assets",
            rows: [
              { label: "Depository", value: "$0", pct: 0 },
              { label: "Investments", value: "$0", pct: 0 },
              { label: "Real estate", value: "$0", pct: 0 },
              { label: "Other", value: "$350", pct: 100, hint: "100%" },
            ],
          },
          {
            heading: "Debts",
            rows: [
              { label: "Credit cards", value: "$0", pct: 0 },
              { label: "Loans", value: "$0", pct: 0 },
            ],
          },
        ],
      },
      fields: [
        {
          id: "institutions",
          kind: "logo-grid",
          columns: 4,
          multiple: true,
          options: [
            { id: "north", label: "Northbank", wordmark: "NORTHBANK" },
            { id: "summit", label: "Summit Card", wordmark: "SUMMIT" },
            { id: "harbor", label: "Harbor One", wordmark: "Harbor One" },
            { id: "civic", label: "Civic Bank", wordmark: "civic" },
            { id: "meridian", label: "Meridian", wordmark: "MERIDIAN" },
            { id: "keystone", label: "Keystone", wordmark: "KEYSTONE" },
            { id: "arbor", label: "Arbor Credit", wordmark: "ARBOR" },
            { id: "lantern", label: "Lantern", wordmark: "Lantern" },
          ],
        },
      ],
    },
    {
      id: "transactions",
      breadcrumbLabel: "Transactions",
      title: "Transaction types",
      description:
        "Ledgerline uses three transaction types to categorise your finances.",
      sidePanel: {
        kind: "diagram",
        glyph: "sparkle",
        nodes: [
          { label: "Subscriptions", glyph: "creditCard", tone: "#dff5ec" },
          { label: "Rent", glyph: "key", tone: "#fdf0d5" },
          { label: "Coffee", glyph: "store", tone: "#fbe6d8" },
          { label: "Delivery", glyph: "truck", tone: "#fde8e8" },
          { label: "Travel", glyph: "send", tone: "#e6effd" },
          { label: "Gym", glyph: "activity", tone: "#f3e8fd" },
          { label: "Therapy", glyph: "heart", tone: "#fde8ef" },
          { label: "Groceries", glyph: "leaf", tone: "#e8f7e4" },
          { label: "Shops", glyph: "cart", tone: "#fde8f6" },
        ],
        leaves: [
          "Regular transactions",
          "Internal transfers",
          "Income",
          "Recurring",
        ],
      },
      fields: [
        {
          id: "txn-type",
          kind: "segmented",
          defaultValue: "regular",
          options: [
            {
              id: "regular",
              label: "Regular",
              panel: {
                title: "Regular",
                body: "Money spent is considered a regular transaction. We sort these into categories so it's easy to track your spending.",
                rows: [
                  {
                    label: "Cornerstone Supply",
                    chip: "Shops",
                    chipTone: "#fde8f6",
                    value: "$1,032.34",
                  },
                  {
                    label: "Green Fork Deli",
                    chip: "Restaurants",
                    chipTone: "#fdf0d5",
                    value: "$14.99",
                    smart: true,
                  },
                ],
                note: "Categorisation learns from your corrections over time.",
              },
            },
            {
              id: "internal",
              label: "Internal",
              panel: {
                title: "Internal transfers",
                body: "Money you move between accounts, such as paying a credit card bill, is an internal transfer. These are excluded from spending budgets.",
                rows: [{ label: "Credit card payment", value: "$259.14" }],
              },
            },
            {
              id: "income",
              label: "Income",
              panel: {
                title: "Income",
                body: "Money coming in is tracked separately so your spending totals stay accurate.",
                rows: [{ label: "Payroll deposit", value: "$3,120.00" }],
              },
            },
          ],
        },
      ],
    },
    {
      id: "subscription",
      breadcrumbLabel: "Subscription",
      title: "Start your free trial",
      description: "See what Ledgerline can do for you, before you subscribe.",
      sidePanel: {
        kind: "timeline",
        milestones: [
          {
            glyph: "play",
            title: "Today, your free trial begins.",
            body: "We'll analyse your connected accounts, categorise spending and track your net worth.",
          },
          {
            glyph: "mail",
            title: "Get notified 7 days before it ends.",
            body: "You'll get a reminder that your free trial is about to finish.",
          },
          {
            glyph: "star",
            title: "After a month, your trial ends.",
            body: "Your subscription begins. Cancel any time before then.",
          },
        ],
      },
      fields: [
        {
          id: "plan",
          kind: "list-rows",
          sectionLabel: "Plan",
          required: true,
          columns: 1,
          defaultValue: "annual",
          options: [
            {
              id: "annual",
              label: "$95/year + 1 month free trial",
              description: "Only $7.92/mo",
            },
          ],
        },
        {
          id: "payment",
          kind: "list-rows",
          sectionLabel: "Payment method",
          columns: 1,
          options: [
            { id: "wallet", label: "Express wallet", glyph: "wallet" },
            { id: "card", label: "Add credit card", glyph: "creditCard" },
          ],
        },
      ],
    },
    {
      id: "review",
      kind: "review",
      breadcrumbLabel: "Review",
      title: "Review your finances",
      description: "Let's double-check and make sure everything is accurate.",
      ctaLabel: "Finish reviewing",
      centered: true,
      reviewCards: [
        {
          id: "income",
          title: "Monthly income",
          value: "$0",
          unit: "earned last month",
          linkLabel: "Review",
          emptyNote: "No income transactions being tracked",
        },
        {
          id: "investments",
          title: "Investments",
          value: "$0",
          unit: "current balance",
          linkLabel: "Review",
          emptyNote: "No investments being tracked",
        },
        {
          id: "categories",
          title: "Spending categories",
          value: "1",
          unit: "active category",
          linkLabel: "Review",
          chip: { label: "Other", glyph: "folder" },
        },
        {
          id: "budget",
          title: "Monthly budget",
          value: "$0",
          unit: "total budget",
          linkLabel: "Review",
          action: { id: "toggle-budget", label: "Turn off budgeting" },
          chip: { label: "Other", glyph: "folder", value: "$0.00" },
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ *
 * 5. Conversational — assistant orb, chip sentences, circular CTA
 * ------------------------------------------------------------------ */

export const conversationalTheme: OnboardingTheme = {
  scheme: "light",
  brand: "#2f6bff",
  brandForeground: "#ffffff",
  radius: "0.7rem",
};

export const conversational: WizardConfig = {
  id: "pip-setup",
  variant: "conversational",
  ctaStyle: "circle",
  avatar: {
    kind: "orb",
    stops: ["#f9a8c0", "#f2f0ec", "#8fc4ec"],
    label: "Pip",
  },
  skipLabel: "Skip",
  steps: [
    {
      id: "hello",
      kind: "welcome",
      title: "Hi there, I'm Pip.",
      inlineLink: { id: "change-name", label: "change my name" },
    },
    {
      id: "name",
      title: "What's your name?",
      fields: [
        {
          id: "name",
          kind: "text",
          required: true,
          floatingLabel: "first and last name",
          placeholder: "Alex Rivera",
        },
      ],
    },
    {
      id: "role",
      title: "Tell me about yourself.",
      fields: [
        {
          id: "role",
          kind: "chips",
          required: true,
          prefix: "I'm a …",
          options: [
            { id: "teacher", label: "Teacher" },
            { id: "school-admin", label: "School administrator" },
            { id: "district-admin", label: "District administrator" },
            { id: "tech-admin", label: "Technology administrator" },
            { id: "coach", label: "Instructional coach" },
            { id: "librarian", label: "Library or media specialist" },
            { id: "parent", label: "Parent / guardian" },
            { id: "student", label: "Student" },
            { id: "other", label: "Other" },
          ],
        },
      ],
    },
    {
      id: "org",
      title: "Cool! Which school are you with?",
      fields: [
        {
          id: "school",
          kind: "text",
          required: true,
          floatingLabel: "Search for your school or district",
          placeholder: "Start typing…",
        },
        {
          id: "city",
          kind: "text",
          floatingLabel: "City",
          placeholder: "City, state",
        },
      ],
    },
    {
      id: "grades",
      title: "What grades do you teach?",
      fields: [
        {
          id: "grades",
          kind: "chips",
          required: true,
          multiple: true,
          options: [
            { id: "k", label: "Kindergarten" },
            ...[
              "1st",
              "2nd",
              "3rd",
              "4th",
              "5th",
              "6th",
              "7th",
              "8th",
              "9th",
              "10th",
              "11th",
              "12th",
            ].map((label) => ({ id: label, label })),
            { id: "post", label: "Post-secondary" },
            { id: "other", label: "Other" },
          ],
        },
      ],
    },
    {
      id: "subjects",
      title: "What subjects do you teach?",
      fields: [
        {
          id: "subjects",
          kind: "chips",
          required: true,
          multiple: true,
          options: [
            { id: "math", label: "Math" },
            { id: "science", label: "Science" },
            { id: "ela", label: "English language arts" },
            { id: "social", label: "Social studies" },
            { id: "art", label: "Art" },
            { id: "music", label: "Music" },
            { id: "pe", label: "Physical education" },
            { id: "health", label: "Health" },
            { id: "languages", label: "World languages" },
            { id: "cte", label: "Career and technical education" },
            { id: "sped", label: "Special education" },
            { id: "other", label: "Other" },
          ],
        },
      ],
    },
    {
      id: "look",
      title: "Choose your look",
      fields: [
        {
          id: "avatar",
          kind: "avatar-picker",
          required: true,
          allowUpload: true,
          allowShuffle: true,
          options: [
            {
              id: "a1",
              label: "Avatar one",
              avatarSeed: "Avery Chen",
              glyphTone: "#e9e4dd",
            },
            {
              id: "a2",
              label: "Avatar two",
              avatarSeed: "Robin Diaz",
              glyphTone: "#f7d9c4",
            },
            {
              id: "a3",
              label: "Avatar three",
              avatarSeed: "Sam Okafor",
              glyphTone: "#f3ead9",
            },
            {
              id: "a4",
              label: "Avatar four",
              avatarSeed: "Jordan Park",
              glyphTone: "#ded7f5",
            },
            {
              id: "a5",
              label: "Avatar five",
              avatarSeed: "Riley Novak",
              glyphTone: "#d6ecdd",
            },
          ],
        },
      ],
    },
    {
      id: "phone",
      title: "Add your phone number.",
      description:
        "Get occasional product updates, event reminders and tips. (optional)",
      skippable: true,
      inlineLink: { id: "no-thanks", label: "no, thanks" },
      fields: [
        {
          id: "phone",
          kind: "text",
          floatingLabel: "Phone",
          placeholder: "(555) 012-3456",
        },
        {
          id: "sms-consent",
          kind: "consent",
          consentText:
            "I agree to receive recurring automated text messages at the phone number provided. Message and data rates may apply. Reply STOP to unsubscribe. Information provided will be handled in accordance with our [Privacy Policy](#).",
        },
      ],
    },
    {
      id: "confirm",
      kind: "confirm",
      title: "Does everything look correct?",
      summaryTitleField: "name",
      summaryAvatarField: "avatar",
      summaryTemplate: "{grades:option} {subjects:option} teacher at {school}",
      editLabel: "Edit",
      ctaLabel: "Looks good",
    },
  ],
};

export const wizardPresets = {
  "fullscreen-quiz": { config: fullscreenQuiz, theme: fullscreenQuizTheme },
  "neon-quiz": { config: neonQuiz, theme: neonQuizTheme },
  "warm-survey": { config: warmSurvey, theme: warmSurveyTheme },
  "split-rail": { config: splitRail, theme: splitRailTheme },
  conversational: { config: conversational, theme: conversationalTheme },
} as const;
