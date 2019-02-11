import { Component, OnInit } from '@angular/core';
import { Publication } from '../../../models/publication';
import { PublicationService } from '../../../services/publication.service';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Coment } from '../../../models/coment';
import { ComentService } from '../../../services/coment.service';
import { Calificacion } from '../../../models/calificacion';
import { CalificacionService } from '../../../services/calificacion.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { Like } from '../../../models/like';
import { LikeService } from '../../../services/like.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-publicationsshow',
  templateUrl: './publicationsshow.component.html',
  styleUrls: ['./publicationsshow.component.css']
})

export class PublicationsshowComponent implements OnInit
{
	public user: User;
	public publication: Publication;
	public publicationID: string;
	public coment: Coment;
	public comentSingle: Coment;
	public comentForUpdate: Coment;
	public likesPublication: Like;
	public save_coment: Coment;
	public update_coment: Coment;
	public comentsPublication: any;

	public calificacionesR: any;
	public totalCalificacionesR:number=0;
	public countCalificacionesR:number=0;
	public promedioCalificaciones;

	public totalComents:number=0;
	public totalLikes:number=0;
	public url: string;
	public confirm: boolean;
	public resID:string = localStorage.getItem('resID');
	public rolID:string=localStorage.getItem('rolID');
	public likebool:boolean=false;
	public ispost:boolean=false;
	public iscoment:boolean=true;
	

	constructor
	(
		private _publicationService: PublicationService,
		private _userService: UserService,
		private _likeService: LikeService,
		private _comentService: ComentService,
		private _calificacionService: CalificacionService,

		private spinner: NgxSpinnerService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _location: Location,
	)
	{
		this.url = Global.url;
    	this.confirm = false;
	}

	ngOnInit()
	{
		this._route.params.subscribe
		(
			params =>
			{
				let id = params.id;
				this.publicationID = id;
				this.getPublication(id);
				this.getLikesPublication(id);
				this.getcomentsPublication(id);
				this.islike(id)
			}
		);
		this.getUser(this.resID);
	}

	getUser(id)
	{
		this._userService.getUser(id).subscribe
		(
			response =>
			{
				this.user = response.user;
			},
			error =>
			{
				console.log(<any>error);
			}
		)
	}

	getPublication(id)
	{
		this._publicationService.getPublication(id).subscribe
		(
			response =>
			{
				this.publication = response.publication;
				this.getCalificacionesR(this.publication.userID._id);

				if(this.publication.userID._id==this.resID)
				{
					this.ispost = true;
				}				
				else
					this.ispost =false;

			},
			error =>
			{
				console.log(<any>error);
			}
		);
	}

