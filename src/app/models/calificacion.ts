export class Calificacion{
	constructor(
		public _id: string,
		public userEmisorID: string,
		public userReceptorID: string,
		public value: number,
	){}
}