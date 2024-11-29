document.querySelector("#selectCountry").addEventListener("change", setCountry)
document.querySelector("#selectState").addEventListener("change", setState)

async function setAllCountries() {

    try {
        let countries = await fetch("./paises.json")

        let countriesJs = await countries.json();

        //map
        countriesJs.map(country => {
            document.querySelector("#selectCountry").innerHTML += `<option value="${country.sigla}">${country.nome_pais}</option>`
        })

    } catch (error) {
        error()
    }

};

async function setCountry(e) {
    document.querySelector("#stateInf").innerHTML = ""
    try {

        let countryImg = await fetch(`https://flagcdn.com/w320/${e.target.value.toLowerCase()}.png`)

        let countryImgBlob = await countryImg.blob();

        let img = document.querySelector("#countryFlag")
        if (img) {

            img.setAttribute("alt", e.target.value)
            img.src = URL.createObjectURL(countryImgBlob);

        } else {

            let img = document.createElement("img")
            img.setAttribute("class", "img-fluid rounded d-flex m-auto mt-5")
            img.setAttribute("alt", e.target.value)
            img.setAttribute("id", "countryFlag")
            img.src = URL.createObjectURL(countryImgBlob);


            document.querySelector("main").prepend(img)

        }

        let countries = await fetch("./paises.json")

        let countriesJs = await countries.json();

        //filter //Destructuring
        [country, inf] = [countriesJs.filter((c) => c.sigla === e.target.value)[0], document.querySelector("#countryInf")]


        inf.innerHTML = `<p>Nome: ${country.nome_pais}</p>
                        <p>Gentílico: ${country.gentilico}</p>
                        <p>Sigla: ${country.sigla}</p>
                        <p>Nome Internacional: ${country.nome_pais_int}</p>`;

        setAllStates(e.target.value);

    } catch (error) {
        error()
    }
}

async function setAllStates(e) {

    document.querySelector("#selectState").disabled = false

    if (e == "BR") {

        try {

            let states = await fetch(`https://brasilapi.com.br/api/ibge/uf/v1`)

            let statesJs = await states.json();

            //map
            statesJs.map(state => {
                document.querySelector("#selectState").innerHTML += `<option value="${state.sigla}">${state.nome}</option>`
            })

        } catch (error) {
            error()
        }


    } else {
        document.querySelector("#selectState").disabled = true
    }
}

async function setState(e) {
    try {

        let states = await fetch(`https://brasilapi.com.br/api/ibge/uf/v1/${e.target.value}`)

        let state = await states.json();

        let inf = document.querySelector("#stateInf")

        inf.innerHTML = `<p>Nome: ${state.nome}</p>
                        <p>Id: ${state.id}</p>
                        <p>Sigla: ${state.sigla}</p>
                        <p>Região: 
                            <ul>
                                <li>Nome: ${state.regiao.nome}</li>
                                <li>Sigla: ${state.regiao.sigla}</li>
                                <li>Id: ${state.regiao.id}</li>
                            </ul>
                        </p>`;

    } catch (error) {
        error()
    }
}

function error(){
    document.querySelector("#error").classList.remove("fade")
    setTimeout(() => {
        document.querySelector("#error").classList.add("fade")
    }, 5000);
}

setAllCountries()