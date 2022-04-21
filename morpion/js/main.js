$(document).ready(function() {
    let gridCase=[];
    let roundFinish=true;
    initRound();

    function initRound(){
        gridCase=[[0,0,0],[0,0,0],[0,0,0]]
        roundFinish=false;
        $("tr:not(:last-child) td").html("");
        $("#message").text("");
        return;
    }
    function endRound(actualPlayer){
        if (actualPlayer==null) {
            $("#message").text(`Execo`);
            $(`#scoreEqualize`).text(parseInt($(`#scoreEqualize`).text())+1);
        } else {
            $("#message").text(`Le joueur ${actualPlayer} gagne`);
            $(`#score${actualPlayer}`).text(parseInt($(`#score${actualPlayer}`).text())+1);
        }
        roundFinish = true;
    }
    function checkWin(clickCaseArr,player){
        let winHorizontal=true;
        let winVertical=true;
        let diagonalTopLeft = true;
        let diagonalBottomLeft = true;

        let actualPlayer = player==="player1"?1:2;
        for (let x = 0; x < gridCase[clickCaseArr[0]].length; x++) {
           if (gridCase[clickCaseArr[0]][x]!=actualPlayer) {
                winHorizontal=false
           }
        }
        for (let y = 0; y < gridCase.length; y++) {
            if (gridCase[y][clickCaseArr[1]]!=actualPlayer) {
                winVertical=false
            }
        }
        for (let dtl = 0; dtl < gridCase.length; dtl++) {
            if (gridCase[dtl][dtl]!=actualPlayer) {
                diagonalTopLeft=false
            }
        }
        for (let dbl = 0; dbl < gridCase.length; dbl++) {
            if (gridCase[gridCase.length-1-dbl][dbl]!=actualPlayer) {
                diagonalBottomLeft=false
            }
        }

        if (winHorizontal||winVertical||diagonalTopLeft||diagonalBottomLeft) { 
            endRound(actualPlayer);
        } else if (!($.inArray(0, $.map(gridCase,(v)=>v.map((va)=>va))) > -1)) {
            endRound(null);
        }
        return;
    }
    function checkCase(clickCasePose,clickCaseArr,player){
        if (gridCase[clickCaseArr[0]][clickCaseArr[1]] === 0) {
            if (player==="player1") {
                $(`#${clickCasePose}`).append("<img src='./assets/img/o.gif'></img>");
                gridCase[clickCaseArr[0]][clickCaseArr[1]] = 1;
                checkWin(clickCaseArr,player);
                botPlay();
            } else if (player==="player2"){
                $(`#${clickCasePose}`).append("<img src='./assets/img/x.gif'></img>");
                gridCase[clickCaseArr[0]][clickCaseArr[1]] = 2;
                checkWin(clickCaseArr,player);
               
                
            }
            
        }
        return;
    }
    function botPlay(){
       if (($.inArray(0, $.map(gridCase,(v)=>v.map((va)=>va))) > -1) && !roundFinish) {
            while(true){
                let botCaseX = Math.round(Math.random()*2);
                let botCaseY = Math.round(Math.random()*2);
                if (gridCase[botCaseY][botCaseX]===0) {
                    checkCase(`pos_${botCaseY}_${botCaseX}`,[botCaseY,botCaseX],"player2");
                    break;
                }
            }
       }
       return;
    }
    



    $("tr:not(:last-child) td").click(function(e){
        if (!roundFinish) {
            let clickCasePose = $(this).attr('id');
            let clickCaseArr = clickCasePose.split('_');
            clickCaseArr.shift();
            checkCase(clickCasePose,clickCaseArr,"player1");
        }
       
        
    });
    $("#rejouer").click(function(e){
        if (!roundFinish) {
            $("#scoreSurrender").text(parseInt($("#scoreSurrender").text())+1)
        }
        $("#nbMatchesCount").text(parseInt($("#nbMatchesCount").text())+1)
        initRound();      
    });
});