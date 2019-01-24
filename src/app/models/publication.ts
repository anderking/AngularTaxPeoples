export class Publication{
	constructor(
		public _id: string,
		public title: string,
		public description: string,
		public imagen: string,
		public vistas: string,
		public create_at:string,
		public userID:string,
		public categoriaID: string,
		public rutaID: string,
	){}
}