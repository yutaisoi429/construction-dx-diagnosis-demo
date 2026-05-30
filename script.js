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
    ["Excel / Googleスプレッドシート", "課題や損失額がまだ曖昧な場合、まずは台帳化と集計から開始。"],
    ["ChatGPT / Gemini", "日報要約、議事録、見積文章、社内FAQなど低コストな業務補助に活用。"],
  ],
  cost: ["kintone + BIツール", "原価・粗利・案件別収支を入力し、経営判断に使えるダッシュボードへ。"],
  communication: ["ANDPAD / KANNA", "協力会社との連絡、図面共有、タスク管理を現場単位で一元化。"],
  photo: ["Google Drive / Photoruction", "写真管理だけならGoogle Drive、電子小黒板や台帳連携まで必要なら専用SaaS。"],
  schedule: ["工程管理SaaS / AppSheet", "工程表、遅延共有、現場タスクの更新を関係者で見える化。"],
  report: ["Notion / kintone / AI日報", "日報入力・承認・集計をテンプレート化し、AIで要約や改善点抽出。"],
  estimate: ["見積・案件管理シート / kintone", "案件ステータス、見積履歴、受注確度を一元管理。"],
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
    solutionTitle.textContent = "今は無料〜低コストの仕組みで十分な可能性があります";
    solutionSummary.textContent = "いきなりSaaSを導入するより、Excel / GoogleスプレッドシートやGoogle Driveで課題を切り分け、損失額を見える化しましょう。";
  } else if ((loss === "high" || loss === "enterprise") && (budget === "medium" || budget === "large")) {
    solutionTitle.textContent = "SaaS・BI・外部伴走を含めてROIを試算しましょう";
    solutionSummary.textContent = "月間ロスが大きいため、原価・工程・写真・連絡のどこに投資すべきかを比較し、導入前に回収見込みを設計する段階です。";
  } else {
    solutionTitle.textContent = "軽量ツールと一部SaaSを比較する段階です";
    solutionSummary.textContent = "自社運用できる範囲を確認しながら、kintone / Notion / AppSheetや建設SaaSを小さく検証するのがおすすめです。";
  }

  if (operator === "none") {
    recommendations.push(["外部伴走支援", "運用担当がいない場合は、ツール選定前に業務設計・ルール化・現場説明を外部と進めると安全。"]);
    solutionNotice.textContent = "運用できる人がいないなら、ツール導入前に設計が必要です。無料相談で現場に合う進め方を整理できます。";
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
  adoptionScore.textContent = total;
  adoptionBar.style.width = `${Math.round((total / 12) * 100)}%`;

  if (total >= 9) {
    adoptionTitle.textContent = "自社で進められそうです";
    adoptionText.textContent = "導入目的と運用体制が整っています。小さな現場で検証し、効果測定をしながら横展開しましょう。";
  } else if (total >= 5) {
    adoptionTitle.textContent = "伴走支援があった方がよい状態です";
    adoptionText.textContent = "一部は整理されていますが、運用ルールや浸透計画に抜けがありそうです。外部の壁打ちで失敗リスクを下げられます。";
  } else {
    adoptionTitle.textContent = "外注した方がよい状態です";
    adoptionText.textContent = "導入理由や運用ルールが未整理です。ツール選定前に、課題整理・業務フロー設計・現場説明資料の作成から始めましょう。";
  }
}

solutionForm.addEventListener("change", renderRecommendations);
adoptionInputs.forEach((input) => input.addEventListener("change", renderAdoption));

renderRecommendations();
renderAdoption();
