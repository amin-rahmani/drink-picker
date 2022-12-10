const drinkContainer = document.querySelector('#drink');
const drinkOptionsContainer = document.querySelector('#drink-options');

document.querySelector('#search-by-name').addEventListener('submit', (event) => {
    event.preventDefault();
    // console.log(event);
    // console.log(event.target);
    // console.log(event.target.elements);
    const query = event.target.elements[0].value.trim();
    // console.log({query});
    // console.log({euc: encodeURIComponent(query),enc: encodeURI(query)});
    const params = new URLSearchParams({ s: query })
    // console.log(params.toString());
    const url = new URL('https://www.thecocktaildb.com/api/json/v1/1/search.php');
    url.searchParams.set('s', query)
    window.location.hash = '#';
    fetch(url)
        .then(res => res.json())
        .then(({ drinks }) => {
            // console.log(data);
            if (!drinks) return alert('No Drinks Found')
            if (drinks.length === 1) displayDrink(drinks[0])
            displayDrinkOptions(drinks);
        });
});

(()=>{
    const idDrink = new URLSearchParams(window.location.hash.slice(1)).get('idDrink');
    if(!idDrink) return;
    const url = new URL('https://www.thecocktaildb.com/api/json/v1/1/lookup.php');
    url.searchParams.set('i', idDrink)
    fetch(url)
        .then(res => res.json())
        .then(({ drinks }) => {
            // console.log(data);
            if (!drinks) return alert('Invalid Drink ID');
            
            displayDrink(drinks[0]);
        });
})();

function displayDrinkOptions(drinks) {
    drinkContainer.classList.add('hidden');

    const fragment = document.createDocumentFragment()
    for (const drink of drinks) {
        const div = document.createElement('div');
        const anchor = document.createElement('a');
        anchor.href = '#idDrink=' + drink.idDrink;
        anchor.addEventListener('click',event => displayDrink(drink))
        const img = document.createElement('img');
        img.src = `${drink.strDrinkThumb}/preview`;
        img.title = img.alt = drink.strDrink;
        anchor.appendChild(img);

        const title = document.createElement('span');
        title.textContent = drink.strDrink;
        anchor.appendChild(title);
        div.appendChild(anchor);

        fragment.appendChild(div);
    }

    drinkOptionsContainer.innerHTML = '';
    drinkOptionsContainer.appendChild(fragment)


    drinkOptionsContainer.classList.remove('hidden');

}



function displayDrink(drink) {
    console.log(drink);
    drinkOptionsContainer.classList.add('hidden');

    drinkContainer.querySelector('h2').textContent = drink.strDrink;
    drinkContainer.querySelector('img').src = drink.strDrinkThumb;
    drinkContainer.querySelector('p').innerHTML = drink.strInstructions;


    let html = '';
    for (let i = 1; i <= 15; i++) {
        const ingredient = drink[`strIngredient${i}`];
        if (!ingredient) break;
        const measure = drink[`strMeasure${i}`] || '';
        // console.log(ingredient,measure);
        html += `<tr><td><img src="https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png" alt="${ingredient}" /></td><td>${measure}</td></tr>`
    };

    drinkContainer.querySelector('#ingredients-table').innerHTML += html;




    html = '';
    for (const [left, key] of Object.entries({
        Content: 'strAlcoholic',
        Category: 'strCategory',
        Glass: 'strGlass',
        Modified: 'dateModified'
    })) {
        html += `<tr><td>${left}</td><td>${drink[key]}</td></tr>`;
    }
    drinkContainer.querySelector('tbody').innerHTML = html;
    drinkContainer.classList.remove('hidden');
}
// displayDrink()