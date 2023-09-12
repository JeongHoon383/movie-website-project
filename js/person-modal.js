import { closeModal, qySel, qySelAll } from "./functions.js";

qySel('.person-modal .modal-close-btn').addEventListener('click', e => {
  qySelAll('.person-modal ul').forEach(ul =>{
    ul.style.height = '200px'
  })
  closeModal('.person-modal')
})//click

qySelAll('.more-btn').forEach(button => {
  button.addEventListener('click', e=> {
    e.currentTarget.classList.toggle('active') /* 클릭 이벤트의 선택자를 찾아야 되기 때문에 current를 사용 */
    let ul = qySel(e.currentTarget.value)
    if(e.currentTarget.className.includes('active')){
      ul.style.height = ul.scrollHeight+ 'px'
    }else{
      ul.style.height = '200px'
    }
  })//click
})//forEach