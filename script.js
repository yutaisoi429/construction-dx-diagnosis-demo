const PAGE_VERSION = "2026-06-03-v3-solution-logic";

const solutionForm = document.querySelector("#solutionForm");
const phaseLabel = document.querySelector("#phaseLabel");
const solutionTitle = document.querySelector("#solutionTitle");
const solutionSummary = document.querySelector("#solutionSummary");
const solutionWarning = document.querySelector("#solutionWarning");
const toolCards = document.querySelector("#toolCards");
const roadmapList = document.querySelector("#roadmapList");
const roiText = document.querySelector("#roiText");
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
    summary: "Excel・Google・AIで課題を可視化し、損失額を見える化しましょう。",
    roadmap: ["課題カテゴリを1〜2個に絞る", "Excel / Drive / AIで台帳化して損失を測る", "1ヶ月後にSaaS化すべき業務を判断"],
  },
  B: {
    name: "フェーズB：軽量SaaSで小さく検証",
    title: "特定課題に絞った軽量SaaSで、小さく始めましょう",
    summary: "まず1つの現場・1つの課題で検証し、効果を確認してから横展開しましょう。",
    roadmap: ["対象現場とキーマンを決める", "軽量SaaSを1業務だけで試す", "入力負荷と削減時間を見て横展開を判断"],
  },
  C: {
    name: "フェーズC：総合型・連携型へ移行",
    title: "複数課題を一括解決できる総合型への移行フェーズです",
    summary: "ROIを試算しながら、複数ツールを段階的に連携させましょう。",
    roadmap: ["複数課題の優先順位とROIを試算", "総合型SaaSまたは経営管理ツールを比較", "3〜6ヶ月で現場・事務・経営の連携を設計"],
  },
  D: {
    name: "フェーズD：全社DX・基幹刷新",
    title: "全社DX・基幹システム刷新のステージです",
    summary: "IT導入補助金・ものづくり補助金を活用して投資対効果を最大化しましょう。",
    roadmap: ["全社業務フローとデータ基盤を棚卸し", "基幹刷新・カスタム開発・BIM/CIMを比較", "補助金と外部PMを活用して段階導入"],
  },
};

