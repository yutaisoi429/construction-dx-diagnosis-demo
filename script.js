const PAGE_VERSION = "2026-06-01-main-existing-files-refresh";
const solutionForm = document.querySelector("#solutionForm");
const recommendList = document.querySelector("#recommendList");
const solutionTitle = document.querySelector("#solutionTitle");
const solutionSummary = document.querySelector("#solutionSummary");
const solutionNotice = document.querySelector("#solutionNotice");
const adoptionInputs = document.querySelectorAll("[data-adoption]");
const adoptionScore = document.querySelector("#adoptionScore");
const adoptionBar = document.querySelector("#adoptionBar");
const adoptionTitle = document.querySelector("#adoptionTitle");
const adoptionText = document.querySelector("#adoptionText");

const toolCatalog = {
  base: [
    ["Excel / Googleスプレッドシート", "まずは損失額・案件・原価・日報を台帳化し、課題の大きさを見える化。"],
    ["ChatGPT / Gemini", "日報要約、議事録、見積文章、社内FAQなど、低コストな業務補助から開始。"],
  ],
  cost: ["アイピア / 建設大臣 / kintone + BI", "工事別予実、粗利、発注、請求、会計連携を整理。入力ルール設計が重要。"],
  communication: ["ANDPAD / KANNA / ダンドリワーク", "図面共有、チャット、タスク、日報を現場と協力会社で一元化。"],
  photo: ["Google Drive / 蔵衛門 / Photoruction", "写真だけならDrive運用、電子小黒板や台帳出力まで必要なら専用ツール。"],
  schedule: ["工程管理SaaS / ガント系ツール", "複数現場の進捗、遅延、担当者を見える化し、連絡漏れを減らす。"],
  report: ["Notion / kintone / AI日報", "日報・安全書類・報告書をテンプレート化し、AIで要約や改善点を抽出。"],
  estimate: ["見積・案件管理シート / kintone / AppSheet", "案件ステータス、見積履歴、受注確度、受発注を一元管理。"],
  attendance: ["ジョブカン / freee人事労務", "GPS打刻、直行直帰、残業時間、給与連携など管理系DXから改善。"],
  contract: ["クラウドサイン / freee / 弥生会計", "契約、請求、会計をペーパーレス化し、事務所側の手戻りを削減。"],
};

function getCheckedValues(name) {
  return [...document.querySelectorAll(`[name="${name}"]:checked`)].map((input) => input.value);
}

function getRadioValue(name) {
  return document.querySelector(`[name="${name}"]:checked`)?.value;
}

function renderRecommendations() {
  const issues = getCheckedValues("issues");
  const loss = getRadioValue("loss");
  const budget = getRadioValue("budget");
  const operator = getRadioValue("operator");
  const recommendations = [...toolCatalog.base];

  issues.forEach((issue) => recommendations.push(toolCatalog[issue]));

  if (issues.length === 0 || budget === "zero" || loss === "low") {
    solutionTitle.textContent = "まずは無料〜低コストの仕組みで十分な可能性があります";
    solutionSummary.textContent = "いきなりSaaSを導入するより、Excel / Googleスプレッドシート、Google Drive、AIで課題を切り分け、損失額を見える化しましょう。";
  } else if ((loss === "high" || loss === "enterprise") && (budget === "medium" || budget === "large")) {
    solutionTitle.textContent = "現場系・管理系ツールを分けてROIを試算しましょう";
    solutionSummary.textContent = "月間ロスが大きいため、施工管理・原価管理・勤怠・契約会計のどこに投資すべきかを比較し、導入前に回収見込みを設計する段階です。";
  } else {
    solutionTitle.textContent = "軽量ツールと一部SaaSを小さく試す段階です";
    solutionSummary.textContent = "自社運用できる範囲を確認しながら、kintone / AppSheet / 施工管理アプリなどを1〜2業務で検証するのがおすすめです。";
  }

  if (operator === "none") {
    recommendations.push(["要件整理・伴走支援", "外注ありきではなく、まず業務フロー・入力ルール・現場説明の設計を一緒に整理。"]);
    solutionNotice.textContent = "運用できる人がいないなら、ツール導入前に設計が必要です。無料相談で、社長や監督が片手間でも回る進め方を整理できます。";
  } else if (operator === "part") {
    solutionNotice.textContent = "兼任担当者でも回るように、入力ルール・例外対応・振り返り頻度を先に決めることが重要です。";
  } else {
    solutionNotice.textContent = "推進責任者がいるため、小さく検証してから全社展開するロードマップを作ると成果につながりやすいです。";
  }

  const uniqueRecommendations = recommendations.filter(
    (item, index, self) => item && index === self.findIndex((candidate) => candidate[0] === item[0]),
  );

  recommendList.innerHTML = uniqueRecommendations
    .map(([title, body]) => `<div class="recommend-item"><strong>${title}</strong><span>${body}</span></div>`)
    .join("");
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
