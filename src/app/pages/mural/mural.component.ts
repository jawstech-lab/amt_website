import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MuralService } from '../../services/mural.service';
import { MuralItem } from '../../models/mural.model';

@Component({
  selector: 'app-mural-avisos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mural.component.html',
  styleUrls: ['./mural.component.css']
})
export class MuralComponent implements OnInit {
  recados: MuralItem[] = [];

  constructor(private service: MuralService) {}

  ngOnInit() {
    this.service.getRecados().subscribe(dados => {

      this.recados = dados.sort((a, b) => b.data.getTime() - a.data.getTime());
    });
  }
}