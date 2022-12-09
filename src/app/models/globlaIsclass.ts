export class Clientes {
  constructor ( 
    public seleccione: boolean,  
    public id: number,   
    public nombre: string,    
    public estatus: string,
    public identificacion: string,    
    public tipo: string,
    public Fecha: any) {

  }
   
  }

  export class Documentos {
    constructor (   
      public _id: number,   
      public descripcion: string,
      public status: string,
      public type: string) {
  
    }
     
    }

    export class Usuarios {
      constructor (   
        public codigo: number,   
        public nombre_apellido: string,
        public email: string,
        public password: string,       
        public department: string,        
        public usu_status: string, 
        public type_ident: string,
        public no_ident: number,
        public fotoperfil: string,
        public token: string,
        public fecha: any
        ) {
    
      }
       
      }

      export class Pacientes {
        constructor (  
          public Codigo: number,   
          public Nombre: string,    
          public Apellido: string,
          public Direccion: string,    
          public Celular: string,
          public Telefono: string, 
          public Sexo: string,   
          public FechaNac: string,    
          public Edad: number,
          public MayorEdad: string,    
          public TipoDocI: string,
          public DocI: number,
          public TipoSangre: string,    
          public Email: string,
          public Tipo: string, 
          public ARS: string,   
          public NSS: number,    
          public NoAfiliado: number,
          public TipoServicio: string) {  }
         
        }