import { uri } from './ApiUrl'

// GETアクションのイベントハンドラ(指定したIDのデータのみを取得する)
export const getSelectItem = async (id) => {
  return await fetch(`${uri}/${id}`, {
    method: 'GET',
  })
  .catch(error => console.error('Unable to get items.', error));
}