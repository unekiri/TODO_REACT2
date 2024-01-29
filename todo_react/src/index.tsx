// Reactアプリケーションのエントリーポイント
// webpackのプラグインがBABELのプリセットを使ってコンパイルを行い、JSXやTypeScriptをJSに変換する

import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const rootElement = document.getElementById("root") || document.createElement("div");
if (!rootElement.id) {
  rootElement.id = "root";
}
createRoot(rootElement).render(<App />);