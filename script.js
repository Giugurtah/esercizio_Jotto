//Fase di bootstrap dello script in cui viene letta la time table e vengono creati tutti i placeholder 
// che conterranno successivamente i riferimenti agli elementi del DOM
let timeTable = [
    {
      "timeStart": 0,
      "timeEnd": 160
    },
    {
      "timeStart": 160,
      "timeEnd": 320
    },
    {
      "timeStart": 320,
      "timeEnd": 480
    },
    {
      "timeStart": 480,
      "timeEnd": 640
    },
    {
      "timeStart": 640,
      "timeEnd": 800
    },
    {
      "timeStart": 800,
      "timeEnd": 960
    },
    {
      "timeStart": 960,
      "timeEnd": 1120
    },
    {
      "timeStart": 1120,
      "timeEnd": 1280
    },
    {
      "timeStart": 1280,
      "timeEnd": 1440
    }
];

let resizeOn = false; // Variabile ausiliaria booleana per differenziare i casi in cui si sta traslando o si sta ridimensionando i box

const meter = document.getElementById("meter");
const scale = document.getElementById("scale");
const reset = document.getElementById("reset");
const convert = document.getElementById("convert");
reset.addEventListener("mousedown" , resetTimeTable);
convert.addEventListener("mousedown", convertTimeTable);

let box_1;
let box_2;
let box_3;
let box_4;
let box_5;
let box_6;
let box_7;
let box_8;
let box_9;

let resizer_1;
let resizer_2;
let resizer_3;
let resizer_4;
let resizer_5;
let resizer_6;
let resizer_7;
let resizer_8;

printMeter();

// Funzione per gestire il ridimensionamento dei box
function resize(event, number) {
    resizeOn = true; // Resize viene posto ad On

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    let initialX = event.clientX;

    function mousemove(event) {
        let deltaX = event.clientX - initialX;
        if((timeTable[number-1].timeEnd > timeTable[number-1].timeStart || deltaX > 0) 
        && (timeTable[number].timeEnd > timeTable[number].timeStart || deltaX < 0)) {
            timeTable[number].timeStart +=  Math.floor(deltaX*(1440/1200));
            timeTable[number-1].timeEnd +=  Math.floor(deltaX*(1440/1200));
        }

        initialX = event.clientX;
        printMeter();
    }

    function mouseup() {
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
        resizeOn = false;
    }
}

// Funzione per gestire la traslazione dei box
function translate(event, number) {
    // Questa funzione si attva solo quando non è stato attivato il resizeOn, cioè quando l'utente ha cliccato sul box ma non sul div del resize
    if (!resizeOn) {
        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);
    
        let initialX = event.clientX;

        // Funzione per modificare la timetable
        function mousemove(event) {
            let deltaX = event.clientX - initialX;
            
            if(number != 0 && (timeTable[number-1].timeEnd > timeTable[number-1].timeStart || deltaX > 0)) {
                timeTable[number-1].timeEnd += Math.floor(deltaX*(1440/1200));
                timeTable[number].timeStart += Math.floor(deltaX*(1440/1200)); 
            }
            if(number != 8 && (timeTable[number+1].timeEnd > timeTable[number+1].timeStart || deltaX < 0)) {
                timeTable[number+1].timeStart += Math.floor(deltaX*(1440/1200));
                timeTable[number].timeEnd += Math.floor(deltaX*(1440/1200));
            }
    
            initialX = event.clientX;
            printMeter();
        }
    
        function mouseup() {
            window.removeEventListener("mousemove", mousemove);
            window.removeEventListener("mouseup", mouseup);
        }
    }
}

