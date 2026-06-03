const PAGE_VERSION = "2026-06-03-checkbox-solution-refresh";

const solutionForm = document.querySelector("#solutionForm");
const phaseLabel = document.querySelector("#phaseLabel");
const solutionTitle = document.querySelector("#solutionTitle");
const solutionSummary = document.querySelector("#solutionSummary");
const toolCards = document.querySelector("#toolCards");
const roadmapList = document.querySelector("#roadmapList");
const subsidyBanner = document.querySelector("#subsidyBanner");
const adoptionInputs = document.querySelectorAll("[data-adoption]");
const adoptionScore = document.querySelector("#adoptionScore");
const adoptionBar = document.querySelector("#adoptionBar");
const adoptionTitle = document.querySelector("#adoptionTitle");
const adoptionText = document.querySelector("#adoptionText");

const CATEGORY_LABELS = {
  cost: "原価・収益管理",
  site_share: "現場情報共有",
  photo: "写真・書類管理",
  schedule: "工程管理",
  labor: "勤怠・労務",
  contract: "契約・請求・会計",
  estimate: "見積・受発注",
  safety: "安全書類",
  automation: "AI・自動化",
};

const PHASE_MESSAGES = {
  A: {
    name: "フェーズA：無料〜低コストで可視化",
    title: "まずは無料〜低コストの仕組みで十分な可能性があります",
    summary: "Excel・Google Drive・AIで課題を整理し、どこにムダがあるかを見える化しましょう。",
    roadmap: ["課題とムダの発生箇所をメモする", "Excel / Drive / AIで1業務だけ試す", "1ヶ月後にITツール化すべき業務を判断"],
  },
  B: {
    name: "フェーズB：軽量ITツールで小さく検証",
    title: "特定課題に絞った軽量ITツールで、小さく始めましょう",
    summary: "まず1つの現場・1つの課題で検証し、効果を確認してから横展開しましょう。",
    roadmap: ["対象現場と試す業務を決める", "軽量ITツールを1業務だけで試す", "入力負荷と削減時間を見て横展開を判断"],
  },
  C: {
    name: "フェーズC：総合型・連携型へ移行",
    title: "複数課題をまとめて解決できる総合型ツールを比較しましょう",
    summary: "現場・事務・経営の情報をつなげる前提で、導入範囲と運用ルールを先に決めることが重要です。",
    roadmap: ["複数課題の優先順位を決める", "総合型ITツールまたは経営管理ツールを比較", "3〜6ヶ月で現場・事務・経営の連携を設計"],
  },
  D: {
    name: "フェーズD：全社DX・基幹刷新",
    title: "全社DX・基幹システム刷新を検討する段階です",
    summary: "自社業務に合わせたシステム設計、補助金活用、外部PMの活用を含めて計画しましょう。",
    roadmap: ["全社業務フローとデータ基盤を棚卸し", "基幹刷新・カスタム開発・BIM/CIMを比較", "補助金と外部PMを活用して段階導入"],
  },
};

