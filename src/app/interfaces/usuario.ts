export class Usuario{
    id: number;
    username: string;
    password: string;
    email: string;
    apellido: string;
    nombre: string;
    dni: string;
    url_titulo: string;
    foto_perfil: string;
    fecha_registro: Date;
    estado: boolean;
    display_name: string;
    key_activacion: string;
    admin: boolean;

    constructor(){}
}