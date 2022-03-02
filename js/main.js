const GETALL = (e)=>{return document.querySelectorAll(e);}
const GETNUMB = (e)=>{return document.querySelectorAll(e).length;}


function powerpoint_global_tabs(tab,  header, container, ct, hl, active_element){
    const maintab = GETALL(tab);
    if (maintab.length >= 1){
        const Current_tab = maintab[0];
        const Current_header = Current_tab.querySelector(header);
        const Current_container = Current_tab.querySelector(container);
        const Current_header_links = Current_header.querySelectorAll(hl); 
        const Current_container_elements = Current_container.querySelectorAll(ct);
        for(let i = 0; i < Current_header_links.length; i++){
            Current_header_links[i].onclick = ()=>{ 
                Current_header.querySelector("."+active_element).classList.remove(active_element);
                Current_header_links[i].classList.add(active_element);
                Current_container.querySelector("."+active_element).classList.remove(active_element);
                Current_container_elements[i].classList.add(active_element);
            }
        }
    }
}




function generate_elements(){
  if(GETNUMB(".input-cell-container") >= 1  && GETNUMB(".left-bar") >= 1 && GETNUMB(".columns-name") >= 1){

    const inputs_container = GETALL(".input-cell-container")[0];
    const left_bar_numbers = GETALL(".left-bar")[0];
    const columns_container = GETALL(".columns-name")[0];

    console.log("oi");

    for(let i = 1; i <= 100; i++){
         /**Generate letters */
            let answer = "";
            let x = i;
            while (x > 0){
                const remain = x % 26;
                if (remain == 0){
                    answer += "Z";
                    x = Math.floor(x/26) -1;
                }else{
                    answer +=  String.fromCharCode(remain -1+65);
                    x = Math.floor(x/26); 
                }
            }
           let column  = $(`<div class="column-name colId-${i}" id="col-code-${answer} code-id-${i}">${answer}<div class="mv-cl" col-code="${answer}"></div></div>`);
           $(columns_container).append(column); 

           let row = $(`<div class="row-name" id="rowCode-${i}">${i}</div>`);
           $(left_bar_numbers).append(row); 
        /**end */


    }

    for (let i = 1; i <= 100; i++) {
        let row = $(`<section class="cell-row"></section>`);
        for (let k = 1; k <= 100; k++) {
            let colcode = $(`.colId-${k}`).attr("id").split("-")[1];
            let column = $(`<div  contenteditable="true" class="form-control input" code-id-${i}" id="row-${i}-col-${k}" data-input="input-code-${colcode}"> </div>`);
            row.append(column);
        }
        $(inputs_container).append(row);
    }




  }
}




function powerpoint_context_menu(){
    let container = document.querySelector(".input-cell-container");

         /**Get mouse cordenates */
         container.onmousemove = (target)=>{
            // console.table(target); 
            
            let x = target.offsetX/2;
            let y = target.offsetY/2; 

         

             container.oncontextmenu = (e)=>{ 
                e.preventDefault();
                let title = document.querySelector(".sheet-title h5");
                title.innerHTML = "Context menu principal";
                const contextmenu = document.querySelector(".main-contextmenu");
              //  contextmenu.classList.toggle("showmenu");

               contextmenu.style.left = x+5+"px";
               contextmenu.style.top = y+5+"px";



                setInterval(() => {
                    title.innerHTML = "My document title *";
                }, 1000);




         }
    }
}

 

function simple_toggle(btn, container,  active){
    const BUTTONS = GETALL(btn);
    if(BUTTONS.length >= 1){
      if(GETNUMB(container) >= 1){
       const main = document.querySelector(container);
        BUTTONS.forEach(btn => {
            btn.onclick = ()=>{
                main.classList.toggle(active); 
            }
        });
      }
    }
}








 

//Call functions

function call() {
generate_elements();
 

powerpoint_global_tabs(
    ".powerpoint-tab",
    ".powerpoint-tab-header",
    ".powerpoint-tab-body",
    "aside",
    "ul .tab-link",
    "active"
);

simple_toggle(".toggle-explorer-panel", ".file-explorer", "show-explorer");
}
setTimeout(() => {call()}, 100);