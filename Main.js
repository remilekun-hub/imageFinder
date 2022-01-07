const input = document.getElementById('search-box')
const container = document.getElementById('grid')


window.addEventListener('load', gettheme)

input.addEventListener('keydown', function(e) {

    if(e.key === 'Enter') {
        Getimages()
    }

})

function gettheme() {
    const date = new Date()
    const hours = date.getHours()

    if (hours >= 7 && hours <= 19) {
        document.body.style.backgroundColor = "white"
        document.body.style.color = "black";
        
    }
    else { 
        document.body.style.backgroundColor = "black"
        document.body.style.color = "white"
        document.querySelector('.fa-search').style.color = "black"
    }
}


function Getimages() {

    removeimages()

    const url ='https://api.unsplash.com/search/photos/?query='+input.value+'&per_page=9&client_id=of8DzHKFhEYUHl9sGjF3lqZy_V6yTDc9l-vMJxvL_xI';

    fetch(url)
    .then((response => {
        if(response.ok) {
            return response.json()
        }
        else return response.statusText
    }))
    .then((data) => {
        const imagenodes = [];
        for(i=0; i < data.results.length; i++){
            imagenodes[i] = document.createElement('div');
            imagenodes[i].className = 'img';
            imagenodes[i].style.backgroundImage = 'url('+data.results[i].urls.raw+')';
            imagenodes[i].addEventListener('dblclick', function(){
                window.open(data.results[i].links.download, '_blank');
            })
            grid.appendChild(imagenodes[i]);

        }
        
    })
    .catch(error => {
        console.log(error)
    })

}

function removeimages() {
    grid.innerHTML= ""
}

