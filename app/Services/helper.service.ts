import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private refreshPostsSubject = new Subject<void>();
  refreshPosts$ = this.refreshPostsSubject.asObservable();

  private refreshCommentsSubject = new Subject<void>();
  refreshComments$ = this.refreshCommentsSubject.asObservable();

  constructor(private toastr: ToastrService) { }

  success(response: string) {
    this.toastr.success(response);
  }

  error(response: string) {
    this.toastr.error(response);
  }

  info(response: string) {
    this.toastr.info(response);
  }

  warning(response: string) {
    this.toastr.warning(response);
  }

  refreshPosts() {
    this.refreshPostsSubject.next();
  }

  refreshComments(): void {
    this.refreshCommentsSubject.next();
  }
}