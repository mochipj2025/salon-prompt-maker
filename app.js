const options = {
  useCase: [
    ["noteHeader", "note見出し画像"],
    ["instagramPost", "Instagram投稿"],
    ["reelCover", "Instagramリール表紙"],
    ["story", "ストーリーズ"],
    ["lpHero", "LPファーストビュー"],
    ["salonPop", "サロンPOP"],
    ["diagram", "図解"],
    ["comparison", "比較画像"],
  ],
  mood: [
    ["quiet night", "静かな夜"],
    ["gentle morning", "やさしい朝"],
    ["quiet luxury", "高級感"],
    ["nostalgic", "ノスタルジー"],
    ["deep-sea clinical", "深海×臨床"],
    ["film texture", "フィルム感"],
    ["minimal with negative space", "余白のあるミニマル"],
    ["comforting salon mood", "ほっとするサロン感"],
  ],
  scene: [
    ["relaxation salon", "リラクゼーションサロン"],
    ["body care salon", "整体・ボディケア"],
    ["beauty salon", "美容サロン"],
    ["small private shop", "個人店"],
    ["quiet cafe bar", "カフェ・バー"],
    ["note article", "note記事"],
    ["social media post", "SNS発信"],
  ],
  subject: [
    ["no people", "人物なし"],
    ["hands only", "手元だけ"],
    ["back view only", "後ろ姿"],
    ["woman in her 20s to 40s", "20〜40代女性"],
    ["salon staff", "サロンスタッフ"],
    ["customer", "お客様"],
    ["user mascot or character", "固定キャラ"],
  ],
};

const useCaseDetails = {
  noteHeader: {
    purpose: "note header image",
    aspectRatio: "16:9",
    formatHint: "horizontal composition, quiet title space",
  },
  instagramPost: {
    purpose: "Instagram post",
    aspectRatio: "4:5",
    formatHint: "vertical composition, one message per image",
  },
  reelCover: {
    purpose: "Instagram reel cover",
    aspectRatio: "9:16",
    formatHint: "vertical cover with readable center typography",
  },
  story: {
    purpose: "Instagram story",
    aspectRatio: "9:16",
    formatHint: "vertical story with generous top and bottom margins",
  },
  lpHero: {
    purpose: "landing page first view",
    aspectRatio: "16:9",
    formatHint: "wide hero image with clean visual focus",
  },
  salonPop: {
    purpose: "salon pop sign",
    aspectRatio: "4:5",
    formatHint: "print-friendly vertical design with calm hierarchy",
  },
  diagram: {
    purpose: "simple explanatory diagram",
    aspectRatio: "4:5",
    formatHint: "clean editorial diagram, not crowded",
  },
  comparison: {
    purpose: "comparison image",
    aspectRatio: "4:5",
    formatHint: "subtle two-column comparison without before-after claims",
  },
};

const safeSuggestions = [
  "身体がふっと軽く感じる時間",
  "張りつめた気持ちをゆるめる",
  "今日の疲れをそっと置いていく",
  "呼吸が深まるような静かな時間",
  "自分を休ませるひととき",
  "忙しい毎日に、静かな休息を",
  "気分を切り替えたい日に",
];

const ngRules = [
  ["根本改善", "自分を整えるひととき"],
  ["肩こり解消", "肩まわりをゆるめたい方へ"],
  ["肩こり改善", "肩まわりをゆるめたい方へ"],
  ["腰痛改善", "身体を休ませたい日に"],
  ["小顔矯正", "すっきりした印象をめざすケア"],
  ["骨盤矯正", "姿勢を意識したリラックスケア"],
  ["痛みが消える", "張りつめた感覚をそっとゆるめる"],
  ["効果抜群", "すっきりした感覚を味わいたい方へ"],
  ["効果保証", "心地よさを大切にした時間"],
  ["必ず変わる", "気分を切り替えたい日に"],
  ["必ず", "ゆっくり"],
  ["痩せる", "軽やかな気分へ"],
  ["治療", "ケア"],
  ["治す", "やさしく整える"],
  ["治る", "落ち着いていく"],
  ["改善", "整える"],
  ["矯正", "ケア"],
  ["診断", "ご相談"],
];

const defaultState = {
  useCase: "instagramPost",
  mood: ["quiet night", "deep-sea clinical"],
  scene: "relaxation salon",
  subject: "no people",
  brandName: "",
  brandStyle: "",
  includeCharacter: false,
  useStorePhoto: false,
  characterNote: "",
  detailMode: "simple",
  copyText: "",
  detailPurpose: "menu",
  detailTitle: "",
  detailDate: "",
  detailPlace: "",
  detailPrice: "",
  detailCta: "",
  detailNote: "",
};

let state = loadState();

