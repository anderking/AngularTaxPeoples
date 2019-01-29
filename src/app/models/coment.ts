export class Coment{
	constructor(
		public _id: string,
		public text:string,
		public create_at:string,
		public userID: string,
		public publicationID: string,
	){}
}