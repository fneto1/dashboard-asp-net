import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Server } from 'src/app/shared/server';
import { Observable, Subscription, timer } from 'rxjs';
import { first } from 'rxjs/operators';
import { ServerMessage } from 'src/app/shared/server-message';

// const SAMPLE_SERVERS = [
//   { id: 1, name: 'dev-web', isOnline: true },
//   { id: 2, name: 'dev-mail', isOnline: false },
//   { id: 3, name: 'prod-web', isOnline: true },
//   { id: 4, name: 'prod-mail', isOnline: true },
// ];

@Component({
  selector: 'app-section-health',
  templateUrl: './section-health.component.html',
  styleUrls: ['./section-health.component.css'],
})
export class SectionHealthComponent implements OnInit, OnDestroy {
  constructor(private _serverService: ServerService) {}
  servers: Server[] = [];
  timerSubscription!: Subscription;

  ngOnInit() {
    this.refreshData();
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  refreshData() {
    this._serverService.getServers().subscribe((res) => {
      this.servers = res;
    });
  }

  subscribeToData() {
    this.timerSubscription = timer(5000)
      .pipe(first())
      .subscribe(() => this.refreshData());
  }

  sendMessage(msg: ServerMessage) {
    this._serverService.handleServerMessage(msg).subscribe({
      next: (res) => {
        console.log('Resposta da requisição:', res);
        // Atualiza a lista de servidores após enviar a mensagem com sucesso
        this.refreshData();
      },
      error: (err) => {
        console.error('Erro na requisição:', err);
      },
    });
  }
}
