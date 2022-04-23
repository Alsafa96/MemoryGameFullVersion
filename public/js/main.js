var cardsPictures=[['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bicycle','fa-bomb','fa-leaf','fa-bolt','fa-cube','fa-diamond','fa-paper-plane-o','fa-anchor','fa-bicycle','fa-bomb','fa-leaf','fa-bolt','fa-cube'],
['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bicycle','fa-bomb','fa-leaf','fa-bolt','fa-cube','fa-diamond','fa-paper-plane-o','fa-anchor','fa-bicycle','fa-bomb','fa-leaf','fa-bolt','fa-cube','fa-cab','fa-bell','fa-bell-o','fa-bug','fa-briefcase','fa-book','fa-birthday-cake','fa-binoculars','fa-cab','fa-bell','fa-bell-o','fa-bug','fa-briefcase','fa-book','fa-birthday-cake','fa-binoculars','fa-calculator','fa-bus','fa-calculator','fa-bus'],
['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bicycle','fa-bomb','fa-leaf','fa-bolt','fa-cube','fa-diamond','fa-paper-plane-o','fa-anchor','fa-bicycle','fa-bomb','fa-leaf','fa-bolt','fa-cube','fa-cab','fa-bell','fa-bell-o','fa-bug','fa-briefcase','fa-book','fa-birthday-cake','fa-binoculars','fa-cab','fa-bell','fa-bell-o','fa-bug','fa-briefcase','fa-book','fa-birthday-cake','fa-binoculars','fa-calculator','fa-bus','fa-calculator','fa-bus','fa-camera','fa-camera','fa-cloud','fa-cloud','fa-coffee','fa-coffee','fa-clock-o','fa-clock-o','fa-circle-o','fa-circle-o','fa-envelope','fa-envelope','fa-eye','fa-eye','fa-eraser','fa-eraser','fa-flag','fa-flag','fa-gift','fa-gift','fa-fax','fa-fax','fa-heart','fa-heart','fa-hourglass','fa-hourglass','fa-home','fa-home']];
var movesCounter=document.getElementById('movesNum');
var starRating=document.getElementById('starRating');
var largeContainer=document.getElementById('largeContainer');
var pause=document.getElementById('pause');

//Setting level of the game:-
let level=0;
if(sessionStorage.length===0)
level=0;
else
level=JSON.parse(sessionStorage.getItem('level'));
//Shuffling The cards:-
    function shuffle(array){
    var currentIndex=array.length,temporaryValue,randomIndex;
    while(currentIndex!==0){
    randomIndex=Math.floor(Math.random()*currentIndex);
    currentIndex-=1;
    temporaryValue=array[currentIndex];
    array[currentIndex]=array[randomIndex];
    array[randomIndex]=temporaryValue;
    }
    return array;
    }

//Creating the elements....
var cardsDeck=document.createElement('ul');
cardsDeck.id="cardsDeck";
var cardsContainer=document.createElement('div');
cardsContainer.id='cardsContainer';

let cardsRowIndex=0;
let numberOfMoves=0;
let oldNumberOfMoves=0;
let matchedPairs=0;
var firstCard=null,secondCard=null;
var firstCardElement=null,secondCardElement=null;
var flippedCards=0;

movesCounter.innerText=numberOfMoves;

function creatingElements(){
    var cardsRow=document.createElement('section');
    cardsRow.className='cardsRow';
    for(listItemCounter=0;listItemCounter<Math.sqrt(cardsPictures[level].length);listItemCounter++){
        var card=document.createElement('li');
        card.className='card facedDown';
        var currentPicture=document.createElement('i');
        currentPicture.className='fa fa-star';
        card.appendChild(currentPicture);
        cardsRow.appendChild(card);
        cardsDeck.appendChild(cardsRow);
    }
    cardsDeck.appendChild(document.createElement('br'));
}

function creatingTheGrid(){
    
   var car=shuffle(cardsPictures[level]);
   cardsRowIndex=0;

   while(cardsRowIndex<Math.sqrt(cardsPictures[level].length)){
    setTimeout(creatingElements(),0);
    cardsRowIndex+=1;
   }

   cardsContainer.appendChild(cardsDeck);
   starRating.insertAdjacentElement('afterend',cardsContainer);

}

