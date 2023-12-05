//Use this to fetch the data from the JSON file of reviews
import reviews from "./reviews.json" assert { type: 'json' };

let reviewsPerId = 0;
let pageIds = [];
let pageIdElm = document.getElementById("page-ids");
let totalReviewsElm = document.getElementById("total-reviews");
let randomHelpful = document.getElementById("helpful-votes");
let randomNotHelpful = document.getElementById("unhelpful-votes");
let randomReco = document.getElementById("recommended");
let randomSource = document.getElementById("source");



//handle form submits
function handleSubmit(e) {
    e.preventDefault();    

    //pass the entered ids into a funciton that will add them into a new array
    addIds(pageIdElm.value);
    reviewsPerId = totalReviewsElm.value;

    let helpful = randomHelpful.checked;
    let notHelpful = randomNotHelpful.checked;
    let reco = randomReco.checked;
    let source = randomSource.checked;

    //Pass all the entered data and reveiew data into the csv maker
    csvMaker(pageIds, reviewsPerId, reviews, helpful, notHelpful, reco, source);

    //alert("A CSV was successfully generated!")
}

//split the ids and add them into the pageIds array
function addIds(ids) {
    let cleanIds = ids.split(",")
    for(let i = 0; i < cleanIds.length; i++) {
        pageIds.push(cleanIds[i])
    }
}

function csvMaker(pageIds, reviewsPerId, reviews, helpful, notHelpful, reco, source) {

    let reviewsWithIds = [];

    //dont do anything if form fields are empty
    if (pageIds !== null && reviewsPerId !== null) {

        let reviewCounter = 0;
        let helpfulNum = 0;
        let notHelpfulNum = 0;

        let recommendArr = [];
        let recoNum = 0;

        let sourceArr = [];
        let sourceNum = 0;

        

        //loop through each entered page id
        for(let i = 0; i < pageIds.length; i++) {
            //loop until it reaches the reviews per page id value
            for(let j = 0; j < reviewsPerId; j++) {

                if (helpful === true) {
                    helpfulNum = Math.floor(Math.random() * 50);
                }
        
                if (notHelpful === true) {
                    notHelpfulNum = Math.floor(Math.random() * 50);
                }
        
                if (reco === true) {
                    recommendArr = ["Yes", "No"];
                    recoNum = Math.round(Math.random());
                }
                
                if (source === true) {
                    sourceArr = ["email", "web"];
                    sourceNum = Math.round(Math.random());
                }
                
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
                    reviews[reviewCounter]["helpful votes"] = helpfulNum;
                    reviews[reviewCounter]["not helpful votes"] = notHelpfulNum;
                    reviews[reviewCounter]["recommended"] = recommendArr[recoNum];
                    reviews[reviewCounter]["review source"] = sourceArr[sourceNum];
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

