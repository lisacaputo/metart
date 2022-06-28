const button = document.querySelector('button')
const input = document.querySelector('input')
const generalSearch = document.getElementById('general-search')

const getSearchTerm = async () => {
    const searchTerm = input.value
    //string interpolation being used, below is an endpoint (the url)
    let response = await axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchTerm}`
    )
    
    //List of Object IDs that contain the search term
    const objectIDList = response.data.objectIDs
    
    //Display search term list to user
    generalSearch.innerHTML = `<p>Below is the list of all the artworks containing <strong>${searchTerm}</strong>: ${objectIDList}.</p>`

    console.log(response)
}

button.addEventListener('click', getSearchTerm)