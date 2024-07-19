let song_list = document.querySelector(".song_list")
let play_pause = document.querySelector("#play")
let pervious = document.querySelector("#perivous")
let next = document.querySelector("#next")
let curr_song = new Audio()
let seekbar = document.querySelector(".seekbar")
let currtime = document.querySelector(".curr-time")
let totaltime = document.querySelector(".total-time")
let index = 0;

const songs = [

    {
        trackname: "Tum Se",
        artist: "Sachin-Jigar",
        path: 'Tum Se_320(PagalWorld.com.sb).mp3'
    },
    {
        trackname: "O Sajni Re",
        artist: "Arijit Singh",
        path: 'O Sajni Re_320(PagalWorld.com.sb).mp3'
    },
    {
        trackname: "Ve Kamleya",
        artist: "Arijit Singh",
        path: 'Ve Kamleya_320(PagalWorld.com.sb).mp3'
    },
    {
        trackname: "Tenu Khabar nhi",
        artist: "Arijit Singh",
        path: 'Tainu-Khabar-Nahi(PagalNew.Com.Se).mp3'
    },
    {
        trackname: "Dekha Tenu",
        artist: "Sheikh Mahim Edward",
        path: 'Dekha Tenu Pehli Pehli Baar Ve_320(PagalWorld.com.sb).mp3'
    },
    {
        trackname: "Tu hain Kahan",
        artist: "Zayan",
        path: '_Tu Hai Kahan_320(PagalWorld.com.sb).mp3'
    }
]


function secondstominutes(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        totaltime.innerHTML = "invalid input"
    }
    const minutes = Math.floor(seconds / 60)
    const remianingseconds = Math.floor(seconds % 60)
    const formattedminutes = String(minutes).padStart(2, "0")
    const formattedseconds = String(remianingseconds).padStart(2, "0")
    return `${formattedminutes}:${formattedseconds}`
}

function playsong(index) {

    curr_song.src = songs[index].path
    if (curr_song.paused) {
        curr_song.play()
        play_pause.src = "svg/pause.svg"
    }
}
function nextTrack() {
    // Go back to the first track if the
    // current one is the last in the track list
    if (index < songs.length - 1)
        index += 1;
    else { 
        index = 0;
    }
    document.querySelector(".song-name").innerHTML = songs[index].trackname
    document.querySelector(".song-artist").innerHTML = songs[index].artist
    // Load and play the new track
    playsong(index)
    curr_song.play()
}

function previoustrack() {
    if (index > 0) {
        index-=1
    }
    else{
        index = songs.length - 1;
    }
    document.querySelector(".song-name").innerHTML = songs[index].trackname
    document.querySelector(".song-artist").innerHTML = songs[index].artist
    playsong(index)
    curr_song.play()
}

async function main() {

    // for hamburger
    const hamburger = document.querySelector(".hamburger")

    hamburger.addEventListener("click", (e) => {
        e.target
        document.getElementById("list").style.left = 0
    })


    // for close button  

    const close = document.querySelector(".close")

    close.addEventListener("click", e => {
        e.target
        document.getElementById("list").style.left = "-120%"
    })


    //songs


    let songsul = song_list.getElementsByTagName("ul")[0]
    let index;
    for (index = 0; index < songs.length; index++) {
        songsul.innerHTML = songsul.innerHTML + `   <li>
        <p> <img class="music" src="svg/songplay.svg" alt="">
        ${songs[index].trackname}</p>
        <p>|| ${songs[index].artist} <img class="music" src="svg/music.svg" alt=""></p>
        <h1 class="path">${index}</h1>
        
        </li> `

    }
    // attach event listner to each songs
    Array.from(song_list.getElementsByTagName("li")).forEach((li) => {
        li.addEventListener("click", () => {

            let track_index = parseInt(li.querySelector(".path").innerHTML)

            playsong(track_index)
            document.querySelector(".song-name").innerHTML = songs[track_index].trackname
            document.querySelector(".song-artist").innerHTML = songs[track_index].artist
            document.querySelector(".circle").style.left = 0;
        })
    })
    let duration;
    curr_song.addEventListener("loadeddata", () => {
        duration = curr_song.duration;
        // console.log(duration);
    });



    // time updates   
    curr_song.addEventListener("timeupdate", () => {
        totaltime.innerHTML = `${secondstominutes(duration)}`
        currtime.innerHTML = `${secondstominutes(curr_song.currentTime)}`
        document.querySelector(".circle").style.left = (curr_song.currentTime / curr_song.duration) * 100 + "%"
    })

    //event listner on seekbar

    document.querySelector(".seek").addEventListener("click", function (e) {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        console.log(percent);
        document.querySelector(".circle").style.left = percent + "%";
        curr_song.currentTime = ((curr_song.duration) * percent) / 100;
        console.log(curr_song.currentTime);
    })

    //    playing songs


    play_pause.addEventListener("click", e => {
        e.target
        if (curr_song.paused) {
            curr_song.play()
            play_pause.src = "svg/pause.svg"
        }
        else if (curr_song.play()) {

            curr_song.pause()
            play_pause.src = "svg/play.svg"
            console.log("stopped");
        }
    })

    // play next song
    next.addEventListener("click", () => {
        nextTrack()
    })


    // pervious button
    pervious.addEventListener("click",() => {
        console.log("previous clicked");
        previoustrack()
    })


    //volume
    document.querySelector(".volbar").getElementsByTagName("input")[0].addEventListener("change", e => {
        console.log(e, e.target.value);
        curr_song.volume = parseInt(e.target.value) / 100
    })
}

main()