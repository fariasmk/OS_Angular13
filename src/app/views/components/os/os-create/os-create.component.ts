import { Router } from '@angular/router';
import { OsService } from './../../../../services/os.service';
import { OS } from './../../../../models/os';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Tecnico } from './../../../../models/tecnico';
import { TecnicoService } from './../../../../services/tecnico.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-os-create',
  templateUrl: './os-create.component.html',
  styleUrls: ['./os-create.component.css'],
})
export class OsCreateComponent implements OnInit {
  
  os: OS = {
    tecnico: '',
    cliente: '',
    observacoes: '',
    status: '',
    prioridade: '',
  }

  tecnicos: Tecnico[] = []
  clientes: Cliente[] = []

  constructor(
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private service: OsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listarTecnicos()
    this.listarClientes()
  }

  create(): void {
    this.service.create(this.os).subscribe((resposta) => {
      this.service.message('Ordem de Serviço Criada com sucesso!')
      this.router.navigate(['os'])
    })
  }

  cancel(): void {
      this.router.navigate(['os'])
  }

  listarTecnicos(): void {
    this.tecnicoService.findAll().subscribe((resposta) => {
      this.tecnicos = resposta
    })
  }

  listarClientes(): void {
    this.clienteService.findAll().subscribe((resposta) => {
      this.clientes = resposta
    })
  }
}
