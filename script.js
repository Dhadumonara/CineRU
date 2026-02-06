const AD_URL = "https://your_ad_link_here";
const PASS = "2004";

let movies = [];

let curL="",editIndex=null;

function filterMovies(){
    let v=searchBar.value.toLowerCase();
    document.querySelectorAll(".card").forEach((c,i)=>{
        c.style.display = movies[i].t.toLowerCase().includes(v)?"":"none";
    });
}

function render(){
    movieGrid.innerHTML = movies.map((m,i)=>`
        <div class="card" onclick="openGate(${i})">
            <img src="${m.i}">
            <div class="card-info"><b>${m.t}</b></div>
        </div>
    `).join('');
    output.value = `let movies = ${JSON.stringify(movies,null,4)};`;
}

function openGate(i){
    curL = movies[i].l;
    mTitle.innerText = movies[i].t;
    modal.style.display="flex";
    s2.classList.add("off");
    s3.classList.add("off");
}

function step(s){
    window.open(AD_URL,'_blank');
    if(s==1)s2.classList.remove("off");
    if(s==2)s3.classList.remove("off");
    if(s==3)location.href=curL;
}

logo.onmousedown=logo.ontouchstart=()=>timer=setTimeout(()=>passModal.style.display='flex',1500);
logo.onmouseup=logo.ontouchend=()=>clearTimeout(timer);

function verifyPass(){
    if(pInput.value===PASS){
        passModal.style.display="none";
        admin.style.display="flex";
        drawAdm();
    } else alert("Wrong Password");
}

function previewPoster(url){
    posterPreview.src=url;
    posterPreview.style.display=url?"block":"none";
}

function addM(){
    let t=inT.value.trim(),i=inI.value.trim(),l=inL.value.trim(),c=inC.value||"Other";
    if(!t||!i||!l)return alert("Fill all fields");

    if(editIndex!==null){
        movies[editIndex]={t,i,l,c};
        editIndex=null;
    } else movies.unshift({t,i,l,c});

    inT.value=inI.value=inL.value="";inC.value="";
    posterPreview.style.display="none";
    render();drawAdm();
}

function editM(i){
    let m=movies[i];
    inT.value=m.t;inI.value=m.i;inL.value=m.l;inC.value=m.c;
    previewPoster(m.i);
    editIndex=i;
}

function delM(i){
    if(confirm("Delete movie?")){
        movies.splice(i,1);
        render();drawAdm();
    }
}

function drawAdm(){
    let s=admSearch.value.toLowerCase();
    admList.innerHTML = movies.map((m,i)=>({m,i}))
    .filter(x=>x.m.t.toLowerCase().includes(s))
    .map(x=>`
        <div style="border-bottom:1px solid #222;padding:6px">
            <b>${x.m.t}</b> (${x.m.c})
            <br>
            <span onclick="editM(${x.i})" style="color:lime;cursor:pointer">Edit</span> |
            <span onclick="delM(${x.i})" style="color:red;cursor:pointer">Delete</span>
        </div>
    `).join('');
    output.value = `let movies = ${JSON.stringify(movies,null,4)};`;
}

render();