const els = {
  form: document.querySelector("#promptForm"),
  scene: document.querySelector("#scene"),
  subject: document.querySelector("#subject"),
  brandName: document.querySelector("#brandName"),
  brandStyle: document.querySelector("#brandStyle"),
  includeCharacter: document.querySelector("#includeCharacter"),
  useStorePhoto: document.querySelector("#useStorePhoto"),
  storePhotoNote: document.querySelector("#storePhotoNote"),
  characterNote: document.querySelector("#characterNote"),
  copyText: document.querySelector("#copyText"),
  detailPurpose: document.querySelector("#detailPurpose"),
  detailTitle: document.querySelector("#detailTitle"),
  detailDate: document.querySelector("#detailDate"),
  detailPlace: document.querySelector("#detailPlace"),
  detailPrice: document.querySelector("#detailPrice"),
  detailCta: document.querySelector("#detailCta"),
  detailNote: document.querySelector("#detailNote"),
  promptOutput: document.querySelector("#promptOutput"),
  summaryOutput: document.querySelector("#summaryOutput"),
  noteOutput: document.querySelector("#noteOutput"),
  warningCard: document.querySelector("#warningCard"),
  warningList: document.querySelector("#warningList"),
  statusText: document.querySelector("#statusText"),
  generateButton: document.querySelector("#generateButton"),
  mochiAdvice: document.querySelector("#mochiAdvice p"),
  floatingAdvice: document.querySelector("#floatingAdvice"),
  floatingMochi: document.querySelector("#floatingMochi"),
};

function loadState() {
  try {
    return normalizeState({ ...defaultState, ...JSON.parse(localStorage.getItem("mochiPromptState")) });
  } catch {
    return { ...defaultState };
  }
}

function normalizeState(nextState) {
  const validSubject = options.subject.some(([value]) => value === nextState.subject);
  return {
    ...nextState,
    includeCharacter: Boolean(nextState.includeCharacter),
    useStorePhoto: Boolean(nextState.useStorePhoto),
    subject: validSubject ? nextState.subject : defaultState.subject,
  };
}

function saveState() {
  localStorage.setItem("mochiPromptState", JSON.stringify(state));
}

function labelOf(group, value) {
  const item = options[group]?.find(([id]) => id === value);
  return item ? item[1] : value;
}

function fillSelect(select, group) {
  select.innerHTML = options[group]
    .map(([value, label]) => `<option value="${value}">${label}</option>`)
    .join("");
}

function renderOptionGroup(groupName) {
  const group = document.querySelector(`[data-group="${groupName}"]`);
  group.innerHTML = options[groupName]
    .map(([value, label]) => `<button type="button" data-value="${value}">${label}</button>`)
    .join("");
}

function getInputTexts() {
  return [
    state.copyText,
    state.brandName,
    state.brandStyle,
    state.includeCharacter ? state.characterNote : "",
    state.detailTitle,
    state.detailDate,
    state.detailPlace,
    state.detailPrice,
    state.detailCta,
    state.detailNote,
  ].filter(Boolean);
}

function inspectSafety() {
  const found = [];
  const cleaned = {};

  getInputTexts().forEach((text) => {
    let safeText = text;
    ngRules.forEach(([ng, ok]) => {
      if (safeText.includes(ng)) {
        found.push({ ng, ok });
        safeText = safeText.split(ng).join(ok);
      }
    });
    cleaned[text] = safeText;
  });

  return { found, cleaned };
}

function safeValue(value, safety) {
  return safety.cleaned[value] || value || "";
}

