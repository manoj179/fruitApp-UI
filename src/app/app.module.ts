import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { authGuard } from './core/auth.guard';
import { LayoutModule } from './views/layout/layout.module';
import { ErrorComponent } from './views/pages/error/error.component';
// import { HttpInterceptorInterceptor } from './core/http-interceptor.interceptor';
// import { APOLLO_OPTIONS } from 'apollo-angular';
// import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';

import { APOLLO_OPTIONS, ApolloModule, } from 'apollo-angular';
import { HttpLink, InMemoryCache } from '@apollo/client/core';
import { environment } from 'src/environments/environment';
import { NewHttpInterceptorInterceptor } from './core/new-http-interceptor.interceptor';

// const uri = 'https://your-graphql-server-endpoint/graphql'; // Replace with your GraphQL endpoint

// export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
//   return {
//     link: httpLink.create({ uri }),
//     cache: new InMemoryCache(),
//   };
// }

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    LayoutModule,
    ApolloModule,
    // HttpLinkModule
  ],
  providers: [
    provideAnimations(),
    provideToastr(),
    authGuard,
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([NewHttpInterceptorInterceptor])
    ),
    // { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorInterceptor, multi: true }, < v18.0
    provideHttpClient(),
    {
      provide: APOLLO_OPTIONS,
      useFactory: () => {
        return {
          cache: new InMemoryCache(),
          uri: environment.baseUrl+"/graphql"
        };
      }
      // deps: [HttpLink],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
