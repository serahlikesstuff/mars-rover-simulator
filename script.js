const openBtn = document.querySelector(".open-modal-btn");
const modal = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close-modal-btn");
const sd = document.querySelector(".sd");

function openModal() {
    modal.classList.remove("hide");
    sd.classList.add("hide");
}


function closeModal(e, clickedOutside) {
    if (clickedOutside) {
        if (e.target.classList.contains("modal-overlay"))
            modal.classList.add("hide");
            sd.classList.remove("hide");
    } else modal.classList.add("hide");
}

openBtn.addEventListener("click", openModal);
modal.addEventListener("click", (e) => closeModal(e, true));
closeBtn.addEventListener("click", closeModal);


// IMAGE SLIDER
const slides = document.querySelectorAll(".slides .slide");
let slideIndex = 0;
let intervalId = null;

//initializeSlider()
document.addEventListener("DOMContentLoaded", initializeSlider)

function initializeSlider(){
    if(slides.length>0){
        slides[slideIndex].classList.add("displaySlide");
        intervalId = setInterval(nextSlide, 10000);
        console.log(intervalId);
    }
}
function showSlide(index){

    if(index >= slides.length){
            slideIndex = 0;
    }
    else if(index < 0){
        slideIndex = slides.length -1;
    }

    slides.forEach(slide => {
        slide.classList.remove("displaySlide");
    });
    slides[slideIndex].classList.add("displaySlide");
}
function prevSlide(index){
    clearInterval(intervalId);
    slideIndex--;
    showSlide(slideIndex);
}
function nextSlide(){
    slideIndex++;
    showSlide(slideIndex);
}



const form = document.getElementById("roverForm");

let myChart;
let myLineChart;
const CorrectSound = new Audio('freesound_community-short-success-sound-glockenspiel-treasure-video-game-6346.mp3');
CorrectSound.src = 'freesound_community-short-success-sound-glockenspiel-treasure-video-game-6346.mp3';
document.getElementById('C4')


