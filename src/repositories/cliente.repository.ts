import { Repository } from "../shared/repository.js";
import { Cliente } from "../models/cliente.entity.js";

const clientes = [
    new Cliente(
        '11111111',
        'Juan',
        'Perez',
        30,
        'juanperez@gmail.com',
        11111111,
        false
    ),
]

export class ClienteRepository implements Repository<Cliente>{

    public findAll(): Cliente[] | undefined{
        return clientes
    }

    public findOne(item: {codigo:string; }): Cliente | undefined{
        return clientes.find((cliente) => cliente.dni === item.codigo)
    }

    public add(item: Cliente): Cliente | undefined{
        clientes.push(item)
        return item
    }

    public update(item: Cliente): Cliente | undefined {
        const ClienteDNI = clientes.findIndex((cliente) => cliente.dni === item.dni)
        if(ClienteDNI !== -1){
             clientes[ClienteDNI] = {...clientes[ClienteDNI], ...item}
        }
        return clientes[ClienteDNI]
    }
    
    public delete(item: { codigo:string; }): Cliente | undefined {
        const ClienteDNI = clientes.findIndex((cliente) => cliente.dni === item.codigo)
        if(ClienteDNI !== -1){
            const deletedVuelos = clientes[ClienteDNI]
            clientes.splice(ClienteDNI, 1)
            return deletedVuelos
        }
    }

}