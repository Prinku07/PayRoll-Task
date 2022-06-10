//The injector which creates a authservice instance we use @injector for it might give depandancy error .
import { Injectable } from "@angular/core";
import { HttpHandler, HttpEvent, HttpRequest, HttpResponse, HttpInterceptor } from "@angular/common/http";
import { finalize, Observable, tap } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { LoaderService } from "../../share/loader.service";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
@Injectable()
export class Interceptor implements HttpInterceptor {

    token: any;

    constructor(private toastrService: ToastrService,
        public loaderservice: LoaderService,
        private authservice: AuthService,
        private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderservice.isloading.next(true);
        this.token = this.authservice.getToken()
        if (this.token) {
            req = req.clone({
                setHeaders: {
                    Authorization: this.token
                }
            });
        }
        return next.handle(req).pipe(tap(event => {
            if (event instanceof HttpResponse) {
                if (event.body.Status == 401) {
                    this.authservice.logout();
                    this.router.navigate(['login'])
                }
            }
        }, error => {
            this.toastrService.error("Something went wrong")
        }),
            finalize(() => {
                this.loaderservice.isloading.next(false)
            })
        );
    }
}


