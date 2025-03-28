import * as THREE from "three";
import { endsIpInValidPosition } from "../utilities/endsUpInValidPosition";
import { metadata as rows, addRows } from "./Map";
import { isGameOverState } from "../hitTest";

export const player = Player();

function Player() {
    const player = new THREE.Group();

    const body = new THREE.Mesh (
        new THREE.BoxGeometry(15, 15, 20),
        new THREE.MeshLambertMaterial({
            color: "white",
            flatShading: true,
        })
    );
    body.position.z = 10;
    body.castShadow = true;
    body.receiveShadow = true;
    player.add(body);

    const cap = new THREE.Mesh(
        new THREE.CylinderGeometry(7, 10, 5, 6),
        new THREE.MeshLambertMaterial({
            color: 0xf0619a,
            flatShading: true,
        })
    );
    cap.position.z = 21;
    cap.castShadow = true;
    cap.receiveShadow = true;
    player.add(cap);

    const playerContainer = new THREE.Group();
    playerContainer.add(player);

    return playerContainer;
}

export const position = {
    currentRow: 0,
    currentTile: 0,
};

export const movesQueue = [];

export function initializePlayer() {
    player.position.x = 0;
    player.position.y = 0;
    player.children[0].position.z = 0;

    position.currentRow = 0;
    position.currentTile = 0;

    movesQueue.length = 0;
}

export function queueMove(direction) {

    if (isGameOverState()) return;

    const isValidMove = endsIpInValidPosition(
        {
            rowIndex: position.currentRow,
            tileIndex: position.currentTile,
        },
        [...movesQueue, direction]
    );

    if (!isValidMove) return;

    movesQueue.push(direction);
}

export function stepCompleted() {
    const direction = movesQueue.shift();

    if (direction === "forward") position.currentRow += 1;
    if (direction === "backward") position.currentRow -= 1;
    if (direction === "left") position.currentTile -= 1;
    if (direction === "right") position.currentTile += 1;

    if (position.currentRow > rows.length - 10) addRows();

    const scoreDOM = document.getElementById("score");
    if (scoreDOM) {
        const currentScore = parseInt(scoreDOM.innerText) || 0;
        const newScore = position.currentRow;
        
        if (newScore > currentScore) {
            scoreDOM.innerText = newScore.toString();
        }
    }
}