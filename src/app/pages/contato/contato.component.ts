import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contato',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {
  contatoForm: FormGroup;
  enviando = false;
  statusMensagem = '';
  statusErro = false;

  constructor(private fb: FormBuilder) {
    this.contatoForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      mensagem: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.contatoForm.valid) {
      return;
    }

    this.enviando = true;
    this.statusMensagem = '';
    this.statusErro = false;

    const formValue = this.contatoForm.value;
    const templateParams = {
      from_name: formValue.nome,
      from_email: formValue.email,
      telefone: formValue.telefone,
      mensagem: formValue.mensagem
    };

    emailjs.send('service_7jabldk', 'template_cozxacs', templateParams, 'q-Ga2-wuL2NZZm2zX')
      .then(() => {
        this.statusMensagem = 'Mensagem enviada com sucesso! Obrigado pelo contato.';
        this.contatoForm.reset();
      })
      .catch(() => {
        this.statusErro = true;
        this.statusMensagem = 'Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.';
      })
      .finally(() => {
        this.enviando = false;
      });
  }

  abrirInstagram() {
    window.open('https://www.instagram.com/amt_alliancemuaythai', '_blank');
  }

  abrirWhatsApp() {
    window.open('https://wa.me/5512991016632', '_blank'); // Replace with actual number
  }
}
