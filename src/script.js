let topEl = document.getElementById("top")
let topNum = 0;
let bottomEl = document.getElementById("bottom")
let bottomNum = 0;
let answer = topNum*bottomNum
let answerEl = document.getElementById("answer")

let time = 60;
let streak = 0;
let streakEl = document.getElementById("streak")
let highStreakEl = document.getElementById("highStreak")

let topUsed = []
let bottomUsed = []
let missed = []
let maxTop = 10
let maxBottom = 10

let searchParams = new URLSearchParams(window.location.search)
if(!isNaN(parseInt(searchParams.get("maxTop"))))maxTop = parseInt(searchParams.get("maxTop"))
if(!isNaN(parseInt(searchParams.get("maxBottom"))))maxBottom = parseInt(searchParams.get("maxBottom"))

document.getElementById("maxTop").textContent = maxTop
document.getElementById("maxBottom").textContent = maxBottom

let highName = "high"+maxTop+"*"+maxBottom
highStreakEl.textContent = localStorage.getItem(highName)

function newQuestion(){
  if(topUsed.length>=maxTop||bottomUsed.lenght>=maxBottom){
    topUsed = []
    bottomUsed = []
  }
  
  if(Math.round(Math.random()*3)==1&&missed.length>=1){
    let m = missed.shift().split("*").reverse()
    topNum = m[0]
    bottomNum = m[1]
  }else{
    topNum = Math.round(Math.random()*maxTop);
    bottomNum = Math.round(Math.random()*maxBottom);
    }
  topEl.textContent = topNum;
  bottomEl.textContent = bottomNum;
 
  
  answer = bottomNum*topNum
  if(topUsed.includes(topNum)||bottomUsed.includes(bottomNum)){
    newQuestion()
    return;
  }
  topUsed.push(topNum)
  bottomUsed.push(bottomNum)
}
function updateStreakEls(){
  if(streak>localStorage.getItem(highName))localStorage.setItem(highName, streak)
  streakEl.textContent = streak;
  highStreakEl.textContent = localStorage.getItem(highName)
}
document.getElementById("answerForm").addEventListener("submit", (ev)=>{
  ev.preventDefault()
  if(time<=0){
    alert("Time's up. The answer was: "+answer)
    time = 60;
  }else if(answerEl.value==""){
    return;
  }else if(answerEl.value!=answer){
    let asString = topNum+"*"+bottomNum
    let asString2 = asString+"≠"+answerEl.value
    missed.push(asString)
    let p = document.createElement("p")
    p.textContent = asString2
    document.getElementById("missed").appendChild(p)
    alert(`The answer was ${answer}. Your streak has been ended`)
    streak = 0;
    time = 60;
  }else{
    streak++;
  }
  updateStreakEls()
  answerEl.value = ""
  
  newQuestion()
})

setInterval(()=>{
  if(time>0)time--;
  document.getElementById("time").textContent = time+"/60"
}, 1000)

updateStreakEls()
newQuestion()