creatingTheGrid();
function areCardsEquivalent(firstCard,secondCard){
    if(firstCard===secondCard)
    return true;
    else
    return false;
}

//Creating a popup if A new high score was recorded:
var msg='';
var flag=false;
function scorePopup(){
    let popupScreen=document.createElement('div');
    popupScreen.id="popUp";
    popupScreen.innerText="Congragulations! You have recorded a new High score! Please Enter Your name below";
    let input=document.createElement('input');
    input.id='inputNewScore';
    input.type="text";
    let okButton=document.createElement('button');
    okButton.id='okNewScoreButton';
    okButton.innerText='OK';
    popupScreen.appendChild(document.createElement('br'));
    popupScreen.appendChild(input);
    popupScreen.appendChild(document.createElement('br'));
    popupScreen.appendChild(okButton);
    document.body.appendChild(popupScreen);

    okButton.addEventListener('click',function(){
        msg=input.value;
        flag=true;
        popupScreen.hidden=true;
   })

   next();

   //Making The Score Popup Draggable:-
   let dragging=false;
   let initialX=window.innerWidth*0.2;
   let initialY=window.innerWidth*0.25;
   popupScreen.style.marginLeft=`${initialX}px`;
   popupScreen.style.marginTop=`${initialY}px`;
   popupScreen.addEventListener('mousedown',function(){
       dragging=true;
       oldX=event.x;
       oldY=event.y;
   })

   popupScreen.addEventListener('mouseup',function(){
       dragging=false;
   })

   popupScreen.addEventListener('mousemove',function(){
       if(dragging)   
       dragAndDropPopUp(popupScreen,oldX,oldY,event.x,event.y);
   })
}

function next(){

       setTimeout(function(){
           if(flag){
               if(localStorage.length<10){
                   localStorage.setItem(msg,JSON.stringify(number));
               }
               else{
                   removeSmallestScore();
                   localStorage.setItem(msg,JSON.stringify(number));
               }
           }
           else
           next();
       },300);
}
function reFlipUnequalCards(firstCardElement,secondCardElement,firstCard,secondCard){

    firstCardElement.closest('.card').classList.add('notCorrectlyMatched');
    secondCardElement.closest('.card').classList.add('notCorrectlyMatched');
    setTimeout(function(){
    firstCardElement.classList.remove(firstCard);
    secondCardElement.classList.remove(secondCard);
    firstCardElement.classList.add('fa-star');
    secondCardElement.classList.add('fa-star');
    firstCardElement.closest('.card').classList.remove('notCorrectlyMatched');
    secondCardElement.closest('.card').classList.remove('notCorrectlyMatched');
    firstCardElement.closest('.card').classList.add('facedDown');
    secondCardElement.closest('.card').classList.add('facedDown');
    firstCardElement.closest('.card').classList.add('refacingDown');
    secondCardElement.closest('.card').classList.add('refacingDown');
    firstCardElement.closest('.card').classList.remove('facedUp');
    secondCardElement.closest('.card').classList.remove('facedUp');
    },600);
    
    setTimeout(function(){
        firstCardElement.closest('.card').classList.remove('refacingDown');
        secondCardElement.closest('.card').classList.remove('refacingDown');
        firstCardElement.closest('.card').classList.remove('selectedCard');
        secondCardElement.closest('.card').classList.remove('selectedCard');
        flippedCards=0;
    },1300);
}

