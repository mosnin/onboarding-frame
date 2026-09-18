# Reference -> template map
refs/ holds the images. Dashboard N = file 057+(N-1) for N=1..47; 48 = 104-108.
Several references are EXTRA PAGES of the same product (e.g. 15+16 Copilot Money).

**State column.**

- `DONE` — built from this reference in the first pass. Not verified.
- `RETYPE` — rebuilt and diffed against its reference, but before we found
  that the headless captures were rendering in a fallback face rather than
  the template's own (the typefaces were loaded from fonts.googleapis.com and
  that request never completed in the capture browser). Layout, palette and
  icons on these rows were measured against the reference and are good; the
  type sizes were matched to a face that was not the one that ships, so every
  one of them needs its type pass redone now that the faces are self-hosted.
- `REMEASURED` — finished: pixel-measured against its own reference with the
  real typefaces rendering, captured at 1512px, diffed side by side until the
  list was empty, and checked at 390px.

Only `REMEASURED` rows are done.

| # | file | product | template | state |
|---|------|---------|----------|-------|
| 1 | 057 | fal | api-console | RETYPE |
| 2 | 058 | Perplexity | assistant-home | RETYPE |
| 3 | 059 | Canny | guided-setup | RETYPE |
| 4 | 060 | Descript | creative-studio | RETYPE |
| 5 | 061 | MagicPath | file-library | RETYPE |
| 6 | 062 | HoneyBook | setup-checklist | RETYPE |
| 7 | 063 | Curater | discovery-feed | RETYPE |
| 8 | 064 | Klaviyo (assistant open) | guides-assistant | RETYPE |
| 9 | 065 | Klaviyo (assistant closed) | guides-assistant | RETYPE |
| 10 | 066 | Bloom | brand-studio | RETYPE |
| 11 | 067 | Causal | modeling-home | RETYPE |
| 12 | 068 | Plain | support-insights | RETYPE |
| 13 | 069 | Shopify | commerce-analytics | RETYPE |
| 14 | 070 | Buffer | social-scheduler | RETYPE |
| 15 | 071 | Copilot Money, Dashboard | finance-overview | REMEASURED |
| 16 | 072 | Copilot Money, Accounts | finance-overview `accounts` page | REMEASURED |

## 11 Causal (067)
White, blue accent (#3b5bdb-ish), Inter. Left rail: wordmark + avatar, Search (cmd K) + `+`,
nav Overview/Data/Categories, section "Models" -> "Getting started (Cloned)".
Footer: Documentation, Chat pill. Main: small grey date "18 August, 2023", huge
"Welcome to Causal, Jane!", hairline rule. Row card "New model / Create a new model from
scratch" with `+` circle left and chevron right. Two wizard cards side by side (P&L wizard,
Headcount wizard) each: title + chevron, 2-line blurb, then a CLIPPED screenshot peek that
bleeds past the card bottom (integration rows Xero/Quickbooks/Bamboo HR + a floating metric
card "Burn rate $33k" / "Headcount 34" with a small line chart and a dashed vertical today
marker, plus a row "Cashflow $70k" / "Total staff 23"). Then "Templates" heading with a
search icon, and a list of template rows: left a wide illustration placeholder, right bold
name + 3-line description (SaaS Revenue Model, Detailed Headcount Model).

