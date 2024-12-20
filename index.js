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
};

// 포스트 요소 가져오기
const addPostModal = document.querySelector(".add-post-modal");
const addPostModalFile = document.querySelector("#add-post-file");
const addPostModalContent = document.querySelector(".add-post-modal-content");
const addPostModalImage = document.querySelector(".add-post-modal-image");
const addPostModalTextarea = document.querySelector(".add-post-modal-textarea");

// 모달 버튼 요소 가져오기
const addPostModalButton = document.querySelector("#add-post");
const addPostModalShareButton = document.querySelector("#add-post-share");

// 포스트 요소 가져오기
const postsGallary = document.querySelector(".posts-gallary");

// 프로필 요소 가져오기
const profileImage = document.querySelector("#profile-image");
const profileId = document.querySelector("#profile-id");
const profileName = document.querySelector("#profile-content-name");
const profileDescription = document.querySelector(
  "#profile-content-description"
);
const profileWebsiteLink = document.querySelector(
  "#profile-content-website-link"
);
const profilePosts = document.querySelector("#profile-posts");
const profileFollowers = document.querySelector("#profile-followers");
const profileFollows = document.querySelector("#profile-follows");

// 프로필 수정 요소 가져오기
const profileEditImage = document.querySelector("#profile-edit-image");
const profileEditUploadImage = document.querySelector(
  "#profile-edit-upload-image"
);
const profileEditId = document.querySelector("#profile-edit-id");
const profileEditName = document.querySelector("#profile-edit-name");
const profileEditDescription = document.querySelector(
  "#profile-edit-description"
);
const profileEditWebsite = document.querySelector("#profile-edit-website");

// 프로필 수정 모달 요소 가져오기
const profileEditButton = document.querySelector("#profile-edit");
const profileEditModal = document.querySelector(".profile-edit-modal");
const profileEditSaveButton = document.querySelector("#profile-edit-save");

// 모달 닫기 버튼 요소 가져오기
const CloseButton = document.querySelector(".modal-close-button");

// 페이지 로드 시 프로필 정보 업데이트
window.addEventListener("load", () => {
  profileUI();
  postUI();
  defaultEvent();
});

// 기본 이벤트 리스너 등록
function defaultEvent() {
  profileEditButton.addEventListener("click", () => {
    profileEditModal.showModal();
  });

  profileEditSaveButton.addEventListener("click", profileEditSave);

  addPostModalButton.addEventListener("click", () => {
    addPostModal.showModal();
  });

  CloseButton.addEventListener("click", (e) => {
    if (e.target === profileEditModal) {
      profileEditModal.close();
      profileUI();
    } else if (e.target === addPostModal) {
      addPostModal.close();
    }
  });

  addPostModal.addEventListener("click", (event) => {
    dialogOut(event);
  });

  profileEditModal.addEventListener("change", (event) => {
    updateProfileImage(event);
  });

  profileEditModal.addEventListener("click", (event) => {
    dialogOut(event);
  });
}

// 프로필 UI 업데이트
function profileUI() {
  const profile = JSON.parse(localStorage.getItem("profile")) || defaultProfile;

  document.title = `${profile.name}(@${profile.id}) • Instagram`;

  profileImage.setAttribute("src", profile.img);
  profileId.textContent = profile.id;
  profileName.textContent = profile.name;
  profileDescription.textContent = profile.description;
  profileWebsiteLink.textContent = profile.website;
  profileWebsiteLink.setAttribute("href", profile.website);
  profilePosts.querySelector("Strong").textContent = profile.posts;
  profileFollowers.querySelector("Strong").textContent = profile.followers;
  profileFollows.querySelector("Strong").textContent = profile.follows;

  profileEditImage.setAttribute("src", profile.img);
  profileEditId.value = profile.id;
  profileEditName.value = profile.name;
  profileEditDescription.value = profile.description;
  profileEditWebsite.value = profile.website;
}

// 프로필 수정 저장
function profileEditSave() {
  const { id, img, name, description, website, ...rest } =
    JSON.parse(localStorage.getItem("profile")) || defaultProfile;

  const newProfile = {
    id: profileEditId.value,
    img: profileEditImage.getAttribute("src"),
    name: profileEditName.value,
    description: profileEditDescription.value,
    website: profileEditWebsite.value,
    ...rest,
  };

  localStorage.setItem("profile", JSON.stringify(newProfile));
  profileUI();
}

// 프로필 정보 업데이트
function updateProfile(newProfile) {
  localStorage.setItem("profile", JSON.stringify(newProfile));
  profileUI();
}

// 프로필 이미지 업데이트
function updateProfileImage(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageData = e.target.result;
      profileEditImage.setAttribute("src", imageData);
    };
    reader.readAsDataURL(file);
  }
}

function selectPost() {
  const allPostModal = Array.from(document.querySelectorAll("dialog.post-modal"));

  if (!allPostModal) return;

  const openPostModal = allPostModal.find(({ open }) => open);
  return openPostModal && openPostModal.parentNode.id;
}

