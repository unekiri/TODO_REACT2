// UPDATE(編集)アクションのイベントハンドラ
export const editItem = (id, todos) => {
  // 該当アイテムを取得
  const edit_item = todos.find(item => item.id === id);

  // URLパラメーターにデータを埋め込む
  const queryString = `?id=${edit_item.id}`;

  // 編集フォームへのリダイレクト
  if (edit_item.isComplete) {
    window.location.href = '/complete_edit' + queryString;
  } else {
    window.location.href = '/incomplete_edit' + queryString;
  }
}