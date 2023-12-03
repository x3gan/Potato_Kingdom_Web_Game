const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1, 1, 1],
        [0, 0, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1, 1, 1],
        [0, 0, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1, 1, 1],
        [0, 0, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1, 1, 1],
        [0, 0, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'town',
        shape: [[1, 1, 0],
        [1, 0, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'town',
        shape: [[1, 1, 1],
        [1, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'farm',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'farm',
        shape: [[0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1, 1, 1],
        [1, 0, 0],
        [1, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1, 0, 0],
        [1, 1, 1],
        [1, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 1]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1, 1, 0],
        [1, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
]

function shuffle(eList) {
  let currentIdx = eList.length,  rndIdx;

  while (currentIdx > 0) {

    rndIdx = Math.floor(Math.random() * currentIdx);
    currentIdx--;

    [eList[currentIdx], eList[rndIdx]] = [
      eList[rndIdx], eList[currentIdx]];
  }
  return eList;
}

shuffle(elements);



const mountains = [[2, 2], [4, 9], [6, 4], [9, 10], [10, 6]];

const pElementDiv = document.getElementById('placable-element')
const pElement = document.getElementById('element-table')
const resetBtn = document.getElementById('reset')
const mirrorBtn = document.getElementById('mirror-btn')
const map = document.getElementById('map');

let seasonTime = document.getElementById('rem-time-per-season')
let currentSeason = document.getElementById('current-season')
let pElementTime = document.getElementById('element-time')

let actA = document.getElementById('activity-a')
let actB = document.getElementById('activity-b')
let actC = document.getElementById('activity-c')
let actD = document.getElementById('activity-d')

let questScoreA = document.getElementById('bottom-right-a')
let questScoreB = document.getElementById('bottom-right-b')
let questScoreC = document.getElementById('bottom-right-c')
let questScoreD = document.getElementById('bottom-right-d')

let springScore = document.getElementById('spring').querySelector('span')
let summerScore = document.getElementById('summer').querySelector('span')
let autumnScore = document.getElementById('autumn').querySelector('span')
let winterScore = document.getElementById('winter').querySelector('span')
let allScore = document.getElementById('all-time-score').querySelector('span')

resetBtn.addEventListener("click", onClick)
map.addEventListener("click", clickCell)
pElementDiv.appendChild(pElementTime)

let enGameTxt = document.getElementById("gameover-text")
let alreadyCheckedRows = new Set();
let alreadyCheckedCols = new Set();
let currentTimeRef = 0
let gameOver = false
let score = 0
let eIdx = 0

let currentShape = nxtElement()

const mapH = 11;
const mapW = 11;
const size = 11
const mapData = new Array(size).fill(0).map(() => new Array(size).fill(0));

function nxtElement(){
    eIdx++
    return elements[eIdx]
}

function onClick() {
    location.reload()
}

function clickCell(e) {
    if (e.target.tagName == 'TD') {
        const ittX = e.target.cellIndex
        const ittY = e.target.parentNode.rowIndex
        placeElement(ittX, ittY, currentShape)
        if (mapData[ittX][ittY] != 0) {
            return
        }
    }
}

function generateTable() {
    for (let i = 0; i < size; i++) {
        const row = map.insertRow();
        for (let j = 0; j < size; j++) {
            const cell = row.insertCell();
            cell.classList.add('cell');
            cell.style.backgroundSize = "cover";
            cell.style.backgroundImage = "url('assets/tiles/base_tile.png')";
            row.appendChild(cell)
            if (mountains.some(coordinate => coordinate[0] - 1 === i && coordinate[1] - 1 === j)) {
                mapData[i][j] = 5;
                cell.style.backgroundImage = "url('assets/tiles/mountain_tile.png')";
            }
        }
        map.appendChild(row)
    }
}

function generateElement(e) {
    pElement.innerHTML = ''
    const size = 3;
    for (let i = 0; i < size; i++) {
        const row = pElement.insertRow();
        for (let j = 0; j < size; j++) {
            const cell = row.insertCell();
            cell.style.backgroundSize = "cover"
            cell.classList.add('cell');
            row.appendChild(cell)
            if (e.shape[i][j] == 1) {
                cell.style.backgroundImage = `url(assets/tiles/${e.type}_tile.png)`
            }
        }
        pElement.appendChild(row)
    }
    pElementTime.innerText = e.time + "🕓"
}

function placeElement(x, y, e) {
    let placable = true;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const placeX = x + j;
            const placeY = y + i;

            if (e.shape[i][j] == 1) {
                if (placeY >= size || placeX >= size || mapData[placeY][placeX] !== 0) {
                    placable = false;
                    break;
                }
            }
        }
    }

    if (!placable) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const placeX = x + j;
                const placeY = y + i;

                if (e.shape[i][j] === 1) {
                    if (placeY < size && placeX < size) {
                        const cell = map.rows[placeY].cells[placeX];
                        if (mapData[placeY][placeX] == 0) {
                            cell.style.backgroundImage = `url(assets/error-tiles/${e.type}-error.png)`;
                            cell.dataset.value = "error"

                            cell.style.opacity = '0.5';
                        }
                    }
                }
            }
        }
        return;
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const placeX = x + j;
            const placeY = y + i;

            if (e.shape[i][j] === 1) {
                const cell = map.rows[placeY].cells[placeX];
                cell.style.backgroundImage = `url(assets/tiles/${e.type}_tile.png)`;
                cell.style.opacity = '1.0';

                if (!mapData[placeY]) {
                    mapData[placeY] = [];
                }
                if (e.type == 'water') {
                    mapData[placeY][placeX] = 1;
                }
                if (e.type == 'town') {
                    mapData[placeY][placeX] = 2;
                }
                if (e.type == 'forest') {
                    mapData[placeY][placeX] = 3;
                }
                if (e.type == 'farm') {
                    mapData[placeY][placeX] = 4;
                }
            }
        }
    }

    updateTime(e);
    seasonsChange()
    borderLands()

    currentShape = nxtElement()
    generateElement(currentShape)
}

