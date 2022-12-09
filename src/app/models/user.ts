export class User{
    constructor(
        public id: string,
        public name: string,
        public idperfil: string,
        public email: string,
        public pass: string,
        public cargo: string,
        public departamento: string,  
        public sexo: string,
        public telefono: number,
        public ext: string,
        public date : any, 
        public conectedIP: string,             
        public image: string,
        public token: string
    ) {}
}