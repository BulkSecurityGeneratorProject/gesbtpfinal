import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Register } from '../account';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LOGIN_ALREADY_USED_TYPE, EMAIL_ALREADY_USED_TYPE } from '../shared';

@Component({
  selector: 'jhi-virement',
  templateUrl: './virement.component.html',
  styleUrls: [
    'virement.scss'
  ]
})
export class VirementComponent implements OnInit {
  typeVirement = '';
  donnees: any;
  success: boolean;
  error: string;
  errorEmailExists: string;
  errorUserExists: string;

  constructor(private route: ActivatedRoute,
    private registerService: Register,
    private http: HttpClient) { }

  ngOnInit() {
    this.route.queryParams.subscribe((p) => {
      this.typeVirement = p['typevirement'];
      this.donnees = JSON.parse(p['data']);
    });
  }

  payement() {
    this.error = null;
    this.errorUserExists = null;
    this.errorEmailExists = null;
    if (this.typeVirement === 'simple') {
      this.registerService.save(this.donnees).subscribe(() => {
        this.success = true;
        alert('Patientez le temps que l\'on vous recontacte avec les informations de votre compte.');
      },
        (response) => this.processError(response));
    } else if (this.typeVirement === 'pro') {
      this.registerService.savePro(this.donnees).subscribe(() => {
        this.success = true;
        alert('Patientez le temps que l\'on vous recontacte avec les informations de votre compte.');
      },
        (response) => this.processError(response));
    } else {
      this.registerService.savePremium(this.donnees).subscribe(() => {
        this.success = true;
        alert('Patientez le temps que l\'on vous recontacte avec les informations de votre compte.');
      },
        (response) => this.processError(response));
    }
  }

  private processError(response: HttpErrorResponse) {
    this.success = null;
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.errorUserExists = 'ERROR';
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.errorEmailExists = 'ERROR';
    } else {
      this.error = 'ERROR';
    }
  }

}
