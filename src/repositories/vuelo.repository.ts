import { Repository } from "../shared/repository";
import { Vuelo } from "../models/vuelo.entity.js";

const vuelos = [
    new Vuelo(
        '1',
        'Aerolineas Argentinas',
        'Pendiente',
        '5 horas',
        100,
        true
    ),
]

export class VueloRepository implements Repository<Vuelo>{

    public findAll(): Vuelo[] | undefined{
        return vuelos
    }

    public findOne(item: {codigo:string; }): Vuelo | undefined{
        return vuelos.find((vuelo) => vuelo.codigo === item.codigo)
    }

    public add(item: Vuelo): Vuelo | undefined{
        vuelos.push(item)
        return item
    }

    public update(item: Vuelo): Vuelo | undefined {
        const vueloIdx = vuelos.findIndex((vuelo) => vuelo.codigo === item.codigo)
        if(vueloIdx !== -1){
             vuelos[vueloIdx] = {...vuelos[vueloIdx], ...item}
        }
        return vuelos[vueloIdx]
    }
    
    public delete(item: { codigo: string; }): Vuelo | undefined {
        const vueloIdx = vuelos.findIndex((vuelo) => vuelo.codigo === item.codigo)

        if(vueloIdx !== -1){
            const deletedVuelos = vuelos[vueloIdx]
            vuelos.splice(vueloIdx, 1)
            return deletedVuelos
        }
    }

}