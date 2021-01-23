
const dodaj = document.getElementById('dodaj');
const szukaj = document.getElementById('szukaj');
const card = document.querySelector("#dodaj-card");
const xButton = document.getElementById('x')
const table = document.getElementsByClassName('tablica')
const delBtn = document.getElementsByClassName('delBtn')
const tBody = document.querySelector('tbody')
const navRowery = document.getElementById('navrowery')
const navCzesci = document.getElementById('navczesci')
const home = document.getElementById('home')
const wyl = document.getElementById('navwyl')
const minus = document.getElementsByClassName('minus')
const plus = document.getElementsByClassName('plus')

function refreshPage(){
  window.location.reload();
} 



fetch('http://localhost:3000/items')
  .then(response => response.json())
  .then((data)=> {
    data = data.sort((a, b) => a.opis.localeCompare(b.opis));
    var html = '<table>';
    html += '<tr>';
    for( var j in data[0] ) {
     html += '<th>' + j + '</th>';
    }
    html += '</tr>';
    for( var i = 0; i < data.length; i++) {
     html += '<tr>';
     for( var j in data[i] ) {
       html += '<td>' + data[i][j] + '</td>';
     }
     html += '<td><button class="delBtn">USUŃ</button></td>'
     html += '</tr>';
    }
    html += '</table>';



    document.getElementById('container').innerHTML = html;
    for( var i = 1; i <= data.length; i++) {
      let btn = document.getElementById('container').rows[i].children[2]
      btn.innerHTML = `${btn.innerHTML} <button class='plusminus minus'>-</button> <button class='plusminus plus'>+</button>`
    }
    
    for (let i = 0;i< plus.length; i++){
      plus[i].addEventListener('click', ()=>{
        let opis = plus[i].parentElement.parentElement.children[1].innerHTML;
        
        
        fetch('http://localhost:3000/' + opis, {
         method: 'PUT',
      }); setTimeout(refreshPage(),1000);
      }
      )
    }

    for (let i = 0;i< minus.length; i++){
      minus[i].addEventListener('click', ()=>{
        let opis1 = minus[i].parentElement.parentElement.children[1].innerHTML;
        
        
        fetch('http://localhost:3000/minus/' + opis1, {
         method: 'PUT',
      }); 
      setTimeout(refreshPage(),1500);
      }
      )
    }
   

    for (let i = 0;i<delBtn.length;i++) {
      delBtn[i].addEventListener('click', function() {
         let opis = delBtn[i].parentElement.parentElement.children[1].innerHTML 
         fetch('http://localhost:3000/' + opis, {
         method: 'DELETE',
    });
    setTimeout(refreshPage(),200);
  });
  }
  });



navCzesci.addEventListener("click", ()=>{
  document.querySelector('tbody').remove()
  document.getElementById('spis').innerHTML = 'Spis części:';

  fetch('http://localhost:3000/czesci')
  .then(response => response.json())
  .then((data)=> {
    var html = '<table>';
    html += '<tr>';
    for( var j in data[0] ) {
     html += '<th>' + j + '</th>';
    }
    html += '</tr>';
    for( var i = 0; i < data.length; i++) {
     html += '<tr>';
     for( var j in data[i] ) {
       html += '<td>' + data[i][j] + '</td>';
     }
     html += '<td><button class="delBtn">USUŃ</button></td>'
     html += '</tr>';
    }
    html += '</table>';

    document.getElementById('container').innerHTML = html;
  });

});

navRowery.addEventListener("click", ()=>{
  document.querySelector('tbody').remove()

  document.getElementById('spis').innerHTML = 'Spis rowerów:';

  fetch('http://localhost:3000/rowery')
  .then(response => response.json())
  .then((data)=> {
    var html = '<table>';
    html += '<tr>';
    for( var j in data[0] ) {
     html += '<th>' + j + '</th>';
    }
    html += '</tr>';
    for( var i = 0; i < data.length; i++) {
     html += '<tr>';
     for( var j in data[i] ) {
       html += '<td>' + data[i][j] + '</td>';
     }
     html += '<td><button class="delBtn">USUŃ</button></td>'
     html += '</tr>';
    }

    html += '</table>';

    document.getElementById('container').innerHTML = html;
    
  });

});

dodaj.addEventListener("click", ()=>{
    card.hidden = false
});

xButton.addEventListener("click", ()=>{
    card.hidden = true
})

wyl.addEventListener("click", () => {
    fetch('http://localhost:3000/logout',{
      method: 'POST'
    })
})




home.addEventListener("click", ()=> {
  
  document.querySelector('tbody').remove()

  document.getElementById('spis').innerHTML = 'Spis części i rowerów';

  fetch('http://localhost:3000/items')
  .then(response => response.json())
  .then((data)=> {
    data = data.sort((a, b) => a.opis.localeCompare(b.opis));
    var html = '<table>';
    html += '<tr>';
    for( var j in data[0] ) {
     html += '<th>' + j + '</th>';
    }
    html += '</tr>';
    for( var i = 0; i < data.length; i++) {
     html += '<tr>';
     for( var j in data[i] ) {
       html += '<td>' + data[i][j] + '</td>';
     }
     html += '<td><button class="delBtn">USUŃ</button></td>'
     html += '</tr>';
    }

    html += '</table>';

    document.getElementById('container').innerHTML = html;
    
    for( var i = 1; i <= data.length; i++) {
      let btn = document.getElementById('container').rows[i].children[2]
      btn.innerHTML = `${btn.innerHTML} <button class='plusminus minus'>-</button> <button class='plusminus plus'>+</button>`
    }
    
    for (let i = 0;i< plus.length; i++){
      plus[i].addEventListener('click', ()=>{
        let opis = plus[i].parentElement.parentElement.children[1].innerHTML;
        
        
        fetch('http://localhost:3000/' + opis, {
         method: 'PUT',
      }); 
      // setTimeout(refreshPage(),1000);
      }
      )
    }

    for (let i = 0;i< minus.length; i++){
      minus[i].addEventListener('click', ()=>{
        let opis1 = minus[i].parentElement.parentElement.children[1].innerHTML;
        
        
        fetch('http://localhost:3000/minus/' + opis1, {
         method: 'PUT',
      }); 
      setTimeout(refreshPage(),1000);
      }
      )
    }
   

    for (let i = 0;i<delBtn.length;i++) {
      delBtn[i].addEventListener('click', function() {
         let opis = delBtn[i].parentElement.parentElement.children[1].innerHTML 
         fetch('http://localhost:3000/' + opis, {
         method: 'DELETE',
    });
    refreshPage();
  });
  }
  });

});

function myFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("container");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
};










