import { useEffect, useRef } from "react";
import "./components/css/transition.css";


const GridTransition = ({ trigger, onComplete }) => {
    const gridRef = useRef(null);
    const rows = 8;
    const cols = 12;

    useEffect(() => {
        if (!gridRef.current) return;

        gridRef.current.innerHTML = "";

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              const tile = document.createElement("div");
              tile.className = "tile";
              tile.dataset.row = row;
              tile.dataset.col = col;
              gridRef.current.appendChild(tile);
            }
          }
    }, []);

    useEffect(() => {
        if (trigger) {
            console.log("Transition triggered!");

            const tiles = gridRef.current.querySelectorAll(".tile");

            tiles.forEach((tile) => {
                const row = parseInt(tile.dataset.row);
                const col = parseInt(tile.dataset.col);
                const delay = ((rows - row) + (cols - col)) * 40;
        
                setTimeout(() => {
                  tile.classList.add("bubble-up");
                }, delay);
              });
        
              const maxDelay = ((rows + cols) * 40) + 600;

              setTimeout(() => {
                onComplete?.();
              }, maxDelay);
              
              const totalDuration = maxDelay + 100;
              setTimeout(() => {
                tiles.forEach((tile) => {
                    const row = parseInt(tile.dataset.row);
                    const col = parseInt(tile.dataset.col);
                    const delay = (row + col) * 40;

                    setTimeout(() => {
                        tile.classList.remove("bubble-up");
                        tile.classList.add("bubble-down");
                    }, delay);
                });
              }, totalDuration);

              setTimeout(() => {
                tiles.forEach((tile) => {
                    tile.classList.remove("bubble-down");
                });
              }, totalDuration + 1000);
            }
        }, [trigger, onComplete]);

    return <div ref={gridRef} className="transition-grid"></div>;
};

export default GridTransition;