const TOOLS = [
  { id: "excel", name: "Excel / Googleスプレッドシート", category: ["cost", "estimate", "labor"], phase: ["A"], cost_min: 0, cost_label: "無料〜", type: "free", url: "https://workspace.google.com/intl/ja/", desc: "原価台帳・案件管理・日報集計のたたき台" },
  { id: "chatgpt", name: "ChatGPT", category: ["automation"], phase: ["A"], cost_min: 0, cost_label: "無料〜3,000円/月", type: "ai", url: "https://chatgpt.com/", desc: "日報要約・議事録・見積文章・FAQ生成" },
  { id: "gemini", name: "Gemini", category: ["automation"], phase: ["A"], cost_min: 0, cost_label: "無料〜", type: "ai", url: "https://gemini.google.com/", desc: "文章作成・情報整理・社内ナレッジ化の補助" },
  { id: "google_drive", name: "Google Drive", category: ["photo", "contract"], phase: ["A"], cost_min: 0, cost_label: "無料〜", type: "free", url: "https://workspace.google.com/intl/ja/products/drive/", desc: "写真・書類のクラウド共有基盤" },
  { id: "kuraemon", name: "蔵衛門", category: ["photo"], phase: ["A", "B"], cost_min: 0, cost_label: "無料プランあり", type: "it_tool", url: "https://www.kuraemon.com/", desc: "工事写真台帳・電子小黒板・国土交通省対応" },
  { id: "kanna_free", name: "KANNA（無料プラン）", category: ["photo", "site_share"], phase: ["A"], cost_min: 0, cost_label: "無料〜", type: "it_tool", url: "https://lp.kanna4u.com/", desc: "現場日報・写真管理・チャット（無料で開始可）" },
  { id: "kanna", name: "KANNA", category: ["site_share", "photo", "schedule"], phase: ["B"], cost_min: 5500, cost_label: "〜数万円/月", type: "it_tool", url: "https://lp.kanna4u.com/", desc: "現場情報共有・日報・チャット・工程管理" },
  { id: "kaname", name: "Kaname（要〜KANAME〜）", category: ["site_share", "safety"], phase: ["B"], cost_min: null, cost_label: "要問合せ", type: "it_tool", url: "https://www.pluscad.jp/products/kaname/", desc: "現場管理・協力会社連携に特化した軽量ITツール" },
  { id: "greensite", name: "グリーンサイト", category: ["safety"], phase: ["B"], cost_min: 3300, cost_label: "3,300円〜/月", type: "it_tool", url: "https://www.greenfile.work/", desc: "安全書類の電子化・グリーンファイル対応・業界標準" },
  { id: "jobcan", name: "ジョブカン勤怠管理", category: ["labor"], phase: ["B"], cost_min: 200, cost_label: "200円/人/月〜", type: "it_tool", url: "https://jobcan.ne.jp/", desc: "GPS打刻・直行直帰・残業時間・給与連携" },
  { id: "cloudsign", name: "クラウドサイン", category: ["contract"], phase: ["B"], cost_min: 11000, cost_label: "11,000円〜/月", type: "it_tool", url: "https://www.cloudsign.jp/", desc: "電子契約・インボイス対応・取引先へ無料送付" },
  { id: "valena", name: "バレーナ（建設BALENA）", category: ["automation", "site_share", "cost"], phase: ["B"], cost_min: null, cost_label: "要問合せ", type: "nocode", url: "https://office-concierge.co.jp/balena/", desc: "建設業特化ノーコード業務アプリ構築ツール" },
  { id: "kintone", name: "kintone", category: ["automation", "cost", "site_share"], phase: ["B", "C"], cost_min: 780, cost_label: "780円/人/月〜", type: "nocode", url: "https://kintone.cybozu.co.jp/", desc: "ノーコードでカスタム業務アプリを構築・連携" },
  { id: "appsheet", name: "AppSheet", category: ["automation"], phase: ["B"], cost_min: 0, cost_label: "無料〜", type: "nocode", url: "https://about.appsheet.com/home/", desc: "Googleスプレッドシートからノーコードアプリ化" },
  { id: "craftbank", name: "クラフトバンクオフィス", category: ["cost", "estimate", "contract"], phase: ["C"], cost_min: null, cost_label: "要問合せ", type: "it_tool", url: "https://craft-bank.com/", desc: "原価・見積・発注・請求を一元管理" },
  { id: "andpad", name: "ANDPAD", category: ["site_share", "schedule", "photo", "estimate", "cost"], phase: ["C"], cost_min: null, cost_label: "要問合せ（数万円〜）", type: "it_tool", url: "https://andpad.jp/", desc: "総合施工管理プラットフォーム" },
  { id: "anyone", name: "AnyONE", category: ["estimate", "cost", "schedule", "contract"], phase: ["C"], cost_min: null, cost_label: "要問合せ", type: "it_tool", url: "https://www.any-one.jp/", desc: "見積〜工程〜請求〜原価を一元管理" },
  { id: "aippia", name: "アイピア", category: ["cost", "estimate", "schedule"], phase: ["C"], cost_min: null, cost_label: "要問合せ", type: "it_tool", url: "https://aippearnet.com/", desc: "建築業向け原価・案件・見積管理システム" },
  { id: "photoruction", name: "Photoruction", category: ["photo", "schedule", "site_share"], phase: ["C"], cost_min: null, cost_label: "要問合せ", type: "it_tool", url: "https://photoruction.com/", desc: "写真管理からデータ活用・工程管理まで対応" },
  { id: "spiderplus", name: "Spider Plus", category: ["photo", "site_share"], phase: ["B", "C"], cost_min: null, cost_label: "要問合せ", type: "it_tool", url: "https://www.spiderplus.co.jp/", desc: "図面管理・マークアップ・計測のプロフェッショナル" },
  { id: "freee", name: "freee会計 / freee人事労務", category: ["contract", "labor"], phase: ["B", "C"], cost_min: 1980, cost_label: "1,980円〜/月", type: "it_tool", url: "https://www.freee.co.jp/", desc: "会計・給与計算をクラウドで一元化" },
  { id: "custom_dev", name: "カスタム開発（受託SIer）", category: ["cost", "site_share", "schedule", "automation"], phase: ["D"], cost_min: null, cost_label: "数十万円〜", type: "custom", url: null, desc: "自社業務に完全特化したシステムを一から開発" },
  { id: "bim", name: "BIM/CIM連携（Autodesk等）", category: ["schedule", "site_share"], phase: ["D"], cost_min: null, cost_label: "数十万円〜/年", type: "custom", url: "https://www.autodesk.co.jp/", desc: "3次元データ活用・公共工事BIM/CIM原則対応" },
];

