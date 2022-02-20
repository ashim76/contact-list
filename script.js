const listElm = document.querySelector("#list");
const apiUrl = "https://randomuser.me/api/?";
const userCountElm = document.querySelector("#user-count");

let userArgs = [];
const displayUser = (args = userArgs) => {
    let str = "";

    //looping user

    args.map(usr => {
        console.log(usr);
        str += `
      <div class="col-md-6 col-lg-3 py-3">
                  <div class="card">
                    <img src="${usr.picture.large}" class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">
                      ${usr.name.title}
                      ${usr.name.first}
                      ${usr.name.last}
                      </h5>
                      <p class="card-text">
                       <ul class="list-unstyled">
                        <li>
                          <i class="fa-solid fa-mobile text-center pt-2"></i> 
                        ${usr.phone}
                        </li>
                        <li><i class="fa-solid fa-envelope"></i> ${usr.email} </li>
                        <li><i class="fa-solid fa-calendar-days"></i> ${usr.dob.date}</li>
                        <li> <i class="fa-solid fa-map-location"></i> ${usr.location.city}</li>
                       </ul>
                      
                      </p>
                    
                    </div>
                  </div>
                </div>
      `;
    });
    userCountElm.innerHTML = args.length;
    listElm.innerHTML = str;

    //   // str += ``;
    // });

    // listElm.innerHTML=str;
};

const fetchUsers = (params = "results=20") => {
    fetch(apiUrl + params)
        .then(response => response.json())
        .then(data => {

            userArgs = data.results;
            displayUser();
        })
        .catch(
            err => {

                console.log(err);
                listElm.innerHTML = `<div class="alert alert-danger" role="alert">
          Oop! Something went wrong.
        </div>`
            })


};



fetchUsers();

const handleOnchange = e => {
    const params = "results=20&gender=" + e.value;

    fetchUsers(params);
};

const handleOnSearch = () => {
    const searchStr = document.getElementById("search").value;
    const filteredUser = userArgs.filter((item) => {
        console.log(item);
        const username = `${item?.first} ${item?.name?.last}`
        if (username.toLocaleLowerCase().includes(searchStr.toLocaleLowerCase())) {
            return item;
        }
    });
    console.log(searchStr);
    displayUser(filteredUser);
};