const TOOLS = [
  { id: "excel", name: "Excel / Googleスプレッドシート", category: ["cost", "estimate", "labor"], phase: ["A"], cost_min: 0, cost_label: "無料〜", type: "free", url: "https://workspace.google.com", desc: "原価台帳・案件管理・日報集計のたたき台" },
  { id: "chatgpt", name: "ChatGPT / Gemini", category: ["automation"], phase: ["A"], cost_min: 0, cost_label: "無料〜3,000円/月", type: "ai", url: "https://chatgpt.com", desc: "日報要約・議事録・見積文章・FAQ生成" },
  { id: "google_drive", name: "Google Drive", category: ["photo", "contract"], phase: ["A"], cost_min: 0, cost_label: "無料〜", type: "free", url: "https://drive.google.com", desc: "写真・書類のクラウド共有基盤" },
  { id: "kuraemon", name: "蔵衛門", category: ["photo"], phase: ["A", "B"], cost_min: 0, cost_label: "無料プランあり", type: "saas", url: "https://www.kuraemon.com", desc: "工事写真台帳・電子小黒板・国土交通省対応" },
  { id: "kanna_free", name: "KANNA（無料プラン）", category: ["photo", "site_share"], phase: ["A"], cost_min: 0, cost_label: "無料〜", type: "saas", url: "https://kanna.app", desc: "現場日報・写真管理・チャット（無料で開始可）" },
  { id: "kanna", name: "KANNA", category: ["site_share", "photo", "schedule"], phase: ["B"], cost_min: 5500, cost_label: "〜数万円/月", type: "saas", url: "https://kanna.app", desc: "現場情報共有・日報・チャット・工程管理" },
  { id: "kaname", name: "Kaname", category: ["site_share", "safety"], phase: ["B"], cost_min: null, cost_label: "要問合せ", type: "saas", url: "https://kaname.app", desc: "現場管理・協力会社連携に特化した軽量SaaS" },
  { id: "craftbank", name: "クラフトバンク", category: ["cost", "estimate", "contract"], phase: ["C"], cost_min: null, cost_label: "要問合せ", type: "saas", url: "https://craftbank.co.jp", desc: "建設業向け経営管理システム。原価・見積・発注・請求を一元管理" },
  { id: "greensite", name: "グリーンサイト", category: ["safety"], phase: ["B"], cost_min: 3300, cost_label: "3,300円〜/月", type: "saas", url: "https://www.greenfile.work", desc: "安全書類の電子化・グリーンファイル対応・業界標準" },
  { id: "jobcan", name: "ジョブカン勤怠", category: ["labor"], phase: ["B"], cost_min: 200, cost_label: "200円/人/月〜", type: "saas", url: "https://jobcan.ne.jp", desc: "GPS打刻・直行直帰・残業時間・給与連携" },
  { id: "cloudsign", name: "クラウドサイン", category: ["contract"], phase: ["B"], cost_min: 11000, cost_label: "11,000円〜/月", type: "saas", url: "https://www.cloudsign.jp", desc: "電子契約・インボイス対応・取引先へ無料送付" },
  { id: "valena", name: "バレーナ", category: ["automation", "site_share", "cost"], phase: ["B"], cost_min: null, cost_label: "要問合せ", type: "nocode", url: "https://valena.jp", desc: "建設業特化ノーコード業務アプリ構築ツール" },
  { id: "kintone", name: "kintone", category: ["automation", "cost", "site_share"], phase: ["B", "C"], cost_min: 780, cost_label: "780円/人/月〜", type: "nocode", url: "https://kintone.cybozu.co.jp", desc: "ノーコードでカスタム業務アプリを構築・連携" },
  { id: "appsheet", name: "AppSheet", category: ["automation"], phase: ["B"], cost_min: 0, cost_label: "無料〜", type: "nocode", url: "https://about.appsheet.com", desc: "Googleスプレッドシートからノーコードアプリ化" },
  { id: "andpad", name: "ANDPAD", category: ["site_share", "schedule", "photo", "estimate", "cost"], phase: ["C"], cost_min: null, cost_label: "要問合せ（数万円〜）", type: "saas", url: "https://andpad.jp", desc: "業界シェアNo.1総合施工管理プラットフォーム" },
  { id: "anyone", name: "AnyONE", category: ["estimate", "cost", "schedule", "contract"], phase: ["C"], cost_min: null, cost_label: "要問合せ", type: "saas", url: "https://anyone.co.jp", desc: "見積〜工程〜請求〜原価を一元管理" },
  { id: "aippia", name: "アイピア", category: ["cost", "estimate", "schedule"], phase: ["C"], cost_min: null, cost_label: "要問合せ", type: "saas", url: "https://aippearnet.com", desc: "建築業向け原価・案件・見積管理システム" },
  { id: "photoruction", name: "Photoruction", category: ["photo", "schedule", "site_share"], phase: ["C"], cost_min: null, cost_label: "要問合せ", type: "saas", url: "https://photoruction.com", desc: "写真管理からデータ活用・工程管理まで対応" },
  { id: "spiderplus", name: "Spider Plus", category: ["photo", "site_share"], phase: ["B", "C"], cost_min: null, cost_label: "要問合せ", type: "saas", url: "https://www.spiderplus.co.jp", desc: "図面管理・マークアップ・計測のプロフェッショナル" },
  { id: "freee", name: "freee会計 / freee人事労務", category: ["contract", "labor"], phase: ["B", "C"], cost_min: 1980, cost_label: "1,980円〜/月", type: "saas", url: "https://www.freee.co.jp", desc: "会計・確定申告・給与計算をクラウドで一元化" },
  { id: "custom_dev", name: "カスタム開発（受託SIer）", category: ["cost", "site_share", "schedule", "automation"], phase: ["D"], cost_min: null, cost_label: "数十万円〜", type: "custom", url: null, desc: "自社業務に完全特化したシステムを一から開発" },
  { id: "bim", name: "BIM/CIM連携（Autodesk等）", category: ["schedule", "site_share"], phase: ["D"], cost_min: null, cost_label: "数十万円〜/年", type: "custom", url: "https://www.autodesk.co.jp", desc: "3次元データ活用・公共工事BIM/CIM原則対応" },
];

