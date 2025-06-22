import { Component, OnInit } from '@angular/core';
import { JobService } from './services/job.service';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { JobFormComponent } from './job-form/job-form.component';
import { BehaviorSubject } from 'rxjs';
import { FilterPipe } from './pipes/filter.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  jobList$ = new BehaviorSubject<any[]>([]);
  stats = { total: 0, interview: 0, offered: 0, rejected: 0, hold: 0 };
  username: string = '';
  searchText: string = '';

  constructor(
    private jobService: JobService,
    private auth: AuthService,
    private dialog: MatDialog,
    // private filterPipe: FilterPipe
  ) {}

  ngOnInit() {
    this.fetchJobs();
    this.username = this.auth.getUsername();
  }

  logout() {
    this.auth.logout();
  }

  fetchJobs() {
    this.jobService.getJobs().subscribe(
      (res: any[]) => {
        console.log('Jobs fetched:', res);
        this.jobList$.next(res);
        this.calculateStats(res);
      },
      (error) => console.error('Error fetching jobs:', error)
    );
  }

  deleteJob(id: number) {
    if (confirm('Are you sure you want to delete this job?')) {
      this.jobService.deleteJob(id).subscribe(() => {
        const currentJobs = this.jobList$.value.filter(j => j?.id !== id);
        this.jobList$.next(currentJobs);
        this.calculateStats(currentJobs);
      });
    }
  }

 editJob(job: any) {
  const dialogRef = this.dialog.open(JobFormComponent, {
    width: "35rem",
    height: "100%",
    position: { right: '0' },
    data: job 
  });

  dialogRef.afterClosed().subscribe((updated: boolean) => {
    if (updated) {
      this.fetchJobs(); 
    }
  });
}


  calculateStats(jobs: any[]) {
    const validJobs = jobs.filter(j => j?.status);
    this.stats.total = validJobs.length;
    this.stats.interview = validJobs.filter(j => j.status === 'Interview').length;
    this.stats.offered = validJobs.filter(j => j.status === 'Offered').length;
    this.stats.rejected = validJobs.filter(j => j.status === 'Rejected').length;
    this.stats.hold = validJobs.filter(j => j.status === 'On Hold').length;
  }

  openJobForm() {
    const dialogRef = this.dialog.open(JobFormComponent, {
      width: "35rem",
      height: "100%",
      position: { right: '0' }
    });

    dialogRef.afterClosed().subscribe((added: boolean) => {
      if (added) {
        this.fetchJobs();
      }
    });
  }
}
