export class NewUser {
    name:string;
    email:string;
    contact: number;
    pass: string;
    constructor(
      name: string,
      email: string ,
      pass: string,
      contact: number,
    ) {
      this.name = name;
      this.email = email;
      this.pass = pass;
      this.contact = contact;
    }
  }
  