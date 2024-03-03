const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phone = data.data;
  displayPhones(phone, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.textContent = '';


  const showallbtn = document.getElementById('k');
  if (phones.length > 12 && !isShowAll) {

    showallbtn.classList.remove('hidden');
  }
  else {
    showallbtn.classList.add('hidden')
  }


  // display only 12 phones
  if (!isShowAll) {
    phones = phones.slice(0, 12);

  }

  phones.forEach(phone => {
    // console.log(phone)
    // create a div
    const phoneCard = document.createElement('div')
    phoneCard.classList = `card p-4 bg-base-100 shadow-xl`;
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center mt-4">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
      </div>
        `;
    phoneContainer.appendChild(phoneCard);
  })
  toggleLoadingSpinner(false);
}



// handle search button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true)
  const searchFild = document.getElementById('search-fild');
  const searchText = searchFild.value;
  loadPhone(searchText, isShowAll)

}

// handle search recap
// const handleSearch2 = () => {
//   toggleLoadingSpinner(true)
//   const searchFild2 = document.getElementById('search-fild2');
//   const searchText2 = searchFild2.value;
//   loadPhone(searchText2)
// }

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading')
  if (isLoading) {
    loadingSpinner.classList.remove('hidden');
  }
  else {
    loadingSpinner.classList.add('hidden');
  }
}

const handleShowAll = () => {
  handleSearch(true)

}


const handleShowDetails = async (id) => {
  // console.log(id);
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  // console.log(data)
  const phone = data.data
  showPhoneDetails(phone)

}

const showPhoneDetails = (phone) => {
  console.log(phone)
  const phoneName = document.getElementById('phoneName');
  phoneName.innerText = phone.name;
  const showDetailContainer = document.getElementById('showDetailContainer');
  showDetailContainer.innerHTML = `
            <img class="mx-auto my-4  " src="${phone.image}" alt="">
          <p><span>Storage : </span>${phone?.mainFeatures?.storage}</p>
          <p><span>Display Size : </span>${phone?.mainFeatures?.displaySize}</p>
          <p><span>Chipset : </span>${phone?.mainFeatures?.chipSet}</p>
          <p><span>Memory : </span>${phone?.mainFeatures?.memory}</p>
          <p><span>Slug : </span>${phone?.slug}</p>
          <p><span>Brand : </span>${phone?.brand}</p>
          <p><span>GPS : </span>${phone?.others?.GPS}</p>


  `
  show_detail_Modal.showModal();

}