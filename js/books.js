const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const bookCotainer = document.getElementById('book-cotainer');
const mectingResult =document.getElementById('matching-result');
const mectingError = document.getElementById('error');


//Scarch function
searchButton.addEventListener('click', function(){
    const search = searchInput.value;

    // error message Handeling
    if (search === '' ){
        mectingError.innerText = "Scarch Field Cannot be Entry !";
        console.log(mectingError);
        return;
    }
    //   clear html 
    bookCotainer.innerHTML = '';

    const url =`https://openlibrary.org/search.json?q=${search}`;
    fetch(url)
    .then ((res) => res.json())
    .then((data) => {
        //  error message Handel
        if(data.numFound === 0){ 
            mectingError.innerText = "No Result Found !";
        } 
        else { mectingError.innerText = " ";
        }
    
        // data Response type
        mectingResult.innerText = data.docs.length;
        const newData = data.docs.slice(0, 20);

        // Books Scarch Area
        newData.forEach(item => {
            console.log(item);
            // book ditels
            const div = document.createElement('div');
            div.classList.add('col-md-3')
            div.innerHTML =`
            <div class="card" style="width: 18rem;">
                <img src='https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg' class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Books Name :${item.title}</h5>

                    <p class="card-text">Publisher name : ${item.author_name ? item.author_name[0] : "n/a"}</p>

                    <p class="card-text">Publisher name : ${item.publisher ? item.publisher[0] : "n/a"}</p>

                    <p class="card-text">Fast Publish Year : ${item.first_publish_year ? item.first_publish_year: "n/a"}</p>
                </div>
            </div> `

            bookCotainer.appendChild(div);
        });

    })
})

