import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  idPersona: number | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idPersona = Number(this.route.snapshot.paramMap.get('id'));
  }
}
