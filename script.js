const button = document.querySelector('button')
const input = document.querySelector('input')
const contentDiv = document.querySelector('div')

const getObjectID = async () => {
    let objectID = input.value
    //string interpolation being used, below is an endpoint (the url)
    let response = await axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}
        `
    )

    //json - javascript object notation, we know we can use dot notation to access objects

    let title = response.data.title
    let image = response.data.primaryImage
    contentDiv.innerHTML = `<span>${title}</span><br /><img src=${image} alt="artwork" />`
 
    console.log(response)
}

button.addEventListener('click', getObjectID)