
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes del Cliente
import { CreateClienteComponent } from './pages/cliente/create-cliente/create-cliente.component';

//Componentes Home
import { HomeComponent } from './pages/home/home.component';
import { ActualizarClienteComponent } from './pages/cliente/actualizar-cliente/actualizar-cliente.component';
import { ListarClienteComponent } from './pages/cliente/listar-cliente/listar-cliente.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Ruta por defecto

  { path: 'home', component: HomeComponent },
 
  //Cliente
  {path: 'create-cliente',component: CreateClienteComponent},
  { path: 'actualizar-usuario/:id', component: ActualizarClienteComponent },
  { path: 'listar-cliente', component: ListarClienteComponent },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
