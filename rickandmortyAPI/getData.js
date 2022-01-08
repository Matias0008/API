const API = 'https://rickandmortyapi.com/api/character/'

const getData = (apiURL) => {
    return fetch(apiURL)
    .then( response => response.json())
    .then ( json => { printData(json), pagination(json.info) } )
    .catch(error => {
        console.log(`Error: ${error}`)
    })
}


function capitalize(word) {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}



const printData = (data) => {
    let html = '';
    let styleStatus = '';
    let firstSeen = '';

    
    data.results.forEach(c => {
        
        if (c.status == 'Alive') {
            styleStatus = 'height: 0.5rem; width: 0.5rem; margin-right: 0.375rem; background: rgb(85, 204, 68); border-radius: 50%;'
        } if (c.status == 'Dead') {
            styleStatus = 'height: 0.5rem; width: 0.5rem; margin-right: 0.375rem; background: rgb(214, 61, 46);; border-radius: 50%;'
        } if (capitalize(c.status) == 'Unknown' ) {
            styleStatus = 'height: 0.5rem; width: 0.5rem; margin-right: 0.375rem; background: rgb(255, 255, 0);; border-radius: 50%;'
        }

        firstSeen = capitalize(c.episode[0].slice(32).replace('/', ' '))

        html += `
            <div class="col-xxl-4 col-lg-12 col-md-12 flex-grow-1 ">
            <div class="card mb-3">
                <div class="row g-0" style="align-items: center;">

                        <div class="col-md-4" style="height: 250px;">
                            <img src="${c.image}" class="img-fluid rounded-start img-img" alt="...">
                        </div>

                        <div class="col-md-8">
                            <div class="card-body">
                                <section>
                                    <h2 class="card-title">${c.name}</h2>
                                    <div class="status d-flex align-items-center">
                                        <span class="section__icon" style="${styleStatus}">
                                        </span>

                                        <p style="color: white;">${capitalize(c.status)} - ${c.species}</p>

                                    </div>


                                </section>

                                <section>                              
                                    <p class="card-text">Last known location:</p>
                                    <p class="card-info">${c.location.name}</p>
                                </section>

                                <section class="cta">
                                    <p class="card-text">First seen in:</p>
                                    <p class="card-info" id="info">${firstSeen}</p>
                                </section>

                            </div>
                        </div>
                </div>
            </div>
    </div>
        `



    });

    document.getElementById('infoCharacter').innerHTML = html
}

const pagination = (info) => {

    let preDisabled = info.prev == null ? 'disabled' : ''
    let nextDisabled = info.next == null ? 'disabled' : ''

    let html = `<a onclick="getData('${info.prev}')" ><button type="button" class="btn btn-secondary btn-lg ${preDisabled}" style="margin-right: 15px;">Previous</button></a>`
    html += `<a onclick="getData('${info.next}')"<button type="button" class="btn btn-primary btn-lg ${nextDisabled}">Next</button></a>`

    document.getElementById('buttons').innerHTML = html
}


getData(API);