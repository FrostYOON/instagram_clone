// DOM 요소 가져오기
const postModal = document.querySelector('.add-post-modal');
const addPostButton = document.querySelector('#add-post');

const profileEditButton = document.querySelector('#profile-edit');
const profileEditModal = document.querySelector('.profile-edit-modal');

// 모달 열기
addPostButton.addEventListener('click', () => {
  postModal.showModal();
});

profileEditButton.addEventListener('click', () => {
  profileEditModal.showModal();
});

// 모달 닫기
// closeModalButton.addEventListener('click', () => {
//   postModal.close();
// });