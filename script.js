const drinkContainer = document.querySelector('#drink');

document.querySelector('#search-by-name').addEventListener('submit', (event) => {
    event.preventDefault();
    // console.log(event);
    // console.log(event.target);
    // console.log(event.target.elements);
    const query = event.target.elements[0].value.trim();
    // console.log({query});
    // console.log({euc: encodeURIComponent(query),enc: encodeURI(query)});
    const params = new URLSearchParams({ s: query })
    console.log(params.toString());
    const url = new URL('https://www.thecocktaildb.com/api/json/v1/1/search.php?');
    url.searchParams.set('s', query)
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            displayDrink(data.drinks[0])
        });
});

function displayDrink(drink) {
    window.d = drink;
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

    drinkContainer.querySelector('#ingredients-table').innerHTML = html;
    for (const[left,key] of Object.entries({
        Alcoholic: 'strAlcoholic',
        Category: 'strCategory',
        Glass:'strGlass',
        Modified:'dateModified'
    })){

    }
}
// displayDrink()