	deletePublication(id)
	{
		this._publicationService.deletePublication(id).subscribe(
			response =>
			{
				if(response.publication)
				{
					if(this.user.tipo=="miembro")
					{
						this._router.navigate(['/publicaciones/user/'+this.user._id+'']);
					}

					if(this.user.tipo=="admin")
					{
						this._router.navigate(['/publicaciones/']);
					}
				}
				$('body').removeClass('modal-open');
				$("body").removeAttr("style");
				$('.modal-backdrop.fade.show').css('display','none');
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	getLikesPublication(id)
	{
		this._likeService.getLikesPublication(id).subscribe
		(
			response =>
			{
				this.likesPublication = response.likesPublication;
				this.totalLikes = response.likesPublication.length;
			},
			error =>
			{
				console.log(<any>error);
			}
		)
	}

 	getcomentsPublication(id)
	{
		this._comentService.getcomentsPublication(id).subscribe
		(
			response =>
			{
				this.comentsPublication = response.comentsPublication;
				this.totalComents = this.comentsPublication.length;
			},
			error =>
			{
				console.log(<any>error);
			}
		)
	}

	registerComent(form: NgForm)
	{
		if(form.valid)
		{
			this.coment = new Coment('','','',this.resID,this.publicationID);

			this.coment.text = form.form.value.text;
			
			this._comentService.saveComent(this.coment).subscribe
			(
				response =>
				{
						this.save_coment = response.coment;
						form.reset();
						this.getcomentsPublication(this.publicationID);
				},
				error =>
				{
					console.log(error);
				}
			);
		}else
		{
			console.log("Form no valido");
		}
	}

	updateComent(update: NgForm)
	{
		if(update.valid)
		{
			var textEdit = update.form.value.text;
			this.getcomentFormUpdate(update.form.value._id,textEdit);
		}else
		{
			var id = update.form.value._id;
			$('#inputComent-'+id+'').addClass('is-invalid');
		}
	}

	getcomentFormUpdate(id,textEdit)
	{
		this._comentService.getComent(id).subscribe
		(
			response =>
			{
				this.comentForUpdate = response.coment;
				this.comentForUpdate.text = textEdit;
				this._comentService.updateComent(this.comentForUpdate).subscribe
				(
					res =>
					{
							this.update_coment = res.coment;
							this.iscoment = true;
							$('#inputComent-'+id+'').removeClass('is-invalid');
							$('#mostrarUpdate-'+id+'').css('display','none');
							$('#mostrarComent-'+id+'').css('display','block');
							this.getcoment(this.update_coment._id);
					},
					error =>
					{
						console.log(error);
					}
				);
			},
			error =>
			{
				console.log(<any>error);
			}
		)
	}

	getcoment(id)
	{
		this._comentService.getComent(id).subscribe
		(
			response =>
			{
				this.comentSingle = response.coment;
			},
			error =>
			{
				console.log(<any>error);
			}
		)
	}

	mostrarUpdate(id)
	{
		$('#mostrarUpdate-'+id+'').css('display','block');
		$('#mostrarComent-'+id+'').css('display','none');
		$('#inputComent-'+id+'').css('heigth','auto');

	}

	cancelarUpdate(id)
	{
		this.getcomentsPublication(this.publicationID);
		setTimeout
		(
			() =>
			{
				$('#inputComent-'+id+'').removeClass('is-invalid');
				$('#mostrarUpdate-'+id+'').css('display','none');
				$('#mostrarComent-'+id+'').css('display','block');
			},
			50
		);
			
	}

	deleteComent(id)
	{
		this._comentService.deleteComent(id).subscribe
		(
			response =>
			{
				$('body').removeClass('modal-open');
				$("body").removeAttr("style");
				$('.modal-backdrop.fade.show').css('display','none');
				this.getcomentsPublication(this.publicationID);
			},
			error =>
			{
				console.log(<any>error);
			}
		);
	}

    islike(id)
    {
    	this._likeService.isLike(this.resID,id).subscribe(
			response =>
			{
				if(response)
          			this.likebool=true;
          		else
          			this.likebool=false;
			},
			error =>
			{
				console.log(<any>error);
			}
		);
    }

    upLike()
    {
    	this._likeService.upLike(this.publication._id,this.resID).subscribe(
    		response =>
			{
				this.getLikesPublication(this.publication._id);
				this.islike(this.publication._id);

			},
			error =>
			{
				console.log(<any>error);
			}
    	);
    }

    disLike()
    {
    	this._likeService.disLike(this.publication._id,this.resID).subscribe(
    		response =>
			{
				this.getLikesPublication(this.publication._id);
				this.islike(this.publication._id);
			},
			error =>
			{
				console.log(<any>error);
			}
    	);
    }

    comentarioFocus()
    {
    	$('#comentarioFocusInput').focus();
    }

    getCalificacionesR(idR)
    {
    	this._calificacionService.getCalificacionesR(idR).subscribe(
			response =>
			{
				if(response)
				{
					this.calificacionesR = response.calificacionesR;
					this.totalCalificacionesR = 0;
					this.countCalificacionesR = 0;
					this.promedioCalificaciones = 0;
					for(var i=0; i<this.calificacionesR.length;i++)
					{
						this.totalCalificacionesR = this.totalCalificacionesR + this.calificacionesR[i].value;
						this.countCalificacionesR = this.countCalificacionesR +1;
						if(this.countCalificacionesR>0)
						{
							this.promedioCalificaciones =  parseFloat( (this.totalCalificacionesR/this.countCalificacionesR).toFixed(2) );
						}
					}
				}

			},
			error =>
			{
				console.log(<any>error);
			}
		);
    }

 	goBack()
	{ 
		this._location.back(); 
    }

    removerModal(){
    	$('body').removeClass('modal-open');
		$("body").removeAttr("style");
		$('.modal-backdrop.fade.show').css('display','none');
		$('#listaCalificaciones').css('display','none');
    }
}

