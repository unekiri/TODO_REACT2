import React from "react";

export const TextWithBreaks= ({text}) => {
    // テキストを50文字ごとに分割
    const splitText = text.match(/.{1,50}/g) || [];
  
    return (
      <>
        {splitText.map((part, index) => (
          <React.Fragment key={index}>
            {part}{index < splitText.length - 1 && <br />}
          </React.Fragment>
        ))}
      </>
    );
  }
  