//Flipping the cards:-
let number=null;
let cardHadFocus=false;
function flipCard(item,index,arr){
    let pictureElement=null;
    let shuffledCardsArray=Array.from(cards);
    pictureElement=(event.target.firstElementChild || event.target);
    if(flippedCards<2){
        if(pictureElement.closest('.card').classList.contains('facedDown')){
            pictureElement.closest('.card').classList.remove('facedDown');
            pictureElement.closest('.card').classList.add('facedUp');
            setTimeout(function(){
                pictureElement.closest('.card').classList.add('selectedCard');
            },650);
            
            if(pictureElement.closest('.card').classList.contains('cardGotFocus')){
                pictureElement.closest('.card').classList.remove('cardGotFocus');
            }
            
            pictureElement.closest('.card').firstElementChild.classList.remove('fa-star');
            let currentCardIndex=shuffledCardsArray.indexOf(pictureElement.closest('.card'));
            pictureElement.closest('.card').firstElementChild.classList.add(cardsPictures[level][currentCardIndex]);
            flippedCards++;
            if(flippedCards===1){
                firstCard=cardsPictures[level][currentCardIndex];
                firstCardElement=pictureElement.closest('.card').firstElementChild;
            }
            else if(flippedCards===2){
                secondCard=cardsPictures[level][currentCardIndex];
                secondCardElement=pictureElement.closest('.card').firstElementChild;
            }

            //Check Cards For Equality
            if(flippedCards>=2){
                numberOfMoves++;
                movesCounter.innerText=numberOfMoves;
                //Checking Star Rating:-
                if(numberOfMoves-oldNumberOfMoves===12){
                    oldNumberOfMoves=numberOfMoves;
                    if(starRating.childElementCount>1)
                    starRating.lastElementChild.remove();
                }

                //Checking are cards Equal?
                if(areCardsEquivalent(firstCard,secondCard)){
                    flippedCards=0;
                    matchedPairs++;
                    firstCardElement.closest('.card').classList.add('correctlyMatched');
                    secondCardElement.closest('.card').classList.add('correctlyMatched');
                    //Are All pairs are matched?
                    if(matchedPairs===8){
                        setTimeout(function(){
                            largeContainer.classList.add('gameEnd');
                            gameWon();
                            number=[starRating.childElementCount,numberOfMoves,`${hours}:${minutes}:${seconds}`];
                            if(isItHighScore(number))
                            scorePopup();
                        },1400);
                       
                    }
                }
                else if(!areCardsEquivalent(firstCard,secondCard)){
                   
                    setTimeout(reFlipUnequalCards,2000,firstCardElement,secondCardElement,firstCard,secondCard);
                }

            }        
        }
    }   
}

//Restart Button Code:-
let restartButton=document.getElementById('restart');
restartButton.addEventListener('click',function(){
    location.reload();
})

//Adding the event listener...

let cards=document.getElementsByClassName('card');

for(let j=0;j<cards.length;j++){
    cards[j].addEventListener('click',function(){
        //Checking if a PopUp Window is open:-
        if(popUpOpen)
        popUpWindow.focus();
        else{
            for(i=0;i<cards.length;i++){
                if(cards[i].classList.contains('cardGotFocus'))
                cards[i].classList.remove('cardGotFocus');
                cardIndexOnKey=-1;
            }
            cards[j].classList.forEach(flipCard);       
        }
        
    })
}


//Timer Code...
var timer=document.getElementById('timer');
let seconds=0,minutes=0,hours=0;

timer.innerText=hours+":"+minutes+":"+seconds;
function newFunction() {
    next();
}

function playingTime(){
    seconds++;
    if(seconds===60){
        seconds=0;
        minutes++;
        if(minutes===60){
            minutes=0;
            hours++;
        }
    }
    timer.innerText=hours+":"+minutes+":"+seconds;
}

var timing=setInterval(playingTime,1000);

function runTimer(){
    timing=setInterval(playingTime,1000);
}

function gameWon(){
    clearInterval(timing);
    let wonScreen=document.createElement('div');
    let yesButton=document.createElement('button');
    let noButton=document.createElement('button');
    yesButton.innerText="Yes";
    noButton.innerText="No";
    yesButton.className='yesNoButtons';
    noButton.className='yesNoButtons'
    yesButton.id='yesButton';
    noButton.id='noButton';
    wonScreen.id="wonScreen";
    wonScreen.className="gameWon";
    wonScreen.innerText=`Congragulations! You have completed The Memory Game!


    You had done ${numberOfMoves} moves 

    Your star rating was ${starRating.childElementCount} star!
    
    You Consumed time was ${hours}:${minutes}:${seconds}

    Do You want to Play Again?

    `
    wonScreen.appendChild(yesButton);
    wonScreen.appendChild(noButton);

    yesButton.addEventListener('click',function(){
        location.reload();
    })

    noButton.addEventListener('click',function(){
        window.close();
    })

    document.body.appendChild(wonScreen);
}

