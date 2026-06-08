const PAGE_VERSION = "2026-06-03-checkbox-solution-refresh";

const solutionForm = document.querySelector("#solutionForm");
const phaseLabel = document.querySelector("#phaseLabel");
const solutionTitle = document.querySelector("#solutionTitle");
const solutionSummary = document.querySelector("#solutionSummary");
const toolCards = document.querySelector("#toolCards");
const roadmapList = document.querySelector("#roadmapList");
const subsidyBanner = document.querySelector("#subsidyBanner");
const workflowInput = document.querySelector("#workflowInput");
const workflowChart = document.querySelector("#workflowChart");
const workflowSummary = document.querySelector("#workflowSummary");
const issueInsights = document.querySelector("#issueInsights");
const sampleWorkflowButton = document.querySelector("#sampleWorkflowButton");

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


const SAMPLE_WORKFLOW = `社長が電話で新規依頼を受ける：10分
社長が現場監督へLINEで現地調査を依頼：5分
現場監督が現地調査をして写真を撮る：90分
事務が見積内容をExcelへ転記する：40分
社長が金額を確認し、差し戻しが発生する：30分
事務が見積書を修正する：25分
お客様へ見積提出：15分`;

const RISK_KEYWORDS = ["待ち", "確認", "差し戻し", "戻し", "転記", "電話", "紙", "探", "遅", "漏", "不明", "属人", "二重", "手入力"];
const ACTOR_PATTERN = /(社長|現場監督|監督|事務|経理|営業|職人|協力会社|お客様|顧客|担当者|管理者|責任者)/;

function escapeHtml(value) {
  return value.replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);
}

function parseWorkflowLine(line, index) {
  const timeMatch = line.match(/(\d+(?:\.\d+)?)\s*(分|時間|日)/);
  const actorMatch = line.match(ACTOR_PATTERN);
  const minutes = timeMatch
    ? Number(timeMatch[1]) * (timeMatch[2] === "時間" ? 60 : timeMatch[2] === "日" ? 480 : 1)
    : 0;
  const actor = actorMatch ? actorMatch[1] : "担当未記入";
  const task = line
    .replace(actor, "")
    .replace(/^[がはをにへ、\s]+/, "")
    .replace(/[:：]?\s*\d+(?:\.\d+)?\s*(分|時間|日).*/, "")
    .trim() || `業務${index + 1}`;
  const risks = RISK_KEYWORDS.filter((keyword) => line.includes(keyword));

  return { actor, task, minutes, risks, raw: line };
}

function formatMinutes(minutes) {
  if (!minutes) return "時間未記入";
  if (minutes >= 60) return `${Math.round((minutes / 60) * 10) / 10}時間`;
  return `${minutes}分`;
}

function renderWorkflow() {
  const lines = workflowInput.value
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    workflowSummary.textContent = "未入力";
    workflowChart.innerHTML = `<div class="workflow-empty">左の入力欄に業務の流れを書くと、ここにフローチャートを表示します。</div>`;
    issueInsights.innerHTML = "";
    return;
  }

  const steps = lines.slice(0, 10).map(parseWorkflowLine);
  const totalMinutes = steps.reduce((sum, step) => sum + step.minutes, 0);
  const riskSteps = steps.filter((step) => step.risks.length > 0 || step.minutes >= 60);

  workflowSummary.textContent = `${steps.length}工程 / ${formatMinutes(totalMinutes)}を可視化`;
  workflowChart.innerHTML = steps.map((step, index) => {
    const isRisk = step.risks.length > 0 || step.minutes >= 60;
    return `<div class="flow-node ${isRisk ? "has-risk" : ""}">
      <span class="node-index">${String(index + 1).padStart(2, "0")}</span>
      <strong>${escapeHtml(step.task)}</strong>
      <dl><div><dt>担当</dt><dd>${escapeHtml(step.actor)}</dd></div><div><dt>時間</dt><dd>${formatMinutes(step.minutes)}</dd></div></dl>
      ${isRisk ? `<p class="risk-label">課題候補：${step.risks.length ? escapeHtml(step.risks.join("・")) : "時間が長い"}</p>` : ""}
    </div>`;
  }).join("<span class=\"flow-arrow\">→</span>");

  issueInsights.innerHTML = `<h3>課題候補</h3><ul>${riskSteps.length ? riskSteps.map((step) => `<li><strong>${escapeHtml(step.actor)}</strong>の「${escapeHtml(step.task)}」は、${step.risks.length ? `「${escapeHtml(step.risks.join("・"))}」が含まれます` : "時間が長くなっています"}。入力ルール・担当範囲・自動化余地を確認しましょう。</li>`).join("") : "<li>大きな詰まり候補はまだ見つかっていません。時間や差し戻し内容を追記すると精度が上がります。</li>"}</ul>`;
}

solutionForm.addEventListener("change", renderRecommendations);
workflowInput.addEventListener("input", renderWorkflow);
sampleWorkflowButton.addEventListener("click", () => {
  workflowInput.value = SAMPLE_WORKFLOW;
  renderWorkflow();
});

renderRecommendations();
renderWorkflow();
