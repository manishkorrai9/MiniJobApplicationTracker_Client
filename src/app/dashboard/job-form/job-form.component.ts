import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent {
  jobForm: FormGroup;
  isEditMode: boolean = false;
 statuses: string[] = ['Interview', 'Offered', 'Rejected', 'On Hold'];
  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private dialogRef: MatDialogRef<JobFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.jobForm = this.fb.group({
      company: ['', Validators.required],
      role: ['', Validators.required],
      application_date: ['', Validators.required],
      status: ['', Validators.required],
      notes: ['']
    });

    if (data) {
      this.isEditMode = true;

      this.jobForm.patchValue({
        company: data.company_name,
        role: data.job_title,
        application_date: data.application_date ? new Date(data.application_date) : null,
        status: data.status,
        notes: data.notes
      });
    }
  }

onSubmit() {
  const rawDate = this.jobForm.value.application_date;
  const dateObj = rawDate instanceof Date ? rawDate : new Date(rawDate);
  const formattedDate = !isNaN(dateObj.getTime()) ? dateObj.toISOString().slice(0, 10) : null;

  const payload = {
    company_name: this.jobForm.value.company,
    job_title: this.jobForm.value.role,
    application_date: formattedDate,
    status: this.jobForm.value.status,
    notes: this.jobForm.value.notes
  };

  console.log('Payload:', payload);

  if (this.isEditMode && this.data?.id) {
    this.jobService.updateJob(this.data.id, payload).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => console.error('Update failed:', err)
    });
  } else {
    this.jobService.createJob(payload).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => console.error('Creation failed:', err)
    });
  }
}


}
