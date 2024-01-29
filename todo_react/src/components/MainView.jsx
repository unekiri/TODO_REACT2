import React from 'react';

export const MainView = ({ bkcolor, title, content, plan, children }) => {
  const BackStyle = {
    minWidth: "480px",
    minHeight: "200px",
    padding: "10px",
    margin: "10px",
    borderRadius: "8px",
    backgroundColor: bkcolor,
  };

  return (
    <div className="area" style={BackStyle}>
      <p className="title">{title}</p>
      <div className="headline">
        <span className="contents">{content}</span>
        <span className="plan">{plan}</span>
      </div>
      {children}
    </div>
  );
};