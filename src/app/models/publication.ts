export class Publication{
	constructor(
		public _id: string,
		public title: string,
		public description: string,
		public tarifa: string,
		public image: string,
		public vistas: string,
		public create_at:string,
		public categoriaID: string,
		public rutaID: string,
		public userID:any,
	){}
}