//Code for pause button:
let isPaused=false;
pause.addEventListener('click',function(){
    if(isPaused){
        runTimer();
        isPaused=false;
        event.target.innerText='Pause';
    }

    else{
        clearInterval(timing);
        isPaused=true;
        event.target.innerText='Resume';
        
    }
})

//Defining the smallestScore:-

function smallestScore(smallestScoreIndexToBegin){
    let scoreIndex=0;
    let currentNumber=null;
    let currentNumberTime=null;
    let smallestScoreTime=null;
    let smallestScoreNumber=JSON.parse(localStorage.getItem(localStorage.key(smallestScoreIndexToBegin)));
    for(scoreIndex=smallestScoreIndexToBegin+1;scoreIndex<localStorage.length;scoreIndex++){
        currentNumber=JSON.parse(localStorage.getItem(localStorage.key(scoreIndex)));

        ///see number with least star rating:-
        if(currentNumber[0]<smallestScoreNumber[0]){
            smallestScoreNumber=currentNumber;
            
        }
        else if(currentNumber[0]===smallestScoreNumber[0]){
            //If equal star ratings, check smallest number of moves:-
            if(currentNumber[1]>smallestScoreNumber[1]){
                smallestScoreNumber=currentNumber;
                
            }
            else if(currentNumber[1]===smallestScoreNumber[1]){
                //If equal Number of moves, begin to check time:-
               currentNumberTime=currentNumber[2].split(':');
               smallestScoreTime=smallestScoreNumber[2].split(':');
               //Check smallest Time in order: hours:minutes:seconds:-
               //begin by checking hours:-
               if(currentNumberTime[0]>smallestScoreTime[0]){
                   smallestScoreNumber=currentNumber;
               }
               else if(currentNumberTime[0]===smallestScoreTime[0]){
                   //Shift to Checking minutes because number of hours are equal:-
                   if(currentNumberTime[1]>smallestScoreTime[1]){
                       smallestScoreNumber=currentNumber;
                       
                   }
                   else if(currentNumberTime[1]===smallestScoreTime[1]){
                       //shift to checking seconds because number of minutes are equal:-
                       if(currentNumberTime[2]>smallestScoreTime[2]){
                           smallestScoreNumber=currentNumber;
                                     
                       } 
                   }
               }
            }
        }
    }
    return smallestScoreNumber;
}

/// Locating the smallest score in localStorage in preparation for removal:-
function findSmallestScoreIndex(score){
    for(let searchIndex=0;searchIndex<localStorage.length;searchIndex++){
        if(JSON.stringify(score)===JSON.stringify(JSON.parse(localStorage.getItem(localStorage.key(searchIndex)))))
        return searchIndex;
    }
}

//Removing the smallest Score... Used when there's a new score but the localStorage has greater than 10 scores:-
function removeSmallestScore(){
    let smallest=smallestScore(0);
    let smallestIndex=findSmallestScoreIndex(smallest);
    localStorage.removeItem(localStorage.key(smallestIndex));
}

//Creating an ordered version of the scores:-
function orderTheScores(){
let orderedScores=[];
if(localStorage.length===1){
let orderedElement=JSON.parse(localStorage.getItem(localStorage.key(0)));
orderedScores.push([localStorage.key(0),orderedElement]);
}
else if(localStorage.length>1){
        while(localStorage.length>0){
        let smallest=smallestScore(0);
        let smallestIndex=findSmallestScoreIndex(smallest);
        orderedScores.push([localStorage.key(smallestIndex),smallest]);
        removeSmallestScore();
        }
   //Reput th numbers in the localStorage again:-
   for(let counter=0;counter<orderedScores.length;counter++)
   localStorage.setItem(orderedScores[counter][0],JSON.stringify(orderedScores[counter][1]));
    }
    return orderedScores;
}
//Checking if my number was a high score:-
function isItHighScore(myScore){
    let smallest=smallestScore(0);
    //Is The scores List empty?
    if(smallest===null)
    return true;
    //Is The number of scores<10?
    if(localStorage.length<10)
    return true;

    //Compare The New number to the smallest high score... If it's greater, then it's a new high score!
    if(myScore[0]>smallest[0]){
        return true;
    }
    else{
        if(myScore[1]<smallest[1]){
            return true;
        }
        else{
            let smallestTiming=smallest[2].split(':');
            if(hours<smallestTiming[0]){
                return true;
            }
            else{
                if(minutes<smallestTiming[1]){
                    return true;
                }
                else{
                    if(seconds<smallestTiming[2]){
                        return true;
                    }
                    else{
                        return false;
                    }
                }
            }
        }
    }
}

