//Variables
const button = document.querySelector('button')
const input = document.querySelector('input')
const generalSearch = document.getElementById('general-search')
const viewArt = document.querySelector('#general-search+p')

//API Function
const getSearchTerm = async () => {
    const searchTerm = input.value
    //string interpolation being used, below is an endpoint (the url)
    let response = await axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchTerm}`
    )

    
    //List of Object IDs that contain the search term
    const objectIDList = response.data.objectIDs
    
    //Display search term list to user
    generalSearch.innerHTML = `<p>Below is the list of all the artworks containing <strong class="highlight">${searchTerm}</strong>:</p><div id="object-id-list"></div>`
    const objectIDListContainer = document.getElementById('object-id-list')

    //Go through the object ID list array and create span tag for each object ID returned
    objectIDList.forEach((objectID) => {
        const singleObjectID = document.createElement('span')
        singleObjectID.innerText = objectID
        objectIDListContainer.appendChild(singleObjectID)
    });

    viewArt.style.opacity = '1'

    console.log(response)
}

button.addEventListener('click', getSearchTerm)