// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e) {
    //Get form values
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;

    if (!validateForm(siteUrl, siteName)) {
        return false;
    }

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
    // Clear form
    document.getElementById('myForm').reset();
    // Re-fetch bookmars
    fetchBookmars();
    //Prevent form from submitting
    e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url) {
    // Get bookmarks from localStorage
    let bookmars = JSON.parse(localStorage.getItem('bookmars'));
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
        <div class='card card-body bg-light text-center w-50 m-auto animated flipInX'>
            <h3 class=''>${name}</h3>
                <a href=${url} target='_blank'><i class="far fa-eye fa-2x see"></i></a>
                <a href='#' <i onClick=deleteBookmark(\'${url}\') class="fas fa-trash-alt fa-2x delete "></i></a>
        </div>
        `
    })
}

// Validate form
function validateForm(siteUrl, siteName) {
    if (!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }
    let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert('Please use a valid URL');
        return false;

    }
    return true;

}

