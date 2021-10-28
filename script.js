var data = {};
var tabledub = `<table class="tb-double"><thead><tr><th class="tb-0"></th><th></th><th></th><th class="tb-0"></th></tr><tr><th>Name</th><th>score</th><th>notes</th><th>Name</th><th>score</th><th>notes</th></thead><tbody></tbody></table>`
var tablel1 = `<table class="tb-l1" style="display: none"><thead><tr><th class="tb-0"></th></tr><tr><th>Name</th><th>score</th><th>notes</th</thead><tbody></tbody></table>`
var tablel2 = `<table class="tb-l2" style="display: none"><thead><tr><th class="tb-0"></th></tr><tr><th>Name</th><th>score</th><th>notes</th></thead><tbody></tbody></table>`

window.onload = function() {
document.getElementById("submit").addEventListener("click", function() {
  data["list1"] = document.getElementById("flist").value;
  data["list2"] = document.getElementById("llist").value;
  data["type"] = document.getElementById("datatype").value.toUpperCase();
  document.getElementById("submit").disabled = true;
  
  sendlists(data);
});
};

function buildhtml(response, d) {
  let button = `<button style="display: block" onclick="hidetable('tb-double')">Click Me</button>`
  let revertbtn = `<button id="revbtn" style="display: block" onclick="revert()">New Search</button>`

  let mbody = document.getElementsByClassName("mainbody")[0];
  mbody.insertAdjacentHTML('beforeend', tabledub);
  mbody.insertAdjacentHTML('beforeend', tablel1);
  mbody.insertAdjacentHTML('beforeend', tablel2);
  let table = mbody.getElementsByClassName("tb-double")[0];
  let tablelist1 = mbody.getElementsByClassName("tb-l1")[0];
  let tablelist2 = mbody.getElementsByClassName("tb-l2")[0];

  if (makehtml(table, tablelist1, tablelist2, response, d) == "OK") {
    document.getElementsByClassName("header")[0].getElementsByTagName("h1")[0].insertAdjacentHTML('afterbegin', revertbtn);
    mbody.insertAdjacentHTML('afterbegin', button)
    button = `<button style="display: block" onclick="hidetable('tb-l1')">Click Me</button>`
    tablelist1.insertAdjacentHTML('beforebegin', button)
    button = `<button style="display: block" onclick="hidetable('tb-l2')">Click Me</button>`
    tablelist2.insertAdjacentHTML('beforebegin', button)
    mbody.getElementsByClassName("inputs")[0].style.display = "none";
  }
}

async function sendlists(d) {
  var http = new XMLHttpRequest();
  var url = "https://LoathsomePersonalSort.bandaras213.repl.co/request";
  var params = JSON.stringify(d);

  http.open("POST", url, true);
  http.setRequestHeader("Content-type", "application/json");

  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
      if (JSON.parse(http.responseText).name == "Username Error") {
        console.log(JSON.parse(http.responseText).message)
        console.log(JSON.parse(http.responseText).cause)
      } else {
        buildhtml(JSON.parse(http.responseText), d);
      }
    }
  }
  http.send(params);
}

function makehtml(table, t1, t2, res, d) {
  let status;

  try {
    let tbody = table.getElementsByTagName("tbody")[0]
    table.getElementsByClassName("tb-0")[0].innerText = d.list1;
    table.getElementsByClassName("tb-0")[1].innerText = d.list2;

    for (var i = 0; i < res.doubles.length; i += 2) {
      let tr = document.createElement("tr");
      let td = document.createElement("td");
      let span = document.createElement("span");
      td.innerText = res.doubles[i].media.title.romaji;
      tr.appendChild(td);
      td = document.createElement("td");
      td.innerText = res.doubles[i].score;
      tr.appendChild(td);
      td = document.createElement("td");
      if (res.doubles[i].notes != null) {
        td.innerText = "A";
        td.className = "tooltip";
        span.className = "tooltiptext";
        span.innerText = res.doubles[i].notes
        td.appendChild(span);
      }
      tr.appendChild(td);
      td = document.createElement("td");
      td.innerText = res.doubles[i + 1].media.title.romaji;
      tr.appendChild(td);
      td = document.createElement("td");
      td.innerText = res.doubles[i + 1].score;
      tr.appendChild(td);
      td = document.createElement("td");
      if (res.doubles[i + 1].notes != null) {
        span = document.createElement("span");
        td.innerText = "A";
        td.className = "tooltip";
        span.className = "tooltiptext";
        span.innerText = res.doubles[i + 1].notes;
        td.appendChild(span);
      }
      tr.appendChild(td);
      tbody.appendChild(tr);
    }
    status = "OK";
  } catch (e) {
    console.log(e)
    status = "Err";
    return status
  }

  try {
    let tbody = t1.getElementsByTagName("tbody")[0]
    t1.getElementsByClassName("tb-0")[0].innerText = d.list1;
    for (let i in res.list1.data.MediaListCollection.lists) {
      for (let a in res.list1.data.MediaListCollection.lists[i].entries) {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        let span = document.createElement("span");
        td.innerText = res.list1.data.MediaListCollection.lists[i].entries[a].media.title.romaji;
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerText = res.list1.data.MediaListCollection.lists[i].entries[a].score;
        tr.appendChild(td);
        td = document.createElement("td");
        if (res.list1.data.MediaListCollection.lists[i].entries[a].notes != null) {
          td.innerText = "A";
          td.className = "tooltip";
          span.className = "tooltiptext";
          span.innerText = res.list1.data.MediaListCollection.lists[i].entries[a].notes
          td.appendChild(span);
        }
        tr.appendChild(td);
        tbody.appendChild(tr);
      }
    }
   status = "OK";
  } catch (e) {
    console.log(e)
    status = "Err";
    return status
  }
  
  try {
    let tbody = t2.getElementsByTagName("tbody")[0]
    t2.getElementsByClassName("tb-0")[0].innerText = d.list2;
    for (let i in res.list2.data.MediaListCollection.lists) {
      for (let a in res.list2.data.MediaListCollection.lists[i].entries) {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        let span = document.createElement("span");
        td.innerText = res.list2.data.MediaListCollection.lists[i].entries[a].media.title.romaji;
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerText = res.list2.data.MediaListCollection.lists[i].entries[a].score;
        tr.appendChild(td);
        td = document.createElement("td");
        if (res.list2.data.MediaListCollection.lists[i].entries[a].notes != null) {
          td.innerText = "A";
          td.className = "tooltip";
          span.className = "tooltiptext";
          span.innerText = res.list2.data.MediaListCollection.lists[i].entries[a].notes
          td.appendChild(span);
        }
        tr.appendChild(td);
        tbody.appendChild(tr);
      }
    }
   status = "OK";
  } catch (e) {
    console.log(e)
    status = "Err";
    return status
  }

  return status
}

function hidetable(name) {
  var x = document.getElementsByClassName(name)[0];
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function revert() {
  let mbody = document.getElementsByClassName("mainbody")[0];
  document.getElementById("revbtn").remove();
  mbody.querySelectorAll('button').forEach(e => e.remove());
  mbody.getElementsByClassName("tb-double")[0].remove();
  mbody.getElementsByClassName("tb-l1")[0].remove();
  mbody.getElementsByClassName("tb-l2")[0].remove();
  document.getElementById("flist").value = "";
  document.getElementById("llist").value = "";
  mbody.getElementsByClassName("inputs")[0].style.display = "block";
  document.getElementById("submit").disabled = false;
}