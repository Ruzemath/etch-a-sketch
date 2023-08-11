let color = 'black';
let choice = 'none'; 
let colorChoice = document.getElementById('colorChoice');
colorChoice.oninput = (e) => newColor(e.target.value);
 
let draw = true;
document.querySelector('body').addEventListener('click', (e) => 
{
    if(e.target.tagName != 'BUTTON' && e.target.tagName != 'INPUT')
    {
        draw = !draw;
        if(draw)
            document.querySelector('.draw').textContent = "Draw: Enabled";
        else
            document.querySelector('.draw').textContent = "Draw: Disabled";
    }   
});
createGrid(16);

function createGrid(size)
{
    const grid = document.querySelector('.grid');
    const totalGrid = grid.querySelectorAll('div');
    totalGrid.forEach(div => div.remove());
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for(let i = 0; i < size * size; i++)
    {
        const index = document.createElement('div');
        index.addEventListener('mouseover', colorGrid);
        index.style.backgroundColor = 'white';
        grid.insertAdjacentElement('beforeend',index);
    }
}

function colorGrid()
{
    if (choice === "rainbow" && draw)
        this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    else if(choice === "color" && draw)
        this.style.backgroundColor = color;
    else if(choice === "eraser" && draw)
        this.style.backgroundColor = 'white';
}

function resetGrid()
{
    const grid = document.querySelector('.grid');
    const totalGrid = grid.querySelectorAll('div');
    totalGrid.forEach(div => div.style.backgroundColor = 'white');
}

function newSize(newSize)
{
    if(newSize >= 2 && newSize <= 128)
    {
        document.querySelector('.error').style.display = 'none';
        createGrid(newSize);
        const sizeValue = document.getElementById('sizeValue');
        sizeValue.innerText = `${newSize} x ${newSize}`;
    }
    else
        document.querySelector('.error').style.display = 'flex';
}

function newColor(newColor)
{
    color = newColor;
    colorChoice.style.background = newColor;
}

function newChoice(newChoice)
{
    choice = newChoice;
    if(choice === "rainbow")
        document.querySelector('.mode').textContent = "Mode: Rainbow";
    else if(choice === "color")
        document.querySelector('.mode').textContent = "Mode: Color";
    else if(choice == "eraser")
        document.querySelector('.mode').textContent = "Mode: Eraser";
}