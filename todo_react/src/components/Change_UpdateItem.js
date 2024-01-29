import { getSelectItem } from './GetSelectItem';
import { uri } from './ApiUrl'

// UPDATE(変更)メソッドのイベントハンドラ(続き)
export const change_updateItem = (bool) => {
  const changeDate = document.getElementById('date');
  const changeUTCDate = new Date(changeDate.value);

  // URLパラメーターからデータを取得
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  
  async function fetchDataByID(id) {
    const data =  await getSelectItem(id);
    const httpData = await data.json();
    const c_item = {
      id: id,
      name: httpData.name,
      isComplete: !JSON.parse(bool), // isCompleteの真偽値をトグルさせる
      date: changeUTCDate.toISOString() // ISO形式の文字列に変換(サーバー側で再度Dateオブジェクトに変換できる)
    }

    fetch(`${uri}/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(c_item)
    })
      .then(() => {
        // 完了, 未完了ページへのリダイレクト
        if (JSON.parse(bool)) {
          window.location.href = '/incomplete';
        } else {
          window.location.href = '/complete';
        }
      })
      .catch(error => console.error('Unable to update item.', error));
  }
  fetchDataByID(id);
}