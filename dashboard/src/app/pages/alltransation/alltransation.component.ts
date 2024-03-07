import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
// import { saveAs } from 'file-saver';
// import html2pdf from 'html2pdf.js';
@Component({
  templateUrl: 'alltransation.component.html',
  styleUrls: ['alltransation.css']

})
export class AlltransationComponent implements OnInit {
  alltransation: any[] = [];
  showalltransation: boolean = false;
  selectedCourse: any; // Assuming you have a variable to store the selected course
  modalVisible: boolean = false; // Variable to control modal visibility
  allTransactions: any[] = [];
  showAllTransactions: boolean = false;
  selectedTransaction: any;
  


  constructor(
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}



  ngOnInit() {
    this.apiService.getalltransaction().subscribe((alltransation) => {
      console.log("alltransationalltransation", alltransation);
      this.alltransation = alltransation.reverse();

      this.showalltransation = this.router.url.includes('/alltransations');
    });
  }

 







  openModal(transaction: any): void {
    const transactionId: number = parseInt(transaction.id, 10);

    this.apiService.gettransactionsid(transactionId).subscribe(
      (transactionDetails) => {
        if (transactionDetails) {
          this.selectedTransaction = transactionDetails;
          const modalId = 'exampleModalLong' + transactionDetails.id;
          console.log(transactionDetails,"jjjjjjjjj")
          this.openModalById(modalId);
        } else {
          console.log('Course details not found.');
          // Handle the case where course details are not found.
        }
      },
      (error) => {
        console.error('Error fetching course details:', error);
      }
    );
  }

  openModalById(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }


  closeModal(): void {
    const modalId = 'exampleModalLong' + this.selectedTransaction.id;
    this.closeModalById(modalId);
  }
  
  closeModalById(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }

//   downloadTransactionDetails(): void {
//     const transactionDetails = this.selectedTransaction;

//     // Create HTML content for the PDF
//     const content = `
//       <div>
//         <p><strong>User Details:</strong></p>
//         <p>UserName: ${transactionDetails.userName}</p>
//         <p>Email: ${transactionDetails.email}</p>
//         <p>Country: ${transactionDetails.country}</p>
//         <p>City: ${transactionDetails.city}</p>
//         <p>State: ${transactionDetails.state}</p>
//         <p>Zip: ${transactionDetails.Zip}</p>

//         <p><strong>Transaction Details:</strong></p>
//         <p>Course Title: ${transactionDetails.courseTitle}</p>
//         <p>Amount: ${transactionDetails.amount}</p>
//         <p>Currency: ${transactionDetails.currency}</p>
//       </div>
//     `;

//     const options = {
//       margin: 10,
//       filename: 'transaction_details.pdf',
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
//     };

//     // Convert HTML content to PDF
//     html2pdf().from(content).set(options).outputPdf().then((pdf) => {
//       // Use file-saver to save the PDF as a file
//       saveAs(pdf, 'transaction_details.pdf');
//     }).catch((error) => {
//       console.error('Error generating PDF:', error);
//     });
// }
}