form.addEventListener("submit", function(event) {

    event.preventDefault();

    // INPUTS

    const massInput = document.getElementById("mass");
    const radiusInput = document.getElementById("radius");
    const torqueInput = document.getElementById("torque");
    const wheelInput = document.getElementById("wheel");
    const velocityInput = document.getElementById("uvelocity");
    const frictionInput = document.getElementById("friction");
    const displacementInput = document.getElementById("displacement");
    const angleInput = document.getElementById("angle");
    const Cr = document.getElementById("rollingResistanceCoefficient");


    // VALUES

    const Crr = Cr.valueAsNumber;
    const mass = massInput.valueAsNumber;
    const displacement = displacementInput.valueAsNumber;
    const radius = radiusInput.valueAsNumber;
    const torque = torqueInput.valueAsNumber;
    const wheel = wheelInput.valueAsNumber;
    const friction = frictionInput.valueAsNumber;
    const uvelocity = velocityInput.valueAsNumber;
    const angle = angleInput.valueAsNumber;

    if (Crr <= 0 || mass <= 0 || displacement <= 0 || torque <= 0 || wheel <= 0 || friction <= 0 || angle < 0 || angle >= 90){
        alert("value is invalid, please reenter");
        return;
    }
    // CONSTANT

    const gravity = 3.71;


    // CALCULATIONS

    const angleRadians = angle * Math.PI / 180;

    const propulsion = (wheel * torque) / radius;

    const normalForce =
        mass * gravity * Math.cos(angleRadians);

    const frictionmax =
        friction * normalForce;

    const rollingResistance =
        Crr * normalForce;

    const slopeResistance =
        mass * gravity * Math.sin(angleRadians);

    const resistance =
        rollingResistance + slopeResistance;

    const netForce =
        propulsion - resistance;

    const acceleration =
        netForce / mass;

    if (acceleration <= 0 && uvelocity <= 0) {
        alert("The rover cannot move forward with the current inputs.");
        return;
    }

let time;
let finalVelocity;

function position(time, uvelocity, acceleration, finalVelocity){
    const sdis = [];
    const timeInput = [];

    //consistency
    const intervals = 20;

        for(let i = 0; i <= intervals; i++){
            const t = (time / intervals) * i;
            const sPreround =
            uvelocity * t +
            0.5 * acceleration * t ** 2;
            const s = Math.round(sPreround);
            //dont forget const for calculations
            timeInput.push(t);
            sdis.push(s);

        }
        return {
        time: timeInput,
        displacement: sdis
    };
}

if (acceleration === 0) {

    if (uvelocity > 0) {
        time = displacement / uvelocity;
        finalVelocity = uvelocity;
    } else {
        alert("The rover cannot reach the requested displacement.");
        return;
    }

} else {

    const discriminant =
        uvelocity ** 2 + 2 * acceleration * displacement; //[sqrt(u^2 + 2as)-u]/a==> using discriminnt

    if (discriminant < 0) {
        alert("The rover cannot reach the requested displacement with these inputs."); //no real solutions
        return;
    }

    const sqrtDiscriminant = Math.sqrt(discriminant);

    const time1 = (-uvelocity + sqrtDiscriminant) / acceleration;
    const time2 = (-uvelocity - sqrtDiscriminant) / acceleration;

    // Choose the positive time from driscrimanent options
    const possibleTimes = [time1, time2].filter(t => t >= 0); //making an array if there's 2 positive values (only keep t>= 0)
    
    if (possibleTimes.length === 0) {
        alert("The rover cannot reach the requested displacement with these inputs."); // if the langth of an array item is [] 0, the program can't usee it
        return;
    }

    time = Math.min(...possibleTimes); //choose the shortest out of the 2 positive times

    finalVelocity =
        uvelocity + acceleration * time;
}
    // TEST

    const positionData = position(time, uvelocity, acceleration);

    console.log("Mass:", mass);
    console.log("Radius:", radius);
    console.log("Torque:", torque);
    console.log("Wheels:", wheel);
    console.log("Initial velocity:", uvelocity);
    console.log("Angle:", angle);
    console.log("Displacement:", displacement);
    console.log("Friction:", friction);

    console.log("Propulsion:", propulsion);
    console.log("Normal force:", normalForce);
    console.log("Maximum friction:", frictionmax);
    console.log("Rolling resistance:", rollingResistance);
    console.log("Slope resistance:", slopeResistance);
    console.log("Resistance:", resistance);
    console.log("Net force:", netForce);
    console.log("Acceleration:", acceleration);
    console.log("Time:", time);
    console.log("Final velocity:", finalVelocity);

document.getElementById("finalVelocity").innerHTML =
    `🛞 Final velocity: ${finalVelocity.toFixed(2)} m/s`;    document.getElementById("Normal").innerHTML = normalForce;
    document.getElementById("resistancee").innerHTML = resistance;
    document.getElementById("accel").innerHTML = acceleration;
    document.getElementById("fmax").innerHTML = frictionmax;
    document.getElementById("time").innerHTML =  time;
    if(propulsion>resistance){
        document.getElementById("motion").innerHTML = "moves";
    }
    else if(resistance === propulsion){
        document.getElementById("motion").innerHTML = "stationary";
    }
    else if(resistance>propulsion){
        document.getElementById("motion").innerHTML = "moves backwards";
    }

    if(frictionmax<propulsion){
        alert("⚠️propulsion is greater than the maximum friction, risk of wheel slip⚠️")
    }
    else{
        C4.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
        alert("No risk of wheel slip!");
        CorrectSound.play();
             if (typeof confetti === "function") {
                confetti();
            }
    }
    // CHART
    

    const barColors = [
  "rgba(11, 83, 75, 0.76)",
  "rgba(22, 148, 134, 0.76)",
  "rgba(42, 218, 197, 0.76)"
];
    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart("myChart", {

        type: "bar",

        data: {
            
            labels: [
                "Propulsion",
                "Resistance",
                "Net force"
            ],

            backgroundColor: barColors,


            datasets: [{
                data: [
                    propulsion,
                    resistance,
                    netForce
                ]
            }]
        },
          options: {
            plugins: {
            legend: { display: false },
            text: "Propulsion, Resistance and Net Force",

            }}
    });
    if (myLineChart) {
        myLineChart.destroy();
    }

    myLineChart = new Chart("myLineChart", {
    type: "line",
    data: {
        labels: positionData.time,

        datasets: [{
        label: "Displacement",
        data: positionData.displacement,        
        backgroundColor:"rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        
        }]
  },
 options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Time (s)"
                }
            },

            y: {
                title: {
                    display: true,
                    text: "Displacement (m)"
                }
            }
        }
    }
});

});

