import React, { useEffect } from "react";
import "./Main.css";

export const Main = () => {
    useEffect(() =>{

    },[])
  return (
    <div className="main">
      <div className="div-container">
        <div className="div-grid">
          <div className="div-flex-2">
            <div className="div-2">
              <div className="text-wrapper-3">Total clients</div>
              <div className="text-wrapper-4">6389</div>
            </div>
          </div>
          <div className="div-flex-3">
           
            <div className="div-3">
              <div className="text-wrapper-5">Total product</div>
              <div className="text-wrapper-6">$ 46,760.89</div>
            </div>
          </div>
          <div className="div-flex-4">
          
            <div className="div-4">
              <div className="text-wrapper-7">New sales</div>
              <div className="text-wrapper-8">376</div>
            </div>
          </div>
         
        </div>
        <div className="div-w-full">
          <div className="table">
            <div className="header-row">
              <div className="cell-client">CLIENT</div>
              <div className="cell-amount">AMOUNT</div>
              <div className="cell-status">STATUS</div>
              <div className="cell-date">DATE</div>
            </div>
            <div className="body">
                <div>
                    heelo
                </div>
            </div>
          </div>
          <div className="div-grid-2">
            <div className="span-flex">
              <div className="showing-of">SHOWING 21-30 OF 100</div>
            </div>
            <div className="span-flex-2">
              <div className="nav-table-navigation-2">
                <div className="text-wrapper-19">1</div>
              </div>
              <div className="nav-table-navigation-3">
                <div className="text-wrapper-20">2</div>
              </div>
              <div className="nav-table-navigation-4">
                <div className="text-wrapper-21">3</div>
              </div>
              <div className="nav-table-navigation-5">
                <div className="text-wrapper-20">4</div>
              </div>
              <div className="nav-table-navigation-6">
                <div className="text-wrapper-22">...</div>
              </div>
              <div className="nav-table-navigation-7">
                <div className="text-wrapper-20">8</div>
              </div>
              <div className="nav-table-navigation-8">
                <div className="text-wrapper-20">9</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
