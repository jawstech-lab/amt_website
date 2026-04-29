import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contato',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {
  contatoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contatoForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      mensagem: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contatoForm.valid) {
      const formValue = this.contatoForm.value;
      const subject = `Contato AMT - ${formValue.nome}`;
      const body = `
Nome: ${formValue.nome}
Email: ${formValue.email}
Telefone: ${formValue.telefone}
Mensagem: ${formValue.mensagem}
      `;
      const mailtoLink = `mailto:jawstech@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
    }
  }

  abrirInstagram() {
    window.open('https://www.instagram.com/amt_alliancemuaythai', '_blank');
  }

  abrirWhatsApp() {
    window.open('https://wa.me/5512991016632', '_blank'); // Replace with actual number
  }
}
