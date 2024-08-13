const COHORT = "2407-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
  parties: [],
};

const partyList = document.querySelector("#party-list");
const addPartyForm = document.getElementById("addParty");
addPartyForm.addEventListener("submit", AddParty);

async function render() {
  await getParties();
  renderParties();
}
render();

async function getParties() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch parties.");
    }
    const json = await response.json();
    state.parties = json.data;
  } catch (error) {
    console.log(error);
  }
}

async function AddParty(event) {
  event.preventDefault();
  const name = addPartyForm.name.value;
  const date = addPartyForm.date.value;
  const time = addPartyForm.time.value;
  const location = addPartyForm.location.value;
  const description = addPartyForm.description.value;

  await createParty(name, date, time, location, description);
  addPartyForm.reset();
}

async function createParty(name, date, time, location, description) {
  try {
    console.log({ name, date, time, location, description });
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        date: new Date(date),
        location,
        description,
      }),
    });

    if (response.ok) {
      render();
    } else {
      console.error("Failed to create party.");
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
        <h2>${party.name}</h2>
        <p>${party.date}</p>
        <p>${party.time}</p>
        <p>${party.location}</p>
        <p>${party.description}</p>
      `;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Party";
    invite.append(deleteButton);

    deleteButton.addEventListener("click", () => deleteParty(party.id));

    async function deleteParty(id) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // Re-render parties after successful deletion
          render();
        } else {
          console.error("Failed to delete party.");
        }
      } catch (error) {
        console.log(error);
      }
    }

    return invite;
  });
  partyList.replaceChildren(...invites);
}