function getCheckedValues(name) {
  return [...document.querySelectorAll(`[name="${name}"]:checked`)].map((input) => input.value);
}

function getRadioValue(name) {
  return document.querySelector(`[name="${name}"]:checked`)?.value;
}

function determinePhase(budget, resource, loss, complexities) {
  if (budget === "gt20" && resource === "team") return "D";
  if (
    (budget === "lt20" && resource !== "none" && ["50to100", "gt100"].includes(loss)) ||
    (complexities.length >= 3 && ["lt20", "gt20"].includes(budget))
  ) return "C";
  if (budget === "lt5" && resource !== "none") return "B";
  return "A";
}

function shouldWarn(budget, resource) {
  return resource === "none" && ["lt20", "gt20"].includes(budget);
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

function calcROI(lossAmount, toolCostMin) {
  const lossMap = { lt10: 50000, "10to50": 300000, "50to100": 750000, gt100: 1500000 };
  const monthlyLoss = lossMap[lossAmount] || 0;
  if (!toolCostMin || monthlyLoss <= 0) return null;
  const months = Math.ceil(monthlyLoss / toolCostMin);
  return `投資回収試算：月次損失${(monthlyLoss / 10000).toFixed(0)}万円 ÷ ツールコスト${(toolCostMin / 10000).toFixed(1)}万円 = 約${months}ヶ月で回収見込み`;
}

function renderToolCard(tool) {
  const badges = tool.category
    .map((cat) => `<span class="tool-badge">${CATEGORY_LABELS[cat] || cat}</span>`)
    .join("");
  const link = tool.url
    ? `<a class="detail-link" href="${tool.url}" target="_blank" rel="noreferrer">詳細を見る</a>`
    : `<span class="detail-link muted-link">個別相談で確認</span>`;

  return `<article class="recommend-tool-card">
    <div class="tool-card-head"><strong>${tool.name}</strong><span class="type-pill">${tool.type}</span></div>
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

function renderRecommendations() {
  const complexities = getCheckedValues("complexities");
  const loss = getRadioValue("loss");
  const budget = getRadioValue("budget");
  const resource = getRadioValue("resource");
  const phase = determinePhase(budget, resource, loss, complexities);
  const message = PHASE_MESSAGES[phase];
  const filterComplexities = complexities.length > 0 ? complexities : ["cost", "photo", "automation"];
  const matchingTools = sortTools(filterTools(TOOLS, phase, filterComplexities), phase, complexities);
  const displayedTools = matchingTools.length > 0 ? matchingTools : sortTools(filterTools(TOOLS, phase, Object.keys(CATEGORY_LABELS)), phase, complexities);
  const numericCosts = displayedTools.map((tool) => tool.cost_min).filter((cost) => Number.isFinite(cost) && cost > 0);
  const minCost = numericCosts.length ? Math.min(...numericCosts) : null;
  const roi = ["C", "D"].includes(phase) ? calcROI(loss, minCost) : null;

  phaseLabel.textContent = message.name;
  solutionTitle.textContent = message.title;
  solutionSummary.textContent = message.summary;
  solutionWarning.hidden = !shouldWarn(budget, resource);
  toolCards.innerHTML = displayedTools.slice(0, 6).map(renderToolCard).join("");
  roiText.hidden = !roi;
  roiText.textContent = roi || "";
  subsidyBanner.hidden = !["C", "D"].includes(phase);
  renderRoadmap(phase);

  const results = document.querySelector("#solutionResults");
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
    adoptionTitle.textContent = "要整理：まず診断で現状を言語化しましょう";
    adoptionText.textContent = "導入理由や運用ルールが未整理です。外注前提ではなく、無料相談で「何を決めれば自社で進められるか」を整理しましょう。";
  }
}

solutionForm.addEventListener("change", renderRecommendations);
adoptionInputs.forEach((input) => input.addEventListener("change", renderAdoption));

renderRecommendations();
renderAdoption();
