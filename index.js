// 기본 프로필 정보
const defaultProfile = {
  id: "ysyoon",
  img: "./assets/default_profile.svg",
  name: "윤용설",
  description: "안녕하세요! 백엔드를 공부하고 있습니다.",
  website: "https://www.naver.com",
  posts: 0,
  followers: 99,
  follows: 99,
}

// 포스트 요소 가져오기
const addPostModal = document.querySelector('.add-post-modal');
const addPostModalView = document.querySelector('.add-post-modal-view');
const addPostModalUpdate = document.querySelector('.add-post-modal-update');
const addPostModalFile = document.querySelector('#add-post-file');
const addPostModalContent = document.querySelector('.add-post-modal-content');
const addPostModalImage = document.querySelector('.add-post-modal-image');
const addPostModalTextarea = document.querySelector('.add-post-modal-textarea');

// 모달 버튼 요소 가져오기
const addPostModalButton = document.querySelector('#add-post');
const addPostModalShareButton = document.querySelector('#add-post-share');

// 포스트 요소 가져오기
const postsGallary = document.querySelector('.posts-gallary');

// 프로필 요소 가져오기
const profileImage = document.querySelector('#profile-image');
const profileId = document.querySelector('#profile-id');
const profileName = document.querySelector('#profile-content-name');
const profileDescription = document.querySelector('#profile-content-description');
const profileWebsiteLink = document.querySelector('#profile-content-website-link');
const profilePosts = document.querySelector('#profile-posts');
const profileFollowers = document.querySelector('#profile-followers');
const profileFollows = document.querySelector('#profile-follows');

// 프로필 수정 요소 가져오기
const profileEditImage = document.querySelector('#profile-edit-image');
const profileEditUploadImage = document.querySelector('#profile-edit-upload-image');
const profileEditId = document.querySelector('#profile-edit-id');
const profileEditName = document.querySelector('#profile-edit-name');
const profileEditDescription = document.querySelector('#profile-edit-description');
const profileEditWebsite = document.querySelector('#profile-edit-website');

// 프로필 수정 모달 요소 가져오기
const profileEditButton = document.querySelector('#profile-edit');
const profileEditModal = document.querySelector('.profile-edit-modal');
const profileEditSaveButton = document.querySelector('#profile-edit-save');

// 모달 닫기 버튼 요소 가져오기
const CloseButton = document.querySelector('.modal-close-button');

// 페이지 로드 시 프로필 정보 업데이트
window.addEventListener("load", () => {
  profileUI();
  defaultEvent();
})

// 기본 이벤트 리스너 등록
function defaultEvent() {
  profileEditButton.addEventListener('click', () => {
    profileEditModal.showModal();
  });

  profileEditSaveButton.addEventListener('click', profileEditSave);

  addPostModalButton.addEventListener('click', () => {
    addPostModal.showModal();
  });
  
  CloseButton.addEventListener('click', (e) => {
    if (e.target === profileEditModal) {
      profileEditModal.close();
      profileUI();
    }else if(e.target === addPostModal) {
      addPostModal.close();
    }
  });

  addPostModal.addEventListener('click', (event) => {
    dialogOut(event);
  });

  profileEditModal.addEventListener('change', (event) => {
    updateImage(event);
  });

  profileEditModal.addEventListener('click', (event) => {
    dialogOut(event);
  });
}

// 프로필 UI 업데이트
function profileUI() {
  const profile = JSON.parse(localStorage.getItem('profile')) || defaultProfile;

  document.title = `${profile.name}(@${profile.id}) • Instagram`;

  profileImage.setAttribute('src', profile.img);
  profileId.textContent = profile.id;
  profileName.textContent = profile.name;
  profileDescription.textContent = profile.description;
  profileWebsiteLink.textContent = profile.website;
  profileWebsiteLink.setAttribute('href', profile.website);
  profilePosts.querySelector("Strong").textContent = profile.posts;
  profileFollowers.querySelector("Strong").textContent = profile.followers;
  profileFollows.querySelector("Strong").textContent = profile.follows;

  profileEditImage.setAttribute('src', profile.img);
  profileEditId.value = profile.id;
  profileEditName.value = profile.name;
  profileEditDescription.value = profile.description;
  profileEditWebsite.value = profile.website;
}

// 프로필 수정 저장
function profileEditSave() {
  const { id, img, name, description, website, ...rest } = JSON.parse(localStorage.getItem('profile')) || defaultProfile;

  const newProfile = {
    id: profileEditId.value,
    img: profileEditImage.getAttribute('src'),
    name: profileEditName.value,
    description: profileEditDescription.value,
    website: profileEditWebsite.value,
    ...rest,
  }

  localStorage.setItem('profile', JSON.stringify(newProfile));
  profileUI();
}

// 프로필 정보 업데이트
function updateProfile(newProfile) {
  localStorage.setItem('profile', JSON.stringify(newProfile));
  profileUI();
}

// 프로필 이미지 업데이트
function updateImage(e) {
  const file = e.target.files[0];
  if(file){
    const reader = new FileReader()
    reader.onload = function(e) {
      const imageData = e.target.result;
      profileEditImage.setAttribute('src', imageData);
    }
    reader.readAsDataURL(file)
  }
}

// 프로필 수정 모달 외부 클릭 시 모달 닫기
function dialogOut(event) {
  if (event.target === addPostModal) {
    addPostModal.close();
  }else if(event.target === profileEditModal) {
    profileEditModal.close();
  }
}