function buildPrompt() {
  const safety = inspectSafety();
  const useCase = useCaseDetails[state.useCase];
  const moodLabels = state.mood.map((value) => labelOf("mood", value)).join(", ");
  const moodWords = state.mood.join(", ");
  const scene = labelOf("scene", state.scene);
  const subject = labelOf("subject", state.subject);
  const copy = safeValue(state.copyText, safety);
  const brandName = safeValue(state.brandName, safety);
  const brandStyle = safeValue(state.brandStyle, safety);
  const characterNote = state.includeCharacter ? safeValue(state.characterNote, safety) : "";

  const brandLines = [
    "",
    "User brand direction:",
    brandName ? `- Brand or shop name: ${brandName}` : "- Brand or shop name: not specified",
    brandStyle ? `- Preferred brand mood, colors, or materials: ${brandStyle}` : "- Use a calm, warm, trustworthy palette that can fit many small businesses",
    characterNote && `- Mascot or fixed character to include: ${characterNote}`,
    state.includeCharacter && !characterNote && "- Include the user's fixed character or mascot if reference material is provided",
  ].filter(Boolean);

  const storeReferenceLines = state.useStorePhoto
    ? [
        "",
        "Real store reference:",
        "- Use the attached real store photo as the visual reference for the background, interior mood, lighting, materials, and spatial atmosphere.",
        "- Keep the store recognizable in mood and layout, but make the final image clean, calm, and suitable for promotional use.",
        "- Do not invent a completely different shop interior when a store reference image is attached.",
      ]
    : [];

  const baseLines = [
    `Create a high-quality image for ${useCase.purpose}.`,
    `Aspect ratio: ${useCase.aspectRatio}.`,
    `Theme: ${moodWords}.`,
    `Scene: ${state.scene}.`,
    `Main subject: ${state.subject}.`,
  ];

  const information =
    state.detailMode === "detail"
      ? [
          "",
          "Main purpose:",
          labelOfDetailPurpose(state.detailPurpose),
          "",
          "Information to include:",
          `- Title: ${safeValue(state.detailTitle, safety) || "short calm Japanese title"}`,
          state.detailDate && `- Date: ${safeValue(state.detailDate, safety)}`,
          state.detailPlace && `- Place: ${safeValue(state.detailPlace, safety)}`,
          state.detailPrice && `- Price: ${safeValue(state.detailPrice, safety)}`,
          state.detailCta && `- CTA: ${safeValue(state.detailCta, safety)}`,
          state.detailNote && `- Note: ${safeValue(state.detailNote, safety)}`,
        ].filter(Boolean)
      : copy
        ? [`Text to include in Japanese: "${copy}".`]
        : [
            "Create one short Japanese copy line that matches the selected mood.",
            "The copy should feel calm, sensory, legally safe, and suitable for a relaxation salon.",
            "Keep it poetic but easy to read, with no medical claims or guaranteed effects.",
          ];

  const prompt = [
    ...baseLines,
    ...information,
    "",
    "Design direction:",
    "- clean Japanese editorial design",
    "- readable Japanese typography",
    "- lots of negative space",
    "- warm and calm atmosphere",
    "- not a loud advertisement",
    "- suitable for relaxation salon marketing",
    "- adaptable to the user's own shop, salon, or personal brand",
    "- legally safe wording",
    "- no medical claims",
    "- no guaranteed effects",
    "- no treatment, cure, correction, diagnosis, improvement, or pain-relief claims",
    `- ${useCase.formatHint}`,
    ...brandLines,
    ...storeReferenceLines,
    "",
    "Important:",
    "Avoid exaggerated medical claims.",
    "Avoid before-after style.",
    "Avoid aggressive sales design.",
    "Prioritize atmosphere, trust, quiet emotion, and readable spacing.",
  ].join("\n");

  const summary = [
    `用途: ${labelOf("useCase", state.useCase)}`,
    `比率: ${useCase.aspectRatio}`,
    `空気感: ${moodLabels}`,
    `場面: ${scene}`,
    `人物: ${subject}`,
    `ブランド: ${brandName || "指定なし"}`,
    `固定キャラ: ${state.includeCharacter ? characterNote || "参照素材があれば使用" : "未使用"}`,
    `実店舗背景: ${state.useStorePhoto ? "店舗写真を参照" : "未使用"}`,
    state.detailMode === "detail"
      ? `詳細: ${safeValue(state.detailTitle, safety) || "タイトル未入力"}`
      : `コピー: ${copy || "雰囲気に合わせてAIが短く提案"}`,
  ].join("\n");

  const note = [
    "医療効果・治療・改善・矯正・保証の断定表現は避けています。",
    "詳細モードでは、画像内文字はメインコピー、名称、日時/価格、CTAまでを優先してください。",
    "注意事項は画像内に詰めず、本文・キャプション・LP側で補足するのがおすすめです。",
  ].join("\n");

  return { prompt, summary, note, safety };
}

function labelOfDetailPurpose(value) {
  return {
    event: "Event announcement",
    menu: "Menu introduction",
    campaign: "Campaign announcement",
  }[value];
}

function renderWarnings(safety) {
  const unique = [...new Map(safety.found.map((item) => [item.ng, item])).values()];
  els.warningCard.classList.toggle("has-warning", unique.length > 0);
  els.warningList.innerHTML = unique.length
    ? unique
        .map((item) => `<p><strong>${item.ng}</strong><span>→ ${item.ok}</span></p>`)
        .join("")
    : "<p>NG表現は見つかりませんでした。静かに使えます。</p>";
}

function renderOutputs() {
  const result = buildPrompt();
  els.promptOutput.value = result.prompt;
  els.summaryOutput.value = result.summary;
  els.noteOutput.value = result.note;
  renderWarnings(result.safety);

  const hasWarning = result.safety.found.length > 0;
  els.statusText.textContent = hasWarning ? "安全表現に整えました" : "準備できています";
  els.mochiAdvice.textContent = getMochiAdvice(hasWarning);
  els.floatingAdvice.textContent = hasWarning
    ? "表現をやさしく調整したよ。"
    : state.useStorePhoto
      ? "店舗写真も添付してね。"
      : "もちスラ待機中。";
  els.floatingMochi.classList.toggle("is-worried", hasWarning);
}

