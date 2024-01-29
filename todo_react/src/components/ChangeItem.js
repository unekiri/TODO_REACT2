// UPDATE(変更)メソッドのイベントハンドラ
export const changeItem = (id, todos) => {
  // 該当アイテムを取得
  const change_item = todos.find(item => item.id === id);

  // URLパラメーターにデータを埋め込む
  const queryString = `?id=${change_item.id}`;

  // 変更フォームへのリダイレクト
  if (change_item.isComplete) {
    window.location.href = '/complete_change' + queryString;
  } else {
    window.location.href = '/incomplete_change' + queryString;
  }
}