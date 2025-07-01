import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { CreateAuctionService } from './create-auction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.scss']
})
export class CreateAuctionComponent {
  auctionForm!: FormGroup;
  auctionImgCreated = false; // Set this to true once auction is successfully created
  imageFiles: File[] = [];
  imagePreviews: string[] = [];
  userDetails: any;
  currentSalvageId: any;
  route = inject(Router);

  countryId: any;
  countries: any;

  regionId: any;
  region: any;

  district: any;

  // conditionOptions: string[] = [
  //   'New',
  //   'Like New',
  //   'Excellent',
  //   'Good',
  //   'Fair',
  //   'Poor',
  //   'Non-Running',
  //   'Parts Only',
  //   'Flood Damaged',
  //   'Fire Damaged',
  //   'Accident Vehicle',
  //   'Rebuilt'
  // ];
  conditionOptions: any;


  constructor(private fb: FormBuilder, private service: CreateAuctionService) { }

  ngOnInit() {
    this.userDetails = JSON.parse(sessionStorage.getItem('UserDetails') || '{}');
    this.getCountry();
    this.getCondition();
    this.initForm();
    this.auctionForm.get('country')?.valueChanges.subscribe((countryId: any) => {
      if (countryId) {
        this.getRegion(countryId);
      }
    });
    this.auctionForm.get('region')?.valueChanges.subscribe((regionId: any) => {
      if (regionId) {
        this.getDistrict(regionId)
      }
    })
  }

  initForm() {
    this.auctionForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', Validators.required],
      minimumBidAmount: [1, [Validators.required]],
      biddingStart: ['', Validators.required],
      biddingEnd: ['', Validators.required],
      conditionDetails: ['', Validators.required],
      country: ['', Validators.required],
      region: ['', Validators.required],
      district: ['', Validators.required],
      minimumBiddingPersons: [0],
      companyCode: [''],
      companyName: [''],
      claimNumber: [''],
      makeModel: [''],
      incrementValue: [0]
    }, {
      validators: [
        this.bidIncrementNotLessThanMinBid,
        this.futureDateValidator,
        this.biddingEndAfterStart
      ]
    });
  }

  // Custom Validators
  bidIncrementNotLessThanMinBid(group: AbstractControl): ValidationErrors | null {
    const minBid = group.get('minimumBidAmount')?.value;
    const increment = group.get('bidIncrement')?.value;
    if (increment < minBid) {
      return { bidIncrementInvalid: true };
    }
    return null;
  }

  futureDateValidator(group: AbstractControl): ValidationErrors | null {
    const now = new Date();
    const start = new Date(group.get('biddingStart')?.value);
    const end = new Date(group.get('biddingEnd')?.value);
    if (now > start && now > end) {
      return { pastDatesNotAllowed: true };
    }
    return null;
  }

  biddingEndAfterStart(group: AbstractControl): ValidationErrors | null {
    const start = new Date(group.get('biddingStart')?.value);
    const end = new Date(group.get('biddingEnd')?.value);
    if (end <= start) {
      return { endBeforeStart: true };
    }
    return null;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    Array.from(input.files).forEach(file => {
      this.imageFiles.push(file);
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviews.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number): void {
    this.imageFiles.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }

  // get condition
  getCondition() {
    this.service.getVechileCondition().subscribe(
      (res: any) =>{
        this.conditionOptions = res;
        console.log(this.conditionOptions);
        
      }
    )
  }

  // get country
  getCountry() {
    this.service.getCountry().subscribe(
      (res: any) => {
        this.countries = res;
      }
    );
  }

  // get region
  getRegion(Id: any) {
    this.service.getRegion(Id).subscribe(
      (res: any) => {
        this.region = res;
      }
    )
  }

  // get district 
  getDistrict(Id: any) {
    this.service.getDistricts(Id).subscribe(
      (res: any) => {
        this.district = res
      }
    )
  }

  onSubmit() {
    if (this.auctionImgCreated) {
      const formData = new FormData();
      this.imageFiles.forEach(file => {
        formData.append('imageFiles', file);
      });
      this.service.uploadImage(this.currentSalvageId, formData).subscribe(
        (response) => {
          console.log('Image uploaded successfully', response);
          this.route.navigate(['/view-dashboard']);
        },
        (error) => {
          console.error('Error uploading image', error);
        }
      )
    }
    else {
      if (this.auctionForm.valid) {
        const req = {
          ...this.auctionForm.value,
          postedById: this.userDetails.userId
        };
        this.service.create(req).subscribe(
          (response: any) => {
            console.log('Auction created successfully', response);
            this.currentSalvageId = response.salvageId;
            this.auctionImgCreated = true;
          },
          (error) => {
            console.error('Error creating auction', error);
            this.auctionImgCreated = false;
          }
        );
      } else {
        console.log('Form is valid', this.auctionForm.value,);
        this.auctionForm.markAllAsTouched();
        return;
      }
    }

  }
}