///A flag for displayed PopUp Window:-
let popUpOpen=false;
let popUpWindow=null;

///Displaying a list with the highest scores:-
let view=document.getElementById('displayScores');
let scoresListCreated=false;
let scoresList=document.createElement('div');
view.addEventListener('click',function(){
    if(scoresList.childElementCount!==0)
    scoresList.classList.remove('hidePopUp');
    else{
    let scoresView=document.createElement('div');
    scoresList.className='scoresList';
    let orderList=document.createElement('ul');
    let orderTitle=document.createElement('li');
    orderList.className='orderedScoresList';
    orderTitle.className='listScoreTitle';
    orderTitle.innerText='Order';
    
    orderList.appendChild(orderTitle);
    let namesList=document.createElement('ul');
    let namesTitle=document.createElement('li');
    namesTitle.className='listScoreTitle';
    namesTitle.innerText='Name';
    namesList.className='orderedScoresList';
    namesList.appendChild(namesTitle);
    let starRatingList=document.createElement('ul');
    let starRatingTitle=document.createElement('li');
    starRatingTitle.className='listScoreTitle';
    starRatingTitle.innerText='Star Rating';
    starRatingList.className='orderedScoresList';
    starRatingList.appendChild(starRatingTitle);
    let numberOfMovesList=document.createElement('ul');
    let numberOfMovesTitle=document.createElement('li');
    numberOfMovesTitle.className='listScoreTitle';
    numberOfMovesTitle.innerText='Number Of Moves';
    numberOfMovesList.className='orderedScoresList';
    numberOfMovesList.appendChild(numberOfMovesTitle);
    let timeConsumed=document.createElement('ul');
    let timeConsumedTitle=document.createElement('li');
    timeConsumedTitle.className='listScoreTitle';
    timeConsumed.className='orderedScoresList';
    timeConsumedTitle.innerText='Time';
    timeConsumed.appendChild(timeConsumedTitle);

    //Begin to Display The Scores:-
    let scoresToDisplay=orderTheScores();
    let scoreOrder=1;
    for(let scoresCounter=scoresToDisplay.length-1;scoresCounter>=0;scoresCounter--){
        let newOrder=document.createElement('li');
        newOrder.innerText=scoreOrder;
        orderList.appendChild(newOrder);
        let newName=document.createElement('li');
        let newScore=scoresToDisplay[scoresCounter];
        newName.innerText=newScore[0];
        namesList.appendChild(newName);
        let newStarRating=document.createElement('li');
        newStarRating.innerText=newScore[1][0];
        starRatingList.appendChild(newStarRating);
        let newNumberOfMoves=document.createElement('li');
        newNumberOfMoves.innerText=newScore[1][1];
        numberOfMovesList.appendChild(newNumberOfMoves);
        let newTime=document.createElement('li');
        newTime.innerText=newScore[1][2]
        timeConsumed.appendChild(newTime);
        if(scoresToDisplay[scoresCounter-1]){
            if(JSON.stringify(scoresToDisplay[scoresCounter])!==JSON.stringify(scoresToDisplay[scoresCounter-1]))
            scoreOrder++;
        }
    }
    scoresView.appendChild(orderList);
    scoresView.appendChild(namesList);
    scoresView.appendChild(starRatingList);
    scoresView.appendChild(numberOfMovesList);
    scoresView.appendChild(timeConsumed);
    scoresView.className='scoresView';
    //Creating OK and Clear List buttons:-
    let clearList=document.createElement('button');
    let okListButton=document.createElement('button');
    okListButton.id='okScoresList';
    okListButton.className='scoresButtons';
    clearList.id='clearScoresList';
    clearList.className='scoresButtons';
    clearList.innerText='Clear All';
    if(localStorage.length===0){
    clearList.disabled=true;
    clearList.classList.add('disabledButton');
    }
    okListButton.innerText='OK';
    scoresList.appendChild(scoresView);
    //Marking popUp window as open:-
    popUpOpen=true;
    popUpWindow=scoresList;
    //-------------------------------------
    scoresList.appendChild(clearList);
    scoresList.appendChild(okListButton);
    document.body.appendChild(scoresList);
    clearList.addEventListener('click',function(){
        if(localStorage.length===0){
        clearList.disabled=true;
     }
        if(popUpOpen===true && popUpWindow!==scoresList)
        return;
        
       let clearConfirmation=document.createElement('div');
       let okClear=document.createElement('button');
       okClear.className='clearConfirmationButtons';
       okClear.innerText='Yes';
       let cancelClear=document.createElement('button');
       cancelClear.id='cancelClear';
       cancelClear.innerText='No';
       cancelClear.className='clearConfirmationButtons';
       clearConfirmation.className='clearConfirm';
       clearConfirmation.innerText='Are you sure you want to delete all high scores?';
       clearConfirmation.appendChild(document.createElement('br'));
       clearConfirmation.appendChild(document.createElement('br'));
       clearConfirmation.appendChild(okClear);
       clearConfirmation.appendChild(cancelClear);
       document.body.appendChild(clearConfirmation);

       //The PopUp Flags:-
       popUpOpen=true;
       popUpWindow=clearConfirmation;

       //Adding Drag and drop Effect for The confirmation Message:-

       let initialX=window.innerWidth*0.2;
       let initialY=window.innerWidth*-0.3;
       let dragging=false;
       clearConfirmation.style.marginLeft=`${initialX}px`;
       clearConfirmation.style.marginTop=`${initialY}px`;
       
       clearConfirmation.addEventListener('mousedown',function(){
           dragging=true;
           oldX=event.x;
           oldY=event.y;
       })

       clearConfirmation.addEventListener('mouseup',function(){
           dragging=false;
       })

       clearConfirmation.addEventListener('mousemove',function(){
           if(dragging)
           dragAndDropPopUp(clearConfirmation,oldX,oldY,event.x,event.y);
       })

       scoresListCreated=true;

       cancelClear.addEventListener('click',function(){
           popUpOpen=true;
           popUpWindow=scoresList;
           document.body.removeChild(clearConfirmation);
       })

       okClear.addEventListener('click',function(){
           localStorage.clear();
           keepOnlyFirstChild(orderList);
           keepOnlyFirstChild(namesList);
           keepOnlyFirstChild(starRatingList);
           keepOnlyFirstChild(numberOfMovesList);
           keepOnlyFirstChild(timeConsumed);
           popUpOpen=true;
           popUpWindow=scoresList;
           document.body.removeChild(clearConfirmation);
           clearList.classList.add('disabledButton');
       })
    })
    okListButton.addEventListener('click',function(){
       if(popUpOpen===true && popUpWindow!==scoresList)
       return;
       popUpOpen=false;
       popUpWindow=null;
       scoresList.classList.add('hidePopUp');
    })
    scoresList.style.marginLeft='20%';
    scoresList.style.marginTop='-30%';
    ///Creating Drag and Drop Effect for the list of scores:-
    let dragging=false;
    let initialX=window.innerWidth*0.2;
    let initialY=window.innerWidth*-0.3;
    scoresList.style.marginTop=`${initialY}px`;
    scoresList.style.marginLeft=`${initialX}px`;
    scoresList.addEventListener('mousedown',function(){
        dragging=true;
        oldX=event.x;
        oldY=event.y;
    })

    scoresList.addEventListener('mousemove',function(){
       if(dragging){
           dragAndDropPopUp(scoresList,oldX,oldY,event.x,event.y);
       }
    })

    scoresList.addEventListener('mouseup',function(){
        dragging=false;
      })

   }
})

