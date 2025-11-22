const state = {
  parties: [],
  selectedParty: null,
  loading: false,
  error: null,
};

const API_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "2501-FTB-ET-WEB-FT";
const BASE = `${API_URL}/${COHORT}`;

async function fetchParties() {
  try {
    state.loading = true;
    render();

    const res = await fetch(`${BASE}/events`);
    const data = await res.json();

    state.parties = data.data;
    state.error = null;
  } catch (err) {
    state.error = err.message;
  } finally {
    state.loading = false;
    render();
  }
}

async function fetchPartyDetails(id) {
  try {
    state.loading = true;
    render();

    const res = await fetch(`${BASE}/events/${id}`);
    const data = await res.json();

    state.selectedParty = data.data;
    state.error = null;
  } catch (err) {
    state.error = err.message;
  } finally {
    state.loading = false;
    render();
  }
}

function PartyList() {
  const ul = document.createElement("ul");
  ul.className = "party-list";

  state.parties.forEach((party) => {
    const li = document.createElement("li");
    li.textContent = party.name;

    // highlight selected party (extension)
    if (state.selectedParty && party.id === state.selectedParty.id) {
      li.classList.add("selected");
    }

    li.addEventListener("click", () => {
      fetchPartyDetails(party.id);
    });

    ul.appendChild(li);
  });

  return ul;
}

function PartyDetails() {
  const div = document.createElement("div");
  div.className = "party-details";

  if (!state.selectedParty) {
    div.innerHTML = `<p class="empty">Select a party to see details.</p>`;
    return div;
  }

  const party = state.selectedParty;

  div.innerHTML = `
    <h2>${party.name}</h2>
    <p><strong>ID:</strong> ${party.id}</p>
    <p><strong>Date:</strong> ${new Date(party.date).toLocaleString()}</p>
    <p><strong>Location:</strong> ${party.location}</p>
    <p>${party.description}</p>
  `;

  return div;
}

function render() {
  const app = document.querySelector("#app");
  app.innerHTML = ""; // clear everything

  const layout = document.createElement("div");
  layout.className = "layout";

  const left = document.createElement("div");
  left.className = "left-panel";
  left.appendChild(document.createElement("h2")).textContent = "Upcoming Parties";
  left.appendChild(PartyList());

  const right = document.createElement("div");
  right.className = "right-panel";
  right.appendChild(document.createElement("h2")).textContent = "Party Details";
  right.appendChild(PartyDetails());

  layout.append(left, right);
  app.appendChild(layout);

  if (state.loading) {
    const loading = document.createElement("p");
    loading.textContent = "Loading...";
    app.prepend(loading);
  }

  if (state.error) {
    const err = document.createElement("p");
    err.textContent = `Error: ${state.error}`;
    err.className = "error";
    app.prepend(err);
  }
}
