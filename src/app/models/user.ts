export class User{
	constructor(
		public _id: string,
		public email: string,
		public password: string,
		public description: string,
		public tipo:string,
		public image:string,
		public create_at:string,
	){}
}