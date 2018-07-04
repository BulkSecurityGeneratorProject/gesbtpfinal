import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Devis } from './devis.model';
import { DevisService } from './devis.service';
import { Entreprise } from '../entreprise';
import { LigneDevisService, LigneDevis } from '../ligne-devis';
import { Client, ClientService } from '../client';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'jhi-devis-par-chantier',
  templateUrl: './devis-par-chantier.component.html',
  styles: []
})
export class DevisParChantierComponent implements OnInit, OnDestroy {

    devis: Devis;
    ligneDevis: LigneDevis[];
    entreprise: Entreprise;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    id: number;
    client: Client;
    total = 0.0;
    totaltva = 0.0;
    totalTTC = 0.0;

  constructor(
        private eventManager: JhiEventManager,
        private devisService: DevisService,
        private route: ActivatedRoute,
        private router: Router,
        private ligneDevisService: LigneDevisService,
        private clientService: ClientService,
        private sanitizer: DomSanitizer
  ) { }
  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
        this.id = params['id'];
        this.load(params['id']);
    });
    this.clientService.find(+sessionStorage.getItem('idClient'))
    .subscribe((clientResponse: HttpResponse<Client>) => {
        this.client = clientResponse.body;
    });
    this.registerChangeInDevis();
}

load(id) {
    this.devisService.devisByChantierId(id)
        .subscribe((devisResponse: HttpResponse<Devis>) => {
            this.devis = devisResponse.body;
            this.ligneDevisService.ligneDevisByDevisId(this.devis.id).subscribe((ligneDevisResponse: HttpResponse<LigneDevis[]>) => {
              this.ligneDevis = ligneDevisResponse.body;
              this.ligneDevis.map((ligne) => {
                   this.total = this.total + ( ligne.prixUnitaire * ligne.quantite );
              });
              this.totaltva = this.total * this.devis.tva / 100;
              this.totalTTC = this.total + this.totaltva ;
            });
        });
}
previousState() {
  this.router.navigate(['/affectations/', +sessionStorage.getItem('idChantier') ]);
}

ngOnDestroy() {
    this.subscription.unsubscribe();
    this.eventManager.destroy(this.eventSubscriber);
}

registerChangeInDevis() {
    this.eventSubscriber = this.eventManager.subscribe(
        'devisListModification',
        (response) => this.load(this.id)
    );
}
download() {
    html2canvas(document.getElementById('dev'), { useCORS: true  }).then((canvas) =>  {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = canvas.toDataURL('image/png');
      const doc = new jsPDF();
      doc.addImage(img, 'JPEG', 20, 50, 180, 160);
      doc.save('test.pdf');
  });
}
}