function getCheckedValues(name) {
  return [...document.querySelectorAll(`[name="${name}"]:checked`)].map((input) => input.value);
}

function maxByPriority(values, priority) {
  return [...values].sort((a, b) => priority.indexOf(b) - priority.indexOf(a))[0];
}

function determinePhase(budgets, losses, complexities) {
  const budget = maxByPriority(budgets, ["free", "lt5", "lt20", "gt20"]);
  const loss = maxByPriority(losses, ["lt10", "10to50", "50to100", "gt100"]);

  if (budget === "gt20") return "D";
  if (
    (budget === "lt20" && ["50to100", "gt100"].includes(loss)) ||
    (complexities.length >= 3 && ["lt20", "gt20"].includes(budget))
  ) return "C";
  if (budget === "lt5") return "B";
  return "A";
}

function filterTools(toolsDB, phase, complexities) {
  return toolsDB.filter((tool) =>
    tool.phase.includes(phase) && tool.category.some((cat) => complexities.includes(cat)),
  );
}

function sortTools(tools, phase, complexities) {
  const sortedTools = [...tools];
  if (phase === "C" && complexities.length >= 3) {
    const priorityIds = ["andpad", "anyone", "aippia"];
    return sortedTools.sort((a, b) => {
      const aPriority = priorityIds.includes(a.id) ? -1 : 0;
      const bPriority = priorityIds.includes(b.id) ? -1 : 0;
      return aPriority - bPriority;
    });
  }
  return sortedTools;
}

function logoText(name) {
  if (/Excel/.test(name)) return "Excel";
  if (/ChatGPT/.test(name)) return "AI";
  if (/Google Drive/.test(name)) return "Drive";
  if (/BIM/.test(name)) return "BIM";
  return name.replace(/（.*?）/g, "").split(/[ /]/)[0].slice(0, 8);
}

function typeLabel(type) {
  const labels = { it_tool: "ITツール", free: "無料", ai: "AI", nocode: "ノーコード", custom: "個別設計" };
  return labels[type] || type;
}

