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

    // Dynamic title
    document.title = document.querySelector("#content h2").innerText + " | Health Education";
  }
}