// Funzione che stampa la barra graduata, viene richiamata ad ogni modifica della timetable
function printMeter() {
    meter.innerHTML = "";
    scale.innerHTML = "<div style='left:0px;' class='scale-num'>00:00</div>";
    timeTable.forEach((item, index) => {
        const leftPosition = (1200/1440)*item.timeStart;
        const widthSize = (1200/1440)*(item.timeEnd - item.timeStart);
        if (index % 2 == 0) {
            if (index == 0) {
                meter.innerHTML += 
                "<div style='left:" + leftPosition + "px; width:" + widthSize + "px;' class='box even' id='box-" + (index+1) + "'> 20°C </div>";
            } else {
                meter.innerHTML +=
                "<div style='left:" + leftPosition + "px; width:" + widthSize + "px;' class='box even' id='box-" + (index+1) + "'> 20°C <div class='resizer' id='resizer-" + (index) +"'></div></div>";
            }
        } else {
            meter.innerHTML +=
            "<div style='left:" + leftPosition + "px; width:" + widthSize + "px;' class='box odd' id='box-" + (index+1) + "'> 20°C <div class='resizer' id='resizer-" + (index) +"'></div></div>";
        }

        
        if(index > 0 && (item.timeStart - timeTable[index - 1].timeStart > 60 && 1440 - item.timeStart > 60)) {
            scale.innerHTML += "<div style='left:" + leftPosition + "px;' class='scale-num'>" + minuteToDatetime(Math.floor(item.timeStart)) + "</div>"
        }
    })
    scale.innerHTML += "<div style='left:100%;' class='scale-num'>00:00</div>";

    box_1 = document.getElementById("box-1");
    box_2 = document.getElementById("box-2");
    box_3 = document.getElementById("box-3");
    box_4 = document.getElementById("box-4");
    box_5 = document.getElementById("box-5");
    box_6 = document.getElementById("box-6");
    box_7 = document.getElementById("box-7");
    box_8 = document.getElementById("box-8");
    box_9 = document.getElementById("box-9");

    resizer_1 = document.getElementById("resizer-1");
    resizer_2 = document.getElementById("resizer-2");
    resizer_3 = document.getElementById("resizer-3");
    resizer_4 = document.getElementById("resizer-4");
    resizer_5 = document.getElementById("resizer-5");
    resizer_6 = document.getElementById("resizer-6");
    resizer_7 = document.getElementById("resizer-7");
    resizer_8 = document.getElementById("resizer-8");

    box_1.addEventListener("mousedown", (e) => {
        translate(e, 0);
    });
    box_2.addEventListener("mousedown", (e) => {
        translate(e, 1);
    });
    box_3.addEventListener("mousedown", (e) => {
        translate(e, 2);
    });
    box_4.addEventListener("mousedown", (e) => {
        translate(e, 3);
    });
    box_5.addEventListener("mousedown", (e) => {
        translate(e, 4);
    });
    box_6.addEventListener("mousedown", (e) => {
        translate(e, 5);
    });
    box_7.addEventListener("mousedown", (e) => {
        translate(e, 6);
    });
    box_8.addEventListener("mousedown", (e) => {
        translate(e, 7);
    });
    box_9.addEventListener("mousedown", (e) => {
        translate(e, 8);
    });

    resizer_1.addEventListener("mousedown", (e) => {
        resize(e, 1);
    })
    resizer_2.addEventListener("mousedown", (e) => {
        resize(e, 2);
    })
    resizer_3.addEventListener("mousedown", (e) => {
        resize(e, 3);
    })
    resizer_4.addEventListener("mousedown", (e) => {
        resize(e, 4);
    })
    resizer_5.addEventListener("mousedown", (e) => {
        resize(e, 5);
    })
    resizer_6.addEventListener("mousedown", (e) => {
        resize(e, 6);
    })
    resizer_7.addEventListener("mousedown", (e) => {
        resize(e, 7);
    })
    resizer_8.addEventListener("mousedown", (e) => {
        resize(e, 8);
    })
}

// Funzione che resetta il termostato e riposiziona i box in modo che siano equidistanziati
function resetTimeTable() {
    timeTable.forEach((item, index) => {
        item.timeStart = 160*index;
        item.timeEnd = 160*(index+1);
    })
    printMeter();
}

// Funzione che converte la time table 
function convertTimeTable() {
    let timeTableJSON = JSON.stringify(timeTable); // La timetable viene convertita il JSON pronta per essere esportata
    console.log(timeTableJSON);
}

// Funzione per convertire i minuti in orari della giornata
function minuteToDatetime(int) {
    const hours = Math.floor(int/60) < 10 ? '0' + Math.floor(int/60) : Math.floor(int/60);
    const minutes = int%60 < 10 ? '0' + int%60 : int%60;
    return hours + ":" + minutes
}
