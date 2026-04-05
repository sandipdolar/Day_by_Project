const addBookmarkBtn = document.getElementById("add-bookmark");
const bookmarkList = document.getElementById("bookmark-list");
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");


document.addEventListener("DOMContentLoaded", loadBookmarks);

addBookmarkBtn.addEventListener("click", function () {
    const name = bookmarkNameInput.value.trim();
    const url = bookmarkUrlInput.value.trim();
    if (!name || !url) {
        alert("Please enter both name & URL");
        return;
    } else {
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            alert("Please enter the valid URL starting with http:// ot https://");
            return;
        }

        addBookmark(name, url);
        saveBookmark(name, url);
        bookmarkNameInput.value = "";
        bookmarkUrlInput.value = "";
    }
})

function addBookmark(name, url) {
    const li = document.createElement("li");
    const link = document.createElement("a");

    link.href = url;
    link.textContent = name;
    link.target = "_blank";
    li.draggable = "true";

    li.addEventListener("dragstart", function () {
        setTimeout(() => {
            this.style.display = "none";
        }, 0);
    });

    li.addEventListener("dragend", function () {
        this.style.display = "flex";
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", function () {
        bookmarkList.removeChild(li);
        removeBookmarkFromStorage(name, url);
    });

    li.appendChild(link);
    li.appendChild(removeBtn);

    bookmarkList.appendChild(li);
}

function getBookmarkFromStorage() {
    const bookmarks = localStorage.getItem("bookmarks");
    return bookmarks ? JSON.parse(bookmarks) : [];
}

function saveBookmark(name, url) {
    const bookmarks = getBookmarkFromStorage();
    bookmarks.push({ name, url });

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function loadBookmarks() {
    const bookmarks = getBookmarkFromStorage();
    bookmarks.forEach((bookmark) => addBookmark(bookmark.name, bookmark.url));
}

function removeBookmarkFromStorage(name, url) {
    let bookmarks = getBookmarkFromStorage();

    bookmarks = bookmarks.filter((bookmark) => bookmark.name !== name || bookmark.url !== url);

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}