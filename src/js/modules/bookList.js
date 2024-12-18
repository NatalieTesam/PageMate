// list format: const myList = {saved: [1, 2, 3], read: [1, 2, 3]}

// parses the string from local storage and returns a json value
export function getBookList() {
    const booklist = JSON.parse(localStorage.getItem("booklist"))
        if (booklist) {
            return booklist;
        }
        else {
            return {saved: [], read: []}
        }
}

// turns the json back into a string and sets in local storage
export function setBookList(newList) {
    localStorage.setItem("booklist", JSON.stringify(newList));
}

// checks if a book is already listed in the list, pushes it to the list, and then returns 
// the booklist to local storage to update the value
export function addBook(id, category) {
    const booklist = getBookList();
    if (category == "saved" & !booklist.saved.includes(id)) {
            booklist.saved.push(id);
    }
    if (category == "read" & !booklist.read.includes(id)) {
        booklist.read.push(id);
    }
    else {
        console.log("Could not add book, either already in list or invalid category type.")
    }
    setBookList(booklist)
}

// uses a book id and a category string to check if the book is listed in the category then 
// returns a new list without it and sets the local storage to that new list
export function removeBook(id, category) {
    const booklist = getBookList();
    if (category == "saved" & booklist.saved.includes(id)) {
        const newList = booklist.saved.filter(item => item !== id);
        setBookList(newList);
    }
    if (category == "read" & booklist.read.includes(id)) {
        const newList = booklist.read.filter(item => item !== id);
        setBookList(newList);
    }
    else {
        console.log("Could not remove book, either not in list or invalid category type.")
    }
}

export function swapLists(id, CurrentCategory) {
    if (CurrentCategory == "saved") {
        addBook(id, "read");
        removeBook(id, "saved");
    }
    if (CurrentCategory == "read") {
        addBook(id, "saved");
        removeBook(id, "read")
    }
}
