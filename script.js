const searchBar = document.querySelector(".searchbar");
const profileContainer = document.querySelector(".profile-container");

const btnMode = document.querySelector(".dark-mode");
const textMode = document.querySelector("#mode-text");
const iconMode = document.querySelector(".mode-icon");

const input = document.querySelector("#input");
const noResult = document.querySelector("#no-results");
const submit = document.querySelector("#submit");

const avatar = document.querySelector("#avatar");
const userName = document.querySelector("#name");
const users = document.querySelector("#user");
const date = document.querySelector("#date");

const bio = document.querySelector("#bio");

const repos = document.querySelector("#repos");
const followers = document.querySelector("#followers");
const following = document.querySelector("#following");

const locations = document.querySelector("#location");
const page = document.querySelector("#page");
const twitter = document.querySelector("#twitter");
const company = document.querySelector("#company");

const url = "https://api.github.com/users/";
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const root = document.documentElement.style;

let darkMode = false;



//EVENT LISTNER
submit.addEventListener("click", () => {
    if(input.value !== "") {
        getUserData(url + input.value);
        // console.log(getUserData());
    }
})

btnMode.addEventListener("click", () => {
    if(darkMode == false){
        darkModeProperties();
    }
    else{
        lightModeProperties();
    }
})

input.addEventListener("keydown", (e) => {
    if(e.key == "Enter"){
        if(input.value !== "") {
            getUserData(url + input.value);
        }
    }
},false);

input.addEventListener("input", () => {
    noResult.style.display = "none";
});

async function getUserData(giturl) {
    try{
        const response = await fetch(giturl);
        const data = await response.json();
        console.log(data);
        updateProfile(data);
    }
    catch(error){
        throw error;
    }

    // ALTERNATIVE WAY

    // fetch(giturl)
    // .then((response) => response.json())
    // .then((data) => {
    //     updateProfile(data);
    // })
    // .catch((error) => {
    //     throw error;
    // });
    // console.log(input.value)
}

function updateProfile(data) {
    if(data.message !== "Not Found") {
        noResult.style.display = "none";

        avatar.src = `${data.avatar_url}`;
        userName.innerText = data.name === null ? data.login : data.name;
        users.innerText = `@${data.login}`;
        users.href = data.html_url;
        date.innerText = `Joined ${data.created_at.split("T").shift().split("-")}`;
        bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
        repos.innerText = data.public_repos;
        followers.innerText = data.followers;
        following.innerText = data.following;
        locations.innerText = data.location == null ? "Not Available" : `${data.location}`;
        page.innerText = data.blog == "" ? "Not Available" : `${data.blog}`;

        twitter.innerText = data.twitter_username ? data.twitter_username : "Not Available";

        twitter.href = data.twitter_username ? `https://twitter.com/${data.twitter_username}` : "#";

        company.innerText = data.company ? data.company : "Not Available";

        searchBar.classList.toggle("active");
        profileContainer.classList.toggle("active");
        
    }
    else {
        noResult.style.display = "block";
    }
}




function darkModeProperties() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    textMode.innerText = "LIGHT";
    iconMode.src = "./assets/images/sun-icon.svg"
    darkMode = true;
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    localStorage.setItem("dark-mode", true);
    // console.log("dark gh");
}

function lightModeProperties() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    textMode.innerText = "DARK";
    iconMode.src = "./assets/images/moon-icon.svg";
    darkMode = false;
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    localStorage.setItem("dark-mode", false);
    // console.log("light")
}

// INITALIZATION
function init() {
    //initialise dark-mode variable to false;
   //darkMode = true -> dark mode enable 
   //darMode = false -> light mode enable 
   darkMode = false;

   const value = localStorage.getItem("dark-mode");

   if(value === null){
       localStorage.setItem("dark-mode", darkMode);
       lightModeProperties();
   }

   else if(value == "true"){
       darkModeProperties();
   }

   else if(value == "false"){
       lightModeProperties();
   }

   getUserData(url + "priyam-hub");

}


init();



















