function postUI() {
  const openedPostId = selectPost();
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  if (!posts.length) {
    postsGallary.classList.add("posts-gallary-empty");
    postsGallary.innerHTML = `<div class="posts-gallary-item-no-posts">
                                <div class="posts-gallary-item-no-posts-image">
                                  <img src="./assets/camera_icon.svg" alt="Camera_icon" />
                                </div>
                                <h3>게시물 없음</h3>
                              </div>`;
    return;
  } else {
    postsGallary.classList.remove("posts-gallary-empty");
    const postsGallaryItem = posts.reduce((pre, cur) => {
      return (pre +
        `<div class = "post" id="${cur.id}">
          <div class="post-likes-comments">
            <div class="post-likes-comments-icon">
              <img src="./assets/heart_icon.svg" alt="heart_icon" />
              <span>${cur.likes}</span>
            </div>
            <div class="post-likes-comments-icon">
              <img src="./assets/comment_icon.svg" alt="comment_icon" />
              <span>${cur.comments}</span>
            </div>
          </div>
          <img src="${cur.image}" alt="post-${cur.id}" />
          <dialog class="post-modal modal post-modal-view">
            <form action="" method="dialog">
              <div class="post-modal-header">
                <img class="post-image" src="${cur.image}" alt="post-${cur.id}" />
                <article class="post-text">${cur.text}</article>
                <div class="post-likes-comments-update">
                  <textarea class="post-text-update" placeholder="수정할 내용을 입력하세요.">${cur.text}</textarea>
                  <button class="post-update-button">수정</button>
                  <button class="post-cancel-button">취소</button>
                </div>
              </div>

              <div class="post-option-buttons">
                <button class="post-edit-button post-option-button">
                  <img src="./assets/edit_icon.svg" alt="Edit_icon" />
                </button>
                <button class="post-delete-button post-option-button">
                  <img src="./assets/delete_icon.svg" alt="Delete_icon" />
                </button>
              </div>

              <button class="modal-close-button">
                <img src="./assets/close_icon.svg" alt="Close_icon" />
              </button>
            </form>
          </dialog>
        </div>`
      );
    }, "");

    postsGallary.innerHTML = postsGallaryItem;

    posts.forEach((id, text) => {
      const post = document.querySelector(`post-${id}`);

      if (!post) return;

      const postModal = post.querySelector(".post-modal");

      if (openedPostId === `post-${id}`) {
        postModal.showModal();
      }

      post.addEventListener("click", () => {
        postModal.showModal();
      });

      postModal.querySelector(".modal-close-button").addEventListener("click", () => {
        postModalView(postModal, text);
      });

      post.querySelector(".post-edit-button").addEventListener("click", (e) => {
        e.preventDefault();
        postModalUpdate(postModal);
      });

      post.querySelector(".post-update-button").addEventListener("click", (e) => {
        e.preventDefault();

        updatePost(id, postModal.querySelector(".post-text-update").value);
      });

      post.querySelector(".post-cancel-button").addEventListener("click", (e) => {
        e.preventDefault();
        postModalView(postModal, text);
      });
    })
  }
}

function postModalView(postModal, originText) {
  postModal.classList.add("post-modal-view");
  postModal.classList.remove("post-modal-update");
  postModal.querySelector(".post-text-update").value = originText;
}

function postModalUpdate(postModal) {
  postModal.classList.add("post-modal-update");
  postModal.classList.remove("post-modal-view");
}

function createPost(image, text) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const newPost = {
    id: posts.length ? posts[posts.length - 1].id + 1 : 1,
    likes: 0,
    comments: 0,
    image,
    text,
  };

  posts.push(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));
}

function deletePost(id) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  if (!posts.length) return;

  localStorage.setItem("posts", JSON.stringify(posts.filter(({id: postId}) => id !== postId)));
  postUI();
}

function updatePost(id, text) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  if (!posts.length) return;

  localStorage.setItem("posts", JSON.stringify(posts.map(({id: postId, text: postText, ...rest}) => 
    id === postId ? { id: postId, text, ...rest } : { id: postId, text: postText, ...rest }
  )));

  postUI();
}

function addPostModalView() {
  addPostModal.classList.add("add-post-modal-view");
  addPostModal.classList.remove("add-post-modal-update");
}

function addPostModalUpdate() {
  addPostModal.classList.add("add-post-modal-update");
  addPostModal.classList.remove("add-post-modal-view");
}

function updatePostImage(e) {
  const post = e.target.files[0];
  if (post) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageData = e.target.result;
      addPostModalUpdate();
      addPostModalShareButton.addEventListener("click", () => {
        createPost(imageData, addPostModalTextarea.value);
        addPostModalTextarea.value = "";
        addPostModalView();
      }, { once: true });
      addPostModalImage.setAttribute("src", imageData);
    };
    reader.readAsDataURL(post);
  }
}

// 프로필 수정 모달 외부 클릭 시 모달 닫기
function dialogOut(event) {
  if (event.target === addPostModal) {
    addPostModal.close();
  } else if (event.target === profileEditModal) {
    profileEditModal.close();
  }
}
