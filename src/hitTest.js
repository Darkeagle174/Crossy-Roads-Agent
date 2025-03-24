import * as THREE from "three";
import { metadata as rows } from "./components/Map";
import { player, position } from "./components/Player";

const resultDOM = document.getElementById("result-container");
const finalScoreDOM = document.getElementById("final-score");

let isGameOver = false;

export function isGameOverState() {
    return isGameOver;
}

export function resetGameState() {
    isGameOver = false;
}

export function hitTest() {
    
    if (isGameOver) return;
    
    const row = rows[position.currentRow - 1];
    if (!row) return;

    if (row.type === "car" || row.type === "truck") {
        const playerBoundingBox = new THREE.Box3();
        playerBoundingBox.setFromObject(player);

        row.vehicles.forEach(({ ref }) => {
            if (!ref) throw Error("Vehicle reference is missing");

            const vehicleBoundingBox = new THREE.Box3();
            vehicleBoundingBox.setFromObject(ref);

            if (playerBoundingBox.intersectsBox(vehicleBoundingBox)) {
                if (!resultDOM || !finalScoreDOM) return;
                
                isGameOver = true;
                
                resultDOM.style.visibility = "visible";
                finalScoreDOM.innerText = position.currentRow.toString();
            }
        });
    }
}