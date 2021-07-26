import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userArray = [];
  originalDataArray = [];
  searchInput = '';
  constructor() {

  }
  ngOnInit(): void {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => {
      this.originalDataArray = json;
      this.userArray = json;
      console.log(json);
    });
  }

  addUser = () => {
    console.log(this.searchInput);
  }

  onChangeSearch = (e) => {
    this.userArray = this.originalDataArray.filter(item => 
      item.name.toLowerCase().includes(e.toLowerCase()) || item.email.toLowerCase().includes(e.toLowerCase()));
  }

  deleteUser = (i) => {
   this.userArray.splice(i, 1);
  }
}
