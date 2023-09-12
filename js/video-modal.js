import { closeModal, qySel, videoResize } from "./functions.js";

qySel('.video-modal .modal-close-btn').addEventListener('click', e => {
  qySel('.video-modal iframe').src = '' /* 창 닫을때 영상도 같이 꺼주기, why? 영상이 계속 돌아가면  */
  closeModal('.video-modal')
})//click

window.addEventListener('resize', ()=>{
  videoResize()
})