function keepOnlyFirstChild(parentElement){
    for(let childCounter=parentElement.childElementCount;childCounter>1;childCounter--)
    parentElement.removeChild(parentElement.lastChild);
}

let changeLevel=document.getElementById('changeLevel');
changeLevel.addEventListener('click',function(){
    //Create Popup to select level:-
    if(popUpOpen===true && popUpWindow===levelSelector)
    return 
    let levelSelector=document.createElement('div');
    levelSelector.id='levelSelector';
    let easyLevel=document.createElement('input');
    easyLevel.type='radio';
    easyLevel.name='levelChoice';
    let easyLevelLabel=document.createElement('label');
    easyLevelLabel.innerText='Easy';
    let moderateLevel=document.createElement('input');
    moderateLevel.type='radio';
    moderateLevel.name='levelChoice';
    let moderateLevelLabel=document.createElement('label');
    moderateLevelLabel.innerText='Moderate';
    let hardLevel=document.createElement('input');
    hardLevel.type='radio';
    hardLevel.name='levelChoice';
    let hardLevelLabel=document.createElement('label');
    hardLevelLabel.innerText='Hard';
    let breakingLine=document.createElement('br');
    levelSelector.appendChild(easyLevel);
    levelSelector.appendChild(easyLevelLabel);
    levelSelector.appendChild(breakingLine);
    levelSelector.appendChild(moderateLevel);
    levelSelector.appendChild(moderateLevelLabel);
    levelSelector.appendChild(breakingLine.cloneNode());
    levelSelector.appendChild(hardLevel);
    levelSelector.appendChild(hardLevelLabel);
    levelSelector.appendChild(breakingLine.cloneNode());
    //Adding OK button:-
    let confirmLevel=document.createElement('button');
    confirmLevel.innerText='OK';
    confirmLevel.id='confirmLevel';
    confirmLevel.className='levelSelectionButtons';

    let cancelLevelSelection=document.createElement('button');
    cancelLevelSelection.innerText='Cancel';
    cancelLevelSelection.id='cancelLevelSelection';
    cancelLevelSelection.className='levelSelectionButtons';


    levelSelector.appendChild(confirmLevel);
    levelSelector.appendChild(cancelLevelSelection);
    //Flags for open popUp:-
    popUpOpen=true;
    popUpWindow=levelSelector;

    //Programming Each Option button:-
    easyLevel.addEventListener('click',function(){
        sessionStorage.setItem('level',JSON.stringify(0));
    })

    moderateLevel.addEventListener('click',function(){
        sessionStorage.setItem('level',JSON.stringify(1));
    })

    hardLevel.addEventListener('click',function(){
        sessionStorage.setItem('level',JSON.stringify(2));
    })

    //Programming The Ok button:-
    confirmLevel.addEventListener('click',function(){
        location.reload();
    })

    //Programming The Cancel Button:-
    cancelLevelSelection.addEventListener('click',function(){
        popUpOpen=false;
        popUpWindow=null;
        document.body.removeChild(levelSelector);
    })
    document.body.appendChild(levelSelector);

    //Making The level Selection window draggable:-

     let initialX=window.innerWidth*0.2;
     let initialY=window.innerWidth*-0.3;
     let dragging=false;
     levelSelector.style.marginLeft=`${initialX}px`;
     levelSelector.style.marginTop=`${initialY}px`;

     levelSelector.addEventListener('mousedown',function(){
        dragging=true;
        oldX=event.x;
        oldY=event.y;
    })
    
    levelSelector.addEventListener('mouseup',function(){
        dragging=false;
    })

    levelSelector.addEventListener('mousemove',function(){
        if(dragging){
            dragAndDropPopUp(levelSelector,oldX,oldY,event.x,event.y);
        }
    })

})

