//Use this to fetch the data from the JSON file of reviews
import reviews from "./reviews.json" assert { type: 'json' };

let reviewsPerId = 0;
let pageIds = [];

//handle form submits
function handleSubmit(e) {
    e.preventDefault();

    let pageIdElm = document.getElementById("page-ids");
    let totalReviewsElm = document.getElementById("total-reviews");

    //pass the entered ids into a funciton that will add them into a new array
    addIds(pageIdElm.value);
    reviewsPerId = totalReviewsElm.value;

    //Pass all the entered data and reveiew data into the csv maker
    csvMaker(pageIds, reviewsPerId, reviews);

    alert("A CSV was successfully generated!")
}

//split the ids and add them into the pageIds array
function addIds(ids) {
    let cleanIds = ids.split(",")
    for(let i = 0; i < cleanIds.length; i++) {
        pageIds.push(cleanIds[i])
    }
}

function csvMaker(pageIds, reviewsPerId, reviews) {

    let reviewsWithIds = [];

    //dont do anything if form fields are empty
    if (pageIds !== null && reviewsPerId !== null) {

        let reviewCounter = 0;

        //loop through each entered page id
        for(let i = 0; i < pageIds.length; i++) {
            //loop until it reaches the reviews per page id value
            for(let j = 0; j < reviewsPerId; j++) {
                
                // break out if review counter ever exceeds the length of reviews array
                if(reviewCounter >= reviews.length) {
                    break;
                } else {
                    //add values to each review array item and store them in a new array for the CSV
                    reviews[reviewCounter]["page id"] = pageIds[i];
                    reviews[reviewCounter]["review id"] = reviewCounter + 1;
                    reviews[reviewCounter]["review status"] = "Approved";
                    reviews[reviewCounter]["review title"] = reviews[reviewCounter]["review title"].replace(",", "");
                    reviews[reviewCounter]["review text"] = reviews[reviewCounter]["review text"].replace(",", "");
                    reviewsWithIds.push(reviews[reviewCounter]);
                    ++reviewCounter;
                    
                }
                
            }
        }

    }

    let csv = '';
    let header = Object.keys(reviewsWithIds[0]).join(',');
    let values = reviewsWithIds.map(item => Object.values(item).join(',')).join('\n');

    csv += header + '\n' + values;
    console.log("CSV Generated")

    download(csv);
}

function download(refinedData) {
    // Creating a Blob for having a csv file format  
    // and passing the data with type 
    const blob = new Blob([refinedData], { type: 'text/csv;charset=utf-8,' }); 

    // Creating an object for downloading url 
    const url = window.URL.createObjectURL(blob) 
  
    // Creating an anchor(a) tag of HTML 
    const a = document.createElement('a') 
  
    // Passing the blob downloading url  
    a.setAttribute('href', url) 
  
    // Setting the anchor tag attribute for downloading 
    // and passing the download file name 
    a.setAttribute('download', 'download.csv'); 
  
    // Performing a download with click 
    a.click() 

}


const form = document.getElementById("form");

form.addEventListener("submit", handleSubmit);

