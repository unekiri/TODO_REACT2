import { uri } from './ApiUrl'

// UPDATE(編集)アクションのイベントハンドラ(続き)
export const edit_updateItem = (bool) => {
  const editNameTextbox = document.getElementById('name');
  const editDate = document.getElementById('date');

  const editUTCDate = new Date(editDate.value);

  // URLパラメーターからデータを取得
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const e_item = {
    id: id,
    isComplete: JSON.parse(bool), // 文字列を解析し、それを対応するデータ型に変換する
    name: editNameTextbox.value,
    date: editUTCDate.toISOString() // ISO形式の文字列に変換(サーバー側で再度Dateオブジェクトに変換できる)
  };

  fetch(`${uri}/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(e_item)
  })
    .then(() => {
      if (JSON.parse(bool)) {
        window.location.href = '/complete';
      } else {
        window.location.href = '/incomplete';
      }
    })
    .catch(error => console.error('Unable to add item', error));
}