const COHORT = "2407-FTB-ET-WEB-FT";
const apiURL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
  parties: [],
};

const partyList = document.querySelector("#party-list");
const addParty = document.querySelector("#addParty");
addParty.addEventListener("submit", addingParty);

async function render() {
  await getParties();
  renderParties();
}
render();

async function getParties() {
  try {
    const response = await fetch(apiURL);
    const json = await response.json();
    state.parties = json.data;
  } catch (error) {
    console.log(error);
  }
}

async function addingParty(event) {
  event.preventDefault();

  await createParty(
    addParty.name.value,
    addParty.date.value,
    addParty.time.value,
    addParty.location.value,
    addParty.description.value
  );
}

async function createParty(name, date, time, location, description) {
  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        date,
        time,
        location,
        description,
      }),
    });

    if (response.ok) {
      render();
    } else {
      console.error("fail!");
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateParties(id, name, date, time, location, description) {
  try {
    const response = await fetch(`${apiURL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        date,
        time,
        location,
        description,
      }),
    });

    if (!response.ok) {
      console.error("fail!");
    }
  } catch (error) {
    console.log(error);
  }
}

function renderParties() {
  if (!state.parties.length) {
    partyList.innerHTML = `<li>No parties found.</li>`;
    return;
  }
  const invites = state.parties.map((party) => {
    const invite = document.createElement("li");
    invite.classList.add("party");
    invite.innerHTML = `
        <input>${party.name}</input>
        <input>${party.date}</input>
        <input>${party.time}</input>
        <input>${party.location}</input>
        <input>${party.description}</input>
      `;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Party";
    invite.append(deleteButton);

    deleteButton.addEventListener("click", () => deleteRecipe(recipe.id));

    return recipeCard;
  });
  recipesList.replaceChildren(...recipeCards);
}
