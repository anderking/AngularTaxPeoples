export class User{
	constructor(
		public _id: string,
		public email: string,
		public password: string,
		public description: string,
		public tipo:string,
		public signupDate:string,
	){}
}