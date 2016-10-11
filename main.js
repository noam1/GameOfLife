
var WIDTH = 25;
var HEIGHT = 25;
var TIMEOUT = 100;

var isEditMode = false;
var isRunning = false;
var boardState;

function genTable()
{
    var resultHTML = "";

    for(var y = 0; y < HEIGHT; y++)
    {
        resultHTML += "<tr>";

        for(var x = 0; x < WIDTH; x++)
        {
            resultHTML += "<td id=\"cell_" + x + "_" + y + "\">";
        }

        resultHTML += "</tr>";
    }

    return resultHTML;
}

function setEditMode(isEditable)
{
    isEditMode = isEditable;

    for(var y = 0; y < HEIGHT; y++)
    {
        for(var x = 0; x < WIDTH; x++)
        {
            if (isEditable == true)
            {
                $("#cell_" + x + "_" + y)
                    .addClass("hoverable")
                    .attr("onclick", "cellClicked(" + x + "," + y + ")");
            }
            else
            {
                $("#cell_" + x + "_" + y)
                    .removeClass("hoverable")
                    .removeAttr("onclick");
            }
        }
    }
}

function cellClicked(x, y)
{
    boardState[x][y] = !boardState[x][y];
    updateUI();
}

$(document).ready(function() {
    var tableHtml = genTable();
    $("#gameTable").html(tableHtml);

    initGame();
});

function initGame()
{
    setEditMode(true);

    boardState = new Array(WIDTH);

    for (var x = 0; x < WIDTH; x++)
    {
        boardState[x] = new Array(HEIGHT);

        for(var y = 0; y < HEIGHT; y++)
            boardState[x][y] = false;
    }
}

function updateUI()
{
    for (var y = 0; y < HEIGHT; y++)
    {
        for (var x = 0; x < WIDTH; x++)
        {
            if (boardState[x][y] == true)
                $("#cell_" + x + "_" + y).addClass("marked");
            else
                $("#cell_" + x + "_" + y).removeClass("marked");
        }
    }
}

function startGame()
{
    setEditMode(false);
    isRunning = true;

    setTimeout(gameLoop, TIMEOUT);
}

function stopGame()
{
    setEditMode(true);
    isRunning = false;
}

function getNumLiveNeighbours(x, y)
{
    var count = 
        ((boardState[x - 1] != undefined && boardState[x - 1][y - 1] != undefined) ? boardState[x - 1][y - 1] : 0) +
        ((boardState[x] != undefined && boardState[x][y - 1] != undefined) ? boardState[x][y - 1] : 0) +
        ((boardState[x + 1] != undefined && boardState[x + 1][y - 1] != undefined) ? boardState[x + 1][y - 1] : 0) +
        ((boardState[x - 1] != undefined && boardState[x - 1][y] != undefined) ? boardState[x - 1][y] : 0) +
        ((boardState[x + 1] != undefined && boardState[x + 1][y] != undefined) ? boardState[x + 1][y] : 0) +
        ((boardState[x - 1] != undefined && boardState[x - 1][y + 1] != undefined) ? boardState[x - 1][y + 1] : 0) +
        ((boardState[x] != undefined && boardState[x][y + 1] != undefined) ? boardState[x][y + 1] : 0) +
        ((boardState[x + 1] != undefined && boardState[x + 1][y + 1] != undefined) ? boardState[x + 1][y + 1] : 0);

    return count;
}

function gameLoop()
{
    var newBoard = new Array(WIDTH);

    for (var i = 0; i < WIDTH; i++)
        newBoard[i] = new Array(HEIGHT);

    for(var y = 0; y < HEIGHT; y++)
    {
        for(var x = 0; x < WIDTH; x++)
        {
            var numLiveNeighbours = getNumLiveNeighbours(x, y);

            if (boardState[x][y] == true)
            {
                if (numLiveNeighbours < 2)  // Under-Population
                    newBoard[x][y] = false;
                else if(numLiveNeighbours == 2 || numLiveNeighbours == 3) // Lives
                    newBoard[x][y] = true;
                else if (numLiveNeighbours > 3) // Over-Population
                    newBoard[x][y] = false;
            }
            else
            {
                if (numLiveNeighbours == 3)  // Reproduction
                    newBoard[x][y] = true;
            }
        }
    }

    boardState = newBoard;

    updateUI();

    if (isRunning)
        setTimeout(gameLoop, TIMEOUT);
}

function resetGame()
{
    stopGame();

    initGame();
    updateUI();
}