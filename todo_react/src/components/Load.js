import { getSelectItem } from './GetSelectItem';

// 編集・変更ページにおいて、呼び出される関数(指定したIDのデータのみを取得する)
export const Load = async (callback) => {
    // URLパラメーターからデータを取得
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const data = await getSelectItem(id);
    const httpData = await data.json();
    callback(httpData);
}
