var board=new Array();

$(document).ready(function(){
	newgame();
	score();
});

function newgame(){
	init();
	generateOneNumber();
	generateOneNumber();
}


function init(){
	for (var i=0; i<4; i++){
		board[i]=new Array();
		for (var j=0; j<4; j++){
			board[i][j]=0;
			var gridCell=$("#grid-cell-"+i+"-"+j);
			gridCell.css("top", getPosTop(i,j));
			gridCell.css("left", getPosLeft(i,j));
		}
	}
	updateBoardView();
}


function updateBoardView(){
	$(".number-cell").remove();
	for (var i=0; i<4; i++){
		for (var j=0; j<4; j++){
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var numberCell=$("#number-cell-"+i+"-"+j);
			if (board[i][j]==0){
				numberCell.css("width","0px");
				numberCell.css("height","0px");
				numberCell.css("top",getPosTop(i,j));
				numberCell.css("left",getPosLeft(i,j));}
			else{
				numberCell.css("width","100px");
				numberCell.css("height","100px");
				numberCell.css("top",getPosTop(i,j));
				numberCell.css("left",getPosLeft(i,j));
				numberCell.css("background-color",getNumberBackgroundColor(board[i][j]));
				numberCell.css("color",getNumberColor(board[i][j]));
				numberCell.text(board[i][j]);
				}
		}
	}
}

function generateOneNumber(){
	if (nospace(board))
	return false;
	
	var randx=parseInt(Math.floor(Math.random()*4));
	var randy=parseInt(Math.floor(Math.random()*4));
	while(true){
		if (board[randx][randy]==0)
		break;
		var randx=parseInt(Math.floor(Math.random()*4));
	    var randy=parseInt(Math.floor(Math.random()*4));
	}
	var randNumber=Math.random()<0.5?2:4;
	board[randx][randy]=randNumber;
	showNumberWithAnimation(randx, randy, randNumber);
	return true;
}


$(document).keydown(function(event){
	switch (event.keyCode){
		case 37:
		if (moveLeft()){
			generateOneNumber();
			isgameover();
		}
		break;
		case 38:
		if (moveUp()){
			generateOneNumber();
			isgameover();
		}
		break;
		case 39:
		if (moveRight()){
			generateOneNumber();
			isgameover();
		}
		break;
		case 40:
		if (moveDown()){
			generateOneNumber();
			isgameover();
		}
		break;
	}
});


function isgameover(){
	if (nospace(board) && nomove(board))
	gameover();
}


function gameover(){
	alert("gameover");
}


function moveLeft(){
	if (!canMoveLeft(board)){
	return false;
	}
	for (var i=0; i<4; i++){	
	for (var j=1; j<4; j++){
		if (board[i][j]!=0){
			for (var k=0; k<j; k++){
				if (board[i][k]==0 && noBlockHorizontal(i,k,j,board)){
					showMoveAnimation(i,j,i,k);
					board[i][k]=board[i][j];
					board[i][j]=0;
				}
				else if(board[i][k]==board[i][j] && noBlockHorizontal(i,k,j,board)){
					showMoveAnimation(i,j,i,k);
					board[i][k] += board[i][j];
					/*此处加一个不成熟的计数函数*/ score(board);
					board[i][j]=0;
				}
			}
			
		}
	}
	}
setTimeout("updateBoardView()",200);
	return true;
}
/*向上移动*/
function moveUp(){
	if (!canMoveUp(board)){      /* canMoveUp(board)*/
	return false;
	}
	for (var i=1; i<4; i++){	
	for (var j=0; j<4; j++){
		if (board[i][j]!=0){
			for (var k=0; k<i; k++){
				if (board[k][j]==0 && noBlockHorizontal(i,k,j,board)){
					showMoveAnimation(i,j,i,k);
					board[k][j]=board[i][j];
					board[i][j]=0;
				}
				else if(board[k][j]==board[i][j] && noBlockHorizontal(i,k,j,board)){
					showMoveAnimation(i,j,i,k);
					board[k][j] += board[i][j];
					/*此处加一个不成熟的计数函数*/ score(board);
					board[i][j]=0;
				}
			}
			
		}
	}
	}
setTimeout("updateBoardView()",200);
	return true;
}
/*向右移动*/
function moveRight(){
	if (!canMoveRight(board)){      /* canMoveRight(board)*/
	return false;
	}
	for (var i=0; i<4; i++){	
	for (var j=0; j<3; j++){
		if (board[i][j]!=0){
			for (var k=0; k<j; k++){
				if (board[i][k]==0 && noBlockHorizontal(i,k,j,board)){
					showMoveAnimation(i,j,i,k);
					board[i][k]=board[i][j];
					board[i][j]=0;
				}
				else if(board[i][k]==board[i][j] && noBlockHorizontal(i,k,j,board)){
					showMoveAnimation(i,j,i,k);
					board[i][k] += board[i][j];
					/*此处加一个不成熟的计数函数*/ score(board);
					board[i][j]=0;
				}
			}
			
		}
	}
	}
setTimeout("updateBoardView()",200);
	return true;
}
/*向下移动*/
function moveDown(){
	if (!canMoveDown(board)){      /* canMoveDown(board)*/
	return false;
	}
	for (var i=0; i<3; i++){	
	for (var j=0; j<4; j++){
		if (board[i][j]!=0){
			for (var k=0; k<i; k++){
				if (board[k][j]==0 && noBlockHorizontal(i,k,j,board)){
					showMoveAnimation(i,j,i,k);
					board[k][j]=board[i][j];
					board[i][j]=0;
				}
				else if(board[k][j]==board[i][j] && noBlockHorizontal(i,k,j,board)){
					showMoveAnimation(i,j,i,k);
					board[k][j] += board[i][j];
					/*此处加一个不成熟的计数函数*/ score(board);
					board[i][j]=0;
				}
			}
			
		}
	}
	}
setTimeout("updateBoardView()",200);
	return true;
}
