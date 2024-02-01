// Reactアプリケーションのエントリーポイント
// webpackのプラグインがBABELのプリセットを使ってコンパイルを行い、JSXやTypeScriptをJSに変換する

import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const rootElement = document.getElementById("root") || document.createElement("div"); //HTML内のIDが "root" の要素を取得、または作成
if (!rootElement.id) {
  rootElement.id = "root";
}
createRoot(rootElement).render(<App />); //createRoot関数を使って、Reactのルートインスタンスを作成(インスタンスは、Reactのコンポーネントツリーを管理し、それをDOMにレンダリングするためのもの) + renderメソッドを用いてAppコンポーネント（アプリケーションのメインコンポーネント）をDOMにレンダリング(この過程では、Reactはコンポーネントツリーを走査し、それに応じてDOMを更新)