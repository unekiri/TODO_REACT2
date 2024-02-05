import React from "react";

export const TextWithBreaks= ({text}) => {
    // テキストを50文字ごとに分割
    const splitText = text.match(/.{1,50}/g) || []; // text文字列が50文字以下の場合はその文字列全体が1要素としての配列を返し、50文字より長い場合は50文字ごとに分割された複数の要素を持つ配列を返す
  
    return (
      <> 
        {splitText.map((part, index) => (
          <React.Fragment key={index}>
            {part}{index < splitText.length - 1 && <br />}
          </React.Fragment>
        ))}
      </>
    ); // 現在の要素が配列の最後の要素ではない場合に限り、<br />（改行）をレンダリングする
  }
  