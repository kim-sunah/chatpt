import React from "react";
import "./Admin.css"

export const Header = () => {
  return (
    <div className="header">
      <div className="div-container">
        <div className="div-flex">
          <div className="div-relative">
            <div className="overlap-group">
              <div className="input-search">
                <div className="div-placeholder">
                  <div className="text-wrapper">Search for User</div>
                </div>
              </div>
              <img className="SVG" alt="Svg" src="SVG.svg" />
            </div>
          </div>
        </div>
        <div className="list">
          <div className="item">
          </div>
          <div className="item-button-account" />
        </div>
      </div>
    </div>
  );
};