## 14 Buffer (070)
White, mint-green primary (#b8e986-ish pill "+ New"), rounded-2xl cards, grey-50 card fills.
Rail: Buffer wordmark, big green New button, nav Home/Create/Publish(3)/Community(1)/
Start Page(ext)/Analytics(ext); "Channels" group with 3 avatar+handle rows and counts;
"Connect channels" group with LinkedIn/Bluesky/Facebook/More channels; footer avatar
"AS Mobbin / Team Plan" + collapse icon.
Main: waving-hand square placeholder + "Good Afternoon, Sam!" + date line.
Stat band (one rounded card, 3 cells): coloured RING with number inside (1 purple, 100% green,
60 amber) + label w/ info icon + sub ("Well ahead of schedule", "1 of 1, nice work!",
"↗100% from last week").
"Weekly Pulse · Jun 21 to Jun 24 · Compared to previous week" then 3 grey cards Posts/
Followers/Comments with info icon and big number.
Two columns: "Up Next · 2 posts scheduled" -> post cards (avatar+platform badge, timestamp,
"Post on hello.asmith", square image placeholder right); "Comments · 1 unanswered" -> comment
card (avatar+badge, @user0, body).
"Templates" -> 4 cards each with an emoji/icon, bold 2-line title, 3-line truncated body.

| 17 | 073 | Fey | market-terminal (dark) | REMEASURED |
| 18 | 074 | Sweatpals | event-analytics (dark) | REMEASURED |
| 19 | 075 | Klaviyo, Overview dashboard | guides-assistant `dashboards` page | DONE |
| 20 | 076 | HoneyBook, Finance | setup-checklist `finance` page | DONE |

## 17 Fey (073)  DARK
Near-black #0a0a0b page, cards #121214 w/ faint border, white text, grey-500 labels.
Left icon-only rail (~72px) w/ logo top, 5 glyphs, active one has a blue left bar.
Header: "Analysis" 2rem bold + grey "Thursday, February 15"; right: pill buttons
"For you" / "Screener" (dark w/ hairline border) + search glyph; hairline rule.
Tab row under rule: Markets / Insider (active, blue top-border) / Events + grey
"Coming soon" chip.
Card "Large transactions" w/ right-aligned toggle "Officer | Director"; rows:
round logo slot, bold ticker, grey name, red % , mono value, tiny circular P/S badge
(green P for purchase, red S for sale).
Card "Daily filings": legend dots Purchases (white) / Sales (red); dense spiky
two-line chart on a dotted-grid plot; range row 1M 3M 6M(active, blue underline) YTD All
and right grey "Chart updated daily".
Section "Latest insider purchases" -> wide table, header row grey small caps:
Company name / Trade type / Insider / Date / Price / Owned / Change / Total value / </>.
Rows: logo slot, bold ticker + grey name, green-tinted "Purchase" chip, "10% Owner",
date, price, owned, change "+10,100 (+0.20%)", bold total, P badge. First row highlighted
with a lighter fill + border.

## 18 Sweatpals (074)  DARK
Pure #000 page, cards #0c0c0c, rounded-2xl, border #1c1c1c. Sidebar #000 w/ wordmark,
nav Overview/Experiences/Schedule/Members/Plans/Discount Codes/Perks/Transactions/
Market & Pricing, group "Front Desk" (Check-in, Point of Sale), "Campaigns" (Email & SMS),
"Other" (Settings, Team, Integrations, Embeds), "Help" (Resource Center ↗).
A round collapse chevron floats on the sidebar's right edge.
Top bar: "‹ Back", right a store glyph then a bordered box "COMMUNITY / ASMobbin" + caret.
Event header card: square image placeholder, "ASMobbin gathering" + 3 small glyph buttons,
grey "Jul 11th, 12:00 AM - 2:00 AM CDT · Chicago, IL"; right pill buttons
"Add attendee", "Edit", "···".
Tabs RSVPs / Analytics(active, white underline) / Tracking links.
Pill segmented "All time | 7d | 14d | 30d" in a dark rounded container; right a circular
refresh button.
3 stat cards: label + big number (RSVPs 6, Event page views 7, Conversion Rate 71% w/ info).
"Tickets Sales" card: big PURPLE ring (thin, ~8px) w/ "6 / Tickets sold" centred, legend
right: purple square "Free" ... 6 + "100%" chip.
"Retention Rate" card w/ chevron: GREEN ring w/ a small white "5" bubble on the ring's
left edge; legend First Timer 5 100%, Returning 0 0%.
"Event Capacity" card, right "10 spots": rows Spots Taken 6 / Spots Remaining 4 + a green
progress bar (60%).
"Check-in" card, right "6 tickets": Checked-in 0 / "No shows yet" 6 + a bar that is
essentially empty (one dot of fill).
"RSVPs" card: 6 + green "↑100%" chip.

| 21 | 077 | Reddit mod tools | community-traffic | REMEASURED |
| 22 | 078 | Asana goal detail | goal-tracker | DONE |
| 23 | 079 | Supabase reports | platform-reports (dark) | REMEASURED |
| 24 | 080 | Vercel analytics | deploy-analytics | REMEASURED |
| 25 | 081 | StackAI project analytics | token-usage | REMEASURED |

## 21 Reddit (077)
White; #ff4500 orange brand; blue #0079d3 links/active tabs; grey-100 page behind white cards.
Top bar white: hamburger, wordmark, subreddit chip + caret, big rounded search with an
inner blue pill "r/…  ⊗" + "Search Reddit", right glyph row, "Advertise" pill, avatar +
"John_Smith_123456 / ⚙ 1 karma" + caret.
Breadcrumb strip: "R/JOHN_MOBBIN / TRAFFIC STATS" small caps, orange first part.
Sidebar (white, 390px): small-caps grey group headers with icons: CONTENT (Scheduled posts),
OTHER (Awards, Wiki pages, Community settings + orange NEW badge + chevron, Community
appearance + chevron), MODMAIL (Modmail ↗), COMMUNITY ACTIVITY (Traffic stats ACTIVE w/
left orange-ish bar + grey fill, Mod log), MOD HELP CENTER (Mod help center ↗, Mod education
site ↗, Moderator code of conduct ↗, r/ModSupport ↗, r/ModHelp ↗, Contact Reddit ↗).
Main: "Traffic Stats" bold + grey "updating every hour".
Tabs Pageviews(blue, underlined) / Uniques / Members.
3 bordered stat cards: big number 21 / 21 / 0 + small-caps grey "TOTAL - LAST 24 HOURS" etc.
Big line chart w/ real axes: y 0..25 ticks 5s, rotated y-axis label "Pageviews", x Jan 8..Jan 14,
FULL grid box w/ vertical gridlines, one blue triangle spike at Jan 13 (21) and a flat
orange line at 0. Legend right, colour squares: New Reddit #0079d3, Old Reddit #f2b544,
Mobile Web #ff4500, Reddit Apps #39a0a0.
Below chart: ← arrow, "Hour | Day(blue pill) | Month", → arrow (right arrow faded).
Second card: tabs Day/Day of week/Month then a table w/ grey header row small-caps
DAY (w/ sort caret) / PAGEVIEWS / UNIQUES / MEMBERS JOINED; rows 1/14/23 0 0 0, 1/13/23 21 2 0,
1/12/23 0 0 0.

## 22 Asana (078)
DARK sidebar (#2e2e30) + white main. Sidebar: hamburger, red-orange "+ Create" pill,
Home/My tasks/Inbox(dot), divider, "Insights" + `+` (Reporting, Portfolios, Goals),
"Projects" + `+` (Design Project w/ teal dot, My first portfolio + chevron),
"Team" (My workspace + chevron), bottom "✉ Invite teammates" outlined button and
grey "Help with Asana". Top bar dark w/ centred rounded search.
Main white: header row: rounded-lg purple square placeholder (goal icon), breadcrumb
"My workspace goals ›" then bold "Attract 2 new clients" + caret + thumbs-up + star;
right: avatar + blue "🔒 Share" button.
Body centred col ~820px + right rail 360px.
H1 "Attract 2 new clients" 2.4rem.
"What's the status?" then 3 outlined pill buttons w/ coloured dots: On track (green),
At risk (amber), Off track (red), then "···".
Two bordered cards side by side, centred text: "Goal completion / 0% / 4 months left in
Q4 FY24" and "Latest status / ○ No status (grey, large) / blue link Set status".
Card "Progress ⚡ ⚠ No sub-goals connected" + right "⇶ Progress settings":
chart w/ "Today" label at the left edge above a vertical rule, y 0/25/50/75/100%,
x Sep..Jan 2025, a GREY filled triangle wedge rising to 100% (the target ramp) and a
single dot at 0% on Sep. Under it: a small mountain-flag illustration placeholder and
"Use sub-goals to automatically update this goal's progress." + blue button
"+ Connect sub-goal".
Right rail "About this goal": Goal owner (avatar + Sam Lee), Accountable team
(icon + My workspace), rule, Time period Q4 FY24, grey link "Set a custom due date",
rule, Parent goals + "+ Connect a parent goal", underlined "Send feedback".

## 23 Supabase (079)  DARK
#1c1c1c page, cards #1f1f1f w/ #2b2b2b border, green #3ecf8e accent, mono for paths.
Far-left icon rail (#171717, 78px) w/ logo + 10 glyphs, active one has a lighter fill.
Second column (#1c1c1c, 355px): "Reports" bold header, then "Custom reports" row, rule,
then list: API (+ orange "NEW"), Database, Query Performance (+ orange "NEW"). Active row
has a slightly lighter fill.
Top bar: "jdoe.mobbin@gmail.com's Org / New Website" (grey / white), right outlined pills
"? Help", "💬 Feedback", bell.
Main: H1 "API" + right outlined "↻ Refresh".
Filter row: segmented "🕐 Last 24 hours" (active, lighter) + "🗓 Custom", then a select
"All Requests ⌄", then dashed-ish outlined "+ Add filter".
Card "Total Requests" w/ an ↗ open-in-new box top-right: big "328", then a mostly EMPTY
bar chart with only two green bars at the far right; under it a row of timestamps
"Aug 9, 2023, 04:00pm" (left) and "Aug 11, 2023, 10:00am" (right).
Then an inner table: header "Request | Count"; rows: chevron, grey METHOD chip (GET/POST),
green "200" chip, mono path, right-aligned count. (/rest/v1/ 104, /auth/v1/health 68,
/storage/v1/object/list/Storage 25).
Card "Response Errors ?" same shape: big "7", two small green bars at right, then rows
w/ POST chip + ORANGE "400" chip + long mono paths truncated, count 1.

## 24 Vercel (080)
White; black brand; blue #0062ff chart. Sidebar 340px: avatar + "samleemobbi…" + blue
"Pro Trial" chip + up/down switcher; search "Find…" with an "F" kbd; nav Overview/
Deployments/Logs/Analytics(ACTIVE grey fill)/Speed Insights/Observability›/Firewall›/CDN›,
rule, Domains/Integrations/Storage/Flags›/Agent›/AI Gateway›/Sandboxes/Workflows, rule,
Usage/Support/Settings›; footer avatar "Sam Lee" + "···" + bell w/ blue dot.
Top bar: project switcher (triangle logo + "newlandingpage" + switcher), centred "Analytics",
right "···".
Sub-bar: 🌐 "newlandingpage-gold.vercel.app ↗", then a hollow dot + "0 online";
right selects "Production ⌄" and "🗓 Last 7 Days ⌄".
Stat strip: one bordered row split into cells by vertical rules — Visitors 13 (cell has a
BLACK bottom border marking selection), Page Views 24, Bounce Rate 69% + red "+69%" chip,
then an empty 4th cell.
Big area chart: y 0/5/10, x Apr 16..Apr 23, flat at 0 until Apr 21 then a sharp peak at
Apr 22 with the DESCENDING leg DASHED (incomplete day), light blue fill.
Two cards below: left tabs "Pages | Routes | Hostnames" + right small-caps "VISITORS",
then one grey row "/" ... 13. Right tabs "Referrers | UTM Parameters" + "VISITORS", rows
google.com 2, vercel.com 2, com.slack 1 (each with a favicon slot; the last row's fill is
shorter — the fill width encodes the value).

## 25 StackAI (081)
White, near-black slate #5b6472 bars, grey-50 card fills, generous radii.
Far-left icon rail (68px, white, hairline right border): "A" square, search, then ~8 glyphs,
active one has a grey fill; bottom: rocket (dark fill), bell, ?, activity, "A".
Top bar: "Project Analytics" bold; right selects "Last 7 days ⌃⌄" and
"🗓 Apr 15, 2026 - Apr 21, 2026".
Segmented control in a grey-50 rounded container: "▦ Overview" | "🤖 Models" (ACTIVE = white
pill w/ shadow).
Left card (grey-50 fill? no — white w/ border, 520px): "Top models" bold + 2-line grey
blurb; then model rows as bordered cards: bold name, right small-caps "TOTAL TOKENS" +
bold number; under the name a grey "OpenAI" chip. Selected row (gpt-4o-mini) has a
grey-50 fill.
Right column: card w/ "🤖 gpt-4o-mini" bold + right grey chip "OpenAI", grey sub
"Inspect the selected model across the current date range.", then 3 grey-50 inner cards:
small-caps grey TOTAL TOKENS / INPUT TOKENS / OUTPUT TOKENS + big numbers 1,764 / 1,255 / 509.
Card "Total token trend": smooth slate area line, y 0/200/400/700, x Apr 15..Apr 21 —
starts high (~690), decays to 0 by Apr 18, flat, then a big smooth hump peaking Apr 20 and
back to 0 at Apr 21.
Two cards: "Input token trend" and "Output token trend" — slate BARS, y 0/150/300/470 and
0/60/120/180/240, x Apr 15..Apr 21, bars only on Apr 15,16,17,20 (Apr 18/19/21 empty).

| 26 | 082 | Vanta | compliance-controls | DONE |
| 27 | 083 | Vercel, hover tooltip + crosshair | deploy-analytics | DONE (hover readout) |
| 28 | 084 | Etsy Shop Manager | listing-stats | DONE |
| 29 | 085 | Mailchimp audience | audience-analytics | REMEASURED |
| 30 | 086 | Cake Equity | cap-table | REMEASURED |

## 26 Vanta (082)
White, purple #6b46e5 brand, grey-50 chips, small radii (6-8px). Top bar white w/ wordmark
left and ?/📣/⚙/avatar right. Sidebar 300px white: search "Help… ⌘+K" grey pill;
Home/Tests/Reports, rule, "Compliance ⌄" (ACTIVE parent has a purple left bar) w/ children
Frameworks / Controls(ACTIVE, grey fill) / Policies / Documents / Audits;
Trust Center ›, Risk ›, Vendor ›, Assets ›, Personnel ›, rule, Integrations. Bottom-right
a collapse glyph.
Main: H1 "Controls"; right outlined "More ⌄" and a DISABLED "Add control ⌄" (greyed).
Two cards:
- "Assignment": large thin DONUT (~200px, 10px stroke) mostly grey w/ a tiny purple arc at
  the top; centre "4%" bold + "Assigned". Legend right: grey square Unassigned 100,
  purple square Assigned 4, orange square Needs reassignment 0.
- "Completion": "Controls OK" label, "99%" huge, a full-width green progress bar,
  then "103 controls" (left) "104 total" (right). On the right two small grey-50 boxes:
  "Test ↗  132/133" + green bar + "99%", and "Document ↗ 37/38" + green bar + "97%".
Filter row: search input "Search controls", then dropdown labels Framework/Owner/Domain/
Source/Framework code/Status/Trust Center/Risk, right a settings-sliders icon button.
Table: header ID (w/ info icon) / Control / Owner / Source / Frameworks / Tests.
Rows: monospace-ish ID (AST-1), bold control title + 2-line grey truncated description,
Owner = dashed-circle avatar + "Unassigned", Source = small logo slot + "Vanta",
Frameworks = grey chips "SOC 2 · CC 6.5" stacked (sometimes 2 + a grey "+2"),
Tests = green check + "2/2", then "···".

## 28 Etsy (084)
White, orange #f1641e accent, BLACK text, underlined small-caps stat labels, big
rounded-full date-range pill. Sidebar 340px white w/ hairline right border:
"Shop Manager" bold + hamburger; nav w/ outline icons: Search, Dashboard, Listings,
Messages, Orders, Etsy search visibility, "Stats" (ACTIVE, grey fill, caret up) w/
children Shop traffic (ACTIVE bold, grey fill) / Marketplace insights; Customer service
stats, Policy violations, "Marketing ⌃" w/ children Etsy Ads / Sales and discounts /
Social media / Share & Save; "Finances ⌄", Apps, "Help ⌄", "Settings ⌄"; then small-caps
grey "Sales channels" + a row w/ an E logo slot + shop name + pencil; footer avatar "Alex ⌃".
Main: breadcrumb "Stats › Listing stats"; H1 "Listing stats"; a rounded-full outlined pill
"Date Range  Last 7 Days: Mar 01 - Mar 07 ▾".
Listing card (rounded-lg, hairline): square image placeholder 230px left; title 1.6rem bold;
right outlined rounded-full "View item"; two columns "Price: $7.99 - $10.99" /
"Status: Inactive" and "Current stock: 100"; rule; an inner bordered box
"Improvement Suggestions" + right underlined "Edit listing" + a 2-item bullet list.
Stats card split into 3 cells by vertical rules: each cell has small-caps UNDERLINED label
(VISITS / ITEMS SOLD / REVENUE) + grey underlined "--% YoY" + right "🕐 Just now";
huge number (5 / 1 / SGD 0.70); then a small area chart w/ ONE smooth bell-curve hump near
the right, each a different colour (orange #e8734a, blue #4aa8d8, teal #7fc9b8); a top
gridline labelled 6 / 2 / SGD 2; x labels "01 Mar" and "07 Mar" at the ends; then a legend
row: coloured dot + "Etsy" + right "5 visits" / "1 item sold" / "SGD 0.70".
"Explore your data" section: left heading + 2-line grey blurb; right two big rounded-lg
outlined selects, each w/ a small-caps coloured label (orange TOTAL VIEWS, blue ORDERS)
and a big number + caret; right "🕐 Updated Just now".

## 29 Mailchimp (085)
White; a YELLOW 6px bar across the very top; black text, serif-ish display headings;
green #7a9a3e data. Sidebar 350px white: big outlined rounded-full "✎ Create";
nav w/ line icons + carets: Campaigns ⌄, Automations ⌄, SMS + purple "New" chip ⌄,
Audience ⌄, "Analytics ⌃" (ACTIVE) w/ children Marketing dashboard / Audience (ACTIVE,
grey fill) / Reports / Custom reports; Website ⌄, Content ⌄, Integrations ⌄.
Bottom-left a panel-collapse glyph.
Top bar: logo left, big rounded-full "Search Mailchimp" centred, right a cream pill
"● Live expert help" and an avatar.
Sub-header: H1 "Audience analytics" + right teal link "Manage contacts".
Card 1 (clipped at top): legend "Subscribed / Unsubscribed / Non-subscribed", pagination
"0 - 16 of 30  ‹ Previous  Next ›" (Next in teal), then a grey note
"Note: This new way of viewing your subscriber data by channel was launched April 1, 2024".
Card 2 "What's changed" (serif, 2rem) + grey "Jul 7, 2024 - Aug 5, 2024" + rule.
Row: underlined-dotted label "Total net subscriptions growth"; right a segmented control
in a white rounded box w/ hairline: Day(active, shadowed) | Week | Month.
Under it: big "4", a grey circle w/ "--", then grey "compared to last year".
Chart: y 0..4, x Jul 07..Aug 05 with ROTATED (-45deg) date labels, a green line that is
flat at 0 with a DOT ON EVERY DAY and two spikes (1 on Jul 12, 3 on Jul 16); a black
baseline at 0. Legend bottom-right: green line + dot + "SLMobbin".
A vertical "Feedback" tab is pinned to the right edge.

## 30 Cake Equity (086)
White, indigo #5b2ff5 brand, navy-ink text, light-blue secondary buttons.
Top bar: "Cake." wordmark; a grey-50 pill w/ avatar + "JMobbin" + grey "Free" chip + caret;
a lavender pill "◎ Issue overseas equity right"; a big rounded-full outlined pill with a
33% RING + "Getting started 🚀" + caret; bell; ?; share; outlined "👤+ Invite co-pilots";
indigo "Upgrade"; a segmented "Company | Portal"; avatar.
Sidebar 335px: Getting Started, Dashboard, "Cap table ⌄" (open) w/ children Shareholders
(ACTIVE: indigo text + indigo left bar + light fill) / Note holders / Transactions log;
Equity plans ›, Tools ›, Communication, Data room, Secondaries, Documents ›, Company ›.
Bottom: a bordered "✦ What's New" card containing three grey-50 rows (2FA security,
Bare trusts & SPVs, Reporting) each w/ a circled → on the right; then "↻ Update available"
and tiny grey "version: b513e7b0".
Main: card "Summary" + tabs Shares(active, indigo underline) / Options / Notes(disabled) /
RSUs(disabled). A 3x2 grid of centred figures: huge numbers over small-caps grey labels —
$0.00 TOTAL INVESTED (w/ info icon), $0.00 TOTAL UNPAID, 44.44% UNDILUTED,
23.52% DILUTED, 4 COM SHARES.
Card "Documents": label left, then a bordered pill w/ a file glyph + underlined
"Shareholder Certificate 1 - Jane Smith - J…".
"Transaction history" heading + right: indigo "↻ Re-Issue share certificate",
light-blue "🎖 Download share certificate", outlined "More ⌄".
Table w/ checkbox column: Date / Type / Share class / Shares / Total shares /
Price per share / Investment amount / Transfer amount, each row ending in an outlined
"More ⌄" button. Rows: 27 Oct 2023 Shares issued COM 8 8 $0.00 $0.00 -;
31 Oct 2023 Share split COM 1.00:1 8 - - -; 31 Oct 2023 Buy back COM -4 4 $1.00 $4.00 -.

| 31 | 087 | Coinbase wallet | wallet-home (dark) | REMEASURED |
| 32 | 088 | Snowflake cost mgmt | warehouse-cost | DONE |
| 33 | 089 | Origin portfolio | wealth-portfolio | REMEASURED |
| 34 | 090 | Stripe benchmarking | billing-benchmarks | DONE |
| 35 | 091 | Mailchimp audience dashboard | audience-analytics `dashboard` page | DONE |

## 31 Coinbase (087) DARK
#0a0b0d page, cards #121416, blue #1652f0 brand, rounded-2xl, big friendly type.
Sidebar 320px: logo square top-left; nav pills w/ round icon + label — Home (ACTIVE: deep
blue fill #0a2472 + blue icon + blue text), Assets, Apps; rule; then circular-icon rows
Buy / Swap / Send / Receive (each a dark circle w/ a glyph). Bottom-left a ‹ collapse.
Top bar: a wide rounded-full dark search "Search coins, NFTs, apps…" centred-right, then two
round icon buttons (wallet, gear).
Tabs: Trending (ACTIVE, blue + blue underline) / Explore / Create.
Hero card, 2 cols: left #121416 padding 40px — an outlined rounded-full chip "FRESH DROP"
(blue-green gradient border), then a small square avatar + small-caps "NYGILIA",
a 3.2rem bold two-line title, a 2-line grey blurb, then a FULL-WIDTH gradient button
(blue→cyan) "Mint +1000 points". Right: a square image placeholder filling the cell, with a
round share button top-right.
Identity strip: a rounded-2xl card with a GRADIENT BORDER (purple→blue→green): avatar +
bold "name.cb.id"; right two dark inner cards each w/ a round coloured icon + big number +
small-caps label ("100 POINTS", "# --- MY RANK").
"Trending onchain" bold 1.8rem + grey sub "The onchain experiences everyone's doing today";
right blue link "See experiences". Then a row of 4 wide image-placeholder cards, each w/ a
round share button in the corner.

## 32 Snowflake (088)
White, blue #1a73e8 accent, hairline borders, compact 0.95rem type.
Sidebar 320px: wordmark; "+ Create"; rule; Home/Search/Projects/Data/Data Products/AI & ML/
Monitoring/Admin(open) w/ children Cost Management(ACTIVE grey-blue fill + blue text)/
Warehouses/Compute Pools/Users & Roles/Security/Contacts/Billing & Terms.
Bottom: a bordered trial card — "$301 credits left" + info + "···", a blue progress bar
(~65%), grey "Trial ends in 23 days", full-width blue "Upgrade". Then avatar + "Alex Smith /
ACCOUNTADMIN" + ⌃.
Main: H1 "Cost Management"; right an outlined pill w/ a green dot + "COMPUTE_WH".
Tabs: Organization Overview / Account Overview(ACTIVE, blue + underline) / Consumption /
Budgets / Resource Monitors. Rule under tabs.
Line: "Account spend for **AR48742**ⓘ from  **Apr 9 - Apr 16** ⌄" (the date is a big
clickable bold with a caret).
5 figures in a row: $98.65 Spend in currency / 28.15 Spend in credits / $3.70 Compute
price/credit ⓘ / $12.33 Average daily cost / 3.52 Average daily credits. Then a rule.
Card "Top warehouses by cost" + right "View All ›": rows = warehouse glyph + monospace-ish
name (truncated w/ …), a horizontal BAR on a light track, right-aligned number.
(COMPUTE_WH 24.60 full bar, SYSTEM$STREAMLIT_NOTEBO… 3.49 short, SNOWFLAKE_LEARNING_WH 0.41
sliver, CLOUD_SERVICES_ONLY 0.00 no bar.)
Card "Cost insights ⓘ": rule, grey line "We checked for the following insight types but did
not find savings opportunities:", then 7 rows each a GREEN CHECK CIRCLE + bold label.
Card "Most expensive queries" + "View All ›": table, small-caps grey headers truncated with
ellipsis (QUERY / PARAMETERIZED QU… / TOTAL EXECUT… / # OF QU… / AVERAGE EXEC… /
WAREHOUSE N… / USER / ROLE); the query and hash columns are MONOSPACE.

## 33 Origin (089)
Off-white #f7f7f5 page, white cards rounded-2xl, near-black ink, green #1f9d55 data,
MONOSPACE small-caps labels (letter-spaced), pill tabs.
Sidebar 358px on the page bg: wordmark; nav rows w/ line icons — Home/Spending/
Portfolio(ACTIVE grey pill)/Invest/Advice/Estate Planning/Equity/Tax.
Top: H1 "Portfolio"; right a black pill "🎁 Get $25", an outlined pill "+ ACCOUNT"
(mono small-caps), "?", bell w/ red dot, avatar.
Pill tabs: Overview(active, grey pill) / Holdings.
Left col 470px:
- Card "ACCOUNTS" (mono small-caps) + outlined pill "ADD"; rule; "Investments" label;
  rows: round logo slot, bold name, grey "• 56 seconds ago", right bold amount and a green
  "+5.99% ↗".
- A LIGHT-GREEN card: bold 1.5rem "High interest is in your interest", 2-line body,
  a black pill "START SAVING" (mono) + underlined "HIDE", and an illustration slot bottom-right.
- Card "QUESTION OF THE DAY" (mono) + rule + a 1.5rem bold 3-line question + a full-width
  outlined rounded-full button "✦ ASK SIDEKICK".
- Card "RECENT ACTIVITY" (clipped).
Right col:
- Card "PORTFOLIO" (mono) + right a 2-button segmented icon toggle (line chart / area chart).
  "Total balance ⓘ", "$3" 2.2rem bold, green "$0 (5.74%)".
  Chart: y labels on the RIGHT in mono ($3.6 $2.7 $1.8 $0.9 $0), dotted horizontal
  gridlines, a green line flat at 0 for most of the range then a near-vertical rise at the
  end with a green gradient fill and a dot at the end.
  Range row centred: 1W  1M(active: outlined circle pill)  3M  6M  YTD  1Y.
- Card "HOLDINGS" (mono) + outlined pill "SEE ALL HOLDINGS"; two inner bordered cards:
  "Total Value" rows (round token logo slot, bold ticker + grey name, right amount) and
  "Top Movers" rows (same + a small green sparkline + a green-tinted % chip).

## 34 Stripe (090)
White, indigo #635bff brand, grey-50 chart bands, 0.95rem type, hairline rules.
Sidebar 320px: avatar square + "Content-acme" bold; nav Home/Balances/Transactions/
Customers/Product catalogue; small-caps grey "Shortcuts" + "Billing overview";
small-caps "Products" + Payments ⌄ / Billing ⌃ (open, indigo) w/ children Overview(ACTIVE
indigo) / Subscriptions / Invoices / Meters / Revenue recovery; Reporting ⌄; More ⌄;
bottom "Developers".
Top bar: a wide grey-50 rounded search; right "Test mode" + a toggle (off), then glyphs
(apps, ?, bell w/ blue dot, gear) and an indigo circular "+".
H1 "Billing overview"; right indigo "+ Create", outlined "💬 Give feedback", "···".
Tabs: Revenue / Subscribers / Trials / Churn / Collections / Benchmarking(ACTIVE indigo
underline) + a grey outlined chip "Preview".
Grey line: "Compare your key performance metrics against similar companies using Stripe to
power their subscription business."
Filter row: three labelled selects, each with the label + ⓘ on the left and a grey
right-aligned "You: US$0" above the select: ARR "Less than $100K", ARPU "Less than $50",
Business model "B2C".
2x2 grid of benchmark panels separated by hairlines (no card borders): title + ⓘ + a
PERCENTILE CHIP (amber for low: "48th percentile", "1st percentile"; green for high:
"92nd percentile", "99th percentile"); then "0% 0% median" (your value bold, median grey);
then a chart: a grey BAND (the peer range) with a thin slate median line inside it, and
YOUR value as a flat coloured line (green when good, orange when bad) pinned at the
bottom/edge; y labels top-left and bottom-left (8.0% / -4.0%); x "January 2024" left and
"December 2024" right in grey.

| 36 | 092 | Contra analytics | freelance-analytics | DONE |
| 37 | 093 | Clerk dashboard | auth-console | REMEASURED |
| 38 | 094 | Better Stack uptime | uptime-monitor (dark) | DONE |
| 39 | 095 | Cloudflare zone overview | zone-overview | REMEASURED |
| 40 | 096 | Zapier My Apps | automation-apps | DONE |

## 36 Contra (092)
White, grey-500 section headings, thin hairline cards, blue #4a6cf7 data, purple accents.
Far-left icon RAIL 84px: logo diamond top, avatar, then glyph groups separated by short
rules; the active glyph sits in a lavender rounded square; bottom a round chat bubble.
Top bar: "Analytics" 1.6rem bold; right an outlined rounded-full pill with a GRADIENT
border "✦ Contra Pro", outlined "⤳ Share profile", then 💬 and 🔔.
Body: an outlined rounded-full select "Last 30 days ⌄".
Grey heading "Income".
Big card (left, tall): "Total Payouts" + a superscript "$" before a huge "0";
right two outlined rounded-full buttons "+ Start project" and "$ Send invoice".
The chart is a FLAT line at the vertical middle with a blue gradient fill BELOW it that
fades out — i.e. a zero series drawn at mid-height, not at the floor.
Right column two cards:
 - "Active projects ⓘ" + right "✦ PRO" (amber diamond + grey small-caps); big "2";
   a tiny chart flat at the bottom with a rise at the very end.
 - "Invoices" + "✦ PRO": an illustration placeholder of an invoice w/ a green "PAID" chip,
   centred 2-line grey copy "Manage all of your Client payments in one place.", then a
   full-width grey-50 button "Send invoice".
Grey heading "Views". Card row: "Impressions" + big "1" and a flat line with one narrow
spike at the right; right card "Recently viewed you in search" + "✦ PRO" (empty).
Bottom-right a purple GRADIENT toast pill: "🎉 New features unlocked!" + ✕.

## 37 Clerk (093)
White, indigo #6c47ff brand, rounded-lg cards, hairline borders, 0.95rem type.
An ORANGE tab is pinned to the TOP EDGE of the main area, centred: "Development ⇅".
Sidebar 418px: a bordered rounded card at top w/ avatar + "Personal account" + ⇅; under it
a second row w/ app icon + "MyApp" + ⇅; then nav: Home(ACTIVE: white card w/ border +
indigo icon + indigo text), Users, Organizations; small-caps grey "Configure":
User & Authentication ›, Organizations Settings, Sessions, Account Portal, Customization ›,
Integrations, JWT Templates, Webhooks; "Developers": API Keys, Paths, Domains;
"Application": Plan & Billing, Settings. Footer: avatar + "Jane Doe".
Main: breadcrumb "Home › MyApp". H1 2rem bold
"Congratulations, your application now has users!" then a 3-line grey paragraph.
Row of 3 outlined cards, each centred: a grey glyph, then a bold centred label
("Deploy your app to production", "Learn about authentication",
"Learn about Component Customization").
Row of 4 outlined stat cards: bold title ("Total users"), grey sub ("All time",
"April 2024"), then a big number (2 / 2 / 2 / 1).
Two wide cards: "Recent sign-ups" and "Recent sign-ins" — rows of avatar + email + a
right-aligned grey timestamp ("Wed Apr 24, 15:57").
Bottom-right a round dark avatar button.

## 38 Better Stack (094)  DARK
#1c2028 page, cards #232834, borders #2e3440, light-blue/green multi-series charts.
Sidebar 310px #171a21: wordmark + caret; nav Monitors(ACTIVE)/Heartbeats/Who's on-call?/
Incidents(badge 2)/Team members/Status pages/Escalation policies/Integrations;
bottom Billing / Help & Support / "☀ Light mode"; footer a bordered row w/ a round logo
slot + "Team / JDAcme" + ⇅.
Top bar: right bell w/ orange dot + avatar + "Jane Smith ⌄".
Main: "‹ Monitors" grey back link.
Header: a large GREEN DOT in a soft green circle (56px) + "acmecorp.example.app" 2rem bold;
under it green "Up" + grey "· Checked every 3 minutes".
Action row (grey glyph + label, no buttons): ⚠ Send test alert · ⓘ Incidents ·
⏸ Pause this monitor · ⚙ Configure.
3 stat cards: grey label + big value — "Currently up for / 49 mins 40 seconds",
"Last checked at / 14 seconds ago", "Incidents / 0".
Card "Response times across regions in the last day" + right a segmented pill
Day(active)/Week/Month.
Chart: rotated y-axis title "milliseconds", y 0/1k/2k/3k/4k/5k, x 03:05pm..03:50pm,
FOUR series that all start high (2.7k-4k) at the left and collapse to near-zero within the
first two ticks, then wander with small bumps. Legend below: Europe (teal), North America
(indigo), Asia (amber), Australia (green).

## 39 Cloudflare (095)
White, orange #f6821f logo, BLUE #0051c3 links, grey-100 chart fills, dense 0.95rem.
Top bar: logo, right a rounded search "Go to… ⌘K", a blue "Add ▾" button, "Support ▾",
"Profile ▾".
Sidebar 345px: "← Alex Smith"; rule; nav rows w/ outline icons and carets:
Overview(ACTIVE blue text + blue left bar + light blue fill), AI Audit + amber "Beta" chip,
Analytics & Logs ▾, DNS ▾, Email ▾, SSL/TLS ▾, Security ▾, Access, Speed ▾, Caching ▾,
Workers Routes, Rules ▾, Network, Traffic ▾, Custom Pages, Apps, Scrape Shield, Zaraz ▾;
footer "« Collapse sidebar".
Zone bar: a window glyph + "content-acme.org" + ⇅, then a green pill "✓ Active",
an outlined pill "☆ Star", an outlined pill "Free plan".
A light-blue dismissible banner: "Why did you choose a Free plan? **Share your feedback** ↗"
+ ✕.
Main left: small grey "Overview", H1 2.2rem "content-acme.org", 2-line grey blurb, then an
outlined rounded-full blue button "▤ Review fundamentals".
Range tabs: "24 Hours"(active, blue underline) / 7 Days / 30 Days; right small-caps grey
"15 FEBRUARY — 16 FEBRUARY".
Then FIVE stacked metric rows separated by hairlines, each: left a label + big bold value
(Unique Visitors 112 / Total Requests 1.55k / Percent Cached 0% / Total Data Served 4 MB /
Data Cached 0 B); right a wide area chart with VERTICAL gridlines, a blue line with a DOT
ON EVERY POINT and a light blue fill. Rows 3 and 5 are FLAT AT ZERO with dots all along.
Right rail 480px:
 - "DNS" h2, "DNS Setup: Full ⓘ", rule, blue underlined "DNS Records".
 - "Quick Actions" h2: two rows each w/ bold label, 2-line grey copy, a blue underlined
   "About …" link w/ ↗, and a TOGGLE (off, showing an ✕) on the right; then blue links
   "Run speed test", "Configure caching".
 - "Domain Registration": "Registrar: Unknown", blue "Transfer to Cloudflare".
 - "Active Subscriptions": blue "Billing" + right grey "Next bill: March 14, 2025".

## 40 Zapier (096)
White, orange #ff4f00 primary, navy #2d2e2e ink, indigo #4d44d9 secondary button,
rounded-lg, generous whitespace, LOTS of empty space (only two rows of content).
Top bar: ✕ left, wordmark, right a search glyph and a dark avatar circle.
Sidebar 415px w/ hairline right border: a full-width ORANGE rounded "+ Create Zap";
nav rows w/ outline icons: Dashboard, Zaps, Transfers, My Apps(ACTIVE: peach fill +
bold), Zap History, Explore, Get Help; rule;
a plan block: "▭ Free Plan" bold, then "Tasks  0 / 1,000" with a thin grey progress bar
(empty), "Zaps  Unlimited", grey "Monthly usage resets in 29 days", blue underlined
"Manage Plan", then a full-width OUTLINED indigo "Upgrade plan".
Main: H1 "Apps" 2.2rem bold; right a bordered rounded search "Search apps" and an INDIGO
"+ Add connection" button.
Two bordered rounded-lg rows, each: a square logo slot, bold app name, then two right-
aligned stat columns (big bold number over grey label) "1 Connection" and "1 Zap",
then a chevron ›.
Footer (inside the content area): "Follow us" + 5 round social glyph circles; right a row
of links (Pricing, Help, Developer Platform, Press, Jobs, ... , Transfer); below,
the wordmark and "© 2022 Acme Inc." + Manage cookies | Legal | Privacy.

| 41 | 097 | Stripe, Your overview | billing-benchmarks `overview` page | DONE |
| 42 | 098 | Deel HR analytics | people-analytics | DONE |
| 43 | 099 | Customer.io campaigns | campaign-list | DONE |
| 44 | 100 | Mixpanel home | product-analytics | REMEASURED |
| 45 | 101 | Whop creator | creator-revenue | REMEASURED |
| 46 | 102 | Mercury transactions | banking-ledger | DONE |
| 47 | 103 | Posh events | event-console (dark) | DONE |
| 48 | 104-108 | Twenty CRM | crm-workspace | DONE |

## 41 Stripe overview (097)
Same shell as 34 but the top nav is HORIZONTAL not a sidebar: pill "Home"(indigo fill) then
Payments/Balances/Customers/Products/Billing/Reports/Connect/"More ⌄"; right "Developers"
and "Test mode" + an ORANGE toggle (ON). Above that a thin bar: store glyph + "Jane ⌄",
a pink chip "Action required ⚠", centred search, right "Create ⌄", "? Help", bell, gear, user.
An ORANGE "TEST DATA" tab hangs from the top edge of the content area, centred.
H1 "Your overview" + right outlined "⚙ Edit overview". Rule.
Control row: "Last 7 days ⌄", "🗓 Mar 15–Mar 21", grey "compared to", "Previous period ⌄",
"Daily ⇅".
3-column widget grid separated by whitespace, each widget: bold title + ⓘ (+ a green "+∞"
chip where growth is infinite), grey sub "Last 7 days", rule, then content.
 - "Payments": a grey-50 empty panel with a ⚠ glyph and centred grey
   "This content is only available for live data."
 - "Gross volume +∞": legend rows "— Last 7 days $41.54" and "— Previous period $0.00"
   (indigo and grey short dashes); y max label "$41.54" top-left, "$0.00" at the baseline;
   a line flat at zero then a steep diagonal to the top-right corner; x "Mar 15" / "Today";
   footer indigo "View all payments" + grey "Updated at 4:57 AM 🕐".
 - A dismissible grey-50 promo card: ✕ top-right, centred bold 2-line
   "Get quick access to key business insights", 2-line grey copy, indigo
   "Add to your overview ⊕", and a screenshot placeholder of a stacked-bar
   "Outstanding invoices" widget.
 - "Net volume from sales +∞" ($29.62 vs $0.00), "Failed payments" ($4.00, a row w/ date +
   email + a pink "Failed" chip, footer "1 of 1 result"), "New customers +∞" (3 vs 0).
A right EDGE rail holds a "+" button and a "❯_" button in small squares.

## 42 Deel (098)
Warm off-white #faf9f7 page, white cards rounded-2xl, purple #7c5cff "NEW" chips,
grey-500 body. Sidebar 365px: wordmark + avatar + bell + search glyph;
a bordered row w/ a round icon + "JD Mob / Jane's Group" + "⋮"; a thin full-width rule
with dots at both ends.
small-caps grey "GROUP": Home, People, Add people, Tracker, Analytics(ACTIVE white card),
Documents, Compliance + purple NEW, Payments, Group Settings.
small-caps "ORGANIZATION": App Store, Services, Expenses, Global Payroll + NEW,
Organization Settings. Rule, then "🚀 Get started with HR" + NEW.
Main: a card ending in a full-width grey-50 button "▦ View Dashboard"; above it two mini
cards with a SLIDER-like axis: a coloured track with a dot at the right end and month
labels May Jul Sep Nov Jan Apr underneath.
Section header row: a round grey-50 avatar-ish icon (56px) + "Diversity, equity and
inclusion" 1.8rem bold + grey sub "Collected insights into DE&I across your organization";
right "Last 12 months ⌄".
Big card, grey-50 inner panel: left col "Diversity by headcount ⓘ" + bold 2-line date range
"April 1st 2023 - March 31st 2024 · All countries"; then three grey-50 rows, each a label
on the left and a right-aligned value: "Age / Not available · 66.67% ⏎ <29 · 33.33%",
"Gender / Not specified · 100%", "Ethnicity / Not specified · 100%".
Right two white cards:
 - "Average compensation by gender ⓘ": a butterfly-and-blob illustration placeholder and
   centred grey 2-line "No average compensation by gender available to show".
 - "Headcount by ethnicity ⓘ": big "3" then a THICK DARK-GREY DONUT (nearly closed, one
   thin white gap on the right edge).
Then another full-width "▦ View Dashboard" button.

## 43 Customer.io (099)
White; a thin ORANGE bar across the very top; then a DARK NAVY #1a2b32 top bar;
green #3ecf8e logo; blue #1a6ef5 links; 0.95rem.
Far-left icon rail 68px (white, hairline): a green-tinted active square then a grey glyph.
Second sidebar 285px: "Journeys" bold + a "«" collapse; nav Dashboard/Analysis/
Campaigns(ACTIVE grey fill)/Broadcasts/Transactional/Deliveries & Drafts; rule;
People/Custom Objects/Segments/Activity Logs/"Data & Integrations ⌄"; rule; "Content ⌄".
Dark top bar: "mobbin.com production ⇅" left; right "? Need help?", bell w/ green dot,
chat, gear, user.
Main: H1 "Campaigns" + right a BLACK "Create Campaign" button.
Filter row with small-caps grey labels above each control: FILTER BY (a search input),
TRIGGERED BY ("All ▾"), STATUS ("Campaign state ⌄"), TOPIC, TAGS.
Tabs: "Active 24"(active, blue underline, count in a grey pill) / "Archived 0".
Toolbar: "24 Campaigns" bold + grey "Metric definitions ?" + a date-range box
"🗓 Mar 11, 2024 - Apr 09, 2024" + a select "Delivered ▾" + a sort icon + a columns icon +
right "1 – 20 of 24" and four pager buttons |‹ ‹ › ›|.
Table header: NAME ⌄ | DELIVERED ⌄ (blue, the sorted column) | OPENED ⌄ | CLICKED ⌄ |
CONVERTED ⌄.
Each ROW IS TWO LINES TALL: line 1 = a target glyph + a BLUE bold campaign name + a green
"● Running" chip + the four metric values; line 2 = counts "5 ✉  5 ⏱" under the name and a
small SPARKLINE under each metric column. Some rows' metric values are BLURRED (a privacy
state) — reproduce as grey blurred bars. One row has "Show 1 more" in blue under it.

## 45 Whop (101)
White, indigo #5b5bd6 brand, rounded-xl, 0.95rem.
Sidebar 348px: "⌾ Go to hub" + a collapse box; a bordered card "$500 IN 7 DAYS" +
a FLIP-CLOCK countdown (four pairs of digit tiles) labelled DAYS HRS MINS SECS +
a full-width indigo "View milestone"; then avatar + "ASMobbin ⌄";
nav Home(ACTIVE grey)/Users/Links/Milestones/"Growth Hacks ●"/Marketing ⌄/Finances ⌄/
Operations ⌄/Settings ⌄; bottom a lavender card "Partner Program / Earn 30% of recurring
revenue for life!"; footer a bordered "EN" and a round "?".
Top bar: a bordered pill "🏆 Milestones"; right a search box "Search ⌘K", then glyphs
(book, $, bell), avatar.
Banners: a YELLOW banner "In order to view some of the data for this company, you must
enable two factor authentication…" + right "Set up two factor authentication ›";
a LAVENDER banner about sharing stats with an ↗ glyph.
"Today" 2rem bold + right an indigo pill "🎓 Need help? Join Whop University".
Card "Gross revenue ⓘ": "$2" 2.6rem + a green chip "$2 ↑"; chart: y label "$1" top-left,
faint vertical BANDS behind, an indigo line with a DOT ON EVERY HOUR flat at 0 with one
square-topped plateau near the right (two adjacent dots at $1); x "12:00 AM" / "11:00 PM".
Card "To-do list": one lavender row "👋 Welcome 12 new users ›".
"Stats" 2rem + controls "Last 7 days ⌄", "🗓 Jul 24 - 30, 2024", grey "compared to",
"Previous period ⌄", "Daily ⌄"; right "+ Add" and "⚙ Edit".
Then cards "MRR ⓘ $0", "ARR ⓘ $0" (each w/ an ↗ open-in-new box) and
"Payments breakdown ⓘ" w/ a segmented horizontal bar (green / yellow / thin red / grey).

## 46 Mercury (102)
White, hairline table, pink/magenta #e5457f as the outflow colour and green for inflow.
Sidebar 288px: a square avatar + "Acme ⇅"; nav Home/Tasks/Transactions(ACTIVE grey)/
Payments ⌄/Cards/Capital/"Accounts ⌃" w/ children "Credit Card", "Checking ••2502 $972.04",
"Savings ••5679 $1,020.00" (two-line rows w/ the balance under the name);
small-caps grey "Workflows": Bill Pay, Invoicing ⌄, Reimbursements, Accounting.
Top bar: a wide search "Search for anything ⌘K"; right a bordered "Move Money ⌄",
an eye-off glyph, bell w/ pink dot, avatar.
H1 "Transactions" + right an outlined "▤ Match Receipts".
Toolbar of outlined pills: "🔖 Data Views ⌄", "⇶ Filters", "Date ⌄", "Keywords ⌄",
"Amount ⌄"; right four icon buttons and "⤓ Export All".
Summary strip (3 cells divided by hairlines):
 - left: grey "Net change this month", "−$6.41" 2rem (the cents smaller), grey
   "vs. −$3.55 last month"; then two rows with a coloured left TICK: green "Money in $0.00",
   pink "Money out −$6.41".
 - middle: an area chart, y "$7"/"$3", x Nov 1..Nov 7, a pink curve rising to a plateau
   with a pink gradient fill, and a flat green line at the bottom.
 - right: "To/From ⌄" + "▤ Group Table" + "⌃"; a two-bar chart (one grey, one pink)
   labelled "Google Workspace".
A dark TOOLTIP card floats over the table: bold "Google Workspace", "Net change −$6.41",
then pink/green ticked rows "Money in $0.00" / "Money out −$6.41".
Table: checkbox | Date ↓ | To/From | Amount | Account | Method | (a select) | Attachment.
Rows: round logo slot, name, amount (green for in, dark for out, with SMALLER CENTS),
account name, method (glyph + "Wire Payment" / "ACH Payment" / "Transfer In" / "Transfer
Out" / a card number), an empty dropdown, and a "+" circle. One row is
"GOOGLE *TEMPORARY …" with a pink "Failed" chip and a STRUCK-THROUGH "$0.00".

## 47 Posh (103)  DARK
Pure #000, cards #111, crimson #e8134b data, rounded-xl, white sans.
Top bar: "posh" wordmark left; a CENTRED pill-shaped nav container (#161616) holding
Overview(active, white text)/Marketing/Team/Finance/Profile/Settings; right avatar, bell,
hamburger.
Header: a round white logo slot (72px) + "Acme" 2.2rem bold; then a small glyph +
"Apprentice" + "?" ; right "$0 / $100,000" over a full-width thin grey progress track
(empty).
Two bordered stat cards side by side: centred small-caps grey "EVENTS" + "4",
"TOTAL ATTENDEES" + "3"; then a white pill button "+ Create New Event".
Big chart card: y 0/1/2/3 with DASHED gridlines, x Jan 21..Jan 28 with VERTICAL rotated
labels, a crimson curve flat at 0 then a smooth hump to 3 and down; crimson gradient fill;
a round refresh button top-right.
Under the chart: small-caps "TICKETS THIS WEEK" + "4"; right a segmented 1W(active)/1M/ALL.
Right column "Orders": a search input "Search (Event Name, Attendee Name, Email, Order";
then order cards (#111): round avatar slot, bold name, grey timestamp, grey truncated event
name, sometimes a small "🔗 series" chip; right "Order #22291646" and bold "$0.00";
then a full-width bordered "View More".
Section "Events": a card with italic grey "Event series:" then a 1.5rem bold title,
a green "● Live" row, then a wide banner-image placeholder with the title over it and two
rounded stat tiles ("3", "13") to the right; a pencil and an eye glyph top-right.
