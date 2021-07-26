import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userArray = [];
  originalDataArray = [];
  searchInput = '';
  user = {
    name: '',
    email: '',
    username: '',
    phone: '',
    company: '',
    address: '',
  };
  editUser = {
    name: '',
    email: '',
    username: '',
    phone: '',
    company: '',
    address: '',
    id: 0,
  };
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

  onChangeSearch = (e) => {
    this.userArray = this.originalDataArray.filter(item =>
      item.name.toLowerCase().includes(e.toLowerCase()) || item.email.toLowerCase().includes(e.toLowerCase()));
  }

  deleteUser = (i) => {
   Swal.fire({
     icon: 'warning',
     title: 'Are you sure',
     confirmButtonText: 'Yes, delete it!',
     showCancelButton: true,
   }).then((result) => {
    if (result.isConfirmed) {
      this.userArray.splice(i, 1);
      Swal.fire(
        'Deleted!',
        'User has been deleted.',
        'success'
      );
    }
  });
  }

  addUser = () => {
    const tempObj = {
      id: this.userArray.length + 1,
      name: this.user.name,
      email: this.user.email,
      company: {
        name: this.user.company
      },
      username: this.user.username,
      address: {
        city: this.user.address
      },
      phone: this.user.phone,
    };

    console.log(tempObj);
    this.userArray.push(tempObj);
    Swal.fire(
      'Added successfully!',
      'User has been Added.',
      'success'
    );
  }

  loadData = (i) => {
    this.editUser = {
      name: this.userArray[i].name,
      email: this.userArray[i].email,
      phone: this.userArray[i].phone,
      username: this.userArray[i].username,
      id: this.userArray[i].id,
      company: this.userArray[i].company.name,
      address: this.userArray[i].address.city,
    }
  }

  editUserhandler = () => {
    const foundIndex = this.userArray.findIndex(item => item.id === this.editUser.id);
    this.userArray[foundIndex] = this.editUser;
    this.userArray[foundIndex].company = {
      name: this.editUser.company
    };
    this.userArray[foundIndex].address = {
      city: this.editUser.address
    };
    Swal.fire(
      'Updated successfully!',
      'User details has been updated.',
      'success'
    );
  }

}
