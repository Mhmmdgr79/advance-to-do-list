const themeswitch=document.getElementById("theme-switcher");
const bodyTag=document.querySelector("body");
const inputvalue=document.querySelector("#addt");
const addvalue=document.querySelector("#add-btn");
const ul=document.querySelector(".todos");

themeswitch.addEventListener("click",()=>{
  bodyTag.classList.toggle("light");
  const imagebtn=themeswitch.children[0];
   imagebtn.setAttribute(
    "src" , 
    imagebtn.getAttribute("src")=== "./assets/images/icon-sun.svg" ? "./assets/images/icon-moon.svg":"./assets/images/icon-sun.svg"
  );
 
})
addvalue.addEventListener("click",insertdb);
function insertdb(){
 const items= inputvalue.value.trim();
 if(items){
  inputvalue.value="";
  const localitem=!localStorage.getItem("key") ?[]:JSON.parse(localStorage.getItem("key"));
  const additem={
    items:items,
    Iscomplete:false
  }
 localitem.push(additem);
 localStorage.setItem("key",JSON.stringify(localitem));
 }

}
document.addEventListener("DOMContentLoaded", main);
function main(){
  ul.addEventListener("dragover",(e)=>{
    if(e.target.classList.contains("card") && !e.target.classList.contains("drag")){
     const dragitem=document.querySelector(".drag");
     const liitem=[...document.querySelectorAll(".card")];
     const selectitem=liitem.indexOf(dragitem);
     const drageditem=liitem.indexOf(e.target);
     if(selectitem>drageditem){
       ul.insertBefore(dragitem,e.target);
     }
     else{
       ul.insertBefore(dragitem,e.target.nextsibling);
     }
    }
   })
  const listitem=JSON.parse(localStorage.getItem("key"));
  listitem.forEach(element => {
    const lilist=document.createElement("li");
    const div=document.createElement("div");
    const input=document.createElement("input");
    const span=document.createElement("span");
    const p=document.createElement("p");
    const btn=document.createElement("button");
    const image=document.createElement("image");

    div.appendChild(input);
    div.appendChild(span);
    p.textContent=element.items;
    btn.appendChild(image);
    lilist.appendChild(div)
    lilist.appendChild(p);
    lilist.appendChild(btn);
    document.querySelector(".todos").appendChild(lilist);


    lilist.classList.add("card");
    lilist.setAttribute("draggable", true);
    div.classList.add("cb-container");
    input.type="checkbox";
    input.classList.add("cb-input");
    span.classList.add("check");
    p.classList.add("item");
    btn.classList.add("clear");
    image.setAttribute("src","./assets/images/icon-cross.svg");
/*add event*/

ul.addEventListener("dragstart",(e)=>{
e.target.classList.add("drag");
ul.addEventListener("dragend",(e)=>{
  e.target.classList.remove("drag");
})
})
  });
   
  
}
