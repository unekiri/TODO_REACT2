import { uri } from './ApiUrl'

// POSTアクションのイベントハンドラ
export const addItem = () => {
  const addNameTextbox = document.getElementById('name');
  const addDate = document.getElementById('date');

  // Dateオブジェクトを生成し、そのDateオブジェクトをUTCに変更する
  const UTCDate = new Date(addDate.value);
  
  const item = {
    name: addNameTextbox.value,
    isComplete: false,
    date: UTCDate.toISOString()
  };

  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    // JSON文字列への変換
    body: JSON.stringify(item)
  })
    .then(() => {
      // HOMEへのリダイレクト
      window.location.href = '/';
    })
    .catch(error => console.error('Unable to add item.', error));
}