function endGame(){
    enGameTxt.innerText = "Játék vége"
    enGameTxt.style.fontSize = "24px"
    resetBtn.style.backgroundColor = "#cccccc"
}


function seasonsChange() {
    if (currentTimeRef <= 0 && currentSeason.textContent == "Tavasz (AB)") {
        currentSeason.textContent = "Nyár (BC)"
        actA.textContent = '⚪'
        actC.textContent = '🟢'
        seasonTime.innerText = "Évszakból hátralévő idő: 7/7"
        shuffle(elements)
        return
    }
    if (currentTimeRef <= 0 && currentSeason.textContent == "Nyár (BC)") {
        currentSeason.textContent = "Ősz (CD)"
        actB.textContent = '⚪'
        actD.textContent = '🟢'
        seasonTime.innerText = "Évszakból hátralévő idő: 7/7"
        eIdx = -1
        shuffle(elements)
        return
    }
    
    if (currentTimeRef <= 0 && currentSeason.textContent == "Ősz (CD)") {
        currentSeason.textContent = "Tél (DA)"
        actC.textContent = '⚪'
        actA.textContent = '🟢'
        seasonTime.innerText = "Évszakból hátralévő idő: 7/7"
        eIdx = -1
        shuffle(elements)
        return
    }
    
    else if (currentTimeRef <= 0 && currentSeason.textContent == "Tél (DA)") {
        let sPont =springScore.textContent.split(" ")
        let ssPont =summerScore.textContent.split(" ")
        let aPont =autumnScore.textContent.split(" ")
        let wPont =winterScore.textContent.split(" ")

        allScore.textContent = parseInt(sPont[0]) + parseInt(ssPont[0]) + parseInt(aPont[0]) + parseInt(wPont[0]) + " pont"
        resetBtn.removeEventListener("click", onClick)
        map.removeEventListener("click", clickCell)
        endGame()
        gameOver = true
    }
}

function updateTime(e) {
    const splitByCommaSpace = seasonTime.innerText.split(": ")
    const splitTime = splitByCommaSpace[1].split('/')
    let dif = parseInt(splitTime[0]) - e.time
    currentTimeRef = dif
    if (dif <= 0) {
        seasonTime.innerText = "Évszakból hátralévő idő: 0/7"
    }
    else {
        seasonTime.innerText = "Évszakból hátralévő idő: " + dif + "/7"
    }
}

function borderLands() {
    let fullRowFound = 0;
    let fullColFound = 0;

    for (let i = 0; i < mapH; i++) {
        if (!alreadyCheckedRows.has(i)) {
            let rowFull = true;
            for (let j = 0; j < mapW; j++) {
                if (mapData[i][j] == 0) {
                    rowFull = false;
                    break;
                }
            }
            if (rowFull) {
                fullRowFound++;
                alreadyCheckedRows.add(i);
            }
        }
    }

    for (let j = 0; j < mapW; j++) {
        if (!alreadyCheckedCols.has(j)) {
            let colFull = true;
            for (let i = 0; i < mapH; i++) {
                if (mapData[i][j] == 0) {
                    colFull = false;
                    break;
                }
            }
            if (colFull) {
                fullColFound++;
                alreadyCheckedCols.add(j);
            }
        }
    }

    score += fullRowFound * 6 + fullColFound * 6;
    if (actD.textContent == '🟢') {
        questScoreD.innerText = `(${score}) pont\u{2003}🟢 D`;
        if(currentSeason.textContent == "Ősz (CD)"){
            autumnScore.textContent = score + " pont "
        }
        if (currentSeason.textContent == "Tél (DA)") {
            winterScore.textContent = score+ " pont"
        }

    }
}
 
generateTable()
generateElement(currentShape)