//Transmitting Focus To Cards By KeyBorad Arrows:-
let cardIndexOnKey=-1;

document.addEventListener('keydown',function(){

    if(flippedCards===2)
    return;

    if(event.keyCode===39){
        if(cards[cardIndexOnKey])
        cards[cardIndexOnKey].classList.remove('cardGotFocus');
        
        checkIfCardIsAlreadyFacedUp('right');
    }

    else if(event.keyCode===37){
        if(cards[cardIndexOnKey])
        cards[cardIndexOnKey].classList.remove('cardGotFocus');
        
        checkIfCardIsAlreadyFacedUp('left');
    }

    else if(event.keyCode===38){
        if(cards[cardIndexOnKey])
        cards[cardIndexOnKey].classList.remove('cardGotFocus');

        checkIfCardIsAlreadyFacedUp('up');
    }

    else if(event.keyCode===40){
        if(cards[cardIndexOnKey])
        cards[cardIndexOnKey].classList.remove('cardGotFocus');

        checkIfCardIsAlreadyFacedUp('down');
    }

    //Opening The card on pressing enter:-
    else if (event.keyCode===13){
        cards[cardIndexOnKey].click();
    }

    //Clicking The pause button on p press:-
    else if(event.keyCode===80){
        pause.click();
    }

    //Clicking The restart button on r press:-*/
    else if(event.keyCode===82){
        restartButton.click();
    }

    //Viewing the highest scores on pressing h button:-*/
    else if(event.keyCode===72){
        view.click();
    }

    //Displaying The change Level box when clicking c:-*/
    else if(event.keyCode===67){
        changeLevel.click();
    }

})

