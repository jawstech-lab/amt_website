import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contato',
  standalone: true,
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
      telefone: ['', Validators.required],
      localInteresse: [''],
      mensagem: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.contatoForm.valid) return;

    this.enviando = true;
    this.statusMensagem = '';
    this.statusErro = false;

    const { nome, telefone, localInteresse, mensagem } = this.contatoForm.value;

    emailjs.send('service_7jabldk', 'template_cozxacs', {
      from_name: nome,
      telefone,
      local_interesse: localInteresse,
      mensagem
    }, 'q-Ga2-wuL2NZZm2zX')
      .then(() => {
        this.statusMensagem = 'Mensagem enviada com sucesso! Obrigado pelo contato.';
        this.contatoForm.reset();
      })
      .catch(() => {
        this.statusErro = true;
        this.statusMensagem = 'Ocorreu um erro ao enviar. Tente novamente mais tarde.';
      })
      .finally(() => { this.enviando = false; });
  }
}