function getMochiAdvice(hasWarning) {
  if (hasWarning) {
    return `少し強い言葉があったから、「${safeSuggestions[0]}」みたいな感覚の言葉に寄せたよ。`;
  }

  if (state.useStorePhoto) {
    return "実店舗の背景を反映するなら、生成前に店舗写真をチャッピーへ一緒に添付してね。写真の空気感を背景に使うようPromptへ入れてあるよ。";
  }

  return "言葉は少なめで大丈夫。余白が、ちゃんと働いてくれるよ。";
}

function renderState() {
  document.querySelectorAll("[data-group]").forEach((group) => {
    const name = group.dataset.group;
    group.querySelectorAll("button").forEach((button) => {
      const selected = Array.isArray(state[name])
        ? state[name].includes(button.dataset.value)
        : state[name] === button.dataset.value;
      button.classList.toggle("is-active", selected);
    });
  });

  els.scene.value = state.scene;
  els.subject.value = state.subject;
  els.brandName.value = state.brandName;
  els.brandStyle.value = state.brandStyle;
  els.includeCharacter.checked = state.includeCharacter;
  els.useStorePhoto.checked = state.useStorePhoto;
  els.storePhotoNote.classList.toggle("is-visible", state.useStorePhoto);
  els.characterNote.value = state.characterNote;
  document.querySelector(".character-field").classList.toggle("is-hidden", !state.includeCharacter);
  els.copyText.value = state.copyText;
  els.detailPurpose.value = state.detailPurpose;
  els.detailTitle.value = state.detailTitle;
  els.detailDate.value = state.detailDate;
  els.detailPlace.value = state.detailPlace;
  els.detailPrice.value = state.detailPrice;
  els.detailCta.value = state.detailCta;
  els.detailNote.value = state.detailNote;

  document.body.dataset.mode = state.detailMode;
  document.querySelectorAll("[data-detail-mode]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.detailMode === state.detailMode);
  });

  renderOutputs();
  saveState();
}

function fallbackCopy(text) {
  const copyArea = document.createElement("textarea");
  copyArea.value = text;
  copyArea.setAttribute("readonly", "");
  copyArea.style.position = "fixed";
  copyArea.style.opacity = "0";
  document.body.append(copyArea);
  copyArea.select();
  document.execCommand("copy");
  copyArea.remove();
}

async function copyText(text, button) {
  try {
    if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
    await navigator.clipboard.writeText(text);
  } catch {
    fallbackCopy(text);
  }
  const original = button.textContent;
  button.textContent = "コピーしました";
  window.setTimeout(() => {
    button.textContent = original;
  }, 1200);
}

function init() {
  renderOptionGroup("useCase");
  renderOptionGroup("mood");
  fillSelect(els.scene, "scene");
  fillSelect(els.subject, "subject");

  document.querySelectorAll("[data-group]").forEach((group) => {
    group.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      const name = group.dataset.group;
      const value = button.dataset.value;

      if (group.dataset.mode === "single") {
        state[name] = value;
      } else {
        const selected = new Set(state[name]);
        selected.has(value) ? selected.delete(value) : selected.add(value);
        state[name] = [...selected].slice(-3);
        if (state[name].length === 0) state[name] = [defaultState.mood[0]];
      }
      renderState();
    });
  });

  document.querySelectorAll("[data-detail-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.detailMode = button.dataset.detailMode;
      renderState();
    });
  });

  ["scene", "subject", "brandName", "brandStyle", "characterNote", "copyText", "detailPurpose", "detailTitle", "detailDate", "detailPlace", "detailPrice", "detailCta", "detailNote"].forEach((key) => {
    els[key].addEventListener("input", () => {
      state[key] = els[key].value;
      renderState();
    });
    els[key].addEventListener("change", () => {
      state[key] = els[key].value;
      renderState();
    });
  });

  els.includeCharacter.addEventListener("change", () => {
    state.includeCharacter = els.includeCharacter.checked;
    renderState();
  });

  els.useStorePhoto.addEventListener("change", () => {
    state.useStorePhoto = els.useStorePhoto.checked;
    renderState();
  });

  els.generateButton.addEventListener("click", renderOutputs);
  document.querySelectorAll("[data-copy-target]").forEach((button) => {
    button.addEventListener("click", () => copyText(document.querySelector(`#${button.dataset.copyTarget}`).value, button));
  });
  els.form.addEventListener("submit", (event) => event.preventDefault());

  renderState();
}

init();
