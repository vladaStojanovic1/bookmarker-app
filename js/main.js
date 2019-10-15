// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e) {
    //Get form values
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;

    let bookmark = {
        name: siteName,
        url: siteUrl
    }

    // Test if bookmars is null
    if (localStorage.getItem('bookmars') === null) {
        // Init array        
        let bookmars = [];
        // Add to array
        bookmars.push(bookmark);
        // Set to LocalStorage
        localStorage.setItem('bookmars', JSON.stringify(bookmars));

    } else {
        // Get bookmars from localStorage
        let bookmars = JSON.parse(localStorage.getItem('bookmars'));
        // Add bookmark to array
        bookmars.push(bookmark);
        // Re-set back to LocalStorage
        localStorage.setItem('bookmars', JSON.stringify(bookmars));
    }

    // Re-fetch bookmars
    fetchBookmars();

    e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url) {
    // Get bookmarks from localStorage
    let bookmars = JSON.parse(localStorage.getItem('bookmars'));
    console.log(bookmars);

    // Loop throught bookmarks
    bookmars.forEach((bookmark) => {

        if (bookmark.url == url) {
            bookmars.splice(bookmars, 1);
        }
    })
    // Re-set back to LocalStorage
    localStorage.setItem('bookmars', JSON.stringify(bookmars));

    // Re-fetch bookmars
    fetchBookmars();
}


// Fetch bookmars
function fetchBookmars() {
    // Get bookmars from localStorage
    let bookmars = JSON.parse(localStorage.getItem('bookmars'));
    // Get output id
    let bookmarksResults = document.getElementById('bookmarksResults');
    // Build output
    bookmarksResults.innerText = ''
    bookmars.forEach((bookmark) => {
        let name = bookmark.name;
        let url = bookmark.url;

        bookmarksResults.innerHTML += `
        <div class='card card-body bg-light text-center w-50 m-auto'>
            <h3>${name}
                <a href=${url} class='btn btn-primary' target='_blank'> Visit</a>
                <a href='#' onClick=deleteBookmark(\'${url}\')  class='btn btn-danger'>X</a>
            </h3>
        </div>
        `
    })
}