//The Drag and drop Effect for any popUp window:-
function dragAndDropPopUp(popUpWindow,myOldX,myOldY,newX,newY){

     if(newX!==myOldX){
            let myXOffset=newX-myOldX;
            popUpWindow.style.marginLeft=`${parseFloat(popUpWindow.style.marginLeft)+myXOffset}px`;
            oldX=newX;
     }
        
    if(newY!==myOldY){
            let myYOffset=newY-myOldY;
            popUpWindow.style.marginTop=`${parseFloat(popUpWindow.style.marginTop)+myYOffset}px`;
            oldY=newY;
     }
}

function checkIfCardIsAlreadyFacedUp(direction){

    if(direction==='left'){
        cardIndexOnKey--;
        if(cardIndexOnKey<0)
        cardIndexOnKey=cards.length-1;
        if(!cards[cardIndexOnKey].classList.contains('facedDown'))
        checkIfCardIsAlreadyFacedUp('left');
        cards[cardIndexOnKey].classList.add('cardGotFocus');
    }

    else if(direction==='right'){
        cardIndexOnKey++;
        if(cardIndexOnKey>cards.length-1)
        cardIndexOnKey=0;
        if(!cards[cardIndexOnKey].classList.contains('facedDown'))
        checkIfCardIsAlreadyFacedUp('right');
        cards[cardIndexOnKey].classList.add('cardGotFocus');
    }

    else if(direction==='up'){
        if(cardIndexOnKey<=0)
        cardIndexOnKey=cards.length-1+Math.sqrt(cards.length);
        cardIndexOnKey-=Math.sqrt(cards.length);
        if(cardIndexOnKey<0){
            cardIndexOnKey--;
            cardIndexOnKey+=Math.sqrt(cards.length)*Math.sqrt(cards.length);
        }
        if(!cards[cardIndexOnKey].classList.contains('facedDown'))
        checkIfCardIsAlreadyFacedUp('up');
        cards[cardIndexOnKey].classList.add('cardGotFocus');
    }

    else if(direction==='down'){
        if(cardIndexOnKey<0)
        cardIndexOnKey=-4;
        else if(cardIndexOnKey===cards.length-1)
            cardIndexOnKey=0;
        else{
            cardIndexOnKey+=Math.sqrt(cards.length);
            if(cardIndexOnKey>cards.length-1){
                cardIndexOnKey++;
                cardIndexOnKey-=Math.sqrt(cards.length)*Math.sqrt(cards.length);
            }

            if(!cards[cardIndexOnKey].classList.contains('facedDown'))
            checkIfCardIsAlreadyFacedUp('down');
        }
        
        cards[cardIndexOnKey].classList.add('cardGotFocus');
    }

}

//----------------------------------------------------
document.addEventListener('mouseup',function(){
    if(popUpOpen)
    dragging=false;
})

