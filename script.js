const marketData = {
  forex: {
    label: "FOREX",
    feedStatus: "Live data unavailable",
    session: "Awaiting feed",
    trend: "Waiting",
    signal: "N/A",
    trendAnalysis:
      "No market signal available. Connect a legitimate market data API to begin generating live trend analysis.",
    rsi: "N/A",
    rsiMeta: "Waiting for market data",
    macd: "N/A",
    macdMeta: "Waiting for market data",
    statuses: {
      up: { title: "UP", caption: "Standby" },
      down: { title: "DOWN", caption: "Standby" },
      wait: { title: "WAIT", caption: "Default" },
    }
  },
  crypto: {
    label: "CRYPTO",
    feedStatus: "Live data unavailable",
    session: "Awaiting feed",
    trend: "Waiting",
    signal: "N/A",
    trendAnalysis:
      "No market signal available. Connect a legitimate market data API to begin generating live trend analysis.",
    rsi: "N/A",
    rsiMeta: "Waiting for market data",
    macd: "N/A",
    macdMeta: "Waiting for market data",
    statuses: {
      up: { title: "UP", caption: "Standby" },
      down: { title: "DOWN", caption: "Standby" },
      wait: { title: "WAIT", caption: "Default" },
    }
  },
  gold: {
    label: "GOLD",
    feedStatus: "Live data unavailable",
    session: "Awaiting feed",
    trend: "Waiting",
    signal: "N/A",
    trendAnalysis:
      "No market signal available. Connect a legitimate market data API to begin generating live trend analysis.",
    rsi: "N/A",
    rsiMeta: "Waiting for market data",
    macd: "N/A",
    macdMeta: "Waiting for market data",
    statuses: {
      up: { title: "UP", caption: "Standby" },
      down: { title: "DOWN", caption: "Standby" },
      wait: { title: "WAIT", caption: "Default" },
    }
  }
};

const marketButtons = document.querySelectorAll(".market-option");
const feedStatusText = document.getElementById("feedStatusText");
const marketLabel = document.getElementById("marketLabel");
const sessionLabel = document.getElementById("sessionLabel");
const trendLabel = document.getElementById("trendLabel");
const signalLabel = document.getElementById("signalLabel");
const trendAnalysis = document.getElementById("trendAnalysis");

const rsiValue = document.getElementById("rsiValue");
const rsiMeta = document.getElementById("rsiMeta");
const macdValue = document.getElementById("macdValue");
const macdMeta = document.getElementById("macdMeta");

const statusCards = {
  up: document.getElementById("statusUp"),
  down: document.getElementById("statusDown"),
  wait: document.getElementById("statusWait"),
};

function renderChartPlaceholder() {
  const chart = document.getElementById("chartCandles");
  chart.innerHTML = "";

  const candleData = [
    { x: 15, y: 150, h: 38, w: 10, up: true },
    { x: 65, y: 125, h: 54, w: 10, up: false },
    { x: 110, y: 145, h: 32, w: 10, up: true },
    { x: 160, y: 120, h: 60, w: 10, up: false },
    { x: 205, y: 98, h: 82, w: 10, up: true },
    { x: 255, y: 138, h: 42, w: 10, up: false },
    { x: 305, y: 88, h: 92, w: 10, up: true },
    { x: 355, y: 115, h: 68, w: 10, up: false },
    { x: 405, y: 105, h: 78, w: 10, up: true },
    { x: 455, y: 132, h: 46, w: 10, up: false },
    { x: 505, y: 95, h: 88, w: 10, up: true },
    { x: 555, y: 110, h: 72, w: 10, up: false },
    { x: 605, y: 120, h: 61, w: 10, up: true },
    { x: 655, y: 140, h: 38, w: 10, up: false },
    { x: 710, y: 130, h: 50, w: 10, up: true }
  ];

  candleData.forEach((item) => {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", item.x);
    rect.setAttribute("y", Math.min(item.y, item.y + item.h));
    rect.setAttribute("width", item.w);
    rect.setAttribute("height", Math.max(18, Math.abs(item.h)));
    rect.setAttribute("rx", 3);
    rect.setAttribute("class", "chart-candle");
    rect.setAttribute("fill", item.up ? "rgba(41, 209, 125, 0.34)" : "rgba(255, 94, 127, 0.34)");
    rect.setAttribute("stroke", item.up ? "rgba(80, 232, 160, 0.9)" : "rgba(255, 140, 170, 0.9)");
    chart.appendChild(rect);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", item.x + item.w / 2);
    line.setAttribute("y1", item.y);
    line.setAttribute("x2", item.x + item.w / 2);
    line.setAttribute("y2", item.y + item.h);
    line.setAttribute("stroke", item.up ? "rgba(80, 232, 160, 0.9)" : "rgba(255, 140, 170, 0.9)");
    line.setAttribute("stroke-width", "2");
    chart.appendChild(line);
  });
}

function setStatusState(activeKey) {
  Object.entries(statusCards).forEach(([key, element]) => {
    element.classList.toggle("active", key === activeKey);
  });
}

function switchMarket(marketKey) {
  const data = marketData[marketKey];
  if (!data) return;

  marketLabel.textContent = data.label;
  sessionLabel.textContent = data.session;
  trendLabel.textContent = data.trend;
  signalLabel.textContent = data.signal;
  feedStatusText.textContent = data.feedStatus;
  trendAnalysis.textContent = data.trendAnalysis;
  rsiValue.textContent = data.rsi;
  rsiMeta.textContent = data.rsiMeta;
  macdValue.textContent = data.macd;
  macdMeta.textContent = data.macdMeta;

  setStatusState("wait");
}

marketButtons.forEach((button) => {
  button.addEventListener("click", () => {
    marketButtons.forEach((item) => item.classList.toggle("active", item === button));
    switchMarket(button.dataset.market);
  });
});

renderChartPlaceholder();
switchMarket("forex");