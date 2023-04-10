function getTeamsRequest() {
  return fetch("http://localhost:3000/teams-json", {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
}).then((r) => {
    return r.json();
});
}

function createTeamRequest(team) {
  return fetch("http://localhost:3000/teams-json/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(team)
}).then((r) => r.json());
}

function deleteTeamRequest(id){
   return fetch("http://localhost:3000/teams-json/delete", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ id })
}).then((r) => r.json());
}

function getTeamAsHTML(team){
    return `
    <tr>
        <td>${team.promotion}</td>
        <td>${team.members}</td>
        <td>${team.name}</td>
        <td>${team.url}</td>
        <td>
          <a data-id="${team.id}">✖</a>        
        </td>
    </tr>`;
}

function showTeams(teams) {
   const html = teams.map(getTeamAsHTML);
   $('table tbody').innerHTML = html.join("");
}

function $(selector){
    return document.querySelector(selector);
}

function formSubmit(e){
    e.preventDefault();
    console.warn("submit", e);
    const promotion = $("#promotion").value;
    const members = $("#members").value;
    const project = $("#project").value;
    const url = $("#url").value;

    const team = {
        promotion,
        members,
        name: project,
        url,
    };

    createTeamRequest(team).then((status) => {
        console.info("status", status);
        window.location.reload();
    });
}

function deleteTeam(id){
    console.warn("delete", id);
    deleteTeamRequest(id).then((status) => {
        console.warn("status", status);
        window.location.reload();
    });
};

function initEvents(){
    $("#editForm").addEventListener("submit", formSubmit)

    $("table tbody").addEventListener("click", e => {
        if(e.target.matches("a")){
            var id = e.target.dataset.id;
            deleteTeam(id);
        };
    })
}


getTeamsRequest().then((teams) => {
    showTeams(teams);
});

initEvents();