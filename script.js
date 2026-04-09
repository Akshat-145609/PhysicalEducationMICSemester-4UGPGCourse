/* ---------------- TOPIC ORDER ---------------- */
const topics = Object.keys(content_db);
let index = 0;

/* ---------------- RENDER ---------------- */
function render(id){
  if(content_db[id]){
    document.getElementById("content").innerHTML = content_db[id];
  } else {
    document.getElementById("content").innerHTML = "<h2>Content Not Found</h2>";
  }
}

/* ---------------- NAVIGATE ---------------- */
function navigate(id){

  index = topics.indexOf(id);

  render(id);
  closeSidebar();

  // Update URL without reload
  history.pushState({id:id}, "", "?topic=" + id);

  saveProgress(id);
}

/* ---------------- NEXT ---------------- */
function next(){
  index = (index + 1) % topics.length;
  navigate(topics[index]);
}

/* ---------------- PREV ---------------- */
function prev(){
  index = (index - 1 + topics.length) % topics.length;
  navigate(topics[index]);
}

/* ---------------- LOAD FROM URL ---------------- */
function loadFromURL(){
  const params = new URLSearchParams(window.location.search);
  const topic = params.get("topic");

  if(topic && content_db[topic]){
    render(topic);
  } else {
    render("u1t1");
  }
}

/* ---------------- BACK BUTTON ---------------- */
window.onpopstate = function(e){
  if(e.state && e.state.id){
    render(e.state.id);
  } else {
    loadFromURL();
  }
};

/* ---------------- INITIAL LOAD ---------------- */
loadFromURL();

function render(id){
  if(content_db[id]){
    document.getElementById("content").innerHTML = content_db[id];

    // 🔥 Auto scroll to top (smooth)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    // Dynamic title (SEO)
    document.title = document.querySelector("#content h2")?.innerText + " | Health Education";
  }
}

/* ---------------- UNIVERSAL SIDEBAR SWIPE ---------------- */

const sidebar = document.getElementById("sidebar");

let startX = 0;
let currentX = 0;
let isDragging = false;

/* -------- START (TOUCH + MOUSE) -------- */
function start(e){
  isDragging = true;
  startX = e.touches ? e.touches[0].clientX : e.clientX;
}

/* -------- MOVE -------- */
function move(e){
  if(!isDragging) return;

  currentX = e.touches ? e.touches[0].clientX : e.clientX;
  let diff = currentX - startX;

  // OPEN (from left edge only)
  if(startX < 50 && diff > 60){
    sidebar.classList.add("active");
  }

  // CLOSE
  if(diff < -60){
    sidebar.classList.remove("active");
  }
}

/* -------- END -------- */
function end(){
  isDragging = false;
}

/* -------- TOUCH EVENTS -------- */
document.addEventListener("touchstart", start);
document.addEventListener("touchmove", move);
document.addEventListener("touchend", end);

/* -------- MOUSE EVENTS (DESKTOP SUPPORT) -------- */
document.addEventListener("mousedown", start);
document.addEventListener("mousemove", move);
document.addEventListener("mouseup", end);

const overlay = document.getElementById("overlay");

function openSidebar(){
  sidebar.classList.add("active");
  overlay.classList.add("active");
}

function closeSidebar(){
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
}

overlay.addEventListener("click", closeSidebar);

if(startX < 50 && diff > 60){
  openSidebar();
}

if(diff < -60){
  closeSidebar();
}  

function visitHome(){
  window.location.href = "https://akshat-881236.github.io/AkshatNetworkHub/HealthEducationFirstAidKitandSafetyEducation.htm";
}

/* Close another sidebar unit topics when another is opened */
function toggleUnit(element){
  const allUnits = document.querySelectorAll(".unit .topic"); 
  allUnits.forEach(unit => {
    if(unit !== element.querySelector(".topic")){
      unit.style.display = "none";
    }
  });

  const topic = element.querySelector(".topic");
  if(topic.style.display === "block"){
    topic.style.display = "none";
  } else {
    topic.style.display = "block";
  }
}