function renderToolCard(tool) {
  const badges = tool.category
    .map((cat) => `<span class="tool-badge">${CATEGORY_LABELS[cat] || cat}</span>`)
    .join("");
  const link = tool.url
    ? `<a class="detail-link" href="${tool.url}" target="_blank" rel="noreferrer">詳細を見る</a>`
    : `<span class="detail-link muted-link">個別相談で確認</span>`;

  return `<article class="recommend-tool-card">
    <div class="tool-card-head"><span class="brand-logo">${logoText(tool.name)}</span><strong>${tool.name}</strong><span class="type-pill">${typeLabel(tool.type)}</span></div>
    <div class="badge-row">${badges}</div>
    <p>${tool.desc}</p>
    <div class="tool-card-foot"><span>${tool.cost_label}</span>${link}</div>
  </article>`;
}

function renderRoadmap(phase) {
  const steps = PHASE_MESSAGES[phase].roadmap;
  const labels = ["今すぐ", "1〜3ヶ月", "3〜6ヶ月"];
  roadmapList.innerHTML = steps
    .map((step, index) => `<li><span>${labels[index]}</span>${step}</li>`)
    .join("");
}

function showEmptyState() {
  phaseLabel.textContent = "未診断";
  solutionTitle.textContent = "①〜③を選ぶと、候補ツールを表示します";
  solutionSummary.textContent = "課題カテゴリ・月次損失規模・月額予算を選択してください。選択前は推奨ツールを表示しません。";
  toolCards.innerHTML = `<div class="empty-state">まだ推奨ツールはありません。左のチェック項目を選択すると、ここに候補が表示されます。</div>`;
  subsidyBanner.hidden = true;
  roadmapList.innerHTML = "";
}

function renderRecommendations() {
  const complexities = getCheckedValues("complexities");
  const losses = getCheckedValues("loss");
  const budgets = getCheckedValues("budget");
  const isReady = complexities.length > 0 && losses.length > 0 && budgets.length > 0;
  const results = document.querySelector("#solutionResults");

  if (!isReady) {
    showEmptyState();
  } else {
    const phase = determinePhase(budgets, losses, complexities);
    const message = PHASE_MESSAGES[phase];
    const matchingTools = sortTools(filterTools(TOOLS, phase, complexities), phase, complexities);

    phaseLabel.textContent = message.name;
    solutionTitle.textContent = message.title;
    solutionSummary.textContent = message.summary;
    toolCards.innerHTML = matchingTools.length > 0
      ? matchingTools.slice(0, 6).map(renderToolCard).join("")
      : `<div class="empty-state">この条件に完全一致するツールは少ないため、無料相談で優先順位を整理しましょう。</div>`;
    subsidyBanner.hidden = !["C", "D"].includes(phase);
    renderRoadmap(phase);
  }

  results.classList.remove("is-updating");
  window.requestAnimationFrame(() => results.classList.add("is-updating"));
}

function renderAdoption() {
  const total = [...adoptionInputs].reduce((sum, input) => sum + Number(input.value), 0);
  adoptionScore.textContent = Number.isInteger(total) ? total : total.toFixed(1);
  adoptionBar.style.width = `${Math.round((total / 6) * 100)}%`;

  if (total >= 4.5) {
    adoptionTitle.textContent = "実行準備あり：小さく試して横展開できます";
    adoptionText.textContent = "導入目的と運用体制がかなり整理されています。1〜2現場で試し、削減時間と現場の声を見ながら横展開しましょう。";
  } else if (total >= 2.5) {
    adoptionTitle.textContent = "一部要整理：伴走相談で抜け漏れを確認しましょう";
    adoptionText.textContent = "課題は見えていますが、運用ルールや浸透計画に抜けがありそうです。無料相談で決めるべき項目を整理しましょう。";
  } else {
    adoptionTitle.textContent = "要整理：導入前に現状を整理しましょう";
    adoptionText.textContent = "導入理由や運用ルールが未整理です。無料相談で「何を決めれば自社で進められるか」を一緒に整理しましょう。";
  }
}

solutionForm.addEventListener("change", renderRecommendations);
adoptionInputs.forEach((input) => input.addEventListener("change", renderAdoption));

renderRecommendations();
renderAdoption();
